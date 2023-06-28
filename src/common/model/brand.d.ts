import type {Employee} from "@/common/model/employee";
import type {Model} from "@/common/model/index";


export interface Brand extends Model {
	name: string
	extra: string
	description: string
	team: Employee[]
}

