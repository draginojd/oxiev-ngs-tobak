// seed-content.cjs
// Seeds example news and campaigns for the dashboard
// Usage: set DATABASE_URL and run:
//   node scripts/seed-content.cjs

const { Pool } = require('pg')

const DATABASE_URL = process.env.DATABASE_URL || null

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



async function main(){
  if (!DATABASE_URL) {
    console.error('DATABASE_URL is required. Set DATABASE_URL and re-run to seed Postgres.')
    process.exit(1)
  }
  console.log('Seeding Postgres...')
  await seedPostgres()
}

main()
