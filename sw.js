self.addEventListener('install', (e) => {
  console.log('V1 installing…');

  //self.skipWaiting();

});

self.addEventListener('activate', (e) => {
  console.log('V1 now ready to handle fetches!');
});

self.addEventListener('fetch', (e) => {
  //const url = new URL(e.request.url);
  console.log('Fetch Event: ' + e.request.url)

  // serve the cat SVG from the cache if the request is
  // same-origin and the path is '/dog.svg'
/*
  if (url.origin == location.origin && url.pathname == '/dog.svg') {
    event.respondWith(caches.match('/cat.svg'));
  }
  */
});

self.addEventListener('message', (e) => {
  console.log('SW Recieved Message! ' + e.data);

  // respond to just the client that sent the Message
  self.clients.matchAll().then((clients) => {

    clients.forEach((client) => {
      if(e.source.id == client.id) {
        client.postMessage("Got your message, thanks!");
      }
    })
  })
})

self.addEventListener('push', () => {
  console.log('Push Received!');
});

const applicationServerPublicKey = 'BBZolo6sNMCpw3HJ0um997ZYMfULtls4q2fyah7EY3T6EYyKgcQO4tesmHNFKKfbwbS1b4pL7jPLGAdn9BqtOyA';

/* eslint-enable max-len */

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
});

self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('[Service Worker]: \'pushsubscriptionchange\' event fired.');
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  event.waitUntil(
    self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function(newSubscription) {
      // TODO: Send to application server
      console.log('[Service Worker] New subscription: ', newSubscription);
    })
  );
});