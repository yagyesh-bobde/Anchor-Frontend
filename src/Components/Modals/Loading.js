import React from 'react'
import "./Model.css"

function Loading() {
  return (
    <div className="loading_bar">
        <img src={require("../logo.png")} alt="Loading" className='loader_home' />
    </div>
  )
}

export default Loading