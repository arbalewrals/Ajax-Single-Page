function incarcaPersoane() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            afiseazaPersoane(this);
        }
    };
    xhr.open("GET", "resurse/persoana.xml", true);
    xhr.send();
}

function afiseazaPersoane(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var table = "<tr><th>Nume</th><th>Prenume</th><th>Varsta</th><th>Strada</th><th>Numar</th><th>Localitate</th><th>Judet</th><th>Tara</th><th>Adresa Email</th><th>Numar Telefon</th><th>Experienta</th></tr>";
    var x = xmlDoc.getElementsByTagName("persoana");
    for (i = 0; i < x.length; i++) {
      table += "<tr><td>" +
        x[i].getElementsByTagName("nume")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("prenume")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("varsta")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("strada")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("numar")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("localitate")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("judet")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("tara")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("adresaEmail")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("numarTelefon")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("experienta")[0].childNodes[0].nodeValue +
        "</td></tr>";
    }
    document.getElementById("continut").innerHTML = "<table>" + table + "</table>";
  }