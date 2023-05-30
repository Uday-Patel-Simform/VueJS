import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import card from '../../components/GalleryCard.vue'
import { createPinia } from 'pinia'
import { useCarStore } from '../../stores/CarStore'

describe('Router', () => {
    it('renders router link', async () => {
        const store = useCarStore(createPinia())
        const car = {
            id: 1232
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
        expect(wrapper.findComponent(RouterLinkStub).props().to)
        .toEqual({ name:'detail', params: {id: car.id}})
    })
})