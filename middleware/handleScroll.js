export default function handleScroll(scrollEle) {
    const ele = document.querySelector(scrollEle)
    const eleOverflow = window.getComputedStyle(ele).getPropertyValue('overflow')
    return {
        before: () => {
            ele.style.overflow = 'visible'
        },
        after: () => {
            ele.style.overflow = eleOverflow
        }
    }
}