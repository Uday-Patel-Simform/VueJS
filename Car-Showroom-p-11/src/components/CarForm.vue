<template>
    <div class="popup" @click="togglePopup">
        <div class="car-form-popup" @click.stop>
            <div class="close_btn">
                <button class="close" @click="togglePopup">x</button>
            </div>
            <form @submit.prevent="handleSubmit">
                <div class="car_name form_fields">
                    <label class="ip_title" for="Name">Car Name: </label>
                    <input id="Name" v-model="carObj.name" @input="isString" />
                    <p class="vAlert NameErr" ref="NameErr"></p>
                </div>
                <div class="car_description form_fields">
                    <label class="ip_title" for="Description">Short Description:</label>
                    <textarea id="Description" v-model="carObj.details" @input="checkDescLength"></textarea>
                    <p class="vAlert DescriptionErr" ref="DescriptionErr"></p>
                </div>
                <div class="car_img form_fields">
                    <label class="ip_title" for="image">Image: </label>
                    <input id="image" v-model="carObj.image" @input="isImgUrl" />
                    <p class="vAlert imageErr" ref="imageErr"></p>
                </div>
                <div class="car_price form_fields">
                    <label class="ip_title" for="Price">Price:</label>
                    <input id="Price" v-model="carObj.price" @input="isNumber" />
                    <p class="vAlert PriceErr" ref="PriceErr"></p>
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
import { reactive, ref } from 'vue'
import { useTogglePopup } from '../composables/useTogglePopup'
import { useToggleFormAlert } from '../composables/useToggleFormAlert'
import { useValidateIP } from '../composables/useValidateIP'
import { useServer } from '../composables/server'

const store = useCarStore()
let carObj = reactive({})
let isValid = ref(false)
let validationAlert = ref("")
const { togglePopup } = useTogglePopup()
const { validateForm } = useValidateIP()
const { displayAlert, removeAlert } = useToggleFormAlert()
const { fetchDataById, addData, fetchAllData, editData } = useServer()

if (store.formBtnTxt === "Save") {
    store.car = await fetchDataById(store.url, store.carID)
    carObj = store.car
}
const isString = () => {
    const nameValue = Name.value;
    if (nameValue.trim() === '') {
        return displayAlert(Name, " can't only contain white spaces*");
    }
    if (typeof nameValue !== "string") {
        return displayAlert(Name, " must be string*");
    }
    return removeAlert(Name);
}
const checkDescLength = () => {
    const len = Description.value.length;
    let message = "";
    let isValid = true;
    if (Description.value.trim() === '') {
        message = " can't only contain white spaces*";
        isValid = false;
    } else if (len < 30) {
        message = ` must be at least 30 characters, you are only using ${len} characters*`;
        isValid = false;
    } else if (len > 120) {
        message = ` must not exceed 120 characters, you are using ${len} characters*`;
        isValid = false;
    }
    return isValid ? removeAlert(Description) : displayAlert(Description, message);
}
const isImgUrl = () => {
    if (
        !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(
            image.value
        )
    ) {
        return displayAlert(image, " must be an Image URl*")
    } else {
        return removeAlert(image)
    }
}
const isNumber = () => {
    if (!/^[0-9]+$/.test(Price.value)) {
        return displayAlert(Price, " must be an integer*")
    } else {
        return removeAlert(Price);
    }
}
const handleSubmit = async (e) => {
    e.preventDefault();
    let formElements = document.forms[0].elements

    if (validateForm(formElements) && isString()
        && checkDescLength() && isImgUrl() && isNumber()) {
        if (store.formBtnTxt == "ADD" && confirm("Add this car entry??")) {
            const res = await addData(store.url, carObj)
            if (res) {
                store.cars = await fetchAllData(store.url)
            }
            togglePopup()
        } else if (confirm("Edit this car?")) {
            const res = await editData(store.url, store.carID, carObj)
            if (res) {
                store.cars = await fetchAllData(store.url)
            }
            togglePopup()
        }
    }
}

</script>