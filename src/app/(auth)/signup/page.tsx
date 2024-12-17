// src/app/(auth)/signup/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstName, lastName })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setSuccess(data.message || 'Account created successfully!');
      setTimeout(() => {
        router.push('/signin');
      }, 2000);

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex">
      <div className="absolute top-8 left-8 z-30">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://img.logoipsum.com/296.svg"  // تأكد من وجود الصورة في المجلد public
            alt="Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
        </Link>
      </div>
      {/* Left side - Cover */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/50 z-10" />
        <div className="relative z-20 flex flex-col justify-center px-12 text-white">
          <h1 className="text-5xl font-bold mb-6">Join Us Today</h1>
          <p className="text-lg text-white/90 max-w-md">
            Create an account and start your journey with us. Access all our features and services.
          </p>
        </div>
        {/* Abstract background pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary opacity-30" 
               style={{
                 backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), 
                                 radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
                 backgroundSize: '100px 100px'
               }} 
          />
        </div>
      </div>

      {/* Right side - Sign up form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          {/* Main Form Card */}
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold tracking-tight">
                Create an account
              </CardTitle>
              <CardDescription>
                Welcome! Let's get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {/* First Name and Last Name */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        placeholder="Enter your first name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        placeholder="Create a password"
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert variant="default" className="border-green-500 bg-green-50 text-green-700">
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create account'
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-2">
              <div className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link 
                  href="/signin" 
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>

          {/* Footer Links */}
          <div className="mt-4 text-center text-xs">
            <p className="text-gray-400">
              By signing up, you agree to our 
              <Link 
                href="/terms" 
                className="text-gray-500 hover:text-gray-700 transition-colors mx-1"
              >
                Terms of Service
              </Link>
              • 
              <Link 
                href="/privacy" 
                className="text-gray-500 hover:text-gray-700 transition-colors mx-1"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}