import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

const isWatch = process.env.BUILD_ENV === 'watch'

export default {
  plugins: [
    ...(isWatch
      ? [
          {
            name: 'replace',
            transform(code) {
              return {
                code: code.replace(
                  /process\.env\.NODE_ENV/g,
                  JSON.stringify('production'),
                ),
              }
            },
          },
        ]
      : []),
    resolve(),
    commonjs(),
    babel({
      babelrc: false,
      externalHelpers: false,
      runtimeHelpers: true,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
            },
          },
        ],
      ],
      plugins:
        process.env.NODE_ENV === 'test'
          ? [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-class-properties',
              'istanbul',
            ]
          : ['@babel/plugin-proposal-class-properties'],
    }),
  ],
}
