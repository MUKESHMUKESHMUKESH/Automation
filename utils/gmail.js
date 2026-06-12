const Imap = require('imap');
const { simpleParser } = require('mailparser');

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
        // Search for emails from RentGENIUX sender
        imap.search([['FROM', 'infinitechx1601@gmail.com']], (err, results) => {
          if (err) return reject(err);
          if (!results || !results.length) return reject('No emails found from RentGENIUX');

          // Get the latest (most recent) email
          const latestEmailId = results[results.length - 1];

          const f = imap.fetch([latestEmailId], { bodies: '' });
          f.on('message', (msg) => {
            msg.on('body', (stream) => {
              simpleParser(stream, (err, parsed) => {
                 console.log('Subject:', parsed.subject);
                 console.log('HTML:', parsed.html);

                // Extract the registration link
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
}

module.exports = { getOnboardingLink };