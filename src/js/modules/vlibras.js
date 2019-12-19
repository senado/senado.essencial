/* global MouseEvent */
import $script from 'scriptjs'
import $ from 'jquery'

const vlibrasScript = 'https://vlibras.gov.br/app/vlibras-plugin.js'

let initialized = false

const display = _ => {
  const trigger = document.querySelector('[vw-access-button]')
  trigger.dispatchEvent(new MouseEvent('click'))
}

export const initializeVLibras = _ => {
  if (initialized) {
    display()
    return
  }
  initialized = true

  $(document.body).append(`
    <div vw class="enabled">
      <div vw-access-button class="active" style="display: none"></div>
      <div vw-plugin-wrapper>
        <div class="vw-plugin-top-wrapper"></div>
      </div>
    </div>
  `)

  $script(vlibrasScript, _ => {
    const widget = new window.VLibras.Widget('https://vlibras.gov.br/app', '/assets/avatar.json')
    window.onload()
    display()
    return widget
  })
}
