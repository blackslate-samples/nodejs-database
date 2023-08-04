const Redis = require('ioredis');
const subscriber = new Redis();

async function subscribeToChannel(channel) {
  await subscriber.subscribe(channel);
  console.log(`Subscribed to channel: ${channel}`);

  subscriber.on('message', (ch, message) => {
    console.log(`Received message from channel ${ch}: ${message}`);
  });
}

subscribeToChannel('news');

// Modification for multiple subscribers and unsubscribing

const Redis = require('ioredis');
// const subscriber = new Redis();

async function subscribeToChannels(channels) {
  for (const channel of channels) {
    await subscriber.subscribe(channel);
    console.log(`Subscribed to channel: ${channel}`);
  }

  subscriber.on('message', (ch, message) => {
    console.log(`Received message from channel ${ch}: ${message}`);
  });
}

subscribeToChannels(['news', 'updates', 'events']);

// For Unsubscribing

async function unsubscribeFromChannel(channel) {
    await subscriber.unsubscribe(channel);
    console.log(`Unsubscribed from channel: ${channel}`);
  }
  
  unsubscribeFromChannel('news');

  // Pattern Subscription

  async function subscribeToPattern(pattern) {
    await subscriber.psubscribe(pattern);
    console.log(`Subscribed to pattern: ${pattern}`);
  
    subscriber.on('pmessage', (pattern, channel, message) => {
      console.log(`Received message from channel ${channel} matching pattern ${pattern}: ${message}`);
    });
  }
  
  subscribeToPattern('sport*');


