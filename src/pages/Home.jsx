import Hero from '../components/home/Hero.jsx';
import HowItWorks from '../components/home/HowItWorks.jsx';
import Benefits from '../components/home/Benefits.jsx';
import Agents from '../components/home/Agents.jsx';

/* The site is being built one section at a time. The remaining section
   components still live in src/components/home/ and are not mounted. */
export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Benefits />
      <Agents />
    </>
  );
}
