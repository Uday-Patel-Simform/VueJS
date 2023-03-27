<template>
    <section class="form-container">
        <form @submit.prevent="handel_submit">
            <div class="form_title">
                <h2>Registration</h2>
            </div>
            <div class="form_fields">
                <label for="name">Name: </label>
                <input id="name" ref="name" v-model="user.name" @change="is_string" />
            </div>
            <div class="form_fields">
                <label for="email">Email: </label>
                <input id="email" ref="email" v-model="user.email" @change="is_valid_email" />
            </div>
            <div class="form_fields">
                <label for="password">Password:</label>
                <input type="password" id="password" ref="password" v-model="user.password" @change="is_valid_password" />
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
            <p v-if="is_valid" class="v_alert" v-html="v_alert"></p>
            <div class="btn_container">
                <button class="btn" type="submit">Register</button>
            </div>
        </form>
    </section>
</template>
<script>
export default {
    data() {
        return {
            is_valid: false,
            user: {},
            v_alert: ''
        }
    },
    methods: {
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
        is_string(e) {
            if (!(/^[a-zA-Z]+$/).test(e.target.value)) {
                this.display_alert(e.target, ' must only contain character input*')
            } else this.remove_alert(e.target)
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

            if (!check_length.test(this.user.password)) {
                this.display_alert(e.target, ' must be 8-12 characters long*')
            } else if (!check_upperCase.test(this.user.password)) {
                this.display_alert(e.target, ' must contain at least one Uppercase letter*')
            } else if (!check_lowerCase.test(this.user.password)) {
                this.display_alert(e.target, ' must contain at least one Lowercase letter*')
            } else if (!check_upperCase.test(this.user.password)) {
                this.display_alert(e.target, ' must contain at least one Uppercase letter*')
            } else if (!check_special_char.test(this.user.password)) {
                this.display_alert(e.target, ' must contain at least one special character*')
            } else if (!check_numeric.test(this.user.password)) {
                this.display_alert(e.target, ' must contain at least one numeric digit*')
            } else this.remove_alert(e.target)
        },
        check_cnf_password(e) {
            console.log(this.user.password);
            if (this.user.password !== e.target.value) {
                this.display_alert(e.target, ' must be same as password*')
            } else this.remove_alert(e.target)
        },
        check_role(e) {
            if (e.target.value === '') {
                this.display_alert(e.target, ' must be selected*')
            } else this.remove_alert(e.target)
        },
        is_number(e) {
            if (!/^[0-9]+$/.test(e.target.value)) {
                this.display_alert(e.target, " must be a numeric value*");
            } else {
                this.remove_alert(e.target);
            }
        },
        is_date(e) {
            if (e.target.value === '') {
                this.display_alert(e.target, ' must be selected*')
            } else this.remove_alert(e.target)
        },
        check_required() {
            if (!this.$refs.email.value) {
                return this.display_alert(this.$refs.email, " is required*");
            } else if (!this.$refs.password.value) {
                return this.display_alert(this.$refs.password, " is required*");
            } else if (!this.$refs.confirm_password.value) {
                return this.display_alert(this.$refs.confirm_password, " is required*");
            } else if (!this.$refs.role.value) {
                return this.display_alert(this.$refs.role, " is required*");
            } else if (!this.user.gender) {
                return this.display_alert(this.$refs.gender, " is required*");
            } else if (!this.$refs.age.value) {
                return this.display_alert(this.$refs.age, " is required*");
            } else if (!this.$refs.dob.value) {
                return this.display_alert(this.$refs.dob, " is required*");
            } else {
                return true;
            }
        },
        register_user() {
            this.axios
                .post("https://testapi.io/api/dartya/resource/users", this.user)
                .then((response) => {
                    console.log(response.status);
                    if (response.status === 201) {
                        this.$router.push({name:'login'})
                    }
                })
                .catch((error) => {
                    alert(error);
                });
        },
        handel_submit() {
            if (this.check_required() && !this.is_valid) {
                this.register_user()
                console.log('success');
            } else console.log('error!!');
        }
    }
}
</script>

