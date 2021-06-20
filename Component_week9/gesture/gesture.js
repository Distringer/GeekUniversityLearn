export class Dispatcher {
    constructor(element) {
        this.element = element
    }
    dispatch(type, properties) {
        let event = new Event(type)
        for (let name in properties) {
            event[name] = properties[name]
        }
        this.element.dispatchEvent(event)
    }
}

export class Listener {
    constructor(element, recognizer) {
        let contexts = new Map()
        let isListeningMouse = false

        element.addEventListener('mousedown', event => {
            let context = Object.create(null)
            contexts.set('mouse' + (1 << event.button), context)
            
            recognizer.start(event, context)
            let mousemove = event => {
                let button = 1
                while (button <= event.buttons) {
                    if (button & event.buttons) {
                        //需要调整右键与中键的顺序
                        let key
                        if (button === 2) {
                            key = 4
                        } else if (button === 2) {
                            key = 2
                        } else {
                            key = button
                        }
                        let context = contexts.get('mouse' + key)
                        recognizer.move(event, context)
                    }
                    button = button << 1
                }
            }
            let mouseup = event => {
                let context = contexts.get('mouse' + (1 << event.button))
                recognizer.end(event, context)
                contexts.delete('mouse' + (1 << event.button))

                if (event.buttons === 0) {
                    document.removeEventListener('mousemove', mousemove)
                    document.removeEventListener('mouseup', mouseup)
                    isListeningMouse = false
                }
            }
            if (!isListeningMouse) {
                document.addEventListener('mousemove', mousemove)
                document.addEventListener('mouseup', mouseup)
                isListeningMouse = true
            }
        })

        element.addEventListener('touchstart', event => {
            for(let touch of event.changedTouches) {
                let context = Object.create(null)
                contexts.set(touch.identifier, context)
                recognizer.start(touch, context)
            }
        })

        element.addEventListener('touchmove', event => {
            for(let touch of event.changedTouches) {
                let context = contexts.get(touch.identifier)
                recognizer.move(touch, context)
            }
        })

        element.addEventListener('touchend', event => {
            for(let touch of event.changedTouches) {
                let context = contexts.get(touch.identifier)
                recognizer.end(touch, context)
                contexts.delete(touch.identifier)
            }
        })

        element.addEventListener('touchcancel', event => {
            for(let touch of event.changedTouches) {
                let context = contexts.get(touch.identifier)
                recognizer.cancel(touch, context)
                contexts.delete(touch.identifier)
            }
        })

    }
}

export class Recognizer {
    constructor(dispatcher) {
        this.dispatcher = dispatcher
    }
    start(point, context) {
        //console.log('start', point.clientX, point.clientY)
        context.startX = point.clientX, context.startY = point.clientY
        context.points = [{
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        }]

        context.isPan = false
        context.isTap = true
        context.isPress = false

        context.handler = setTimeout(() => {
            context.isPan = false
            context.isTap = false
            context.isPress = true
            context.handler = null  //避免多次clear，执行clearTimeout(null)不会有异常抛出。
            //console.log('pressstart')
            this.dispatcher.dispatch('press', {})
        }, 500) //0.5秒
    }
    move(point, context) {
        //console.log('move', point.clientX, point.clientY)
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY
        //移动距离大于10px,触发pan事件
        if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
            context.isPan = true
            context.isTap = false
            context.isPress = false
            context.isVertical = Math.abs(dx) < Math.abs(dy) //区分上下滑动还是左右滑动
            //console.log('panstart')
            this.dispatcher.dispatch('panstart', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertial: context.isVertical
            })
            clearTimeout(context.handler)
        }
        if (context.isPan) {
            this.dispatcher.dispatch('pan', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertial: context.isVertical
            })
            //console.log('pan')
        }

        //只保留半秒内的点
        context.points = context.points.filter(point => point.t - Date.now() < 500)
        context.points.push({
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        })
    }
    end(point, context) {
        if (context.isTap) {
            this.dispatcher.dispatch('tap', {})
            clearTimeout(context.handler)
        }
        if (context.isPress) {
            //console.log('pressend')
            this.dispatcher.dispatch('pressend', {})
        }

        context.points = context.points.filter(point => point.t - Date.now() < 500)
        //计算速度
        let d, v
        if (context.points.length === 0) {
            v = 0
        } else {
            d = Math.sqrt((point.clientX - context.points[0].x) ** 2 + (point.clientY - context.points[0].y) ** 2)
            v = d / (Date.now() - context.points[0].t)
        }
        //console.log(v)
        if (v > 1.5) {
            context.isFlick = true
            //console.log('flick')
            this.dispatcher.dispatch('flick', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertial: context.isVertical,
                isFlick: context.isFlick,
                velocity: v
            })
        } else {
            context.isFlick = false
        }
        //panend事件需要在flick之后来派发
        if (context.isPan) {
            this.dispatcher.dispatch('panend', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertial: context.isVertical,
                isFlick: context.isFlick
            })
        }
        //console.log('end', point.clientX, point.clientY)
    }
    cancel(point, context) {
        clearTimeout(context.handler)
        //console.log('cancel', point.clientX, point.clientY)
        this.dispatcher.dispatch('cancel', {})
    }
}

export function enableGesture(element) {
    new Listener(element, new Recognizer(new Dispatcher(element)))
}
