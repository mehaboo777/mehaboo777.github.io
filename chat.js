import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {

    apiKey: "AIzaSyA-LByjC1Foj3zqaKVeugb70Gu0gV2jxWg",

    authDomain: "our-memories-ab095.firebaseapp.com",

    projectId: "our-memories-ab095",

    storageBucket: "our-memories-ab095.appspot.com",

    messagingSenderId: "862785444694",

    appId: "1:862785444694:web:fb331620fa97aa9aea54f7"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

const chatMessages =
    document.getElementById("chatMessages");

const messageInput =
    document.getElementById("messageInput");

const sendBtn =
    document.getElementById("sendBtn");
    const imageInput =
    document.getElementById("imageInput");

const voiceBtn =
    document.getElementById("voiceBtn");

/* SEND MESSAGE */

async function sendMessage(){

    const text =
        messageInput.value.trim();

    if(!text) return;

    await addDoc(collection(db, "chat"), {

        text: text,

        sender: "me",

        timestamp: serverTimestamp()
    });

    messageInput.value = "";
}

sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keypress", (e) => {

    if(e.key === "Enter"){

        sendMessage();
    }
});
/* IMAGE MESSAGE */

imageInput.addEventListener("change", async () => {

    const file =
        imageInput.files[0];

    if(!file) return;

    const storageRef =
        ref(storage, `chatImages/${Date.now()}`);

    await uploadBytes(storageRef, file);

    const imageUrl =
        await getDownloadURL(storageRef);

    await addDoc(collection(db, "chat"), {

        image: imageUrl,

        sender: "me",

        timestamp: serverTimestamp()
    });
});

/* LIVE CHAT */

const q = query(
    collection(db, "chat"),
    orderBy("timestamp")
);

onSnapshot(q, (snapshot) => {

    chatMessages.innerHTML = "";

    snapshot.forEach((doc) => {

        const msg = doc.data();

        const div =
            document.createElement("div");

        div.className =
            `message ${msg.sender === "me"
                ? "sent"
                : "received"
            }`;

        if(msg.image){

    div.innerHTML = `
        <img src="${msg.image}"
        class="chat-image">
    `;

}else if(msg.audio){

    div.innerHTML = `
        <audio controls>
            <source
                src="${msg.audio}">
        </audio>
    `;

}else{

    div.innerText = msg.text;
}

        chatMessages.appendChild(div);
    });

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
});
/* VOICE RECORDING */

let mediaRecorder;

let audioChunks = [];

voiceBtn.addEventListener("click", async () => {

    if(!mediaRecorder ||
       mediaRecorder.state === "inactive"){

        const stream =
            await navigator.mediaDevices
            .getUserMedia({ audio: true });

        mediaRecorder =
            new MediaRecorder(stream);

        mediaRecorder.start();

        voiceBtn.innerText = "⏹️";

        audioChunks = [];

        mediaRecorder.addEventListener(
            "dataavailable",
            event => {

            audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener(
            "stop",
            async () => {

            const audioBlob =
                new Blob(audioChunks);

            const storageRef =
                ref(
                    storage,
                    `voiceMessages/${Date.now()}`
                );

            await uploadBytes(
                storageRef,
                audioBlob
            );

            const audioUrl =
                await getDownloadURL(storageRef);

            await addDoc(
                collection(db, "chat"),
                {
                    audio: audioUrl,

                    sender: "me",

                    timestamp: serverTimestamp()
                }
            );

            voiceBtn.innerText = "🎙️";
        });

    }else{

        mediaRecorder.stop();
    }
});