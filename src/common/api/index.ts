import * as user from './user'
import * as work from './work'
import * as showcase from './showcase'
import * as brandStory from './brandStory'

const API_HOST = import.meta.env.VITE_API_HOST
const API_URI_VERSION = import.meta.env.VITE_API_VERSION

export const
	API_METHOD_POST = 'POST',
	API_METHOD_GET = 'GET',
	API_METHOD_PUT = 'PUT',
	API_METHOD_DELETE = 'DELETE'


export const restURL = (uri: string): string => {
	return API_HOST + '/' + API_URI_VERSION + '/' + uri
}

export default {
	user,
	work,
	showcase,
	brandStory,
}