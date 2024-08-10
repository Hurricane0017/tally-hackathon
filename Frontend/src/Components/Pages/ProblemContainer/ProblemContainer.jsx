import React from 'react'

export const ProblemContainer = ({serialNumber, title}) => {
  return (
    <div>
        <p>{serialNumber} {title}</p>
    </div>
  )
}
