window.onload = function() {
    textAnimation("main-text", "type");
}

$(document).ready(function(){

    var path = window.location.pathname;
    var page = path.split("/").pop();

    gsap.registerPlugin(ScrollTrigger);

    if(page == ""){
        gsap.to(".paper-plane", {
            scrollTrigger: {
                trigger: '.animation',
                start: "top center",
                scrub: 1,
                markers: false
            },
            x: 750,
            y: -1500,
            ease: "none",
            duration: 3
        });

        ScrollTrigger.create({
            trigger: ".animation2",
            start: "top top",
            end: "bottom bottom",
            onEnter: () => textAnimation("text-animation2", "type"),
            markers: false
        });
    }
    else if(page == "about"){
        gsap.to(".github", {
            scrollTrigger: {
                trigger: '#paragraph3',
                start: "top center",
                end: "bottom center",
                scrub: 1,
                markers: false
            },
            x: 100,
            y: 750,
            ease: "none",
            duration: 4
        });

        gsap.from(".one", {
            scrollTrigger: {
                trigger: '.instagram',
                start: "top bottom",
                end: "center center",
                scrub: 1,
                markers: false
            },
            y: 50,
            ease: "none",
            duration: 1
        });

        gsap.from(".two", {
            scrollTrigger: {
                trigger: '.instagram',
                start: "top bottom",
                end: "center center",
                scrub: 1,
                markers: false
            },
            x: -700,
            ease: "none",
            duration: 1
        });
    }
});

function textAnimation(element, animationType) {

    const text = document.getElementById(element);
    const textStr = text.textContent;
    const splitText = textStr.split("");

    text.textContent = "";
    for(let i = 0; i < splitText.length; i++){
        text.innerHTML += "<span>" + splitText[i] + "</span>";
    }

    let char = 0;
    let timer = setInterval(onTick, 50);
    function onTick() {
        const span = text.querySelectorAll('span')[char];
        span.classList.add(animationType);
        char++;
        if(char === splitText.length){
            clearInterval(timer);
            timer = null;
            return;
        }

    }
}