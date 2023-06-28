import * as user from './user'
import * as work from './work'
import * as showcase from './showcase'
import * as brandStory from './brandStory'

// export const PathHomePage = '/pages/index/index'
export const PathHomePage = '/pages/index-mall/index-mall'

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
	return APIHost + '/resource/static/mp/' + uri
}

export const mpStaticURL = (uri: string): string => {
	if (uri==undefined){
		return ""
	}
	return '/static/images/temp/' + uri
}



export default {
	user,
	work,
	showcase,
	brandStory,
}