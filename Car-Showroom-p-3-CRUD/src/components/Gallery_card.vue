<template>
    <div class="gallery_card">
        <div class="car-image-container">
            <img :src="car.image" :alt="car.name" class="car-image" />
        </div>
        <div class="car-name-container">
            <h2 class="car-name">{{ car.name }}</h2>
        </div>
        <div class="car-desc-container">
            <p class="car-desc">{{ car.desc }}</p>
        </div>
        <div class="car-card-btn-container">
            <button type="button" @click="show_price(car.price, car.name)" :disabled="!car.price"
                :class="{ btn_disabled: !car.price }" class="car-price-btn">
                {{ check_price(car.price) }}
            </button>
            <div class="edit_delete_btn_container">
                <button type="button" class="car-edit-btn" id="edit" @click="set_btn_txt(car.id,$event)">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                            d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                    </svg>Edit</button>
                <button type="button" class="car-delete-btn" @click="delete_alert(car)">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                            d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                    </svg>Delete</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["car"],
    emits: ["show_price","set_btn_txt","delete_alert"],
    methods: {
        show_price(price, name) {
            this.$emit("show_price", price, name);
        },
        set_btn_txt(id,e){
            this.$emit("set_btn_txt",id,e);
        },
        check_price(price) {
            if (!price) {
                return "Available Soon!";
            } else {
                return "INFO";
            }
        },
        delete_alert(car){
            this.$emit('delete_alert', car)
        }
    },
};
</script>
<style scoped>
.gallery_card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    margin: 10px;
    box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.1);
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #ececec;
}

.car-image {
    max-width: 100%;
    height: 210px;
    object-fit: contain;
    border-bottom: 1px solid #bbbbbb;
}

.car-name {
    margin: 10px 0px;
    font-size: 30px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

p {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 90%;
    height: 100px;
    margin: 0 auto;
    font-size: 13px;
    margin-bottom: 15px;
    font-family: "M PLUS 1p", sans-serif;
}

.car-card-btn-container {
    width: 80%;
}

.edit_delete_btn_container {
    display: flex;
    justify-content: space-between;
}

.car-price-btn,
.car-delete-btn,
.car-edit-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 25px;
    border: 1px solid #00a2ff;
    border-radius: 2px;
    background-color: #00a2ff;
    color: #ffff;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-out;
}

.car-delete-btn,
.car-edit-btn {
    margin-top: 5px;
    width: 49%;
}

.car-edit-btn svg ,
.car-delete-btn svg{
    margin-right: 5px;
    height: 15px;
    fill: #ffffff;
}
.car-edit-btn:hover,
.car-delete-btn:hover{
    border: 1px solid #000000;
    color: #000;
}
.car-edit-btn:hover svg,
.car-delete-btn:hover svg {
    transition: all 0.5s ease-out;
    fill: #000000;
}

.car-delete-btn {
    background-color: #ff3d3d;
    border: 1px solid #ff3d3d;
}

.car-price-btn:hover {
    background-color: #44baff;
    border: 1px solid #000000;
}

.btn_disabled {
    color: #000000;
    background-color: transparent;
    border: 2px solid #000000;
    cursor: not-allowed;
}

.btn_disabled:hover {
    background-color: transparent;
    border: 2px solid #000000;
}

@media (max-width: 400px) {
    .gallery_card {
        width: 90%;
        margin: 10px 0;
    }

    .car-image {
        height: 150px;
    }

    .car-name {
        font-size: 20px;
    }

    .car-desc {
        width: 100%;
        font-size: 10px;
    }

    .car-price-btn {
        height: 20px;
        font-size: 12px;
        font-weight: 600;
    }
}</style>
