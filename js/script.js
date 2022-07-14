const startButton = document.querySelector("#start");
const restartButton = document.querySelector("#restart");
const soundButton = document.querySelector(".sound-control");

const themeAudio = document.querySelector("#theme-song");

window.addEventListener("load", function () {
    soundButton.addEventListener("click", soundOnOff);
});

const soundOnOff = function sound() {
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
