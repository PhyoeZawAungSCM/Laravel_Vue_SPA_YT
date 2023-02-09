<template>
  <div>
    <router-view></router-view>
    <FlashMessage :position="'right bottom'"></FlashMessage>
  </div>
</template>

<script>
import * as auth from "@/services/auth_services";
export default {
  name: "App",
  methods: {
    getProfile() {
      if (auth.isLogin()) {
        this.$store.dispatch("load_user");
      }
    },
  },
  mounted() {
    this.getProfile();
  },
};
</script>


</style>
