import { render, fireEvent } from '../test-utils';

import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import App from '../src/App.jsx'

test('toggle dark theme', async () => {
  render(<App />)

  // ACT
  await userEvent.click(screen.getByText('Load Greeting'))
  await screen.findByRole('heading')

  // ASSERT
  expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  expect(screen.getByRole('button')).toBeDisabled()
})
