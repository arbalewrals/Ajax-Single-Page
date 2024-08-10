function f(){
  console.log("Salut");
  setInterval(g,1000);
  let n = 0;
  while(n<location.href.length && location.href[n] !== "?")
  {
      n++;
  }
  if(document.getElementById("adresaMea")) {
      document.getElementById("adresaMea").innerHTML = location.href.substring(0, n);
  }
  //document.getElementById("myBrowserName").innerHTML=navigator.userAgent;
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  } else {
      document.getElementById("locatiaMea").innerHTML =
          "Geolocation is not supported by this browser.";
  }
  let os = navigator.userAgent;
  let finalOs="";
  let browserName=navigator.userAgent;
  let finalBrowser="";
  if(browserName.search('Chrome')!==-1){
      finalBrowser="Chrome";
  }
  else if(browserName.search('Mozilla')!==-1){
      finalBrowser="Mozilla";
  }
  else if(browserName.search('Safari')!==-1){
      finalBrowser="Safari";
  }
  else if(browserName.search('Opera')!==-1){
      finalBrowser="Opera";
  }
  if(document.getElementById('myBrowserName')) {
      document.getElementById('myBrowserName').innerHTML = finalBrowser;
  }
  if (os.search('Windows')!==-1){
      finalOs="Windows";
  }
  else if (os.search('Mac')!==-1){
      finalOs="MacOS";
  }
  else if (os.search('X11')!==-1 && !(os.search('Linux')!==-1)){
      finalOs="UNIX";
  }
  else if (os.search('Linux')!==-1 && os.search('X11')!==-1){
      finalOs="Linux"
  }
  if(document.getElementById('sistemOperare')) {
      document.getElementById('sistemOperare').innerHTML = finalOs;
  }
}
function g(){
  let elem = document.getElementById("timpCurent");
  if (elem) {
      elem.innerHTML = "Timpul curent este " + (new Date());
  } else {
  }
}
function showPosition(position) {
  if( document.getElementById("locatiaMea")) {
      document.getElementById("locatiaMea").innerHTML =
          "Latitude: " + position.coords.latitude + ' ' +
          "Longitude: " + position.coords.longitude;
  }
}
var x1=-1;
var y1=-1;
function deseneaza(e){
    let x=e.offsetX;
    let y=e.offsetY;
    if(x1==-1){
        x1=x;
        y1=y;
    } else {
        const canvas = document.getElementById("desen");
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = document.getElementById("culoare").value;
        ctx.fillRect(Math.min(x1,x), Math.min(y1,y), Math.abs(x-x1), Math.abs(y-y1));
        x1=y1=-1;
    }
}
function insertRow() {

  var position = document.getElementById("pozitie").value;
  var table = document.getElementById("table");

  var newRow = table.insertRow(position);
  var color = document.getElementById("culoare2").value;
  newRow.style.backgroundColor = color;


  for (var i = 0; i < table.rows[0].cells.length; i++) {
    var cell = newRow.insertCell(i);
    cell.innerHTML = "Linie adaugata " + position;
  }
}

function insertColumn() {

  var position = document.getElementById("pozitie").value;
  var table = document.getElementById("table");


  for (var i = 0; i < table.rows.length; i++) {
    var cell = table.rows[i].insertCell(position);
    cell.innerHTML = "Coloana adaugata ";

    var color = document.getElementById("culoare2").value;
    cell.style.backgroundColor = color;
  }
}
function schimbaContinut(resursa,jsFisier,jsFunctie){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("continut").innerHTML = this.responseText;
      if (jsFisier) {
        var elementScript = document.createElement('script');
        elementScript.onload = function () {
          console.log("hello");
          if (jsFunctie) {
            window[jsFunctie]();
          }
        };
        elementScript.src = jsFisier;
        document.head.appendChild(elementScript);
      } else {
        if (jsFunctie) {
          window[jsFunctie]();
        }
      }
     f();
     g();
     showPosition();
    }
  };
  xhttp.open("GET", resursa+'.html', true);
  xhttp.send();
}
function verifica() {
  var xhr = new XMLHttpRequest();
  var url = "resurse/utilizatori.json";
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var utilizatori = JSON.parse(this.responseText);
      var inputUser = document.getElementById("utilizator").value;
      var inputPass = document.getElementById("parola").value;
      var result = document.getElementById("result");
      var gasit = false;
      for (var i = 0; i < utilizatori.length; i++) {
        if (utilizatori[i].utilizator === inputUser && utilizatori[i].parola === inputPass) {
          gasit = true;
          break;
        }
      }
      if (gasit) {
        result.innerHTML = "Utilizator si parola corecte";
      } else {
        result.innerHTML = "Utilizator sau parola incorecte";
      }
    }
  };
  xhr.send();
}