<template>
    <section class="form-container">
        <form @submit.prevent="handelSubmit">
            <div class="form_title">
                <h2>Registration</h2>
            </div>
            <div class="form_fields">
                <label for="name">Name: </label>
                <input id="name" ref="name" v-model="user.name" @change="is_string" />
            </div>
            <div class="form_fields">
                <label for="email">Email: </label>
                <input id="email" ref="email" v-model="user.email" @change="store.isValidEmail" />
            </div>
            <div class="form_fields">
                <label for="password">Password:</label>
                <input type="password" id="password" ref="password" v-model="user.password" @change="store.isValidPassword" />
            </div>
            <div class="form_fields">
                <label for="confirm-password">Confirm Password:</label>
                <input type="password" id="confirm-password" ref="confirm_password" @change="check_cnf_password" />
            </div>
            <div class="form_fields">
                <label for="role">Role:</label>
                <select id="role" ref="role" v-model="user.role" @change="check_role">
                    <option disabled value="">Please select a role</option>
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                    <option value="customer">Customer</option>
                </select>
            </div>
            <div class="form_fields">
                <label for="gender">Gender:</label>
                <div class="radio" ref="gender" id="gender">
                    <div class="radio_ip">
                        <input type="radio" id="male" value="male" v-model="user.gender" />
                        <label for="male" class="radio_label">Male</label>
                    </div>
                    <div class="radio_ip">
                        <input type="radio" id="female" value="female" v-model="user.gender" />
                        <label for="two" class="radio_label">Female</label>
                    </div>
                </div>
            </div>
            <div class="form_fields">
                <label for="age">Age:</label>
                <input id="age" ref="age" v-model="user.age" @change="is_number" />
            </div>
            <div class="form_fields">
                <label for="dob">Date Of Birth:</label>
                <input type="date" id="dob" ref="dob" v-model="user.dob" @change="is_date" />
            </div>
            <p v-if="store.isValid" class="vAlert" v-html="store.vAlert"></p>
            <div class="btn_container">
                <button class="btn" type="submit">Register</button>
            </div>
            <div class="btn_container">
                <p>Already have an account? <router-link :to="{name : 'login'}">Login</router-link> here.</p>
            </div>
        </form>
    </section>
</template>
<script>
import { useUserStore } from '../stores/UserStore'

export default {
    data() {
        return {
            store:null,
            user: {},
        }
    },
    methods: {
        is_string(e) {
            if (!(/^[a-zA-Z]+$/).test(e.target.value)) {
                this.store.displayAlert(e.target, ' must only contain character input*')
            } else this.store.removeAlert(e.target)
        },
        check_cnf_password(e) {
            if (this.user.password !== e.target.value) {
                this.store.displayAlert(e.target, ' must be same as password*')
            } else this.store.removeAlert(e.target)
        },
        check_role(e) {
            if (e.target.value === '') {
                this.store.displayAlert(e.target, ' must be selected*')
            } else this.store.removeAlert(e.target)
        },
        is_number(e) {
            if (!/^[0-9]+$/.test(e.target.value)) {
                this.store.displayAlert(e.target, " must be a numeric value*");
            } else {
                this.store.removeAlert(e.target);
            }
        },
        is_date(e) {
            if (e.target.value === '') {
                this.store.displayAlert(e.target, ' must be selected*')
            } else this.store.removeAlert(e.target)
        },
        checkRequired() {
            if (!this.$refs.name.value) {
                return this.store.displayAlert(this.$refs.name, " is required*");
            } else if (!this.$refs.email.value) {
                return this.store.displayAlert(this.$refs.email, " is required*");
            } else if (!this.$refs.password.value) {
                return this.store.displayAlert(this.$refs.password, " is required*");
            } else if (!this.$refs.confirm_password.value) {
                return this.store.displayAlert(this.$refs.confirm_password, " is required*");
            } else if (!this.$refs.role.value) {
                return this.store.displayAlert(this.$refs.role, " is required*");
            } else if (!this.user.gender) {
                return this.store.displayAlert(this.$refs.gender, " is required*");
            } else if (!this.$refs.age.value) {
                return this.store.displayAlert(this.$refs.age, " is required*");
            } else if (!this.$refs.dob.value) {
                return this.store.displayAlert(this.$refs.dob, " is required*");
            } else {
                return true;
            }
        },
        handelSubmit() {
            if (this.checkRequired() && !this.store.isValid) {
                this.store.registerUser(this.user)
            }
        }
    },
    created(){
        this.store = useUserStore()
        this.store.$reset()
    }
}
</script>

