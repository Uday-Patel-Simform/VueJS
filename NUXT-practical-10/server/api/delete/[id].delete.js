export default defineEventHandler(async (event) => {
    const { id } = event.context.params
    const url = useRuntimeConfig().public.CAR_API_URL
    const token = getHeader(event,'Authorization')
    const res = await $fetch(url + id, {
        method: "DELETE",
        headers: {
            Authorization: token
        }
    })
    return res
}
)