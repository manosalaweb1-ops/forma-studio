import './styles/globals.css';

import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import Process      from './components/Process';
import Services     from './components/Services';
import Metrics      from './components/Metrics';
import Ecosystem    from './components/Ecosystem';
import Team         from './components/Team';
import Testimonials from './components/Testimonials';
import Contact      from './components/Contact';
import Footer       from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Process />
        <Services />
        <Metrics />
        <Ecosystem />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
