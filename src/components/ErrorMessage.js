import React from 'react'

const ErrorMessage = ({message}) => {
  return (
    <div className='error-msg d-flex align-items-center justify-content-center'>
      {message}
    </div>
  )
}

export default ErrorMessage
