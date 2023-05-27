import React from 'react'
import { config } from 'react-transition-group'
import { render, fireEvent } from '@testing-library/react'

import Alert from './alert'
import { BaseAlertProps } from './types/types'
config.disabled = true

jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span>{props.icon}</span>
  }
})

const testProps: BaseAlertProps = {
  message: 'title',
  onClose: jest.fn()
}

const typeProps: BaseAlertProps = {
  message:'title',
  type: 'success',
  description: 'hello',
  closable: true,
  onClose: jest.fn()

}
describe('test Alert Component', () => {
  it('should render the correct default Alert', () => {
    const wrapper = render(<Alert {...testProps}/>)
    const element = wrapper.queryByText('title') as HTMLElement
    expect(element).toBeInTheDocument()
  })
  it('should render the correct Alert based on different type and description', () => {
    const { container, queryByText } = render(<Alert {...typeProps}/>)
    expect(container.querySelector('.alert')).toHaveClass('alert-success')
    expect(queryByText('hello')).toBeInTheDocument()
    expect(queryByText('times')).not.toBeInTheDocument()
    fireEvent.click(queryByText('hello') as HTMLElement)
    expect(typeProps.onClose).toHaveBeenCalled()
  })
})