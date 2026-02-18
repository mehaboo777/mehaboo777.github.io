function openLetter(){


const env = document.getElementById("mainEnvelope");

// play envelope open animation
env.classList.add("opening");

setTimeout(()=>{

    // hide envelope screen
    document.getElementById("intro").style.display="none";

    // show intro cinematic scene
    const scene = document.getElementById("introScene");
    scene.style.display = "flex";
    startFloatingHearts();

const title = document.querySelector(".introTitle");
const sub = document.querySelector(".introSub");
const days = document.getElementById("daysCounter");
const typing = document.getElementById("typing");

// show title
setTimeout(()=>{ title.classList.add("showIntro"); },400);

// show subtitle
setTimeout(()=>{ sub.classList.add("showIntro"); },1100);

// show days counter
setTimeout(()=>{
showDays();
days.classList.add("showIntro");
},1900);

// start typing LAST
setTimeout(()=>{
typing.classList.add("showIntro");
typeIntro();
},2800);

    // small delay so browser renders scene first
    setTimeout(()=>{
        scene.style.opacity = "1";   // fade in
    },20);

    // AFTER scene is visible → start days + typing

    // start music softly
    const music = document.getElementById("music");
    if(music){
        music.volume = 0.05;
        music.play().catch(()=>{}); // prevents mobile autoplay error
    }

},1200);

}



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


function startIntro(){
showDays();
setTimeout(typeIntro,2000);
}

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

window.addEventListener("load",()=>{
const items=document.querySelectorAll(".memoryItem");
items.forEach((item,index)=>{
setTimeout(()=>{
item.classList.add("show");
},index*800);
});
});
window.addEventListener("resize",()=>{
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
});
function startFloatingHearts(){

const canvas = document.getElementById("bgHearts");
if(!canvas) return;

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts=[];

for(let i=0;i<40;i++){
hearts.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*18+8,
speed:Math.random()*0.6+0.2,
opacity:Math.random()*0.6+0.2
});
}

function drawHearts(){
ctx.clearRect(0,0,canvas.width,canvas.height);

hearts.forEach(h=>{
    h.y -= h.speed;

    if(h.y < -30){
        h.y = canvas.height+30;
        h.x = Math.random()*canvas.width;
    }

    ctx.globalAlpha = h.opacity;
    ctx.fillStyle = "#ff7eb3";
    ctx.font = h.size+"px serif";
    ctx.fillText("❤",h.x,h.y);
});

requestAnimationFrame(drawHearts);
}

drawHearts();

window.addEventListener("resize",()=>{
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
});

}

