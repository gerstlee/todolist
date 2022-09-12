import { createApp } from 'vue'
import { createStore } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App);

const store = createStore({
    state(){
        return {
            todos:[
                {id:'fist-element', name: 'To wake up at 7', completed: false, location: 'home'}
            ]
        }
    },
    getters:{
        todos(state){
            return state.todos;
        }
    },
    mutations:{
        updateTodo(state, todoItem) {
            let id = todoItem.id;
            let completed = todoItem.completed;
            let name = todoItem.name;
            let findEl = state.todos.find((x) => x.id == id);
            if (findEl !== null) {
                if (completed !== undefined) {
                    findEl.completed = completed;
                }
                if (name !== undefined) {
                    findEl.name = name;
                }
            } else {
                console.log('ToDo does not exist!')
            }
        },
        addTodo (state, todoItem) {
            if(todoItem.id !== undefined && typeof todoItem.name == 'string' && typeof todoItem.completed == 'boolean') {
                state.todos.push({
                    id: todoItem.id,
                    name: todoItem.name,
                    completed: todoItem.completed,
                    location: 'home'
                })
            }
        },
        deleteTodo (state, todoItem) {
            let id = todoItem.id;
            let removedEl = state.todos.findIndex((x) => x.id == id);
            if(removedEl !== null) {
                state.todos.splice(removedEl, 1);
            }
        },
        moveTodoItem (state, todoItem) {
            let id = todoItem.id;
            let location = todoItem.location;
            let findEl = state.todos.find((x) => x.id == id);
            if(findEl !== null) {
                findEl.location = location;
            } else {
                console.log('ToDo could not be found!')
            }
        },
        loadStore() {
            if(localStorage.getItem('store')) {
                try {
                    this.replaceState(JSON.parse(localStorage.getItem('store')));
                } catch (e) {
                    console.log('Could not initialize store', e);
                }
            }
        },
    }
});

store.subscribe((mutation, state) => {
    localStorage.setItem('store', JSON.stringify(state));
});

app.use(router).use(store).mount('#app')
