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
        document.getElementById("music").play();

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
const lovePhotos=["love1.jpg","love2.jpg","love3.jpg","love4.jpg"];

function revealMemories(){
    const gallery=document.getElementById("heartGallery");

    lovePhotos.forEach((photo,index)=>{
        setTimeout(()=>{
            let img=document.createElement("img");
            img.src=photo;
            img.className="memoryPhoto";
            gallery.appendChild(img);

            setTimeout(()=>img.classList.add("show"),100);
        },index*1500);
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

    const sliderBtn=document.getElementById("sliderBtn");
    if(!sliderBtn) return;

    let isDown=false;

    sliderBtn.onmousedown=()=>isDown=true;
    document.onmouseup=()=>isDown=false;

    document.onmousemove=(e)=>{
        if(!isDown)return;

        let slider=document.getElementById("slider");
        let rect=slider.getBoundingClientRect();

        let x=e.clientX-rect.left;
        if(x<0)x=0;
        if(x>230)x=230;

        sliderBtn.style.left=x+"px";

        if(x>220){
            window.location.href="memories.html";
        }
    };
}
