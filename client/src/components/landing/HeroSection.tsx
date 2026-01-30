import { ContactForm } from "@/components/landing/ContactForm";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full min-h-screen md:min-h-[700px] text-white overflow-hidden bg-black pb-12 md:pb-0">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/assets/landing-hero.png"
          alt="Consultation, Design, & Marketing"
          className="object-cover w-full h-full"
        />
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative container mx-auto px-4 pt-32 pb-12 md:h-screen flex items-center">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-12 w-full items-center">

          <div className="space-y-6 text-left z-10">
            <h1 className={cn("text-5xl md:text-7xl font-bold tracking-tight font-headline text-white drop-shadow-lg leading-tight")}>
              Consultation,<br />
              Design,<br />
              & Marketing
            </h1>
            <p className="max-w-[500px] text-lg md:text-xl text-white/90 font-medium drop-shadow-md">
              Your partner in creating exceptional real estate experiences. We bring vision to life.
            </p>
          </div>

          <div className="flex justify-center md:justify-end w-full z-10 mt-8 md:mt-0">
            <div className="w-full max-w-sm md:max-w-xl bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
