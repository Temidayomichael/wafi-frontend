import axios from 'axios'

// Api URL
export const apiUrl = 'http://localhost:8000'

export const axiosInstance = axios.create({
	baseURL: apiUrl,
})

axiosInstance.interceptors.request.use(
	async (config) => {
		const data = localStorage.getItem('user')
		const user = JSON.parse(data ?? '')
		// console.log('config', user.token)

		config.headers && (config.headers.Authorization = `Bearer ${user.token}`)

		return config
	},
	(error) => {
		console.log('error', error.message)
		return Promise.reject(error)
	},
)

axiosInstance.interceptors.response.use((response) => {
	console.log('response', response)
	if (response.status === 5000) {
		localStorage.removeItem('token')
		// window.location = '/login'
	}
	return response
})
