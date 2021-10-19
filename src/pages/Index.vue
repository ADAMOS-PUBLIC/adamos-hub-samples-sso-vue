<template>
  <q-page padding>
    <div class="row items-end q-mb-md">
      <span class="text-subtitle1">Welcome back,&nbsp;</span><span class="text-h6">{{ user.given_name }}! 👷</span>
    </div>

    <div class="text-h6 q-mt-xl">Single-Sign-On (L1 Integration)</div>
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="row q-gutter-xl">
          <template v-for="(field, index) in user_fields">
            <div :key="field.label">
              <div class="text-subtitle2">{{ field.label }}</div>
              {{ user[field.field] }}
            </div>
            <q-separator v-if="index !== user_fields.length-1" :key="index" vertical />
          </template>
        </div>
      </q-card-section>
    </q-card>
    <div class="row q-gutter-md">
      <q-btn label="Access Token" color="primary" @click="copyToken('access_token')" />
      <q-btn label="ID Token" color="primary" @click="copyToken('id_token')" />
    </div>

    <div class="text-h6 q-mt-xl">Machine Master Data (L2 Integration)</div>
    <div v-if="!equipments.length">
      <div class="">No machines found</div>
    </div>
    <div v-else class="row q-gutter-md">
      <MachineCard v-for="equip in equipments" :key="equip.uuid" :machine="equip" />
    </div>

    <div class="text-h6 q-mt-xl">Runstate Data (L3 Integration)</div>
    <div v-if="!equipments.length">
      <div class="">No machines found</div>
    </div>
    <div v-else>
      <RunstateTable :data="runstateData" />
    </div>
  </q-page>
</template>

<script>
import clipboard from '../mixins/clipboard'

export default {
  // name: 'PageIndex',

  components: {
    MachineCard: () => import('components/MachineCard'),
    RunstateTable: () => import('components/RunstateTable'),
  },

  mixins: [clipboard],

  async mounted () {
    this.$store.dispatch('mdm/fetchManufacturers')
    this.$store.dispatch('catalog/fetchImageItems')

    let eqs = await this.$store.dispatch('mdm/fetchEquipments')
    if (eqs.error) {
      console.error(eqs.error);
      return
    }

    let ids = eqs.map(eq => eq.uuid)
    this.$store.dispatch('runstate/fetchRunstates', ids)
    this.$store.dispatch('runstate/fetchStacklights', ids)
    // this.$store.dispatch('permission/fetchTenants')
  },

  computed: {
    user () {
      return this.$user || {}
    },
    equipments () {
      let clone = [...this.$store.state.mdm.equipments].map(this.mapMachine)
      return clone.sort((a, b) => this.stringSort(a.manufacturerName, b.manufacturerName))
    },
    manufacturers () {
      return this.$store.state.mdm.manufacturers
    },
    imageItems () {
      return this.$store.state.catalog.imageItems
    },
    runstates () {
      return this.$store.state.runstate.runstates
    },
    stacklights () {
      return this.$store.state.runstate.stacklights
    },
    runstateData () {
      return this.equipments.map((equip, index) => {
        // let i = index < this.states.length ? index : Math.round(Math.random()*this.states.length)
        let state = this.runstates.filter(state => state.assetUuid === equip.uuid).pop()
        let stacklight = this.stacklights.filter(light => light.assetUuid === equip.uuid).pop()

        return {
          name: equip.manufacturerIdentification.name,
          state: this.mapState(state),
          condition: this.mapCondition(state),
          stacklight_color: this.mapStacklight(stacklight)
        }
      })
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
      ],
    }
  },

  methods: {
    mapMachine (equip) {
      if (!equip) return equip

      let manufacturerName = this.getManufacturerName(equip.manufacturerId)
      let imageSrc = this.getImage(equip.manufacturerIdentification.equipmentOemId)
      return {
        ...equip,
        manufacturerName,
        imageSrc
      }
    },
    getManufacturerName (manufacturerId) {
      let arr = this.manufacturers.filter(m => m.uuid === manufacturerId)
      if (!arr.length) return ''
      return arr[0].name
    },
    getImage (equipmentOemId) {
      let images = this.imageItems.filter(item => item.equipmentOemId === equipmentOemId)
      if (!images.length) return 'machines-emptystate.svg'
      return images[0].fileInformation.url
    },
    stringSort (a, b) {
      var nameA = a.toUpperCase(); // ignore upper and lowercase
      var nameB = b.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    },
    mapState (state) {
      return state ? state.machineState : null
    },
    mapCondition (state) {
      return state ? state.machineCondition : null
    },
    mapStacklight (state) {
      return state ? state.stackLightColor : null
    },
    async copyToken (field) {
      let user = await this.$auth.getUser()
      this.copyTextToClipboard(user[field])
      this.$q.notify({
        message: `${field} copied to clipboard!`
      })
    },
  }
}
</script>
