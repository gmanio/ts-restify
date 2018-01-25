import { fromEvent } from 'rxjs/observable/fromEvent';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Employee } from '../../src/type/interfaces';

const elTemplate = (data:Employee) => `
  <li>
    <span>${data.first_name}</span>
  </li>
`;

document.addEventListener('DOMContentLoaded', () => {
  const elSearch = document.getElementById('inp_search');
  const elResultWrap = document.getElementById('result');

  fromEvent(elSearch, 'input')
    .subscribe((e: Event) => {
      const value = e.target.value;
      fromPromise(fetch(`http://localhost:2200/employees/search/${value}`).then(res=>res.json()))
        // .filter((res:Response) => res.json())
        .subscribe(list => {
          const html = list.map(data=>{
            return elTemplate(data);
          })

          elResultWrap.innerHTML = html.join('');
        })
    });
});