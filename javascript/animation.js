gsap.registerPlugin(ScrollTrigger);

gsap.to(".paper-plane", {
    scrollTrigger: {
        trigger: '.animation',
        start: "top center",
        scrub: 1,
        markers: true
    },
    x: 1000,
    y: -750,
    ease: "none",
    duration: 3
});