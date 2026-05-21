
import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <>
      <Navbar />
      <main className="page">
        {/* ...existing content... */}
        <h1>Home</h1>
        <section className="hero">
          <div className="hero-inner">
            <img src="./imgs/image8.png" alt="athlete" className="hero-athlete" />
          </div>
        </section>
        <section className="product-section">
          <div className="product-grid">
            <div className="product-card">
              <div className="product-img-wrap">
                <img src="logo192.png" alt="Field Hockey Stick" className="product-img" />
              </div>
              <div className="product-info">
                <p className="product-name">Shoe</p>
                <p className="product-brand">Brand</p>
                <p className="product-price">Price</p>
              </div>
            </div>
          </div>
        </section>
        <section className="story-section">
          <span className="story-brand">Nike</span>
          <div className="story-card row">
            <div className="story-text">
              <p className="story-body">
                Eliud Kipchoge didn't just want to win a marathon. He wanted to redefine human possibility. As a Nike athlete, his goal was audacious: run 42.195 kilometers in under two hours. For years, sport scientists called it impossible—the cardiovascular limit of the human body. But Kipchoge, armed with Nike’s Vaporfly prototype shoes and the legendary Alphafly technology, believed in marginal gains. In Vienna, on a crisp October morning, he ran with laser-focused calm. Paced by a rotating team of world-class runners, bathed in light from a pace car, Kipchoge hit every split perfectly. When he crossed the finish line at 1:59:40, he didn't collapse in exhaustion. He smiled, spread his arms, and became the first human to run a sub-two-hour marathon. The goal wasn't about a medal—it wasn't an official world record due to pacing rules. Instead, it was a statement to every runner: "No human is limited." Nike’s brand of innovation and grit shone through Kipchoge’s legs, his lungs, and his unbreakable spirit. He proved that with the right gear, mindset, and belief, even the impossible has a deadline.
              </p>
            </div>
            <div className="story-img-wrap">
              <img src="./imgs/Eliud.png" alt="Eliud Kipchoge" className="story-img" />
            </div>
          </div>
        </section>
        <section className="story-section">
          <span className="story-brand">TaylorMade</span>
          <div className="story-card row-reverse">
            <div className="story-text">
              <p className="story-body">
                For Tiger Woods, the goal seemed laughable to critics. After four back surgeries, a spinal fusion, and years of personal struggle, the TaylorMade athlete wanted to win a fifth Masters green jacket. He hadn't won any major for over a decade. But Tiger trusted his TaylorMade driver, irons, and especially his putter. At Augusta National, he didn't dominate with power—he dominated with course management and buried emotion. On Sunday, wearing his iconic red shirt, he traded blows with younger stars. The back nine was pure theater. When his birdie putt dropped on the 18th green, the roar shook Georgia pines. Tiger Woods had done it—his 15th major championship, 11 years after his last. Tiger hugged his son Charlie, who had watched him suffer through injuries. The goal wasn't just a trophy. It was proof that a broken body and a doubted champion could rise again. For TaylorMade, this victory wasn't just about sales; it was about legacy. Tiger showed that resilience, combined with precision equipment, can turn a comeback into a masterpiece.
              </p>
            </div>
            <div className="story-img-wrap">
              <img src="./imgs/Tiger.png" alt="Tiger Woods" className="story-img" />
            </div>
          </div>
        </section>
        <section className="story-section">
          <span className="story-brand">Puma</span>
          <div className="story-card row">
            <div className="story-text">
              <p className="story-body">
                As a Puma athlete, Usain Bolt's goal was simple on paper but insane in practice: become the fastest human ever and make everyone smile doing it. At the 2008 Beijing Olympics, the tall, lanky Jamaican wasn't supposed to dominate the 100 meters. Sprinters are built short and muscular. But Bolt, wearing custom Puma spikes, exploded from the blocks. By 50 meters, he was leading—and then he did the unthinkable. He looked sideways, spread his arms, and thumped his chest before even crossing the line. His winning time? 9.69 seconds, without even trying his hardest. The goal was achieved, but Bolt wasn't done. One year later, at the 2009 World Championships in Berlin, with Puma's "Theseus" technology spikes, he ran 9.58 seconds. That record still stands. Bolt’s goal transcended medals: he wanted to make track and field cool again, full of joy and showmanship. Puma’s brand, blending speed with street culture, found its perfect icon. Bolt proved that a goal can be both world-changing and playful—as long as you have the confidence to strike a pose before the race is even over.
              </p>
            </div>
            <div className="story-img-wrap">
              <img src="./imgs/Usain.png" alt="Usain Bolt" className="story-img" />
            </div>
          </div>
        </section>
        <section className="brands-section">
          <div className="brands-grid">
            <div className="brand-card">
              <img src="./imgs/Nike/OIP (24).jpg" alt="Nike" className="brand-logo" />
            </div>
            <div className="brand-card">
              <img src="./imgs/Adidas/OIP (7).jpg" alt="Adidas" className="brand-logo" />
            </div>
            <div className="brand-card">
              <img src="./imgs/Callaway/th.jpg" alt="Callaway" className="brand-logo" />
            </div>
            <div className="brand-card">
              <img src="./imgs/Puma/OIP (17).jpg" alt="Puma" className="brand-logo" />
            </div>
            <div className="brand-card">
              <img src="./imgs/Asics/OIP (17).jpg" alt="Asics" className="brand-logo" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
