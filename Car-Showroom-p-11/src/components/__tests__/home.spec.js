import { shallowMount, flushPromises } from '@vue/test-utils';
import Home from '../../views/HomeView.vue';
import axios from 'axios';
import { createPinia } from 'pinia'
import { useCarStore } from '../../stores/CarStore'
import card from '../GalleryCard.vue'
import { expect } from 'vitest';

describe('Home', () => {
    it('should render all cards based on the cars array', async () => {
        const store = useCarStore(createPinia())
        const res = await axios.get(import.meta.env.VITE_CAR_API_URL)
        const cars = store.cars = await res.data.data
        const isLoading = false
        const wrapper = shallowMount(Home, {
            data() {
                return {
                    cars,
                    isLoading
                }
            },
            global: {
                mocks: {
                    $t: (message) => message
                },
            }
        })
        await flushPromises();
        await wrapper.vm.$nextTick()
            const cards = wrapper.findAllComponents(card)
            expect(cards).toHaveLength(cars.length)
            cards.forEach((wrapper, i) => {
                expect(wrapper.props().car).toStrictEqual(cars[i])
            })
    });
});