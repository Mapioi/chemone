<template>
  <div id="app">
    <TheLogo/>
    <DropdownSelect
      v-model="input"
      place-holder="Paris"
      :show-options="!nSpellings"
      :options="suggestions"
      :on-select="takeSuggestion"
    />
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
</template>

<script>
import { spell, suggestFuzzy } from "./components/speller";
import ElementCellsRow from "./components/ElementCellsRow";
import TheLogo from "./components/TheLogo";
import DropdownSelect from "./components/DropdownSelect";

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
    },
    takeSuggestion(suggestion) {
      this.input = suggestion;
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
  components: {
    DropdownSelect,
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
