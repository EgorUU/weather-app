import React, { FC, useState, useEffect, useRef } from 'react'

//

interface Props {
    cities: any,
    searchCity: any,
    choice: any,
    definition: any, 
    choiceLen: any
}

const Header: FC<Props> = ({ cities, searchCity, choice, definition, choiceLen }) => {
    const container = useRef<HTMLDivElement | null>(null)
    const [value, setValue] = useState<string>('')
    const [count, setCount] = useState<number>(8)
    const [isActive, setIsActive] = useState<boolean>(false)
    const form = useRef<HTMLFormElement | null>(null)
    const [citiesLen, setCitiesLen] = useState<number>(0)
    useEffect(() => {
        if (choice.length !== 0) {
            choice.forEach((el: string, index: number) => {
                console.log(index + 1)
                if (index > 3) {
                    setIsActive(true)
                }
                else {
                    setIsActive(false)
                }
                
            })
        }
        else {
            setIsActive(false) 
        }
    }, [choice])
    return (
        <header className="header">
            <div className='header-container'>
                <form action="" className='header-form' ref={form}>
                    <input type="search" placeholder='Выберите Город' onChange={(e) => {
                        setValue(e.target.value)
                        searchCity(e.target.value, 5)
                        console.log(choiceLen)
                        if (e.target.value.length == 0) {
                            setCitiesLen(0)
                            setCount(5)
                            setIsActive(false)
                        }
                    }} />
                    <div className={isActive ? "header-form__choices form-active" : "header-form__choices"} ref={container} onScroll={() => {
                        if (container.current) {
                            if (Math.round(container.current.scrollTop) + container.current.clientHeight >= container.current.scrollHeight) {
                                setCount(count + 3)
                                searchCity(value, count)
                               
                            }
                        }
                    }}>
                        <div className='header-form__choices--container'>
                            {
                                choice.map((el: any) => (
                                    <div className="header-form__choices--item" onClick={() => {
                                        definition(el)
                                        if (form.current) {
                                            form.current.reset()
                                            searchCity('', 5)
                                            setCitiesLen(0)
                                            setCount(5)
                                            setIsActive(false)
                                        }
                                    }}>
                                        <h1>{el}</h1>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </form>
            </div>
        </header>
    )
}

export default Header