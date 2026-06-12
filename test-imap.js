const Imap = require('imap');

const imap = new Imap({
  user: 'harshath2912@gmail.com',
  password: 'xovcvtaqxvlldfhk',
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false }
});

imap.once('ready', () => {
  console.log('✅ Connected successfully!');
  imap.end();
});

imap.once('error', (err) => {
  console.error('❌ Error:', err);
});

imap.connect();