/* ================= PROPOSAL PAGE ================= */

document.addEventListener("DOMContentLoaded", ()=>{

/* ---------- HEART BACKGROUND ---------- */

const canvas = document.getElementById("proposalHearts");
if(!canvas) return;
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


/* ---------- BOX ANIMATION ---------- */

const box = document.querySelector(".proposalBox");

setTimeout(()=>{
box.classList.add("showProposal");
},500);

});


/* ---------- YES BUTTON ---------- */

function sayYes(){

// stop scrolling
document.body.style.overflow = "hidden";

/* ---------- CREATE OVERLAY SCREEN ---------- */

const reveal = document.createElement("div");
reveal.className = "yesRevealScreen";

reveal.innerHTML = `
<div class="yesRevealContent">

    <h1 class="yesTitle">From today... 💍</h1>

    <p class="yesSub">it's you and me</p>

    <div class="yesMessage">
        I promise to hold your hand in every storm,
        to laugh with you in every joy,
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

/* start hearts */
createLoveParticles();

/* trigger animation */
setTimeout(()=>{
    reveal.classList.add("activeYes");
},80);
}
function goHome(){
window.location.href="home.html";
}

/* ---------- LOVE PARTICLES ---------- */

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
