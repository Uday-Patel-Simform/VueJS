<template>
  <nav class="gallery_navbar">
    <h1>Car Gallery</h1>
  </nav>
  <section class="gallery_display">
    <div class="content_container">
      <div class="car-card" v-for="car in cars" :key="car.id">
        <card :car="car" />
      </div>
    </div>
  </section>
</template>
<script>
import card from './components/Gallery_card.vue'

export default {
  name: 'App',
  components: { card },
  data() {
    return {
      cars: [
        {
          id: 1,
          name: "Tata HEXA",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSs3kncU7L0shsqDAsikuLQX2l-Jrv6a6PRw&usqp=CAU",
          desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio expedita veritatis nemo necessitatibus eius corporis dolor sapiente dolorum molestias nam?",
          price: "",
        },
        {
          id: 2,
          name: "Renault Duster",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRHiksU8OjoJikKMEfrzeXCHIBB-fhi7nHYg&usqp=CAU",
          desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio expedita veritatis nemo necessitatibus eius corporis dolor sapiente dolorum molestias nam?",
          price: "1425000",
        },
        {
          id: 3,
          name: "Honda City",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6mnVZg3uXhMWGmCuQrlnGWOFXfRhehNwQmw&usqp=CAU",
          desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio expedita veritatis nemo necessitatibus eius corporis dolor sapiente dolorum molestias nam?",
          price: "1765000",
        },
        {
          id: 4,
          name: "Ford Eco-Sports",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0fjIjGLm_DoWzJD7Y9QorKPh4-i0Udk2sDA&usqp=CAU",
          desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio expedita veritatis nemo necessitatibus eius corporis dolor sapiente dolorum molestias nam?",
          price: "",
        },
        {
          id: 5,
          name: "Mahindra Scorpio",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfRn86WrPBxTehabeLCqVyIoA2EVbmu8_tFQ&usqp=CAU",
          desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio expedita veritatis nemo necessitatibus eius corporis dolor sapiente dolorum molestias nam?",
          price: "1274000",
        },
        {
          id: 6,
          name: "Honda Civic",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEXCtrqypUL9Y8dtAavxY2qjWLXttLjiLxOA&usqp=CAU",
          desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio expedita veritatis nemo necessitatibus eius corporis dolor sapiente dolorum molestias nam?",
          price: "2236000",
        },
        {
          id: 7,
          name: "CRETA",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-gKzSuFcJCVuVQ833xrEkLFFVNkB41C9abQ&usqp=CAU",
          desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio expedita veritatis nemo necessitatibus eius corporis dolor sapiente dolorum molestias nam?",
          price: "",
        },
        {
          id: 8,
          name: "Ferrari F40",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJfT8xM1KShJUi7QMjfecR56ZiNy1MQr88GA&usqp=CAU",
          desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio expedita veritatis nemo necessitatibus eius corporis dolor sapiente dolorum molestias nam?",
          price: "75000000",
        },
        {
          id: 9,
          name: "Ford GT40",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvTRF1okQw_jXS2l9eu4ltPXdfq-fTXpLOog&usqp=CAU",
          desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio expedita veritatis nemo necessitatibus eius corporis dolor sapiente dolorum molestias nam?",
          price: "90000000",
        },
        {
          id: 10,
          name: "Cruse",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRukMq0uRtVnZ21cOuNyTlSnMZwKn4DYS_mHw&usqp=CAU",
          desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio expedita veritatis nemo necessitatibus eius corporis dolor sapiente dolorum molestias nam?",
          price: "3500000",
        },
        {
          id: 11,
          name: "Ford Mustang GT",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEBMZ2PB6SKvNhhBvaY_zplG6bmniLHImHtg&usqp=CAU",
          desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio expedita veritatis nemo necessitatibus eius corporis dolor sapiente dolorum molestias nam?",
          price: "7160000",
        },
        {
          id: 12,
          name: "Mustang GT-Shelby",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUXMFj4-Dsv5P5JuPtRQtosQt3LXWE2gPH8Q&usqp=CAU",
          desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio expedita veritatis nemo necessitatibus eius corporis dolor sapiente dolorum molestias nam?",
          price: "7460000",
        },
        {
          id: 13,
          name: "Nissan GTR",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjs9HATk5JDEFJ2B0i5Fhl-mxMC0SE5G4MxQ&usqp=CAU",
          desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio expedita veritatis nemo necessitatibus eius corporis dolor sapiente dolorum molestias nam?",
          price: "21200000",
        },
        {
          id: 14,
          name: "Mahindra Bolero",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUwCf8GIdyyqhp5oJ2GlyNG-wVGCAHu_E8rg&usqp=CAU",
          desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio expedita veritatis nemo necessitatibus eius corporis dolor sapiente dolorum molestias nam?",
          price: "",
        },
        {
          id: 15,
          name: "Toyota Supra MK4",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfaMvNxgy5-EE94UBDwRcLq47CC8pB2sGPLw&usqp=CAU",
          desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio expedita veritatis nemo necessitatibus eius corporis dolor sapiente dolorum molestias nam?",
          price: "7500000",
        },
        {
          id: 16,
          name: "Toyota Supra MK5",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4iOTfotMd2AagWpKDRqRFOBqOPcSB-iNg8w&usqp=CAU",
          desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio expedita veritatis nemo necessitatibus eius corporis dolor sapiente dolorum molestias nam?",
          price: "8900000",
        },
      ],
    };
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+1p&family=Saira&display=swap');

* {
  font-family: 'Saira', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: rgb(243, 244, 246);
}
.gallery_display{
  display: flex;
  justify-content: center;
  align-items: center;
}
.gallery_heading{
  margin-top: 30px;
  font-size: 30px;
}
.content_container {
  width: 95%;
  margin: 50px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
@media (max-width:673px){
  .car-card{
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
