import { http } from '@/services/http_services';
import router from '@/routers/router';
import { vm } from '@/main';
export const load_user = ({ commit }) => {
    http().get('/auth/profile')
        .then(response => {
            commit('LOAD_USER', response.data);
        });
}

export const loginUser = ({ dispatch, state }, user) => {
    http()
        .post("/auth/login", user)
        .then((response) => {
            localStorage.setItem("token", JSON.stringify(response.data.access_token));
            dispatch("load_user");
            router.push("/home");
        })
        .catch((error) => {
            switch (error.response.status) {
                case 422:
                    if (error.response.data.errors.email) {
                        state.error.email = error.response.data.errors.email[0];
                    }
                    if (error.response.data.errors.password) {
                        state.error.password = error.response.data.errors.password[0];
                    }
                    break;
                case 401:
                    vm.flashMessage.error({
                        message: error.response.data.message,
                    });
                    break;
                default:
                    vm.flashMessage.error({
                        message: "Some error occur , please try again",
                    });
                    break;
            }
        });
}

export const registerUser = ({ state }, user) => {
    http()
        .post("/auth/register", user)
        .then((response) => {
            vm.flashMessage.success({
                message: "Register Success , Please Login",
            });
            vm.$router.push("/login");
        })
        .catch((error) => {
            console.log(error);
            switch (error.response.status) {
                case 422:
                    if (error.response.data.errors.name)
                        state.error.name = error.response.data.errors.name[0];
                    if (error.response.data.errors.email)
                        state.error.email = error.response.data.errors.email[0];
                    if (error.response.data.errors.password)
                        state.error.password = error.response.data.errors.password[0];
                    break;
                default:
                    vm.flashMessage.error({
                        message: "Some Error occur,Please try again",
                    });
                    break;
            }
        });
}
export const resetPassword = ({ state }, user) => {
    state.disableButton = true;
    http()
        .post("/auth/reset-password", user)
        .then((response) => {
            vm.flashMessage.success({
                message: "Password Reset Success",
            });
            router.push("/login");
            state.disableButton = false;
        })
        .catch((error) => {
            state.disableButton = false;
            if (error.response.status == 422) {
                if (error.response.data.errors.verification_code) {
                    state.errors.verification_code =
                        error.response.data.errors.verification_code[0];
                }
                if (error.response.data.errors.email) {
                    state.errors.email = error.response.data.errors.email[0];
                }
                if (error.response.data.errors.password) {
                    state.errors.password = error.response.data.errors.password[0];
                }
            }
        });
}

export const sendCode = ({ state }, email) => {
    state.disableButton = true;
    http()
        .post("/auth/reset-password-request", { email: email })
        .then((response) => {
            vm.flashMessage.success({
                message: "Verification code send to your email",
            });
            state.disableButton = false;
            router.push(`/reset-password/${email}`);
        })
        .catch((error) => {
            state.disableButton = false;
            if (error.response.status == 422) {
                vm.error = error.response.data.errors.email[0];
            } else {
                vm.flashMessage.error({
                    message: "Some Error occur please try again",
                });
            }
            console.log(error.response.data);
        });
}