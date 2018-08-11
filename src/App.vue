<template>
  <div id="app">
    <!--TODO replace logo-->
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
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
      <ElementCellsRow
        v-if="symbolsList.length"
        :symbols="symbols"
      />
      <button
        v-if="symbolsList.length"
        @click="nextSpelling"
        :disabled="!hasNextSpelling"
      >
        ‹
      </button>
      <button
        v-if="symbolsList.length"
        @click="previousSpelling"
        :disabled="!hasPreviousSpelling"
      >
        ›
      </button>
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
      input: "",
      symbolsIndex: 0
    };
  },
  computed: {
    symbolsList() {
      return spell(this.input);
    },
    symbols() {
      return this.symbolsList[this.symbolsIndex];
    },
    hasNextSpelling() {
      return this.symbolsIndex < this.symbolsList.length - 1;
    },
    hasPreviousSpelling() {
      return this.symbolsIndex > 0;
    }
  },
  methods: {
    nextSpelling() {
      this.symbolsIndex++;
    },
    previousSpelling() {
      this.symbolsIndex--;
    }
  },
  watch: {
    input() {
      this.symbolsIndex = 0;
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

button {
  display: inline-flex;
  margin-right: 8px;
  font-weight: bolder;
  font-size: 1.2em;
}
</style>
