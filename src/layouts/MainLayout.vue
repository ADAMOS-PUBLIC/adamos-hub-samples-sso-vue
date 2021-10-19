<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white text-primary">
        
        <q-toolbar-title>
          <div class="row items-end q-gutter-sm">
            <q-img
              transition="fade"
              src="logo.png"
              style="width: 1.5em"
            />
            <div v-if="$q.screen.gt.sm" class="text-h5">Status View</div>
          </div>
        </q-toolbar-title>

        <!-- <div class="text-h6">Status View</div> -->

        <div class="row no-wrap" style="width: 50%">
          <q-input dense outlined square placeholder="Search" class="bg-white col" />
          <q-btn class="" color="grey-3" text-color="grey-8" icon="search" unelevated />
        </div>
        <q-space />

        <div class="row items-center q-gutter-md">
          <div class="cursor-pointer">
            <q-avatar v-if="picture" size="md"><img :src="picture"></q-avatar>
            <q-icon v-else name="account_circle" size="md" />
          </div>
          
          <q-menu>
            <q-list class="saria-font" style="min-width: 11em">
              <q-item>
                <q-item-section avatar>
                  <q-avatar v-if="picture"><img :src="picture"></q-avatar>
                  <q-icon v-else name="account_circle" color="black" size="md" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="">{{ user.name }}</q-item-label>
                  <q-item-label caption>{{ user.email }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable @click="logout">
                <q-item-section avatar><q-icon name="exit_to_app" /></q-item-section>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </q-toolbar>
      <q-separator color="primary" />
    </q-header>

    <q-page-container class="bg-grey-2">
      <!-- <router-view /> -->
      <router-view v-if="user.email" />
      
      <!-- <div v-else class="fixed-center">
        <q-spinner size="xl" />
      </div> -->
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  components: {  },

  computed: {
    user () {
      return this.$user || {}
    },
    picture () {
      return this.user.picture
    },
  },

  mounted () {
    if (this.$redirecting) {
      // wait.. redirecting to ADAMOS login page
    }
    else if (!this.user.email) {
      this.$router.replace('/login')
    }
  },

  data () {
    return {
      leftDrawerOpen: false,
    }
  },

  methods: {
    logout () {
      this.$auth.signoutRedirect()
    },
  }
}
</script>
