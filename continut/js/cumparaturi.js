// Definim clasa Produs
class Produs {
  constructor(id, nume, cantitate) {
      this.id = id;
      this.nume = nume;
      this.cantitate = cantitate;
  }
}

window.onload = function () {
  const addButton = document.getElementById("adauga");
  addButton.addEventListener("click", addProduct);
};

// cream un obiect de tip Worker
const worker = new Worker('js/worker.js');

function addProduct(event) {
  const nameIn = document.getElementById("nume");
  const qtyIn = document.getElementById("cantitate");
  const name = nameIn.value.trim();
  const qty = parseInt(qtyIn.value.trim());
  if(!name || !qty) {
      alert("Numele sau cantitatea nu sunt valide");
      return;
  }
  // Verificam daca exista deja produsul
  const products = JSON.parse(localStorage.getItem("produse") || "[]");
  const i = products.findIndex(p => p.nume.toLowerCase() === name.toLowerCase());
  if (i >= 0) {
      products[i].cantitate += qty;
  } else {
      // generăm un id unic pentru produs
      let id = products.length + 1;
      const product = new Produs(id, name, qty); // creăm un obiect de tipul Produs

      // Salvăm produsul în localStorage
      products.push(product);
  }
  localStorage.setItem("produse", JSON.stringify(products));

  // Trimitem mesajul către worker
  worker.postMessage('Adauga produs');
}

// Ascultam evenimentul de mesaj trimis de worker
worker.addEventListener('message', function (e) {
  console.log('Mesaj primit de la worker');
  printList();
}, false);

function printList() {
  const products = JSON.parse(localStorage.getItem("produse") || "[]");
  const table = document.getElementById("lista-cumparaturi");
  table.innerHTML = "<tr><th>ID</th><th>Nume</th><th>Cantitate</th></tr>";
  if (products.length > 0) {
      products.forEach((product) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `<td>${product.id}</td><td>${product.nume}</td><td>${product.cantitate}</td>`;
          table.appendChild(tr);
      });
  } else {
      table.innerHTML = "<tr><th>Lista de cumparaturi este goala</th></tr>";
  }
}

function delList() {
  localStorage.removeItem("produse");
  const table = document.getElementById("lista-cumparaturi");
  table.innerHTML = "";
}