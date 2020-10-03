window.onload = function() {

    gsap.from(".name", {
        y: 750,
        ease: "elastic",
        delay: 2,
        duration: 1
    });

    gsap.from(".email", {
        y: 1000,
        ease: "elastic",
        duration: 2
    });

    gsap.from(".subject", {
        y: 750,
        ease: "elastic",
        delay: 3,
        duration: 2
    });

    gsap.from(".message", {
        y: 600,
        ease: "bounce",
        delay: 1,
        duration: 1
    });

}