// import something here
// import Mgr from './oidc-config'
import Oidc from 'oidc-client'
import axios from 'axios'

const config = {
  userStore: new Oidc.WebStorageStateStore({
    // prefix: 'oidc',
    store: window.localStorage
  }),
  authority: `https://id.adamos.dev`,
  client_id: `CjhZ5fGMMNaBf8o95eJetIQr7LSv82mK`,
  redirect_uri: window.location.origin,
  response_type: 'code',
  scope: `openid profile email offline_access`,
  post_logout_redirect_uri: window.location.origin,
}

export default async ({ app, router, Vue }) => {

  config.metadata = await getMetadata()

  const mgr = new Oidc.UserManager(config)
  
  Vue.prototype.$auth = mgr

  let user = await mgr.getUser()
  if (user && !user.expired) {
    await afterLogin(mgr, Vue)
    return
  }

  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {

    // Process the login state
    await mgr.signinRedirectCallback()

    await afterLogin(mgr, Vue)

    // Use replaceState to redirect the user away and remove the querystring parameters
    window.history.replaceState({}, document.title, "/");

    return
  }

  // mgr.signinRedirect()
  // console.log(router);
  // router.push('login')
  // window.history.replaceState({}, document.title, "/login");
}

async function afterLogin(mgr, Vue) {
  let user = await mgr.getUser()

  Vue.prototype.$user = user.profile

  let token = user.access_token
  setAuthHeader(token)
}

function setAuthHeader(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

async function getMetadata() {
  let response = await fetch(`${config.authority}/.well-known/openid-configuration`)
  let metadata = await response.json()
  metadata.end_session_endpoint = `${config.authority}/logout?returnTo=${window.location.origin}&client_id=${config.client_id}`
  return metadata
}