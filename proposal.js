/* ======================================================
   PROPOSAL PAGE SCRIPT (CLEAN VERSION)
   ====================================================== */

window.addEventListener("DOMContentLoaded", ()=>{

/* ---------------- SHOW PROPOSAL BOX ---------------- */

const box = document.querySelector(".proposalBox");
const noBtn = document.getElementById("noBtn");

/* animate box */
setTimeout(()=>{
    box.classList.add("showProposal");
},500);

/* show NO button AFTER box animation */
setTimeout(()=>{
    noBtn.classList.add("showNo");
},1800);


/* ---------------- RUNAWAY NO BUTTON ---------------- */

function moveNoButton(){

    const padding = 80;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const maxX = vw - noBtn.offsetWidth - padding;
    const maxY = vh - noBtn.offsetHeight - padding;

    const newX = Math.random() * maxX + padding/2;
    const newY = Math.random() * maxY + padding/2;

    noBtn.style.left = newX + "px";
    noBtn.style.top = newY + "px";
}

/* DESKTOP (mouse comes near) */
document.addEventListener("mousemove",(e)=>{
    const rect = noBtn.getBoundingClientRect();

    const dx = Math.abs(e.clientX - (rect.left + rect.width/2));
    const dy = Math.abs(e.clientY - (rect.top + rect.height/2));

    if(dx < 120 && dy < 80){
        moveNoButton();
    }
});

/* MOBILE (finger tries to tap) */
document.addEventListener("touchstart",(e)=>{
    const t = e.touches[0];
    const rect = noBtn.getBoundingClientRect();

    const dx = Math.abs(t.clientX - (rect.left + rect.width/2));
    const dy = Math.abs(t.clientY - (rect.top + rect.height/2));

    if(dx < 130 && dy < 100){
        moveNoButton();
    }
});

/* if somehow clicked */
noBtn.addEventListener("click",()=>{
    moveNoButton();
});


/* ---------------- HEART BACKGROUND ---------------- */

const canvas = document.getElementById("proposalHearts");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize",resize);

let hearts=[];

for(let i=0;i<60;i++){
    hearts.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        size:Math.random()*18+8,
        speed:Math.random()*0.7+0.3,
        alpha:Math.random()*0.6+0.3
    });
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    hearts.forEach(h=>{
        h.y -= h.speed;

        if(h.y < -20){
            h.y = canvas.height+20;
            h.x = Math.random()*canvas.width;
        }

        ctx.globalAlpha=h.alpha;
        ctx.fillStyle="#ff6fa0";
        ctx.font=h.size+"px serif";
        ctx.fillText("❤",h.x,h.y);
    });

    requestAnimationFrame(draw);
}
draw();

});
/* make YES button work from HTML onclick */
window.sayYes = function(){

    // stop scrolling
    document.body.style.overflow = "hidden";

    const reveal = document.createElement("div");
    reveal.className = "yesRevealScreen";

    reveal.innerHTML = `
    <div class="yesRevealContent">

        <h1 class="yesTitle">Awwwhhhh Babeeeehhh 💍</h1>

        <p class="yesSub">inkkariyahh nteh kuttyh love mehhhh</p>

        <div class="yesMessage">
            I promise to hold your hand in every situantion,
             will be withh youh and ill make youh happyhh,
            and to love you in every lifetime.<br><br>

            You are not just my love,<br>
            you are my home. ❤️
        </div>

        <button class="continueBtn" onclick="goHome()">
            Continue Our Story →
        </button>

    </div>
    `;

    document.body.appendChild(reveal);

    setTimeout(()=>{
        reveal.classList.add("activeYes");
    },80);

    createLoveParticles();
};

window.goHome = function(){
    window.location.href="home.html";
};

/* floating hearts after YES */
function createLoveParticles(){

    for(let i=0;i<25;i++){

        const heart = document.createElement("div");
        heart.className="loveParticle";
        heart.innerHTML="❤️";

        heart.style.left = Math.random()*100+"vw";
        heart.style.animationDuration = (4+Math.random()*4)+"s";
        heart.style.fontSize = (14+Math.random()*20)+"px";

        document.body.appendChild(heart);

        setTimeout(()=>{
            heart.remove();
        },8000);
    }
}
