import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
export const Table = ({data=[], title=[], type}) => {
  return (
    <Main>
      <thead>
        <tr>
          {title.map((text) => (
            <th key={text}>{text.replace("_", " ")}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {type === "users"
          ? data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>0{index + 1}</td>
                  <td>{item[title[1]]}</td>
                  <td>{item[title[2]]}</td>
                  <td>{item[title[3]]}</td>
                </tr>
              );
            })
          : data.map((item, index) => {
            const { name, description, image, max_people, city, country } =
              item;
              return (
                <tr key={index}>
                  <td>{name}</td>
                  <td>
                    <img src={image[0]} alt={name} />
                  </td>
                  <td>{description}</td>
                  <td>{max_people}</td>
                  <td>{city}</td>
                  <td>{country}</td>
                </tr>
              );
            })}
      </tbody>
    </Main>
  );
};

const Main = styled.table`
  ${tw`w-max text-sm`}
  border-collapse:collapse;
  thead,
  tbody > tr{
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  tbody,
  tfoot {
    tr {
      td {
        ${tw`p-5 text-start text-[rgba(0,0,0,.5)]`}
        img{
          ${tw`w-12 object-fill rounded-lg`}
        }
      }
    }
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
