import { renderBlock } from './lib'

export function renderUserBlock () : void {
  const user = getUser(localStorage.getItem('user'));
  const favoriteItemsAmount = getFavoriteItemAmount(localStorage.getItem('favoriteItems'))
  const favoritesCaption : number | string = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет'

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src=${user.avatarLink} alt=${user.name} />
      <div class="info">
          <p class="name">${user.name}</p>
          <p class="fav">
            <i class="heart-icon${favoriteItemsAmount ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}


function getUser(data : unknown) : User {
  let name  = 'Stranger';
  let avatarLink = '';
  if (data === null) {
    return new User(name, avatarLink);
  }
  if (typeof data === 'string') {
    const user = JSON.parse(data);
    if (user.name) {
      name = user.name
    }
    if (user.avatarLink) {
      avatarLink = user.avatarLink
    }
  }
  return new User(name, avatarLink);
}

function getFavoriteItemAmount(data : unknown) : number {
  if (data === null) {
    return 0;
  }
  if (typeof data === 'string') {
    const favoriteItems = JSON.parse(data);
    return favoriteItems.length;
  }
}

class User {
  name: string;
  avatarLink: string

  constructor(name, avatarLink) {
    this.name = name;
    this.avatarLink = avatarLink;
  }
}
