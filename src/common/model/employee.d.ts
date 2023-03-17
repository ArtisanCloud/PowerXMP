declare namespace API {

	export interface Employee extends Model {
		id: int64,
		account?: string,
		name: string,
		email?: string,
		mobilePhone?: string,
		gender?: int8,
		nickName?: string,
		desc?: string,
		avatar?: string,
		externalEmail?: string,
		depIds?: int64[],
		roles?: string[],
		position?: string,
		jobTitle?: string,
		isEnabled?: bool,

	}


}