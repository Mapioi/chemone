<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>
      <label>
        <input
          autofocus
          :value="input"
          placeholder="Parisi"
        />
      </label>
    </div>
    <div>
      {{ symbols }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      input: "",
      symbols: [["C", "He", "Mo", "Ne"]]
    }
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
