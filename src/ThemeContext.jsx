import React, { useState, useEffect, createContext } from 'react'

function initDarkTheme () {
  const storedTheme = JSON.parse(localStorage.getItem('darkTheme'))
  let darkTheme = false

  if (storedTheme != null) {
    darkTheme = storedTheme
  }

  console.log(darkTheme)
  return darkTheme
}


const DarkThemeContext = createContext()

function DarkThemeProvider(props) {
  const [darkTheme, setDarkTheme] = useState(initDarkTheme())

  useEffect(() => {
    localStorage.setItem('darkTheme', darkTheme)
  }, [darkTheme]);

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme)
  }

  return (
    <DarkThemeContext.Provider value={{darkTheme, toggleTheme}}>
      {props.children}
    </DarkThemeContext.Provider>
  )
}

export {DarkThemeContext, DarkThemeProvider}
