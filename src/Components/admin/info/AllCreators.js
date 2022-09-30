import React,{ useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { host } from '../../../config/config'
import { linkedinContext } from '../../../Context/LinkedinState'
import './info.css'

const AllCreators = () => {
    const [allCreators, setallCreators] = useState([])
    const { registerCreatorLogin } = useContext(linkedinContext)
    // GET CREATORS
    const navigate = useNavigate()
    const getCreators = async() => {
        const creators = await fetch(`${host}/api/admin/info/allCreators`)
        const all = await creators.json()
        
        setallCreators(all.res)
    }

    useEffect(() => {
        getCreators()
    
    }, [])
    
    const handleOnClick = (creator) => {
        // const { email , slug , photo , name, linkedinID} = creator
        // const registerCreatorLogin = async(linkedinID, name, email, photo, slug)
        // console.log(linkedinID, name, email, photo, slug)
        // registerCreatorLogin(linkedinID, name, email, photo, slug)
        // localStorage.setItem('isAdmin', true)
        navigate(`/admin/info/creator/${creator._id}`)
    }
  return (
      <div >
       {allCreators.map(creator => {
        return ( 
            <div key={creator.slug}>
                <div className="admin_creator_info" onClick={() => handleOnClick(creator)}>
                    <header>
                        <img src={creator.photo} alt='profile photo'  />
                        <h4>{creator.name}</h4>
                    </header>
                    <main>
                        <p><span className='info_main_key'>Email: </span>{creator.email}</p>
                        <p><span className='info_main_key'>Slug: </span>{creator.slug}</p>
                        <p><span className='info_main_key'>Joined On:</span>{
                            new Date(creator.createdOn).toLocaleString()
                        }</p>
                    </main>
                </div>
            </div>
        )
       })}
    </div>
  )
}

export default AllCreators