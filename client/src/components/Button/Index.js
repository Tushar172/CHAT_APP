import React from 'react'

const Button = ({
    label = 'Button',
    type='button',
    className='',
    disabled=false,
}) => {
  return (

      <button type={type} className={`text-white bg-primary hover:bg-primary font-bold py-2 px-4 rounded-full text-center ${className}`} disabled={disabled}>
        {label}
        </button>

  )
}

export default Button
