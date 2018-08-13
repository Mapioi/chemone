<template>
  <div>
    <label>
      <input
        autofocus
        :value="value"
        @input="$emit('input', $event.target.value)"
        @keydown="handleKeyDown"
        :placeholder="placeHolder"
        spellcheck="false"
      />
    </label>
    <div v-if="showOptions">
      <DropdownSelectOption
        v-for="(option, i) of [value, ...options]"
        :key="option + i"
        :option="option"
        :selected="i === selectedIndex"
        :on-select="() => onSelect(option)"
        :on-hover="() => selectedIndex = i"
      />
    </div>
  </div>
</template>

<script>
import DropdownSelectOption from "./DropdownSelectOption";

export default {
  name: "DropdownSelect",
  components: { DropdownSelectOption },
  props: {
    value: String,
    placeHolder: String,
    options: { type: Array, required: true },
    showOptions: { type: Boolean, required: true },
    onSelect: { type: Function, required: true }
  },
  data() {
    return {
      selectedIndex: 0
    };
  },
  methods: {
    nextOption() {
      if (this.selectedIndex < this.options.length) this.selectedIndex++;
    },
    previousOption() {
      if (this.selectedIndex > 0) this.selectedIndex--;
    },
    handleKeyDown(e) {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        this.previousOption();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        this.nextOption();
      }
      if (e.key === "Enter" && this.selectedIndex >= 0) this.onSelect(this.options[this.selectedIndex]);
    }
  },
  watch: {
    value() {
      this.selectedIndex = 0;
    }
  }
};
</script>

<style scoped>
input {
  width: 400px;
  height: 40px;
  border-radius: 14px;
  border: 2px solid #e3e3e3;
  color: #2c3e50;
  outline: none;
  padding: 0 15px 0 32px;
  font-size: 1.5em;
  transition: border-color 0.2s ease;
  vertical-align: middle !important;
  background-size: 16px;
  background: #fff url("../assets/baseline-spellcheck-24px.svg") 5px no-repeat;
  text-transform: capitalize;
}

input:focus {
  border-color: #42b983;
  outline-width: 0;
}

div {
  margin: 20px auto;
}
</style>