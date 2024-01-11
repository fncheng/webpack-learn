<template>
  <div>
    <el-table
      ref="table"
      :data="tempList"
      height="300"
      class="table"
      row-class-name="rows"
      row-key="id"
      @select="selectSingle"
      @select-all="selectAll"
      @selection-change="selectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="date" label="Date" width="120"></el-table-column>
      <el-table-column prop="name" label="Name" width="120"></el-table-column>
      <el-table-column prop="amount" label="Amount"></el-table-column>
    </el-table>

    <el-descriptions border>
      <el-descriptions-item :label-style="{ width: '30%' }">
        <template slot="label">
          <i class="el-icon-tickets"></i>
          Total
        </template>
        {{ total }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
const maxRow = 5
export default {
  data() {
    return {
      tableData: [],
      tempList: [],
      rowHeight: 0,
      start: 0,
      names: [],
      widths: [],
      scrolling: false,
      totalSelection: [],
      total: 0
    }
  },
  computed: {
    end() {
      return this.start + maxRow + 1
    }
  },
  created() {
    for (let i = 1; i <= 1000; i++) {
      this.tableData.push({
        id: i,
        date: this.getDate(Date.now(), i),
        name: 'Name',
        amount: i * 10
      })
    }
    this.tempList = this.tableData.slice(this.start, this.end)
  },
  mounted() {
    this.$nextTick(() => {
      this.rowHeight = document.querySelector('.rows').clientHeight
      document.querySelector('tbody').style.height = `${this.rowHeight * this.tableData.length}px`

      this.tableWrapper = document.querySelector('.el-table__body-wrapper')
      this.tableWrapper.style.height = `${this.rowHeight * maxRow}px`
      this.handleResize()
      this.tableWrapper.addEventListener('scroll', this.handleScroll, false)
    })
    window.addEventListener('resize', this.handleResize, false)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize, false)
    this.tableWrapper.removeEventListener('scroll', this.handleScroll, false)
  },
  methods: {
    getDate(base, diff) {
      const date = new Date(base)
      date.setDate(date.getDate() - diff)
      const y = date.getFullYear()
      const m = date.getMonth() + 1
      const d = date.getDate()
      return `${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`
    },
    handleResize() {
      this.$nextTick(() => {
        this.names = []
        this.widths = []
        for (const item of document.querySelectorAll('.el-table__body colgroup col')) {
          console.log('item: ', item)
          // names存储col中的name属性，widths则存储col的width属性
          this.names.push(item.getAttribute('name'))
          this.widths.push(item.getAttribute('width'))
        }
        // setWidths和setRows分别给虚拟列表中的每个单元格设置宽度和top、height属性
        this.setWidth()
        this.setRows()
      })
    },
    // set columns widths
    setWidth() {
      for (const [index, width] of this.widths.entries()) {
        for (const item of document.querySelectorAll('.' + this.names[index])) {
          item.style.width = `${width}px`
        }
      }
    },
    setRows() {
      for (const [index] of this.tempList.entries()) {
        const rows = document.querySelectorAll('.rows')
        console.log('rows: ', rows)
        rows[index].style.top = `${(index + this.start) * this.rowHeight}px`
        rows[index].style.height = `${this.rowHeight}px`
      }
    },
    handleScroll(el) {
      // 取整，~~效率比Math.floor还要高
      const start = ~~(el.target.scrollTop / this.rowHeight)
      console.log('start: ', start)
      // 若陣列一樣則不用重繪表格，減少畫面更新次數
      if (start === this.start) return

      this.start = start
      this.scrolling = true
      // 更新截取的数据
      this.tempList = this.tableData.slice(this.start, this.end)
      this.$nextTick(() => {
        this.setWidth()
        this.setRows()

        // 这部分是处理第一列checkbox勾选状态回显的
        // 畫面重新回到之前勾選的選項時，需勾選回去
        const selected = this.tempList.filter((item) => this.totalSelection.includes(item.id))
        for (const row of selected) this.$refs.table.toggleRowSelection(row, true)

        // 若畫面上沒有勾選選項，但實際上有勾選時，需手動更改表頭checkbox的狀態
        if (this.totalSelection.length && !selected.length) {
          document.querySelector('th .el-checkbox__input').classList.add('is-indeterminate')
        }
      })
    },
    selectSingle(selection, row) {
      const found = selection.find((item) => item.id === row.id)
      if (found) {
        this.totalSelection.push(row.id)
        this.total += row.amount
      } else {
        this.totalSelection = this.totalSelection.filter((item) => item !== row.id)
        this.total -= row.amount
      }
      this.single = true
    },
    selectAll(selection) {
      if (selection.length) {
        this.totalSelection = this.tableData.map((item) => item.id)
        this.total = this.tableData.reduce((acc, cur) => acc + cur.amount, 0)
      } else {
        this.totalSelection = []
        this.total = 0
      }
    },
    selectionChange(selection) {
      if (this.scrolling) {
        this.scrolling = false
        return
      }

      if (!selection.length && this.totalSelection.length !== this.tableData.length) {
        // 若是手動更改表頭checkbox的狀態，再點擊全選會清空全部選項，應選取全部選項
        if (!this.single) {
          this.$refs.table.toggleAllSelection()
        } else {
          this.$nextTick(() => {
            // 若畫面上沒有勾選選項，但實際上有勾選時，需手動更改表頭checkbox的狀態
            if (this.totalSelection.length) {
              document.querySelector('th .el-checkbox__input').classList.add('is-indeterminate')
            }
          })
        }
        return
      }
      this.single = false

      this.$nextTick(() => {
        // 若當前顯示的欄位為全選，但並非真正全部欄位的全選，則手動更改表頭checkbox的狀態
        if (
          this.totalSelection.length !== this.tableData.length &&
          selection.length === this.tempList.length
        ) {
          document.querySelector('th .el-checkbox').classList.remove('is-checked')
          document
            .querySelector('th .el-checkbox__input')
            .classList.replace('is-checked', 'is-indeterminate')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.table {
  width: 100%;
  margin-bottom: 20px;
  ::v-deep .rows {
    position: absolute;
  }
  ::v-deep .el-table__body-wrapper {
    overflow-y: auto;
  }
  ::v-deep tbody {
    position: relative;
  }
}
</style>
