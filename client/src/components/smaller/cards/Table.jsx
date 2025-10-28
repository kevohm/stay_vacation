import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import {StateCheck} from "../table/TableData"
 
export const Table = ({data=[], title=[], type}) => {
  return (
    <Main type={type}>
      <thead>
        <tr>
          {title.map((text) => (
            <th key={text}>{text.replace("_", " ")}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {type === "users" && data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>0{index + 1}</td>
                  <td>{item[title[1]]}</td>
                  <td>{item[title[2]]}</td>
                  <td>{item[title[3]]}</td>
                </tr>
              );
            })}
          {type === "events" &&  data.map((item, index) => {
            const { name, description, image, city, country } =
              item;
              return (
                <tr key={index}>
                  <td>{name}</td>
                  <td>
                    <img src={image[0]} alt={name} />
                  </td>
                  <td>{(description.length > 45)?`${description.slice(0,45)}...`:description}</td>
                  <td>{city}</td>
                  <td>{country}</td>
                </tr>
              );
            })}
            {type === "payments" &&  data.map((item, index) => {
            const { state, category , amount, currency} = item;
              return (
                <tr key={index}>
                  <td>0{index + 1}</td>
                 <StateCheck state={state} id={item._id}/>
                  <td>{category}</td>
                  <td>{`${currency}. ${Number(amount).toLocaleString()}`}</td>
                  <td>{item.event.name}</td>
                </tr>
              );
            })}
      </tbody>
    </Main>
  );
};

const Main = styled.table`
  ${tw`w-max text-sm`}
  ${(props)=>props.type === "payments" && tw`w-full`}
  border-collapse:collapse;
  thead,
  tbody > tr{
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  tbody,
  tfoot {
    tr {
      td {
        ${tw`p-4 text-start text-[rgba(0,0,0,.5)]`}
        img{
          ${tw`w-12 h-12 object-cover rounded-lg`}
        }
        .pending, .paid, .failed{
          ${tw`w-[80px] p-1 px-2 border-solid bg-white border text-sm rounded-full`}
        }
        .pending{
          ${tw`text-orange border-orange`}
        }
        .paid{
          ${tw`border-green text-green`}
        }
        .failed{
          ${tw`border-red-400 text-red-400`}
        }
        .icon{
          ${tw`animate-spin`}
        }
      }
      
    }
  }
  tbody tr td{
    ${(props)=>props.type === "users" && tw`py-8`}
  }
  thead {
    tr {
      th {
        font-family: poppinsMedium;
        ${tw`capitalize p-5 text-start text-[rgba(0,0,0,.7)]`}
      }
    }
  }
`;
