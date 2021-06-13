import {Component, createElement} from './framework.js'
import './style.css'

class Carousel extends Component {
    constructor() {
        super()
        this.attributes = Object.create(null)
    }
    setAttribute(name, value) {
        this.attributes[name] = value
    }
    render() {
        this.root = document.createElement('div')
        this.root.classList.add('carousel')
        for (let record of this.attributes.src) {
            let child = document.createElement('div')
            child.style.backgroundImage = `url(${record})`
            this.root.appendChild(child)
        }

        //处理拖拽事件
        //下面的代码中将控件的宽度500写死了。
        let position = 0
        this.root.addEventListener('mousedown', event => {
            let children = this.root.children
            let startX = event.clientX

            let move = event => {
                let x = event.clientX - startX
                let current = position - ((x - x % 500) / 500)
                for (let offset of [-1, 0, 1]) {
                    let pos = (current + offset + children.length) % children.length
                    children[pos].style.transition = 'none'
                    children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x % 500}px)`
                }
            }
            let up = event => {
                //松开鼠标按键，恢复到最初的状态
                let x = event.clientX - startX
                let otherOffset = - Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))
                position = position - Math.round(x / 500)
                for (let offset of [0, otherOffset]) {
                    let pos = (position + offset + children.length) % children.length
                    children[pos].style.transition = ''
                    children[pos].style.transform = `translateX(${- pos * 500 + offset * 500}px)`
                }
                document.removeEventListener('mousemove', move)
                document.removeEventListener('mouseup', up)
            }
            document.addEventListener('mousemove', move)
            document.addEventListener('mouseup', up)
        })
        /*
        let currentIndex = 0
        setInterval(() => {
            let children = this.root.children
            let nextIndex = (currentIndex + 1) % children.length

            let current = children[currentIndex]
            let next = children[nextIndex]

            //下面两个样式的设置是为了将下一元素出现在当前可显示区域的右侧，
            //同时要避免有动画。
            next.style.transition = 'none' //屏蔽元素自身的transition属性。
            next.style.transform = `translateX(${100 - nextIndex * 100}%)`

            //下一图片在可显示区域右侧准备好后，在下一帧动画开始的时候，
            //令当前图片从左侧出去，下一图片从右侧进来。
            setTimeout(() => {
                next.style.transition = '' //让元素自身的transition生效。
                current.style.transform = `translateX(${-100 - currentIndex * 100}%)`
                next.style.transform = `translateX(${- nextIndex * 100}%)`
                currentIndex = nextIndex
            }, 16) //16毫秒为浏览器中一帧的时间。
            //使用requestAnimationFrame的话，需要调用两次。
        }, 3000)
        */
        return this.root
    }
    mountTo(parent) {
        parent.appendChild(this.render())
    }
}

let d = [
    'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
    'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
    'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
    'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
]

let a = <Carousel src={d}/>

a.mountTo(document.body)

