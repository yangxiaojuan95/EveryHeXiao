export {}

import { showModal, validForm } from '@/frame/extend/prototype'

declare module 'vue/types/vue' {
	interface Vue {
		validForm: typeof validForm;
		showModal: typeof showModal;

		// mixin的table
		table: {
			requestData: any;
			configData: any;
			_originConfig: any;
			_originParams: any;
			_gid: number;
			list: any[];
			total: number;
			status: {
				isAll: boolean;
				isNone: boolean;
				isLoading: boolean;
				isError: boolean;
				isTimeout: boolean;
			};
		}
		getPageList: {
			(): Promise<any>;
		}
		resetList: {
			(): Promise<any>;
		}
		checkTableIsNone: {
			(): void;
		}
		resetParams: {
			(): void;
		}
		setDeafaultParams: {
			(): void;
		}
		addParams: {
			(data: any): void;
		}
		changeUrl: {
			(api: any): void;
		}
		scrollToBottom: {
			(data: any): void;
		}
		updateList: {
			(filterKeyParams: any, valueParams: any): vold;
		}

	}
}
