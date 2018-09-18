if(navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    console.log('SW Registered!');
  }).catch(console.log);
}
