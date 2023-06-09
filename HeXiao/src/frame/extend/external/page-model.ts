import { App } from 'vue'

import '@juzhenfe/page-model/dist/index.min.css'

import PageModel from '@juzhenfe/page-model'

import { processdRequest } from '@/utils/request'

export default {
  install(app: App) {
    app.use(PageModel, {
      request: processdRequest,
      patches: [
        function(config: PageModel.Config) {
          return config
        }
      ],
      config: {
        getMethod: 'post',
        addMethod: 'post',
        updMethod: 'post',
        table: {
          showTools: false,
          props: {
            headerCellStyle() {
              return {
                textAlign: 'center'
              }
            },
            cellStyle() {
              return {
                textAlign: 'center',
                fontSize: '13px',
                color: '#000'
              }
            }
          },
          pagination: {
            pageSize: 20
          },
        }
      }
    })
  }
}
