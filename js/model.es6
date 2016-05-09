import Chambr from 'Chambr/Worker'
import { Default, Peel, Empty } from 'Chambr/Decorator'
//import LocalStorage from '../src/Adapter/LocalStorage.es6'

class Todo extends Chambr.Model {

    static DefaultData = []

    @Default(0)
    get total(){
        return this.modelData.length
    }

    @Default(0)
    get uncompleted(){
        return this.modelData.filter(d => !d.completed).length
    }z


    create(value){
        this.modelData.push({
            value,
            completed: false
        })
        return this.resolve()
    }

    update(index, value){
        Object.assign(this.modelData[index], value)
        return this.resolve()
    }

    @Peel('item->index')
    delete(index){
        this.modelData.splice(index, 1)
        return this.resolve()
    }

    @Peel('item->index')
    toggle(index){
        return this.update(index, {
            completed: !this.modelData[index].completed
        })
    }

    @Peel('target->checked')
    toggleEach(completed){
        this.modelData.forEach(d => d.completed = completed)
        return this.resolve()
    }

    @Peel('item->index', '0:target->value')
    edit(index, value){
        console.log(arguments)
        return this.update(index, { value })
    }

    @Empty()
    clear(){
        this.modelData = this.modelData.filter(d => !d.completed)
        return this.resolve()
    }
}

Chambr.Model = Todo