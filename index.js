import Onion from './lib/Onion'
import handleHeight from './middleware/handleHeight'
import handleScroll from './middleware/handleScroll'
import handleIgnore from './middleware/handleIgnore'
import handleExport from './middleware/handleExport'

export default function htmlExport(
    name = 'export',
    exportEle = '#app',
    scrollEle = '',
    ignoreEle = []
) {
    const exporter = new Onion()
    exporter
        .use(handleHeight(exportEle))
        .use(handleScroll(scrollEle))
        .use(handleIgnore(ignoreEle))
        .use(handleExport(name, exportEle))
        .start()
}