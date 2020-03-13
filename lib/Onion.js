/**
 * 仿照 Koa 洋葱圈模型，使用中间件抽象各个流程
 * 中间件为对象形式，包含一个 before 方法和 一个 after 方法
 */

export default class Onion {
    constructor() {
        this.mwList = []
    }

    use(mw) {
        if (Object.prototype.toString.call(mw) !== '[object Object]') {
            throw new TypeError('Middleware must be a Object')
        }
        this.mwList.push(mw)
        return this
    }

    start() {
        return this._compose(this.mwList)
    }

    _compose(mwlist = []) {
        function dispatch(i) {
            if (i > mwlist.length - 1) return
            const mw = mwlist[i]
            try {
                mw.before()
                return Promise.resolve(dispatch(i + 1)).then(() => {
                    mw.after()
                })
            } catch (err) {
                return Promise.reject(err)
            }
        }
        dispatch(0)
    }
}