import React from 'react'
import { Main } from './styles'
import { Term } from './Term'

const Terms = () => {
  return (
    <Main>
    <header>Terms and Conditions</header>
    {data.map((item)=><Term key={item.title} {...item}/>)}
   </Main>
  )
}

export default Terms

const data = [
    {title:"General",
    info:["In all cases, drivers must be at least a minimum age to rent or drive a car. In some cases, they must also be below a maximum age. The limit(s) can vary by Service Provider, by location and by type of car.",
    "Only eligible drivers whose names appear on the Rental Agreement may drive the car.",
    " You must not take the car to a different country/state/island and/or drop it off at a different location without arranging this in advance. Late Pick-up/early drop-off",
    "If you pick your car up later (please see D4.4 above) or drop it off earlier than agreed in your Booking Confirmation, the Service Provider will not refund you for the 'unused' time.How We Work",
    "For info on reviews, ranking, how we make money (and more), check out How We Work. Back to top"
]},{
    title:"Contractual relationship",
    info:[
        `Most Flights on our Platform are provided via a Third-Party Aggregator, which acts as an intermediary to the airline(s).`,
        `When you make a Booking, it’s directly with the airline. We’re not a ‘contractual party’ to your Booking. When booking, you enter into (i) an Intermediation Contract with the Third-Party Aggregator (for the ticket) and (ii) a Contract of Carriage with the airline (for the Flight itself).`,
        `If you book any extras (additional baggage, insurance, etc.), you’ll enter into a direct contract with the Third-Party Aggregator or another company. We will not be involved in this contract.`,
        `We act solely as the Platform and are not involved in the Third-Party Terms. We are not responsible for your ticket or any extras you may buy and (to the fullest extent permitted by law) have no liability to you in relation to your Booking.`
    ]
},{
    title:"What we will do",
    info:[
        `We provide the Platform on which Service Providers can promote and sell their Travel Experiences and you can search for, compare and book them.`,
        `Once you’ve booked your Flight, your Booking details (e.g. the names of the traveller(s)) will be provided to the Service Provider.`,
        `Depending on the Contract of Carriage, we may be able to help you change or cancel your Booking if you wish to.`
    ]
}
]