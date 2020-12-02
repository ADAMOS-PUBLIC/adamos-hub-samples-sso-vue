import axios from 'axios'

const BASE_URL = 'https://services.adamos-hub.dev/permission-service/v0.1'

export async function fetchTenants (context) {
    try {
        let res = await axios.get(`${BASE_URL}/tenants?admin=true&page=0&size=20`)
        console.log(res)
        context.commit('SET_TENANTS', res.data.content)
    } catch (error) {
        console.log(error)
        return {error, success: false}
    }
}
