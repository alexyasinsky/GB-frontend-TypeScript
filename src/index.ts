import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'

localStorage.setItem('user', JSON.stringify({
  name: 'Wade Warren',
  avatarLink: 'img/avatar.png',
}));
localStorage.setItem('favouriteItemsAmount', '3');

window.addEventListener('DOMContentLoaded', () => {
  const user = getUser(JSON.parse(localStorage.getItem('user')));
  renderUserBlock(user.name, 'img/avatar.png',  3)
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

function getUser(user : unknown) : User {
  let name  = 'Stranger';
  let avatarLink = '';
  if (user === null) {
    return new User(name, avatarLink);
  }
  if (user instanceof Object) {
    const has = Object.prototype.hasOwnProperty;
    if (user.name) {
      name = user.name
    }
  }




  // const userFromLS : unknown = JSON.parse(localStorage.getItem('user'));
  // const has = Object.prototype.hasOwnProperty;
  // let name : string;
  // let avatarLink : string;
  // typeof userFromLS.name === 'string' ? name = userFromLS : name = 'Stranger'
  // const user : User;
  // return user;
}



