import moment from "moment";
import { useGlobal } from "../../../context/AppContext";

export const TableEntityData = ({type,selected,handleSelect}) => {
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
        <tr key={username} className={`${selected === _id && "active"}`} onClick={()=>handleSelect(i)}>
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
          <td>{role === "116116" ? "Admin" : "Member"}</td>
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
          validity,createdAt,updatedAt,
          _id,
        } = i;
        const count = index + 1;
        return (
          <tr key={name} className={`${selected === _id && "active"}`} onClick={()=>handleSelect(i)}>
            <td>
              {count < 10 ? "0" : ""}
              {count}
            </td>
            <td><img src={image[0]} alt={name}/></td>
            <td>{name}</td>
            <td className="desc">{description}</td>
            <td><ul>{category.map((i,index)=><li key={index}>{i}</li>)}</ul></td>
            <td><ul>{price_choices.map((i)=><li key={i._id}>{i.price} per {i.category}</li>)}</ul></td>
            <td>{city}</td>
            <td>{country}</td>
            <td>{moment(new Date(validity)).format("ddd, MMM Do YYYY")}</td>
            <td>
              {moment(new Date(createdAt)).format("ddd, MMM Do YYYY")}
            </td>
            <td>
              {moment(new Date(updatedAt)).format("ddd, MMM Do YYYY")}
            </td>
          </tr>
        );
      })}</>
    }
}