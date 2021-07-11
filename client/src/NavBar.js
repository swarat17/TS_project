import React from 'react'
import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <div>
            <ul>
                <li><Link to="/master">Master Data</Link></li>
                <li><Link to="/model">Model Output</Link></li>
            </ul>
        </div>
    )
}
