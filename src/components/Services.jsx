import React from 'react';
import {motion} from "framer-motion";
import { AiFillIeCircle, AiOutlineJavaScript } from "react-icons/ai";
import { FaAws, FaLaravel, FaPhp, FaPython, FaReact } from "react-icons/fa";
import { SiJquery, SiMysql } from "react-icons/si";

const Services = () => {

    const animations = {
        whileInView:{
            x: 0,
            y: 0,
            opacity: 1,
        },
        one: {
            opacity: 0,
            x: "-100%",
        },
        twoAndThree: {
            opacity: 0,
            y: "-100%",
        },
        four: {
            opacity: 0,
            x: "100%",
        },
        fiveAndSix: {
            opacity: 0,
            x: "-100%",
        },
        seven: {
            opacity: 0,
            y: "-100%",
        },
        eight: {
            opacity: 0,
            x: "100%",
        },
        nine: {
            opacity: 0,
            x: "100%",
        },
        ten: {
            opacity: 0,
            x: "100%",
        },
    } 

  return <div id="services">
    <h2>Skills</h2>
        <section>
            <motion.div className="serviceBox1" whileInView={animations.whileInView} initial={animations.one}>
                <h3>4+</h3>
                <p>Years Experience</p>
            </motion.div>
            <motion.div className="serviceBox2" whileInView={animations.whileInView} initial={animations.twoAndThree}>
                <AiFillIeCircle />
                <span>Web Development</span>
            </motion.div>
            <motion.div className="serviceBox3" whileInView={animations.whileInView} initial={animations.twoAndThree} transition={{delay:0.3,}}>
                <FaLaravel />
                <span>Laravel</span>
            </motion.div>
            <motion.div className="serviceBox4" whileInView={animations.whileInView} initial={animations.four}>
                <FaPhp />
                <span>PHP</span>
            </motion.div>
            <motion.div className="serviceBox5" whileInView={animations.whileInView} initial={animations.fiveAndSix}>
                <AiOutlineJavaScript />
                <span>JavaScript</span>
            </motion.div>
            <motion.div className="serviceBox6" whileInView={animations.whileInView} initial={animations.fiveAndSix} transition={{delay:0.2,}}>
                <SiJquery />
                <span>jQuery</span>
            </motion.div>
            <motion.div className="serviceBox7" whileInView={animations.whileInView} initial={animations.seven}>
                <SiMysql />
                <span>MySQL</span>
            </motion.div>
            <motion.div className="serviceBox8" whileInView={animations.whileInView} initial={animations.eight}>
                <FaReact />
                <span>ReactJs</span>
            </motion.div>
            <motion.div className="serviceBox9" whileInView={animations.whileInView} initial={animations.nine}>
                <FaPython />
                <span>Python</span>
            </motion.div>
            <motion.div className="serviceBox10" whileInView={animations.whileInView} initial={animations.ten}>
                <FaAws />
                <span>AWS</span>
            </motion.div>
        </section>
    </div>
}

export default Services