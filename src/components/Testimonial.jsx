import React from 'react'
import UserImg from "../assets/User.png";
const Testimonial = () => {
  return <div id='testimonial'>
    <h2>Testimonial</h2>
    <section>
        <TestimonialCard name={"Priyesh"} feedback={"Your Developing skill is good."} />
        <TestimonialCard name={"Riya"} feedback={"Your Backend Develoepment skill is amazings."} />
        <TestimonialCard name={"Rakesh"} feedback={"Your Frontend Developemnt skill is good."} />

    </section>
  </div>
}

const TestimonialCard = ({name, feedback})=> (
    <article>
        <img src={UserImg} alt="User" />
        <h4>{name}</h4>
        <p>{feedback}</p>
    </article>
)

export default Testimonial