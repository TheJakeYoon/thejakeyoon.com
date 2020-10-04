window.onload = function() {

    gsap.from(".name", {
        y: 750,
        ease: "elastic",
        delay: 1,
        duration: 0.5
    });

    gsap.from(".email", {
        y: 1000,
        ease: "elastic",
        duration: 1
    });

    gsap.from(".subject", {
        y: 750,
        ease: "elastic",
        delay: 0.75,
        duration: 1
    });

    gsap.from(".message", {
        y: 600,
        ease: "bounce",
        delay: 0.5,
        duration: 1
    });

}