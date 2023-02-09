<template>
  <div>
    <Header></Header>
    <div id="layoutSidenav">
      <SideNav></SideNav>
      <SideNavContent />
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";

import SideNav from "../components/SideNav";
import SideNavContent from "../components/SideNavContent";
export default {
  components: {
    Header,
    SideNavContent,
    SideNav,
  },
};
</script>

<style>
</style>