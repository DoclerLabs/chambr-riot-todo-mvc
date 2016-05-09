import 'babel-polyfill'
import './_workerHW.es6'
import './model.es6'

console.info('Worker engine started.')

self.HW.pub('Worker->Ready')
