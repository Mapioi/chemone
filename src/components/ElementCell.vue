<template>
  <div class="element-cell">
    <h3 class="element-atomic-number">
      {{ atomicNumber }}
    </h3>
    <h1 class="element-symbol">
      {{ symbol }}
    </h1>
    <h3 class="element-atomic-mass">
      {{ atomicMass }}
    </h3>
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

<!--TODO css-->
<style scoped>
.element-cell {
  display: inline-block;
  border: 1px solid dimgrey;
}
</style>