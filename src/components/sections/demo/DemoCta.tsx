import { Share2 } from "lucide-react";

export default function DemoCta() {
  return (
    <section className="w-full bg-black py-20 md:py-32 border-b border-neutral-800">
      <div className="container-base">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Want to See Your Own<br />Infrastructure Live?
            </h2>
            <p className="text-base md:text-lg text-neutral-400 leading-relaxed mb-10 max-w-md">
              Book a personalized session with our engineering team to map your physical assets to a digital twin prototype.
            </p>
            <button className="px-6 py-4 bg-white text-black text-[10px] font-bold tracking-widest uppercase rounded hover:bg-neutral-200 transition-colors">
              CONNECT WITH AN ARCHITECT
            </button>
          </div>
          
          {/* Right Graphic */}
          <div className="flex justify-center md:justify-end w-full">
            <div className="relative w-full md:w-[110%] md:-mr-10 lg:-mr-16 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/images/demo/Industrial%20Digital%20Twin%20Network.png" 
                alt="Industrial Digital Twin Network" 
                className="w-full h-auto object-cover opacity-30"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}