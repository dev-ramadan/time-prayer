import React,{useEffect, useState} from 'react'
import './App.css'
import Prayer from './prayer/Prayer'
function App() {
  const [prayer,setprayer]=useState({})
  const [time,settime]=useState("")
  const [city,setCity] = useState("Cairo")

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/11-11-2024?city=${city}&country=egypt&method=8`)
        const data_p = await response.json()
        setprayer(data_p.data.timings)
        settime(data_p.data.date.gregorian.date)
      }catch(error){
        console.log(error);
      }
      
    }
    fetchData()
  },[city]);

const format = (time) => {
  if(!time){
    return '00:00'
  }
  let [hours , munit] = time.split(':').map(Number);
  const format = hours <= 12 ? 'AM' : 'PM';
  hours = hours % 12 || 12 ;
  return `${format} ${hours}:${munit < 10 ? '0' + munit : munit}`;
}

    
  const citys = [
    {names : "القاهرة" , value : "Cairo"},
    {names : "الاسكندرية" , value : "Alexandria"},
    {names : "الجيزة" , value : "Giza"},
    {names : "المنصورة" , value : "Mansoura"},
    {names : "اسوان" , value : "Aswan"},
    {names : "الاقصر" , value : "Luxor"}
  ]
 
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-12">
          <div className="top-sc">
          <div className="city">
            <h3>المدينة</h3>

            <select  onChange={(e)=>setCity(e.target.value)}>
              {
               citys.map((city)=>(
                <option key={city.value} value={city.value}>{city.names} </option>
               ))      
              }
            </select>
          </div>
          <div className="date">
            <h3>التاريخ</h3>
            <h3>{time}</h3>
          </div>
        </div>
        <Prayer name="الفجر" time= {format(prayer.Fajr)}/>
        <Prayer name="الظهر" time={ format(prayer.Dhuhr)}/>
        <Prayer name="العصر" time={format(prayer.Asr)}/>
        <Prayer name="المغرب" time={format(prayer.Maghrib)}/>
        <Prayer name="العشاء" time={format(prayer.Isha)}/>
          </div>
        </div>
      </div>
    </section>

  )
}

export default App
