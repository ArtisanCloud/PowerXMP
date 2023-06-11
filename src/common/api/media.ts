import type {ListMediasPageReply, ListMediasPageRequest} from "@/common/model/media";
import {APIMethodGet, restURL} from "@/common/api/index";
import {$http} from "@/common/api/http";

export const UriMPMarket =  'mp/market/'

export const MediaTypeProductShowcase = '_product_showcase'; // 产品展示
export const MediaTypeTutorialDemo = '_tutorial_demo'; // 教程和演示
export const MediaTypeCustomerReviews = '_customer_reviews'; // 买家评价
export const MediaTypeBrandStory = '_brand_story'; // 品牌故事
export const MediaTypePromotionalCampaigns = '_promotional_campaigns'; // 促销活动
export const MediaTypeSocialMediaPromotion = '_social_media_promotion'; // 社交媒体推广
export const MediaTypeTrialSamples = '_trial_samples'; // 试用和样品
export const MediaTypeRecommendations = '_recommendations'; // 推荐和搭配
export const MediaTypeUserGeneratedContent = '_user_generated_content'; // 用户生成内容

export const getMediasPageList = (data: ListMediasPageRequest): Promise<ListMediasPageReply> => {
	const url = restURL(UriMPMarket + "medias/page-list");

	return $http<ListMediasPageReply>({
		url: url,
		method: APIMethodGet,
		data: data,
	}).then((res) => {
		return res;
	});
};
