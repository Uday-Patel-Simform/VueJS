<template>
    <section class="form-container">
        <form @submit.prevent="handelSubmit">
            <div class="form_title">
                <h2>Registration</h2>
            </div>
            <div class="form_fields">
                <label for="name">Name: </label>
                <input id="Name" v-model="user.name" @change="is_string" />
            </div>
            <div class="form_fields">
                <label for="email">Email: </label>
                <input id="email" v-model="user.email" @change="store.isValidEmail" />
            </div>
            <div class="form_fields">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="user.password"
                    @change="store.isValidPassword" />
            </div>
            <div class="form_fields">
                <label for="Confirm_Password">Confirm Password:</label>
                <input type="password" id="Confirm_Password" @change="check_cnf_password" />
            </div>
            <div class="form_fields">
                <label for="role">Role:</label>
                <select id="role" v-model="user.role" @change="check_role">
                    <option disabled value="">Please select a role</option>
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                    <option value="customer">Customer</option>
                </select>
            </div>
            <div class="form_fields">
                <label for="gender">Gender:</label>
                <div class="radio" id="gender">
                    <div class="radio_ip">
                        <input type="radio" id="male" value="male" v-model="user.gender" @change="isGender"/>
                        <label for="male" class="radio_label">Male</label>
                    </div>
                    <div class="radio_ip">
                        <input type="radio" id="female" value="female" v-model="user.gender" @change="isGender"/>
                        <label for="two" class="radio_label">Female</label>
                    </div>
                </div>
            </div>
            <div class="form_fields">
                <label for="age">Age:</label>
                <input id="age" v-model="user.age" @change="is_number" />
            </div>
            <div class="form_fields">
                <label for="dob">Date Of Birth:</label>
                <input type="date" id="dob" v-model="user.dob" @change="isDate"/>
            </div>
            <p v-if="!store.isValid" class="vAlert" v-html="store.vAlert"></p>
            <div class="btn_container">
                <button class="btn" type="submit">Register</button>
            </div>
            <div class="btn_container">
                <p>Already have an account? <router-link :to="{ name: 'login' }">Login</router-link> here.</p>
            </div>
        </form>
    </section>
</template>
<script setup>
import { useUserStore } from '../stores/UserStore'
import {reactive } from 'vue'

const store = useUserStore()
store.$reset()
let user = reactive({})

function is_string() {
    if (!(/^[a-zA-Z\s]+$/).test(Name.value)) {
        store.displayAlert(Name, ' must only contain character input*')
    } else store.removeAlert(Name)
}
function check_cnf_password() {
    if (user.password !== Confirm_Password.value) {
        store.displayAlert(Confirm_Password, ' must be same as password*')
    } else store.removeAlert(Confirm_Password)
}
function check_role() {
    if (role.value === '') {
        store.displayAlert(role, ' must be selected*')
    } else store.removeAlert(role)
}
function is_number(e) {
    if (!/^[0-9]+$/.test(age.value)) {
        store.displayAlert(age, " must be a numeric value*");
    } else {
        store.removeAlert(age);
    }
}
function isGender() {
    if (!user.gender) {
        store.displayAlert(gender, ' must be selected*')
    } else {
        store.removeAlert(gender);
        gender.style.border = 'none'
    }
}
function isDate() {
    if (!user.dob) {
        console.log(dob);
        store.displayAlert(dob, ' must be selected*')
    } else {
        store.removeAlert(dob)
    }
}
function checkRequired() {
    if (!Name.value) {
        return store.displayAlert(Name, " is required*");
    } else if (!email.value) {
        return store.displayAlert(email, " is required*");
    } else if (!password.value) {
        return store.displayAlert(password, " is required*");
    } else if (!Confirm_Password.value) {
        return store.displayAlert(Confirm_Password, " is required*");
    } else if (!role.value) {
        return store.displayAlert(role, " is required*");
    } else if (!user.gender) {
        isGender()
        return
    } else if (!age.value) {
        return store.displayAlert(age, " is required*");
    } else if (!dob.value) {
        return store.displayAlert(dob, " is required*");
    } else {
        return true;
    }
}
function handelSubmit() {
    if (checkRequired() && store.isValid) {
        store.registerUser(user)
    }
}

</script>

