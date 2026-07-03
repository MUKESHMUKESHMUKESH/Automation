const Imap = require('imap');
const { simpleParser } = require('mailparser');

// ✅ Function 1 - Onboarding verify link
function getOnboardingLink() {
  return new Promise((resolve, reject) => {
    const imap = new Imap({
      user: 'harshath2912@gmail.com',
      password: 'xovcvtaqxvlldfhk',
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false }
    });

    imap.once('ready', () => {
      imap.openBox('INBOX', false, () => {
        imap.search([['FROM', 'infinitechx1601@gmail.com']], (err, results) => {
          if (err) return reject(err);
          if (!results || !results.length) return reject('No emails found from RentGENIUX');

          const latestEmailId = results[results.length - 1];
          const f = imap.fetch([latestEmailId], { bodies: '' });
          f.on('message', (msg) => {
            msg.on('body', (stream) => {
              simpleParser(stream, (err, parsed) => {
                console.log('Subject:', parsed.subject);
                console.log('HTML:', parsed.html);
                const linkMatch = parsed.html.match(/href="([^"]+verify-email[^"]*)"/i);
                resolve(linkMatch ? linkMatch[1] : null);
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
} // ✅ Closing bracket for getOnboardingLink

// ✅ Function 2 - Inspection Accept link
function getInspectionAcceptLink() {
  return new Promise((resolve, reject) => {
    const imap = new Imap({
      user: 'harshath2912@gmail.com',
      password: 'xovcvtaqxvlldfhk',
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

module.exports = { getOnboardingLink, getInspectionAcceptLink };