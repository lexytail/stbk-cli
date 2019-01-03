import { src, watch, Globs, dest } from 'gulp'
import { createProject } from 'gulp-typescript'

let project: any = createProject('tsconfig.json')

let globs: Globs = ['./**/*.ts', '!./node_modules/**/*', '!./build.ts']

compile()

// watch(globs, compile)

function compile(): void {

  src(globs)

    .pipe(project())

    .pipe(dest('./'))

  console.log('Компилим', Date.now())

}


// "baseUrl": ".",
// "paths": {
//   "~/*" : ["*"]
//  },