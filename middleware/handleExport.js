import html2canvas from 'html2canvas'
import download from '../utils/download'

export default function handleExport(name, exportEle, options = {}) {
    return {
        before: () => {
            html2canvas(document.querySelector(exportEle), options).then(canvas => {
                return canvas.toDataURL('image/png', 1)
            }).then(url => {
                
                download(name, url)
            })
        },
        after: () => {}
    }
}