// migrate-mongo-to-postgres.cjs
// Reads `news` and `campaigns` from MongoDB and upserts into Postgres.
// Usage: set MONGO_URI and DATABASE_URL in env, then run:
//   node scripts/migrate-mongo-to-postgres.cjs

const { Pool } = require('pg')
const { MongoClient } = require('mongodb')

const MONGO_URI = process.env.MONGO_URI
const MONGO_DB = process.env.MONGO_DB || 'oxievangs_tobak'
const DATABASE_URL = process.env.DATABASE_URL

if (!MONGO_URI || !DATABASE_URL) {
  console.error('Set MONGO_URI and DATABASE_URL in env before running.')
  process.exit(1)
}

async function ensureTables(client){
  await client.query(`
    CREATE TABLE IF NOT EXISTS news (
      id SERIAL PRIMARY KEY,
      title TEXT UNIQUE,
      content TEXT,
      status TEXT,
      tag TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  `)
  await client.query(`
    CREATE TABLE IF NOT EXISTS campaigns (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE,
      description TEXT,
      active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  `)
}

async function migrate(){
  const mclient = new MongoClient(MONGO_URI)
  const pool = new Pool({ connectionString: DATABASE_URL })
  const pg = await pool.connect()
  try{
    await mclient.connect()
    const db = mclient.db(MONGO_DB)
    const ncol = db.collection('news')
    const ccol = db.collection('campaigns')

    await ensureTables(pg)

    const newsCursor = ncol.find({})
    while(await newsCursor.hasNext()){
      const doc = await newsCursor.next()
      const title = doc.title || ''
      const content = doc.content || doc.body || ''
      const status = doc.status || 'active'
      const tag = doc.tag || (doc.type || 'Nyhet')
      const created_at = doc.createdAt ? new Date(doc.createdAt) : (doc.created_at ? new Date(doc.created_at) : new Date())

      await pg.query(
        `INSERT INTO news (title, content, status, tag, created_at)
         VALUES ($1,$2,$3,$4,$5)
         ON CONFLICT (title) DO UPDATE SET
           content = EXCLUDED.content,
           status = EXCLUDED.status,
           tag = EXCLUDED.tag,
           created_at = EXCLUDED.created_at`,
        [title, content, status, tag, created_at]
      )
      console.log('Upserted news:', title)
    }

    const campCursor = ccol.find({})
    while(await campCursor.hasNext()){
      const doc = await campCursor.next()
      const name = doc.name || doc.title || ''
      const description = doc.description || doc.content || ''
      const active = typeof doc.active === 'boolean' ? doc.active : true
      const created_at = doc.createdAt ? new Date(doc.createdAt) : (doc.created_at ? new Date(doc.created_at) : new Date())

      await pg.query(
        `INSERT INTO campaigns (name, description, active, created_at)
         VALUES ($1,$2,$3,$4)
         ON CONFLICT (name) DO UPDATE SET
           description = EXCLUDED.description,
           active = EXCLUDED.active,
           created_at = EXCLUDED.created_at`,
        [name, description, active, created_at]
      )
      console.log('Upserted campaign:', name)
    }

    console.log('Migration complete')
  }catch(err){
    console.error('Migration failed', err)
  }finally{
    await mclient.close()
    pg.release()
    await pool.end()
  }
}

migrate()
