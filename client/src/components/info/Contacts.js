import React from 'react'
import { Contact } from './Contact'
import { Main } from './styles'

const Contacts = () => {
    const data = [
        {
            title:"call us at",
            url:"tel:+254704591173",
            text:"+254704591173",
            color:"#01315B",
            bg:"#71F28B"
        },
        {
            title:"instagram",
            url:"https://www.instagram.com/stayvacationske/?hl=en",
            text:" stayvacationske",
            color:"#E87FA0",
            bg:"#fff"
        },
        {
            title:"facebook",
            url:"https://www.facebook.com/stayvacationske/",
            text:"Stay Vacations LTD",
            color:"#01315B",
            bg:"#fff"
        },
        {
            title:"email us",
            url:"mailto:reservations.stayvacations@gmail.com",
            text:"reservations.stayvacations@gmail.com",
            color:"#8A9AEA",
            bg:"#fff"
        },
    ]
  return (
    <Main>
    <header>Contact Us</header>
    <div className='contacts'>
        {data.map((item)=><Contact {...item}/>)}
    </div>
   </Main>
  )
}

export default Contacts