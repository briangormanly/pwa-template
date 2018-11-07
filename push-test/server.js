const webPush = require('web-push');

process.env.VAPID_PUBLIC_KEY = 'BJQpgo5yFXxyZwjwE7kCoS6XP2OlQc1RmdlbgOeMqG3DzcJ8r4WzWFW3yZcxPCe-Ca8JntuKYlVBhiE-3-e0FK8';
process.env.VAPID_PRIVATE_KEY = 'JFAhWU6pvl7jh1TItLXYZQLUNLogtv83PBqTbeX4K9k';

if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.log("You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY "+
    "environment variables. You can use the following ones:");
  console.log(webPush.generateVAPIDKeys());
  return;
}

webPush.setVapidDetails(
  'https://serviceworke.rs/',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const payloads = {};

module.exports = function(app, route) {
  app.get(route + 'vapidPublicKey', function(req, res) {
    res.send(process.env.VAPID_PUBLIC_KEY);
  });

  app.post(route + 'register', function(req, res) {

  res.sendStatus(201);
  });

  app.post(route + 'sendNotification', function(req, res) {
    const subscription = req.body.subscription;
    const payload = req.body.payload;
    const options = {
      TTL: req.body.ttl
    };

    setTimeout(function() {
      payloads[req.body.subscription.endpoint] = payload;
      webPush.sendNotification(subscription, null, options)
        .then(function() {
          res.sendStatus(201);
        })
        .catch(function(error) {
          res.sendStatus(500);
          console.log(error);
        });
    }, req.body.delay * 1000);
  });

  app.get(route + 'getPayload', function(req, res) {
    res.send(payloads[req.query.endpoint]);
  });
};
