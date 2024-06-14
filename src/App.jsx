import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import wheather from './wheather'
const apiKey="7d8833b1736e90a49d361b2b3270dadc";

function App() {
    const [w,setw]=useState({
        icon:"https://openweathermap.org/img/wn/10d@2x.png",
        temp:20,
        humidity:"20",
        speed:"20"
})
const [city,setCity]=useState("")
function handleSubmit(event){
    event.preventDefault();
    const cityName = event.target.city.value;
    setCity(cityName);
    if(!cityName){
        alert("Please Enter city Name!!")
        return 
    }
    console.log('City:', cityName);
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid="+apiKey)
    .then(responce=>{
        if(!responce.ok){
            throw new Error()
        }
        return responce.json()
    })
    .then(data=>{
        setw({
            icon:"https://openweathermap.org/img/wn/"+data.w[0].icon+"@2x.png",
        temp:data.main.temp,
        humidity:data.main.humidity,
        speed:data.wind.speed
        });
        setCity(data.name);
    })
    .catch(error=>{
        alert("Unable to fetch the wheather forecast")
    })
}
  return (
    <div className="container my-5">
    <div className="mx-auto rounded border text-center text-white p-4"
        style={{
            backgroundColor: "#3B5FAB", width: "400px"
        }}>
        <h2 className="fw-bold mb-5">wheather Forecast</h2>
            <div className="container-fluid">
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input className="form-control me-2" type="search" placeholder="city" name="city" />
        <button type="submit" className="btn btn-outline-dark">Search</button>
      </form>
      {city && <p>Searching for city: {city}</p>}
            </div>
        <img src={w.icon} alt="wheather" />
        <h1 className='display-4 fw-medium'>{w.temp}°C</h1>
        <h1 className="mb-5">{city}</h1>
        <div className="row mb-3">
            <div className="col">
            <i className="bi bi-droplet-half"></i>
                Humidity<br/>{w.humidity}%
            </div>
            <div className="col">
            <i className="bi bi-wind"></i>Wind Speed<br/>{w.speed}kmph

            </div>
        </div>
    </div>
</div>
  )
}

export default App
