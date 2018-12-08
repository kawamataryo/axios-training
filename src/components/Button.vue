<template>
  <button class="btn" @click="sendEopClick(eopContents)">
    <a href="#">{{ text }}</a>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: ["text", "eopContents"]
};
</script>

<style scoped></style>
