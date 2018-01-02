const host = 'http://localhost:2000';

const App = () => {
  fetch(`${host}/employees`)
    .then(result => result.json())
    .then(data => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
};

document.addEventListener('DOMContentLoaded', () => {
  App();
});