import React from "react";
import Hieghlightedtext from "../Components/Core/Home/Hieghlightedtext";
import { FaLongArrowAltRight } from "react-icons/fa";
import ReviwSlider from "../Components/Core/Home/ReviwSlider";
import BlackYellowButton from "../Components/Core/Home/BlackYellowButton";
// import homepageVideo from "../assets/Images/banner.mp4";
import Text_Running from "../Components/Core/Home/Text_Running";
// import frame from "../assets/Images/bghome.svg";
// import greenGirlImage from "../assets/Images/TimelineImage.png";
import TimeLine from "../Components/Core/Home/TimeLine";
import SwissKnife from "../Components/Core/Home/SwissKnife"
import Instructor from "../assets/Images/Instructor.png"
import FotterLinks from "../Components/Common/FotterLinks"
import { Link} from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import PowerOfCode from "../Components/Core/Home/PowerOfCode";
import Fotter from "../Components/Common/Fotter";
import BackGroundGradient from "../Components/Common/BackGroundGradient";
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";
import WebGeneratedHero from "../Components/Core/Home/FloatCard";
import TestimonialSlider from "../Components/Core/Home/Testimonial/TestimonialSlider";
import OurInstructor from "../Components/Core/Home/OurInstructor";
import SocialStats from "../Components/Core/Home/SocialStats";
import CodingFamily from "../Components/Core/Home/CodingFamily";
import ModernFooter from "../Components/Core/Home/ModernFooter";
import HeroSection from "../Components/Core/Home/HeroSection";
// import GradientInteractiveBox from "../Components/Common/GradientInteractiveBox";

const HomePage = () => {

  // const navigate = useNavigate()
  // const {token} = useSelector(state=>state.auth)

  return (
    // wrapperh-   h-[6631px]
    <div className=" w-[100%] translate-y-20 flex flex-col  bg-black  overflow-x-hidden m-0 p-0 box-border  ">
      {/* nav  */}
     

    <div className=" mx-auto pb-5 w-[98%]"><HeroSection/></div>
 
{/* why to choose */}
    <WebGeneratedHero/>

    <TestimonialSlider/>

    <OurInstructor/>

    <SocialStats/>

    <CodingFamily/>





         {/* fotter section  */}
      {/* section 4 */}
      <ModernFooter/>

    </div>
  );
};

export default HomePage;
