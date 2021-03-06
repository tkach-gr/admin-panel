<template>
  <div class="menu">
    <RouterLink to="/">Go to home</RouterLink>
    <RouterLink to="/admin">Admin panel</RouterLink>
  </div>
  <RouterView></RouterView>
</template>

<script>


export default {
	name: 'App',
	data() {
		return {

		}
	},
	components: {

	},
	methods: {

	},
}
</script>

<style lang="scss">
.menu {
  display: flex;
}
</style>
