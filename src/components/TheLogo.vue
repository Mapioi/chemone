<template>
  <div>
    <div class="logo-row">
      <!--Coal-->
      <ElementCell
        symbol="C"
        background="#2c2c2c"
        color="#fff"
      />
      <!--Helium gas-->
      <ElementCell
        symbol="He"
        background="#f9fbfc"
        color="#0e1111"
      />
      <!--Molybdenum metal-->
      <ElementCell
        symbol="Mo"
        background="linear-gradient(11deg, #b2b4b5, #fafafa)"
        color="#002147"
      />
      <!--Neon lights-->
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
.logo-row {
  white-space: nowrap;
}

.logo-row > div {
  margin: 0;
}
</style>
