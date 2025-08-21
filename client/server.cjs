const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;

// MongoDB support removed. App uses Postgres (via DATABASE_URL) or falls back to configured env values.

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
// Validates against Postgres `admins` table when available. Falls back to configured admin credentials.
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

            // No Postgres available; return zeros.
            return res.status(200).send({ news: 0, campaigns: 0, admins: 0 });
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

            // No Postgres available; return empty list rather than attempting MongoDB.
            return res.send([]);
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

            // No Postgres available; return empty list rather than attempting MongoDB.
            return res.send([]);
        } catch (err) {
            console.error('Campaigns fetch error', err);
            return res.status(500).send([]);
        }
    });
