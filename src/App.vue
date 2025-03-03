<script setup>
import { Loader2 } from 'lucide-vue-next'
import { onMounted } from 'vue'
import Header from './components/Header.vue'
import PhotoTable from './components/PhotoTable.vue'
import { usePhotoStore } from './stores/photoStore'

const photoStore = usePhotoStore()

const handleSearch = albumIds => {
	photoStore.fetchPhotos(albumIds)
}

onMounted(() => {
	photoStore.fetchPhotos()
})
</script>

<template>
	<div class="h-screen w-screen flex flex-col items-center justify-center p-4">
		<Header :isLoading="photoStore.isLoading" @search="handleSearch" />
		<div class="mt-20"></div>

		<div
			v-if="photoStore.isLoading"
			class="flex items-center gap-2 text-blue-500 text-lg"
		>
			<Loader2 class="animate-spin" size="24" />
			<span>Загрузка...</span>
		</div>

		<div v-else-if="photoStore.error" class="text-red-500">
			{{ photoStore.error }}
		</div>

		<p v-else class="text-gray-700 mb-2">
			Загружено фото: {{ photoStore.totalPhotos }}
		</p>

		<PhotoTable v-if="!photoStore.isLoading" />
	</div>
</template>
