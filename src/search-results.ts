import { renderBlock } from './lib'
import {renderUserBlock} from './user';

export function renderSearchStubBlock () : void {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" alt="start-search"/>
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock (reasonMessage) : void {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}

export function renderSearchResultsBlock (results) : void{
  let html = '';
  results.forEach(result => {
    html += `<li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites inactive" data-id=${result.id} data-name=${result.name} data-image="${result.image}"></div>
            <img class="result-img" src="./img/result-1.png" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>${result.name}</p>
              <p class="price">${result.price}&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> 1.1км от вас</div>
            <div class="result-info--descr">${result.description}</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>`
  });

  renderBlock(
    'search-results-block',
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
      ${html}  
<!--            <li class="result">-->
<!--        <div class="result-container">-->
<!--          <div class="result-img-container">-->
<!--            <div class="favorites active"></div>-->
<!--            <img class="result-img" src="./img/result-1.png" alt="">-->
<!--          </div>	-->
<!--          <div class="result-info">-->
<!--            <div class="result-info&#45;&#45;header">-->
<!--              <p>YARD Residence Apart-hotel</p>-->
<!--              <p class="price">13000&#8381;</p>-->
<!--            </div>-->
<!--            <div class="result-info&#45;&#45;map"><i class="map-icon"></i> 2.5км от вас</div>-->
<!--            <div class="result-info&#45;&#45;descr">Комфортный апарт-отель в самом сердце Санкт-Петербрга. К услугам гостей номера с видом на город и бесплатный Wi-Fi.</div>-->
<!--            <div class="result-info&#45;&#45;footer">-->
<!--              <div>-->
<!--                <button>Забронировать</button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </li>    -->
    </ul>
    `
  )
  const favoriteButtons = document.querySelectorAll('.favorites');

  favoriteButtons.forEach(button => {
    button.addEventListener('click', () => {
      toggleFavoriteItem(button);
    });
  });
}

function toggleFavoriteItem(button) : void {
  const data = localStorage.getItem('favoriteItems');
  let favoriteItems = [];
  if (typeof (data) === 'string') {
    favoriteItems = JSON.parse(data);
  }
  localStorage.removeItem('favoriteItems');
  if (button.classList.contains('active')) {
    button.classList.remove('active');
    button.classList.add('inactive');
    const id = favoriteItems.findIndex(item => item.id === button.dataset.id);
    favoriteItems.splice(id, 1);
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
  } else {
    button.classList.remove('inactive');
    button.classList.add('active');
    const item : FavoriteItem = {
      id: button.dataset.id,
      name: button.dataset.name,
      image: button.dataset.image
    }
    favoriteItems.push(item);
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
  }
  renderUserBlock();
}

interface FavoriteItem {
  id: string,
  name: string,
  image: string
}
