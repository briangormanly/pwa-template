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
