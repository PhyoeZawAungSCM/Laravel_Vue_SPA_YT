<template>
  <div id="layoutAuthentication">
    <div id="layoutAuthentication_content">
      <main>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-5">
              <div class="card shadow-lg border-0 rounded-lg mt-5">
                <div class="card-header">
                  <h3 class="text-center font-weight-light my-4">
                    Password Recovery Request
                  </h3>
                </div>
                <div class="card-body">
                  <div class="small mb-3 text-muted">
                    Enter your email address and we will send you a verification
                    code.
                  </div>
                  <ValidationObserver v-slot="{ invalid }">
                    <form @submit.prevent="sendCode">
                      <ValidationProvider
                        rules="required|email"
                        v-slot="{ errors }"
                      >
                        <div class="form-floating mb-3">
                          <input
                            class="form-control"
                            id="inputEmail"
                            type="email"
                            v-model="email"
                          />
                          <label for="inputEmail">Email address</label>
                          <span v-if="error" class="text-danger fs-6">{{
                            error
                          }}</span>
                          <span class="invalid-feedback">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                      <div
                        class="
                          d-flex
                          align-items-center
                          justify-content-between
                          mt-4
                          mb-0
                        "
                      >
                        <router-link class="small" to="/login"
                          >Return to login</router-link
                        >
                        <button
                          class="btn btn-primary"
                          type="submit"
                          ref="sendButton"
                          :disabled="$store.state.Auth.disableButton || invalid"
                        >
                          Send Code
                        </button>
                      </div>
                    </form>
                  </ValidationObserver>
                </div>
                <div class="card-footer text-center py-3">
                  <div class="small">
                    <router-link to="/register"
                      >Need an account? Sign up!</router-link
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
import { ValidationObserver } from "vee-validate";
export default {
  data() {
    return {
      email: "",
      error: null,
    };
  },
  methods: {
    sendCode() {
      this.$store.dispatch("sendCode", this.email);
    },
  },
  components: { ValidationObserver },
};
</script>

<style>
</style>