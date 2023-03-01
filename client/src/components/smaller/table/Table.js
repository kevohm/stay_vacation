import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import  {Loader} from "../load/Loader"
import { ImBin } from "react-icons/im"
import { FaEdit, FaArrowLeft, FaArrowRight} from "react-icons/fa";
import moment from "moment";
import { useGlobal } from "../../../context/AppContext";

export const Table = ({ handleChange, type, headings, element}) => {
  const { state, setLoading, deleteUser, toggleUpdate } = useGlobal();
  const [page, setPage] = useState(state[type].currentPage);
  const handleInput = (e) => {
    e.preventDefault();
    const { value } = e.target;
      const num = Number(value);
    if (num <= Number(state[type].pages) && num > 0) {
        handleChange(value);
        setLoading(type, true)
    }
    setPage(value);
  };
  const handleDelete = (id) => {
    if (type === "users") {
      deleteUser(id);
    }
  }
  const handleUpdate = (data) => {
    toggleUpdate('user', data)
  }
    const handleDir = (mov) => {
        const total = Number(state[type].pages);
        const current = Number(state[type].currentPage);
        if (mov === "next") {
            if (current < total) {
                handleChange(current + 1);
                setPage(current + 1);
              setLoading(type, true);
            } else if (current === total && total !== 1) {
                handleChange(1);
                setPage(1);
                setLoading(type, true);
            }
        }
        if(mov === "prev"){
            if ((current > 1)) {
                handleChange(current - 1);
                setPage(current - 1);
              setLoading(type, true);
            } else if (current === 1 && total !== 1) {
              handleChange(total);
              setPage(total);
              setLoading(type, true);
            }
        }
  }
  if (state[type].loading) {
    return <Loader />;
  }
  return (
    <Main>
      {state.user_startUpdate.start && (
        <div className="update">
          {element}
        </div>
      )}
      <thead>
        <tr>
          {headings.map((i) => (
            <th key={i}>{i}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {state[type].data.length === 0 ? (
          <tr>
            <td colSpan={8} style={{ textAlign: "center" }}>
              No users yet
            </td>
          </tr>
        ) : (
          state[type].data.map((i, index) => {
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
                <td>{role === "116116" ? "Admin" : "Member"}</td>
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
          })
        )}
      </tbody>
      <tfoot>
        <tr>
          <td>
            <div className="control" onClick={() => handleDir("prev")}>
              <FaArrowLeft className="icon" />
              <p>previous</p>
            </div>
          </td>
          <td colSpan={6} className="page">
            <div>
              <input
                id="input"
                type="text"
                value={page}
                onChange={(e) => handleInput(e)}
              />
              <p>of {state[type].pages}</p>
            </div>
          </td>
          <td>
            <div className="control" onClick={() => handleDir("next")}>
              <p>next</p>
              <FaArrowRight className="icon" />
            </div>
          </td>
        </tr>
      </tfoot>
    </Main>
  );
};

const Main = styled.table`
  ${tw`relative min-w-full w-max text-sm`}
  .update{
    ${tw`flex items-start justify-end lg:justify-center absolute left-0 top-0 bg-[rgba(0,0,0,.2)] w-full h-full`}
  }
  border-collapse:collapse;
  thead,
  tbody > tr {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    .edit {
      ${tw`flex space-x-5`}
      .delete, .edit{
         ${tw`cursor-pointer`}
      }
      .delete {
        ${tw`text-darkBlue text-sm`}
      }
      .edit {
        ${tw`text-orange text-sm`}
      }
    }
  }
  tbody > tr:nth-child(even) {
    ${tw`bg-[rgba(0,0,0,.02)]`}
  }
  tbody,
  tfoot {
    tr {
      td {
        ${tw`p-5 text-start text-[rgba(0,0,0,.4)]`}
        img {
          ${tw`w-12 object-fill rounded-lg`}
        }
        .control {
          ${tw`w-max flex cursor-pointer px-2.5 py-1 items-center space-x-2.5 rounded-lg text-[rgba(0,0,0,.5)] border border-solid border-[rgba(0,0,0,.15)]`}
          p {
            ${tw`text-[rgba(0,0,0,.5)] text-sm`}
          }
          .icon {
            ${tw`text-[rgba(0,0,0,.5)] text-sm`}
          }
        }
      }
      .page {
        ${tw``}
        > div {
          ${tw`w-[150px] flex items-center justify-center space-x-2 mx-auto`}
          #input {
            ${tw`w-8 text-sm text-[rgba(0,0,0,.5)] text-center p-1 rounded-lg border border-solid border-[rgba(0,0,0,.15)]`}
          }
        }
      }
    }
  }
  thead {
    tr {
      ${tw`bg-[rgba(0,0,0,.02)]`}
      th {
        font-family: poppinsMedium;
        ${tw`capitalize p-5 text-start  text-[rgba(0,0,0,.5)]`}
      }
    }
  }
`;
