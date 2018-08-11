<template>
  <div
    class="element-cell"
    :style="{color, background}"
  >
    <span class="element-atomic-number">
      {{ atomicNumber }}
    </span>
    <h1 class="element-symbol">
      {{ symbol }}
    </h1>
    <span class="element-atomic-mass">
      {{ atomicMass }}
    </span>
  </div>
</template>

<script>
import data from "./PeriodicTableJSON";

export default {
  name: "ElementCell",
  props: {
    symbol: {
      type: String,
      required: true
    },
    background: {
      type: String,
      default: () => "#f8f8f8"
    },
    color: {
      type: String,
      default: () => "#2c3e50"
    }
  },
  computed: {
    element() {
      for (const el of data.elements) {
        if (el.symbol === this.symbol) {
          return el;
        }
      }
    },
    atomicNumber() {
      return parseInt(this.element["number"]);
    },
    atomicMass() {
      return this.element["atomic_mass"].toFixed(2);
    }
  }
};
</script>

<style scoped>
.element-cell {
  display: inline-block;
  border: 1px solid dimgrey;
  padding: 10px 0;
  width: 150px;
  margin-bottom: 15px;
  margin-right: 5px;
}

.element-atomic-number,
.element-atomic-mass {
  font-weight: bold;
}
</style>