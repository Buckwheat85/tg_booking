//accepts date as string or date object
function formatDateLikeISO(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

    if (month.length < 2)
        month = '0' + month
    if (day.length < 2)
        day = '0' + day

    return [year, month, day].join('-')
}

function formatDateTimeForSQLQuery(date) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth(); // getMonth returns a zero-based index of the month: 0-11
    const day = date.getUTCDate(); // 0 - 31
    const hours = date.getUTCHours(); // 0 - 23
    const minutes = date.getUTCMinutes(); // 0 - 59
    const seconds = date.getUTCSeconds(); // 0 - 59
    const addZero = (num) => `${num}`.padStart(2, '0');
    const formatted =
        year +
        '-' +
        addZero(month + 1) +
        '-' +
        addZero(day) +
        ' ' +
        addZero(hours) +
        ':' +
        addZero(minutes) +
        ':' +
        addZero(seconds);

    return formatted
}

function _formatDateTimeForSQLQuery(date) {


    let d = new Date(date.toISOString())
    let t = addZero(d.getHours()) + ':' +
        addZero(d.getMinutes()) + ':' +
        addZero(d.getSeconds())
    d = formatDateLikeISO(d)
    return d + " " + t

}

function addZero(num) {
    if (num >= 0 && num <= 9) {
        return '0' + num
    } else {
        return num
    }
}

//accepts Date object
function dateToHourMinute(date) {
    let h = date.getHours()
    let m = date.getMinutes()

    if (m < 10) {
        m = "0" + m
    }
    return h + ":" + m
}

//accepts Date object. Returns start of d month
//when called with no arguments, returns the start of the current month
function getStartMonth(d = null) {
    if (d == null) {
        d = new Date()
    }
    d.setDate(1)
    d.setHours(0, 0, 0, 0)

    return d
}

//accepts Date object
function getNumberOfDaysInMonth(d) {
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
}

function getWeekDayName(d) {
    const day = d.getDay()
    switch (day) {
        case 1:
            return 'пн'
            break
        case 2:
            return 'вт'
            break
        case 3:
            return 'ср'
            break
        case 4:
            return 'чт'
            break
        case 5:
            return 'пт'
            break
        case 6:
            return 'сб'
            break
        case 0:
            return 'вс'
            break
        default:
            return ''
    }
}

function getMonthName(d) {
    const m = d.getMonth()
    switch (m) {
        case 0:
            return 'Январь'
            break
        case 1:
            return 'Февраль'
            break
        case 2:
            return 'Март'
            break
        case 3:
            return 'Аперль'
            break
        case 4:
            return 'Май'
            break
        case 5:
            return 'Июнь'
            break
        case 6:
            return 'Июль'
            break
        case 7:
            return 'Август'
            break
        case 8:
            return 'Сентябрь'
            break
        case 9:
            return 'Октябрь'
            break
        case 10:
            return 'Ноябрь'
            break
        case 11:
            return 'Декабрь'
            break
        default:
            return ''
    }
}

function isWeekend(d) {
    const dayOfWeek = d.getDay()
    return (dayOfWeek === 6) || (dayOfWeek === 0)
}

function getMonthYearName(d) {
    return getMonthName(d) + " " + d.getFullYear()
}

export {
    formatDateLikeISO,
    formatDateTimeForSQLQuery,
    dateToHourMinute,
    getStartMonth,
    getNumberOfDaysInMonth,
    getWeekDayName,
    getMonthName,
    getMonthYearName,
    isWeekend
}