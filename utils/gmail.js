require('dotenv').config();
const Imap = require('imap');
const { simpleParser } = require('mailparser');
/*
function GetOnboardingOwnerLink() {
  return new Promise((resolve, reject) => {
    const imap = new Imap({
      user: 'michealb1205@gmail.com',
      password: 'phkhpjlnkfhmbdbg',
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false }
    });

    imap.once('ready', () => {
      imap.openBox('INBOX', false, (err) => {
        if (err) return reject(err);

        // Combine FROM + SUBJECT for a tighter match
        imap.search([
          ['FROM', 'infinitechx1601@gmail.com'],
          ['SUBJECT', 'Account'] // adjust to match actual subject text
        ], (err, results) => {
          if (err) return reject(err);
          if (!results || !results.length) return reject('No account creation emails found');

          const latestEmailId = results[results.length - 1];
          const f = imap.fetch([latestEmailId], { bodies: '' });

          f.on('message', (msg) => {
            msg.on('body', (stream) => {
              simpleParser(stream, (err, parsed) => {
                if (err) return reject(err);

                console.log('Subject:', parsed.subject);

                // adjust the keyword to match the actual link pattern in this email
                const linkMatch = parsed.html.match(/href="([^"]+(?:activate|confirm|welcome)[^"]*)"/i);
                resolve(linkMatch ? linkMatch[1] : null);
                imap.end();
              });
            });
          });

          f.once('error', (err) => reject(err));
        });
      });
    });

    imap.once('error', (err) => reject(err));
    imap.connect();
  });
}

*/

function getOnboardingLink() {
  return new Promise((resolve, reject) => {
    console.log('EMAIL_USER:', process.env.EMAIL_USER || 'NOT LOADED');
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'LOADED' : 'NOT LOADED');
    const imap = new Imap({
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASS,
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false }
    });

    imap.once('ready', () => {
      imap.openBox('INBOX', false, (err) => {
        if (err) return reject(err);

        imap.search([['FROM', 'williambutcher369@gmail.com']], (err, results) => {
          if (err) return reject(err);
          if (!results || !results.length) return reject('No emails found from RentGENIUX');

          // Fetch all matched messages with their headers so we can sort by actual date
          const f = imap.fetch(results, { bodies: 'HEADER.FIELDS (DATE)', struct: true });
          const messages = [];

          f.on('message', (msg, seqno) => {
            let header = '';
            msg.on('body', (stream) => {
              stream.on('data', (chunk) => (header += chunk.toString('utf8')));
            });
            msg.once('attributes', (attrs) => {
              messages.push({ uid: attrs.uid, seqno });
            });
          });

          f.once('error', (err) => reject(err));

          f.once('end', () => {
            if (!messages.length) return reject('No message attributes found');

            // Highest UID = most recently received message
            const latest = messages.reduce((a, b) => (a.uid > b.uid ? a : b));

            const fetchLatest = imap.fetch([latest.uid], { bodies: '', uid: true });
            fetchLatest.on('message', (msg) => {
              msg.on('body', (stream) => {
                simpleParser(stream, (err, parsed) => {
                  if (err) return reject(err);
                  console.log('Subject:', parsed.subject);
                  const linkMatch = parsed.html.match(/href="([^"]+verify-email[^"]*)"/i);
                  resolve(linkMatch ? linkMatch[1] : null);
                  imap.end();
                });
              });
            });
            fetchLatest.once('error', (err) => reject(err));
          });
        });
      });
    });

    imap.once('error', (err) => reject(err));
    imap.once('end', () => {
      console.log('IMAP connection ended.');
    });
    imap.connect();
  });
}


// ✅ Function 2 - Inspection Accept link
function getOwnerInspectionAcceptLink() {
  console.log('EMAIL_USER:', process.env.EMAIL_USER1 || 'NOT LOADED');
    console.log('EMAIL_PASS:', process.env.EMAIL_1PASS1 ? 'LOADED' : 'NOT LOADED');
  return new Promise((resolve, reject) => {
    const imap = new Imap({
      user: process.env.EMAIL_USER1,
      password: process.env.EMAIL_PASS1,
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false }
    });
     

    imap.once('ready', () => {
      imap.openBox('INBOX', false, () => {
        imap.search([['FROM', 'infinitechx1601@gmail.com']], (err, results) => {
          if (err) return reject(err);
          if (!results || !results.length) return reject('No emails found!');

          const latestEmailId = results[results.length - 1];
          const f = imap.fetch([latestEmailId], { bodies: '' });

          f.on('message', (msg) => {
            msg.on('body', (stream) => {
              simpleParser(stream, (err, parsed) => {
                console.log('Subject:', parsed.subject);
                console.log('HTML:', parsed.html);
                const acceptMatch = parsed.html.match(/href="([^"]*accept[^"]*)"/i);
                console.log('Accept Link:', acceptMatch ? acceptMatch[1] : null);
                resolve(acceptMatch ? acceptMatch[1] : null);
                imap.end();
              });
            });
          });
          f.once('error', reject);
        });
      });
    });

    imap.once('error', reject);
    imap.connect();
  });
} // ✅ Closing bracket for getInspectionAcceptLink


function getInspectionAcceptLink() {
  return new Promise((resolve, reject) => {
    const imap = new Imap({
      user: 'arnavpandian4@gmail.com',
      password: 'qpiapbmrzxntbjrx',
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false }
    });

    imap.once('ready', () => {
      imap.openBox('INBOX', false, () => {
        imap.search([['FROM', 'infinitechx1601@gmail.com']], (err, results) => {
          if (err) return reject(err);
          if (!results || !results.length) return reject('No emails found!');

          const latestEmailId = results[results.length - 1];
          const f = imap.fetch([latestEmailId], { bodies: '' });

          f.on('message', (msg) => {
            msg.on('body', (stream) => {
              simpleParser(stream, (err, parsed) => {
                console.log('Subject:', parsed.subject);
                console.log('HTML:', parsed.html);
                const acceptMatch = parsed.html.match(/href="([^"]*accept[^"]*)"/i);
                console.log('Accept Link:', acceptMatch ? acceptMatch[1] : null);
                resolve(acceptMatch ? acceptMatch[1] : null);
                imap.end();
              });
            });
          });
          f.once('error', reject);
        });
      });
    });

    imap.once('error', reject);
    imap.connect();
  });
}
module.exports = { getOnboardingLink, getInspectionAcceptLink, getOwnerInspectionAcceptLink };