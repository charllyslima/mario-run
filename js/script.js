const root = document.querySelector(":root");

const controls = document.querySelector(".controls");
const startButton = document.querySelector("#start");
const restartButton = document.querySelector("#restart");
const soundButton = document.querySelector(".sound-control");

const themeAudio = document.querySelector("#theme-song");
const pipeAudio = document.querySelector("#pipe-sound");
const jumpAudio = document.querySelector("#jump-sound");
const marioDieAudio = document.querySelector("#mario-die");

const mario = document.querySelector("#mario");
const yoshi = document.querySelector("#yoshi");
const pipeStart = document.querySelector(".pipe-initial");
const pipe = document.querySelector("#pipe");
const scores = document.querySelector(".scores");

const jumpSpeed = 250;

let isStarted = false;
let isLive = true;

root.style.setProperty("--jumpSpeed", `${jumpSpeed}ms`);

window.addEventListener("load", function () {
    startButton.addEventListener("click", start);

    soundButton.addEventListener("click", soundOnOff);
    document.addEventListener("keydown", actions);
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
        mario.style.left = "10%";
        setTimeout(() => {
            mario.classList.remove("entering-mario");
        }, 2000);
    }, 200);

    setTimeout(() => {
        pipeAudio.play();
    }, 1500);

    setTimeout(() => {
        pipeStart.classList.add("hidden");
        pipe.classList.remove("hidden");
        scores.classList.remove("hidden");
        isStarted = true;
    }, 4000);
};

const runner = setInterval(() => {
    const pipeHeight = pipe.clientHeight;
    const pipeWidth = pipe.clientWidth;
    const pipePositionX = +window.getComputedStyle(pipe).left.replace("px", "");
    const pipePositionY = +window.getComputedStyle(pipe).bottom.replace("px", "");

    const marioPositionX = +window.getComputedStyle(mario).left.replace("px", "");
    const marioPositionY = +window.getComputedStyle(mario).bottom.replace("px", "");
    const marioWidth = mario.clientWidth - 10;
    const marioHeight = mario.clientHeight - 10;

    if (
        pipePositionX - marioWidth <= marioPositionX &&
        marioPositionY - marioHeight <= pipeHeight &&
        marioPositionX <= pipePositionX
    ) {
        marioDieAudio.play();
        pipe.style.animation = "none";
        clearInterval(runner);
        console.log("you lose");

        pipe.style.left = `${pipePositionX - 10}px`;
        mario.style.bottom = `${marioPositionY - 10}px`;
        mario.src = "./img/mario-die.png";
        yoshi.classList.remove("hidden");
        setTimeout(() => {
            yoshi.classList.add("hidden");
        }, 4000);

        isLive = false;

    }
}, 10);

const actions = (e) => {
    if (isStarted) {
        if (!mario.classList.contains("jump") && e.code === "Space") {
            jumpAudio.play();
            mario.classList.add("jump");

            setTimeout(() => {
                mario.classList.remove("jump");
            }, jumpSpeed * 2);
        } else if (e.code === "ControlLeft") {
            //TODO fireball
        }
    }
};

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
