import React, { useEffect, useState } from 'react'
import {AiOutlineLike,AiOutlineDislike,AiFillLike,AiFillDislike} from "react-icons/ai"
import { useGlobal } from '../../../context/AppContext'
import { useEvent } from '../context/EventContext'
import { FaInfoCircle } from 'react-icons/fa'

const Likes = ({eventId}) => {
    const {state} = useGlobal()
    const {unlikeEvent,undislikeEvent,likeEvent,dislikeEvent, getReaction,fetchEvent} = useEvent()
    const [data,setData] = useState({like:0,dislike:0})
    const [status,setStatus] = useState({like:false,dislike:false})
    const [loading,setLoading] = useState(true)
    const [deactivated,setDeactivated] = useState(false)
    const fetchUpdates = ()=>{
        if(state.user.id || state.user.role){
            getReaction(eventId).then((res)=>{
                const {reaction} = res.data
                setStatus(reaction)
            })
            fetchEvent(eventId).then((res)=>{
              const {event} = res.data
              setData({like:event.like,dislike:event.dislike})
              setLoading(false)
          }).catch(err=>setLoading(false))
        }else{
          fetchEvent(eventId).then((res)=>{
            const {event} = res.data
            setData({like:event.like,dislike:event.dislike})
            setLoading(false)
        }).catch(err=>setLoading(false))
        }
        
    }
    const handleLike = (like)=>{
      setDeactivated(true)
        if(like){
          likeEvent(eventId).then((res)=>{
              if(status.dislike){
                setStatus({like:true, dislike:false})
                setData({like:data.like + 1,dislike:data.dislike - 1})
                setDeactivated(false)
              }else{
                setStatus({...status, like:true})
                setData({...data,like:data.like + 1})
                setDeactivated(false)
              }
            }).catch((err)=>{
              setDeactivated(false)
            })
        }else{
          unlikeEvent(eventId).then((res)=>{
            setStatus({...status, like:false})
            setData({...data,like:data.like - 1})
            setDeactivated(false)
          }).catch(err=>setDeactivated(false))
        }
    }

    const handleDislike = (dislike)=>{
      setDeactivated(true)
        if(dislike){
            dislikeEvent(eventId).then((res)=>{
              console.log(status)
              if(status.like){
                setStatus({ dislike:true, like:false})
                setData({dislike:data.dislike + 1,like:data.like - 1})
                setDeactivated(false)
              }else{
                setStatus({...status, dislike:true})
                setData({...data, dislike:data.dislike + 1})
                setDeactivated(false)
              }
            })
        }else{
          undislikeEvent(eventId).then((res)=>{
            setStatus({...status, dislike:false})
            setData({...data, dislike:data.dislike - 1})
            setDeactivated(false)
          })
        }
    }
    useEffect(()=>{
        fetchUpdates()
    },[state.user])
    if(loading){
      return  <div>
        <header  className='title'>Reaction</header>
        <div className='reaction'>
          <div>
          <p>loading...</p>
          </div>
        </div>
        </div>
    }
    if(!state.user.id || !state.user.role ){
        return  <div>
        <div className='header-likes'>
        <header  className='title'>Reaction</header>
        <span className='icon'>
          <FaInfoCircle title="requires login to react on event"/>
          </span>
        </div>
        <div className='reaction'>
          <div>
          <p>{data.like}</p>
          <AiFillLike className='icon active inactive'/>
          </div>
        <div>
          <p>{data.dislike}</p>
          <AiFillDislike className='icon active inactive'/>
        </div>
        </div>
        </div>
    }
  return (
    <div>
          <header  className='title'>Reaction</header>
          <div className='reaction'>
            <div>
            <p>{data.like}</p>
            {deactivated?<>
              {status.like?<AiFillLike className='icon active disabled'/>
            :<AiOutlineLike className='icon disabled'/>}
            </>:<>
            {status.like?<AiFillLike className='icon active' onClick={()=>handleLike(false)}/>
            :<AiOutlineLike className='icon' onClick={()=>handleLike(true)}/>}
            </>
            }
            
            </div>
          <div>
            <p>{data.dislike}</p>
            {
              deactivated?<>
              {status.dislike?<AiFillDislike className='icon active disabled'/>
          :<AiOutlineDislike className='icon disabled'/>}
              </>:<>
              {status.dislike?<AiFillDislike className='icon active' onClick={()=>handleDislike(false)}/>
          :<AiOutlineDislike className='icon' onClick={()=>handleDislike(true)}/>}
              </>
            }
          
          </div>
          </div>
    </div>
  )
}

export default Likes