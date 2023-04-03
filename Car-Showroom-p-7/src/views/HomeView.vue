<template>
  <section class="gallery_display">

    <div class="add_btn_container">
      <button class="add_btn" id="add" @click="setBtnTxt($event)">
        Add Car
      </button>
    </div>
    <transition name="popup">
      <car_form v-if="isVisiblePopup"/>
    </transition>
    <div class="content_container">
      <transition-group name="cards" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div class="car-card" v-for="(car, index) in cars" :key="car.id" :data-index="index">
          <card :car="car"/>
        </div>
      </transition-group>
    </div>
  </section>
</template>
<script>
import card from "../components/GalleryCard.vue";
import car_form from "../components/CarForm.vue";
import gsap from 'gsap'
import { mapState, mapActions, mapWritableState } from 'pinia'
import { useCarStore } from '../stores/CarStore'

export default {
  components: { card, car_form },
  computed:{
    ...mapState(useCarStore,['cars']),
    ...mapWritableState(useCarStore,['isVisiblePopup'])
  },
  methods: {
    ...mapActions(useCarStore,['getData','togglePopup','setBtnTxt']),
    beforeEnter(e) {
      e.style.opacity = 0
      e.style.transform = 'translateY(100px) scale(0)'
    },
    enter(e, done) {
      gsap.to(e, {
        opacity: 1,
        y: 0,
        scale:1,
        duration: 0.5,
        onComplete: done,
        delay: e.dataset.index * 0.1
      })
    },
    leave(e, done) {
      gsap.to(e, {
        y: -400,
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: "expo.out",
        onComplete: done,
      })
    }
  },
  created() {
    this.getData()
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=M+PLUS+1p&family=Saira&display=swap");

* {
  font-family: "Saira", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #34495E;
}

body {
  background-color: rgb(243, 244, 246);
}

.add_btn_container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
}

.add_btn {
  width: 100px;
  border: 1px solid #41B883;
  background-color: #41B883;
  color: #ffff;
  padding: 5px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 0.2rem;
  cursor: pointer;
}

.add_btn:hover {
  transition: all 0.2s ease-out;
  background-color: transparent;
  color: #41B883;
  border: 1px solid #41B883;
}

.gallery_display {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content_container {
  width: 80%;
  margin: 50px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.car-card {
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-enter-active,
.popup-leave-active {
  transition: all 0.5s ease;
}

.popup-leave-active {
  transition-delay: 0.5s;
  transition: all 0.5s ease;
}

.popup-enter-from,
.popup-leave-to {
  transform: translateY(-500px);
  opacity: 0;
}

.popup-enter-active .car-form-popup,
.popup-leave-active .car-form-popup {
  transition: all 0.3s ease-in-out;
}

.popup-enter-active .car-form-popup {
  transition-delay: 0.25s;
}

.popup-enter-from .car-form-popup,
.popup-leave-to .car-form-popup {
  transform: translateY(300px);
  opacity: 0;
}

.cards-leave-active {
  position: absolute;
}

.cards-move {
  transition: all 0.5s ease;
}

@media (max-width:1600px) {
  .content_container {
    width: 90%;
  }
}

@media (max-width:1420px) {
  .content_container {
    width: 80%;
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width:1200px) {
  .content_container {
    width: 90%;
  }
}

@media (max-width:1070px) {
  .content_container {
    width: 70%;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width:900px) {
  .content_container {
    width: 80%;
  }
}

@media (max-width:800px) {
  .content_container {
    width: 90%;
  }
}

@media (max-width:700px) {
  .content_container {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (max-width:673px) {
  .content_container {
    justify-content: center;
  }

  .car-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .add_btn_container {
    justify-content: center;
    padding: 0;
  }
}
</style>
