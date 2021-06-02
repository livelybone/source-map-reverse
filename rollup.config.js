import license from 'rollup-plugin-license'
import { uglify } from 'rollup-plugin-uglify'
import packageConf from './package.json'
import baseConf from './rollup.config.base'

const conf = entry => ({
  input: entry.filename,
  output: entry.formats.map(format => ({
    file: `./lib/${entry.name}.js`,
    format,
    name:
      entry.name === 'index'
        ? 'SourceMapReverse'
        : `${entry.name}SourceMapReverse`,
    sourcemap: true,
  })),
  external: entry.external ? Object.keys(packageConf.dependencies || {}) : [],
  plugins: [
    ...baseConf.plugins,
    entry.needUglify !== false && uglify(),
    license({
      banner: `Bundle of <%= pkg.name %>
               Generated: <%= moment().format('YYYY-MM-DD') %>
               Version: <%= pkg.version %>
               License: <%= pkg.license %>
               Author: <%= pkg.author %>`,
    }),
  ],
})

export default [
  {
    name: 'index',
    filename: './src/index.js',
    formats: ['cjs'],
    needUglify: true,
    external: true,
  },
].map(conf)
