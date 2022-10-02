import { renderSearchFormBlock } from './search-form'
import {renderSearchStubBlock} from './search-results'
import { renderUserBlock } from './user'
import { renderToast } from './lib'

localStorage.setItem('user', JSON.stringify({
  name: 'Wade Warren',
  avatarLink: 'img/avatar.png',
}));
localStorage.setItem('favoriteItemsAmount', '0');

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock()
  renderSearchFormBlock()
  renderSearchStubBlock()
  renderToast(
    {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
    {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  )
})

window.addEventListener('beforeunload', ()=> {
  localStorage.clear();
})




