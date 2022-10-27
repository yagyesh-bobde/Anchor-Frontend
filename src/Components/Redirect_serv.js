import React,{useState,useContext,useEffect} from 'react'
import { LoadOne } from './Modals/Loading'
import {useParams,useNavigate} from "react-router-dom"
import ServiceContext from '../Context/services/serviceContext';

function Redirect_serv() {
    const {id} = useParams();
    const navigate = useNavigate()
    const [redirecting, setredirecting] = useState(false)
    const [slug, setSlug] = useState("")
    const {getslugfromcpyid} = useContext(ServiceContext)
    
    useEffect(() => {
      getslugfromcpyid(id).then((e)=>{
        if(e.success){
            setSlug(e.slug)
            setredirecting(true)
        }
        else{
            navigate("/")
            
        }
      })

      // eslint-disable-next-line
    }, [])


    if(redirecting){
        navigate(`/s/${slug}`)
    }
    
  return (
    <>
    {!redirecting && <LoadOne/>}
    </>
  )
}

export default Redirect_serv