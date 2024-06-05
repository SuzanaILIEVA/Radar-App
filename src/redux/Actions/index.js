import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../constants";

export const getFlights = createAsyncThunk("flights/getFlights",async()=>{
    // api istegi atildi 
  const res =  await axios.request(options)
//   console.log(res.data.aircraft);

  // dizi icindeki dizileri nesneye cevirdik 
 const formatted = res.data.aircraft.map((item) => ({
    id:item[0],
    code:item[1],
    lat:item[2],
    lng:item[3]
  })) 
//   console.log(formated);

  //*action'un payload'i olarak formatlanan veriyi ekledik
  return formatted;
})
