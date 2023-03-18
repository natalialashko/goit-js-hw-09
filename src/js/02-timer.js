import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const refsDate = {
    dateDaysEll: document.querySelector('span[data-days]'),
    dateHoursEll: document.querySelector('span[data-hours]'),
    dateMinutesEll: document.querySelector('span[data-minutes]'),
    dateSecondsEll: document.querySelector('span[data-seconds]'),
};

const startBtnEll = document.querySelector('button[data-start]');
console.log(startBtnEll);
let actStartBtn = false;
startBtnEll.style.color = '#C0C0C0';
let ms = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      ms = selectedDates[0] - options.defaultDate;
    //   console.log('секунди таймера ----',ms);
      if (selectedDates[0] < options.defaultDate)
      {
          alert("Please choose a date in the future");

      } else {
          startBtnEll.style.color = 'black';
          actStartBtn = true;  
      }
     
  },
};
function pad(value) {
    return String(value).padStart(2, "0");
};
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad( Math.floor(ms / day));
  // Remaining hours
  const hours = pad( Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds =pad( Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

const dateTimePicker = document.querySelector('#datetime-picker');
flatpickr(dateTimePicker, options);
console.log('defaultDate - ', options.defaultDate);

const timer = {
    idInt: null,
    start() {
        
        const startTime = Date.now() + ms;
        this.idInt = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = startTime - currentTime;
            console.log(deltaTime);
            if (deltaTime >= 0) {
                        
                const timeComponents = convertMs(deltaTime);
                console.log(timeComponents);
                upDateTimer(timeComponents);
            } else {
                this.stop();
                return;
                 }
        }, 1000);
    
    },
    stop() {
      clearInterval(this.idInt)  
    }
}
startBtnEll.addEventListener('click', () => {
    timer.start();
});
function upDateTimer({ days, hours, minutes, seconds }) {
    refsDate.dateDaysEll.textContent = days;
    refsDate.dateHoursEll.textContent = hours;
    refsDate.dateMinutesEll.textContent = minutes;
    refsDate.dateSecondsEll.textContent = seconds;
}
// console.log(onClose())
// const refsDate = {
//     dateDaysEll: document.querySelector('span[data-days]'),
//     dateHoursEll: document.querySelector('span[data-hours]'),
//     dateMinutesEll: document.querySelector('span[data-minutes]'),
//     dateSecondsEll: document.querySelector('span[data-seconds]'),
// };