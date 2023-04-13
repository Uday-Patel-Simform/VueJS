<template>
    <div class="popup" @click="togglePopup">
        <div class="car-form-popup" @click.stop>
            <div class="close_btn">
                <button class="close" @click="togglePopup">x</button>
            </div>
            <form @submit.prevent="handleSubmit">
                <div class="car_name form_fields">
                    <label class="ip_title" for="car-name">Car Name: </label>
                    <input id="car-name" ref="car_name" v-model="this.carObj.name" @input="is_string" />
                </div>
                <div class="car_description form_fields">
                    <label class="ip_title" for="car-description">Short Description:</label>
                    <textarea id="car-description" ref="car_desc" v-model="this.carObj.details"
                        @input="check_desc_length"></textarea>
                </div>
                <div class="car_img form_fields">
                    <label class="ip_title" for="car-image">Image: </label>
                    <input id="car-image" ref="car_image" v-model="this.carObj.image" @input="is_img_url" />
                </div>
                <div class="car_price form_fields">
                    <label class="ip_title" for="car-price">Price:</label>
                    <input id="car-price" ref="car_price" v-model="this.carObj.price" @input="is_number" />
                </div>
                <p class="vAlert" v-if="isValid" v-html="validationAlert"></p>
                <div class="btn_container">
                    <button class="btn" type="submit">{{ formBtnTxt }}</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapWritableState } from 'pinia'
import { useCarStore } from '../stores/CarStore'

export default {
    data() {
        return {
            carObj: {},
            isValid: false,
            validationAlert: "",
        };
    },
    computed: {
        ...mapState(useCarStore, ['formBtnTxt']),
        ...mapWritableState(useCarStore, ['car'])
    },
    methods: {
        ...mapActions(useCarStore, ['getCarData', 'togglePopup', 'addCar', 'editCar']),
        display_alert(el, msg) {
            this.isValid = true;
            el.style.border = "1px solid red"
            this.validationAlert = el.id + msg
            return false;
        },
        remove_alert(el) {
            el.style.border = "1px solid #c5c5c5";
            this.isValid = false
        },
        is_string(e) {
            if (typeof e.target.value !== "string") {
                this.display_alert(e.target, " must be string*")
            } else {
                this.remove_alert(e.target)
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
                this.remove_alert(e.target)
            }
        },
        is_img_url(e) {
            if (
                !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(
                    e.target.value
                )
            ) {
                this.display_alert(e.target, " must be an Image URl*")
            } else {
                this.remove_alert(e.target)
            }
        },
        is_number(e) {
            if (e.target.value === "") {
                this.isValid = false;
            } else if (!/^[0-9]+$/.test(e.target.value)) {
                this.display_alert(e.target, " must be an integer*")
            } else {
                this.remove_alert(e.target);
            }
        },
        validate_form() {
            if (!this.$refs.car_name.value) {
                return this.display_alert(this.$refs.car_name, " is required*")
            } else if (!this.$refs.car_desc.value) {
                return this.display_alert(this.$refs.car_desc, " is required*")
            } else if (!this.$refs.car_image.value) {
                return this.display_alert(this.$refs.car_image, " is required*")
            } else {
                return true
            }
        },
        handleSubmit(e) {
            e.preventDefault();
            if (!this.isValid && this.validate_form() ) {
                if (this.formBtnTxt == "ADD") {
                    if (confirm("Add this car entry??")) {
                        this.addCar(this.carObj)
                    }
                }else if (confirm("Edit this car?")) {
                    this.editCar(this.carObj)
                }
            }
        },
    },
    async created() {
        if (this.formBtnTxt === "Save") {
            await this.getCarData()
            this.carObj = this.car
        }
    },
}
</script>