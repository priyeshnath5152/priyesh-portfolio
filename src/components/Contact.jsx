import React, { useState } from 'react';
import vg from "../assets/vg.png";
import toast from "react-hot-toast";
import {delay, motion} from "framer-motion";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../firebase";

const Contact = () => {
    const [name,setName]  =useState("");
    const [contact,setContact]  =useState("");
    const [message,setMessage]  =useState("");
    const [disableBtn,setDisableBtn] =useState(false);

    const submitHandler = async(e) => {
        e.preventDefault();
        setDisableBtn(true);
        try {
            // console.log(name,contact,message);
            await addDoc(collection(db,"contacts"),{
                name,
                contact,
                message,
            });
            setName("")
            setContact("")
            setMessage("")
            
            toast.success("Message Sent");
            setDisableBtn(false);
        } catch (error) {
            toast.error("Error");
            console.log(error);
            setDisableBtn(false);
        }
       
    }

    const animations = {
        form: {
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
            },
            transition:{
                delay: 0.5,
            },
        }
    }

  return <div id='contact'>
    <section>
        <motion.form onSubmit={submitHandler} {...animations.form}>
            <h2>Contact Me</h2>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Your Name' required />
            <input type='contact' value={contact} onChange={(e) => setContact(e.target.value)} placeholder='Your Contact' required />
            <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Your Message' required />
            <motion.button {...animations.button} className={disableBtn ? "disableBtn" : ""} disabled={disableBtn} type='submit'>Send</motion.button>
        </motion.form>
    </section>
    <aside>
        <img src={vg} alt="Graphics" />
    </aside>
  </div>
}

export default Contact