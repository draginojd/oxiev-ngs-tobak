// seed-content.cjs
// Seeds example news and campaigns for the dashboard
// Usage: set DATABASE_URL or MONGO_URI appropriately and run:
//   node scripts/seed-content.cjs

const { Pool } = require('pg')
const { MongoClient } = require('mongodb')

const DATABASE_URL = process.env.DATABASE_URL || null
const MONGO_URI = process.env.MONGO_URI || null

const newsItems = [
  {
    title: 'Nya öppettider från 1 januari',
    content: 'Vi utökar våra öppettider för att bättre kunna hjälpa er! Från och med 1 januari är vi öppna längre på helger.',
    date: '2024-01-15',
    status: 'active',
    tag: 'Nyhet'
  },
  {
    title: 'Veckans speltips',
    content: 'Våra experter har plockat fram veckans bästa speltips för både trav och fotboll. Kom in så hjälper vi dig!',
    date: '2024-01-12',
    status: 'active',
    tag: 'Tips'
  }
]

const campaigns = [
  {
    name: 'Julkampanj - 15% rabatt på godis',
    description: 'Under hela december erbjuder vi 15% rabatt på alla godisvaror. Perfekt för julens alla fester och mysdagar!',
    date: '2024-01-10',
    active: true
  }
]

async function seedPostgres(){
  const pool = new Pool({ connectionString: DATABASE_URL })
  const client = await pool.connect()
  try{
    // ensure tables with unique constraints and tag field
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

    for(const n of newsItems){
      await client.query(
        `INSERT INTO news (title, content, status, tag, created_at)
         VALUES ($1,$2,$3,$4,$5)
         ON CONFLICT (title) DO UPDATE SET
           content = EXCLUDED.content,
           status = EXCLUDED.status,
           tag = EXCLUDED.tag,
           created_at = EXCLUDED.created_at`,
        [n.title, n.content, n.status, n.tag, n.date]
      )
    }
    for(const c of campaigns){
      await client.query(
        `INSERT INTO campaigns (name, description, active, created_at)
         VALUES ($1,$2,$3,$4)
         ON CONFLICT (name) DO UPDATE SET
           description = EXCLUDED.description,
           active = EXCLUDED.active,
           created_at = EXCLUDED.created_at`,
        [c.name, c.description, c.active, c.date]
      )
    }
    console.log('Postgres seed complete')
  }catch(err){
    console.error('Postgres seed failed', err)
  }finally{
    client.release()
    await pool.end()
  }
}

async function seedMongo(){
  const client = new MongoClient(MONGO_URI)
  try{
    await client.connect()
    const db = client.db(process.env.MONGO_DB || 'oxievangs_tobak')
    const ncol = db.collection('news')
    const ccol = db.collection('campaigns')
    for(const n of newsItems){
      await ncol.updateOne({ title: n.title }, { $set: { title: n.title, content: n.content, createdAt: new Date(n.date), status: n.status } }, { upsert: true })
    }
    for(const c of campaigns){
      await ccol.updateOne({ name: c.name }, { $set: { name: c.name, description: c.description, createdAt: new Date(c.date), active: c.active } }, { upsert: true })
    }
    console.log('Mongo seed complete')
  }catch(err){
    console.error('Mongo seed failed', err)
  }finally{
    await client.close()
  }
}

async function main(){
  if (DATABASE_URL){
    console.log('Seeding Postgres...')
    await seedPostgres()
  } else if (MONGO_URI){
    console.log('Seeding Mongo...')
    await seedMongo()
  } else {
    console.error('No DATABASE_URL or MONGO_URI provided. Set one and retry.')
    process.exit(1)
  }
}

main()
