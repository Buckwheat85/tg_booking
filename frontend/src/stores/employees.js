import {defineStore} from "pinia"
import axios from "axios"

export const useEmployeeStore = defineStore('employee', {
    state: () => ({
        employees: [],
    }),
    getters: {
        getEmployees(state) {
            return state.employees
        },
        getEmployeesSorted(state) {
            const arrEmployees = state.employees.slice()
            arrEmployees.sort(function (a, b) {
                let x = a.name.toLowerCase()
                let y = b.name.toLowerCase()
                if (x < y) {
                    return -1
                }
                if (x > y) {
                    return 1
                }
                return 0
            })
            return arrEmployees
        }
    },
    actions: {
        fetchEmployees() {
            axios.get("http://127.0.0.1:3001/api/employees").then((res)=>{
                this.employees = res.data
            }).catch((err)=>{
                console.error(err)
            })
        },
        async addEmployee(employeeName, profID) {
            await axios.post("http://127.0.0.1:3001/api/employees", {
                employeeName: employeeName,
                profID: profID
            })
                .then((res) => {
                    this.fetchEmployees()
                }).catch(() => {
                console.log('ошибка добавления сотрудника')
            })
        },
        async removeEmployee(empId) {
            await axios.delete("http://127.0.0.1:3001/api/employees", {
                data: {empId}
            }).then((res) => {
                this.fetchEmployees()
            }).catch(() => {
                console.log('ошибка удаления сотрудника')
            })
        },
    }
})