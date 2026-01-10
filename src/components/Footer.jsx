import React from 'react'
import { AiFillInstagram, AiFillLinkedin, AiFillYoutube, AiOutlineArrowUp } from 'react-icons/ai'
import avatars from "../assets/IMG_4513.JPG";
const Footer = () => {
  return (
    <footer>
        <div>
            <img src={avatars} alt="Founder" />

            <h2>Priyesh Nath Tiwari</h2>
            <p>Build the Network, Network Builds You.</p>
        </div>
        <aside>
            <h2></h2>
            <article>
                <a href="https://youtube.com/@webtechoorg?si=oyuroWwyKYAtYNOL" target='blank'>
                    <AiFillYoutube/>
                </a>
                <a href="https://www.linkedin.com/in/priyesh-tiwari-2902781b1/" target='blank'>
                    <AiFillLinkedin/>
                </a>
                <a href="https://instagram.com/withpriyesh/" target='blank'>
                    <AiFillInstagram/>
                </a>
            </article>
        </aside>
        <a href="#home"><AiOutlineArrowUp /></a>
    </footer>
  )
}

export default Footer