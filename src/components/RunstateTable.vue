<template>
  <q-table
    title="Runstates"
    :data="data"
    :columns="columns"
    :pagination="pagination"
    row-key="name"
  >
    <template v-slot:body-cell="props">
      <q-td :props="props">
        <q-avatar v-if="props.col.name === 'stacklight_color'" :color="getColor(props.value)" style="border: 1px solid black" size="sm">
        </q-avatar>
        <div v-else>{{ props.value }}</div>
      </q-td>
    </template>
  </q-table>
</template>

<script>
export default {
  props: {
    data: {type: Array, required: true}
  },

  data () {
    return {
      columns: [
        { name: 'name', label: 'Machine Name', field: 'name', align: 'left', sortable: true },
        { name: 'state', label: 'State', field: 'state', align: 'left', sortable: true },
        { name: 'stacklight_color', label: 'Stacklight Color', field: 'stacklight_color', align: 'left', sortable: true },
      ],
      pagination: {
        rowsPerPage: 10
      },
    }
  },

  methods: {
    getColor (value) {
      return value ? value.toLowerCase() : 'white'
    },
  }
}
</script>
