<template>
  <q-card style="width: 25em" class="cursor-pointer" @click="copyUUID">
    <q-item>
      <q-item-section avatar>
        <q-avatar size="8em">
          <!-- <q-img v-if="machine['@type'] === 'Equipment'" :src="machine.imageSrc" style="" /> -->
          <q-img :src="imageSrc" />
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
import clipboard from '../mixins/clipboard'
import axios from 'axios'

export default {
  props: {
    machine: {type: Object, required: true}
  },

  mixins: [clipboard],

  async mounted () {
    const catalogEntryId = this.machine.manufacturerIdentification.catalogEntryId
    let res = await axios.get(`https://services.adamos-hub.dev/catalog-service/v1/catalogEntries/${catalogEntryId}/images`)
    let images = res.data.content
    let first = images.length ? images[0] : null
    if (first) {
      this.imageSrc = first.fileInformation.url
    }
    else {
      this.imageSrc = 'machines-emptystate.svg'
    }
  },

  data () {
    return {
      imageSrc: null
    }
  },

  methods: {
    copyUUID () {
      this.copyTextToClipboard(this.machine.uuid)
      this.$q.notify({
        message: `Machine UUID copied to clipboard!`
      })
    }
  }
}
</script>
