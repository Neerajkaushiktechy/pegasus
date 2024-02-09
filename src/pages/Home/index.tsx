import HeroSec from "./components/HeroSec";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import OurExpertise from "./components/OurExpertise";
import Register from "./components/Register";
import OurTestimonials from "./components/OurTestimonials";
import Covid19 from "./components/Covid19";

export default function Home() {
  return (
    <>
      <HeroSec />
      <Services />
      <HowItWorks />
      <OurExpertise />
      <Covid19/>
      <Register />
      <OurTestimonials />
    </>
  )
}