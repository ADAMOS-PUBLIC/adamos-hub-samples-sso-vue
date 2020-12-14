// import something here
import createAuth0Client from '@auth0/auth0-spa-js';
import axios from 'axios'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ app, router, Vue }) => {
    let auth0 = await createAuth0Client({
        domain: 'id.adamos.dev',
        client_id: 'BHpa1DmT72cINvbqwxOGAhs1NnLW6vMx',
    });

    const isAuthenticated = await auth0.isAuthenticated();
    if (isAuthenticated) {
        // show the gated content
        await afterLogin(auth0, Vue)
        return;
    }

    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {

        // Process the login state
        await auth0.handleRedirectCallback()
        
        await afterLogin(auth0, Vue)

        // Use replaceState to redirect the user away and remove the querystring parameters
        window.history.replaceState({}, document.title, "/");
        
        return
    }

    await auth0.loginWithRedirect({
        redirect_uri: window.location.origin
    });
}

async function afterLogin(auth0, Vue) {
    let user = await auth0.getUser()
    Vue.prototype.$user = user
    Vue.prototype.$auth = auth0

    let token = await auth0.getTokenSilently()
    setAuthHeader(token)
}

function setAuthHeader(token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}
