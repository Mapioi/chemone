<template>
  <div id="app">
    <!--TODO replace logo-->
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
      <ElementCellsRow
        v-for="(symbols, i) in symbolsList"
        :key="i"
        :symbols="symbols"
      />
    </div>
  </div>
</template>

<script>

import spell from "./components/speller";
import ElementCellsRow from "./components/ElementCellsRow";

export default {
  name: "app",
  // NOTE:
  // "Don’t use arrow functions on an instance property or callback.
  // As arrow functions are bound to the parent context,
  // this will not be the Vue instance as you’d expect and this.myMethod will be undefined."
  data() {
    return {
      input: ""
    };
  },
  computed: {
    symbolsList() {
      return spell(this.input);
    }
  },
  components: { ElementCellsRow }
};
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
