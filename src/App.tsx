import React, { useState, useEffect, useRef } from 'react';
import { Menu, ArrowRight, ArrowUpRight } from 'lucide-react';

function App() {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentBrandSlide, setBrandSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  
  const heroImages = [
    '/a-chosen-soul-Jwt5AkzfGvM-unsplash.jpg',
    '/allison-saeng-Tvs6pDcC3u8-unsplash.jpg',
    '/jean-philippe-delberghe-kpxXdzCbXHw-unsplash.jpg',
    '/kamran-abdullayev-DvFrRwuyn88-unsplash.jpg',
    '/resource-database-4swp-1rj_XI-unsplash.jpg'
  ];

  const abstractSlides = [
    '/eugenia-pankiv-KGaY-wrwOFQ-unsplash.jpg',
    '/usgs--0hKZ-WT1Tk-unsplash.jpg',
    '/marten-bjork-j0Da0mEplnY-unsplash.jpg'
  ];

  const brandSlides = [
    '/kamran-abdullayev-DvFrRwuyn88-unsplash.jpg',
    '/resource-database-4swp-1rj_XI-unsplash.jpg',
    '/content-pixie-VdjSLKB3-no-unsplash.jpg'
  ];

  // Intersection Observer for scroll animations
  const [visibleSections, setVisibleSections] = useState(new Set());
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Scroll effect for parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Abstract section auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % abstractSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Brand section auto-slide (opposite direction)
  useEffect(() => {
    const interval = setInterval(() => {
      setBrandSlide((prev) => (prev + 1) % brandSlides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">TAGORE</div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium hover:opacity-60 transition-opacity">HOME</a>
            <a href="#" className="text-sm font-medium hover:opacity-60 transition-opacity">WORK</a>
            <a href="#" className="text-sm font-medium hover:opacity-60 transition-opacity">ABOUT</a>
            <a href="#" className="text-sm font-medium hover:opacity-60 transition-opacity">SERVICES</a>
            <a href="#" className="text-sm font-medium hover:opacity-60 transition-opacity">CONTACT</a>
          </nav>
          <Menu className="md:hidden w-6 h-6" />
        </div>
      </header>

      {/* Hero Section - Parallax Effect */}
      <section 
        className="pt-20 pb-16 px-6 relative"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`
        }}
        data-animate
        id="hero"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${visibleSections.has('hero') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <h1 className="text-8xl md:text-9xl font-bold tracking-tight leading-none">
                TAGORE
                <br />
                <span className="block">STUDIOS</span>
              </h1>
              <div className="mt-8 text-sm text-gray-600">
                <p>Creative & Development</p>
                <p className="mt-2">© 2025 TAGORE STUDIOS</p>
              </div>
            </div>
            <div className={`relative transition-all duration-1000 delay-300 ${visibleSections.has('hero') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
              <div className="aspect-square rounded-2xl overflow-hidden relative">
                {heroImages.map((image, index) => {
                  const name = image.split('/').pop()?.replace(/\.(jpg|jpeg|png)$/i, '') || '';
                  return (
                    <picture key={index} className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                      index === currentHeroImage 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-105'
                    }`}>
                      <source srcSet={`/optimized/${name}-800.webp`} type="image/webp" />
                      <img 
                        src={`/optimized/${name}-800.jpg`} 
                        alt={`Creative work ${index + 1}`} 
                        className="w-full h-full object-cover" 
                      />
                    </picture>
                  );
                })}
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  {heroImages.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentHeroImage ? 'bg-white' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-2xl overflow-hidden">
                <picture className="w-full h-full object-cover">
                  <source srcSet="/optimized/allison-saeng-yLj955JlBZo-unsplash-400.webp" type="image/webp" />
                  <img src="/optimized/allison-saeng-yLj955JlBZo-unsplash-400.jpg" alt="Design element" className="w-full h-full object-cover" />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Abstract Colorful Section - Auto-sliding Images */}
      <section className="py-16" data-animate id="abstract">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6">
          {abstractSlides.map((image, index) => {
            const name = image.split('/').pop()?.replace(/\.(jpg|jpeg|png)$/i, '') || '';
            return (
              <div 
                key={index}
                className={`h-64 rounded-2xl overflow-hidden transition-all duration-700 ${
                  visibleSections.has('abstract') 
                    ? `opacity-100 translate-x-0 delay-${index * 200}` 
                    : 'opacity-0 translate-x-full'
                }`}
              >
                <picture className="w-full h-full object-cover">
                  <source srcSet={`/optimized/${name}-400.webp`} type="image/webp" />
                  <img 
                    src={`/optimized/${name}-400.jpg`} 
                    alt={`Abstract art ${index + 1}`} 
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      index === currentSlideIndex ? 'scale-110' : 'scale-100'
                    }`}
                  />
                </picture>
              </div>
            );
          })}
        </div>
        <div className={`max-w-4xl mx-auto px-6 mt-16 text-center transition-all duration-1000 delay-600 ${
          visibleSections.has('abstract') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-2xl font-bold mb-4">WHY LEADING BRANDS</h2>
          <h3 className="text-2xl font-bold mb-8">PARTNER WITH TAGORE</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From early-stage startups to established enterprises, we've helped brands navigate complex challenges and unlock growth opportunities through strategic design and development.
          </p>
          <button className="mt-8 text-sm font-medium underline hover:opacity-60 transition-opacity">DISCOVER MORE</button>
        </div>
      </section>

      {/* Case Studies Section - Staggered Fade In with Hover Effects */}
      <section className="py-16 px-6" data-animate id="case-studies">
        <div className="max-w-7xl mx-auto">
          <div className={`flex items-center justify-between mb-12 transition-all duration-1000 ${
            visibleSections.has('case-studies') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex space-x-8">
              <h2 className="text-xl font-bold">CASE STUDIES</h2>
              <h2 className="text-xl font-bold opacity-60">FEATURED PROJECTS</h2>
              <h2 className="text-xl font-bold opacity-60">CASE STUDIES</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: '/a-chosen-soul-Jwt5AkzfGvM-unsplash.jpg', title: 'PORTRAIT SERIES', desc: 'Creative Photography' },
              { img: '/eugenia-pankiv-KGaY-wrwOFQ-unsplash.jpg', title: 'ABSTRACT ART', desc: 'Digital Art Direction' },
              { img: '/usgs--0hKZ-WT1Tk-unsplash.jpg', title: 'NATURAL FORMS', desc: 'Environmental Design' },
              { img: '/allison-saeng-Tvs6pDcC3u8-unsplash.jpg', title: 'FASHION FORWARD', desc: 'Brand Identity' },
              { img: '/marten-bjork-j0Da0mEplnY-unsplash.jpg', title: 'TECH VISION', desc: 'Interface Design' },
              { img: '/jean-philippe-delberghe-kpxXdzCbXHw-unsplash.jpg', title: 'URBAN SPACES', desc: 'Spatial Design' }
            ].map((project, index) => {
              const name = project.img.split('/').pop()?.replace(/\.(jpg|jpeg|png)$/i, '') || '';
              return (
                <div 
                  key={index}
                  className={`group cursor-pointer transition-all duration-700 ${
                    visibleSections.has('case-studies') 
                      ? `opacity-100 translate-y-0 delay-${index * 100}` 
                      : 'opacity-0 translate-y-20'
                  }`}
                >
                  <div className="aspect-square rounded-2xl mb-4 overflow-hidden relative">
                    <picture className="w-full h-full object-cover">
                      <source srcSet={`/optimized/${name}-400.webp`} type="image/webp" />
                      <img 
                        src={`/optimized/${name}-400.jpg`} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  </div>
                  <h3 className="font-bold mb-2 group-hover:text-gray-600 transition-colors">{project.title}</h3>
                  <p className="text-sm text-gray-600">{project.desc}</p>
                </div>
              );
            })}
          </div>

          <div className={`text-center mt-12 transition-all duration-1000 delay-800 ${
            visibleSections.has('case-studies') ? 'opacity-100' : 'opacity-0'
          }`}>
            <button className="text-sm font-medium underline hover:opacity-60 transition-opacity">VIEW ALL WORK</button>
          </div>
        </div>
      </section>

      {/* Brand Movement Section - Fade In */}
      <section className="py-24 px-6 bg-gray-50" data-animate id="brand-movement">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
          visibleSections.has('brand-movement') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <h2 className="text-6xl md:text-7xl font-bold leading-tight mb-8">
            HELPING BRANDS<br />
            MOVE THE WORLD<br />
            FORWARD
          </h2>
          <button className="text-sm font-medium underline hover:opacity-60 transition-opacity">LET'S BUILD SOMETHING EXTRAORDINARY</button>
        </div>
      </section>

      {/* Client Logos - Sliding Animation */}
      <section className="py-16 px-6" data-animate id="clients">
        <div className="max-w-7xl mx-auto overflow-hidden">
          <div className={`flex items-center justify-center gap-12 opacity-60 transition-all duration-1000 ${
            visibleSections.has('clients') ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="text-2xl font-bold whitespace-nowrap">Nike</div>
            <div className="text-2xl font-bold whitespace-nowrap">Adidas</div>
            <div className="text-2xl font-bold whitespace-nowrap">Sony</div>
            <div className="text-2xl font-bold whitespace-nowrap">Apple</div>
            <div className="text-2xl font-bold whitespace-nowrap">Samsung</div>
            <div className="text-2xl font-bold whitespace-nowrap">Tesla</div>
          </div>
        </div>
      </section>

      {/* Split Section - Auto-sliding Background Images */}
      <section className="grid grid-cols-1 md:grid-cols-2" data-animate id="split">
        <div className="h-64 md:h-96 overflow-hidden relative">
          {brandSlides.map((image, index) => {
            const name = image.split('/').pop()?.replace(/\.(jpg|jpeg|png)$/i, '') || '';
            return (
              <picture key={index} className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                index === currentBrandSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              }`}>
                <source srcSet={`/optimized/${name}-600.webp`} type="image/webp" />
                <img 
                  src={`/optimized/${name}-600.jpg`} 
                  alt={`Creative showcase ${index + 1}`} 
                  className="w-full h-full object-cover" 
                />
              </picture>
            );
          })}
        </div>
        <div className="h-64 md:h-96 overflow-hidden">
          <picture className="w-full h-full object-cover">
            <source srcSet="/optimized/content-pixie-VdjSLKB3-no-unsplash-600x400.webp" type="image/webp" />
            <img src="/optimized/content-pixie-VdjSLKB3-no-unsplash-600x400.jpg" alt="Design innovation" className={`w-full h-full object-cover transition-all duration-1000 ${
              visibleSections.has('split') ? 'scale-100' : 'scale-110'
            }`} />
          </picture>
        </div>
      </section>

      {/* Ideas in Motion - Slide In from Sides */}
      <section className="py-16 px-6" data-animate id="ideas">
        <div className="max-w-7xl mx-auto">
          <div className={`flex items-center justify-between mb-12 transition-all duration-1000 ${
            visibleSections.has('ideas') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}>
            <h2 className="text-4xl font-bold">( IDEAS<span className="ml-8">IN MOTION )</span></h2>
            <button className="text-sm font-medium underline hover:opacity-60 transition-opacity">VIEW PORTFOLIO</button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className={`transition-all duration-1000 delay-300 ${
              visibleSections.has('ideas') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}>
              <p className="text-gray-600 mb-8">
                Explore our latest concepts, creative experiments, and behind-the-scenes insights into how we bring ideas to life.
              </p>
              <div className="space-y-6">
                <div className="hover:translate-x-2 transition-transform duration-300">
                  <h3 className="font-bold mb-2">IMMERSIVE DIGITAL WORLDS // NIKE METAVERSE</h3>
                  <p className="text-sm text-gray-600">Exploring virtual retail experiences through cutting-edge 3D environments</p>
                </div>
                <div className="hover:translate-x-2 transition-transform duration-300">
                  <h3 className="font-bold mb-2">SUSTAINABLE DESIGN // PATAGONIA PROJECT</h3>
                  <p className="text-sm text-gray-600">Creating eco-conscious brand experiences that inspire environmental action</p>
                </div>
                <div className="hover:translate-x-2 transition-transform duration-300">
                  <h3 className="font-bold mb-2">AI-POWERED INTERFACES // FUTURE OF UX</h3>
                  <p className="text-sm text-gray-600">Pioneering the next generation of human-computer interaction design</p>
                </div>
              </div>
              <button className="mt-8 text-sm font-medium underline hover:opacity-60 transition-opacity">READ CASE STUDY</button>
            </div>
            <div className={`relative transition-all duration-1000 delay-500 ${
              visibleSections.has('ideas') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}>
              <div className="aspect-video rounded-2xl overflow-hidden group">
                <picture className="w-full h-full object-cover">
                  <source srcSet="/optimized/content-pixie-VdjSLKB3-no-unsplash-800x450.webp" type="image/webp" />
                  <img src="/optimized/content-pixie-VdjSLKB3-no-unsplash-800x450.jpg" alt="Ideas in motion showcase" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Fade In */}
      <section className="py-24 px-6" data-animate id="contact">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
          visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
            READY TO DISCUSS<br />
            YOUR NEXT PROJECT?
          </h2>
          <div className="flex items-center justify-center">
            <ArrowUpRight className="w-12 h-12 hover:rotate-45 transition-transform duration-300" />
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="hover:translate-y-1 transition-transform duration-300">
              <h3 className="font-bold mb-2">NEW BUSINESS</h3>
              <p className="text-sm text-gray-600">hello@tagorestudios.com</p>
            </div>
            <div className="hover:translate-y-1 transition-transform duration-300">
              <h3 className="font-bold mb-2">CAREERS</h3>
              <p className="text-sm text-gray-600">careers@tagorestudios.com</p>
            </div>
            <div className="hover:translate-y-1 transition-transform duration-300">
              <h3 className="font-bold mb-2">PRESS & MEDIA</h3>
              <p className="text-sm text-gray-600">press@tagorestudios.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xl font-bold">tagore</div>
          <div className="flex space-x-8 text-sm">
            <a href="#" className="hover:opacity-60 transition-opacity">Privacy Policy</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Terms of Service</a>
            <a href="#" className="hover:opacity-60 transition-opacity">© 2024 All Rights Reserved</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;