window.onload = function() {
    console.log("debugging");
    var element = document.getElementById("index-main-text");
    var counter = 0;
    var size = 5;
    var opacity = 0.5;
    var id = setInterval(frame, 1);
    function frame(){
        if(size == 50){
            clearInterval(id);
        }
        else{
            counter+= 5;
            size = Math.sqrt(counter);
            opacity += 0.001;
            element.style.opacity = opacity;
            element.style.fontSize = size + "px";
        }
    }
}

$(document).ready(function(){
    gsap.registerPlugin(ScrollTrigger);

    gsap.to("#text-animation", {
        scrollTrigger: {
            trigger: ".animation",
            start: "top center",
            scrub: 1,
            markers: true
        },
        x: 750,
        y: 750,
        "--myFontSize": "50px",
        ease: "none",
        duration: 3
    });

    gsap.to(".paper-plane", {
        scrollTrigger: {
            trigger: '.animation',
            start: "top center",
            scrub: 1,
            markers: false
        },
        x: 1000,
        y: -1500,
        ease: "none",
        duration: 3
    });
});