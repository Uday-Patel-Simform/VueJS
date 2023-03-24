<template>
    <section class="form-container">
        <form @submit.prevent="handel_submit">
            <div class="form_title">
                <h2>Login</h2>
            </div>
            <div class="form_fields">
                <label for="email">Email: </label>
                <input id="email" ref="email" v-model="user.email" @change="is_valid_email"/>
            </div>
            <div class="form_fields">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="user.password" ref="password" @change="is_valid_password"/>
            </div>
            <p v-if="is_valid" class="v_alert" v-html="v_alert"></p>
            <div class="btn_container">
                <button class="btn" type="submit">Login</button>
            </div>
        </form>
    </section>
</template>
<script>
export default {
    data() {
        return {
            is_valid:false,
            user:{}
        }
    },
    methods:{
        display_alert(el, msg) {
            this.is_valid = true;
            el.style.border = "1px solid red";
            this.v_alert = el.id + msg;
            return false;
        },
        remove_alert(el) {
            el.style.border = "1px solid #c5c5c5";
            this.is_valid = false;
            return
        },
        is_valid_email(e) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(e.target.value)) {
                this.display_alert(e.target, ' is not valid*')
            } else this.remove_alert(e.target)
        },
        is_valid_password(e) {
            const check_length = /.{8,12}/
            const check_upperCase = /(?=.*[A-Z])/
            const check_lowerCase = /(?=.*[a-z])/
            const check_special_char = /(?=.*[!@#$%^&*])/
            const check_numeric = /(?=.*\d)/
            const val = e.target.value

            if (!check_length.test(val)) {
                this.display_alert(e.target, ' must be 8-12 characters long*')
            } else if (!check_upperCase.test(val)) {
                this.display_alert(e.target, ' must contain at least one Uppercase letter*')
            } else if (!check_lowerCase.test(val)) {
                this.display_alert(e.target, ' must contain at least one Lowercase letter*')
            } else if (!check_upperCase.test(val)) {
                this.display_alert(e.target, ' must contain at least one Uppercase letter*')
            } else if (!check_special_char.test(val)) {
                this.display_alert(e.target, ' must contain at least one special character*')
            } else if (!check_numeric.test(val)) {
                this.display_alert(e.target, ' must contain at least one numeric digit*')
            } else this.remove_alert(e.target)
        },
        check_required() {
            if (!this.$refs.email.value) {
                return this.display_alert(this.$refs.email, " is required*");
            } else if (!this.$refs.password.value) {
                return this.display_alert(this.$refs.password, " is required*");
            } else {
                return true;
            }
        },
        login_user(){
            this.axios
                .post("http://localhost:3000/login",this.user)
                .then((response) => {
                    if(response.status == 200) {
                        this.$router.push({name:'home'})
                    }
                }).catch((e)=>{
                    alert(e)
                })
        },
        handel_submit() {
            if (!this.is_valid && this.check_required()) {
                this.login_user()
            }else console.log('error!!');
        }
    }
}
</script>
