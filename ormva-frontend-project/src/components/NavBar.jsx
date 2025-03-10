import React from 'react'
import { ModeToggle } from './darkmode/mode-toggle'

const NavBar = () => {
    return (
        <header className='w-full flex items-end justify-end'>
            <nav>
                <ModeToggle/>
            </nav>
        </header>
    )
}

export default NavBar

