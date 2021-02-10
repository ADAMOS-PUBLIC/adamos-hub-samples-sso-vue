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
          <!-- <div class="saria-font text-black">{{ name }}</div> -->
          <div class="cursor-pointer">
            <!-- <q-avatar><img :src="picture"></q-avatar> -->
            <q-icon name="account_circle" size="md" />
          </div>
          
          <q-menu>
            <q-list class="saria-font" style="min-width: 11em">
              <q-item>
                <q-item-section avatar>
                  <!-- <q-avatar size="xl"><img :src="picture"></q-avatar> -->
                  <q-icon name="account_circle" color="black" size="md" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="">{{ name }}</q-item-label>
                  <q-item-label caption>{{ email }}</q-item-label>
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

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container class="bg-grey-2">
      <router-view v-if="user" />
      
      <div v-else class="fixed-center">
        <q-spinner size="xl" />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  components: {  },

  computed: {
    user () {
      return this.$user
    },
    name () {
      return this.$user ? this.$user.given_name + ' ' + this.$user.family_name : 'noname'
    },
    email () {
      return this.$user ? this.$user.email : 'noemail'
    },
  },
  data () {
    return {
      leftDrawerOpen: false,
    }
  },

  methods: {
    logout () {
      this.$auth.logout({returnTo: window.location.origin})
    },
  }
}
</script>
