const Redis = require('ioredis');
const publisher = new Redis();
const emailQueue = 'email_queue';

async function publishEmailJob(email) {
  try {
    await publisher.publish(emailQueue, email);
    console.log('Email job published successfully!');
  } catch (err) {
    console.error('Failed to publish email job:', err);
  }
}

publishEmailJob('user@example.com');
