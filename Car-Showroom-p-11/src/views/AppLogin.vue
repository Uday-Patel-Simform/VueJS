<template>
    <section class="form-container login-form">
        <form @submit.prevent="handleSubmit">
            <div class="form_title">
                <h2>Login</h2>
            </div>
            <div class="form_fields">
                <label for="Email">Email: </label>
                <input id="Email" v-model="Email" @change="isValidEmail" />
                <p class="vAlert EmailErr" ref="EmailErr"></p>
            </div>
            <div class="form_fields">
                <label for="Password">Password:</label>
                <input type="password" id="Password" v-model="Password" @change="isValidPassword" />
                <p class="vAlert PasswordErr" ref="PasswordErr"></p>
            </div>
            <p class="vAlert"></p>
            <div class="btn_container">
                <button class="btn" type="submit">{{ $t('login') }}</button>
            </div>
            <div class="btn_container">
                <p>Don't have an account? <router-link :to="{ name: 'registration' }"> Register</router-link> here.</p>
            </div>
        </form>
    </section>
</template>
<script setup>
import { useUserStore } from '../stores/UserStore'
import { ref } from 'vue'
import {useValidateIP} from '../composables/useValidateIP'

const store = useUserStore()
store.$reset()

let Email = ref('')
let Password = ref('')
const { isValidEmail, isValidPassword, validateForm } = useValidateIP()

function handleSubmit() {
    const formElements = document.forms[0].elements
    if (validateForm(formElements) && isValidEmail() && isValidPassword()) {
        store.loginUser({ email: Email.value, password: Password.value })
    }
}
</script>
