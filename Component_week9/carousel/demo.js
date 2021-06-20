import {Timeline, Animation} from './animation.js'
import {linear, ease} from './ease.js'
import './demo.css'

window.addEventListener('DOMContentLoaded', () => {
    let tl = new Timeline()
    tl.start()

    let ele = document.querySelector('#square')
    let templatefn = v => `translateX(${v}px)`

    tl.add(new Animation(ele.style, 'transform', 0, 500, 3000, 0, ease, templatefn))

    let pauseBtn = document.querySelector('#pause-btn')
    let resumeBtn = document.querySelector('#resume-btn')
    pauseBtn.addEventListener('click', () => {
        tl.pause()
    })
    resumeBtn.addEventListener('click', () => {
        tl.resume()
    })


    let ele2 = document.querySelector('#square2')
    ele2.style.transition = 'transform ease 3s'
    ele2.style.transform = 'translateX(500px)'
})
