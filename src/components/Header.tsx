import React, { FC, useState, useEffect, useRef } from 'react'

//

interface Props {
    cities: any,
    searchCity: any,
    choice: any,
    definition: any, 
    choiceLen: any,
    showLoad: any
}

const Header: FC<Props> = ({ cities, searchCity, choice, definition, choiceLen, showLoad }) => {
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
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className='container-fluid'>
                <a className="navbar-brand" href='/' style={{color: "white"}}>WEATHER</a>
                <form action="" className='header-form' ref={form} style={{top: "10px"}}>
                    <input type="search" className='form-control' placeholder='Выберите Город' onChange={(e) => {
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
                        <ul className='header-form__choices--container list-group bg-dark' style={{padding: "0"}}>
                            {
                                choice.map((el: any) => (
                                    <li className="header-form__choices--item list-group-item" onClick={() => {
                                        definition(el)
                                        if (form.current) {
                                            form.current.reset()
                                            searchCity('', 5)
                                            showLoad()
                                            setCitiesLen(0)
                                            setCount(5)
                                            setIsActive(false)
                                        }
                                    }}>
                                        {el}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </form>
            </div>
        </nav>
    )
}

export default Header