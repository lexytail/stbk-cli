import { mkdir, writeJSON } from 'fs-extra'
import { resolve, join } from 'path'

export async function createProject(name: string) {

  const path: string = resolve(name)

  try {

    await mkdir(path)
  
    writeJSON(join(path, 'package.json'), { name, version: '1.0.0' }, { spaces: 2 })
    
  } catch(error) { console.log(`Path ${path} already exists`)}


}