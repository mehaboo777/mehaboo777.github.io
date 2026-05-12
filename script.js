/* ============================================
   ENHANCED ROMANTIC WEBSITE - MAIN SCRIPT
   ============================================ */

// ============ ENVELOPE OPENING ============

function openLetter() {
    const envelope = document.getElementById("mainEnvelope");
    const flash = document.getElementById("openFlash");
    const intro = document.getElementById("intro");
    const introScene = document.getElementById("introScene");

    if (!envelope || !flash) return;

    // Add opening animation
    envelope.classList.add("opening");
    flash.classList.add("flash");

    // After envelope opens
    setTimeout(() => {
        intro.style.display = "none";
        introScene.classList.add("active");
        
        // Initialize floating hearts
        initHearts();
        
        // Stagger text animations
        setTimeout(() => {
            document.querySelector(".intro-title").classList.add("showIntro");
        }, 200);
        
        setTimeout(() => {
            document.querySelector(".intro-subtitle").classList.add("showIntro");
        }, 800);
        
        setTimeout(() => {
            showDaysCounter();
            document.getElementById("daysCounter").classList.add("showIntro");
        }, 1400);
        
        setTimeout(() => {
            document.getElementById("typing").classList.add("showIntro");
            typeIntroText();
        }, 2200);
    }, 900);
}

// ============ DAYS COUNTER ============

function showDaysCounter() {
    const startDate = new Date(2023, 4, 26); // May 26, 2023
    const today = new Date();
    const timeDiff = today - startDate;
    const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    const counter = document.getElementById("daysCounter");
    let currentCount = daysPassed - 40;
    if (currentCount < 0) currentCount = 0;

    function animateCount() {
        currentCount++;
        counter.innerHTML = `We've been together for <span class="highlight">${currentCount}</span> days ❤️`;
        
        if (currentCount < daysPassed) {
            requestAnimationFrame(animateCount);
        }
    }

    animateCount();
}

// ============ INTRO TYPING TEXT ============

const introText = "You are mahh everythingh babeehhhh❤️";
let typingIndex = 0;
let isTyping = false;

function typeIntroText() {
    if (isTyping) return;
    isTyping = true;

    const typingElement = document.getElementById("typing");
    if (!typingElement) return;

    typingElement.innerHTML = "";
    typingIndex = 0;

    function type() {
        if (typingIndex < introText.length) {
            typingElement.innerHTML += introText.charAt(typingIndex);
            typingIndex++;
            setTimeout(type, 60);
        } else {
            // Redirect after typing finishes
            setTimeout(() => {
                window.location.href = "home.html";
            }, 2500);
        }
    }

    type();
}

// ============ FLOATING HEARTS ANIMATION ============

function initHearts() {
    const canvas = document.getElementById("bgHearts");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Handle canvas resizing
    function resizeCanvas() {
        const ratio = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * ratio;
        canvas.height = window.innerHeight * ratio;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create heart particles
    let hearts = [];
    for (let i = 0; i < 45; i++) {
        hearts.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 14 + 6,
            speed: Math.random() * 0.7 + 0.25,
            opacity: Math.random() * 0.5 + 0.2
        });
    }

    // Animation loop
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        hearts.forEach(heart => {
            heart.y -= heart.speed;

            // Reset heart when it goes off screen
            if (heart.y < -20) {
                heart.y = window.innerHeight + 20;
                heart.x = Math.random() * window.innerWidth;
            }

            // Draw heart
            ctx.globalAlpha = heart.opacity;
            ctx.fillStyle = "#ff6fa0";
            ctx.font = heart.size + "px serif";
            ctx.fillText("❤️", heart.x, heart.y);
        });

        requestAnimationFrame(draw);
    }

    draw();
}


// ============ SCROLL REVEAL ANIMATION ============

window.addEventListener("scroll", () => {
    const polaroids = document.querySelectorAll(".polaroid");
    
    polaroids.forEach(polaroid => {
        const rect = polaroid.getBoundingClientRect();
        
        if (rect.top < window.innerHeight - 100) {
            polaroid.classList.add("show");
        }
    });
});

// ============ EASTER EGG ============

let tapCount = 0;
document.body.addEventListener("click", () => {
    tapCount++;
    
    if (tapCount === 7) {
        showEasterEgg();
        tapCount = 0;
    }
});

function showEasterEgg() {
    alert("🎉 Shooohh! You found my secret message! 🎉\n\nI love you more than I show babeeh, and I promise I'll be with my girl in every situation ❤️\n\nForever yours! 💕");
}

// ============ SMOOTH SCROLL ============

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// ============ PAGE LOAD ANIMATION ============

window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});

// ============ INTERSECTION OBSERVER FOR LAZY ANIMATIONS ============

const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements that need animation
document.querySelectorAll(".polaroid, .heart-photo").forEach(el => {
    observer.observe(el);
});
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

    function attachViewer(card){

        card.addEventListener("click", () => {

            const img = card.querySelector("img");

            const caption =
                card.querySelector(".polaroid-caption");

            viewerImg.src = img.src;

            viewerText.innerText =
                caption.innerText;

            viewer.classList.add("show");

            document.body.style.overflow = "hidden";
        });
    }

    document.querySelectorAll(".polaroid")
        .forEach(card => {
            attachViewer(card);
        });

    closeMemory.addEventListener("click", () => {

        viewer.classList.remove("show");

        document.body.style.overflow = "auto";
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

});