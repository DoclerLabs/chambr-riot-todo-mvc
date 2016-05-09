import 'babel-polyfill'
import Highway from 'Highway'
import Chambr from 'Chambr/Client'
import riot from 'riot'
import '../tags/compiled/todo-app.js'
import '../tags/compiled/todo-item.js'

let Host = new self.Worker('worker.js')
let HW = new Highway(Host)
let CH = new Chambr(HW)

riot.mixin({$: CH.$})

HW.sub('Worker->Ready', () => riot.mount('todo-app'))

console.info('Site engine started.')