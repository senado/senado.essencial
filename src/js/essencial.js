import $ from 'jquery'

import { initializeVLibras } from './modules/vlibras'

$(_ => {
  $('.js-vlibras').on('click', initializeVLibras)
})
