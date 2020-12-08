<template>
  <q-page padding>
    <div class="row items-end q-mb-md">
      <span class="text-subtitle1">Welcome back,&nbsp;</span><span class="text-h6">{{ $user.given_name }}! &#129305;</span>
      <q-space />
      <q-btn label="logout" color="primary" @click="logout" />
    </div>

    <div class="row q-gutter-md">
      <template v-for="(field, index) in user_fields">
        <div :key="field.label">
          <div class="text-h6">{{ field.label }}</div>
          {{ $user[field.field] }}
        </div>
        <q-separator :key="index" vertical />
      </template>
    </div>

    <div class="text-h6 q-mt-xl">Your Machines</div>
    <div class="row q-gutter-md">
      <q-card
        v-for="equip in equipments"
        :key="equip.uuid"
      >
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img v-if="equip['@type'] === 'Equipment'" src="machines-emptystate.svg">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-h6">{{ equip.manufacturerIdentification.name }}</q-item-label>
            <!-- <q-item-label v-if="equip.locationIdentification" caption>{{ equip.locationIdentification.name }}</q-item-label>
            <q-item-label caption>{{ equip.manufacturerId }}</q-item-label>
            <q-item-label caption>{{ equip.manufacturerName }}</q-item-label>
            <q-item-label caption>{{ equip.manufacturerIdentification }}</q-item-label>
            <q-item-label caption>{{ equip.manufacturerIdentification.equipmentOemId }}</q-item-label>
            <q-item-label caption>{{ equip.manufacturerIdentification.buildYear }}</q-item-label>
            <q-item-label caption>{{ equip.manufacturerIdentification.internalName }}</q-item-label>
            <q-item-label caption>{{ equip.manufacturerIdentification.manufacturingNumber }}</q-item-label>
            <q-item-label caption>{{ equip.manufacturerIdentification.serialNumber }}</q-item-label> -->
          </q-item-section>
        </q-item>
        <!-- <q-card-section>
          <div class="text-h6">{{ equip.manufacturerIdentification.name }}</div>
        </q-card-section> -->
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',

  mounted () {
    this.$store.dispatch('mdm/fetchEquipments')
    // this.$store.dispatch('permission/fetchTenants')
  },

  computed: {
    equipments () {
      return this.$store.state.mdm.equipments
    }
  },

  data () {
    return {
      user_fields: [
        {label: 'Your Tenant ID', field: 'https://id.adamos.com/tenantId'},
        {label: 'Your User ID', field: 'https://id.adamos.com/userId'},
        {label: 'Your Roles', field: 'https://id.adamos.com/user/roles'},
        {label: 'Your Nickname', field: 'nickname'},
        {label: 'Your Email', field: 'email'},
        {label: 'App ID', field: 'https://id.adamos.com/applicationId'},
      ]
    }
  },

  methods: {
    logout () {
      this.$auth.logout({returnTo: window.location.origin})
    }
  }
}
</script>
