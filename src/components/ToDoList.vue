<template>
    <div id="todo-list">
        <div class="list-item" v-for="n in todos" :key="n.id">
            <div class="list-item-holder" v-if="n.location == location" :data-status="n.completed">
                <div class="checkbox-items" :data-status="n.completed">
                    <input type="checkbox" :data-id="n.id" :id="n.id" @click="updateTodo" :checked="n.completed"><label :data-id="n.id" :for="n.id">{{ n.name }}</label>
                </div>
                <div class="item-options">
                    <div class="delete-item" @click="deleteItem" :data-id="n.id">Delete</div>
                    <div class="archive-item" v-if="n.location !== 'archive'" @click="archiveItem" :data-id="n.id">Archive</div>
                </div>
            </div>
            <div id="new-todo-list-item">
                <input type="text" id="new-todo-list-item-input" @keyup="updateItemText">
                <input type="submit" id="new-todo-list-item-submit" @click="newItem" value="Add to do list item">
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

export default {
    name: "ToDoList",
    data() {
        return {
            newTodoItem: ''
        }
    },
    props: {
        location: String
    },
    setup() {
        const store = useStore()
        return {
            todos: store.getters.todos
        }
    },
    methods: {
        updateItemText: function(e) {
            this.newTodoItem = e.currentTarget.value;
            if(e.keyCode === 13) {
                this.newItem();
            }
            return false;
        },
        updateTodo: function(e){
            let newStatus = e.currentTarget.parentElement.getAttribute('data-status') == "true" ? false : true;
            this.$store.commit('updateTodo', {
                id: e.currentTarget.getAttribute('data-id'),
                completed: newStatus
            })
        },
        deleteItem: function(e) {
            this.$store.commit('deleteTodo', {
                id: e.currentTarget.getAttribute('data-id')
            })
        },
        newItem: function() {
            if(this.newTodoItem !== '') {
                this.$store.commit('addTodo', {
                id: uuidv4(),
                name: this.newTodoItem,
                completed: false
                })
            }
        },
        archiveItem: function(e) {
            this.$store.commit('moveTodoItem', {
                id: e.currentTarget.getAttribute('data-id'),
                location: 'archive'
            })
        }
    }
}
</script>

<style scoped>
    .list-item-holder {
        display: flex
    }

    [data-status="true"] label {
        text-decoration: line-through;
    }
</style>