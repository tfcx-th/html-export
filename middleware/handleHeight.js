export default function handleHeight(exportEle) {
    const ele = document.querySelector(exportEle)
    const eleHeight = window.getComputedStyle(ele).getPropertyValue('height')
    return {
        before: () => {
            ele.style.height = 'auto'
        },
        after: () => {
            ele.style.height = eleHeight
        }
    }
}