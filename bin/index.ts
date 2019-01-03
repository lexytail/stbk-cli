#!/usr/bin/env node

import { argv } from 'yargs'
import { createProject, createModel, updateModel, createRouter } from '../commands'

const command: string = argv._[0]

const type: string = argv._[1]

const name: string = argv._[2]

switch (command) {

  case 'create': {

    if (!name) {

      console.log('Specify the name with the 3rd argument')

      break

    }

    switch (type) {

      case 'project': {

        createProject(name)

        break

      } case 'model': {

        createModel(name)

        break

      } case 'router': {
        
        createRouter(name)

        break

      } default: {

        console.log(`\nType ${type} is not supported for creation, try --help\n`)

        break

      }

    }

    break

  }
  
  case 'update': {
    
    switch(type) {

      case 'model': {
        
        updateModel(name)

        break

      } default: {

        noCommand(type)

        break

      }

    }

    break

  } default: {

    noCommand()

    break

  }

}

function noCommand(name?: string) {

  if (name) console.log(`\nNo command ${name} in the list, try --help\n`)

  else console.log('\nThere is no command in the list, try --help\n')

}