<todo-item class="{ completed: item.completed, editing: editing }" ondblclick="{ dblclick }">
        <div class="view">
            <input class="toggle" type="checkbox" checked="{ item.completed }" onchange="{ $.Todo.toggle }">
            <label>{ item.value }</label>
            <button class="destroy" onclick="{ $.Todo.delete }"></button>
        </div>
        <input name="input" class="edit" value="{ item.value }" onblur="{ blur }" onchange="{ $.Todo.edit }">

        <script>
            this.editing = false

            this.dblclick = function(){
                this.editing = true
                this.update()
                this.input.focus()
            }

            this.blur = function(){
                this.editing = false
            }
        </script>
</todo-item>