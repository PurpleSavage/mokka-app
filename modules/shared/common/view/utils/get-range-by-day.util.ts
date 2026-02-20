import { DateFormatter } from "./date-formatter.util"

export function getRangeByDay(day:number){
    const startDay = new Date()
    const finalDay = new Date()
    startDay.setDate(finalDay.getDate()-day)
    return `${DateFormatter.formatLong(startDay)} to ${DateFormatter.formatLong(finalDay)}`
   
}