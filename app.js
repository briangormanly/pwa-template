alert('hi');
if(navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    console.log('SW Registered!');
  }).catch(console.log);
}

let sendMessageElement = document.getElementById('sendMessage');
sendMessageElement.addEventListener('click', (e) => {
  navigator.serviceWorker.controller.postMessage('Hello Brian');
});

// set up a listener for html messages that may come in
// we can additionally setup messaging channels to make this more robust.
navigator.serviceWorker.addEventListener('message', (e) => {
  console.log(e.data);
})
