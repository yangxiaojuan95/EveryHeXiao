import MyStorage from "./storage"
import MyStorageId from "./storageid"

const token_name = 'token'
const token_id = 'roleID'
const tokenStorage = new MyStorage(token_name)
const tokenStorageId = new MyStorageId(token_id)

export default tokenStorage
