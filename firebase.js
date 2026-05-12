/* ============================================
   MEMORY PAGE
============================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs
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

document.addEventListener("DOMContentLoaded", async () => {

    const viewer =
        document.getElementById("memoryViewer");

    if (!viewer) return;

    const viewerImg =
        document.getElementById("memoryImage");

    const viewerText =
        document.getElementById("memoryText");

    const closeMemory =
        document.getElementById("closeMemory");

    const gallery =
        document.querySelector(".polaroid-gallery");
const prevBtn =
    document.getElementById("prevMemory");

const nextBtn =
    document.getElementById("nextMemory");

let currentIndex = 0;
nextBtn.addEventListener("click", () => {

    showMemory(currentIndex + 1);
});

prevBtn.addEventListener("click", () => {

    showMemory(currentIndex - 1);
});
   function showMemory(index){

    const cards =
        [...document.querySelectorAll(".polaroid")];

    if(index < 0)
        index = cards.length - 1;

    if(index >= cards.length)
        index = 0;

    currentIndex = index;

    const card = cards[index];

    const img =
        card.querySelector("img");

    const caption =
        card.querySelector(".polaroid-caption");

    viewerImg.src = img.src;

    viewerText.innerText =
        caption.innerText;

    viewer.classList.add("show");

    document.body.style.overflow = "hidden";
}

function attachViewer(card){

    card.addEventListener("click", () => {

        const cards =
            [...document.querySelectorAll(".polaroid")];

        currentIndex =
            cards.indexOf(card);

        showMemory(currentIndex);
    });
}

document.querySelectorAll(".polaroid")
    .forEach(card => {

        attachViewer(card);
    });


    // LOAD SAVED MEMORIES

    const querySnapshot =
        await getDocs(collection(db, "memories"));

    querySnapshot.forEach((doc) => {

        const memory = doc.data();

        const div =
            document.createElement("div");

        div.className = "polaroid";

        div.innerHTML = `
            <img src="${memory.image}">
            <p class="polaroid-caption">
                ${memory.caption}
            </p>
        `;

        attachViewer(div);

        gallery.prepend(div);
    });

    // UPLOAD

    const openUpload =
        document.getElementById("openUpload");

    const uploadModal =
        document.getElementById("uploadModal");

    const closeUpload =
        document.getElementById("closeUpload");

    const photoInput =
        document.getElementById("photoInput");

    const captionInput =
        document.getElementById("captionInput");

    const saveMemoryBtn =
        document.getElementById("saveMemoryBtn");

    openUpload.addEventListener("click", () => {

        uploadModal.classList.add("show");
    });

    closeUpload.addEventListener("click", () => {

        uploadModal.classList.remove("show");
    });

    saveMemoryBtn.addEventListener("click", () => {

        const file = photoInput.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = async function(e){

            const imageData = e.target.result;

            const caption =
                captionInput.value || "Our Memory ❤️";

            // SAVE TO FIRESTORE

            await addDoc(
                collection(db, "memories"),
                {
                    image: imageData,
                    caption: caption
                }
            );

            // SHOW DIRECTLY

            const div =
                document.createElement("div");

            div.className = "polaroid";

            div.innerHTML = `
                <img src="${imageData}">
                <p class="polaroid-caption">
                    ${caption}
                </p>
            `;

            attachViewer(div);

            gallery.prepend(div);

            uploadModal.classList.remove("show");

            photoInput.value = "";

            captionInput.value = "";
        };

        reader.readAsDataURL(file);
    });
let touchStartX = 0;
let touchEndX = 0;

viewer.addEventListener("touchstart", (e) => {

    touchStartX = e.changedTouches[0].screenX;
});

viewer.addEventListener("touchend", (e) => {

    touchEndX = e.changedTouches[0].screenX;

    handleSwipe();
});

function handleSwipe(){

    if(touchEndX < touchStartX - 50){

        showMemory(currentIndex + 1);
    }

    if(touchEndX > touchStartX + 50){

        showMemory(currentIndex - 1);
    }
}

});
