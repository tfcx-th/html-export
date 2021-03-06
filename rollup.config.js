import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
    input: 'index.js',
    output: {
        file: 'html-export.js',
        name: 'htmlExport',
        format: 'iife'
    },
    watch: {
        include: 'src/**'
    },
    plugins: [
        resolve({
            browser: true
        }),
        commonjs({
            include: 'node_modules/**'
        }),
        babel({
            exclude: 'node_modules/**'
        })
    ]
}