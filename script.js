/* BIG ENVELOPE */
function openLetter(){

    const env = document.getElementById("mainEnvelope");

    // play envelope animation
    env.classList.add("opening");

    setTimeout(()=>{

        // show site FIRST
        document.getElementById("intro").style.display="none";
        const main=document.getElementById("mainSite");
        main.style.display="block";

        // NOW browser can render elements
        showDays();

        // start music
       const music = document.getElementById("music");
music.volume = 0.05; // very soft
music.play();


        // start animations
        setTimeout(()=>{
            startIntroAnimations();
initSlider();

        },200);

    },1200);
}



/* TYPING TEXT */
const text = "Every day with you is my favorite day ❤️";
let i=0;

function typeWriter(){
    if(i<text.length){
        document.getElementById("typing").innerHTML+=text.charAt(i);
        i++;
        setTimeout(typeWriter,60);
    }
}

/* PHOTO REVEAL */
const loveMemories=[
    {img:"love1.jpg",text:"The first time I looked at you ❤️"},
    {img:"love2.jpg",text:"Our late night talks 🌙"},
    {img:"love3.jpg",text:"I still smile at this memory 😊"},
    {img:"love4.jpg",text:"My favorite person in the world 💖"}
];


function revealMemories(){

    const gallery=document.getElementById("heartGallery");

    loveMemories.forEach((memory,index)=>{

        setTimeout(()=>{

            const card=document.createElement("div");
            card.className="memoryCard";

            const img=document.createElement("img");
            img.src=memory.img;
            img.className="memoryPhoto";

            const caption=document.createElement("div");
            caption.className="caption";
            caption.innerText=memory.text;

            card.appendChild(img);
            card.appendChild(caption);
            gallery.appendChild(card);

            setTimeout(()=>{
                card.classList.add("show");
                img.classList.add("show");
            },100);

        },index*1800);
    });
}


function showDays(){

    const counter = document.getElementById("daysCounter");

    const startDate = new Date(2023,4,26); 
    // NOTE: month index: 4 = May (JavaScript months start from 0)

    const today = new Date();

    const diff = today.getTime() - startDate.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    counter.innerHTML =
    "We've been together for <span class='highlight'>" + days + "</span> days ❤️";
}


function startIntroAnimations(){

    const title=document.querySelector(".hero h1");
    const subtitle=document.querySelector(".hero p");
    const days=document.getElementById("daysCounter");
    const typing=document.getElementById("typing");

    setTimeout(()=>{
        title.classList.add("showText");
    },200);

    setTimeout(()=>{
        subtitle.classList.add("showText");
    },900);

    setTimeout(()=>{
        days.classList.add("showText");
    },1700);

    setTimeout(()=>{
        typing.classList.add("showText");
        typeWriter();
    },2600);
}
function initSlider(){

    const sliderBtn = document.getElementById("sliderBtn");
    const slider = document.getElementById("slider");

    if(!sliderBtn || !slider) return;

    let isDragging = false;

    // ---------- PC (mouse) ----------
    sliderBtn.addEventListener("mousedown", () => {
        isDragging = true;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });

    document.addEventListener("mousemove", (e) => {
        if(!isDragging) return;
        moveSlider(e.clientX);
    });

    // ---------- MOBILE (touch) ----------
    sliderBtn.addEventListener("touchstart", () => {
        isDragging = true;
    });

    document.addEventListener("touchend", () => {
        isDragging = false;
    });

    document.addEventListener("touchmove", (e) => {
        if(!isDragging) return;
        moveSlider(e.touches[0].clientX);
    });

    // ---------- movement logic ----------
    function moveSlider(clientX){

        const rect = slider.getBoundingClientRect();

        let x = clientX - rect.left;

        if(x < 0) x = 0;
        if(x > rect.width - 50) x = rect.width - 50;

        sliderBtn.style.left = x + "px";

        // if reached end → go to next page
        if(x > rect.width - 60){
            window.location.href = "memories.html";
        }
    }
}
// HOLD HEART INTERACTION

const heart = document.getElementById("loveHeart");
const bar = document.getElementById("progressBar");

let holdTime = 0;
let holding = false;
let holdInterval;

if(heart){

    // touch start
    heart.addEventListener("touchstart", startHold);
    heart.addEventListener("mousedown", startHold);

    // release
    heart.addEventListener("touchend", stopHold);
    heart.addEventListener("mouseup", stopHold);
}

function startHold(){
    holding = true;
    holdTime = 0;

    holdInterval = setInterval(()=>{

        holdTime += 100;
        bar.style.width = (holdTime/1500)*100 + "%";

        // completed hold
        if(holdTime >= 1500){
            clearInterval(holdInterval);
            triggerHeartOpen();
        }

    },100);
}

function stopHold(){
    holding = false;
    clearInterval(holdInterval);
    bar.style.width = "0%";
}

function triggerHeartOpen(){

    document.getElementById("holdText").innerText = "You opened my heart ❤️";

    const heart = document.getElementById("loveHeart");
    const rect = heart.getBoundingClientRect();

    const x = rect.left + rect.width/2;
    const y = rect.top + rect.height/2;

    createSparkles(x,y);

    fadeMusicUp();   // NEW

    setTimeout(()=>{
        revealMemories();
    },600);
}

// SPARKLE EFFECT

const canvas = document.getElementById("sparkCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createSparkles(x,y){

    for(let i=0;i<35;i++){
        particles.push({
            x:x,
            y:y,
            vx:(Math.random()-0.5)*6,
            vy:(Math.random()-0.5)*6,
            size:Math.random()*4+2,
            life:80
        });
    }
}

function animateSparkles(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach((p,index)=>{

        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        ctx.beginPath();
        ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        ctx.fillStyle="rgba(255,180,220,"+(p.life/80)+")";
        ctx.fill();

        if(p.life<=0){
            particles.splice(index,1);
        }
    });

    requestAnimationFrame(animateSparkles);
}

animateSparkles();
window.addEventListener("resize",()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
function fadeMusicUp(){

    const music = document.getElementById("music");

    let vol = 0.05;

    const fade = setInterval(()=>{

        vol += 0.02;

        if(vol >= 0.6){
            vol = 0.6;
            clearInterval(fade);
        }

        music.volume = vol;

    },200);
}
// STAR SKY

const starCanvas = document.getElementById("starCanvas");
const starCtx = starCanvas.getContext("2d");

starCanvas.width = window.innerWidth;
starCanvas.height = window.innerHeight;

let stars = [];

for(let i=0;i<120;i++){
    stars.push({
        x:Math.random()*starCanvas.width,
        y:Math.random()*starCanvas.height,
        size:Math.random()*2,
        opacity:Math.random(),
        speed:Math.random()*0.2+0.05
    });
}

function drawStars(){

    starCtx.clearRect(0,0,starCanvas.width,starCanvas.height);

    stars.forEach(star=>{
        star.y += star.speed;

        if(star.y > starCanvas.height){
            star.y = 0;
            star.x = Math.random()*starCanvas.width;
        }

        starCtx.beginPath();
        starCtx.arc(star.x,star.y,star.size,0,Math.PI*2);
        starCtx.fillStyle="rgba(255,255,255,"+star.opacity+")";
        starCtx.fill();
    });

    requestAnimationFrame(drawStars);
}

drawStars();

window.addEventListener("resize",()=>{
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
});
