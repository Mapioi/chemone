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
      <div class="no-results" v-if="!symbolsList.length">
        No results
      </div>
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

input {
  width: 400px;
  height: 40px;
  border-radius: 5px;
  border: 3px solid lightgray;
  padding: 5px;
  font-size: 1.5em;
  margin: 20px auto;
}

input:focus {
  border-color:gray;
  outline-width: 0;
}

.no-results {
  color: gray;
  font-size: 1.5em;
  margin-top: 10px;
}
</style>
