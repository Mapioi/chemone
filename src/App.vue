<template>
  <div id="app">
    <TheLogo/>
    <div>
      <label>
        <!--TODO make a list of placeholders-->
        <input
          autofocus
          v-model="input"
          placeholder="Paris"
          spellcheck="false"
        />
      </label>
    </div>
    <div>
      <ElementCellsRow
        v-if="nSpellings"
        :symbols="symbols"
      />
      <button
        v-if="nSpellings"
        @click="previousSpelling"
        :disabled="!hasPreviousSpelling"
      >
        ‹
      </button>
      <button
        v-if="nSpellings"
        @click="nextSpelling"
        :disabled="!hasNextSpelling"
      >
        ›
      </button>
      <span
        v-if="nSpellings"
        class="small-text"
      >
        {{ symbolsIndex + 1 }} of {{ nSpellings }} result{{ nSpellings !== 1 ? "s" : "" }}
      </span>
    </div>
  </div>
</template>

<script>

import { spell, suggestFuzzy } from "./components/speller";
import ElementCellsRow from "./components/ElementCellsRow";
import TheLogo from "./components/TheLogo";

export default {
  name: "app",
  // NOTE:
  // "Don’t use arrow functions on an instance property or callback.
  // As arrow functions are bound to the parent context,
  // this will not be the Vue instance as you’d expect and this.myMethod will be undefined."
  data() {
    return {
      input: this.$route.params["word"] || "",
      symbolsIndex: this.$route.query["i"] - 1 || 0
    };
  },
  // For fun, start skimming ->
  computed: {
    symbolsList() {
      return spell(this.input);
    },
    nSpellings() {
      return this.symbolsList.length;
    },
    symbols() {
      return this.symbolsList[this.symbolsIndex];
    },
    hasNextSpelling() {
      return this.symbolsIndex < this.symbolsList.length - 1;
    },
    hasPreviousSpelling() {
      return this.symbolsIndex > 0;
    },
    suggestions() {
      return suggestFuzzy(this.input);
    }
  },
  methods: {
    nextSpelling() {
      this.symbolsIndex++;
    },
    previousSpelling() {
      this.symbolsIndex--;
    },
    updateUrl() {
      this.$router.push({
        name: "home",
        params: { word: this.input },
        query: { i: this.symbolsIndex + 1 }
      });
    }
  },
  watch: {
    input() {
      this.symbolsIndex = 0;
      this.updateUrl();
    },
    symbolsIndex() {
      this.updateUrl();
    }
  },
  // Doesn't (including these 2 comments) this look like the Nepal flag?
  // P.S. For those who haven't seen it: http://flagpedia.net/data/flags/big/np.png
  // <- Stop skimming
  components: {
    TheLogo,
    ElementCellsRow
  }
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

.small-text {
  color: gray;
  font-size: 0.8em;
}
</style>
