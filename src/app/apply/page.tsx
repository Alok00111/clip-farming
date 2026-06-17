'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/Button';

// Mock UI Components to simulate the full design system
const Input = ({ label, type = 'text', ...props }: any) => (
  <div className="flex flex-col space-y-1 mb-4">
    <label className="text-sm font-medium text-foreground/80">{label}</label>
    <input
      type={type}
      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  </div>
);

const Select = ({ label, options, ...props }: any) => (
  <div className="flex flex-col space-y-1 mb-4">
    <label className="text-sm font-medium text-foreground/80">{label}</label>
    <select
      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    >
      <option value="" disabled>Select an option</option>
      {options.map((opt: string) => (
        <option key={opt} value={opt} className="bg-background text-foreground">{opt}</option>
      ))}
    </select>
  </div>
);

export default function ApplyPage() {
  const router = useRouter();
  const supabase = createClient();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    full_name: '',
    country: '',
    phone: '',
    experience_level: '',
    primary_platform: '',
    primary_social_handle: '',
    sample_clip_url: '',
    hours_per_week: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleGoogleSignInAndSubmit = async () => {
    setLoading(true);
    setError('');

    // In a real flow with PKCE, we'd sign in, redirect back to a callback, 
    // and THEN submit the form. For simplicity in this mock, we'll try to 
    // trigger sign in. If they are already signed in, we submit directly.

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      // Trigger Google OAuth. We need to save form state in local storage
      // because the page will redirect.
      localStorage.setItem('pendingApplication', JSON.stringify(formData));
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/apply/callback`,
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      }
      return;
    }

    // If already signed in, submit directly
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setStep(4); // Success step
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-2xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-archivo-black tracking-tight mb-4">
          Join the Network
        </h1>
        <p className="text-foreground/70 text-lg">
          Apply to become a vetted clipper. Earn money editing short-form content.
        </p>
      </div>

      <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-6 md:p-10 shadow-sm backdrop-blur-sm">
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-background text-xs">1</span>
              Personal Details
            </h2>
            <Input label="Full Name" name="full_name" value={formData.full_name} onChange={handleChange} required />
            <Input label="Country" name="country" value={formData.country} onChange={handleChange} required />
            <Input label="WhatsApp / Phone" name="phone" value={formData.phone} onChange={handleChange} />
            
            <div className="mt-8 flex justify-end">
              <Button onClick={nextStep} disabled={!formData.full_name || !formData.country}>
                Next Step →
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-background text-xs">2</span>
              Experience
            </h2>
            <Select 
              label="Experience Level" 
              name="experience_level" 
              value={formData.experience_level} 
              onChange={handleChange}
              options={['Beginner (< 1 year)', 'Intermediate (1-3 years)', 'Pro (3+ years)']}
            />
            <Select 
              label="How many hours can you commit per week?" 
              name="hours_per_week" 
              value={formData.hours_per_week} 
              onChange={handleChange}
              options={['< 10 hours', '10-20 hours', '20-40 hours', '40+ hours']}
            />
            
            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={prevStep}>← Back</Button>
              <Button onClick={nextStep} disabled={!formData.experience_level}>Next Step →</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-background text-xs">3</span>
              Portfolio
            </h2>
            <p className="text-sm text-foreground/60 mb-6">Show us what you can do. We look for pacing, hook retention, and clean captions.</p>
            
            <Select 
              label="Primary Platform" 
              name="primary_platform" 
              value={formData.primary_platform} 
              onChange={handleChange}
              options={['instagram', 'youtube', 'tiktok']}
            />
            <Input label="Social Handle (e.g. @username)" name="primary_social_handle" value={formData.primary_social_handle} onChange={handleChange} />
            <Input label="Link to your BEST edited clip (Drive/YT/Insta)" name="sample_clip_url" type="url" value={formData.sample_clip_url} onChange={handleChange} required />
            
            <div className="mt-8 flex justify-between items-center pt-6 border-t border-foreground/10">
              <Button variant="outline" onClick={prevStep}>← Back</Button>
              
              <Button 
                onClick={handleGoogleSignInAndSubmit} 
                disabled={loading || !formData.sample_clip_url || !formData.primary_platform}
                className="gap-2"
              >
                {loading ? 'Processing...' : 'Submit via Google'}
                {!loading && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                )}
              </Button>
            </div>
            <p className="text-xs text-center text-foreground/50 mt-4">
              We require Google Sign-In to verify your email and prevent spam applications.
            </p>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in zoom-in-95 duration-500 text-center py-10">
            <div className="w-16 h-16 bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Application Received!</h2>
            <p className="text-foreground/70 mb-8 max-w-sm mx-auto">
              Thanks for applying. We've sent a confirmation to your email. Our team will review your portfolio and get back to you within 48 hours.
            </p>
            <Button onClick={() => router.push('/')} variant="outline">
              Return to Home
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}
