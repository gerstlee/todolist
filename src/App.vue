<template>
  <div class="nav" id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/archive">Archive</router-link>
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<script>
import { useStore } from 'vuex';

export default {
  beforeCreate() {
    const store = useStore();
    store.commit('loadStore');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 15px;
  color: #2c3e50;
}

.nav {
  padding: 30px;
}

.nav a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 15px 0 0;
    background: #eee;
    border-radius: 14px;
    text-decoration: none;
    padding: 4px 11px;
}

.nav a.router-link-exact-active {
  color: #42b983;
}

h1 {
    font-weight: 900;
    font-size: 30px;
    margin: 30px 0 30px 0;
}

input[type="submit"] {
    background: #42b983;;
    color: white;
    border-radius: 10px;
    padding: 7.5px 15px;
    border: none;
    box-shadow: 0 5px 10px #42b983;;
    font-size: 15px;
    font-weight: 600;
    transition: all 0.25s ease-out;
    cursor: pointer;
}
input[type="checkbox"] {
    width: auto;
    margin: 0 7.5px 0 0;
}
input[type="submit"]:hover {
    background: #42b983;
    box-shadow: 0 3px 7px darkolivegreen;
}
input {
    border-radius: 10px;
    box-sizing: border-box;
    border: 1px solid #aaa;
    font-size: 15px;
    width: 100%;
    padding: 7.5px 15px;
}
</style>
