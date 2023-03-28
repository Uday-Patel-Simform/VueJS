<template>
    <div class="popup" @click="toggle_popup">
        <div class="car-form-popup" @click.stop>
            <div class="close_btn">
                <button class="close" @click="toggle_popup">x</button>
            </div>
            <form @submit.prevent="handle_submit">
                <div class="car_name form_fields">
                    <label class="ip_title" for="car-name">Car Name: </label>
                    <input id="car-name" ref="car_name" v-model="car_obj.name" @input="is_string" />
                </div>
                <div class="car_description form_fields">
                    <label class="ip_title" for="car-description">Short Description:</label>
                    <!-- for custom json-server -->
                    <!-- <textarea id="car-description" ref="car_desc" v-model="car_obj.desc"
                      @input="check_desc_length"></textarea> -->
                    <textarea id="car-description" ref="car_desc" v-model="car_obj.details"
                        @input="check_desc_length"></textarea>
                </div>
                <div class="car_img form_fields">
                    <label class="ip_title" for="car-image">Image: </label>
                    <input id="car-image" ref="car_image" v-model="car_obj.image" @input="is_img_url" />
                </div>
                <div class="car_price form_fields">
                    <label class="ip_title" for="car-price">Price:</label>
                    <input id="car-price" ref="car_price" v-model="car_obj.price" @input="is_number" />
                </div>
                <p class="v_alert" v-if="is_valid" v-html="validation_alert"></p>
                <div class="btn_container">
                    <button class="btn" type="submit">{{ this.btn_txt }}</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    props: ["id", "btn_txt"],
    emits: ["add_car", "toggle_popup", "edit_car"],
    data() {
        return {
            car_obj: {},
            is_valid: false,
            validation_alert: "",
        };
    },
    methods: {
        getData(id) {
            this.axios.get("https://testapi.io/api/dartya/resource/cardata/" + id).then((res) => {
                this.car_obj = res.data;
            });
        },
        display_alert(el, msg) {
            this.is_valid = true;
            el.style.border = "1px solid red";
            this.validation_alert = el.id + msg;
            return false;
        },
        remove_alert(el) {
            el.style.border = "1px solid #c5c5c5";
            this.is_valid = false;
        },
        is_string(e) {
            if (typeof e.target.value !== "string") {
                this.display_alert(e.target, " must be string*");
            } else {
                this.remove_alert(e.target);
            }
        },
        check_desc_length(e) {
            if (e.target.value.length < 30) {
                this.display_alert(
                    e.target,
                    " must be at lest 30 characters you are only using " +
                    this.$refs.car_desc.value.length +
                    " characters*"
                );
            } else if (e.target.value.length > 120) {
                this.display_alert(
                    e.target,
                    " must not exceed 120 characters you are using " +
                    this.$refs.car_desc.value.length +
                    " characters*"
                );
            } else {
                this.remove_alert(e.target);
            }
        },
        is_img_url(e) {
            // return await fetch(url, { method: 'HEAD' }).then(res => {
            //   console.log(res.headers.get('Content-Type').startsWith('image'));
            //   return res.headers.get('Content-Type').startsWith('image')
            // })
            if (
                !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(
                    e.target.value
                )
            ) {
                this.display_alert(e.target, " must be an Image URl*");
            } else {
                this.remove_alert(e.target);
            }
        },
        is_number(e) {
            if (e.target.value === "") {
                this.is_valid = false;
            } else if (!/^[0-9]+$/.test(e.target.value)) {
                this.display_alert(e.target, " must be an integer*");
            } else {
                this.remove_alert(e.target);
            }
        },
        validate_form() {
            if (!this.$refs.car_name.value) {
                return this.display_alert(this.$refs.car_name, " is required*");
            } else if (!this.$refs.car_desc.value) {
                return this.display_alert(this.$refs.car_desc, " is required*");
            } else if (!this.$refs.car_image.value) {
                return this.display_alert(this.$refs.car_image, " is required*");
            } else {
                return true;
            }
        },
        add_car() {
            if (!this.is_valid && this.validate_form()) {
                if (confirm("Add this car entry??")) {
                    this.$emit("add_car", this.car_obj);
                }
            }
        },
        edit_car() {
            if (!this.is_valid && this.validate_form()) {
                if (confirm("Edit this car?")) {
                    this.$emit("edit_car", this.car_obj);
                }
            }
        },
        toggle_popup() {
            this.$emit("toggle_popup");
        },
        handle_submit(e) {
            e.preventDefault();
            if (this.btn_txt == "Add") {
                this.add_car();
            } else this.edit_car();
        },
    },
    created() {
        if (this.btn_txt === "Save") this.getData(this.id);
    },
};
</script>