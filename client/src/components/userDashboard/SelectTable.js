import React, { useEffect, useState} from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import { TableHolder } from "../smaller/cards/TableHolder";
import { Table } from '../smaller/table/Table';
import { useGlobal } from "../../context/AppContext"
export const SelectTable = ({typeData, update,sortData, headings, typeDataB}) => {
  const { state,getUsers, getEvents, getReports,getPayments,setLoading } = useGlobal()
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState("created at")
  const [arrange, setArrange] = useState("desc");
  const handleChange = (v) => {
    setPage(v)
  }
  const changeArrange = (e) => {
    const { value } = e.target
    setArrange(value)
    setLoading(typeData, true)
  } 
  const changeSort = (e) => {
    const { value } = e.target;
    setSort(value) 
    setLoading(typeData, true)
  }
  useEffect(() => {
    if(typeData === "users"){
        getUsers(page, 10, sort, arrange);
    }if(typeData === "events"){
        getEvents(page, 10, sort, arrange);
    }if(typeData === "reports"){
      getReports(page, 10, sort, arrange)
    }
    if(typeData === "payments"){
      getPayments(page, 10, sort, arrange)
    }
  }, [page, sort, arrange]);
  return (
    <TableHolder
      text={typeData}
      type={typeData}
      sort={sort}
      changeArrange={changeArrange}
      changeSort={changeSort}
      data={sortData}
      arrange={arrange}
      update={update}
      typeDataB={typeDataB}
    >
      <Main>
      
        <Table
          data={state[typeData].data}
          setPage={setPage}
          page={state[typeData].currentPage}
          total={state[typeData].pages}
          handleChange={handleChange}
          type={typeData}
          typeData={typeDataB}
          headings={headings}
        />
      </Main>
    </TableHolder>
  );
}

const Main = styled.div`
${tw`relative rounded-lg border border-[rgba(0,0,0,.1)] border-solid overflow-x-scroll`}

`