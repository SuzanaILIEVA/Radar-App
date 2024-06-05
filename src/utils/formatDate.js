import moment from "moment"


const formatDate =(unix_time)=>{
    // console.log(unix_time);

    const date = new Date(unix_time * 1000)
    // console.log(date);

    return moment(date).calendar()

}
export default formatDate;