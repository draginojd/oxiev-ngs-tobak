// check-content.cjs
// Checks whether the three dashboard items exist in the database.
// Usage: set DATABASE_URL or MONGO_URI and run:
//   node scripts/check-content.cjs

const { Pool } = require('pg')
const { MongoClient } = require('mongodb')

const DATABASE_URL = process.env.DATABASE_URL || null
const MONGO_URI = process.env.MONGO_URI || null

const newsTitles = [
  'Nya öppettider från 1 januari',
  'Veckans speltips'
]
const campaignName = 'Julkampanj - 15% rabatt på godis'

async function checkPostgres(){
  const pool = new Pool({ connectionString: DATABASE_URL })
  const client = await pool.connect()
  try{
    console.log('Checking Postgres...')
    for(const t of newsTitles){
      const res = await client.query('SELECT id, title, created_at FROM news WHERE title = $1 LIMIT 1', [t])
      if(res.rows.length){
        console.log(`FOUND news: "${t}" (id=${res.rows[0].id}, created_at=${res.rows[0].created_at})`)
      } else {
        console.log(`MISSING news: "${t}"`)
      }
    }
    const cres = await client.query('SELECT id, name, created_at FROM campaigns WHERE name = $1 LIMIT 1', [campaignName])
    if(cres.rows.length){
      console.log(`FOUND campaign: "${campaignName}" (id=${cres.rows[0].id}, created_at=${cres.rows[0].created_at})`)
    } else {
      console.log(`MISSING campaign: "${campaignName}"`)
    }
  }catch(err){
    console.error('Postgres check failed:', err.message)
  }finally{
    client.release()
    await pool.end()
  }
}

async function checkMongo(){
  const client = new MongoClient(MONGO_URI)
  try{
    await client.connect()
    console.log('Checking MongoDB...')
    const db = client.db(process.env.MONGO_DB || 'oxievangs_tobak')
    const ncol = db.collection('news')
    const ccol = db.collection('campaigns')
    for(const t of newsTitles){
      const doc = await ncol.findOne({ title: t })
      if(doc) console.log(`FOUND news: "${t}" (id=${doc._id}, createdAt=${doc.createdAt || doc.date || 'N/A'})`)
      else console.log(`MISSING news: "${t}"`)
    }
    const cdoc = await ccol.findOne({ name: campaignName })
    if(cdoc) console.log(`FOUND campaign: "${campaignName}" (id=${cdoc._id}, createdAt=${cdoc.createdAt || cdoc.date || 'N/A'})`)
    else console.log(`MISSING campaign: "${campaignName}"`)
  }catch(err){
    console.error('Mongo check failed:', err.message)
  }finally{
    await client.close()
  }
}

async function main(){
  if(DATABASE_URL){
    await checkPostgres()
  } else if(MONGO_URI){
    await checkMongo()
  } else {
    console.error('No DATABASE_URL or MONGO_URI provided. Set one and re-run.')
    console.error('Example (PowerShell):')
    console.error("$env:DATABASE_URL='postgresql://user:pass@localhost:5432/dbname' ; node scripts/check-content.cjs")
    process.exit(1)
  }
}

main()
