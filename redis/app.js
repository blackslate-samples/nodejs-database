const redis = require('redis');
const client = redis.createClient();

// SET COMMAND

async function setValue(key, value) {
    try {
      await client.set(key, value);
      console.log('Value set successfully!');
    } 
    catch (err) {
       console.error(err);
    }
  }
  
  await setValue('key', 'value');

// GET COMMAND

async function getValue(key) {
    try {
      const value = await client.get(key);
      console.log('Value:', value);
    } catch (err) {
      console.error(err);
    }
  }
  
  await getValue('key');

// MULTI/EXEC COMMAND

async function executeMulti() {
    try {
        await client.multi()
                        .set('key1', 'value1')
                        .set('key2', 'value2')
                        .exec();
        console.log('Multi replies:', replies);
    } catch (err) {
      console.error(err);
    }
  }
  
  await executeMulti();

// INCR/DECR COMMAND

async function incrementCounter(key) {
    try {
      const newValue = await client.incr(key);
      console.log('New value:', newValue);
    } catch (err) {
      console.error(err);
    }
  }
  
  await incrementCounter('counter');

//EXPIRE COMMAND


async function setKeyWithExpiration(key, value, seconds) {
    try {
      await client.set(key, value, 'EX', seconds);
      console.log('Key with expiration set successfully!');
    } catch (err) {
      console.error(err);
    }
  }
  
  await setKeyWithExpiration('key', 'value', 60);

//KEYS COMMAND

async function getKeysByPattern(pattern) {
    try {
      const keys = await client.keys(pattern);
      console.log('Keys:', keys);
    } catch (err) {
      console.error(err);
    }
  }
  
  await getKeysByPattern('user:*');

// DEL COMMAND 

async function deleteKey(key) {
    try {
      const reply = await client.del(key);
      console.log('Key deleted:', reply);
    } catch (err) {
      console.error(err);
    }
  }
  
  await deleteKey('key');

// EXISTS COMMAND

async function keyExists(key) {
    try {
      const exists = await client.exists(key);
      console.log('Exists:', exists);
    } catch (err) {
      console.error(err);
    }
  }
  
  await keyExists('key');

// BASIC PUB/USB COMMANDS

// PUBLISH

function publishMessage(channel, message) {
    client.publish(channel, message);
  }
  
  publishMessage('channel1', 'Hello, subscribers!');
  
  publishMessage('channel2', 'Test');


// SUBSCRIBE


async function subscribeToChannels(...channels) {
    try {
      await client.subscribe(...channels);
      console.log(`Subscribed to ${channels.length} channels`);
    } catch (err) {
      console.error(err);
    }
  }
  
  await subscribeToChannels('channel1', 'channel2');

// CACHING COMMANDS

// SETEX

async function setValueWithExpiration(key, value, seconds) {
    try {
      await client.set(key, value, 'EX', seconds);
      console.log('Value set with expiration successfully!');
    } catch (err) {
      console.error(err);
    }
  }
  
  await setValueWithExpiration('key', 'value', 60);

// GETSET

async function updateAndGetOldValue(key, newValue) {
    try {
      const oldValue = await client.getset(key, newValue);
      console.log(`Old value: ${oldValue}`);
    } catch (err) {
      console.error(err);
    }
  }
  
  await updateAndGetOldValue('key', 'new value');

// FULLSHALL

async function clearCache() {
    try {
      await client.flushall();
      console.log('Cache cleared successfully!');
    } catch (err) {
      console.error(err);
    }
  }
  
  await clearCache();

  
