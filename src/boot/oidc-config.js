// import Oidc from 'oidc-client'

// // let env = process.env
// const mgr = new Oidc.UserManager({
//     userStore: new Oidc.WebStorageStateStore({
//         // prefix: 'oidc',
//         store: window.localStorage
//     }),
//     authority: `https://id.adamos.dev`,
//     client_id: `CjhZ5fGMMNaBf8o95eJetIQr7LSv82mK`,
//     redirect_uri: window.location.origin,
//     response_type: 'code',
//     scope: `openid profile email`,
//     post_logout_redirect_uri: window.location.origin,
//     // metadata: {
//     //     // ...,
//     //     end_session_endpoint: `https://id.adamos.dev/logout`,
//     // },
//     // silent_redirect_uri: window.location.origin + env.OIDC_SILENT_REDIREC_URI,
//     // accessTokenExpiringNotificationTime: 2,
//     // automaticSilentRenew: true,
//     // filterProtocolClaims: true,
//     // loadUserInfo: true,
//     // clockSkew: 900,
//     // silentRequestTimeout: 2
// })

// Oidc.Log.logger = console
// Oidc.Log.level = Oidc.Log.DEBUG

// mgr.events.addUserLoaded(function (user) {
//     console.log('New User Loaded：', arguments)
//     // console.log('Acess_token: ', user.access_token)
// })

// mgr.events.addAccessTokenExpiring(function () {
//     console.log('AccessToken Expiring：', arguments)
// })

// mgr.events.addAccessTokenExpired(function () {
//     console.log('AccessToken Expired：', arguments)
//     // alert('Session expired. Going out!')
//     mgr.removeUser().then(resp => {
//         mgr.clearStaleState().then(() => {
//             mgr.signinRedirect()
//         })
//     })
// })

// mgr.events.addSilentRenewError(function () {
//     console.error('Silent Renew Error：', arguments)
// })

// mgr.events.addUserSignedOut(function () {
//     mgr.removeUser().then(function (resp) {
//         mgr.clearStaleState()
//             .then(() => {
//                 mgr.signinRedirect()
//             })
//     })
// })

// export default class SecurityService {
//     constructor() {
//         console.log('Construtor')
//     }

//     signinRedirectCallback() {
//         let self = this
//         return new Promise((resolve, reject) => {
//             mgr.signinRedirectCallback().then(function (user) {
//                 // window.location.href = '/'
//                 return resolve(null)
//             }).catch(function (err) {
//                 console.log(err)
//                 return reject(err)
//             })
//         })
//     }

//     getUser() {
//         let self = this
//         return new Promise((resolve, reject) => {
//             mgr.getUser().then(function (user) {
//                 if (user == null) {
//                     self.signIn()
//                     return resolve(null)
//                 } else {
//                     return resolve(user)
//                 }
//             }).catch(function (err) {
//                 console.log(err)
//                 return reject(err)
//             })
//         })
//     }
//     getSignedIn() {
//         let self = this
//         return new Promise((resolve, reject) => {
//             mgr.getUser().then(function (user) {
//                 if (user == null) {
//                     self.signIn()
//                     return resolve(false)
//                 } else {
//                     return resolve(true)
//                 }
//             }).catch(function (err) {
//                 console.log(err)
//                 return reject(err)
//             })
//         })
//     }
//     signIn() {
//         mgr.signinRedirect().catch(function (err) {
//             console.log(err)
//         })
//     }
//     signOut() {
//         // var self = this
//         mgr.signoutRedirect().then(function (resp) {
//             console.log('signed out', resp)
//         }).catch(function (err) {
//             console.log(err)
//         })
//     }

//     getToken() {
//         let self = this
//         return new Promise((resolve, reject) => {
//             mgr.getUser().then(function (user) {
//                 if (user == null) {
//                     self.signIn()
//                     return resolve(false)
//                 } else {
//                     return resolve(user)
//                 }
//             }).catch(function (err) {
//                 console.log(err)
//                 return reject(err)
//             })
//         })
//     }

//     getProfile() {
//         let self = this
//         return new Promise((resolve, reject) => {
//             mgr.getUser().then(function (user) {
//                 if (user == null) {
//                     self.signIn()
//                     return resolve(false)
//                 } else {
//                     return resolve(user.profile)
//                 }
//             }).catch(function (err) {
//                 console.log(err)
//                 return reject(err)
//             })
//         })
//     }

//     getIdToken() {
//         let self = this
//         return new Promise((resolve, reject) => {
//             mgr.getUser().then(function (user) {
//                 if (user == null) {
//                     self.signIn()
//                     return resolve(false)
//                 } else {
//                     return resolve(user.id_token)
//                 }
//             }).catch(function (err) {
//                 console.log(err)
//                 return reject(err)
//             })
//         })
//     }

//     getSessionState() {
//         let self = this
//         return new Promise((resolve, reject) => {
//             mgr.getUser().then(function (user) {
//                 if (user == null) {
//                     self.signIn()
//                     return resolve(false)
//                 } else {
//                     return resolve(user.session_state)
//                 }
//             }).catch(function (err) {
//                 console.log(err)
//                 return reject(err)
//             })
//         })
//     }

//     getAcessToken() {
//         let self = this
//         return new Promise((resolve, reject) => {
//             mgr.getUser().then(function (user) {
//                 if (user == null) {
//                     self.signIn()
//                     return resolve(false)
//                 } else {
//                     return resolve(user.access_token)
//                 }
//             }).catch(function (err) {
//                 console.log(err)
//                 return reject(err)
//             })
//         })
//     }

//     getScopes() {
//         let self = this
//         return new Promise((resolve, reject) => {
//             mgr.getUser().then(function (user) {
//                 if (user == null) {
//                     self.signIn()
//                     return resolve(false)
//                 } else {
//                     return resolve(user.scopes)
//                 }
//             }).catch(function (err) {
//                 console.log(err)
//                 return reject(err)
//             })
//         })
//     }

//     getRoles() {
//         let self = this
//         return new Promise((resolve, reject) => {
//             mgr.getUser().then(function (user) {
//                 if (user == null) {
//                     self.signIn()
//                     return resolve(false)
//                 } else {
//                     return resolve(user.profile['https://id.adamos.com/user/roles'])
//                 }
//             }).catch(function (err) {
//                 console.log(err)
//                 return reject(err)
//             })
//         })
//     }
// }