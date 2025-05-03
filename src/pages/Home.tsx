
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-24 md:py-32 bg-gradient-to-br from-closetx-teal/30 to-closetx-beige/30">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight text-closetx-charcoal">
            <span className="text-closetx-teal">ClosetX</span> Style Genius
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Organize, style, and revolutionize your wardrobe with smart recommendations and seamless outfit planning.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild className="bg-closetx-teal hover:bg-closetx-teal/90 text-white px-8 py-6">
              <Link to="/signup">Create Account</Link>
            </Button>
            <Button asChild variant="outline" className="border-closetx-teal text-closetx-teal px-8 py-6">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Smart Wardrobe Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard
              icon="📱"
              title="Track in Real-Time"
              description="Keep track of your clothing items' condition, cleanliness, and usage in real-time."
            />
            <FeatureCard
              icon="👕"
              title="Filter by Anything"
              description="Filter your wardrobe by colors, seasons, conditions, and more with our intuitive interface."
            />
            <FeatureCard
              icon="🔍"
              title="See What's Trending"
              description="Discover trending collections and stay updated with the latest fashion trends."
            />
          </div>
        </div>
      </section>

      {/* Social Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Connect & Share</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard
              icon="📸"
              title="Share Your Outfits"
              description="Post your favorite outfits, get feedback, and inspire others with your unique style."
            />
            <FeatureCard
              icon="❤️"
              title="Like & Comment"
              description="Engage with other fashion enthusiasts through likes, comments, and shares."
            />
            <FeatureCard
              icon="👥"
              title="Build Your Network"
              description="Connect with friends and follow fashion influencers to expand your style horizon."
            />
          </div>
        </div>
      </section>

      {/* Smart Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">AI-Powered Style Genius</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard
              icon="🤖"
              title="Smart Outfit Generator"
              description="Get AI-powered outfit suggestions based on your wardrobe, style preferences, and occasions."
            />
            <FeatureCard
              icon="📊"
              title="Wardrobe Analytics"
              description="Understand your style patterns and get insights on your clothing usage and preferences."
            />
            <FeatureCard
              icon="🛒"
              title="Shop Recommendations"
              description="Receive personalized shopping recommendations to complement your existing wardrobe."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-closetx-teal text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your wardrobe?</h2>
          <p className="text-lg mb-8">
            Join thousands of fashion enthusiasts who are using ClosetX to elevate their style.
          </p>
          <Button asChild size="lg" className="bg-white text-closetx-teal hover:bg-gray-100">
            <Link to="/signup">Get Started Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-closetx-charcoal text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold text-closetx-teal mb-4">ClosetX</h3>
              <p className="text-gray-400 max-w-xs">
                Revolutionizing the way you organize, plan, and style your wardrobe.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <FooterColumn title="Product">
                <FooterLink href="#">Features</FooterLink>
                <FooterLink href="#">Pricing</FooterLink>
                <FooterLink href="#">Testimonials</FooterLink>
                <FooterLink href="#">FAQ</FooterLink>
              </FooterColumn>
              <FooterColumn title="Company">
                <FooterLink href="#">About</FooterLink>
                <FooterLink href="#">Blog</FooterLink>
                <FooterLink href="#">Careers</FooterLink>
                <FooterLink href="#">Contact</FooterLink>
              </FooterColumn>
              <FooterColumn title="Legal">
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms of Service</FooterLink>
                <FooterLink href="#">Cookie Policy</FooterLink>
              </FooterColumn>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-700 text-center md:text-left text-gray-400 text-sm">
            © {new Date().getFullYear()} ClosetX. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: string; 
  title: string; 
  description: string;
}) => (
  <div className="text-center p-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FooterColumn = ({ 
  title, 
  children 
}: { 
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h4 className="text-lg font-semibold mb-3">{title}</h4>
    <ul className="space-y-2">
      {children}
    </ul>
  </div>
);

const FooterLink = ({ 
  href, 
  children, 
  className 
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
