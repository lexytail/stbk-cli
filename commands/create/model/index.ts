import { readdir, writeFile, ensureDirSync } from 'fs-extra'
import { render } from 'nunjucks'
import { join, resolve } from 'path'

export async function createModel(name: string): Promise<void> {

  const modelspath: string = resolve('models')

  ensureDirSync(modelspath)

  ensureDirSync(join(modelspath, name))

  if (!name) {

    console.error('No model specified to create')

    return

  }

  name = name.replace(/\b\w/g, (letter: string) => letter.toUpperCase())

  const files: string[] = await readdir(join(__dirname, '$template'))

  console.log(files, name)

  files.forEach((filename: string) => {

    let path: string = join(__dirname, `/$template/${filename}`)

    render(path, { model: name }, (error: Error, redered: string | undefined) => {

      if (error) return console.log('Ошибка при рендере', error)

      filename = `${filename.split('.')[0]}.ts`

      writeFile(`./models/${name}/${filename}`, redered, { encoding: 'utf-8' }, (error: NodeJS.ErrnoException) => {

        if (error) return console.log(`Ошибка при записи файла ${filename}`, error)

        console.log(`Файл ${filename} записан`)

      })

    })

  })

}