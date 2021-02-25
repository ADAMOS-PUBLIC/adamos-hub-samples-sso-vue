<template>
  <q-card style="width: 25em">
    <q-item>
      <q-item-section avatar>
        <q-avatar size="8em">
          <!-- <q-img v-if="machine['@type'] === 'Equipment'" :src="machine.imageSrc" style="" /> -->
          <q-img :src="machine.imageSrc" />
        </q-avatar>
        <!-- <q-img :src="machine.imageSrc" width="7em" /> -->
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-h6" lines="1">{{ machine.manufacturerIdentification.name }}</q-item-label>
        <q-item-label caption lines="1">{{ machine.manufacturerName }}</q-item-label>
        <q-item-label caption>Build Year: {{ machine.manufacturerIdentification.buildYear }}</q-item-label>
        <q-item-label caption lines="1">Serial Number: {{ machine.manufacturerIdentification.serialNumber }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script>
export default {
  props: {
    machine: {type: Object, required: true}
  },

  data () {
    return {}
  },

  methods: {
  }
}
</script>
