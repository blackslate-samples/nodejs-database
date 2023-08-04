const Redis = require('ioredis');
const publisher = new Redis();

async function publishMessage(channel, message) {
  await publisher.publish(channel, message);
  console.log(`Published message to channel ${channel}: ${message}`);
}

publishMessage('news', 'Breaking news: Redis is amazing!');

