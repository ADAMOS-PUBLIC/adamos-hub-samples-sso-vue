<template>
  <q-table
    title="Runstates"
    :data="data"
    :columns="columns"
    :pagination="pagination"
    row-key="id"
  >
    <template v-slot:body-cell="props">
      <q-td :props="props">
        <!-- <q-avatar  :color="getColor(props.value)" size="sm">
        </q-avatar> -->
        <Stacklight v-if="props.col.name === 'stacklight_color'" :machine="props.row" inline />
        <div v-else>{{ props.value || "?" }}</div>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import Stacklight from './Stacklight.vue'
export default {
  props: {
    data: {type: Array, required: true}
  },

  components: {
    Stacklight: () => import('components/Stacklight')
  },

  data () {
    return {
      columns: [
        { name: 'name', label: 'Machine Name', field: 'name', align: 'left', sortable: true },
        { name: 'state', label: 'State', field: 'state', align: 'left', sortable: true },
        { name: 'condition', label: 'Condition', field: 'condition', align: 'left', sortable: true },
        { name: 'stacklight_color', label: 'Stacklight', align: 'left', sortable: true },
      ],
      pagination: {
        rowsPerPage: 10
      },
    }
  },

  methods: {
    getColor (value) {
      return value && value !== 'OFF' ? value.toLowerCase() : 'grey'
    },
  }
}
</script>
