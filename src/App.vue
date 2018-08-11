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
          spellcheck="false"
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
  border-radius: 15px;
  border: 2px solid #e3e3e3;
  color: #2c3e50;
  outline: none;
  padding: 0 15px 0 32px;
  font-size: 1.5em;
  margin: 20px auto;
  transition: border-color 0.2s ease;
  vertical-align: middle !important;
  background-size: 16px;
  background: #fff url("assets/baseline-spellcheck-24px.svg") 5px no-repeat;
  text-transform: capitalize;
}

input:focus {
  border-color: #42b983;
  outline-width: 0;
}

.no-results {
  color: gray;
  font-size: 1.5em;
  margin-top: 10px;
}
</style>
