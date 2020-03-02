import html2canvas from 'html2canvas'

export default class Exporter {
    constructor(
        name = 'export',
        exportElement = 'body',
        scrollElement = '',
        ignoreElement = []
    ) {
        this.name = name
        this.exportElement = exportElement
        this.scrollElement = scrollElement
        this.ignoreElement = ignoreElement
        this.displayMap = new Map()
    }

    exportImg() {
        this._getDisplayMap(this.ignoreElement)
        this._toImg().then(url => {
            this._download(this.name, url)
        })
    }

    _download(name, url) {
        const link = document.createElement('a')
        link.href = url
        link.download = name
        let event
        if (window.MouseEvent) {
            event = new MouseEvent('click')
        } else {
            event = document.createEvent('MouseEvents')
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        }
        link.dispatchEvent(event)
    }

    _toImg() {
        const app = document.querySelector('#app')
        const appHeight = window.getComputedStyle(app).getPropertyValue('height')

        // 取消滚动元素的滚动
        const scrollEle = document.querySelector(this.scrollElement).parentNode
        const scrollEleOverflow = window.getComputedStyle(scrollEle).getPropertyValue('overflow')
        app.style.height = 'auto'
        scrollEle.style.overflow = 'visible'

        this.ignoreElement.forEach(ele => {
            const dom = document.querySelector(ele)
            dom.style.display = 'none'
        })

        return html2canvas(document.querySelector(this.exportElement), {
            allowTaint: true,
            backgroundColor: '#f4f4f4'
        }).then(canvas => {
            app.style.height = appHeight
            scrollEle.style.overflow = scrollEleOverflow
            this.ignoreElement.forEach(ele => {
                const dom = document.querySelector(ele)
                dom.style.display = this.displayMap.get(ele)
            })
            this.displayMap = new Map()
            return canvas.toDataURL('image/png', 1)
        })
    }

    // 记录被忽略的元素的display值，以便后续复原
    _getDisplayMap(ignoreElement = []) {
        ignoreElement.forEach(ele => {
            const dom = document.querySelector(ele)
            const display = window.getComputedStyle(dom).getPropertyValue('display')
            this.displayMap.set(ele, display)
        })
    }
}