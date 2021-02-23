<template>
	<Header/>
	<MainMenu @pagechanged="changePage"/>
	<div class="content-wrapper px-4 py-2">
		<Statistics class="page" v-if="currentPage === 'statistics'" />
		<BannersAndSliders class="page" v-else-if="currentPage === 'banners-sliders'" />
		<Films class="page" v-else-if="currentPage === 'films'" />
		<Cinemas class="page" v-else-if="currentPage === 'cinemas'" />
	</div>
</template>

<script>
import Header from './components/Header.vue';
import MainMenu from './components/MainMenu.vue';
import Statistics from './components/Pages/Statistics.vue';
import BannersAndSliders from './components/Pages/BannersAndSliders/BannersAndSliders.vue';
import Films from './components/Pages/Films/Films.vue';
import Cinemas from './components/Pages/Cinemas/Cinemas.vue';

export default {
	name: 'App',
	data() {
		return {
			currentPage: 'statistics',
		}
	},
	methods: {
		changePage(pageName) {
			this.currentPage = pageName
		}
	},
	components: {
		Header,
		MainMenu,
		Statistics,
		BannersAndSliders,
		Films,
		Cinemas
	}
}
</script>

<style lang="scss">
.content-wrapper {
	min-height: calc(100% - 57px);
	height: 1px;
}

.page {
	width: 100%;
	min-height: 100%;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
