import { shallowMount, flushPromises, RouterLinkStub } from '@vue/test-utils';
import details from '../../views/CarDetail.vue';
import axios from 'axios';
import { createPinia } from 'pinia'
import { useCarStore } from '../../stores/CarStore'
import { expect } from 'vitest';

describe('Home', () => {
    it('should render all cards based on the cars array', async () => {
        const store = useCarStore(createPinia())
        const res = await axios.get(import.meta.env.VITE_CAR_API_URL + 2244)
        const car = store.car = await res.data
        const wrapper = shallowMount(details, {
            data() {
                return {
                    car
                }
            },
            global: {
                components: {
                    'router-link': RouterLinkStub
                },
                mocks: {
                    $t: (message) => message,
                    $store: store
                },
            }
        })
        await flushPromises();
        await wrapper.vm.$nextTick()
        const card = wrapper.find('.car-name')
        expect(card.text()).toContain(car.name)
    });
});