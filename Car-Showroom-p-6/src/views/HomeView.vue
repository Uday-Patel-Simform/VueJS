<template>
  <section class="gallery_display">
    <div class="add_btn_container">
      <button class="add_btn" id="add" @click="set_btn_txt('', $event)">
        Add Car
      </button>
    </div>
    <transition name="popup">
      <car_form v-if="car_popup_toggle" :btn_txt="form_btn_txt" :id="edit_car_id" @add_car="add_car" @edit_car="edit_car"
        @toggle_popup="toggle_popup" />
    </transition>
    <div class="content_container">
      <transition-group name="cards" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div class="car-card" v-for="(car,index) in cars" :key="car.id" :data-index = "index">
          <card :car="car" @show_price="dis_price" @set_btn_txt="set_btn_txt" @delete_alert="delete_alert" />
        </div>
      </transition-group>

    </div>
  </section>
</template>
<script>
import card from "../components/GalleryCard.vue";
import car_form from "../components/CarForm.vue";
import gsap from 'gsap'

export default {
  components: { card, car_form },
  data() {
    return {
      car_popup_toggle: false,
      form_btn_txt: "",
      edit_car_id: "",
      cars: [],
    };
  },
  methods: {
    getData() {
      // for custom json-server
      // this.axios.get("http://localhost:3000/cars/").then((res) => {
      //   this.cars = res.data;
      this.axios.get("https://testapi.io/api/dartya/resource/cardata/").then((res) => {
        this.cars = res.data.data;
      });
    },
    dis_price(price, name) {
      alert(name + ": " + price + "₹");
    },
    set_btn_txt(id, e) {
      if (e.target.id === "add") {
        this.form_btn_txt = "Add";
        this.toggle_popup();
      } else {
        this.edit_car_id = id;
        this.form_btn_txt = "Save";
        this.toggle_popup();
      }
    },
    toggle_popup() {
      this.car_popup_toggle = !this.car_popup_toggle;
    },
    add_car(car) {
      this.axios
        .post("https://testapi.io/api/dartya/resource/cardata/", car)
        .then((response) => {
          console.log(response.status);
          if (response.status === 201) {
            this.getData();
          }
        })
        .catch((error) => {
          alert(error);
        });
      this.toggle_popup();
    },
    edit_car(car) {
      this.axios
        .put("https://testapi.io/api/dartya/resource/cardata/" + car.id, car)
        .then((response) => {
          if (response.status === 200) {
            this.getData();
          }
        })
        .catch((error) => {
          alert(error);
        });
      this.toggle_popup();
    },
    delete_alert(id) {
      if (confirm("Delete this car??")) {
        this.axios
          .delete("https://testapi.io/api/dartya/resource/cardata/" + id)
          .then((response) => {
            // for custom json-server
            // if (response.status === 200) {
            //   this.getData();
            // }
            if (response.status === 204) {
              this.getData();
            }
          })
          .catch((error) => {
            alert(error);
          });
      }
    },
    beforeEnter(e){
      e.style.opacity = 0
      e.style.transform = 'translateY(100px)'
    },
    enter(e,done){
      gsap.to(e,{
        opacity:1,
        y: 0,
        duration: 0.2,
        onComplete: done,
        delay: e.dataset.index * 0.1
      })
    },
    leave(e,done){
      gsap.to(e,{
        opacity:0,
        y: -300,
        scale: 0,
        duration: 0.5,
        onComplete: done,
      })
    }
  },
  created() {
    this.getData();
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

.popup-enter-from {
  opacity: 0;
  transform: scale(0);
}

.popup-enter-active,
.popup-leave-active {
  transition: all 0.5s ease;
}

.popup-leave-to {
  opacity: 0;
  transform: scale(0);
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

@media (max-width:800px) {
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
