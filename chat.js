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
/* PHOTO OPTION */

imageInput.addEventListener("click", () => {

    alert(
        "Whatsappil ayakk ponnaahhh ❤️"
    );
});

/* VOICE OPTION */

voiceBtn.addEventListener("click", () => {

    alert(
        "Whatsappil ayakk chundhari penneehh 🎙️❤️"
    );
});