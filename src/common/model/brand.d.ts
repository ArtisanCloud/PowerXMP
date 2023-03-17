declare namespace API {

	export interface Brand extends Model {
		name: string
		extra: string
		description: string
		team: Employee[]
	}

}