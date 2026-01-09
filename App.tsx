
import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Search,
  ChevronUp,
  Flame,
  Snowflake,
  Wind,
  Droplets,
  Thermometer,
  Zap,
  // Added missing Activity icon import
  Activity
} from 'lucide-react';

const App: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Top Bar Navigation */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-900 transition-colors">Home</a>
            <a href="#" className="hover:text-blue-900 transition-colors">Commercial</a>
            <a href="#" className="hover:text-blue-900 transition-colors">Careers</a>
            <a href="#" className="hover:text-blue-900 transition-colors">News & Articles</a>
          </div>
          <div className="flex items-center gap-2">
            <Search className="w-3 h-3" />
            <span>Search</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-4 border-red-600 flex items-center justify-center">
                    <div className="w-4 h-4 bg-red-600 rounded-sm transform rotate-45" />
                  </div>
                </div>
                <div className="ml-2 flex flex-col">
                  <span className="text-xl font-black text-gray-900 leading-none tracking-tighter uppercase italic">
                    TORONTO AIR <span className="text-red-600">SYSTEMS</span>
                  </span>
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-1">
                    Your Passport to Perfect Climate
                  </span>
                </div>
             </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-gray-600">
            <div className="group relative cursor-pointer flex items-center gap-1 hover:text-red-600 transition-colors">
              Heating <ChevronDown className="w-3 h-3" />
            </div>
            <div className="group relative cursor-pointer flex items-center gap-1 hover:text-red-600 transition-colors">
              Cooling <ChevronDown className="w-3 h-3" />
            </div>
            <a href="#" className="hover:text-red-600 transition-colors">Other Services</a>
            <a href="#" className="hover:text-red-600 transition-colors">About Us</a>
            <a href="#" className="hover:text-red-600 transition-colors">Contact</a>
            <a href="#" className="hover:text-red-600 transition-colors text-red-600">Rebates</a>
          </nav>

          <div className="flex items-center gap-4 border-l border-gray-200 pl-8">
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Call Center</span>
              <a href="tel:+16479534252" className="text-lg font-black text-blue-900">+1 (647) 953-4252</a>
            </div>
            <div className="bg-blue-900 p-2 rounded-full text-white">
              <Phone className="w-5 h-5 fill-current" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden flex items-center">
        <img 
          src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2000&auto=format&fit=crop" 
          alt="HVAC technician" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 w-full text-white space-y-6">
          <div className="space-y-2">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-gray-300">Experience the Difference with Toronto Air Systems</span>
            <h2 className="text-6xl font-black max-w-2xl leading-[1.1] tracking-tight">
              The Gold Standard in HVAC Services <br/><span className="italic">in Toronto</span>
            </h2>
          </div>
          
          <div className="flex gap-8 pt-8">
            <button className="flex items-center gap-4 group">
               <div className="bg-red-600 p-4 rounded-full group-hover:bg-red-700 transition-all">
                  <Flame className="w-6 h-6 text-white" />
               </div>
               <div className="text-left">
                  <span className="block text-sm font-black uppercase tracking-widest">Heating</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">View All Heating Services <ChevronRight className="w-3 h-3" /></span>
               </div>
            </button>
            <button className="flex items-center gap-4 group">
               <div className="bg-blue-600 p-4 rounded-full group-hover:bg-blue-700 transition-all">
                  <Snowflake className="w-6 h-6 text-white" />
               </div>
               <div className="text-left">
                  <span className="block text-sm font-black uppercase tracking-widest">Cooling</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">View All Cooling Services <ChevronRight className="w-3 h-3" /></span>
               </div>
            </button>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <div className="bg-blue-900 py-12 relative">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white max-w-md">
            <h3 className="text-xl font-black uppercase tracking-tight mb-2 italic">Trusted Source for Every Heating Needs</h3>
            <p className="text-xs text-blue-200 font-medium opacity-80 uppercase leading-relaxed tracking-wider">
              We have supplied outdoor heating equipment to some of the largest corporations in Toronto and GTA.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-80 grayscale invert">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Ikea_logo.svg" alt="IKEA" className="h-6" />
            <img src="https://www.tridel.com/wp-content/themes/tridel/assets/images/tridel-logo.svg" alt="TRIDEL" className="h-6" />
            <span className="text-xl font-bold text-white uppercase italic">Ryerson University</span>
          </div>
        </div>
      </div>

      {/* Heating Services Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 text-center">
        <div className="space-y-4 mb-20">
          <h2 className="text-4xl font-black text-blue-950 uppercase italic tracking-tight">Heating Services</h2>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Toronto Air Systems is your go-to for unbeatable warmth during Toronto's cold winters. From furnaces to heat pumps, our team ensures efficient installations and repairs, providing you consistent heating solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8">
          <ServiceItem icon={<Flame />} title="Furnaces" />
          <ServiceItem icon={<Thermometer />} title="Boilers" />
          <ServiceItem icon={<Flame />} title="Gas Fireplaces" />
          <ServiceItem icon={<Wind />} title="Outdoor Heating" />
          <ServiceItem icon={<Droplets />} title="Water Heaters" />
          <ServiceItem icon={<Zap />} title="Heat Pumps" />
          <ServiceItem icon={<Thermometer />} title="Floor Heating" />
          <ServiceItem icon={<Snowflake />} title="Snow Melting" />
        </div>
      </section>

      {/* Cooling Services Grid */}
      <section className="py-24 bg-gray-50 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-4 mb-20">
            <h2 className="text-4xl font-black text-blue-950 uppercase italic tracking-tight">Cooling Services</h2>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Brace for Toronto's hot summers with our top-notch cooling services. Whether it's central air conditioners or ductless units, we promise quick installations and reliable maintenance, ensuring your space remains a cool haven.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-16 gap-x-4">
            <ServiceItem icon={<Zap />} title="Heat Pumps" />
            <ServiceItem icon={<Wind />} title="Ductless A/C" />
            <ServiceItem icon={<Droplets />} title="AC Repair Service" />
            <ServiceItem icon={<Snowflake />} title="New Air Conditioner" />
            <ServiceItem icon={<Wind />} title="Chillers" />
          </div>
          <div className="flex justify-center mt-12">
            <ServiceItem icon={<Building2 className="w-10 h-10 text-blue-900 mx-auto" />} title="Commercial HVAC" />
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 text-center">
        <div className="space-y-4 mb-16">
          <h2 className="text-3xl font-black text-blue-950 uppercase italic tracking-tight">Brands We Carry</h2>
          <p className="text-sm text-gray-400 font-medium">We carry a wide variety of highly efficient heating and cooling products from top-rated industry manufacturers.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
           {[
             "BOSCH", "Panasonic", "GREE", "MITSUBISHI ELECTRIC",
             "INFRATECH", "BROMIC", "LG", "Dimplex"
           ].map((brand, i) => (
             <div key={i} className="h-32 flex items-center justify-center p-8 border border-gray-50 grayscale hover:grayscale-0 transition-all cursor-pointer bg-white">
                <span className="text-xl font-black tracking-tighter uppercase italic text-gray-400 hover:text-blue-900">{brand}</span>
             </div>
           ))}
        </div>
      </section>

      {/* Vapi AI Embed Placeholder Section */}
      <section className="bg-slate-900 py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
            <Activity className="w-3 h-3" /> AI Dispatch Console
          </div>
          <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-8 leading-tight">
            Connect With Our AI <br/><span className="text-blue-500">Service Dispatcher</span>
          </h2>
          <p className="text-blue-200/60 mb-12 max-w-xl mx-auto text-lg leading-relaxed">
            Experience the future of HVAC service. Our voice assistant is ready to help with rebates, emergency scheduling, and troubleshooting.
          </p>
          
          <div className="p-1 w-full max-w-2xl mx-auto rounded-[3rem] bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-900 shadow-[0_0_100px_rgba(37,99,235,0.2)]">
            <div className="bg-black/40 backdrop-blur-3xl rounded-[2.9rem] p-20 flex flex-col items-center justify-center border border-white/10 group">
                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8 ring-8 ring-white/5 animate-pulse transition-all group-hover:ring-blue-500/20">
                  <Phone className="w-10 h-10 text-white fill-current" />
                </div>
                <div className="text-white/40 font-mono text-sm uppercase tracking-widest">
                  [ VAPI SDK EMBED SLOT ]
                </div>
                <div className="mt-6 text-xs text-blue-400/60 font-black uppercase tracking-[0.3em]">
                  Ready for integration
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none">Why Choose Toronto Air Systems: <br/><span className="text-blue-400">Our Distinct Advantages</span></h2>
              <p className="text-blue-200/60 leading-relaxed text-sm uppercase font-medium tracking-wide">
                Toronto Air Systems: Your Local Specialist for Air Conditioning, Furnaces, Water Heaters, Plumbing, Electrical Services, and More Across the Greater Toronto Area. Experience Sustainability with our Innovative Green Solutions and Enhance Your Home Living with our Advanced Smart Home Systems. We are not just HVAC experts, we're your all-in-one home comfort solution.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                <AdvantageItem title="Expertise & Experience" desc="With years of service in the Toronto area, our team is comprised of seasoned professionals well-versed with the latest heating and cooling technology." />
                <AdvantageItem title="Customer-Centric Approach" desc="For us, customer satisfaction is paramount. From the moment you contact us until the job is done, we prioritize your needs and concerns." />
                <AdvantageItem title="High-Quality Brands" desc="We believe in delivering the best to our customers. That's why we partner with industry-leading brands, ensuring that products last." />
                <AdvantageItem title="Competitive Pricing" desc="Quality doesn't have to break the bank. At Toronto Air Systems, we offer transparent pricing and often have promotions." />
              </div>
            </div>
            
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/5">
               <img 
                 src="https://images.unsplash.com/photo-1599806112354-67f8b5425a06?q=80&w=800&auto=format&fit=crop" 
                 alt="Quality work" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* 5 Simple Steps */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex flex-col md:flex-row items-center gap-20">
              <div className="flex-1 relative">
                 <div className="relative z-10 transform scale-110">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Map_of_the_Greater_Toronto_Area.svg/800px-Map_of_the_Greater_Toronto_Area.svg.png" alt="GTA Map" className="w-full h-auto opacity-10 grayscale" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <h2 className="text-9xl font-black text-gray-50/10 italic leading-none whitespace-nowrap -rotate-12 select-none">GTA EXPERTS</h2>
                    </div>
                 </div>
              </div>

              <div className="flex-1 space-y-12">
                 <div className="space-y-4">
                   <h2 className="text-5xl font-black text-blue-950 italic uppercase leading-none tracking-tighter">Getting Started with Toronto Air Systems in <span className="text-red-600">5 Simple Steps</span></h2>
                   <p className="text-gray-400 font-medium">Embrace comfort and efficiency with Toronto Air Systems, and experience heating and cooling services that prioritize your satisfaction.</p>
                 </div>

                 <div className="space-y-8">
                    <StepItem num={1} title="Inquiry & Consultation" desc="Begin your journey with us by reaching out through our website, phone, or email. Our team is on standby to address your queries." />
                    <StepItem num={2} title="On-site Evaluation" desc="After the initial discussion, we'll schedule a convenient time for an on-site evaluation. Our expert technicians will assess your property." />
                    <StepItem num={3} title="Personalized Recommendations" desc="Based on the assessment, we'll provide a detailed recommendation tailored to your specific needs." />
                    <StepItem num={4} title="Seamless Installation & Setup" desc="Once you've chosen the recommended solution, our licensed professionals will handle the installation process." />
                    <StepItem num={5} title="After-Sales Support" desc="Our commitment to you doesn't end post-installation. We offer ongoing maintenance, support, and guidance." />
                 </div>

                 <button className="bg-blue-950 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-blue-900/20 active:scale-95">
                    GET A QUOTE NOW
                 </button>
              </div>
           </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="space-y-4 mb-16">
            <h2 className="text-5xl font-black text-blue-950 uppercase italic tracking-tighter">FAQ</h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Most frequent questions and answers</p>
          </div>

          <div className="space-y-4 text-left">
            {[
              "What makes Toronto Air Systems stand out in the HVAC industry?",
              "Which cities and areas do you cover for your services?",
              "Do you offer environmentally friendly HVAC solutions?",
              "How does Toronto Air Systems ensure the quality of its heating and cooling systems?",
              "What is the range of services you offer?",
              "How does the service and maintenance contract work?",
              "Do you provide emergency repair services?",
              "How do I know when it's time to replace my existing HVAC system?",
              "Can I get a quote before committing to a service?",
              "How do you ensure the safety of your installation and repair procedures?",
              "How can I avail of your services or learn more?"
            ].map((q, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-all hover:border-blue-200">
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full p-8 flex items-center justify-between text-left group"
                >
                  <span className={`text-[13px] font-black uppercase tracking-wider transition-colors ${activeFaq === i ? 'text-red-600' : 'text-blue-950 group-hover:text-blue-600'}`}>
                    {q}
                  </span>
                  <div className={`p-2 rounded-lg transition-all ${activeFaq === i ? 'bg-red-50 text-red-600 rotate-180' : 'bg-gray-50 text-gray-400'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                {activeFaq === i && (
                  <div className="px-8 pb-8 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-6 animate-in fade-in slide-in-from-top-4 duration-300">
                    Toronto Air Systems provides comprehensive services across the GTA with a focus on high-quality heritage home retrofitting and energy-efficient solutions. Contact our dispatch team at +1 (647) 953-4252 for detailed specifics on this query.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
           <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Over a Thousand Happy Customers and Counting</span>
           <h2 className="text-5xl font-black text-blue-950 uppercase italic tracking-tighter max-w-3xl mx-auto leading-tight">
              Discover why Toronto Air Systems is the preferred choice for HVAC services in Toronto and the GTA.
           </h2>
           <button className="bg-blue-900 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-blue-950 transition-all flex items-center gap-4 mx-auto group">
             <Search className="w-5 h-5" /> LEARN MORE
           </button>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex flex-col md:flex-row justify-between gap-12 mb-20">
              <div className="space-y-8 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-4 border-red-600 flex items-center justify-center">
                    <div className="w-3 h-3 bg-red-600 transform rotate-45" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-black text-gray-900 italic uppercase leading-none tracking-tighter">
                      TORONTO AIR <span className="text-red-600">SYSTEMS</span>
                    </span>
                    <span className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">
                      Your Passport to Perfect Climate
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-900">Customer Service</h4>
                  <ul className="text-xs text-gray-400 space-y-2 font-medium">
                    <li><a href="#" className="hover:text-red-600 transition-colors">Payments and Financing</a></li>
                    <li><a href="#" className="hover:text-red-600 transition-colors">Rental Program</a></li>
                    <li><a href="#" className="hover:text-red-600 transition-colors">Rebates & Incentives</a></li>
                  </ul>
                </div>
              </div>

              <FooterNav title="Heating" items={["Furnaces", "Boilers", "Water Heaters", "Outdoor Heaters", "Gas Fireplaces", "Floor Heating"]} />
              <FooterNav title="Cooling" items={["Buy A New A/C", "A/C Repair", "Ductless Air Conditioners", "Heat Pumps", "Chillers", "Commercial HVAC"]} />
              <FooterNav title="Our Company" items={["About Us", "Why Us?", "Contact Center", "News & Articles", "Careers"]} />
              <FooterNav title="Terms & Policies" items={["Privacy Policy", "Terms & Conditions", "Cookie Policy", "Disclaimer", "Product Safety & Recalls"]} />
              
              <div className="text-right flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Sales & Support</span>
                <a href="tel:+16479534252" className="text-2xl font-black text-blue-900">+1 (647) 953-4252</a>
              </div>
           </div>

           <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest gap-6">
              <div className="flex items-center gap-6">
                 <button className="bg-gray-900 text-white px-6 py-2 rounded-md flex items-center gap-3">
                   <MapPin className="w-3 h-3 text-red-600" /> VISIT OUR LOCATION
                 </button>
                 <span>Copyright © 2025 Toronto Air Systems by Prime Home Society Inc.</span>
              </div>
              <div className="flex items-center gap-6 grayscale opacity-40">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-4" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                 <span className="text-black font-black italic">Norton</span>
              </div>
           </div>
        </div>

        {/* Floating Scroll Top */}
        <button className="fixed bottom-10 right-10 bg-white border border-gray-100 shadow-xl p-3 rounded-xl hover:bg-gray-50 transition-all active:scale-95 group z-50">
          <ChevronUp className="w-6 h-6 text-gray-400 group-hover:text-blue-900" />
        </button>
      </footer>
    </div>
  );
};

const ServiceItem = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
  <div className="group cursor-pointer">
    <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-gray-50 rounded-2xl border border-gray-100 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all shadow-sm">
      {React.cloneElement(icon as React.ReactElement, { className: 'w-8 h-8 text-blue-900 transition-transform group-hover:scale-110' })}
    </div>
    <h4 className="text-[13px] font-black text-blue-950 uppercase tracking-wider mb-2">{title}</h4>
    <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">LEARN MORE</span>
  </div>
);

const AdvantageItem = ({ title, desc }: { title: string, desc: string }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-3">
      <CheckCircle2 className="w-5 h-5 text-blue-400" />
      <h5 className="text-[13px] font-black uppercase tracking-widest">{title}</h5>
    </div>
    <p className="text-xs text-blue-200/50 leading-relaxed font-medium">{desc}</p>
  </div>
);

const StepItem = ({ num, title, desc }: { num: number, title: string, desc: string }) => (
  <div className="flex gap-6 group">
    <div className="flex flex-col items-center">
       <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 font-black flex items-center justify-center border border-blue-100 transition-colors group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500">
         {num}
       </div>
       {num < 5 && <div className="flex-1 w-0.5 bg-gray-100 my-2" />}
    </div>
    <div className="pb-8 space-y-2">
       <h4 className="text-sm font-black text-blue-950 uppercase tracking-widest italic">{title}</h4>
       <p className="text-xs text-gray-400 leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);

const FooterNav = ({ title, items }: { title: string, items: string[] }) => (
  <div className="space-y-6">
    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-900">{title}</h4>
    <ul className="text-xs text-gray-400 space-y-3 font-medium">
      {items.map((item, i) => (
        <li key={i}><a href="#" className="hover:text-red-600 transition-colors">{item}</a></li>
      ))}
    </ul>
  </div>
);

const Building2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
    <path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
  </svg>
);

export default App;
