import React from 'react'

const FlexWrapper = ({ direction = 'row', wrapping = 'nowrap', children }) => {
  return <div className={`flex`}>{children()}</div>
}

export default FlexWrapper
