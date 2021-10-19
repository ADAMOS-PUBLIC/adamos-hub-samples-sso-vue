<template>
  <q-page class="flex flex-center bg-gradient">
    <div class="q-pa-lg bg-white shadow-6" style="width: 25em">
      <q-img src="~assets/mabau-logo.jpeg" style="height: 20px" contain />

      <div class="text-h4 q-mb-xl text-center">Status View</div>

      <q-form @submit="onLogin" class="q-mb-lg">
        <q-input disable class="q-mb-sm" v-model="email" label="Email" />
        <q-input disable class="q-mb-lg" v-model="password" label="Password" />

        <q-btn disable label="Login" type="submit" color="primary" class="full-width" />
      </q-form>

      <div class="q-mb-lg row q-gutter-x-md justify-center items-center">
        <q-separator class="col" />
        <div>OR</div>
        <q-separator class="col" />
      </div>

      <q-btn class="full-width adamos-login-button" no-caps @click="loginWithAdamos">
        
        <div class="full-width row items-center justify-start no-wrap">
          <q-img src="~assets/adamos.png" style="width: 30px" />

          <div class="col">
            Log in with ADAMOS ID
          </div>

          <q-img src="~assets/logout_icon.png" style="width: 20px" />
        </div>
      </q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',

  data () {
    return {
      email: null,
      password: null
    }
  },

  mounted () {
    console.log('document.referrer');
    console.log(document.referrer);
  },

  methods: {
    onLogin () {
      console.log('not implemented');
    },

    loginWithAdamos () {
      this.$auth.signinRedirect()
    },
  }
}
</script>

<style lang="sass" scoped>
.adamos-login-button
  background-color: #008DAB
  color: #fff

.bg-gradient
  background-image: linear-gradient(to bottom right, #8e9eab, #eef2f3)

.waves-background
  background-image: url('~assets/wave.svg')
  background-repeat: no-repeat
  background-size: contain
</style>