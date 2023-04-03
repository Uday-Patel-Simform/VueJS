import axios from 'axios'
import { defineStore } from 'pinia'

export const useCarStore = defineStore('CarStore', {
    state: () => ({
        cars: [],
        isVisiblePopup: false,
        formBtnTxt: null,
        carID: '',
        car: {},
        url: "https://testapi.io/api/dartya/resource/cardata/",
    }),
    getters: {
        getCarByID: async(state) => {
            state.car = {}
            try {
                const res = await axios.get(state.url + state.carID)
                state.car = res.data
                return
            } catch (e) {
                alert(e.message)
            }
        }
    },
    actions: {
        async getData() {
            try {
                const res = await axios.get(this.url)
                this.cars = await res.data.data
                return
            } catch (e) {
                alert(e.message)
            }
        },
        togglePopup() {
            this.isVisiblePopup = !this.isVisiblePopup;
            this.car = {}
            this.carID = ''
        },
        setBtnTxt(e, id = null) {
            if (e.target.id === "add") {
                this.togglePopup()
                this.formBtnTxt = 'ADD'
            } else {
                this.togglePopup()
                this.carID = id
                this.formBtnTxt = 'Save'
            }
        },
        addCar(car) {
            axios.post(this.url, car)
                .then((res) => {
                    if (res.status === 201) {
                        this.getData();
                    }
                })
                .catch((e) => {
                    alert(e.message);
                });
            this.togglePopup();
        },
        editCar(car) {
            axios.put(this.url + this.car.id, car)
                .then((res) => {
                    if (res.status === 200) {
                        this.getData();
                    }
                })
                .catch((error) => {
                    alert(error);
                });
            this.togglePopup();
        },
        deleteCar(id) {
            if (confirm("Delete this car??")) {
                axios.delete(this.url + id)
                    .then((response) => {
                        if (response.status === 204) {
                            this.getData()
                        }
                    })
                    .catch((e) => {
                        alert(e)
                    });
            }
        },
    }
})