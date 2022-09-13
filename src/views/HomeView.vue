<template>
  <h1>To do list:</h1>
  <ToDoList location="home"/>
</template>

<script>
import ToDoList from '@/components/ToDoList.vue';

export default {
  name: 'HomeView',
  components: {
    ToDoList
  }
}
</script>
