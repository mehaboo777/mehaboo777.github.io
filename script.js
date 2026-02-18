/* =========================
   PAGE DETECTION SYSTEM
   ========================= */

const isIntroPage = document.getElementById("mainEnvelope") !== null;


/* =========================
   ENVELOPE OPEN
   ========================= */

function openLetter(){

if(!isIntroPage) return;

const env = document.getElementById("mainEnvelope");
env.classList.add("opening");

setTimeout(()=>{

    // hide envelope
    document.getElementById("intro").style.display="none";

    // show intro scene properly
    const scene = document.getElementById("introScene");
    scene.classList.add("active");

    // start hearts now
    initHearts();

    const title = document.querySelector(".introTitle");
    const sub = document.querySelector(".introSub");
    const days = document.getElementById("daysCounter");
    const typing = document.getElementById("typing");

    /* ---- CINEMATIC TEXT SEQUENCE ---- */

    /* wait for card to finish appearing */
setTimeout(()=> title.classList.add("showIntro"), 400);
setTimeout(()=> sub.classList.add("showIntro"), 1100);

setTimeout(()=>{
    showDays();
    days.classList.add("showIntro");
},1900);

setTimeout(()=>{
    typing.classList.add("showIntro");
    typeIntro();
},2800);


    // music
    const music = document.getElementById("music");
    if(music){
        music.volume = 0.05;
        music.play().catch(()=>{});
    }

},1200);
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

if(letterStarted) return;   // prevents double typing
letterStarted = true;

document.getElementById("letterClosed").style.display="none";

const letter = document.getElementById("realLetter");
letter.style.display="block";

startLetterTyping();
}

function typeLetter(){
const el=document.getElementById("letterText");
if(!el) return;

if(li<letterMessage.length){
el.innerHTML+=letterMessage.charAt(li);
li++;
setTimeout(typeLetter,30);
}
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

