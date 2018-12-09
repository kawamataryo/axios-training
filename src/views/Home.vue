<template>
  <div class="home">
    <h1>This is Home</h1>
    <eop-button text="hoge" eopContents="hoge"></eop-button>
    <eop-button text="fuga" eopContents="fuga"></eop-button>
    <eop-button text="megu"></eop-button>
  </div>
</template>

<script>
import Button from "../components/Button";

export default {
  components: {
    eopButton: Button
  },
  name: "home",
  created: function() {
    this.$store.commit("setEopPage", "about-page");
    this.sendEopPage({ eopHoge: "hoge", eopFuga: "fuga" });
  }
};
</script>
