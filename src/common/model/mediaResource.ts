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

export interface MediaSet {
	coverImage?: MediaResource;
	coverImages?: MediaResource[];
	detailImages?: MediaResource[];
	coverImageId?: number;
	coverImageIds?: number[];
	detailImageIds?: number[];
}