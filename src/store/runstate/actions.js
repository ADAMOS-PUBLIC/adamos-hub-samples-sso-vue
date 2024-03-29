import axios from 'axios'

const BASE_URL = 'https://services.adamos-hub.dev/runstate-service/v1'

export async function fetchRunstates (context, ids) {
    context.commit('SET_LOADING_STATUS', 'loading')
    try {
        let res = await axios.get(`${BASE_URL}/state/machine/${ids.join(',')}`)
        let runstates = Array.isArray(res.data) ? res.data[1] : [res.data]
        context.commit('SET_RUNSTATES', runstates)
        context.commit('SET_LOADING_STATUS', 'not_loading')
    } catch (error) {
        console.log(error)
        return {error, success: false}
    }
}
export async function fetchStacklights (context, ids) {
    try {
        let base = `https://services.adamos-hub.dev/runstate-service/v0.1`
        let res = await axios.get(`${base}/stacklight/machine/${ids.join(',')}`)
        let stacklights = Array.isArray(res.data) ? res.data[1] : [res.data]
        context.commit('SET_STACKLIGHTS', stacklights)
    } catch (error) {
        console.log(error)
        return {error, success: false}
    }
}
