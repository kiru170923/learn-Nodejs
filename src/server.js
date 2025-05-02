/* eslint-disable no-console */

import express from 'express'
import asyncExitHook  from 'async-exit-hook'
import {CONNECT_DB, GET_DB, EXIT_DB} from '~/config/mongodb'
import { mapOrder } from '~/utils/sorts.js'
import {env} from '~/config/environment'
const START_SERVER = () => {
  const app = express()

  app.get('/', async (req, res) => {
    // console.log(process.env)
    res.end('<h1>NNice</h1>')
  })

  app.listen( env.APP_PORT, env.APP_HOST, () => {
  // eslint-disable-next-line no-console
    console.log(`Hello ${env.AUTHOR}, I am running at http://${ env.APP_HOST }:${ env.APP_PORT}/`)
  })
  asyncExitHook( async () => {
   await EXIT_DB()
  })
 
}



(async () =>{
  try{
    console.log('connecting to mongodb clound atlas ...')
    await CONNECT_DB()
    console.log('connected to mongodb clound atlas')
    START_SERVER()
  }
  catch (error) {
    console.error(error)
    setTimeout(() => {
      process.exit(1)
    }, 1000);
  }
})()
// CONNECT_DB()
//   .then(() => console.log('connected to mongodb clound atlas'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })