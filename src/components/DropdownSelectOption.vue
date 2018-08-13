<template>
  <div
    :class="{option, selected}"
    @click="onSelect"
    @mouseover="onHover"
  >
    {{ option }}
  </div>
</template>

<script>
export default {
  name: "DropdownSelectOption",
  props: {
    selected: { type: Boolean, required: true },
    option: { type: String, required: true },
    onSelect: { type: Function, required: true },
    onHover: { type: Function, required: true },
  }
};
</script>

<style scoped>
.option {
  margin: auto;
  padding: 0 8px 0 25px;
  border-style: ridge;
  border-width: 0 1px 0 1px;
  width: 400px;
  font-size: 1.5em;
  text-transform: capitalize;
  text-align: left;
}

.option:first-child {
  margin-top: -20px;
}

.option:last-child {
  border-bottom-width: 1px;
}

.selected {
  background: azure;
}

.selected:first-child {
  background: #ffe8e8;
}
</style>