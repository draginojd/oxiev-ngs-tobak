#!/usr/bin/env node
// seeds an `admins` collection in MongoDB with a single admin user named HOST
// Usage: node scripts/seed-admins.cjs

const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Configuration - read from env or fallback to local MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const DB_NAME = process.env.MONGO_DB || 'oxievangs_tobak';

async function run() {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const admins = db.collection('admins');

    // Ensure unique index on email
    await admins.createIndex({ email: 1 }, { unique: true });

    // Choose password: use ADMIN_PASSWORD env or generate a strong random one
    const passwordPlain = process.env.ADMIN_PASSWORD || crypto.randomBytes(12).toString('base64').replace(/[^A-Za-z0-9]/g, '').slice(0,16);
    // bcryptjs provides a synchronous hash helper that's reliable across platforms
    const passwordHash = bcrypt.hashSync(passwordPlain, 10);

    const admin = {
      name: 'HOST',
      // email per your request
      email: 'oxievangstobak@gmail.com',
      passwordHash,
      createdAt: new Date(),
      roles: ['admin']
    };

    // Upsert the admin (insert if not exists, otherwise update)
    const res = await admins.updateOne(
      { email: admin.email },
      { $set: admin },
      { upsert: true }
    );

    if (res.upsertedId) {
      console.log('Admin created with id:', res.upsertedId._id);
    } else {
      console.log('Admin upserted / updated:', admin.email);
    }

    console.log(`ADMIN RECORD: Email: ${admin.email}`);
    console.log(`PASSWORD: ${passwordPlain}`);
    console.log('IMPORTANT: Change the password before using in production. To control the password set ADMIN_PASSWORD env var when running the script.');
  } catch (err) {
    console.error('Seed failed', err);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

run();
