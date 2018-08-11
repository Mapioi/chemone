<template>
  <div>
    <div class="logo-row">
      <ElementCell
        symbol="C"
        background="#000"
        color="#fff"
      />
      <ElementCell
        symbol="He"
        background="#fff"
        color="#000"
      />
    </div>
    <div class="logo-row">
      <ElementCell
        symbol="Mo"
        background="#cccccc"
      />
      <ElementCell
        symbol="Ne"
        background="linear-gradient(169deg, #e57373, #fff176, #a5d6a7, #80cbc4, #b39ddb)"
      />
    </div>
  </div>
</template>

<script>
import ElementCell from "./ElementCell";

export default {
  name: "TheLogo",
  components: { ElementCell }
};
</script>

<style scoped>
.logo-row > div {
  margin: 0;
}
</style>