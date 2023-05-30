<template>
    <div v-if="!store.users[0]">
        <Loader></Loader>
    </div>
    <v-container v-else class="w-75 mb-15">
        <!-- <v-container class="w-75 mb-15"> -->
        <h1 class="d-flex justify-center align-center mb-10">User List</h1>
        <transition appear name="user-table">
            <v-table height="65vh" fixed-header class="hide-scrollbar">
                <!-- <table> -->
                <thead>
                    <tr>
                        <th class="text-left">
                            ID
                        </th>
                        <th class="text-left">
                            Name
                        </th>
                        <th class="text-left">
                            Email
                        </th>
                        <th class="text-left">
                            Gender
                        </th>
                        <th class="text-left">
                            Role
                        </th>
                        <th class="text-left">
                            Age
                        </th>
                        <th class="text-left">
                            DOB
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in store.users" :key="user.id" class="user-list">
                        <td data-cells="id">{{ user.id }}</td>
                        <td data-cells="name">{{ user.name }}</td>
                        <td data-cells="email">{{ user.email }}</td>
                        <td data-cells="gender">{{ user.gender }}</td>
                        <td data-cells="role" :class="{ admin: user.role === 'admin' }">{{ user.role }}</td>
                        <td data-cells="age">{{ user.age }}</td>
                        <td data-cells="dob">{{ user.dob }}</td>
                    </tr>
                </tbody>
                <!-- </table> -->
            </v-table>
        </transition>
    </v-container>
</template>

<script setup>

import { useUserStore } from '../stores/UserStore'
import Loader from '../components/Loader.vue'
import { useServer } from '../composables/server'

const store = useUserStore()
const { fetchAllData } = useServer()

const getUsers = async () => {
    store.users = await fetchAllData(store.url)
}
getUsers()

</script>
<style scoped>
.v-table {
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.admin {
    background-color: #c7fff4;
}

.v-table .v-table__wrapper>table>thead>tr>th {
    background-color: #41B883;
    color: #ffffff;
    font-weight: 600;
    font-size: 18px;
    letter-spacing: 1px;
}

tbody tr {
    border-bottom: 1px solid #dddddd;
}

tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}

.user-table-enter-from {
    opacity: 0;
    transform: translateY(100px);
}

.user-table-enter-active {
    transition: all 0.5s ease;
}

@media (max-width: 650px) {
    th {
        display: none;
    }

    td {
        /* display: block; */
        border-bottom: 0px !important;
        display: flex;
        align-items: center;
        height: 25px !important;
    }

    td:first-child {
        margin-top: 20px !important;
    }

    td:last-child {
        margin-bottom: 20px !important;
    }

    td::before {
        content: attr(data-cells) " : ";
        font-weight: bold;
        text-transform: capitalize;
        width: 30%;
    }
}

@media (max-width: 450px) {
    td {
        font-size: 12px;
        height: 20px !important;
    }
}
</style>