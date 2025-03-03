<script setup>
import { Loader2, Search } from 'lucide-vue-next'
import { ref } from 'vue'

defineProps({ isLoading: Boolean })

const albumInput = ref('')
const emit = defineEmits(['search'])

const searchPhotos = () => {
	const albumIds = albumInput.value
		.split(' ')
		.map(id => parseInt(id))
		.filter(id => !isNaN(id))

	emit('search', albumIds)
}
</script>

<template>
	<header
		class="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-center"
	>
		<div class="flex gap-2 w-[600px]">
			<input
				v-model="albumInput"
				placeholder="Введите ID альбомов (1 2 3)"
				class="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<button
				@click="searchPhotos"
				:disabled="isLoading"
				class="bg-blue-500 text-white px-4 py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 hover:bg-blue-600 flex items-center gap-2"
			>
				<Loader2 v-if="isLoading" class="animate-spin" size="20" />
				<Search v-else size="20" />
				<span>Поиск</span>
			</button>
		</div>
	</header>
</template>
