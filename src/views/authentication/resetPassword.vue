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
                    Password Recovery
                  </h3>
                </div>
                <div class="card-body">
                  <ValidationObserver v-slot="{invalid}">
                  <form @submit.prevent="resetPassword">
                    <ValidationProvider v-slot="{errors}" rules="required|email">
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
                      <span v-if="errors.email" class="text-danger fs-6">{{
                        errors.email
                      }}</span>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider v-slot="{errors}" rules="required|min:6">
                    <div class="form-floating mb-3">
                      <input
                        class="form-control"
                        name="Verification Code"
                        v-model="user.verification_code"
                        autofocus="true"
                      />
                      <label for="inputEmail">Verification Code</label>
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                      <span
                        v-if="errors.verification_code"
                        class="text-danger fs-6"
                        >{{ errors.verification_code }}</span
                      >
                    </div>
                  </ValidationProvider>
                  <ValidationProvider v-slot="{errors}" rules="required|min:8" vid="confirmed">
                    <div class="form-floating mb-3">
                      <input
                        class="form-control"
                        type="password"
                        name="password"
                        v-model="user.password"
                      />
                      <label for="inputEmail">New Password</label>
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                      <span v-if="errors.password" class="text-danger fs-6">{{
                        errors.password
                      }}</span>
                    </div>
                  </ValidationProvider>
                  <ValidationProvider v-slot="{errors}" rules="required|min:8|confirm:confirmed">
                    <div class="form-floating mb-3">
                      <input
                        class="form-control"
                        type="password"
                        name="password"
                        v-model="user.password_confirmation"
                      />
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                      <label for="inputEmail">Confirm Password</label>
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
                        type="submit"
                        class="btn btn-primary"
                        :disabled="isSetting || invalid"
                        ref="setButton"
                        
                      >
                        Reset Password
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
import { http } from "@/services/http_services";
export default {
  data() {
    return {
      isSetting: false,
      user: {
        email: "",
        password: "",
        password_confirmation: "",
        verification_code: "",
      },
      errors: {
        email: null,
        password: null,
        verification_code: null,
      },
    };
  },
  mounted() {
    this.user.email = this.$route.params.email;
  },
  methods: {
    resetPassword() {
      this.disableButton();
      http()
        .post("/auth/reset-password", this.user)
        .then((response) => {
          this.flashMessage.success({
            message: "Password Reset Success",
          });
          this.enableButton();
          console.log(response);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.enableButton();
          this.$refs.setButton.innerHTML = "Try Again";
          if (error.response.status == 422) {
            if (error.response.data.errors.verification_code) {
              this.errors.verification_code =
                error.response.data.errors.verification_code[0];
            }
            if (error.response.data.errors.email) {
              this.errors.email = error.response.data.errors.email[0];
            }
            if (error.response.data.errors.password) {
              this.errors.password = error.response.data.errors.password[0];
            }
          }
          console.log(error);
        });
    },
    disableButton() {
      this.isSetting = true;
      this.$refs.setButton.innerHTML = "Setting...";
    },
    enableButton() {
      this.isSetting = false;
      this.$refs.setButton.innerHTML = "Set";
    },
  },
};
</script>

<style>
</style>