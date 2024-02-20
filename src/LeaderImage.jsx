import React from 'react'

const LeaderImage = ({bgImage, headerText}) => {
    const bg = 'bg-' + 'projectImage';

    const header = `max-w-full bg-cover bg-no-repeat h-auto ${bg}`
  return (
    <div>
        <div className={header}>

         <h1>{headerText}</h1>
            
        </div>
    </div>
  )
}

export default LeaderImage