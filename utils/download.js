export default function download(name, url) {
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