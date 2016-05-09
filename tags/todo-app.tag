<todo-app>
    <header class="header">
        <h1>todos</h1>
        <form name="form" onsubmit="{ submit }">
            <input name="todo" class="new-todo" placeholder="What needs to be done?" onkeyup="{ keyup }" autofocus autocomplete="off">
        </form>
    </header>
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
        <input if="{ $.Todo.total }" class="toggle-all" type="checkbox" onchange="{ $.Todo.toggleEach }">
        <label if="{ $.Todo.total }" for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            <li each="{ index, item in $.Todo }" if="{ parent.isVisible(item.completed) }" riot-tag="todo-item" no-reorder></li>
        </ul>
    </section>
    <footer if="{ $.Todo.total }" class="footer">
        <span class="todo-count"><strong>{ $.Todo.uncompleted }</strong> item left</span>
        <ul class="filters">
            <li><a class="{ selected: status == 'all' }" href="#/status/all">All</a></li>
            <li><a class="{ selected: status == 'uncompleted' }" href="#/status/uncompleted">Active</a></li>
            <li><a class="{ selected: status == 'completed' }" href="#/status/completed">Completed</a></li>
        </ul>
        <button if="{ $.Todo.total != $.Todo.uncompleted }" class="clear-completed" onclick="{ $.Todo.clear }">Clear completed</button>
    </footer>

    <script>
        var Todo = this.$.Todo()
        this.status = 'all'

        Todo.on('updated', this.update)

        this.submit = function(ev) {
            var value = new FormData(ev.target).get('todo').trim()
            value && Todo.create(value)
            this.form.reset()
        }

        this.keyup = function(ev) {
            ev.keyCode === 27 && this.form.reset()
            return true
        }

        this.isVisible = function(completed){
            return (this.status == 'all')
                   || (this.status == 'completed' && completed)
                   || (this.status == 'uncompleted' && !completed)
        }

        riot.route.start()
        riot.route('status/*', function(status){
            this.update({ status })
        }.bind(this))
        riot.route.exec()
    </script>

</todo-app>