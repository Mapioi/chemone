<template>
  <div>
    <label>
      <input
        autofocus
        :value="value"
        @input="$emit('input', $event.target.value)"
        @keydown="handleKeyDown"
        @blur="blurHideWithDelay"
        @focus="blurHideData=false"
        :placeholder="placeHolder"
        spellcheck="false"
      />
    </label>
    <div v-if="showOptions && !blurHideData">
      <DropdownSelectOption
        v-if="canShiftUp"
        option="▲"
        :selected="false"
        :on-select="shiftUp"
        :on-mouse-enter="startShiftingUp"
        :on-mouse-leave="stopShifting"
      />
      <DropdownSelectOption
        v-for="(option, i) of optionsShown"
        :key="option + (startIndex + i)"
        :option="option"
        :selected="startIndex + i === selectedIndex"
        :on-select="() => onSelect(option)"
        :on-mouse-enter="() => selectedIndex = startIndex + i"
      />
      <DropdownSelectOption
        v-if="canShiftDown"
        option="▼"
        :selected="false"
        :on-select="shiftDown"
        :on-mouse-enter="startShiftingDown"
        :on-mouse-leave="stopShifting"
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
    height: { type: Number, default: 9 },
    onSelect: { type: Function, required: true }
  },
  data() {
    return {
      selectedIndex: 0,
      startIndex: 0,
      blurHideData: false,
      intervalId: null
    };
  },
  computed: {
    canShiftUp() {
      return this.startIndex > 0;
    },
    canShiftDown() {
      return this.endIndex <= this.options.length + 1;
    },
    endIndex() {
      let endIndex = this.startIndex + this.height;
      if (this.canShiftUp) endIndex--;
      if (endIndex <= this.options.length + 1) endIndex--;
      return endIndex;
    },
    optionsShown() {
      return [this.value, ...this.options].slice(this.startIndex, this.endIndex);
    }
  },
  methods: {
    nextOption() {
      if (this.selectedIndex >= this.options.length) return;
      if (this.selectedIndex >= this.endIndex - 2) {
        this.shiftDown();
      } else {
        this.selectedIndex++;
      }
    },
    previousOption() {
      if (this.selectedIndex <= 0) return;
      if (this.selectedIndex <= this.startIndex) {
        this.shiftUp();
      } else {
        this.selectedIndex--;
      }
    },
    shiftUp() {
      this.selectedIndex--;
      this.startIndex--;
    },
    shiftDown() {
      this.selectedIndex++;
      this.startIndex++;
    },
    startShiftingUp() {
      this.intervalId = setInterval(this.shiftUp, 200);
    },
    startShiftingDown() {
      this.intervalId = setInterval(this.shiftDown, 200);
    },
    stopShifting() {
      clearInterval(this.intervalId);
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
      if (e.key === "Enter" && this.selectedIndex >= 0) {
        this.onSelect(this.optionsShown[this.selectedIndex - this.startIndex]);
      }
    },
    blurHideWithDelay() {
      setTimeout(100, function() {
        this.blurHideData = true;
      });
    }
  },
  watch: {
    value() {
      this.selectedIndex = 0;
      this.startIndex = 0;
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