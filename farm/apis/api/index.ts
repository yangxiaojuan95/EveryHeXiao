import { baseUrl } from "@/config"
import Request from "@/frame/utils/request"

export let api = new Request({
	name: 'api',
	baseUrl: baseUrl,
	freeUrls: [
		'Account/UserInfo',
		'Equipment/GetEquipment',
		'Rfid',
		'Rfid/info'
	],
	cacheUrls: []
})

export let token = api.token
