//正则对象obj
export const REG = {
	"int": /^[\-|\+]?[0-9]*$/,
	"+int0": /^\+?[0-9][0-9]*$/,
	"+int": /^\+?[1-9][0-9]*$/,
	'-int': /^\-[1-9][0-9]*$/,
	'float': /^(-?\d+)(\.\d+)?/,
	'+float': /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
	'+floatwith2': /^(([1-9]\d*)|0)(\.\d{1,2})?$/, //包括0的浮点数，保留2位小数
	'-float': /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/,
	'ip': /^(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])$/,
	'email': /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]{2,5}$/,
	'mobile': /^(0|86|17951)?(1)[0-9]{10}$/,
	'idcard': /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
}

export const verify = function(type: keyof typeof REG, value: string) {
	if (REG[type]) {
		return REG[type].test(value)
	} else {
		console.warn('请选择正确的验证方式~')
		return false
	}
}
