// --- Configuration Firebase ---
const firebaseConfig = {
    apiKey: "AIzaSyD**************", 
    authDomain: "topo-request.firebaseapp.com",
    projectId: "topo-request",
    storageBucket: "topo-request.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456"
};

// Initialise Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- Fonction pour créer une demande ---
document.getElementById("requestForm").addEventListener("submit", function(e){
    e.preventDefault();

    const title = document.getElementById("title").value;
    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value;

    db.collection("requests").add({
        title: title,
        type: type,
        description: description,
        status: "open",
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert("Demande envoyée avec succès !");
        document.getElementById("requestForm").reset();
    })
    .catch((error) => {
        console.error("Erreur:", error);
        alert("Erreur lors de l’envoi");
    });
});

// --- Affichage des demandes dans la liste ---
db.collection("requests").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
    let list = document.getElementById("requestsList");
    if (!list) return;

    list.innerHTML = "";

    snapshot.forEach(doc => {
        let data = doc.data();

        let item = document.createElement("div");
        item.className = "request-item";
        item.innerHTML = `
            <h3>${data.title}</h3>
            <p><strong>Type:</strong> ${data.type}</p>
            <p>${data.description}</p>
            <p>Status: <b>${data.status}</b></p>
            <small>${data.timestamp ? data.timestamp.toDate() : ""}</small>
            <hr>
        `;
        list.appendChild(item);
    });
});
