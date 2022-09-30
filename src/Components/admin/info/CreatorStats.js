import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { host } from '../../../config/config'
import '../../../Components/Subscribers/Subscribers.css'
import './info.css'


const CreatorStats = () => {
    const [stats, setstats] = useState({})
    const { creatorID } = useParams()
    const [subscribers, setsubscribers] = useState({})
    const getStats = async () => {
        const stats = await fetch(`${host}/api/admin/info/creatorStats/${creatorID}`)

        const res = await stats.json()

        const {  subscribers} = res
        setsubscribers(subscribers)
        setstats(res)
    }

    const getTotalDownloads = (services) => {
        let download = 0
        for (let i = 0; i < services.length; i++) {
            let service = services[i]
            download = download + service.downloads
        }
        return download
    }

    useEffect(() => {
    getStats()
    }, [])
    

  return (
      <div style={{ padding: "0 100px", margin: "10px auto" }}>
        <h1 style={{ textAlign: 'center', margin:'20px 0'}}>Main Stats</h1>
          {subscribers && <div className="subs_count_box">
              <div className="subs_box">
                  <span>{subscribers.total}</span>
                  <span>Total Subscriber</span>
              </div>
              <div className="subs_box">
                  <span>{subscribers.paid}</span>
                  <span>Paid Subscriber</span>
              </div>
              <div className="subs_box">
                  <span>{subscribers.free}</span>
                  <span>Free Subscriber</span>
              </div>
              
          </div>}

          {stats.serviceInfo && <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", marginTop: '20px', gap: '30%'}}>
              <div className="subs_box" style={{ minHeight : '75px'}}>
                  <span>{stats?.serviceInfo?.length}</span>
                  <span>Total Services</span>
              </div>
              <div className="subs_box" style={{ minHeight : '75px'}}>
                  <span>{getTotalDownloads(stats.serviceInfo)}</span>
                  <span>Total Downloads</span>
              </div>
          </div>}
          <div style={{ display: 'flex' ,flexDirection: "column" ,padding: '10px 50px', gap: '25px', marginBottom: '75px'}}>
        {/* ALL SERVICES */}
        { stats?.serviceInfo?.map(service => {
            return (
                <div key={service.name} style={{ overflow: 'hidden'}} >
                    <div className="admin_creator_info" style={{ maxWidth: "900px", margin: "50px auto", maxHeight: "250px", backgroundColor: `${service.status === 1 ? 'rgba(0,250,0,0.45)' : 'rgba(250,0,0,0.45)'}`, overflow: 'hidden', display: 'flex', flexDirection: "row", textAlign: 'center' }}>
                        <header style={{ display: 'flex', flexDirection: "column" }}>
                            <img src={service.simg} alt='profile photo' style={{ borderRadius: "20px" , width:"200px", height: "150px"}} />
                            <h4>{service.sname}</h4>
                        </header>
                        <main style={{ width: "75%"}}>
                            <p><span className='info_main_key'>Downloads: </span>{service.downloads}</p>
                            <span className='info_main_key'>URL: </span><a href={service.surl}>{service.surl}</a>
                            <p><span className='info_main_key'>Joined On:  </span>{
                                new Date(service.date).toLocaleString()
                            }</p>
                        </main>
                    </div>
                </div>  
            )
        })}
    </div>
    </div>
  )
}

export default CreatorStats