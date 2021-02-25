import axios from 'axios'

const BASE_URL = 'https://services.adamos-hub.dev/catalog-service/v0.5'

export async function fetchImageItems (context) {
    try {
        let res = await axios.get(`${BASE_URL}/imageItems?size=100`)
        context.commit('SET_IMAGE_ITEMS', res.data.content)
    } catch (error) {
        console.log(error)
        return {error, success: false}
    }
}
