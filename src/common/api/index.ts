import * as user from './user'

const API_HOST = import.meta.env.VITE_API_HOST
const API_URI_VERSION = import.meta.env.VITE_API_VERSION

export const restURL = (uri: string): string => {
	return API_HOST + '/' + API_URI_VERSION + '/' + uri
}

export default {
	user
}