<template>
    <div>
        <div class="loader"></div>
    </div>
</template>
<script setup>
</script>
<style scoped>
div{
    height: 75vh;
    width: 75vw;
}
.loader {
    display: inline-block;
    width: 70px;
    height: 70px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}

.loader:after {
    content: " ";
    display: block;
    width: 40px;
    height: 40px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #41B883 transparent #41B883 transparent;
    animation: loader 0.7s linear infinite;
}

@keyframes loader {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}</style>