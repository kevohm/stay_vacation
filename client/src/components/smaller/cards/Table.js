import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
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
                  <td><button className={`status ${state === "Paid" && "active"}`}>{state}</button></td>
                  <td>{category}</td>
                  <td>{`${amount} ${currency}`}</td>
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
        .status{
          ${tw`w-[80px] h-[25px] border-solid  bg-white rounded-lg border border-orange text-orange`}
        }
        .active{
          ${tw`text-green border-green`}
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
