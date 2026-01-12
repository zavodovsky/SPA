import { useState, useEffect } from "react";
import { translations, type Language } from "@/lib/translations";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { motion } from "framer-motion";
import { Menu, X, Check, MapPin, Phone, Mail, Instagram } from "lucide-react";
import { Link } from "react-scroll";

// Assets imports
import heroBg from "@assets/stock_images/luxury_spa_interior__184e2e09.jpg";
import faceImg from "@assets/stock_images/woman_receiving_rela_4c2edbcc.jpg";
import yogaImg from "@assets/stock_images/woman_doing_yoga_or__cb632fb3.jpg";
import nailImg from "@assets/stock_images/professional_manicur_78087fd9.jpg";
import hairImg from "@assets/stock_images/hairdresser_styling__43a5c41a.jpg";

export default function Home() {
  const [lang, setLang] = useState<Language>('de');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const createInquiry = useCreateInquiry();

  // Handle Scroll Effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createInquiry.mutate({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    });
    // Optional: reset form after success
    if (createInquiry.isSuccess) {
      (e.target as HTMLFormElement).reset();
    }
  };

  const navLinks = [
    { name: t.nav.home, to: "home" },
    { name: t.nav.services, to: "services" },
    { name: t.nav.top10, to: "top10" },
    { name: t.nav.contact, to: "contact" },
  ];

  const top10List = [
    "Thermal Bath Treatments",
    "Aroma Massages",
    "Facial Treatments",
    "Body Scrubs & Exfoliation",
    "Sauna Experiences",
    "Mayr Medicine Programs",
    "Medical Beauty Treatments",
    "Ayurvedic Treatments",
    "Ladies' Spa / Silent Spa",
    "Body Massage Therapies"
  ];

  return (
    <div className="min-h-screen font-sans bg-background selection:bg-primary/20">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="text-2xl font-display font-bold tracking-widest text-primary">
            SPA <span className="text-foreground">AUSTRIA</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth={true}
                duration={500}
                className={`cursor-pointer text-sm uppercase tracking-widest font-medium hover:text-primary transition-colors ${isScrolled ? 'text-foreground' : 'text-white md:text-foreground lg:text-white mix-blend-difference'}`}
              >
                {link.name}
              </Link>
            ))}
            <LanguageSwitcher currentLang={lang} setLang={setLang} />
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shadow-lg shadow-primary/25">
              {t.nav.book}
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher currentLang={lang} setLang={setLang} />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-primary">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 px-6 flex flex-col space-y-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth={true}
                duration={500}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-foreground hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Luxury Spa" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="container relative z-10 px-4 text-center text-white">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-script text-4xl md:text-6xl text-primary-foreground/90 block mb-4"
          >
            {t.hero.subtitle}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight"
          >
            {t.hero.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="services" smooth={true} duration={500}>
              <Button size="lg" className="bg-white text-foreground hover:bg-primary hover:text-white rounded-full px-8 py-6 text-lg transition-all duration-300">
                {t.hero.cta}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">{t.services.title}</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full" />
            <p className="text-muted-foreground text-lg md:text-xl font-light">{t.services.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard 
              title={t.services.faceMassage}
              description={t.services.faceMassageDesc}
              image={faceImg}
              delay={0.1}
            />
            <ServiceCard 
              title={t.services.fitness}
              description={t.services.fitnessDesc}
              image={yogaImg}
              delay={0.2}
            />
            <ServiceCard 
              title={t.services.nails}
              description={t.services.nailsDesc}
              image={nailImg}
              delay={0.3}
            />
            <ServiceCard 
              title={t.services.hair}
              description={t.services.hairDesc}
              image={hairImg}
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Top 10 Section */}
      <section id="top10" className="py-24 relative overflow-hidden">
        {/* Abstract background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform translate-x-1/2" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <span className="text-primary font-bold tracking-widest uppercase mb-2 block">Exclusive</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-foreground leading-tight">
                {t.top10.title}
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                {t.top10.subtitle}
              </p>
              <div className="bg-secondary/50 p-8 rounded-2xl border border-secondary">
                <p className="italic font-display text-xl text-foreground/80">
                  "Austria has a rich tradition of wellness. These treatments represent the pinnacle of European spa culture."
                </p>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {top10List.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-50"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold font-display mr-4 shrink-0">
                      {index + 1}
                    </div>
                    <span className="font-medium text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-foreground text-white relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">{t.contact.title}</h2>
              <p className="text-gray-400 text-lg mb-12">{t.contact.subtitle}</p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <MapPin />
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-semibold mb-1">Visit Us</h4>
                    <p className="text-gray-400">Kärntner Straße 12, 1010 Wien<br />Austria</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Phone />
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-semibold mb-1">Call Us</h4>
                    <p className="text-gray-400">+43 1 234 5678</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Mail />
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-semibold mb-1">Email Us</h4>
                    <p className="text-gray-400">booking@luxuryspa-austria.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-10 text-foreground shadow-2xl">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium ml-1">{t.contact.name}</label>
                    <Input name="name" required placeholder="Jane Doe" className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors py-6" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium ml-1">{t.contact.email}</label>
                    <Input name="email" type="email" required placeholder="jane@example.com" className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors py-6" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium ml-1">{t.contact.subject}</label>
                  <Input name="subject" placeholder="Reservation Request" className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors py-6" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium ml-1">{t.contact.message}</label>
                  <Textarea name="message" required placeholder="I would like to book a session..." className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors min-h-[150px] resize-none" />
                </div>
                <Button 
                  type="submit" 
                  disabled={createInquiry.isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {createInquiry.isPending ? t.contact.sending : t.contact.send}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 text-white/50 text-sm border-t border-white/10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-white font-display text-lg tracking-widest mr-2">SPA AUSTRIA</span>
            <span>&copy; 2024 {t.footer.rights}</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
