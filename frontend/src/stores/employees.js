import {defineStore} from "pinia"
import axios from "axios"
import getFullApiPath from "@/modules/api-config"

const employeesApiPath = getFullApiPath("api/employees")

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
            axios.get(employeesApiPath).then((res)=>{
                this.employees = res.data
            }).catch((err)=>{
                console.error(err)
            })
        },
        async addEmployee(employeeName, profID) {
            await axios.post(employeesApiPath, {
                employeeName: employeeName,
                profID: profID
            })
                .then((res) => {
                    this.fetchEmployees()
                }).catch((err) => {
                console.error(err)
            })
        },
        async removeEmployee(empId) {
            await axios.delete(employeesApiPath, {
                data: {empId}
            }).then((res) => {
                this.fetchEmployees()
            }).catch((err) => {
                console.error(err)
            })
        },
    }
})