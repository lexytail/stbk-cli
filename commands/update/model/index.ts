import { join, resolve } from 'path'
import { Schema, SchemaDefinition, SchemaTypeOpts, SchemaType } from 'mongoose'
import { renderString } from 'nunjucks'
import { readFileSync, writeFileSync } from 'fs';

require('ts-node/register')

export async function updateModel(name: string): Promise<void> {

  if (!name) {

    console.error('No model specified to update')

    return

  }

  const modelspath: string = resolve('models')

  let schema: Schema = (await import(join(modelspath, name, 'schema'))).default

  let ISchema: string = schemaToInterface(schema.obj, name)

  writeFileSync(join(modelspath, name ,'interface.ts'), ISchema)

}

function schemaToInterface(definition: SchemaDefinition, name: string): string {

  let properties: KeysObject<[string, boolean]> = {}

  for (let key in definition) {

    let options = definition[key] as SchemaTypeOpts<any>

    properties[key] = [normalizeType(options.type), !!options.required || !!options.default]

  }

  const interfaceTemplate: string = readFileSync(join(__dirname, 'interface.njk'), 'utf-8')

  let model: string = name.replace(/\b\w/g, (letter: string) => letter.toUpperCase())

  let rendered: string = renderString(interfaceTemplate, { model, properties })

  return rendered

}

function getClass(object: object): string {

  return {}.toString.call(object).slice(8, -1)

}

function normalizeType(typeFunction: Function): string {

  let primitives: string[] = ['String', 'Number']

  let type: string = getClass(typeFunction.prototype)

  if (primitives.indexOf(type) !== -1) type = type.toLowerCase()

  return type

}