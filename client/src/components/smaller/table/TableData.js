import moment from "moment";
import { ImBin } from "react-icons/im"
import {FaEdit} from "react-icons/fa"
import {BiLoaderAlt} from "react-icons/bi"
import { useGlobal } from "../../../context/AppContext";
import { useEffect, useState } from "react";

export const TableData = ({type, handleUpdate, handleDelete}) => {
  const {state} = useGlobal()
  if(type === "users"){
    return <>{state[type].data.map((i, index) => {
      const {
        email,
        username,
        phone_number,
        createdAt, 
        updatedAt,
        role,
        _id,
      } = i;
      const count = index + 1;
      return (
        <tr key={username}>
          <td>
            {count < 10 ? "0" : ""}
            {count}
          </td>
          <td>{email}</td>
          <td>{username}</td>
          <td>{phone_number}</td>
          <td>
            {moment(new Date(createdAt)).format("ddd, MMM Do YYYY")}
          </td>
          <td>
            {moment(new Date(updatedAt)).format("ddd, MMM Do YYYY")}
          </td>
          <td>{role === process.env.REACT_APP_ADMIN_DEFAULT ? "Admin" : "Member"}</td>
          <td>
            <div className="edit">
              <FaEdit
                className="edit"
                title="edit"
                onClick={() =>
                  handleUpdate(i)
                }
              />
              <ImBin
                className="delete"
                title="delete"
                onClick={() => handleDelete(_id)}
              />
            </div>
          </td>
        </tr>
      );
    })}</>
  }
  if(type === "events"){
      return <>{state[type].data.map((i, index) => {
          const {
          image,name,
          description,city,country,
          category,price_choices,
          validity,createdAt,updatedAt,Amenities,
          _id,
        } = i;
        const count = index + 1;
        return (
          <tr key={name}>
            <td>
              {count < 10 ? "0" : ""}
              {count}
            </td>
            <td><img src={image[0]} alt={name}/></td>
            <td>{name}</td>
            <td ><p className="desc">{description}</p></td>
            <td><ul>{category.map((i,index)=><li key={index}>{i.name}</li>)}</ul></td>
            <td><ul>{price_choices.map((i)=><li key={i._id}>{i.price} per {i.category}</li>)}</ul></td>
            <td><ul>{Amenities.map((i,index)=><li key={index}>{i}</li>)}</ul></td>
            <td>{city}</td>
            <td>{country}</td>
            <td>{moment(new Date(validity)).format("ddd, MMM Do YYYY")}</td>
            <td>
              {moment(new Date(createdAt)).format("ddd, MMM Do YYYY")}
            </td>
            <td>
              {moment(new Date(updatedAt)).format("ddd, MMM Do YYYY")}
            </td>
            <td>
              <div className="edit">
                <FaEdit
                  className="edit"
                  title="edit"
                  onClick={() =>
                    handleUpdate(i)
                  }
                />
                <ImBin
                  className="delete"
                  title="delete"
                  onClick={() => handleDelete(_id)}
                />
              </div>
            </td>
          </tr>
        );
      })}</>
    }

    if(type === "reports"){
      return <>{state[type].data.map((i, index) => {
          const {description,state,createdAt,updatedAt,_id,} = i;
        const count = index + 1;
        return (
          <tr key={index}>
            <td>
              {count < 10 ? "0" : ""}
              {count}
            </td>
            <td className="width">{description}</td>
            <td>{state}</td>
            <td>{i.event.name}</td>
            <td>{i.event.city}</td>
            <td>{i.event.country}</td>
            <td>
              {moment(new Date(createdAt)).format("ddd, MMM Do YYYY")}
            </td>
            <td>
              {moment(new Date(updatedAt)).format("ddd, MMM Do YYYY")}
            </td>
            <td>
              <div className="edit">
                <FaEdit
                  className="edit"
                  title="edit"
                  onClick={() =>
                    handleUpdate(i)
                  }
                />
                <ImBin
                  className="delete"
                  title="delete"
                  onClick={() => handleDelete(_id)}
                />
              </div>
            </td>
          </tr>
        );
      })}</>
    }

    if(type === "payments"){
      return <>{state[type].data.map((i, index) => {
          const {currency,category,amount,state,createdAt,updatedAt,_id,} = i;
        const count = index + 1;
        return (
          <tr key={index}>
            <td>
              {count < 10 ? "0" : ""}
              {count}
            </td>
            <td>{i.event.name}</td>
            <td>{i.event.city}</td>
            <td>{i.event.country}</td>
            <td>{`${currency}. ${Number(amount).toLocaleString()}`}</td>
            <td>{category}</td>
            <StateCheck state={state} id={i._id}/>
            <td>{i.user.username}</td>
            <td>{i.user.phone_number}</td>
            <td>
              {moment(new Date(createdAt)).format("ddd, MMM Do YYYY")}
            </td>
            <td>
              {moment(new Date(updatedAt)).format("ddd, MMM Do YYYY")}
            </td>
            <td>
              <div className="edit">
                <FaEdit
                  className="edit"
                  title="edit"
                  onClick={() =>
                    handleUpdate(i)
                  }
                />
                <ImBin
                  className="delete"
                  title="delete"
                  onClick={() => handleDelete(_id)}
                />
              </div>
            </td>
          </tr>
        );
      })}</>
    }
}

export const StateCheck = ({state,id})=>{
  const {checkPayments} = useGlobal()
  const [currentState,setCurrentState] = useState(state)
  const [loading,setLoading] = useState(false)
  const checkPay = ()=>{
    setLoading(true)
    if(state === "Pending"){
      checkPayments(id).then((res)=>{
        const {status} = res.data
        if(status){
          setCurrentState("Paid")
        }else{
          setCurrentState("Pending")
        }
        setLoading(false)
      }).catch(err=>{
        setLoading(false)
      })
    }else{
      setCurrentState(state)
      setLoading(false)
    }
  }
  useEffect(()=>{
    const timeout = setInterval(checkPay,10000)
    return ()=>clearInterval(timeout)
  },[currentState])
  if(loading){
    return <td className="status">
      <button className={currentState.toLowerCase()}>
        <BiLoaderAlt className="icon"/>
      </button>
      </td>
  }
return <td className="status"><button className={currentState.toLowerCase()}>{currentState}</button></td>
}