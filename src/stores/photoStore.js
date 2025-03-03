import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const usePhotoStore = defineStore('photoStore', () => {
	const photos = ref([])
	const originalPhotos = ref([])
	const isLoading = ref(false)
	const error = ref(null)
	const loadedCount = ref(30)
	const sortColumn = ref(null)
	const sortOrder = ref(null)

	const fetchPhotos = async (albumIds = []) => {
		isLoading.value = true
		error.value = null

		try {
			let url = 'https://jsonplaceholder.typicode.com/photos'
			if (albumIds.length) {
				url += '?' + albumIds.map(id => `albumId=${id}`).join('&')
			}

			const response = await axios.get(url)

			photos.value = [...response.data]
			originalPhotos.value = [...response.data]
			loadedCount.value = 30
			sortColumn.value = null
			sortOrder.value = null
		} catch (err) {
			error.value = 'Ошибка загрузки данных'
		} finally {
			isLoading.value = false
		}
	}

	const sortPhotos = column => {
		if (sortColumn.value === column) {
			if (sortOrder.value === 'asc') {
				sortOrder.value = 'desc'
			} else if (sortOrder.value === 'desc') {
				sortOrder.value = null
				photos.value = [...originalPhotos.value]
				return
			} else {
				sortOrder.value = 'asc'
			}
		} else {
			sortColumn.value = column
			sortOrder.value = 'asc'
		}

		photos.value = [...photos.value].sort((a, b) => {
			if (a[column] < b[column]) return sortOrder.value === 'asc' ? -1 : 1
			if (a[column] > b[column]) return sortOrder.value === 'asc' ? 1 : -1
			return 0
		})

		loadedCount.value = 30
	}

	const loadMore = () => {
		if (loadedCount.value < photos.value.length) {
			loadedCount.value += 20
		}
	}

	return {
		photos,
		originalPhotos,
		isLoading,
		error,
		loadedCount,
		fetchPhotos,
		sortPhotos,
		loadMore,
		totalPhotos: computed(() => loadedCount.value),
		sortColumn,
		sortOrder,
	}
})
