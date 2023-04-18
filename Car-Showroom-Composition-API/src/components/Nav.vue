<template>
    <nav class="app-nav">
        <div class="navbar">
            <div class="nav-logo">
                <router-link :to="{ name: 'home' }" exact-active-class="no-active">C$G</router-link>
            </div>
            <div class="nav-links">
                <router-link :to="{ name: 'home' }"> Home </router-link>
                <router-link v-if="!store.isLoggedIn" :to="{ name: 'login' }"> Login </router-link>
                <router-link v-if="!store.isLoggedIn" :to="{ name: 'registration' }"> Registration </router-link>
                <a v-else @click.prevent="store.logOut()">Log Out</a>
            </div>
        </div>
    </nav>
</template>
<script setup>
import { useUserStore } from '../stores/UserStore'

const store = useUserStore()

</script>
<style >
.app-nav {
    z-index: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    box-shadow: 0px 0px 50px 0px rgb(0 0 0 / 10%);
    align-items: center;
    height: 70px;
    margin-bottom: 30px;
    font-size: 25px;
    background-color: #34495E;

}

.navbar {
    width: 85%;
    display: flex;
    justify-content: space-between;
}

.app-nav .nav-logo a {
    margin-left: 20px;
    font-size: 35px;
    text-decoration: none;
    color: #41B883;
    font-weight: 600;
}

.app-nav .nav-links a {
    text-decoration: none;
    border-bottom: 2px solid transparent;
    padding-bottom: 2px;
    color: #ffff;
    margin-left: 20px;
    cursor: pointer;
}

.app-nav .nav-links a:hover {
    transition: all 0.2s ease-in-out;
    color: #41B883;
    border-bottom: 2px solid #41B883;
}

.active_nav_link {
    color: #41B883 !important;
    border-bottom: 2px solid #41B883 !important;
}

.app-nav a:last-child {
    margin-right: 20px;
}

@media (max-width:673px) {
    .navbar {
        width: 100%;
    }

    .app-nav .nav-logo a {
        font-size: 30px;
    }


    .app-nav .nav-links {
        display: flex;
        justify-content: space-evenly;
        width: 50%;
    }

    .app-nav .nav-links a {
        font-size: 20px;
        margin: 0;
    }
}

@media (max-width:500px) {
    .app-nav .nav-links a {
        font-size: 15px;
    }

    .app-nav .nav-logo a {
        font-size: 25px;
        margin: 0 10px;
    }

}

@media (max-width:400px) {
    .app-nav .nav-links {
        width: 60%;
    }

}

@media (max-width:360px) {
    .app-nav .nav-links {
        width: 70%;
    }

    .app-nav {
        height: 50px;
    }

}</style>