declare module "*.vue" {
	import Vue from 'vue'
	export default Vue
}

declare module 'uni.scss'

interface PlainObject {
	[key: string]: any;
}

interface UniDetailValueEvent<T = number> {
	detail: {
		value: T;
	}
}

interface PageData<T = any> {
	total: number;
	data: T;
}