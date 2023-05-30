import card from '../GalleryCard.vue'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { useCarStore } from '../../stores/CarStore'

describe('GallaryCard.vue', () => {
    test('renders card', () => {
        const store = useCarStore(createPinia())
        const car = {
            name: 'test'
        }
        const wrapper = shallowMount(card, {
            propsData: {
                car
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
        const cards = wrapper.find('.car-name')
        expect(cards.text()).toContain(car.name)
    })
})