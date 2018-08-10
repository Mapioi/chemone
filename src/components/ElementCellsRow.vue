<template>
  <div class="element-cells-row">
    <ElementCell
      v-for="(symbol, i) in symbols"
      :key="i"
      :symbol="symbol"
    />
  </div>
</template>

<script>
import ElementCell from "./ElementCell";

export default {
  name: "ElementCellsRow",
  components: { ElementCell },
  props: {
    symbols: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>

</style>