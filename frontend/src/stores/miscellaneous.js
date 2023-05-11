import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";

//если нет сохраненного параметра lastVuecalDate, lastDate принимает значение текущей даты
const lastDate = (localStorage.getItem('lastVuecalDate') != null ? new Date(localStorage.getItem('lastVuecalDate')) : new Date())

export const useMiscStore = defineStore('misc', () => {

    const lastCalendarDate = ref(lastDate)

    function setLastCalendarDate(date) {
        lastCalendarDate.value = date
        localStorage.setItem('lastVuecalDate', date)
    }

    return {lastCalendarDate,setLastCalendarDate}
})

//тоже самое на optionsAPI
// export const useMiscStore = defineStore('misc', {
//     state: () => ({
//         lastCalendarDate: lastDate
//     }),
//     getters: {
//         getLastCalendarDate(state) {
//             return state.lastCalendarDate
//         },
//     },
//     actions: {
//         setLastCalendarDate(date) {
//             this.lastCalendarDate = date
//
//             localStorage.setItem('lastVuecalDate', date)
//         }
//     }
// })