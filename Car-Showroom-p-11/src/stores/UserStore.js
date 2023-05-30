import { defineStore } from "pinia";
import router from "../router";
import { useServer } from '../composables/server'

const {fetchAllData} = useServer()
export const useUserStore = defineStore("UserStore", {
  state: () => ({
    isLoggedIn: window.localStorage.getItem("isLoggedIN"),
    role: window.localStorage.getItem("role"),
    users: [],
    url: import.meta.env.VITE_USER_API_URL,
  }),
  actions: {
    async loginUser(user) {
      const { addData } = useServer()
      const res = await addData("http://localhost:3006/login", user)
      if (res) {
        router.push({ name: "home" });
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("isLoggedIN", true);
        this.isLoggedIn = window.localStorage.getItem("isLoggedIN");
        if (res.data.role) {
          this.role = res.data.role
          window.localStorage.setItem("role", this.role);
        }
      }
    },
    logOut() {
      this.isLoggedIn = false;
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("isLoggedIN");
      window.localStorage.removeItem("role");
      router.push({ name: "login" });
    },
  },
});
