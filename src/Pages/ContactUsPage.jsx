// import React, { useState } from 'react'
import Fotter from '../Components/Common/Fotter'
import ContactForm from '../Components/Core/About.jsx/ContactForm'
// import { chat_visit_call } from '../data/Contact-data'
import * as Icons from "react-icons/fa6"
import ReviwSlider from '../Components/Core/Home/ReviwSlider'
import ModernFooter from '../Components/Core/Home/ModernFooter'
import TestimonialSlider from '../Components/Core/Home/Testimonial/TestimonialSlider'
import GetInTouchSection from '../Components/Core/About.jsx/GetInTouchSection'

const ContactUsPage = () => {

  return (
    <div className=' w-full  bg-black  '>

        {/* contact Form  */}
        <div className=' w-[85%] flex gap-x-10  mx-auto justify-between py-20 '>
           
         <GetInTouchSection/>




        </div>

  {/* section5 slider */}
     <div className=' bg-richblack-900'>
     <TestimonialSlider/>
     </div>        

        <ModernFooter/>




    </div>
  )
}

export default ContactUsPage