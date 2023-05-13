import type {Model} from "@/common/model/index";




export interface Artisan extends Model {
	employeeId: number,
	name: string,
	level: number,
	gender: string,
	birthday: string,
	phoneNumber: string,
	coverURL: string,
	workNo: string,
	email: string,
	experience: string,
	specialty: string,
	certificate: string,
	address: string

}

