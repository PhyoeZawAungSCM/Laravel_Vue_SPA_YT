<template>
  <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
    <!-- Navbar Brand-->
    <a class="navbar-brand ps-3">{{ $store.state.Auth.user.name }}</a>
    <!-- Sidebar Toggle-->
    <button
      class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
      id="sidebarToggle"
      href="#!"
    >
      <i class="fas fa-bars"></i>
    </button>
    <!-- Navbar Search-->
    <form
      class="
        d-none d-md-inline-block
        form-inline
        ms-auto
        me-0 me-md-3
        my-2 my-md-0
      "
    ></form>
    <!-- Navbar-->
    <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          id="navbarDropdown"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          ><i class="fas fa-user fa-fw"></i
        ></a>
        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdown"
        >
          <li>
            <button class="dropdown-item" @click="logoutUser">Logout</button>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import { http } from "@/services/http_services";
import * as auth from "@/services/auth_services";
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    logoutUser() {
      http()
        .post("/auth/logout")
        .then((response) => {
          console.log(response.data);
          localStorage.clear();
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
  },
  mounted() {},
};
</script>

<style>
</style>