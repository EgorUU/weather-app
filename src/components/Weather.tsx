import React, { FC, useState, useEffect } from 'react'
import { WiCelsius } from "react-icons/wi";

interface Props {
    cityName: any,
    temp: any,
    desc: any
}

const Weather: FC<Props> = ({ cityName, temp, desc }) => {
    const [img, setImg] = useState('')
    useEffect(() => {
        switch(desc) {
            case 'clear sky':
                
                setImg(`https://openweathermap.org/img/wn/01d@2x.png`)
                break;
            case 'few clouds':
                
                setImg(`https://openweathermap.org/img/wn/02d@2x.png`)
                break;
            case 'scattered clouds':
                
                setImg(`https://openweathermap.org/img/wn/03d@2x.png`)
                break;
            case 'broken clouds':
                
                setImg(`https://openweathermap.org/img/wn/04d@2x.png`)
                break;
            case 'shower rain':
                
                setImg(`https://openweathermap.org/img/wn/09d@2x.png`)
                break;
            case 'rain':
                
                setImg(`https://openweathermap.org/img/wn/10d@2x.png`)
                break;
            case 'thunderstorm':
                
                setImg(`https://openweathermap.org/img/wn/11d@2x.png`)
                break;
            case 'snow':
                
                setImg(`https://openweathermap.org/img/wn/13d@2x.png`)
                break;
            case 'mist':
                
                setImg(`https://openweathermap.org/img/wn/50d@2x.png`)
                break;
        }
    }, [desc])
    return (
        <section className="weather">
            {
                desc && 
                <div className="weather-container">
                    <h1 className="weather-city-name">{cityName}</h1>
                    <div className='weather-temp'>
                        <h1>{temp}</h1>
                        <WiCelsius />
                    </div>
                    <img src={img} alt="description" id="description"/>
                </div>
            }
        </section>
    )
}
export default Weather