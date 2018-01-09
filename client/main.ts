import 'bootstrap/dist/css/bootstrap.css';
import { Observable } from 'rxjs';
// import 'whatwg-fetch';
import 'fetch-polyfill';

const host = 'http://localhost:2500';

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

const tpl_list = (data: any) => `<tr>
      <th scope="row">${data.emp_no}</th>
      <td>${data.first_name}</td>
      <td>${data.last_name}</td>
      <td>${data.gender}</td>
    </tr>`;

const searchEvent = () => {
  const tplBody = document.getElementById('tbody');
  const inp_search = document.getElementById('inp_search_name');
  if ( inp_search ) {
    Observable.fromEvent(inp_search, 'input')
    // .debounceTime(800)
      .subscribe((e) => {
        const searchText = inp_search.value;

        fetch(`${host}/employees/search/${searchText}`)
          .then(result => result.json())
          .then(result => {
            const render = [];
            result.map((value, index, arr) => {
              render.push(tpl_list(value));
            });

            tplBody.innerHTML = render.join('');
          })
          .catch((err) => {
            console.log(err);
          });
      })
  }
}


document.addEventListener('DOMContentLoaded', () => {
  App();
  searchEvent();
});