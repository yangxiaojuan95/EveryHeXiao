/**
 * number
 */

import { _addUnit } from "./common";

 export default function install() {
  Number.prototype._addUnit = _addUnit
}
