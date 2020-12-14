import axios from 'axios'

const BASE_URL = 'https://services.adamos-hub.dev/mdm-service/v0.4'

export async function fetchEquipments (context) {
    try {
        let res = await axios.get(`${BASE_URL}/asset/equipments?caseInsensitive=true&page=0&size=20`)
        context.commit('SET_EQUIPMENTS', res.data.content)
    } catch (error) {
        console.log(error)
        return {error, success: false}
    }
}
