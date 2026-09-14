import HeroSection from '../components/landing/HeroSection'
import Navbar from '../components/landing/Navbar'
import ProblemSolveSection from '../components/landing/ProblemSolveSection'
import Real_World_Impact from '../components/landing/Real_World_Impact'
import WorkflowSection from '../components/landing/WorkflowSection'

function LandingPage() {
  
  return (
    <div className="w-full min-w-full bg-[#030712]">
      <Navbar />
      <HeroSection />
      <ProblemSolveSection />
      <WorkflowSection />
      <Real_World_Impact />
    </div>
  )
}

export default LandingPage
