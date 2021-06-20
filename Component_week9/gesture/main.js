import {enableGesture} from './gesture.js'

window.oncontextmenu = event => event.preventDefault()
enableGesture(document.documentElement)
document.documentElement.addEventListener('tap', () => {
    console.log('tap event triggered!')
})
