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
import {mapActions} from 'vuex'
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
    ...mapActions(['fetchListData']),
    loadItems () {
      this.$bar.start()
      this.fetchListData({
        type: 'top'
      }).then(() => {
        this.displayedItems = this.$store.getters.activeItems
        this.$bar.finish()
      })
    }
  }
}
</script>
