//
// restify.createClient({
//   url: 'http://localhost:2000'
// });

const host = 'http://localhost:2000';

const App = () => {
  fetch(`${host}/employees`)
    .then(result => result.json())
    .then(data => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  const elUpdate = document.querySelector('.btn_setData');

  elUpdate.addEventListener('click', () => {
    const empNo = (<HTMLInputElement>document.getElementById('emp_no')).value;
    const firstName = (<HTMLInputElement>document.getElementById('first_name')).value;
    const lastName = (<HTMLInputElement>document.getElementById('last_name')).value;
    const gender = (<HTMLInputElement>document.getElementById('gender')).value;

    const data = {
      emp_no: empNo,
      first_name: firstName,
      last_name: lastName
    }

    fetch(`${host}/employees/update/${empNo}`, { method: 'POST', body: JSON.stringify(data) })
      .then(result => result.json())
      .then(result => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  })
};

document.addEventListener('DOMContentLoaded', () => {
  App();
});