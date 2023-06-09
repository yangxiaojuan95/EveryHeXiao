/* 本地存储 */
export default class Storage {

  // 存储名称
  name: string;

  // 值
  value: string;

	constructor(name: string, value?: string) {
		this.name = name
    this.value = value ? value : ''
		this.refresh()
	}
	refresh() {
		return this.value = uni.getStorageSync(this.name)
	}
	setValue(val: string) {
		uni.setStorageSync(this.name, val)
		this.refresh()
	}
	getValue() {
		return this.value ? this.value : this.refresh()
	}
	remove() {
		this.value = ''
		uni.removeStorageSync(this.name)
	}
	
}