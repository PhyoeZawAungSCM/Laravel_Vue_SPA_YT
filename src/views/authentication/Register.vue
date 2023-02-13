<template>
  <div id="layoutAuthentication">
    <div id="layoutAuthentication_content">
      <main>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-7">
              <div class="card shadow-lg border-0 rounded-lg mt-5">
                <div class="card-header">
                  <h3 class="text-center font-weight-light my-4">
                    Create Account
                  </h3>
                </div>
                <div class="card-body">
                  <ValidationObserver v-slot="{ invalid }">
                    <form @submit.prevent="registerUser">
                      <div class="row mb-3">
                        <div class="col-md-6">
                          <ValidationProvider
                            name="name"
                            rules="required|max:225"
                            v-slot="{ errors }"
                          >
                            <div class="form-floating mb-3 mb-md-0">
                              <input
                                class="form-control"
                                id="Name"
                                type="text"
                                placeholder="Enter your first name"
                                v-model="user.name"
                              />
                              <label for="Name">Full Name</label>
                              <span class="invalid-feedback">{{
                                errors[0]
                              }}</span>
                            </div>
                          </ValidationProvider>

                          <!-- <div v-if="error.name" class="invalid-feedback">
                            {{ error.name }}
                          </div> -->
                        </div>

                        <div class="col-md-6">
                          <ValidationProvider
                            name="email"
                            rules="required|email"
                            v-slot="{ errors }"
                          >
                            <div class="form-floating mb-3">
                              <input
                                v-model="user.email"
                                class="form-control"
                                id="inputEmail"
                                type="email"
                                placeholder="name@example.com"
                              />
                              <label for="inputEmail">Email address</label>
                              <span class="invalid-feedback">{{
                                errors[0]
                              }}</span>
                            </div>
                          </ValidationProvider>

                          <!-- <div v-if="error.email" class="invalid-feedback">
                            {{ error.email }}
                          </div> -->
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-md-6">
                          <ValidationProvider
                            name="password"
                            rules="required|min:8"
                            vid="confirmation"
                            v-slot="{ errors }"
                          >
                            <div class="form-floating mb-3 mb-md-0">
                              <input
                                v-model="user.password"
                                class="form-control"
                                id="inputPassword"
                                type="password"
                                placeholder="Create a password"
                              />
                              <label for="inputPassword">Password</label>
                              <span class="invalid-feedback">{{
                                errors[0]
                              }}</span>
                            </div>
                          </ValidationProvider>
                          <!-- <div v-if="error.password" class="invalid-feedback">
                            {{ error.password }}
                          </div> -->
                        </div>
                        <div class="col-md-6">
                          <ValidationProvider
                            name="password-confirm"
                            rules="required|min:8|confirm:confirmation"
                            v-slot="{ errors }"
                          >
                            <div class="form-floating mb-3 mb-md-0">
                              <input
                                v-model="user.password_confirmation"
                                class="form-control"
                                id="inputPasswordConfirm"
                                type="password"
                                placeholder="Confirm password"
                              />
                              <label for="inputPasswordConfirm"
                                >Confirm Password</label
                              >
                              <span class="invalid-feedback">{{
                                errors[0]
                              }}</span>
                            </div>
                          </ValidationProvider>
                        </div>
                      </div>
                      <div class="mt-4 mb-0">
                        <div class="d-grid">
                          <button
                            type="submit"
                            class="btn btn-primary btn-block"
                            :disabled="invalid"
                          >
                            Create Account
                          </button>
                        </div>
                      </div>
                    </form>
                  </ValidationObserver>
                </div>
                <div class="card-footer text-center py-3">
                  <div class="small">
                    <router-link to="/login"
                      >Have an account? Go to login</router-link
                    >
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
              <a >Privacy Policy</a>
              &middot;
              <a >Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  methods: {
    registerUser() {
      this.$store.dispatch("registerUser", this.user);
    },
  },
};
</script>

<style>
</style>