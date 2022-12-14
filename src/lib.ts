export function renderBlock (elementId : string, html : string) : void {
  const element = document.getElementById(elementId)
  element.innerHTML = html
}

interface IMessage {
  type: string,
  text: string
}

interface IAction {
  name: string,
  handler(): void 
}

export function renderToast (message : IMessage, action? : IAction) {
  let messageText = ''
  
  if (message != null) {
    messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${action?.name || 'Закрыть'}</button>
      </div>
    `
  }
  
  renderBlock(
    'toast-block',
    messageText
  )

  const button : HTMLElement = document.getElementById('toast-main-action')
  if (button != null) {
    button.onclick = function() {
      if (action != null && action.handler != null) {
        action.handler()
      }
      renderToast(null)
    }
  }
}
