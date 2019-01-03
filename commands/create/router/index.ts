import { writeFileSync, mkdirSync, readFileSync, ensureDirSync } from 'fs-extra'
import { renderString } from 'nunjucks'
import { join, resolve } from 'path'

export async function createRouter(router: string, param: string = 'id'): Promise<void> {

  const methods: string[] = ['get', 'post', 'put', 'patch', 'delete']

  const routerspath: string = resolve('routers')

  const routerpath: string = join(routerspath, router)

  const indexTmp: string = readFileSync(join(__dirname, '$template', 'index.njk'), 'utf-8')

  const handlerTmp: string = readFileSync(join(__dirname, '$template', 'handler.njk'), 'utf-8')

  ensureDirSync(routerspath)

  ensureDirSync(routerpath)

  ensureDirSync(join(routerpath, `_${param}`))

  renderIndexTmp(false)

  renderIndexTmp(true)

  function renderIndexTmp(child: boolean): void {

    const rendered: string = renderString(indexTmp, { methods, param, child })

    writeFileSync(join(routerpath, `${child ? ('_' + param + '/') : ''}index.ts`), rendered)

    methods.forEach((method: string) => {

      const rendered: string = renderString(handlerTmp, {})

      writeFileSync(join(routerpath, `/${child ? ('_' + param + '/') : ''}${method}.ts`), rendered)

    })

  }

}
