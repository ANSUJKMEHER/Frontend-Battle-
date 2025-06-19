
"use client";

import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HighlightedKeyword } from "@/components/highlighted-keyword";
import { Button } from "@/components/ui/button";
import { Star, Briefcase, TrendingUp, PieChart, BarChart2, Zap, Mail, ChevronUp, Quote } from "lucide-react";
import { AppLoader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { ThemeToggleButton } from "@/components/theme-toggle-button";
import { ComparisonChart } from "@/components/comparison-chart";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


export interface Settings {
  hoverDelay: number;
  insightsEnabled: boolean;
}

const initialSettings: Settings = {
  hoverDelay: 200,
  insightsEnabled: true,
};

const mainTextContent = "Create reports, forecasts, dashboards & consolidations";
const keywordsToHighlight = ["reports", "forecasts", "dashboards", "consolidations"];

const renderTextWithHighlights = (
  text: string,
  keywords: string[],
  HighlightComponent: React.FC<any>,
  currentSettings: Settings
) => {
  if (!currentSettings.insightsEnabled || keywords.length === 0) {
    return [<React.Fragment key="fulltext">{text}</React.Fragment>];
  }

  const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
  const regexPattern = `(${sortedKeywords.map(kw => kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})`;
  const regex = new RegExp(regexPattern, 'gi');
  const parts = text.split(regex);
  let keyIndex = 0;

  return parts.map((part) => {
    const lowerPart = part.toLowerCase();
    const matchedKeyword = sortedKeywords.find(kw => kw.toLowerCase() === lowerPart);
    if (matchedKeyword) {
      return (
        <HighlightComponent
          key={`highlight-${keyIndex++}-${matchedKeyword}`}
          keyword={matchedKeyword}
          settings={currentSettings}
        >
          {part}
        </HighlightComponent>
      );
    }
    return <React.Fragment key={`text-${keyIndex++}`}>{part}</React.Fragment>;
  });
};

const ratings = [
  { name: "Capterra", rating: "4.8", reviews: "rating on", icon: <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> },
  { name: "G2", rating: "4.8", reviews: "rating on", icon: <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> },
  { name: "Xero", rating: "350+", reviews: "reviews on", icon: <TrendingUp className="w-4 h-4 text-sky-400" /> },
  { name: "QuickBooks", rating: "550+", reviews: "reviews on", icon: <PieChart className="w-4 h-4 text-green-400" /> },
];

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Features", href: "#features" },
  { name: "Why Us?", href: "#why-us" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  rating: number;
}

const initialTestimonialData: Testimonial[] = [
  {
    quote: "Insightful has revolutionized how we handle our finances. The AI-powered reports are a game-changer!",
    author: "Jane Doe",
    title: "CEO, Tech Solutions Inc.",
    rating: 5,
  },
  {
    quote: "The accuracy of their forecasting tools is unmatched. We've saved countless hours and resources.",
    author: "John Smith",
    title: "CFO, Global Corp",
    rating: 5,
  },
  {
    quote: "Finally, a financial platform that understands our needs. The dashboards are intuitive and powerful.",
    author: "Alice Brown",
    title: "Founder, Creative Co.",
    rating: 4,
  },
  {
    quote: "Customer support is top-notch! They are always ready to help with any query.",
    author: "Michael Lee",
    title: "Manager, Biz Dynamics",
    rating: 5,
  },
  {
    quote: "The consolidation feature alone is worth the price. It's made our month-end closing so much smoother.",
    author: "Sarah Wilson",
    title: "Accountant, Numbers Pro",
    rating: 5,
  }
];

const AnimatedSection = ({ id, children, className }: { id: string, children: React.ReactNode, className?: string }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current && observer) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn(
        "py-16 md:py-24 min-h-[60vh] transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
    >
      {children}
    </section>
  );
};


export default function HomePage() {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

 useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleScroll = useCallback(() => {
    const sections = navLinks.map(link => link.href.substring(1));
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element && element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
        setActiveSection(sectionId);
        break;
      }
    }
    setShowScrollTop(window.scrollY > 300);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const processedTitle = useMemo(() =>
    renderTextWithHighlights(
      mainTextContent,
      keywordsToHighlight,
      HighlightedKeyword,
      settings
    ), [settings]);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });

      const link = e.currentTarget;
      const existingRipple = link.querySelector('.ripple');
      if (existingRipple) {
        existingRipple.remove();
      }

      const ripple = document.createElement('span');
      const rect = link.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      ripple.classList.add('ripple');
      link.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <TooltipProvider key={settings.hoverDelay.toString()} delayDuration={settings.hoverDelay}>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-background text-foreground relative overflow-hidden">

        <Image src="https://placehold.co/400x300.png" alt="decorative background chart" data-ai-hint="financial chart" width={400} height={300} className="absolute top-1/4 left-[-50px] opacity-[0.07] blur-md transform -rotate-12 pointer-events-none" />
        <Image src="https://placehold.co/300x450.png" alt="decorative background report" data-ai-hint="data report" width={300} height={450} className="absolute top-10 right-[-80px] opacity-[0.07] blur-lg transform rotate-6 pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-30 animate-pulse pointer-events-none" data-ai-hint="abstract circle"></div>
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-accent/10 rounded-full blur-xl opacity-30 animate-pulse delay-500 pointer-events-none" data-ai-hint="gradient orb"></div>
        <div className="absolute top-20 left-1/2 w-60 h-60 bg-secondary/5 rounded-full blur-3xl opacity-20 animate-ping-slow pointer-events-none" data-ai-hint="dotted pattern"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/5 rounded-2xl blur-2xl opacity-25 transform rotate-45 animate-pulse-slow pointer-events-none" data-ai-hint="soft glow"></div>

        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <a href="#home" onClick={(e) => handleNavLinkClick(e, "#home")} className="text-2xl font-bold text-primary">
                  Insightful
                </a>
              </div>
              <nav className="hidden md:flex items-center space-x-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavLinkClick(e, link.href)}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium relative overflow-hidden",
                      activeSection === link.href.substring(1)
                        ? "text-primary bg-primary/10"
                        : "text-foreground/70 hover:text-foreground hover:bg-foreground/5",
                      "transition-colors duration-150"
                    )}
                  >
                    {link.name}
                  </a>
                ))}
                 <ThemeToggleButton />
              </nav>
               <div className="md:hidden flex items-center">
                <ThemeToggleButton />
                {/* Add mobile menu trigger here if needed */}
              </div>
            </div>
          </div>
        </header>

        <div id="home" className="pt-16">
          <div className="w-full py-5 px-4 sm:px-8 md:px-16 z-10">
            <div className="container mx-auto flex flex-wrap justify-center items-center gap-x-6 lg:gap-x-10 gap-y-2 text-sm text-foreground/80 mt-8">
              {ratings.map((item, index) => (
                <div key={index} className="flex items-center space-x-1.5">
                  {item.icon}
                  <span><strong>{item.rating}</strong> {item.reviews} <span className="font-semibold text-foreground/90">{item.name}</span></span>
                </div>
              ))}
            </div>
          </div>

          <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-10 sm:py-16 z-10 min-h-[calc(100vh-4rem-5rem)]">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60">
              {processedTitle}
            </h1>
            <p className="text-xl sm:text-2xl mb-10 text-foreground/80 flex items-center">
              <span role="img" aria-label="sparkles" className="mr-2 text-2xl">✨</span>
              Now with AI-insights
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <Button
                size="lg"
                className="px-8 py-3 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transform transition-transform hover:scale-105"
                aria-label="Start 14-day free trial"
              >
                Start 14-day free trial &gt;
              </Button>
              <Button
                variant="link"
                size="lg"
                className="text-accent hover:text-accent/80 font-semibold text-base group"
                aria-label="See what we do"
                onClick={(e) => handleNavLinkClick(e, "#services")}
              >
                <Briefcase className="mr-2 h-5 w-5 transition-transform group-hover:rotate-[-5deg]" /> See what we do
              </Button>
            </div>
          </main>
        </div>

        <AnimatedSection id="services" className="bg-background/30 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">Our Services</h2>
                <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                    We offer a comprehensive suite of AI-powered financial tools to streamline your business operations.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "AI Reporting", icon: <BarChart2 className="w-10 h-10 text-accent mx-auto mb-4" />, desc: "Generate insightful financial reports automatically." , dataAiHint: "financial report"},
                        { title: "Smart Forecasting", icon: <TrendingUp className="w-10 h-10 text-accent mx-auto mb-4" />, desc: "Predict future financial trends with high accuracy." , dataAiHint: "growth chart"},
                        { title: "Automated Dashboards", icon: <PieChart className="w-10 h-10 text-accent mx-auto mb-4" />, desc: "Visualize your financial data in real-time dashboards." , dataAiHint: "data dashboard"},
                    ].map((service, index) => (
                        <div key={index} className="bg-card p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center" data-ai-hint={service.dataAiHint}>
                               {service.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-card-foreground">{service.title}</h3>
                            <p className="text-muted-foreground text-sm">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>

        <AnimatedSection id="features">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">Key Features</h2>
                <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Discover the powerful features that make our platform stand out.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                     {[
                        { title: "Real-time Consolidation", icon: <Zap className="w-8 h-8 text-accent" />, desc: "Consolidate data from multiple sources instantly." , dataAiHint: "connected data"},
                        { title: "Advanced AI Insights", icon: <Star className="w-8 h-8 text-accent" />, desc: "Leverage cutting-edge AI for deeper financial understanding." , dataAiHint: "brain gears"},
                        { title: "Secure & Reliable", icon: <Briefcase className="w-8 h-8 text-accent" />, desc: "Bank-level security to protect your sensitive data." , dataAiHint: "secure lock"},
                        { title: "Easy Integration", icon: <PieChart className="w-8 h-8 text-accent" />, desc: "Seamlessly connect with your existing financial software." , dataAiHint: "puzzle pieces"},
                    ].map((feature, index) => (
                         <div key={index} className="bg-card p-8 rounded-xl shadow-xl flex items-start space-x-4 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center" data-ai-hint={feature.dataAiHint}>
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1 text-card-foreground text-left">{feature.title}</h3>
                                <p className="text-muted-foreground text-sm text-left">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>

        <AnimatedSection id="why-us" className="bg-background/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">Why Choose Insightful?</h2>
                <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                    See how our platform outperforms the competition and delivers tangible results for your business.
                </p>
                <ComparisonChart />
            </div>
        </AnimatedSection>

       <AnimatedSection id="testimonials">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Hear directly from businesses that have transformed their financial operations with Insightful.
            </p>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto"
            >
              <CarouselContent>
                {initialTestimonialData.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-2">
                    <div className="p-1 h-full">
                      <Card className="bg-card p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                        <CardContent className="flex flex-col items-center text-center flex-grow pt-6">
                          <Quote className="w-8 h-8 text-primary mb-4 opacity-75 transform -scale-x-100" />
                          <p className="text-muted-foreground italic mb-4 text-sm leading-relaxed flex-grow">"{testimonial.quote}"</p>
                          <div className="flex items-center mb-2 mt-auto">
                            {Array(testimonial.rating).fill(0).map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            ))}
                            {Array(5 - testimonial.rating).fill(0).map((_, i) => (
                              <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                            ))}
                          </div>
                          <h4 className="font-semibold text-card-foreground mt-2">{testimonial.author}</h4>
                          <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-[-1rem] sm:left-[-2rem] md:left-[-3rem]" />
              <CarouselNext className="right-[-1rem] sm:right-[-2rem] md:right-[-3rem]" />
            </Carousel>
          </div>
        </AnimatedSection>

        <AnimatedSection id="contact" className="bg-background/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">Get in Touch</h2>
                <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
                    Have questions or want to learn more? Reach out to us!
                </p>
                <Button size="lg" className="px-10 py-4 text-lg font-semibold rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform transition-transform hover:scale-105">
                    <Mail className="mr-2 h-5 w-5" /> Contact Sales
                </Button>
            </div>
        </AnimatedSection>

        <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border mt-auto z-10">
          <p>&copy; {currentYear || new Date().getFullYear()} Insightful AI Tools Inc. All rights reserved. Made by Ansuj K Meher</p>
        </footer>

        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full p-0 shadow-lg bg-primary hover:bg-primary/90"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
        )}
      </div>
    </TooltipProvider>
  );
}
