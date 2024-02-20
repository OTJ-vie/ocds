import React from 'react'
import edoHos from './assets/edo-hos.png'
import edoBuild from './assets/edo-build.png'
import edoPlant from './assets/edo-build.png'
import edoSeaside from './assets/edo-build.png'
import edoSec from './assets/edo-build.png'
import secretariate from './assets/secretariate.png'

export default function gridImages() {

    return (
        <div className='grid grid-cols-3'>
            <div className='grid grid-cols-3 gap-4'>
                <div className='pt-4'>
                    <img src={edoHos} className='' alt='Edo-Hos' />
                </div>
                <div className=''>
                    <img src={edoBuild} className='' alt='Edo-Hos' />
                </div>
                <div>
                    <img src={edoPlant} className='' alt='Edo-Hos' />
                </div>
                <div>
                    <img src={edoSeaside} className='' alt='Edo-Hos' />
                </div>
                <div>
                    <img src={edoSec} className='' alt='Edo-Hos' />
                </div>
                <div>
                    <img src={secretariate} className='' alt='Edo-Hos' />
                </div>
            </div>
        </div>
      )
}
