import { shallowMount, flushPromises } from '@vue/test-utils';
import userList from '../../views/UsersList.vue';
import axios from 'axios';
import { createPinia } from 'pinia'
import { useUserStore } from '../../stores/UserStore'
// import { VTable, VContainer } from 'vuetify/lib/components/index.mjs'

describe('Home', () => {
    it('should render all cards based on the cars array', async () => {
        const store = useUserStore(createPinia())
        const res = await axios.get(import.meta.env.VITE_USER_API_URL)
        const users = store.users = await res.data.data
        const wrapper = shallowMount(userList, {
            data() {
                return {
                    users
                }
            },
        })
            const tr = wrapper.findAll('.user-list')
            expect(tr).toHaveLength(users.length)
    });
});