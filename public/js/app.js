

console.log('Server is running on http://localhost:3000');

fetch('http://puzzle.mead.io/puzzle').then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});

fetch('http://localhost:3000/weather?address=!').then((response) => {
  response.json().then((data) => {
    if (data.error) {
      return console.log(data.error);
    }
    console.log(data.location);
    console.log(data.forecast);
  });
});

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

//messageOne.textContent = 'From JavaScript';

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const address = document.querySelector('input').value;
  
  fetch('http://localhost:3000/weather?address=' + address).then((response) => {
    response.json().then((data) => {
      if (data.error) { 
        messageOne.textContent = data.error;
        messageTwo.textContent = '';
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast.weather_descriptions[0] + '. It is currently ' + data.forecast.temperature + ' degrees out. It feels like ' + data.forecast.feelslike + ' degrees.';
        console.log(data.forecast)
      }
    });
  });
});

