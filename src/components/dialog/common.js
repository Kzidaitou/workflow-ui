import { getRoles, getDepartments, getEmployees } from '@/api/index.js'
import $func from '@/utils/index.js'
import { ref } from 'vue'
export let searchVal = ref('')
export let departments = ref({
  titleDepartments: [],
  childDepartments: [],
  employees: [],
})
export let roles = ref({})
export let getRoleList = async () => {
  let {
    data: { list },
  } = await getRoles()
  roles.value = list
}
export let getDepartmentList = async (parentId = 0) => {
  let { data } = await getDepartments({ parentId })
  departments.value = data
}
export let getDebounceData = (event, type = 1) => {
  $func.debounce(async () => {
    if (event.target.value) {
      let data = {
        searchName: event.target.value,
        pageNum: 1,
        pageSize: 30,
      }
      if (type == 1) {
        departments.value.childDepartments = []
        let res = await getEmployees(data)
        departments.value.employees = res.data.list
      } else {
        let res = await getRoles(data)
        roles.value = res.data.list
      }
    } else {
      type == 1 ? await getDepartmentList() : await getRoleList()
    }
  })()
}
