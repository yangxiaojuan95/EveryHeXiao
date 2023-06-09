class SpanSetter {
  
  spanLabels: string[] = []

  rows: number[] = []

  table!: AnyObject

  constructor(labels?: string[]) {
    if (labels) {
      this.addLabels(labels)
    }
  }

  setRows(rows: number[]) {
    this.rows = rows
    this.genSpanMethod()
  }

  setTable(table: AnyObject) {
    this.table = table
  }

  addLabels(labels: string[] | string) {
    this.spanLabels = this.spanLabels.concat(labels)
    this.genSpanMethod()
  }

  genSpanMethod() {
    const spanLabels = this.spanLabels
    const rows = this.rows
    const table = this.table

    if (!table || !spanLabels.length || !rows.length) {
      return false
    }

    const rowSpans: number[] = rows.reduce((result, number) => {
      const numbers = [number, ...Array.from<number>({length: number - 1}).fill(0)]
      return result.concat(...numbers)
    }, [] as number[])

    if (!table.props) {
      table.props = {}
    }

    table.props.spanMethod = function({ column, columnIndex, row, rowIndex }: AnyObject) {
      if (column.type === 'selection' || spanLabels.includes(column.label)) {
        return {
          rowspan: rowSpans[rowIndex],
          colspan: 1
        }
      } else {
        return {
          rowspan: 1,
          colspan: 1
        }
      }
    }
  }
}

export default SpanSetter
