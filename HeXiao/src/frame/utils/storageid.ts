class MyStorageId {
  RoleID: string

  constructor(RoleID: string) {
    this.RoleID = RoleID
  }

  get() {
    return localStorage.getItem(this.RoleID)
  }

  set(val: string) {
    return localStorage.setItem(this.RoleID, val)
  }

  remove() {
    localStorage.removeItem(this.RoleID)
  }
}

export default MyStorageId
