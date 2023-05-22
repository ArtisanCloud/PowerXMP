import {defineStore} from 'pinia';
import type {DictionaryItem} from "@/common/model/dictionary";

import type {OptionsState} from "@/store/modules/data-dictionary/type";
import {listDictionaryItems} from "@/common/api/dictionary";
import {
	ApprovalStatusDDType,
	CustomerTypesDDType,
	ProductPlanDDType,
	ProductTypesDDType, PromoteChannelsDDType, SalesChannelsDDType, SourceTypesDDType
} from "@/common/api/dictionary";



const useOptionsStore = defineStore('options', {
	state: (): OptionsState => ({
		customerTypes: [],
		productTypes: [],
		productPlans: [],
		approvalStatus: [],
		salesChannels: [],
		promoteChannels: [],
		sourceTypes: [],

		setup: false,

		// custom

	}),

	getters: {},

	actions: {

		GetOptionById(options: DictionaryItem[], id: number): DictionaryItem | undefined {
			for (let i = 0; i < options.length; i += 1) {
				// console.log(options[i].id, id)
				if (options[i].id === id) {
					return options[i]
				}
			}
			return undefined
		},

		GetOptionByKey(options: DictionaryItem[], key: string): DictionaryItem | undefined {
			for (let i = 0; i < options.length; i += 1) {
				// console.log(options[i].key, key)
				if (options[i].key === key) {
					return options[i]
				}
			}
			return undefined
		},

		async fetchCustomerTypesOptions() {
			try {
				const res = await listDictionaryItems({type: CustomerTypesDDType});
				this.customerTypes = res.list;
				// console.log(dictionaryTypeList)
			} finally {
				// console.log("fetch approval status options")
			}
		},

		async fetchProductTypeOptions() {
			try {
				const res = await listDictionaryItems({type: ProductTypesDDType});
				this.productTypes = res.list;
				// console.log(dictionaryTypeList)
			} finally {
				// console.log("fetch product type options")
			}
		},

		async fetchProductPlanOptions() {
			try {
				const res = await listDictionaryItems({type: ProductPlanDDType});
				this.productPlans = res.list;
				// console.log(dictionaryTypeList)
			} finally {
				// console.log("fetch product plan options")
			}
		},


		async fetchApprovalStatusOptions() {
			try {
				const res = await listDictionaryItems({type: ApprovalStatusDDType});
				this.approvalStatus = res.list;
				// console.log(dictionaryTypeList)
			} finally {
				// console.log("fetch approval status options")
			}
		},

		async fetchSalesChannelsOptions() {
			try {
				const res = await listDictionaryItems({type: SalesChannelsDDType});
				this.salesChannels = res.list;
				// console.log(this.salesChannels)
			} finally {
				// console.log("fetch approval status options")
			}
		},

		async fetchPromoteChannelsOptions() {
			try {
				const res = await listDictionaryItems({type: PromoteChannelsDDType});
				this.promoteChannels = res.list;
				// console.log(dictionaryTypeList)
			} finally {
				// console.log("fetch approval status options")
			}
		},

		async fetchSourceTypesOptions() {
			try {
				const res = await listDictionaryItems({type: SourceTypesDDType});
				this.sourceTypes = res.list;
				// console.log(dictionaryTypeList)
			} finally {
				// console.log("fetch approval status options")
			}
		},


		async fetchAllOptions() {
			await this.fetchCustomerTypesOptions();
			await this.fetchProductTypeOptions();
			await this.fetchProductPlanOptions();
			await this.fetchApprovalStatusOptions();
			await this.fetchSalesChannelsOptions();
			await this.fetchPromoteChannelsOptions();
			await this.fetchSourceTypesOptions();
			this.setup = true;
		},

		isSetup() {
			return this.setup;
		},

		// custom

	}
})

export default useOptionsStore;
