<template>
  <div id="layoutAuthentication">
    <div id="layoutAuthentication_content">
      <main>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-5">
              <div class="card shadow-lg border-0 rounded-lg mt-5">
                <div class="card-header">
                  <h3 class="text-center font-weight-light my-4">Login</h3>
                </div>
                <div class="card-body">
                  <ValidationObserver v-slot="{ invalid }">
                    <form @submit.prevent="loginUser">
                      <ValidationProvider
                        name="email"
                        rules="required|email"
                        v-slot="{ errors }"
                      >
                        <div class="form-floating mb-3">
                          <input
                            class="form-control"
                            id="inputEmail"
                            type="email"
                            placeholder="name@example.com"
                            v-model="user.email"
                          />
                          <label for="inputEmail">Email address</label>
                          <span class="invalid-feedback">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                      <!-- <div class="invalid-feedback" v-if="error.email">
                        {{ error.email }}
                      </div> -->
                      <ValidationProvider
                        name="password"
                        rules="required|min:8"
                        v-slot="{ errors }"
                      >
                        <div class="form-floating mb-3">
                          <input
                            class="form-control"
                            id="inputPassword"
                            type="password"
                            placeholder="Password"
                            v-model="user.password"
                          />
                          <label for="inputPassword">Password</label>
                          <span class="invalid-feedback">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                      <!-- <div class="invalid-feedback" v-if="error.password">
                        {{ error.password }}
                      </div> -->

                      <div class="form-check mb-3">
                        <input
                          class="form-check-input"
                          id="inputRememberPassword"
                          type="checkbox"
                          value=""
                          v-model="remember_me"
                        />
                        <label
                          class="form-check-label"
                          for="inputRememberPassword"
                          >Remember Password</label
                        >
                      </div>
                      <div
                        class="
                          d-flex
                          align-items-center
                          justify-content-between
                          mt-4
                          mb-0
                        "
                      >
                        <router-link class="small" to="/reset-password-request"
                          >Forgot Password?</router-link
                        >
                        <button
                          class="btn btn-primary"
                          type="submit"
                          :disabled="invalid"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </ValidationObserver>
                </div>
                <div class="card-footer text-center py-3">
                  <div class="small">
                    <router-link to="/register">Need an account? Sign up!</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <div id="layoutAuthentication_footer">
      <footer class="py-4 bg-light mt-auto">
        <div class="container-fluid px-4">
          <div class="d-flex align-items-center justify-content-between small">
            <div class="text-muted">Copyright &copy; Your Website 2022</div>
            <div>
              <a>Privacy Policy</a>
              &middot;
              <a>Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      remember_me: false,
    };
  },
  methods: {
    loginUser() {
      this.$store.dispatch("loginUser", this.user);
    },
  },
};
</script>

<style>
</style>