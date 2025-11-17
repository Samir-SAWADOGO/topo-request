// ================================
// TOPO-REQUEST — Script principal
// ================================

// Sélecteurs des champs
const form = document.getElementById("requestForm");
const requestsList = document.getElementById("requestsList");

// Chargement des données existantes depuis localStorage
let requests = JSON.parse(localStorage.getItem("topoRequests")) || [];


// ================================
// 1️⃣ Fonction d'affichage des demandes
// ================================
function displayRequests() {
  requestsList.innerHTML = "";

  if (requests.length === 0) {
    requestsList.innerHTML = "<p>Aucune demande pour l’instant.</p>";
    return;
  }

  requests.forEach((req, index) => {
    const item = document.createElement("div");
    item.classList.add("request-card");

    item.innerHTML = `
      <h3>${req.typeTravail}</h3>
      <p><strong>Département :</strong> ${req.departement}</p>
      <p><strong>Zone :</strong> ${req.zone}</p>
      <p><strong>Description :</strong> ${req.description}</p>
      <p><strong>Niveau d’urgence :</strong> ${req.urgence}</p>
      <p><strong>Deadline :</strong> ${req.deadline}</p>
      <p><strong>Statut :</strong> ${req.statut}</p>

      <button onclick="deleteRequest(${index})" class="deleteBtn">Supprimer</button>
    `;

    requestsList.appendChild(item);
  });
}


// ================================
// 2️⃣ Fonction pour ajouter une demande
// ================================
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newRequest = {
    demandeur: document.getElementById("demandeur").value,
    departement: document.getElementById("departement").value,
    zone: document.getElementById("zone").value,
    typeTravail: document.getElementById("typeTravail").value,
    description: document.getElementById("description").value,
    urgence: document.getElementById("urgence").value,
    deadline: document.getElementById("deadline").value,
    statut: "Ouvert"
  };

  requests.push(newRequest);

  // Sauvegarde dans localStorage
  localStorage.setItem("topoRequests", JSON.stringify(requests));

  // Mise à jour affichage
  displayRequests();

  // Reset formulaire
  form.reset();
});


// ================================
// 3️⃣ Fonction suppression d’une demande
// ================================
function deleteRequest(index) {
  requests.splice(index, 1);
  localStorage.setItem("topoRequests", JSON.stringify(requests));
  displayRequests();
}


// Charger les demandes existantes au démarrage
displayRequests();
