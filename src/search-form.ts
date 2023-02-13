import { renderBlock } from './lib';

import {nowDateString, lastDayOfNextMonthDateString, dayAfterTomorrowDateString} from './date';
import {renderEmptyOrErrorSearchBlock, renderSearchResultsBlock} from './search-results';

export function renderSearchFormBlock (minDate : string=nowDateString, maxDate: string=lastDayOfNextMonthDateString) : void {
 
  renderBlock(
    'search-form-block',
    `
    <form id='search'>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" name=city type="text" disabled value="Санкт-Петербург" />
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
            <input id="check-out-date" type="date" value=${dayAfterTomorrowDateString} min=${minDate} max=${maxDate} name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" required/>
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
  form.addEventListener('submit', (event : Event) : void => {
    event.preventDefault();
    const {
      city, checkin, checkout, price
    } = parseFormForValues(form);
    search({
      city,
      checkInDate: checkin,
      checkOutDate: checkout,
      maxPrice: price,
    });
  });
  
}

const parseFormForValues = (form : HTMLFormElement) => {
  const values: Record<string, string | undefined> = {};
  for (const item of form.elements) {
    const input = item as HTMLInputElement;
    if (input.name) {
      values[input.name] = input.value;
    }
  }
  return values;
}

async function search(query : SearchFormData) {
  const checkInDate = new Date(query.checkInDate).valueOf();
  const checkOutDate = new Date(query.checkOutDate).valueOf();
  try {
    const response = await fetch(`/api/places?coordinates=59.9386,30.3141&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&maxPrice=${query.maxPrice}` );
    const results : PlaceCollection | [] = await response.json();
    results.length !== 0 ? renderSearchResultsBlock(results) : renderEmptyOrErrorSearchBlock('Нет подходящих вариантов');
  } catch (err) {
    renderEmptyOrErrorSearchBlock(err)
  }
}

interface SearchFormData {
  city: string;
  checkInDate: string;
  checkOutDate: string;
  maxPrice: string;
}

interface PlaceCollection {
  [key: string]: Place
}

interface Place {
  id: number;
  name: string;
  description: string;
  image: string;
  remoteness: number,
  bookedDates: number[],
  price: number
}
