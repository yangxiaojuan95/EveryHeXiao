import { SequenceTypeEnum } from "@/models/business/common/enum";
import { processdRequest } from "./request";

async function genCode(opts: { type: keyof typeof SequenceTypeEnum }) {
  const result = await processdRequest.get('/api/System/GetCodingRules', {
    type: SequenceTypeEnum[opts.type]
  })
  return result
}

export {
  genCode
}
