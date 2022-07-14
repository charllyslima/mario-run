const root = document.querySelector(":root");

const controls = document.querySelector(".controls");
const startButton = document.querySelector("#start");
const restartButton = document.querySelector("#restart");
const soundButton = document.querySelector(".sound-control");

const themeAudio = document.querySelector("#theme-song");
const pipeAudio = document.querySelector("#pipe-sound");

const mario = document.querySelector("#mario");
const pipeStart = document.querySelector(".pipe-initial");

const jumpSpeed = 250;

root.style.setProperty("--jumpSpeed", `${jumpSpeed}ms`);

window.addEventListener("load", function () {
    startButton.addEventListener("click", start);

    soundButton.addEventListener("click", soundOnOff);
    document.addEventListener("keydown", jump);
});

const start = () => {
    /* remove controls */
    controls.classList.add("hidden");

    /* entrance animations */
    pipeStart.classList.remove("hidden");
    pipeStart.classList.add("entering-pipe");

    setTimeout(() => {
        mario.classList.remove("hidden");
        mario.classList.add("entering-mario");
        mario.style.left = "200px";
    }, 200);

    setTimeout(() => {
        pipeAudio.play();
    }, 1500);

    setTimeout(() => {
        pipeStart.classList.add("hidden");
    }, 4000);
};

// const jump = () => {
//     if (!mario.classList.contains("jump")) {
//         mario.classList.add("jump");

//         setTimeout(() => {
//             mario.classList.remove("jump");
//         }, jumpSpeed * 2);
//     }
// };

const soundOnOff = () => {
    let icon = soundButton.querySelector("button");
    if (icon.classList.contains("fa-volume-high")) {
        icon.classList.remove("fa-volume-high");
        icon.classList.add("fa-volume-xmark");
        themeAudio.pause();
    } else {
        icon.classList.add("fa-volume-high");
        icon.classList.remove("fa-volume-xmark");
        themeAudio.play();
    }
};
