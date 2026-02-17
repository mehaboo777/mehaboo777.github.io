function surprise(){
    document.getElementById("loveMsg").innerHTML =
    "I love you forever minnuuhh❤️";
    const music = document.getElementById ("music");
    music.play();
    typeRunning = true;
    index = 0;
   document.getElementById("typing").innerHTML = "";
    typeWriter();
}
const startDate = new Date("2023-05-26");
function updateCounter(){
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000*60*60*24));

    document.getElementById("counter").innerHTML =
    "We have been together for " + days + " days ❤️";
}

setInterval(updateCounter,1000);
function createHeart(){
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.classList.add("heart");
    heart.style.left = Math.random()*100 + "vw";

    document.getElementById("hearts").appendChild(heart);

setTimeout (() => {
    heart.remove()
},5000);
}

const text  = "every day with you is my fav day";
let index = 0;
let typeRunning = false;

function typeWriter(){
    if (index<text.length){
      document.getElementById("typing").innerHTML += text[index];
        index++;
        setTimeout(typeWriter,80);
    }else {
        typeRunning = false;
    }
}
window.onload = function(){
setInterval(createHeart,300);
updateCounter();
};