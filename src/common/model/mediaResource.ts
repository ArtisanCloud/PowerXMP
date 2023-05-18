import type {Model} from "@/common/model/index";

export interface MediaResource extends Model {
	filename: string;
	size: number;
	url: string;
	bucketName: string;
	isLocalStored: boolean;
	contentType: string;
	resourceType: string;
}