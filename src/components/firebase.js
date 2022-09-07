import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { ref, onUnmounted, computed } from "vue";

firebase.initializeApp({
  apiKey: "AIzaSyAR6rDGT-eCA86KadPiCVawjvmsGVbQG-Y",
  authDomain: "chat-app-coding-test.firebaseapp.com",
  projectId: "chat-app-coding-test",
  storageBucket: "chat-app-coding-test.appspot.com",
  messagingSenderId: "14726944853",
  appId: "1:14726944853:web:c5c14fa9b5a71d57c11cdc",
});

const auth = firebase.auth();

export function useAuth() {
  const user = ref(null);
  const unsubscribe = auth.onAuthStateChanged(
    (usercb) => (user.value = usercb)
  );
  onUnmounted(unsubscribe);
  const isLogin = computed(() => user.value !== null);

  const signIn = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(googleProvider);
  };

  const signOut = () => auth.signOut();

  return { user, isLogin, signIn, signOut };
}
const firestore = firebase.firestore();
const msgCollection = firestore.collection("messages");
// querying and filtering by last 100 because a user can send to many messages and it will take a heavy load for them and long wait time to get the messages.
const msgsQuery = msgCollection.orderBy("createdAt", "desc").limit(100);

export function useChat() {
  const msgs = ref([]);
  const unsubscribe = msgsQuery.onSnapshot((snapshot) => {
    msgs.value = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .reverse();
  });
  onUnmounted(unsubscribe);

  const { user, isLogin } = useAuth();
  const sendText = (text) => {
    if (!isLogin.value) return;
    const { uid, displayName } = user.value;
    msgCollection.add({
      username: displayName,
      userId: uid,
      text: text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return { msgs, sendText };
}
