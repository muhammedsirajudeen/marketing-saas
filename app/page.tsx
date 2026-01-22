'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Users, Zap, Target } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">MarketingSaaS</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-sm hover:text-primary transition-colors">
              About
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            ✨ The Future of Marketing Automation
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Grow Your Business with
            <span className="block text-primary mt-2">Smart Marketing Tools</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Streamline your marketing campaigns, track performance, and drive growth with our all-in-one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you manage and grow your marketing efforts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow"
              >
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-primary text-primary-foreground rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of businesses already growing with MarketingSaaS
          </p>
          <Link href="/login">
            <Button size="lg" variant="secondary">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="font-semibold">MarketingSaaS</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 MarketingSaaS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
    title: 'Analytics Dashboard',
    description: 'Track your campaigns with real-time analytics and insights.',
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: 'Audience Management',
    description: 'Segment and target your audience with precision.',
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: 'Automation',
    description: 'Automate repetitive tasks and focus on strategy.',
  },
  {
    icon: <Target className="h-6 w-6 text-primary" />,
    title: 'Campaign Optimization',
    description: 'Optimize your campaigns for maximum ROI.',
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
    title: 'Performance Reports',
    description: 'Generate comprehensive reports in seconds.',
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: 'Team Collaboration',
    description: 'Work together seamlessly with your team.',
  },
];
