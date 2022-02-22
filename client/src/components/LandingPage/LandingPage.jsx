import React from 'react'
import {Link} from 'react-router-dom';

function LandingPage() {
  return (
    <div>
        <h1>The Dishes Page</h1>
        <Link to='/home'>
            <button>Enter</button>
        </Link>
    </div>
  )
}

export default LandingPage