import { renderSearchFormBlock } from './search-form'
import {renderSearchStubBlock} from './search-results'
import { renderUserBlock } from './user'
import { renderToast } from './lib'

localStorage.setItem('user', JSON.stringify({
  name: 'Wade Warren',
  avatarLink: 'img/avatar.png',
}));
localStorage.setItem('favouriteItemsAmount', '5');

window.addEventListener('DOMContentLoaded', () => {
  const user = getUser(localStorage.getItem('user'));
  const favouriteItemsAmount = getFavoriteItemAmount(localStorage.getItem('favouriteItemsAmount'))
  renderUserBlock(user.name, user.avatarLink,  favouriteItemsAmount)
  renderSearchFormBlock()
  renderSearchStubBlock()
  renderToast(
    {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
    {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  )
  localStorage.clear();
})


class User {
  name: string;
  avatarLink: string

  constructor(name, avatarLink) {
    this.name = name;
    this.avatarLink = avatarLink;
  }
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
    return Number(data);
  }
}
