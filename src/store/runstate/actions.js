import axios from 'axios'

const BASE_URL = 'https://services.adamos-hub.dev/runstate-service/v0.2'

export async function fetchRunstates (context, ids) {
    try {
        let res = await axios.get(`${BASE_URL}/runstate/equipment/${ids.join(',')}`)
        if (res.data.content) {
            context.commit('SET_RUNSTATES', res.data.content)
        }
    } catch (error) {
        console.log(error)
        return {error, success: false}
    }
}
