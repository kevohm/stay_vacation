import React, { useEffect, useState} from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import { TableHolder } from "../smaller/cards/TableHolder";
import { Table } from '../smaller/table/Table';
import {useGlobal} from "../../context/AppContext"
const UsersTable = () => {
  const { state,getUsers, setLoading } = useGlobal()
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState("created at")
  const [arrange, setArrange] = useState("desc");
  const handleChange = (v) => {
    setPage(v)
  }
  const changeArrange = (e) => {
    const { value } = e.target
    setArrange(value)
    setLoading("users", true)
  } 
  const changeSort = (e) => {
    const { value } = e.target;
    setSort(value)
    setLoading("users", true)
  }
  useEffect(
    () => {
      getUsers(page, 10, sort, arrange)
    },[page, sort, arrange]
  )
  return (
    <TableHolder
      text="Users"
      type="users"
      sort={sort}
      changeArrange={changeArrange}
      changeSort={changeSort}
      data={["email", "Phone number", "username", "created at", "updated at"]}
      arrange={arrange}
    >
      <Main>
        <Table
          data={state.users.data}
          setPage={setPage}
          page={state.users.currentPage}
          total={state.users.pages}
          handleChange={handleChange}
          type="users"
          headings={[
            "#",
            "email",
            "username",
            "Phone number",
            "created at",
            "updated at",
            "role",
            "edit",
          ]}
        />
      </Main>
    </TableHolder>
  );
}

export default UsersTable

const Main = styled.div`
${tw`rounded-lg border border-[rgba(0,0,0,.1)] border-solid`}
overflow-x:scroll;
`