import type {DictionaryItem} from "@/common/model/dictionary";

export interface OptionsState {
	customerTypes: DictionaryItem[],
	productTypes: DictionaryItem[],
	productPlans: DictionaryItem[],
	approvalStatus: DictionaryItem[],
	salesChannels: DictionaryItem[],
	promoteChannels: DictionaryItem[],
	sourceTypes: DictionaryItem[],

	setup: boolean;

	// custom

}