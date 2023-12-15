import React from 'react'
import { render } from '@testing-library/react'
import { DarkThemeProvider } from '../src/ThemeContext.jsx'
import defaultStrings from 'i18n/en-x-default'

const AllTheProviders = ({ children }) => {
  return (
    <DarkThemeProvider>
      {children}
    </DarkThemeProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
