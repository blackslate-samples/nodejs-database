const Redis = require('ioredis');
const subscriber = new Redis();
const emailQueue = 'email_queue';
const nodemailer = require('nodemailer');

async function processEmailJob(email) {
  try {
    // Create a transporter for sending emails (update with your SMTP credentials)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your_email@example.com',
        pass: 'your_email_password',
      },
    });

    // Define email options (update with your email content and subject)
    const mailOptions = {
      from: 'your_email@example.com',
      to: email,
      subject: 'Test Email from Redis Job Queue',
      text: 'This is a test email sent from the Redis Job Queue.',
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (err) {
    console.error('Failed to send email:', err);
  }
}

// Subscribe to the email queue
subscriber.subscribe(emailQueue);

// Process email jobs
subscriber.on('message', (channel, email) => {
  processEmailJob(email);
});