import { GoogleAuthProvider } from '@/components/providers/GoogleAuthProvider';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, BarChart3, Quote } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
    return (
        <GoogleAuthProvider>
            <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
                {/* Left Side - Image & Testimonial */}
                <div className="hidden lg:flex relative h-full w-full flex-col justify-between p-12 text-white">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/login-bg-v2.png"
                            alt="Background"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/40" />
                    </div>

                    {/* Logo on Image Overlay */}
                    <div className="relative z-10 flex items-center gap-2">
                        <BarChart3 className="h-6 w-6 text-white" />
                        <span className="text-xl font-bold tracking-tight">MarketingSaaS</span>
                    </div>

                    {/* Testimonial */}
                    <div className="relative z-10 max-w-lg">
                        <Quote className="h-8 w-8 mb-6 text-white/80" />
                        <blockquote className="text-2xl font-medium leading-relaxed">
                            "This platform completely transformed how we handle our marketing analytics. The insights are invaluable."
                        </blockquote>
                        <div className="mt-6 flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-semibold">
                                SO
                            </div>
                            <div>
                                <p className="font-semibold">Sarah O'Connor</p>
                                <p className="text-sm text-white/70">CMO at TechFlow</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="flex h-full flex-col p-8 bg-background lg:p-12 relative">
                    {/* Top Navigation */}
                    <div className="flex justify-start">
                        <Link
                            href="/"
                            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to home
                        </Link>
                    </div>

                    {/* Main Content - Centered */}
                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-full max-w-[350px] space-y-8">
                            <div className="space-y-2 text-center">
                                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                                    Welcome back
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Enter your details to sign in to your account
                                </p>
                            </div>

                            <div className="space-y-4">
                                <GoogleSignInButton />

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-muted" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-background px-2 text-muted-foreground">
                                            Or continue with email
                                        </span>
                                    </div>
                                </div>

                                {/* Placeholder form fields for visual completeness, distinct from functionality */}
                                <div className="space-y-4 pt-2 opacity-50 pointer-events-none select-none grayscale">
                                    <div className="space-y-2">
                                        {/* Mock inputs to look like a full form */}
                                        <div className="h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                            name@example.com
                                        </div>
                                    </div>
                                    <Button className="w-full" variant="secondary" disabled>
                                        Sign in with Email
                                    </Button>
                                </div>
                                <p className="text-xs text-center text-muted-foreground mt-2">
                                    (Email login coming soon)
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Terms */}
                    <p className="text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our{' '}
                        <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </GoogleAuthProvider>
    );
}
