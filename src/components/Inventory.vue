<template>
    <section id="inventory" class="iv">
     
    </section>
</template>
<script>	
  if(!Date.now) { 
    Date.now = () => {
      return new Date().getTime();
    }     
  }
	export default {
		name: 'Inventory',
		data() {
			return {
				
			}
		},
		methods: {
		}
	}
</script>
<style lang="scss">
@import '@/assets/inventory.scss';
</style>