class MyStorage {
  name: string

  constructor(name: string) {
    this.name = name
  }

  get() {
    return localStorage.getItem(this.name)
  }

  set(val: string) {
    return localStorage.setItem(this.name, val)
  }

  remove() {
    localStorage.removeItem(this.name)
  }
}

export default MyStorage
