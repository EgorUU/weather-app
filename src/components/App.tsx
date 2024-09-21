import React, { FC, useState, useEffect } from 'react'
import { ToastContainer, Toast } from 'react-bootstrap'
// Компоненты

import Header from './Header'
import Weather from './Weather'


import axios from 'axios'

type TypePushCity = (a: any) => any

const App: FC = () => {
    const [cities, setCities] = useState<string[][]>([[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],])
    const alphabet = (letter: any) => {
        const firstEl = letter.toLowerCase()
        console.log(firstEl.charCodeAt(0) - 'a'.charCodeAt(0) + 1)
        return firstEl.charCodeAt(0) - 'a'.charCodeAt(0) + 1
        
    }   
    const [choices, setChoices] = useState<string[]>([])
    const [showError, handleShowError] = useState<boolean>(false)
    // Получение данных о погоде по городу
    const [city, setCity] = useState<string>('')
    const getWeather = (city: string) => {
        const userAPI: string = 'ce6fe1bbe88ecc076e0f13534d97e475'
        const api: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${userAPI}&lang=en`
        console.log('Данные получены по адресу : ', api)
        return new Promise((res, rej) => {
            axios(api).then((obj) => {
                res(obj.data)
                deleteLoad()
            }).catch((error) => {
                console.error('Ошибка при получении данных', error)
                handleShowError(true)
                deleteLoad()
            })
        }).then((obj: any) => {
            setCityName(obj.name)
            setTemp(Math.round(obj.main.temp - 273.15))
            setDesc(obj.weather[0].description)
            console.log('Объект получен', obj)
        })
        .catch((error) => console.error('Ошибка', error))
    }

    //
    const [desc, setDesc] = useState<string>('')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: any = await axios('./json/city.list.json')
                pushCity(response.data)
                
            } 
            catch (error) {
                console.error('Error')
            };
        }
        fetchData();
    }, []);




    const pushCity: TypePushCity = (obj) => {
        setCities((prevCities: any) => {
            // Копируем предыдущий массив городов, чтобы не мутировать его напрямую
            const newCities = [...prevCities];
    
            obj.forEach((el: any) => {
                setTimeout(() => {
                    const firstLetter = el.name[0].toLowerCase();
    
                    const index = firstLetter.charCodeAt(0) - 'a'.charCodeAt(0);
                    if (index >= 0 && index < 26) {
                        newCities[index] = [...(newCities[index] || []), el.name];
                    }
                }, 0)
            });
            setIsLoad(true)
            return newCities;
        });
    };
    



    const searchCity = (value: string, count: number) => {
        setChoices([])
        if (value.length > 0) {
            const alphaNum: number | undefined = alphabet(value[0])
            if (alphaNum) {
                let groupCities = cities[alphaNum - 1].filter((el: string, index: number) => el.slice(0, value.length) == value)
                groupCities.splice(count, groupCities.length)
                if (groupCities) {
                    setChoices(groupCities)
                }
                
            }
        }

    }
    const [isLoad, setIsLoad] = useState<boolean>(false)
    const [temp, setTemp] = useState<number>(0)
    const [cityName, setCityName] = useState<string>('')
    const [load, setLoad] = useState<boolean>(false)
    const showLoad = () => {
        setLoad(true)
    }
    const deleteLoad = () => {
        setLoad(false)
    }
    return (
        <>
            <Header cities={cities} showLoad={showLoad} searchCity={searchCity} choiceLen={choices.length} choice={choices} definition={getWeather}/>
            <Weather cityName={cityName} temp={temp} desc={desc} load={load} />
            <>
                {
                    !isLoad && 

                    <div className="loading-block">
                        <h1 className='loading-block__header'>LOADING</h1>
                    </div>
                }
            </>
            <ToastContainer className="p-3 position-fixed bottom-0 end-0" >
                <Toast show={showError} delay={9000} onClose={() => handleShowError(false)} autohide className='bg-danger'>
                    <Toast.Header className="bg-dark">
                        <strong className="me-auto" style={{color: "white"}}>Внимание!</strong>
                    </Toast.Header>
                    <Toast.Body>Произошла ошибка. Попробуйте позже.</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}
export default App