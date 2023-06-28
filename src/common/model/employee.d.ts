export interface Employee extends Model {
	id: number,
	account?: string,
	name: string,
	email?: string,
	mobilePhone?: string,
	gender?: number,
	nickName?: string,
	desc?: string,
	avatar?: string,
	externalEmail?: string,
	depIds?: number[],
	roles?: string[],
	position?: string,
	jobTitle?: string,
	isEnabled?: boolean,

}
