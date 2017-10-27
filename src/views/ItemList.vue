<template>
  <div class="item-list">
  <item
  v-for="item in displayedItems"
  :key="item.id"
  :item="item"
  />
  </div>
</template>

<script>
import Item from '../components/Item.vue'

export default {
  name: 'item-list',
  components: {
    Item
  },

  beforeMount () {
    this.loadItems()
  },

  data () {
    return {
      displayedItems: null
    }
  },

  methods: {
    loadItems () {
      this.$bar.start()
      this.$store.dispatch('FETCH_LIST_DATA', {
        type: 'top'
      }).then(() => {
        this.displayedItems = this.$store.getters.activeItems
        this.$bar.finish()
      })
    }
  }
}
</script>
