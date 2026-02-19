/* =========================
   PAGE DETECTION SYSTEM
   ========================= */

const isIntroPage = document.getElementById("mainEnvelope") !== null;


/* =========================
   ENVELOPE OPEN
   ========================= */

function openLetter(){

const env = document.getElementById("mainEnvelope");
const flash = document.getElementById("openFlash");

env.classList.add("opening");
flash.classList.add("flash");

/* after envelope opens */
setTimeout(()=>{

    // hide envelope
    document.getElementById("intro").style.display="none";

    // SHOW INTRO SCENE
    const scene = document.getElementById("introScene");
    scene.classList.add("active");

    // start hearts
    initHearts();

    // start intro animations
    setTimeout(()=> document.querySelector(".introTitle").classList.add("showIntro"),400);
    setTimeout(()=> document.querySelector(".introSub").classList.add("showIntro"),1000);

    setTimeout(()=>{
        showDays();
        document.getElementById("daysCounter").classList.add("showIntro");
    },1700);

    setTimeout(()=>{
        document.getElementById("typing").classList.add("showIntro");
        typeIntro();
    },2600);

},900);
}



 

/* =========================
   DAYS COUNTER
   ========================= */

function showDays(){

const start = new Date(2023,4,26);
const today = new Date();
const diff = today - start;
const finalDays = Math.floor(diff/(1000*60*60*24));

const counter = document.getElementById("daysCounter");

let current = finalDays - 40;
if(current < 0) current = 0;

function animate(){
current++;
counter.innerHTML =
"We've been together for <span class='highlight'>" + current + "</span> days ❤️";

if(current < finalDays){
requestAnimationFrame(animate);
}
}

animate();
}



/* =========================
   INTRO TYPING TEXT
   ========================= */

const text="Every day with you is my favorite day ❤️";
let i=0;
let typingStarted=false;

function typeIntro(){

if(typingStarted) return;
typingStarted=true;

const t=document.getElementById("typing");
t.innerHTML="";
i=0;

function typing(){
if(i<text.length){
t.innerHTML+=text.charAt(i);
i++;
setTimeout(typing,60);
}else{
setTimeout(()=>{window.location.href="home.html";},2500);
}
}

typing();
}



let letterStarted = false;

function openRealLetter(){

const closed = document.getElementById("letterClosed");
const letter = document.getElementById("realLetter");

closed.style.transform="scale(.7)";
closed.style.opacity="0";

setTimeout(()=>{
closed.style.display="none";
letter.style.display="block";
startLetterTyping();
},400);
}



/* =========================
   MEMORY PAGE ANIMATION
   ========================= */

window.addEventListener("load",()=>{
const items=document.querySelectorAll(".memoryItem");
items.forEach((item,index)=>{
setTimeout(()=>{
item.classList.add("show");
},index*800);
});
});


/* =========================
   PERFECT FLOATING HEARTS
   (MOBILE + PC FIXED)
   ========================= */

function initHearts(){
if(!document.getElementById("bgHearts")) return;

const canvas = document.getElementById("bgHearts");
if(!canvas) return;

const ctx = canvas.getContext("2d");

function resizeCanvas(){
    const ratio = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(ratio,0,0,ratio,0,0);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let hearts=[];

for(let i=0;i<45;i++){
    hearts.push({
        x:Math.random()*window.innerWidth,
        y:Math.random()*window.innerHeight,
        size:Math.random()*14+6,
        speed:Math.random()*0.7+0.25,
        opacity:Math.random()*0.5+0.2
    });
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    hearts.forEach(h=>{
        h.y -= h.speed;

        if(h.y < -20){
            h.y = window.innerHeight + 20;
            h.x = Math.random()*window.innerWidth;
        }

        ctx.globalAlpha = h.opacity;
        ctx.fillStyle = "#ff6fa0";
        ctx.font = h.size+"px serif";
        ctx.fillText("❤",h.x,h.y);
    });

    requestAnimationFrame(draw);
}

draw();
}
/* ===== PERFECT LETTER TYPING (FIXED) ===== */

const loveLetter = [
"I still remember the first day I texted you.",
"I didn’t know that message would change my life forever.",
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

function startLetterTyping(){

const el = document.getElementById("letterText");
if(!el) return;

el.innerHTML = "";

let line = 0;
let char = 0;

function type(){

// FINISHED LETTER
if(line >= loveLetter.length){
    // remove typing cursor at the end
    el.innerHTML = el.innerHTML.replace(/\|$/, "");
    return;
}

// typing characters
if(char < loveLetter[line].length){
    el.innerHTML += loveLetter[line][char];
    char++;
    setTimeout(type,35);
}
else{
    el.innerHTML += "<br>";
    line++;
    char = 0;
    setTimeout(type,450);
}

}

type();
}
let taps=0;
document.body.addEventListener("click",()=>{
taps++;
if(taps==7){
alert("You found my secret… I love you more than I show ❤️");
}
});
/* ===== MEMORY SCROLL REVEAL ===== */

window.addEventListener("scroll", ()=>{

const items = document.querySelectorAll(".polaroid");

items.forEach(item=>{
const rect = item.getBoundingClientRect();

if(rect.top < window.innerHeight - 80){
item.classList.add("show");
}
});

});
/* ===== MEMORY PAGE AUTO APPEAR FIX ===== */

window.addEventListener("load", ()=>{

const items = document.querySelectorAll(".polaroid");

items.forEach((item,index)=>{
setTimeout(()=>{
item.classList.add("show");
}, index*500);
});

});
/* ===== MEMORY CLICK VIEWER ===== */

const viewer = document.getElementById("memoryViewer");
const viewerImg = document.getElementById("memoryImage");
const viewerText = document.getElementById("memoryText");
const closeBtn = document.getElementById("closeMemory");

/* custom messages for each photo */
const memoryMessages = [
"That day… I realized my happiness started with you ❤️",
"I still remember how your hand felt in mine 🤍",
"I didn’t say it that day… but I knew I loved you already",
"Every journey was beautiful because you were beside me 🚍"
];

/* click each polaroid */
document.querySelectorAll(".polaroid").forEach((photo, index)=>{
photo.addEventListener("click", ()=>{
const img = photo.querySelector("img");

viewerImg.src = img.src;
viewerText.innerText = memoryMessages[index];

viewer.classList.add("show");
document.body.style.overflow="hidden";
});
});

/* close */
closeBtn.addEventListener("click", ()=>{
viewer.classList.remove("show");
document.body.style.overflow="auto";
});

/* tap outside closes */
viewer.addEventListener("click",(e)=>{
if(e.target === viewer){
viewer.classList.remove("show");
document.body.style.overflow="auto";
}
});

