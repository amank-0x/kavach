import HeroSection from '../components/landing/HeroSection'
import Navbar from '../components/landing/Navbar'
import ProblemSolveSection from '../components/landing/ProblemSolveSection'

function LandingPage() {
  
  return (
    <div className="w-full min-w-full bg-[#030712]">
      <Navbar />
      <HeroSection />
      <ProblemSolveSection />
    </div>
  )
}

export default LandingPage
