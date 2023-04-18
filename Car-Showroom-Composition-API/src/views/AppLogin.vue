<template>
    <section class="form-container login-form">
        <form @submit.prevent="handelSubmit">
            <div class="form_title">
                <h2>Login</h2>
            </div>
            <div class="form_fields">
                <label for="email">Email: </label>
                <input id="email" v-model="Email" @change="store.isValidEmail" />
            </div>
            <div class="form_fields">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="Password" @change="store.isValidPassword" />
            </div>
            <p v-if="!store.isValid" class="vAlert" v-html="store.vAlert"></p>
            <div class="btn_container">
                <button class="btn" type="submit">Login</button>
            </div>
            <div class="btn_container">
                <p>Don't have an account? <router-link :to="{ name: 'registration' }">Register</router-link> here.</p>
            </div>
        </form>
    </section>
</template>
<script setup>
import { useUserStore } from '../stores/UserStore'
import { ref } from 'vue'

const store = useUserStore()
store.$reset()

// let user = reactive({})
let Email = ref('')
let Password = ref('')
function checkRequired() {
    if (!Email.value) {
        return store.displayAlert(email, " is required*");
    } else if (!Password.value) {
        return store.displayAlert(password, " is required*");
    } else {
        return true;
    }
}
function handelSubmit() {
    if (checkRequired() && store.isValid) {
        store.loginUser({email: Email.value ,password : Password.value})
    }
}
</script>
