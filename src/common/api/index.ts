import * as user from './user'
import * as work from './work'
import * as showcase from './showcase'
import * as brandStory from './brandStory'

const APIHost = import.meta.env.VITE_APIHost
const APIURIVersion = import.meta.env.VITE_API_VERSION

export const DefaultPageSize = 10;
export const MaxPageSize = 99;

export const
	APIMethodPost = 'POST',
	APIMethodGet = 'GET',
	APIMethodPut = 'PUT',
	APIMethodDelete = 'DELETE'


export const restURL = (uri: string): string => {
	return APIHost + '/' + APIURIVersion + '/' + uri
}

export const staticURL = (uri: string): string => {
	return APIHost + '/static/images/' + uri
}

export default {
	user,
	work,
	showcase,
	brandStory,
}