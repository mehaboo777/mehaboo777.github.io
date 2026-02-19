/* ================= LETTER OPEN ================= */

document.addEventListener("DOMContentLoaded", function(){

const closed = document.querySelector(".letterClosed");
const real = document.querySelector(".realLetter");

if(closed && real){

closed.addEventListener("click", function(){

    closed.style.transform="scale(.85)";
    closed.style.opacity="0";

    setTimeout(()=>{
        closed.style.display="none";
        real.classList.add("showLetter");
    },500);

});

}

initHearts();

});


/* ================= FLOATING HEARTS ================= */

function initHearts(){

const canvas = document.getElementById("bgHearts");
if(!canvas) return;   // now it ONLY stops hearts, not the click system

const ctx = canvas.getContext("2d");

function resize(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
}
resize();
window.addEventListener("resize",resize);

let hearts=[];
for(let i=0;i<40;i++){
hearts.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*18+12,
speed:Math.random()*0.6+0.2,
opacity:Math.random()*0.5+0.25
});
}

function draw(){
ctx.clearRect(0,0,canvas.width,canvas.height);

hearts.forEach(h=>{
h.y-=h.speed;
if(h.y<-20){
h.y=canvas.height+20;
h.x=Math.random()*canvas.width;
}

ctx.globalAlpha=h.opacity;
ctx.fillStyle="#ff4d88";
ctx.font=h.size+"px serif";
ctx.fillText("❤",h.x,h.y);
});

requestAnimationFrame(draw);
}

draw();
}
