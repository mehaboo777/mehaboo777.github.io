/* =========================
   ENVELOPE OPEN
   ========================= */

function openLetter(){

const env = document.getElementById("mainEnvelope");
env.classList.add("opening");

setTimeout(()=>{

    // hide envelope
    document.getElementById("intro").style.display="none";

    // show intro scene
    const scene = document.getElementById("introScene");
    scene.style.display="flex";

    // start floating hearts ONLY now
    initHearts();

    const title = document.querySelector(".introTitle");
    const sub = document.querySelector(".introSub");
    const days = document.getElementById("daysCounter");
    const typing = document.getElementById("typing");

    // animations sequence
    setTimeout(()=>{ title.classList.add("showIntro"); },400);
    setTimeout(()=>{ sub.classList.add("showIntro"); },1100);

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
const days = Math.floor(diff/(1000*60*60*24));

const counter = document.getElementById("daysCounter");

if(counter){
counter.innerHTML =
"We've been together for <span class='highlight'>" + days + "</span> days ❤️";
}
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


/* =========================
   LOVE LETTER
   ========================= */

const letterMessage=`Every moment with you feels like a beautiful dream that I never want to wake from.
You are my happiness, my peace and my forever.
Thank you for loving me and staying beside me.`;

let li=0;

function openRealLetter(){
document.getElementById("letterClosed").style.display="none";
document.getElementById("realLetter").style.display="block";
typeLetter();
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
