import React from 'react'
import UserImg from "../assets/User.png";
const Testimonial = () => {
  return <div id='testimonial'>
    <h2>Testimonial</h2>
    <section>
        <TestimonialCard name={"RAZORSE"} feedback={"From strategy to execution, Priyesh demonstrated unmatched professionalism and expertise. They truly understand our industry and our needs. https://razorse.com"} />
        <TestimonialCard name={"Riya pawar"} feedback={"Your Backend Develoepment skill is amazings."} />
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