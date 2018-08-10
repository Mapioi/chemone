<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>
      <label>
        <input
          autofocus
          v-model="input"
          placeholder="Parisi"
        />
      </label>
    </div>
    <div>
      <!--TODO render with component-->
      {{ symbolsList }}
    </div>
  </div>
</template>

<script>

function spell(word) {
  return [Array(word)];
}

export default {
  name: 'app',
  // NOTE:
  // "Don’t use arrow functions on an instance property or callback.
  // As arrow functions are bound to the parent context,
  // this will not be the Vue instance as you’d expect and this.myMethod will be undefined."
  data() {
    return {
      input: "",
    }
  },
  computed: {
    symbolsList() {
      return spell(this.input);
    },
  },
  components: {}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
