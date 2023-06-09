
/**
 * 拉起上传文件
 */
export const triggerImportFile = (cb: (files: FileList) => void, accept: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') => {
  let input: null | HTMLInputElement = document.createElement('input')
  input.type = 'file'
  input.accept = accept
  input.onchange = function() {
    if (input?.files) {
      cb(input.files)
    }
    input = null
  }
  input.click()
}
