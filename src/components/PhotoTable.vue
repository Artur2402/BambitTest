<script setup>
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-vue-next'
import { usePhotoStore } from '../stores/photoStore'

const photoStore = usePhotoStore()

const handleScroll = event => {
	const { scrollTop, scrollHeight, clientHeight } = event.target
	if (scrollTop + clientHeight >= scrollHeight - 10) {
		photoStore.loadMore()
	}
}

const sortIcon = column => {
	if (photoStore.sortColumn !== column || photoStore.sortOrder === null) {
		return ArrowUpDown
	}
	return photoStore.sortOrder === 'asc' ? ArrowUp : ArrowDown
}
</script>

<template>
	<div
		class="max-w-[600px] max-h-[600px] overflow-auto border rounded-lg shadow-md"
		@scroll="handleScroll"
	>
		<table class="w-full border-collapse border-spacing-0 relative">
			<thead class="bg-gray-200 sticky top-[-1px] z-10 shadow-md">
				<tr>
					<th
						class="border p-2 cursor-pointer hover:bg-gray-300"
						@click="photoStore.sortPhotos('id')"
					>
						<span class="inline-flex items-center gap-1">
							ID
							<component :is="sortIcon('id')" size="14" />
						</span>
					</th>
					<th
						class="border p-2 cursor-pointer hover:bg-gray-300"
						@click="photoStore.sortPhotos('albumId')"
					>
						<span class="inline-flex items-center gap-1">
							Альбом
							<component :is="sortIcon('albumId')" size="14" />
						</span>
					</th>
					<th
						class="border p-2 cursor-pointer hover:bg-gray-300"
						@click="photoStore.sortPhotos('title')"
					>
						<span class="inline-flex items-center gap-1">
							Название
							<component :is="sortIcon('title')" size="14" />
						</span>
					</th>
					<th class="border p-2">Ссылка</th>
					<th class="border p-2">Миниатюра</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="photo in photoStore.photos.slice(0, photoStore.loadedCount)"
					:key="photo.id"
				>
					<td class="border p-2">{{ photo.id }}</td>
					<td class="border p-2">{{ photo.albumId }}</td>
					<td class="border p-2 truncate max-w-[200px]" :title="photo.title">
						{{ photo.title }}
					</td>
					<td class="border p-2 text-blue-500 underline">
						<a :href="photo.url" target="_blank">Открыть</a>
					</td>
					<td class="border p-2">
						<img
							:src="`https://placehold.co/150x150?text=${photo.id}`"
							alt="Миниатюра"
							class="w-16 h-16 rounded border hover:scale-105 transition-transform"
						/>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
