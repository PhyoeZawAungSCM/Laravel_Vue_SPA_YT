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
                      <div class="invalid-feedback" v-if="error.email">
                        {{ error.email }}
                      </div>
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
                      <div class="invalid-feedback" v-if="error.password">
                        {{ error.password }}
                      </div>

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
                    <a href="/register">Need an account? Sign up!</a>
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
              <a href="#">Privacy Policy</a>
              &middot;
              <a href="#">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { http } from "@/services/http_services";
export default {
  name: "login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      remember_me: false,
      error: {
        email: null,
        password: null,
        match: null,
      },
    };
  },
  methods: {
    clearErrors() {
      this.error = {
        email: null,
        password: null,
        match: null,
      };
    },
    storeUser(data) {
      localStorage.setItem("token", JSON.stringify(data));
    },
    loginUser() {
      this.clearErrors();
      http()
        .post("/auth/login", this.user)
        .then((response) => {
          console.log(response.data);
          this.storeUser(response.data.access_token);
          this.$store.dispatch("load_user");
          this.$router.push("/home");
        })
        .catch((error) => {
          switch (error.response.status) {
            case 422:
              if (error.response.data.errors.email) {
                this.error.email = error.response.data.errors.email[0];
              }
              if (error.response.data.errors.password) {
                this.error.password = error.response.data.errors.password[0];
              }
              break;
            case 401:
              this.flashMessage.error({
                message: error.response.data.message,
              });
              break;
            default:
              this.flashMessage.error({
                message: "Some error occur , please try again",
              });
              break;
          }
        });
    },
  },
};
</script>

<style>
</style>