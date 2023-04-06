import React, { useEffect, useState} from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import {TableEntity} from "../smaller/frame/TableEntity"
import { TableEntityHolder } from '../smaller/frame/TableEntityHolder';
import { useGlobal } from "../../context/AppContext"
export const SelectEntityTable = ({changeOpen, update, typeData, sortData, headings, typeDataB,validation=true}) => {
  const { state,getUsers, getEvents,setLoading} = useGlobal()
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
    let validity = (validation)?{valid:null,invalid:new Date().toISOString()}:{valid:new Date().toISOString(),invalid:null}
      if(typeData === "users"){
          getUsers(page, 10, sort, arrange);
      }if(typeData === "events"){
          getEvents(page, 10, sort, arrange, validity);
      }
  }, [page, sort, arrange]);
  return (
    <TableEntityHolder
      text={typeData}
      type={typeData}
      sort={sort}
      changeArrange={changeArrange}
      changeSort={changeSort}
      data={sortData}
      arrange={arrange}
      update={update}
      typeDataB={typeDataB}
      changeOpen={changeOpen}
    >
      <Main>
      
        <TableEntity
          data={state[typeData].data}
          setPage={setPage}
          page={state[typeData].currentPage}
          total={state[typeData].pages}
          handleChange={handleChange}
          type={typeData}
          typeData={typeDataB}
          headings={headings}
          validation={validation}
        />
      </Main>
    </TableEntityHolder>
  );
}

const Main = styled.div`
${tw`relative rounded-lg border border-[rgba(0,0,0,.1)] border-solid overflow-x-scroll`}

`