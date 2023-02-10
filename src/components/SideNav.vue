<template>
  <div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div class="sb-sidenav-menu">
        <div class="nav">
          <div class="sb-sidenav-menu-heading">Core</div>
          <router-link to="/home" class="nav-link" exact>
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            Dashboard
          </router-link>
          <router-link
            v-if="$store.state.Auth.user.role == 'adminstrator'"
            to="/categories"
            class="nav-link"
            exact
          >
            <div class="sb-nav-link-icon">
              <i class="fas fa-fw fa-chart-area"></i>
            </div>
            Categories
          </router-link>
          <router-link to="/products" class="nav-link" exact>
            <div class="sb-nav-link-icon">
              <i class="fas fa-fw fa-chart-area"></i>
            </div>
            Product
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "SideNav",
};
</script>

<style>
</style>