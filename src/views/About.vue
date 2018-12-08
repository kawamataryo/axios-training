<template>

  <div class="about">
    <h1>This is About</h1>
    <eop-button text="hoge" eopContents="hoge"></eop-button>
    <eop-button text="fuga" eopContents="fuga"></eop-button>
    <eop-button text="megu"></eop-button>
  </div>
</template>

<script>
  import Button from "../components/Button";

  export default {
    components: {
      eopButton: Button,
    },
  name: "about"
};
</script>
