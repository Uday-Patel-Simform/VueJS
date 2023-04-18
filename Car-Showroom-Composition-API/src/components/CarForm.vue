<template>
    <div class="popup" @click="store.togglePopup">
        <div class="car-form-popup" @click.stop>
            <div class="close_btn">
                <button class="close" @click="store.togglePopup">x</button>
            </div>
            <form @submit.prevent="handleSubmit">
                <div class="car_name form_fields">
                    <label class="ip_title" for="Name">Car Name: </label>
                    <input id="Name" v-model="carObj.name" @input="isString" />
                </div>
                <div class="car_description form_fields">
                    <label class="ip_title" for="Description">Short Description:</label>
                    <textarea id="Description" v-model="carObj.details" @input="checkDescLength"></textarea>
                </div>
                <div class="car_img form_fields">
                    <label class="ip_title" for="image">Image: </label>
                    <input id="image" v-model="carObj.image" @input="isImgUrl" />
                </div>
                <div class="car_price form_fields">
                    <label class="ip_title" for="Price">Price:</label>
                    <input id="Price" v-model="carObj.price" @input="isNumber" />
                </div>
                <p class="vAlert" v-if="isValid" v-html="validationAlert"></p>
                <div class="btn_container">
                    <button class="btn" type="submit">{{ store.formBtnTxt }}</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup>
import { useCarStore } from '../stores/CarStore'
import { reactive, ref} from 'vue'


const store = useCarStore()
let carObj = reactive({})
let isValid = ref(false)
let validationAlert = ref("")

if (store.formBtnTxt === "Save") {
    await store.getCarData()
    carObj = store.car
}

function displayAlert(el, msg) {
    isValid.value = true;
    el.style.border = "1px solid red"
    validationAlert.value = el.id + msg
    return false;
}
function removeAlert(el) {
    el.style.border = "1px solid #c5c5c5"
    isValid.value = false
}
function isString(e) {
    if (typeof e.target.value !== "string") {
        displayAlert(e.target, " must be string*")
    } else {
        removeAlert(e.target)
    }
}
function checkDescLength(e) {
    if (e.target.value.length < 30) {
        displayAlert(
            e.target,
            " must be at lest 30 characters you are only using " +
            Description.value.length +
            " characters*"
        )
    } else if (e.target.value.length > 120) {
        displayAlert(
            e.target,
            " must not exceed 120 characters you are using " +
            Description.value.length +
            " characters*"
        )
    } else {
        removeAlert(e.target)
    }
}
function isImgUrl(e) {
    if (
        !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(
            e.target.value
        )
    ) {
        displayAlert(e.target, " must be an Image URl*")
    } else {
        removeAlert(e.target)
    }
}
function isNumber(e) {
    if (e.target.value === "") {
        isValid.value = false;
    } else if (!/^[0-9]+$/.test(e.target.value)) {
        displayAlert(e.target, " must be an integer*")
    } else {
        removeAlert(e.target);
    }
}
function validateForm() {
    if (!Name.value) {
        return displayAlert(Name, " is required*")
    } else if (!Description.value) {
        return displayAlert(Description, " is required*")
    } else if (!image.value) {
        return displayAlert(image, " is required*")
    } else {
        return true
    }
}
function handleSubmit(e) {
    e.preventDefault();
    if (!isValid.value && validateForm()) {
        if (store.formBtnTxt == "ADD") {
            if (confirm("Add this car entry??")) {
                store.addCar(carObj)
            }
        } else if (confirm("Edit this car?")) {
            store.editCar(carObj)
        }
    }
}

</script>