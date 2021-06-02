import chalk from 'chalk'
import fs from 'fs'
import sourceMap from 'source-map'

const args = process.argv

const filePath = args[2]
const line = +args[3]
const column = +args[4]

if (!filePath) {
  throw new Error('No sourcemap file found!')
}

if (!line) {
  throw new Error('The line param is required!')
}

if (!column) {
  throw new Error('The column param is required!')
}

// 此处替换为你下载下来的 sourcemap 文件
const data = fs.readFileSync(filePath).toString()
const consumer = new sourceMap.SourceMapConsumer(data)
consumer.then(c => {
  // 此处替换为原始报错的行列号
  const s = c.originalPositionFor({ line, column })
  console.info('\n')
  console.info(
    `Origin code for line:`,
    chalk.cyan(`${line}, ${column}`),
    '\nOrigin position info:',
    s,
  )
  console.info(
    chalk.yellow(
      `======================================================================`,
    ),
  )
  const lines = c.sourceContentFor(s.source).split('\n')
  console.info(
    chalk.blue(lines.slice(Math.max(s.line - 10, 0), s.line).join(`\n`)),
  )
  console.info(chalk.yellow('<<<<<< source code'))
  console.info(chalk.cyan(lines[s.line]))
  console.info(chalk.yellow('>>>>>>'))
  console.info(chalk.blue(lines.slice(s.line + 1, s.line + 10).join(`\n`)))
  console.info(
    chalk.yellow(
      `======================================================================`,
    ),
    '\n',
  )
})
