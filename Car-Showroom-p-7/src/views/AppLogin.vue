<template>
    <section class="form-container login-form">
        <form @submit.prevent="handel_submit">
            <div class="form_title">
                <h2>Login</h2>
            </div>
            <div class="form_fields">
                <label for="email">Email: </label>
                <input id="email" ref="email" v-model="user.email" @change="store.isValidEmail"/>
            </div>
            <div class="form_fields">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="user.password" ref="password" @change="store.isValidPassword"/>
            </div>
            <p v-if="store.isValid" class="vAlert" v-html="store.vAlert"></p>
            <div class="btn_container">
                <button class="btn" type="submit">Login</button>
            </div>
        </form>
    </section>
</template>
<script>
import { useUserStore } from '../stores/UserStore'

export default {
    data() {
        return {
            store: null,
            user:{}
        }
    },
    methods:{
        check_required() {
            if (!this.$refs.email.value) {
                return this.store.displayAlert(this.$refs.email, " is required*");
            } else if (!this.$refs.password.value) {
                return this.store.displayAlert(this.$refs.password, " is required*");
            } else {
                return true;
            }
        },
        handel_submit() {
            if (!this.store.isValid && this.check_required()) {
                this.store.loginUser(this.user)
            }else console.log('error!!');
        }
    },
    created(){
        this.store=useUserStore()
        this.store.$reset()
    }
}
</script>
