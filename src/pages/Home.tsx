import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import AppLayout from '@/components/Layout/AppLayout';

// ---- NEW FEATURE CARDS FOR SOCIAL/STYLE/EVENT PLATFORM ---- //
const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [liveJoinCount, setLiveJoinCount] = useState<number>(321); // Simulated for FOMO
  const navigate = useNavigate();

  useEffect(() => {
    const hasLoggedIn = localStorage.getItem('isLoggedIn');
    setIsAuthenticated(!!hasLoggedIn);

    // Simulated, slightly increasing join count for FOMO
    const tick = setInterval(() => {
      setLiveJoinCount((prev) =>
        prev < 600 ? prev + Math.floor(Math.random() * 3) : prev
      );
    }, 2500);
    return () => clearInterval(tick);
  }, []);

  if (isAuthenticated) {
    // Authenticated users see the social movement feed or event stories
    return (
      <AppLayout weather={{ temp: 28, condition: 'Sunny' }}>
        <div className="flex flex-col items-center justify-center py-24 space-y-10 animate-fade-in">
          <h2 className="text-3xl font-black text-center text-closetx-teal">
            Your Movements & Stories
          </h2>
          <p className="text-lg text-center text-gray-700 max-w-xl">
            See who's planning what, what you're missing, and what you <span className="font-semibold text-closetx-teal">don’t want to miss next</span>! Hot events are filling fast—join the trending stories, or risk FOMO 🥹.
          </p>
          <Button
            className={cn(
              "bg-closetx-teal px-8 py-5 text-white text-lg font-semibold relative flex items-center justify-center animate-bounce",
              "hover:scale-105 transition-transform"
            )}
            onClick={() => navigate("/marketplace")}
          >
            <span>Discover Movements & Outfits</span>
            <span className="ml-3 text-xs bg-pink-500/90 text-white px-3 py-1 rounded-full animate-pulse absolute -top-3 right-0 shadow-lg">🔥 {liveJoinCount}+ joining!</span>
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
          <h1 className="text-5xl font-black tracking-tight text-closetx-teal drop-shadow-lg mb-2 animate-fade-in">
            Movements, Outings & Fashion Stories
          </h1>
          <p className="mt-6 text-xl text-closetx-charcoal/90 font-medium">
            <span className="text-pink-500 font-bold">Don’t Be Left Out!</span> Plan, join, and show off the boldest women-only events <span className="underline text-closetx-teal decoration-pink-400">before your friends do</span>.<br />
            Your next story is waiting—but spots close fast. 
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild className="bg-closetx-teal hover:bg-closetx-teal/90 text-white text-lg px-8 py-5 font-bold shadow-lg relative group overflow-visible animate-bounce">
              <Link to="/signup" className="relative">
                Claim Your Spot
                <span className="absolute -top-4 right-0 px-3 py-1 bg-pink-500/90 text-white text-xs font-bold rounded-full shadow animate-pulse z-20 group-hover:scale-110">
                  Spots Filling Fast!
                </span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-closetx-teal text-closetx-teal px-8 py-5 font-bold">
              <Link to="/login">Already a Member?</Link>
            </Button>
          </div>
          <div className="mt-7 text-gray-700 font-semibold animate-fade-in">
            <span className="bg-yellow-100 rounded-full px-4 py-1 text-sm text-orange-600 shadow">
              {liveJoinCount}+ women joined in the last week!
            </span>
          </div>
        </div>
      </section>

      {/* FEATURES: SOCIAL / FOMO / WOMEN-ONLY MOVEMENTS */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12 text-closetx-teal animate-fade-in">Don't Let FOMO Win</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard
              icon="🎟️"
              badge="Almost Full!"
              badgeColor="bg-pink-500"
              title="Book Outings With Your Tribe"
              description={
                <span>
                  <b className="text-pink-500/90">Only a few spots left!</b> Plan, book, and join dinners, concerts, trips & more.<br />
                  See where your friends are going, and <b>don’t get left behind</b>.
                </span>
              }
            />
            <FeatureCard
              icon="😍"
              badge="Trending Now!"
              badgeColor="bg-yellow-400/90"
              title="Outfit Jealousy! Steal the Spotlight"
              description={
                <span>
                  Your friends are already generating AI-powered looks.<br />
                  <b className="text-pink-500/90">Show off in the hottest outfits</b> before they do!
                </span>
              }
            />
            <FeatureCard
              icon="💬"
              title="Feel FOMO? Join The Movement"
              description={
                <span>
                  Watch <span className="underline font-semibold text-closetx-teal">live event stories</span>, spot who's in, and join movements in 1 tap.<br />
                  <b className="text-yellow-500">Get in now</b> or miss out on the buzz!
                </span>
              }
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
          <div className="flex-1 space-y-4 animate-fade-in">
            <h3 className="text-2xl font-extrabold text-closetx-teal mb-2">Virtual Outfit Try-On</h3>
            <p className="text-gray-700 text-lg">Don’t wait till the night before: <b className="text-closetx-teal">get the perfect look</b> now—before anyone else does. Outfits go viral, so catch the trend first!</p>
            <Button asChild size="lg" className="bg-closetx-teal text-white shadow-md animate-bounce">
              <Link to="/marketplace">
                Try Outfits Now
                <span className="ml-3 text-xs bg-yellow-400/90 text-black px-2.5 py-0.5 rounded-full animate-pulse">🔥 Trending!</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SOCIAL BUZZ: SEE, JOIN, SHARE EVENTS */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12 text-closetx-teal">Don’t Be Left Out—See What's Next</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard
              icon="👯‍♀️"
              badge="18 Just Joined!"
              badgeColor="bg-teal-400/90"
              title="See What They're Up To"
              description={
                <span>
                  Scroll <b>live stories & events</b>—don’t be the only one not invited!<br />
                  <span className="text-pink-500 font-medium">Tap to get in—before it’s too late.</span>
                </span>
              }
            />
            <FeatureCard
              icon="🌟"
              badge="Going Viral!"
              badgeColor="bg-pink-500/90"
              title="Share & Spark Jealousy"
              description={
                <span>
                  Flaunt your new saree, that epic trip, or next girls’ dinner.<br />
                  <span className="font-semibold text-closetx-teal">Envy is contagious—be the first to post!</span>
                </span>
              }
            />
            <FeatureCard
              icon="🤫"
              title="Exclusive Members-Only Perks"
              description={
                <span>
                  VIP bookings. Early outfit drops. Secret nights.<br />
                  <span className="font-medium text-orange-500">Miss it now, and it's gone for months!</span>
                </span>
              }
            />
          </div>
        </div>
      </section>

      {/* CTA: JOIN THE INNER CIRCLE */}
      <section className="py-16 px-4 bg-closetx-teal text-white animate-fade-in">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-4">Ready to Stop Watching—and Start Joining?</h2>
          <p className="text-lg mb-8">
            Don’t just watch the stories: <b>become</b> one. Seats fill, events close, and memories don’t wait.<br />
            <span className="text-yellow-200 font-bold">Claim your spot before you hear about it from others!</span>
          </p>
          <Button asChild size="lg" className="bg-white text-closetx-teal hover:bg-gray-100 font-bold text-lg px-7 py-5 relative group overflow-visible animate-bounce">
            <Link to="/signup" className="relative">
              Get Started — It’s Girls Time
              <span className="absolute -top-4 right-0 px-3 py-1 bg-pink-500/90 text-white text-xs font-bold rounded-full shadow animate-pulse z-20 group-hover:scale-110">
                Limited Access!
              </span>
            </Link>
          </Button>
          <div className="mt-5 text-teal-100">
            <b>{liveJoinCount}+ women already here.</b> Last week’s secret dinner filled in hours!
          </div>
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

// --- FeatureCard and Footer components with FOMO badge support --- //
const FeatureCard = ({
  icon,
  title,
  description,
  badge,
  badgeColor,
}: {
  icon: string;
  title: string;
  description: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}) => (
  <div className="text-center p-7 rounded-xl border border-closetx-teal/20 bg-white shadow-md hover:shadow-xl animate-fade-in transition-shadow relative overflow-visible">
    <div className="text-5xl mb-4">{icon}</div>
    {badge && (
      <span
        className={cn(
          "absolute -top-4 right-7 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg animate-pulse z-10",
          badgeColor || "bg-pink-500"
        )}
        style={{ minWidth: 94, display: "inline-block" }}
      >
        {badge}
      </span>
    )}
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
