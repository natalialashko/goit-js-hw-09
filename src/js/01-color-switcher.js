
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};


const startBtnEll = document.querySelector('button[data-start]');
const stopBtnEll = document.querySelector('button[data-stop]');
const bodyEll = document.querySelector('body');

console.log(startBtnEll);
console.log(stopBtnEll);

let actStartBtn = false;

startBtnEll.addEventListener('click', () => {
    if (!actStartBtn) {
        actStartBtn = true;
        startBtnEll.style.color='red';
        timerId = setInterval(() => {
            bodyEll.style.backgroundColor = `${getRandomHexColor()}`;
        }, 1000)
    }
});
stopBtnEll.addEventListener("click", () => {
    clearInterval(timerId);
    console.log(`stopped!`);
    startBtnEll.style.color='black';
    return actStartBtn = false;
});


 