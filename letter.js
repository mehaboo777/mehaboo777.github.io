/* ============================================
   LOVE LETTER PAGE SCRIPT
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
    const closedCard = document.getElementById("letterClosed");
    const realLetter = document.getElementById("realLetter");

    if (closedCard && realLetter) {
        closedCard.addEventListener("click", openLetter);
    }

    // Initialize hearts
    initHearts();
});

// ============ LETTER OPENING ============

function openLetter() {
    const closedCard = document.getElementById("letterClosed");
    const realLetter = document.getElementById("realLetter");

    if (!closedCard || !realLetter) return;

    // Hide closed card
    closedCard.style.transform = "scale(0.8)";
    closedCard.style.opacity = "0";

    setTimeout(() => {
        closedCard.style.display = "none";
        realLetter.classList.add("showLetter");
        realLetter.style.display = "block";
        
        // Force browser reflow
        realLetter.offsetHeight;
        
        // Start typing after animation
        setTimeout(() => {
            startLetterTyping();
        }, 500);
    }, 400);
}

// ============ LETTER TYPING ANIMATION ============

const loveLetter = [
    "I still remember the first day I texted you.",
    "I didn't know that message would change my life forever.",
    "",
    "From our first meeting…",
    "to our bus journeys…",
    "to the moment I held your hand for the first time…",
    "",
    "Every second with you became a memory I never want to lose.",
    "",
    "You are not just someone I love,",
    "you are my peace,",
    "my happiness,",
    "and the safest place my heart has ever found.",
    "",
    "That night… our first kiss…",
    "will always be the best day of my life.",
    "",
    "No matter how many days pass,",
    "I promise I will always choose you again and again.",
    "",
    "I love you more than words can ever explain. ❤️"
];

let letterTypingStarted = false;

function startLetterTyping() {
    if (letterTypingStarted) return;
    letterTypingStarted = true;

    const letterText = document.getElementById("letterText");
    if (!letterText) return;

    letterText.innerHTML = "";

    let lineIndex = 0;
    let charIndex = 0;

    function typeChar() {
        if (lineIndex >= loveLetter.length) {
            return; // Finished typing
        }

        const currentLine = loveLetter[lineIndex];

        if (charIndex < currentLine.length) {
            letterText.innerHTML += currentLine[charIndex];
            charIndex++;
            setTimeout(typeChar, 35);
        } else {
            // Move to next line
            letterText.innerHTML += "<br>";
            lineIndex++;
            charIndex = 0;
            setTimeout(typeChar, 350);
        }
    }

    typeChar();
}

// ============ FLOATING HEARTS ============

function initHearts() {
    const canvas = document.getElementById("bgHearts");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let hearts = [];
    for (let i = 0; i < 40; i++) {
        hearts.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 18 + 12,
            speed: Math.random() * 0.6 + 0.2,
            opacity: Math.random() * 0.5 + 0.25
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        hearts.forEach(heart => {
            heart.y -= heart.speed;

            if (heart.y < -20) {
                heart.y = canvas.height + 20;
                heart.x = Math.random() * canvas.width;
            }

            ctx.globalAlpha = heart.opacity;
            ctx.fillStyle = "#ff4d88";
            ctx.font = heart.size + "px serif";
            ctx.fillText("❤", heart.x, heart.y);
        });

        requestAnimationFrame(draw);
    }

    draw();
}