import React, { useEffect } from 'react'
import { Loader } from '../../smaller/load/Loader'
import { useEvent } from '../context/EventContext'

const Categories = ({handleChange,category}) => {
    const {categories,getCategories} = useEvent()
    useEffect(()=>{
        getCategories()
      },[])
      if(categories.loading){
        return <div className="input">
        <label>Category</label>
        <Loader/>
      </div>
      }
  return (
    <div className="input">
    <label>Category</label>
    <div className="radio">
        {
            categories.length === 0?<div>
                No Categories Available
            </div>:categories.data.map((i) => {
                const {name} = i
                return (
                  <div key={name}>
                    <input
                      type="radio"
                      name="category"
                      checked={category === name}
                      value={name}
                      onChange={(e) => handleChange(e)}
                    />
                    <label>{name}</label>
                  </div>
                );
              })
        }
      
    </div>
  </div>
  )
}

export default Categories