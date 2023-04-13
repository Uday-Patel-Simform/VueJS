import axios from "axios";
import { defineStore } from "pinia";
import router from "../router";

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    isLoggedIn: window.localStorage.getItem("isLoggedIN"),
    isValid: false,
    vAlert: null,
  }),
  actions: {
    displayAlert(el, msg) {
      this.isValid = true;
      el.style.border = "1px solid red";
      this.vAlert = el.id + msg;
      return false;
    },
    removeAlert(el) {
      el.style.border = "1px solid #c5c5c5";
      this.isValid = false;
      this.vAlert = null;
      return;
    },
    isValidEmail(e) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(e.target.value)) {
        this.displayAlert(e.target, " is not valid*");
      } else this.removeAlert(e.target);
    },
    isValidPassword(e) {
      const check_length = /.{8,12}/;
      const check_upperCase = /(?=.*[A-Z])/;
      const check_lowerCase = /(?=.*[a-z])/;
      const check_special_char = /(?=.*[!@#$%^&*])/;
      const check_numeric = /(?=.*\d)/;

      if (!check_length.test(e.target.value)) {
        this.displayAlert(e.target, " must be 8-12 characters long*");
      } else if (!check_upperCase.test(e.target.value)) {
        this.displayAlert(
          e.target,
          " must contain at least one Uppercase letter*"
        );
      } else if (!check_lowerCase.test(e.target.value)) {
        this.displayAlert(
          e.target,
          " must contain at least one Lowercase letter*"
        );
      } else if (!check_upperCase.test(e.target.value)) {
        this.displayAlert(
          e.target,
          " must contain at least one Uppercase letter*"
        );
      } else if (!check_special_char.test(e.target.value)) {
        this.displayAlert(
          e.target,
          " must contain at least one special character*"
        );
      } else if (!check_numeric.test(e.target.value)) {
        this.displayAlert(
          e.target,
          " must contain at least one numeric digit*"
        );
      } else this.removeAlert(e.target);
    },
    registerUser(user) {
      axios
        .post(import.meta.env.VITE_USER_API_URL, user)
        .then((res) => {
          if (res.status === 201) {
            router.push({ name: "login" });
          }
        })
        .catch((e) => alert(e.message));
    },
    loginUser(user) {
      axios
        .post("http://localhost:3000/login", user)
        .then((res) => {
          if (res.status == 200) {
            router.push({ name: "home" });
            window.localStorage.setItem("token", res.data.token);
            window.localStorage.setItem("isLoggedIN", true);
            this.isLoggedIn = window.localStorage.getItem("isLoggedIN");
          }
        })
        .catch((e) => {
          alert(e.message);
        });
    },
    logOut() {
      this.isLoggedIn = false;
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("isLoggedIN");
      router.push({ name: "login" });
    },
  },
});
