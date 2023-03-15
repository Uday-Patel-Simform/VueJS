<template>
  <Nav></Nav>
  <section class="gallery_display">
    <div class="add_btn_container">
      <button class="add_btn" id="add" @click="set_btn_txt('', $event)">
        Add Car
      </button>
    </div>
    <car_form
      v-if="car_popup_toggle"
      :btn_txt="form_btn_txt"
      :length="cars.length"
      :id="edit_car_id"
      @add_car="add_car"
      @edit_car="edit_car"
      @toggle_popup="toggle_popup"
    ></car_form>
    <div class="content_container">
      <div v-for="car in cars" :key="car.id">
        <card
          :car="car"
          @show_price="dis_price"
          @set_btn_txt="set_btn_txt"
          @delete_alert="delete_alert"
        />
      </div>
    </div>
  </section>
</template>
<script>
import card from "./components/Gallery_card.vue";
import car_form from "./components/Car_form.vue";

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
        .put("https://testapi.io/api/dartya/resource/cardata/" + car.id, {
          name: car.name,
          image: car.image,
          // for custom json-server
          // desc: car.desc,
          details: car.details,
          price: car.price,
        })
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
            console.log(response);
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
  border: 1px solid #00a2ff;
  background-color: #00a2ff;
  color: #ffff;
  padding: 5px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 0.2rem;
  cursor: pointer;
}

.add_btn:hover {
  transition: all 0.2s ease-out;
  border: 1px solid #000000;
}

.gallery_display {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content_container {
  width: 95%;
  margin: 50px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
