const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;

// Mongo configuration and single client instance
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const DB_NAME = process.env.MONGO_DB || 'oxievangs_tobak';
let db = null;
const mongoClient = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 2000 });

// Try to connect once at startup (non-fatal)
mongoClient.connect().then(() => {
    db = mongoClient.db(DB_NAME);
    console.log('Connected to MongoDB');
}).catch(err => {
    console.warn('Initial MongoDB connect failed (continuing with fallback):', err && err.message ? err.message : err);
});

// Postgres configuration (optional)
const DATABASE_URL = process.env.DATABASE_URL || process.env.PG_URI || null;
let pgPool = null;
let pgConnected = false;
if (DATABASE_URL) {
    try {
        pgPool = new Pool({ connectionString: DATABASE_URL });
        // test connection
        pgPool.connect().then(client => {
            client.release();
            pgConnected = true;
            console.log('Connected to Postgres');
        }).catch(err => {
            console.warn('Initial Postgres connect failed (continuing):', err && err.message ? err.message : err);
        });
    } catch (err) {
        console.warn('Postgres Pool init failed:', err && err.message ? err.message : err);
    }
}



app.use(express.json());

// Route för att logga sidbesök för hem-sidan
app.post('/api/home', (req, res) => {
    console.log("Visited: /home");
    res.send({ message: "Tracked visit to Home" });
});

// Route för att logga sidbesök för om-oss-sidan
app.post('/api/aboutus', (req, res) => {
    console.log("Visited: /about");
    res.send({ message: "Tracked visit to About Us" });
});

// Route för att logga sidbesök för kontakt-sidan
app.post('/api/contact', (req, res) => {
    console.log("Visited: /contact");
    res.send({ message: "Tracked visit to Contact" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Admin login endpoint
// Tries to validate against a MongoDB `admins` collection if MONGO_URI is set and reachable.
// Falls back to a configured fallback admin (use env FALLBACK_ADMIN_EMAIL and FALLBACK_ADMIN_PASSWORD).
app.post('/api/admin/login', async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).send({ message: 'Email and password required' });
    // Prefer Postgres if available
    try {
        if (pgConnected && pgPool) {
            const client = await pgPool.connect();
            try {
                const r = await client.query('SELECT id, email, password FROM admins WHERE email = $1 LIMIT 1', [email]);
                if (r.rows && r.rows.length) {
                    const admin = r.rows[0];
                    const ok = await bcrypt.compare(password, admin.password);
                    if (ok) return res.send({ message: 'ok' });
                    return res.status(401).send({ message: 'Ogiltiga inloggningsuppgifter' });
                }
            } finally {
                client.release();
            }
        }
    } catch (err) {
        console.warn('Postgres admin lookup failed:', err && err.message ? err.message : err);
        // fallthrough to mongo/fallback
    }

    // Then try MongoDB (use shared client when available)
    try {
        if (db) {
            const admins = db.collection('admins');
            const admin = await admins.findOne({ email: email });
            if (admin && admin.passwordHash) {
                const ok = await bcrypt.compare(password, admin.passwordHash);
                if (ok) return res.send({ message: 'ok' });
                return res.status(401).send({ message: 'Ogiltiga inloggningsuppgifter' });
            }
        }
    } catch (err) {
        console.warn('MongoDB admin lookup failed:', err && err.message ? err.message : err);
        // fallthrough to fallback
    }

    // Fallback admin (use env to override)
    const FALLBACK_EMAIL = process.env.FALLBACK_ADMIN_EMAIL || 'oxievangstobak@gmail.com';
    const FALLBACK_PASSWORD = process.env.FALLBACK_ADMIN_PASSWORD || 'IWPeyESzUVx00Ks';
    if (email === FALLBACK_EMAIL && password === FALLBACK_PASSWORD) {
        return res.send({ message: 'ok' });
    }

    return res.status(401).send({ message: 'Ogiltiga inloggningsuppgifter' });
});

    // Admin stats: counts for dashboard
    app.get('/api/admin/stats', async (req, res) => {
        try {
            if (pgConnected && pgPool) {
                const client = await pgPool.connect();
                try {
                    const newsR = await client.query('SELECT count(*)::int AS cnt FROM news');
                    const campaignsR = await client.query('SELECT count(*)::int AS cnt FROM campaigns');
                    const adminsR = await client.query('SELECT count(*)::int AS cnt FROM admins');
                    return res.send({ news: newsR.rows[0].cnt, campaigns: campaignsR.rows[0].cnt, admins: adminsR.rows[0].cnt });
                } finally {
                    client.release();
                }
            }

            if (!db) return res.status(200).send({ news: 0, campaigns: 0, admins: 0 });
            const newsCount = await db.collection('news').countDocuments();
            const campaignsCount = await db.collection('campaigns').countDocuments();
            const adminsCount = await db.collection('admins').countDocuments();
            return res.send({ news: newsCount, campaigns: campaignsCount, admins: adminsCount });
        } catch (err) {
            console.error('Stats error', err);
            return res.status(500).send({ message: 'Error' });
        }
    });

    // Latest news list
    app.get('/api/admin/news', async (req, res) => {
        try {
            if (pgConnected && pgPool) {
                const client = await pgPool.connect();
                try {
                    const r = await client.query('SELECT title, created_at, status FROM news ORDER BY created_at DESC LIMIT 10');
                    return res.send(r.rows.map(i => ({ title: i.title, date: i.created_at, status: i.status || 'active' })));
                } finally {
                    client.release();
                }
            }

            if (!db) return res.send([]);
            const items = await db.collection('news').find().sort({ createdAt: -1 }).limit(10).toArray();
            return res.send(items.map(i => ({ title: i.title, date: i.createdAt, status: i.status || 'active' })));
        } catch (err) {
            console.error('News fetch error', err);
            return res.status(500).send([]);
        }
    });

    // Latest campaigns list (for dashboard)
    app.get('/api/admin/campaigns', async (req, res) => {
        try {
            if (pgConnected && pgPool) {
                const client = await pgPool.connect();
                try {
                    const r = await client.query('SELECT name, created_at, active FROM campaigns ORDER BY created_at DESC LIMIT 10');
                    return res.send(r.rows.map(i => ({ title: i.name, date: i.created_at, status: i.active ? 'active' : 'inactive' })));
                } finally {
                    client.release();
                }
            }

            if (!db) return res.send([]);
            const items = await db.collection('campaigns').find().sort({ createdAt: -1 }).limit(10).toArray();
            return res.send(items.map(i => ({ title: i.name || i.title, date: i.createdAt, status: i.active ? 'active' : (i.status || 'inactive') })));
        } catch (err) {
            console.error('Campaigns fetch error', err);
            return res.status(500).send([]);
        }
    });
