import axios from 'axios'

const BASE_URL = 'https://services.adamos-hub.dev/mdm-service/v0.4/asset'

export async function fetchEquipments (context) {
    context.commit('SET_LOADING_STATUS', 'loading')
    try {
        let res = await axios.get(`${BASE_URL}/equipments?caseInsensitive=true&page=0&size=20`)
        context.commit('SET_EQUIPMENTS', res.data.content)
        context.commit('SET_LOADING_STATUS', 'not_loading')
        return res.data.content || []
    } catch (error) {
        console.log(error)
        return {error, success: false}
    }
}
export async function fetchManufacturers (context) {
    context.commit('SET_LOADING_STATUS', 'loading')
    try {
        let res = await axios.get(`${BASE_URL}/manufacturers?caseInsensitive=true&page=0&size=100`)
        context.commit('SET_MANUFACTURERS', res.data.content)
        context.commit('SET_LOADING_STATUS', 'not_loading')
    } catch (error) {
        console.log(error)
        return {error, success: false}
    }
}
