import axios from 'axios'

const BASE_URL = 'https://services.adamos-hub.dev/runstate-service/v0.2'
// const BASE_URL = 'https://services.adamos-hub.dev/runstate-service/v0.1'

export async function fetchRunstates (context, ids) {
    try {
        let res = await axios.get(`${BASE_URL}/runstate/equipment/${ids.join(',')}`)
        if (res.data[1]) {
            context.commit('SET_RUNSTATES', res.data[1])
        }
    } catch (error) {
        console.log(error)
        return {error, success: false}
    }
}
export async function fetchStacklights (context, ids) {
    try {
        let base = `https://services.adamos-hub.dev/runstate-service/v0.1`
        let res = await axios.get(`${base}/stacklight/equipment/${ids.join(',')}`)
        if (res.data[1]) {
            context.commit('SET_STACKLIGHTS', res.data[1])
        }
    } catch (error) {
        console.log(error)
        return {error, success: false}
    }
}
