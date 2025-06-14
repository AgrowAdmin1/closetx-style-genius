
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import AppLayout from '@/components/Layout/AppLayout';

// ---- NEW FEATURE CARDS FOR SOCIAL/STYLE/EVENT PLATFORM ---- //
const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasLoggedIn = localStorage.getItem('isLoggedIn');
    setIsAuthenticated(!!hasLoggedIn);
  }, []);

  if (isAuthenticated) {
    // Authenticated users see the social movement feed or event stories
    return (
      <AppLayout weather={{ temp: 28, condition: 'Sunny' }}>
        <div className="flex flex-col items-center justify-center py-24 space-y-10">
          <h2 className="text-3xl font-black text-center text-closetx-teal">Your Movements & Stories</h2>
          <p className="text-lg text-center text-gray-700 max-w-xl">
            Welcome to your new social playground! Scroll stories, join upcoming trips, dinners, shows, and exclusive women-only events. 
            See what your friends are planning and never miss a moment to shine—or flaunt your style!
          </p>
          <Button className="bg-closetx-teal px-8 py-5 text-white text-lg font-semibold" onClick={() => navigate("/marketplace")}>
            Discover Movements & Outfits
          </Button>
        </div>
      </AppLayout>
    );
  }

  // ---------- ONBOARDING / LANDING PAGE FOR NEW USERS ----------- //
  return (
    <div className="flex flex-col min-h-screen bg-closetx-offwhite">
      {/* HERO / TOP BANNER */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-20 md:py-32 bg-gradient-to-br from-pink-100/60 to-closetx-teal/20">
        <div className="absolute inset-0 z-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1517841905240-472988babdf9')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl font-black tracking-tight text-closetx-teal drop-shadow-lg">
            Movements, Outings & Fashion Stories
          </h1>
          <p className="mt-6 text-xl text-closetx-charcoal/90 font-medium">
            Plan, join, and show off the best women-only events with a personal style assistant.<br />
            Book dinners, concerts, trips—see friends’ stories, get inspired, and claim your spot!
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild className="bg-closetx-teal hover:bg-closetx-teal/90 text-white text-lg px-8 py-5 font-bold shadow-lg">
              <Link to="/signup">Claim Your Spot</Link>
            </Button>
            <Button asChild variant="outline" className="border-closetx-teal text-closetx-teal px-8 py-5 font-bold">
              <Link to="/login">Already a Member?</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURES: SOCIAL / FOMO / WOMEN-ONLY MOVEMENTS */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12 text-closetx-teal">Why You'll Love Movements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard
              icon="🎟️"
              title="Book Outings With Your Tribe"
              description="Plan, book, and join dinners, concerts, trips & more. See where your friends are going (or what you're missing)!"
            />
            <FeatureCard
              icon="😍"
              title="Outfit Jealousy! Steal the Spotlight"
              description="Generate AI-powered outfit ideas for every event—try on virtually, share, or snag the hottest look before anyone else."
            />
            <FeatureCard
              icon="💬"
              title="Feel FOMO? Join The Movement"
              description="Watch event stories, spot who's in, and join or create movements with just a tap. Tag your squad and let the buzz begin!"
            />
          </div>
        </div>
      </section>

      {/* SMART VIRTUAL TRY-ON SECTION */}
      <section className="py-16 px-4 bg-pink-50/80">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center justify-center">
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=480&q=80"
              alt="Try outfits"
              className="rounded-xl shadow-lg mx-auto object-cover max-h-80"
            />
          </div>
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-extrabold text-closetx-teal mb-2">Virtual Outfit Try-On</h3>
            <p className="text-gray-700 text-lg">Never second-guess your look! Upload your photo, try AI-recommended outfits, and share the perfect style for every event—before you buy.</p>
            <Button asChild size="lg" className="bg-closetx-teal text-white shadow-md">
              <Link to="/marketplace">Try Outfits Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SOCIAL BUZZ: SEE, JOIN, SHARE EVENTS */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12 text-closetx-teal">Your Social Stage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard
              icon="👯‍♀️"
              title="See What They're Up To"
              description="Scroll live stories and events — don't let your bestie make plans without you! (Or show off your own celebration flair.)"
            />
            <FeatureCard
              icon="🌟"
              title="Share & Spark Jealousy"
              description="Your new saree, your Dubai trip, your next girls' dinner—showcase, celebrate, and inspire squad-level envy."
            />
            <FeatureCard
              icon="🤫"
              title="Exclusive Members-Only Perks"
              description="VIP bookings. Priority outfit drops. Secret girls’ nights. Upgrade your circle with moves only found here."
            />
          </div>
        </div>
      </section>

      {/* CTA: JOIN THE INNER CIRCLE */}
      <section className="py-16 px-4 bg-closetx-teal text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-4">Be Part of Every Movement</h2>
          <p className="text-lg mb-8">
            Don’t just watch—join in and stand out. Be the first to know, to plan, to flaunt, and to connect. For women, girls, and every sisterhood.  
          </p>
          <Button asChild size="lg" className="bg-white text-closetx-teal hover:bg-gray-100 font-bold text-lg px-7 py-5">
            <Link to="/signup">Get Started — It’s Girls Time</Link>
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-4 bg-closetx-charcoal text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-black text-closetx-teal mb-4">MovementsX</h3>
              <p className="text-gray-400 max-w-xs">
                End-to-end platform for women’s events, movements, and fashion. Where girls rule, connect, and make every moment memorable.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <FooterColumn title="Movements">
                <FooterLink href="#">Events</FooterLink>
                <FooterLink href="#">Stories</FooterLink>
                <FooterLink href="#">Outfit Generator</FooterLink>
              </FooterColumn>
              <FooterColumn title="Community">
                <FooterLink href="#">About</FooterLink>
                <FooterLink href="#">Blog</FooterLink>
                <FooterLink href="#">Contact</FooterLink>
              </FooterColumn>
              <FooterColumn title="Trust & Safety">
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms of Use</FooterLink>
              </FooterColumn>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-700 text-center md:text-left text-gray-400 text-sm">
            © {new Date().getFullYear()} MovementsX. For Women, By Women—All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- FeatureCard and Footer components kept but themed more playfully --- //
const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => (
  <div className="text-center p-7 rounded-xl border border-closetx-teal/20 bg-white shadow-md hover:shadow-xl animate-fade-in transition-shadow">
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-lg font-bold mb-2 text-closetx-teal">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FooterColumn = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h4 className="text-lg font-semibold mb-3">{title}</h4>
    <ul className="space-y-2">{children}</ul>
  </div>
);

const FooterLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <li>
    <a
      href={href}
      className={cn(
        "text-gray-400 hover:text-white transition-colors duration-200",
        className
      )}
    >
      {children}
    </a>
  </li>
);

export default Home;
