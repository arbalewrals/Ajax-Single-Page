// Ascultam evenimentul de mesaj
self.addEventListener('message', function (e) {
    console.log('Mesaj primit de la scriptul principal');
    // trimitem un mesaj inapoi la script-ul principal
    self.postMessage('Notificare de la worker');
}, false);