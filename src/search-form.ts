import { renderBlock } from './lib.js';

import {currentDate, lastDayOfNextMonthDate, getDayAfterTomorrowDate} from './date.js';

export function renderSearchFormBlock (minDate : string=currentDate, maxDate: string=lastDayOfNextMonthDate) : void {
  const dayAfterTomorrowDate = getDayAfterTomorrowDate(currentDate);
 
  renderBlock(
    'search-form-block',
    `
    <form id='search'>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>-->
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value=${minDate} min=${minDate} max=${maxDate} name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value=${dayAfterTomorrowDate} min=${minDate} max=${maxDate} name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button type="submit">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )

  const form : HTMLFormElement = document.forms.namedItem('search');
  form.addEventListener('submit', (event) : void => {
    event.preventDefault();

    const query : SearchFormData = {
      city : form.elements,
      checkInDate: form.elements.namedItem('chekin'),
      checkOutDate: form.elements.namedItem('checkout'),
      maxPrice: form.elements.namedItem('price'),
    }
    search(query);
  });
  
}

interface SearchFormData {
  city: HTMLInputElement
  checkInDate: Element | RadioNodeList;
  checkOutDate: Element | RadioNodeList;
  maxPrice: Element | RadioNodeList;
}

function search(query : SearchFormData) : void {
  console.log(query);
}
