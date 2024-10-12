import React, { FC, useState, useEffect } from 'react'
import { WiCelsius } from "react-icons/wi";

interface Props {
    cityName: any,
    temp: any,
    desc: any,
    load: boolean
}

const Weather: FC<Props> = ({ cityName, temp, desc, load }) => {
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
                // <div className="weather-container">
                //     <h1 className="weather-city-name">{cityName}</h1>
                //     <div className='weather-temp'>
                //         <h1>{temp}</h1>
                //         <WiCelsius />
                //     </div>
                //     <img src={img} alt="description" id="description"/>
                // </div>
                <div className="card bg-dark" style={{width: "300px", margin: "20px", color: "#fff"}}>
                    <div className="card-header" style={{fontSize: "30px"}}>
                        {cityName}
                    </div>
                    <div className="card-body d-flex">
                        <div className='card-title d-flex' style={{position: "relative"}}>
                        <div style={{fontSize: "60px"}}>{temp.toString().length > 1 ? temp : (
                            <>
                                <span style={{opacity: '0'}}>.</span>
                                <span>{temp}</span>
                            </>
                        )}</div>
                            <WiCelsius id="cel" style={{fontSize: "65px", position: "absolute", left: "50px", top: "10px"}} />
                        </div>
                        <img src={img} style={{position: "absolute", left: "95px"}} />
                    </div>
                    {/* <ul className="list-group list-group-flush">
                        <li className="list-group-item list-group-item-dark"></li>
                        <li className="list-group-item list-group-item-dark">A second item</li>
                        <li className="list-group-item list-group-item-dark">A third item</li>
                    </ul> */}
                </div>
            }
            {
                load && (
                    <button className="btn btn-primary" type="button" disabled style={{margin: "20px"}}>
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span className="visually-hidden" role="status">Loading...</span>
                    </button>
                )
            }
        </section>
    )
}
export default Weather