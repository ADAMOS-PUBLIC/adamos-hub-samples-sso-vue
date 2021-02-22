<template>
  <q-page padding>
    <!-- <div class="text-h4 text-center q-mb-md">Status View</div> -->
    <div class="row items-end q-mb-md">
      <span class="text-subtitle1">Welcome back,&nbsp;</span><span class="text-h6">{{ $user.given_name }}! 👷</span>
      <!-- <q-space />
      <q-btn label="logout" color="primary" @click="logout" /> -->
    </div>

    <div class="text-h6 q-mt-xl">Single-Sign-On (L1 Integration)</div>
    <div class="row q-gutter-md">
      <template v-for="(field, index) in user_fields">
        <div :key="field.label">
          <div class="text-subtitle2">{{ field.label }}</div>
          {{ $user[field.field] }}
        </div>
        <q-separator :key="index" vertical />
      </template>
    </div>

    <div class="text-h6 q-mt-xl">Machine Master Data (L2 Integration)</div>
    <!-- <div class="text-h6 q-mt-xl">Your Machines</div> -->
    <div v-if="!equipments.length">
      <div class="">No machines found</div>
    </div>
    <div v-else class="row q-gutter-md">
      <q-card
        v-for="equip in equipments"
        :key="equip.uuid"
      >
        <q-item>
          <q-item-section avatar>
            <q-avatar size="8em">
              <img v-if="equip['@type'] === 'Equipment'" :src="getImage(equip.manufacturerIdentification.equipmentOemId)" style="">
            </q-avatar>
              <!-- <img v-if="equip['@type'] === 'Equipment'" :src="getImage(equip.manufacturerIdentification.equipmentOemId)" style="width: 8em"> -->
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-h6">{{ equip.manufacturerIdentification.name }}</q-item-label>
            <q-item-label v-if="equip.locationIdentification" caption>{{ equip.locationIdentification.name }}</q-item-label>
            <q-item-label caption>{{ getManufacturerName(equip.manufacturerId) }}</q-item-label>
            <!-- <q-item-label caption>{{ equip.manufacturerName }}</q-item-label> -->
            <!-- <q-item-label caption>{{ equip.manufacturerIdentification }}</q-item-label> -->
            <!-- <q-item-label caption>{{ equip.manufacturerIdentification.equipmentOemId }}</q-item-label> -->
            <q-item-label caption>Build Year: {{ equip.manufacturerIdentification.buildYear }}</q-item-label>
            <!-- <q-item-label caption>{{ equip.manufacturerIdentification.internalName }}</q-item-label> -->
            <!-- <q-item-label caption>{{ equip.manufacturerIdentification.manufacturingNumber }}</q-item-label> -->
            <q-item-label caption>Serial Number: {{ equip.manufacturerIdentification.serialNumber }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </div>

    <div class="text-h6 q-mt-xl">Runstate Data (L3 Integration)</div>
    <div v-if="!equipments.length">
      <div class="">No machines found</div>
    </div>
    <div v-else style="max-width: 80em">
      <q-table
        title="Runstates"
        :data="runstateData"
        :columns="columns"
        :pagination="pagination"
        row-key="name"
      >
        <template v-slot:body-cell="props">
          <q-td :props="props">
            <q-avatar v-if="props.col.name === 'stacklight_color'" :color="props.value.toLowerCase()" style="border: 1px solid black" size="sm">
            </q-avatar>
            <div v-else>{{ props.value }}</div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',

  async mounted () {
    let eqs = await this.$store.dispatch('mdm/fetchEquipments')
    this.$store.dispatch('mdm/fetchManufacturers')
    this.$store.dispatch('catalog/fetchImageItems')
    let ids = eqs.map(eq => eq.uuid)
    this.$store.dispatch('runstate/fetchRunstates', ids)
    // this.$store.dispatch('permission/fetchTenants')
  },

  computed: {
    equipments () {
      let clone = [...this.$store.state.mdm.equipments]
      return clone.sort((a, b) => this.stringSort(a.manufacturerIdentification.name, b.manufacturerIdentification.name))
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
    runstateData () {
      return this.equipments.map((equip, index) => {
        let i = index < this.states.length ? index : Math.round(Math.random()*this.states.length)
        let obj = {
          name: equip.manufacturerIdentification.name,
          state: this.states[i],
          stacklight_color: this.stacklight_colors[i]
        }

        return obj
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
      data: [],
      columns: [
        { name: 'name', label: 'Machine Name', field: 'name', align: 'left', sortable: true },
        { name: 'state', label: 'State', field: 'state', align: 'left', sortable: true },
        { name: 'stacklight_color', label: 'Stacklight Color', field: 'stacklight_color', align: 'left', sortable: true },
      ],
      pagination: {
        // sortBy: 'desc',
        // descending: false,
        // page: 2,
        rowsPerPage: 10
        // rowsNumber: xx if getting data from a server
      },
      states: ['PRODUCTIVE', 'STANDBY', 'ENGINEERING', 'SCHEDULED DOWNTIME', 'UNSCHEDULED DOWNTIME'],
      stacklight_colors: ['GREEN', 'YELLOW', 'WHITE', 'BLUE', 'RED'],
    }
  },

  methods: {
    logout () {
      this.$auth.logout({returnTo: window.location.origin})
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
    }
  }
}
</script>
