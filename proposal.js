/* ============================================
   PROPOSAL PAGE SCRIPT
   ============================================ */

window.addEventListener("DOMContentLoaded", () => {
    const proposalBox = document.querySelector(".proposal-box");
    const noBtn = document.getElementById("noBtn");

    // Show proposal box
    if (proposalBox) {
        setTimeout(() => {
            proposalBox.classList.add("showProposal");
        }, 300);
    }

    // Show NO button after delay
    if (noBtn) {
        setTimeout(() => {
            noBtn.classList.add("showNo");
        }, 1500);
    }

    // ============ RUNAWAY NO BUTTON ============

    function moveNoButton() {
        const padding = 60;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const maxX = vw - noBtn.offsetWidth - padding;
        const maxY = vh - noBtn.offsetHeight - padding;

        const newX = Math.random() * maxX + padding / 2;
        const newY = Math.random() * maxY + padding / 2;

        noBtn.style.left = newX + "px";
        noBtn.style.top = newY + "px";
    }

    // Desktop - mouse proximity
    document.addEventListener("mousemove", (e) => {
        if (!noBtn || !noBtn.classList.contains("showNo")) return;

        const rect = noBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = Math.abs(e.clientX - centerX);
        const dy = Math.abs(e.clientY - centerY);

        if (dx < 120 && dy < 80) {
            moveNoButton();
        }
    });

    // Mobile - touch proximity
    document.addEventListener("touchstart", (e) => {
        if (!noBtn || !noBtn.classList.contains("showNo")) return;

        const touch = e.touches[0];
        const rect = noBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = Math.abs(touch.clientX - centerX);
        const dy = Math.abs(touch.clientY - centerY);

        if (dx < 130 && dy < 100) {
            moveNoButton();
        }
    });

    // Click fallback
    if (noBtn) {
        noBtn.addEventListener("click", (e) => {
            e.preventDefault();
            moveNoButton();
        });
    }

    // ============ FLOATING HEARTS BACKGROUND ============

    const canvas = document.getElementById("proposalHearts");
    if (canvas) {
        const ctx = canvas.getContext("2d");

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        let hearts = [];
        for (let i = 0; i < 60; i++) {
            hearts.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 18 + 8,
                speed: Math.random() * 0.7 + 0.3,
                alpha: Math.random() * 0.6 + 0.3
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

                ctx.globalAlpha = heart.alpha;
                ctx.fillStyle = "#ff6fa0";
                ctx.font = heart.size + "px serif";
                ctx.fillText("❤", heart.x, heart.y);
            });

            requestAnimationFrame(draw);
        }

        draw();
    }
});

// ============ SAY YES FUNCTION ============

window.sayYes = function() {
    // Prevent scrolling
    document.body.style.overflow = "hidden";

    // Create celebration screen
    const celebrationScreen = document.createElement("div");
    celebrationScreen.className = "yesRevealScreen";
    celebrationScreen.innerHTML = `
        <div class="yesRevealContent">
            <h1 class="yesTitle">Awwwhhhh Babeeehhh! 💍</h1>
            <p class="yesSub">Inkkariyahh nteh kuttyh love mehhhh</p>
            <div class="yesMessage">
                I promise to hold your hand in every situation,<br>
                I will be with you always,<br>
                and I'll make you happy forever.<br><br>
                You are not just my love,<br>
                you are my home. ❤️
            </div>
            <button class="continueBtn" onclick="goHome()">
                Continue Our Story →
            </button>
        </div>
    `;

    document.body.appendChild(celebrationScreen);

    // Trigger animation
    setTimeout(() => {
        celebrationScreen.classList.add("activeYes");
    }, 50);

    // Create floating heart particles
    createCelebrationHearts();
};

// ============ GO HOME FUNCTION ============

window.goHome = function() {
    window.location.href = "home.html";
};

// ============ CELEBRATION HEARTS ============

function createCelebrationHearts() {
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement("div");
        heart.className = "loveParticle";
        heart.innerHTML = "❤️";

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.bottom = "-40px";
        heart.style.fontSize = (14 + Math.random() * 25) + "px";
        heart.style.opacity = Math.random() * 0.8 + 0.3;
        heart.style.animationDuration = (4 + Math.random() * 4) + "s";
        heart.style.animationDelay = (Math.random() * 0.5) + "s";

        document.body.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 9000);
    }
}

// ============ ADDITIONAL STYLES FOR YES REVEAL ============

// Add these styles via JavaScript since they're complex

const style = document.createElement('style');
style.textContent = `
    .yesRevealScreen {
        position: fixed;
        inset: 0;
        background: linear-gradient(135deg, #ff6fa0, #ff3f7f);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        transform: scale(1.2);
        transition: all 1s cubic-bezier(0.22, 0.9, 0.3, 1);
    }

    .yesRevealScreen.activeYes {
        opacity: 1;
        transform: scale(1);
    }

    .yesRevealContent {
        text-align: center;
        color: white;
        max-width: 650px;
        padding: 40px 25px;
        animation: yesPop 1.4s cubic-bezier(0.22, 0.9, 0.3, 1);
    }

    @keyframes yesPop {
        0% {
            transform: translateY(80px);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .yesTitle {
        font-size: 42px;
        margin-bottom: 10px;
        text-shadow: 0 0 25px rgba(255, 255, 255, 0.6);
    }

    .yesSub {
        font-size: 22px;
        opacity: 0.95;
        margin-bottom: 25px;
    }

    .yesMessage {
        font-size: 19px;
        line-height: 1.8;
        margin-bottom: 30px;
    }

    .continueBtn {
        margin-top: 25px;
        padding: 14px 28px;
        border: none;
        border-radius: 14px;
        font-size: 16px;
        background: white;
        color: #ff3f7f;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.25s ease;
        box-shadow: 0 0 25px rgba(255, 255, 255, 0.45);
    }

    .continueBtn:hover {
        transform: scale(1.08);
        box-shadow: 0 0 40px rgba(255, 255, 255, 0.8);
    }

    .loveParticle {
        position: fixed;
        animation: loveFloat linear forwards;
        pointer-events: none;
    }

    @keyframes loveFloat {
        0% {
            transform: translateY(0) scale(0.7);
            opacity: 0;
        }
        15% {
            opacity: 1;
        }
        100% {
            transform: translateY(-110vh) scale(1.4);
            opacity: 0;
        }
    }
`;

document.head.appendChild(style);