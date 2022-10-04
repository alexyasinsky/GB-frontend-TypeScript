import { renderBlock } from './lib.js'

export function renderUserBlock (userName: string, avatarLink: string, favoriteItemsAmount?: number) : void {
  const favoritesCaption : number | string = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет'

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src=${avatarLink} alt=${userName} />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon${favoriteItemsAmount ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}
