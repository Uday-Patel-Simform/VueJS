import { defineStore } from "pinia"

export const useCarStore = defineStore("CarStore", {
  state: () => ({
    cars: [],
    isVisiblePopup: false,
    formBtnTxt: null,
    carID: null,
    car: {},
    url: import.meta.env.VITE_CAR_API_URL,
  })
});
