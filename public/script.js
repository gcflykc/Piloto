// Importa as funções necessárias do Firebase SDK
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDENL8dcmEoJNweSkoaZEssxZ0Ud7McSP8",
    authDomain: "mvp-mentejovem.firebaseapp.com",
    projectId: "mvp-mentejovem",
    storageBucket: "mvp-mentejovem.firebasestorage.app",
    messagingSenderId: "960533273556",
    appId: "1:960533273556:web:ecfe6c7e841b56b8151441",
    measurementId: "G-3S4SD8LK6V"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Função para salvar o resultado do quiz no Firestore
export async function saveResultToFirebase(score, classification) {
    const user = auth.currentUser;
    if (user) {
        try {
            await addDoc(collection(db, 'quizResults'), {
                userId: user.uid,
                score: score,
                classification: classification,
                timestamp: new Date()
            });
            console.log('Resultado salvo com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar resultado:', error);
            throw error;
        }
    } else {
        throw new Error('Usuário não autenticado');
    }
}

// Autenticação no login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = 'dashboard.html';
        } catch (error) {
            document.getElementById('errorMessage').textContent = 'Erro: ' + error.message;
        }
    });
}

// Exporta auth e db para uso em outros arquivos
export { auth, db };
