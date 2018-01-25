import { fromEvent } from 'rxjs/observable/fromEvent';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Employee } from '../../src/type/interfaces';

export const getData = (url, params?) => {
  return fetch(url, params).then(r => {
    return r.ok ? r.json() : Promise.reject(`${r.statusText} ${r.status}`)
  })
}

const tpl_employee = (data: Employee) => `
  <li>
    <span>${data.emp_no}</span>
    <span>${data.first_name}</span>
    <span>${data.last_name}</span>
    <span>${data.gender}</span>
    <span>${new Date(data.birth_date)}</span>
    <span>${new Date(data.hire_date)}</span>
  </li>
`;

document.addEventListener('DOMContentLoaded', () => {
  const elSearch = document.getElementById('inp_search');
  const elResultWrap = document.getElementById('result');

  fromEvent(elSearch, 'input')
    .subscribe((e: any) => {
      const elInputValue = e.target.value;

      fromPromise(getData(`http://localhost:2200/employees/search/${elInputValue}`))
        .subscribe(list => {
          console.log(list);
          const html = list.map(data => tpl_employee(data));
          elResultWrap.innerHTML = html.join('');
        })
    });
});