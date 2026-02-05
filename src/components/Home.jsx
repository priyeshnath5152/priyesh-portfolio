import {React, useRef } from 'react';
import {animate, motion} from "framer-motion";
import Typewriter from 'typewriter-effect';
import {BsArrowUpRight, BsChevronDown} from "react-icons/bs";
import me from "../assets/logo.png";
import downloadResume from "../assets/PriyeshNathTiwari.pdf";
const Home = ({ ratio }) => {

    const clientCount = useRef(null);
    const projectCount = useRef(null);

    const animationClientsCount = () =>{
        animate(0,10, {
            duration:1,
            onUpdate:(v)=> (clientCount.current.textContent = v.toFixed())
        })
    }

    const animationProjectsCount = () =>{
        animate(0,50, {
            duration:1,
            onUpdate:(v)=> (projectCount.current.textContent = v.toFixed())
        })
    }

    const animations = {
        h1: {
            initial: {
                x: "-100%",
                opacity: 0,
            },
            whileInView:{
                x: 0,
                opacity: 1,  
            }
        },
        button: {
            initial: {
                y: "-100%",
                opacity: 0,
            },
            whileInView:{
                y: 0,
                opacity: 1,  
            }
        }
    }

  return (
    <div id="home">
    <section>
        <div>
            <motion.h1 {...animations.h1}>
                Hi I Am <br/> PriyeshNath
            </motion.h1>
            <Typewriter options={{
                strings: ["Laravel Developer", "PHP Developer", "JavaScript Developer", "Freelancer"],
                autoStart: true,
                loop: true,
                cursor: "",
                wrapperClassName: "typewriterpara",
            }}/>

            <div>
                <a href={downloadResume} download>
                    Download Resume
                </a>
                <a href="#work">
                    Projects <BsArrowUpRight />
                </a>
            </div>

            <article>
                <p>
                    +
                    { ratio < 3 && (<motion.span whileInView={animationClientsCount} ref={clientCount}>30</motion.span>) }
                </p>
                <span>Leetcode Problems</span>
            </article>

            <aside>
                <article>
                    <p>
                        +
                        { ratio < 3 && (<motion.span whileInView={animationProjectsCount} ref={projectCount}>10</motion.span>) }
                    </p>
                    <span>Projects Done</span>
                </article>
                <article data-special>
                    <p>Contact</p>
                    <span>Priyesht5152@gmail.com</span>
                </article>
            </aside>
        </div>
    </section>
    <section>
        <img src={me} alt='Priyesh' />
    </section>
    <BsChevronDown />
    </div>
  )
}

export default Home