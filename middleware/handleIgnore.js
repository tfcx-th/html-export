export default function handleIgnore(ignoreEle) {
    let displayMap = new Map()
    ignoreEle.forEach(ele => {
        const dom = document.querySelector(ele)
        const display = window.getComputedStyle(dom).getPropertyValue('display')
        displayMap.set(ele, display)
    })
    return {
        before: () => {
            ignoreEle.forEach(ele => {
                const dom = document.querySelector(ele)
                dom.style.display = 'none'
            })
        },
        after: () => {
            ignoreEle.forEach(ele => {
                const dom = document.querySelector(ele)
                dom.style.display = displayMap.get(ele)
            })
            displayMap = null
        }
    }
}