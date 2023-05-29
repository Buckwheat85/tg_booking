import {defineStore} from "pinia"
import axios from "axios"
import {formatDateLikeISO} from "@/modules/date_operations.js"
import getFullApiPath from "@/modules/api-config"

const timetableApiPath = getFullApiPath("api/employee/timetable")
const splitsApiPath = getFullApiPath("api/splits")

export const useTimetableStore = defineStore('timetable', {
    state: () => ({
        timetable: [],
        splitDays: [],
    }),
    getters: {
        getTimetable(state) {
            return state.timetable
        },
        getSplitDays(state) {
            return state.splitDays
        }
    },
    actions: {
        fetchTimetable() {
            axios.get(timetableApiPath).then((res) => {
                this.timetable = res.data
            }).catch((err) => {
                console.error(err)
            })
        },
        fetchSplitDays(selectedDate) {
            axios.get(splitsApiPath, {
                params: {
                    selected_date: formatDateLikeISO(selectedDate)
                }
            }).then((res) => {
                this.splitDays = res.data
            }).catch((err) => {
                console.error(err)
            })
        },
        addTimetable(timetable) {
            axios.post(timetableApiPath, {
                data: timetable,
            }).then((res) => {
                this.fetchTimetable()
            }).catch((err) => {
                console.error(err)
            })
        },
        deleteTimetable(timetableToClearDays) {
            axios.delete(timetableApiPath, {
                data: timetableToClearDays
            }).then(() => {
                this.fetchTimetable()
            }).catch((err) => {
                console.error(err)
            })
        }
    }
})