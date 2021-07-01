import axios from 'axios'

const BASE_URL = 'https://services.adamos-hub.dev/runstate-service/v0.2'
// const BASE_URL = 'https://services.adamos-hub.dev/runstate-service/v0.1'

export async function fetchRunstates (context, ids) {
    try {
        let res = await axios.get(`${BASE_URL}/runstate/equipment/${ids.join(',')}`)
        let runstates = Array.isArray(res.data) ? res.data[1] : [res.data]
        context.commit('SET_RUNSTATES', runstates)
    } catch (error) {
        console.log(error)
        return {error, success: false}
    }
}
export async function fetchStacklights (context, ids) {
    try {
        let base = `https://services.adamos-hub.dev/runstate-service/v0.1`
        let res = await axios.get(`${base}/stacklight/equipment/${ids.join(',')}`)
        let stacklights = Array.isArray(res.data) ? res.data[1] : [res.data]
        context.commit('SET_STACKLIGHTS', stacklights)
    } catch (error) {
        console.log(error)
        return {error, success: false}
    }
}
