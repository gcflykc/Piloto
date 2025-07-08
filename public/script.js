// Configuração do Firebase
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SUA_APP_ID"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Função para salvar o resultado do quiz no Firestore
function saveResultToFirebase(score, classification) {
    const user = firebase.auth().currentUser;
    if (user) {
        db.collection('quizResults').add({
            userId: user.uid,
            score: score,
            classification: classification,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            console.log('Resultado salvo com sucesso!');
        }).catch((error) => {
            console.error('Erro ao salvar resultado:', error);
        });
    }
}

// Autenticação no login
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            document.getElementById('errorMessage').textContent = 'Erro: ' + error.message;
        });
});
