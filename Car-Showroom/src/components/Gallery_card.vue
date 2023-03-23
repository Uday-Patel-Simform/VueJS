<template>
    <div class="gallery_card">
        <div class="car-image-container">
            <img :src="car.image" :alt="car.name" class="car-image">
        </div>
        <div class="car-name-container">
            <h2 class="car-name">{{ car.name }}</h2>
        </div>
        <div class="car-desc-container">
            <p class="car-desc">{{ car.desc }}</p>
        </div>
        <div class="car-price-btn-container">
            <button type="button" @click="show_price(car.price, car.name)" class="car-price-btn">INFO</button>
        </div>
    </div>
</template>
<script>
export default {
    props: ['car'],
    data() {
        return {
            img: '../assets/images/bolero.png'
        }
    },
    methods: {
        // cnvt_src(src){
        //     return {src:'.'+src}
        // }
        show_price(price, name) {
            alert(name + ": " + price + "/-")
        }
    }
}
</script>
<style>
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

.car-desc {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 90%;
    margin: 0 auto;
    font-size: 13px;
    margin-bottom: 15px;
    font-family: 'M PLUS 1p', sans-serif;
}

.car-price-btn {
    width: 100px;
    height: 25px;
    border: none;
    border-radius: 2px;
    background-color: #00a2ff;
    color: #ffff;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-out;
}

.car-price-btn:hover {
    background-color: #44baff;
    border: 1px solid #000000;
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