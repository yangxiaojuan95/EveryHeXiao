import * as warehouse from './warehouse'
import * as businessStore from './business-store'
import * as customer from './customer'
import * as staff from './staff'
import * as department from './department'
import * as goods from './goods'
import * as pickOrder from './pick-order'
import * as senderReceiver from './sender-receiver'
import * as driver from './driver'
import * as middleTransform from './middle-transform'
import * as onWayOrder from './onway-order'
import * as entruckOrder from './entruck-order'
import * as ckOrder from './ck-order'
import * as miniprogram from './miniprogram'
import * as refund from './refund-order'
import * as finance from './finance'
import * as expense from './expense'
import * as businessSystem from './business-system'
import * as approval from './approval'
import * as reports from './reports'
import * as planOrder from './plan-order'
import * as salesTemplate from './sales-template'

const APIS =  {
  ...warehouse,
  ...businessStore,
  ...customer,
  ...staff,
  ...department,
  ...goods,
  ...pickOrder,
  ...senderReceiver,
  ...driver,
  ...middleTransform,
  ...onWayOrder,
  ...entruckOrder,
  ...ckOrder,
  ...miniprogram,
  ...refund,
  ...finance,
  ...expense,
  ...businessSystem,
  ...approval,
  ...reports,
  ...salesTemplate,
  ...planOrder
}

export default APIS
