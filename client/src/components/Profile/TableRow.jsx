import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useEvent } from '../Events/context/EventContext'
import { BiLoaderAlt } from 'react-icons/bi'

const TableRow = ({index,user,event,amount,category,state,createdAt,_id}) => {
    const [currentState, setCurrentState] = useState(state)
    const {checkPayment} = useEvent()
    const [Loading,setLoading] = useState(false)
    const fetchUpdate = ()=>{
        setLoading(true)
        if(state === "Pending"){
            checkPayment(_id).then((res)=>{
                const {status} = res.data
                if(status){
                    setCurrentState("Paid")
                }else{
                    setCurrentState(state)
                }
                setLoading(false)
            }).catch((err)=>{
                setLoading(false)
            })
        }else{
            setLoading(false)
        }
    }
    useEffect(()=>{
        const interval = setInterval(fetchUpdate,30000)
        return ()=>clearInterval(interval)
    },[currentState])
    if(Loading){
        return <tr >
        <td>0{index + 1}</td>
        <td><img src={event.image[0]} alt="event"/></td>
        <td>{event.name}</td>
        <td>{event.city}</td>
        <td>{event.country}</td>
        <td>{`ksh. ${amount.toLocaleString()}`}</td>
        <td>{category}</td>
        <td className="status"><button className={`${state.toLowerCase()}`}>
            <BiLoaderAlt className='icon'/>
        </button></td>
        <td>{moment(event.validity).format("ddd, MMM DD YYYY")}</td>
        <td>{moment(createdAt).format("ddd, MMM DD YYYY")}</td>
        <td  className="status"><Link to={`/events/${event.name}`}>view</Link></td>
    </tr>
    }
  return (
    <tr >
        <td>0{index + 1}</td>
        <td><img src={event.image[0]} alt="event"/></td>
        <td>{event.name}</td>
        <td>{event.city}</td>
        <td>{event.country}</td>
        <td>{`ksh. ${amount.toLocaleString()}`}</td>
        <td>{category}</td>
        <td className="status"><button className={`${currentState.toLowerCase()}`}>
              {currentState}
        </button></td>
        <td>{moment(event.validity).format("ddd, MMM DD YYYY")}</td>
        <td>{moment(createdAt).format("ddd, MMM DD YYYY")}</td>
        <td  className="status"><Link to={`/events/${event.name}`}>view</Link></td>
    </tr>
  )
}

export default TableRow