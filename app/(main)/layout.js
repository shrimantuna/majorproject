import React, { Children } from 'react'
import DashboardProvider from './provider'

function DashbaordLayout({ children }) {
    return (
        <div className='bg-secondary'>
            <DashboardProvider>
                <div className='p-8'>
                  
                        {children}
                  

                </div>
            </DashboardProvider>


        </div>
    )
}

export default DashbaordLayout