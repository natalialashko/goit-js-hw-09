function createPromise(position, delay) {
   const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay })
      } else {
        // Reject
        reject({ position, delay })
      }
    },delay)
    
  })
  
}

const formEll = document.querySelector('.form');
formEll.addEventListener("submit", handleSubmit);
  
function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount }
  } = event.currentTarget;
  setTimeout(() => {
    for (let position = 0; position < amount.value; position += 1) {
      let d = Number(delay.value) + position * Number(step.value);
      createPromise(position, d)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });

    }
  }, delay.value);
    
    
   
  
}