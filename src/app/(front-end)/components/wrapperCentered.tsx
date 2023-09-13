import React, { ReactNode } from 'react'

interface Props {
    classes : string,
    children : ReactNode
}

const WrapperCentered = ({classes, children} : Props) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <div className={`p-4 h-full w-full ${classes}`}>
            {children}
        </div>
    </div>
  )
}

export default WrapperCentered;