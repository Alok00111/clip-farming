'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import MagneticWrapper from '@/components/MagneticWrapper';
import { motion, AnimatePresence } from 'framer-motion';

const COUNTRIES = [
  { name: "United States", code: "+1" },
  { name: "United Kingdom", code: "+44" },
  { name: "Canada", code: "+1" },
  { name: "Australia", code: "+61" },
  { name: "India", code: "+91" },
  { name: "Germany", code: "+49" },
  { name: "France", code: "+33" },
  { name: "Spain", code: "+34" },
  { name: "Italy", code: "+39" },
  { name: "Netherlands", code: "+31" },
  { name: "Brazil", code: "+55" },
  { name: "Mexico", code: "+52" },
  { name: "South Africa", code: "+27" },
  { name: "Philippines", code: "+63" },
  { name: "Nigeria", code: "+234" },
  { name: "Other", code: "" }
];

// Mock UI Components to simulate the full design system
const Input = ({ label, type = 'text', required, ...props }: any) => (
  <div className="flex flex-col space-y-2 mb-6 w-full">
    <label className="text-sm font-bold tracking-wide text-foreground flex items-center gap-2">
      {label}
      {!required && <span className="text-muted-foreground/60 font-normal text-xs">(Optional)</span>}
    </label>
    <input
      type={type}
      required={required}
      className="h-14 w-full rounded-2xl border border-border bg-foreground/5 px-6 text-foreground placeholder-muted-foreground outline-none transition-all focus:border-accent focus:bg-foreground/10 disabled:opacity-50"
      {...props}
    />
  </div>
);

const Select = ({ label, options, required, value, onChange, name, placeholder = "Select an option" }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col space-y-2 mb-6 w-full relative" ref={dropdownRef}>
      <label className="text-sm font-bold tracking-wide text-foreground flex items-center gap-2">
        {label}
        {!required && <span className="text-muted-foreground/60 font-normal text-xs">(Optional)</span>}
      </label>
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-full rounded-2xl border ${isOpen ? 'border-accent bg-foreground/10' : 'border-border bg-foreground/5'} px-6 flex items-center justify-between text-foreground outline-none transition-all cursor-pointer`}
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value || placeholder}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent' : 'text-muted-foreground'}`} 
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-[calc(100%+8px)] left-0 w-full bg-background border border-border rounded-2xl shadow-xl z-50 overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto py-2 custom-scrollbar">
              {options.map((opt: string | { name: string, code?: string }) => {
                const optName = typeof opt === 'string' ? opt : opt.name;
                const optCode = typeof opt === 'string' ? '' : opt.code;
                const isSelected = value === optName;

                return (
                  <div 
                    key={optName}
                    onClick={() => {
                      onChange({ target: { name, value: optName, dataset: { code: optCode } } } as any);
                      setIsOpen(false);
                    }}
                    className={`px-6 py-3 cursor-pointer transition-colors flex items-center justify-between ${isSelected ? 'bg-accent/10 text-accent font-bold' : 'hover:bg-muted text-foreground'}`}
                  >
                    <span>{optName}</span>
                    {isSelected && (
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

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

  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user?.user_metadata?.full_name) {
        setFormData(prev => ({
          ...prev,
          full_name: session.user.user_metadata.full_name
        }));
      }
    });
  }, [supabase.auth]);

  const handleChange = (e: any) => {
    const { name, value, dataset } = e.target;
    
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Auto-update phone country code if country changes
      if (name === 'country' && dataset?.code) {
        // Only override if phone is empty or already starts with a '+'
        if (!prev.phone || prev.phone.startsWith('+')) {
          newData.phone = dataset.code + ' ';
        }
      }
      
      return newData;
    });
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleGoogleSignInAndSubmit = async () => {
    setLoading(true);
    setError('');

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
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

      setStep(4); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden bg-background">
      
      {/* Background Noise & Blur */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-5">
        <div className="h-[40rem] w-[40rem] rounded-full bg-accent blur-[150px] absolute -top-40 -right-40" />
      </div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">For Editors</span>
            <h1 className="text-5xl md:text-7xl font-bold font-display uppercase tracking-tight text-foreground leading-[0.9]">
              Join The <br/>
              <span className="text-muted-foreground">Network.</span>
            </h1>
          </motion.div>
        </div>

        <div className="rounded-3xl border border-border bg-muted/50 p-6 md:p-12 shadow-brutal relative overflow-hidden">
          
          {/* Progress Indicator */}
          {step < 4 && (
            <div className="absolute top-0 left-0 w-full h-1.5 bg-border">
              <div 
                className="h-full bg-accent transition-all duration-500 ease-out" 
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border-l-4 border-red-500 text-red-600 dark:text-red-400 p-4 mb-8 font-medium rounded-r-xl">
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center text-foreground font-display font-bold text-xl">1</div>
                  <h2 className="text-3xl font-display font-bold tracking-tight">Personal Details</h2>
                </div>

                {!session && (
                  <div className="mb-8 p-4 bg-accent/10 border border-accent/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-accent">Already have an account?</h3>
                      <p className="text-sm text-muted-foreground">Sign in to autofill your details and skip email verification.</p>
                    </div>
                    <button 
                      onClick={() => supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/apply` } })}
                      className="px-6 py-2 bg-background border border-border rounded-full text-sm font-bold flex items-center gap-2 hover:bg-muted transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Sign In
                    </button>
                  </div>
                )}
                
                <Input label="Full Name" name="full_name" placeholder="John Doe" value={formData.full_name} onChange={handleChange} required />
                <Select label="Country" name="country" options={COUNTRIES} value={formData.country} onChange={handleChange} required />
                <Input label="WhatsApp / Phone Number" name="phone" placeholder="+1 234 567 8900" value={formData.phone} onChange={handleChange} />
                
                <div className="mt-12 flex justify-end">
                  <MagneticWrapper>
                    <button 
                      onClick={nextStep} 
                      disabled={!formData.full_name || !formData.country}
                      className="inline-flex h-14 items-center justify-center rounded-full bg-accent px-10 font-bold uppercase tracking-wide text-accent-foreground transition-transform hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                      Next Step →
                    </button>
                  </MagneticWrapper>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center text-foreground font-display font-bold text-xl">2</div>
                  <h2 className="text-3xl font-display font-bold tracking-tight">Experience</h2>
                </div>

                <Select 
                  label="Experience Level" 
                  name="experience_level" 
                  value={formData.experience_level} 
                  onChange={handleChange}
                  options={['Beginner (< 1 year)', 'Intermediate (1-3 years)', 'Pro (3+ years)']}
                  required
                />
                <Select 
                  label="Weekly Availability" 
                  name="hours_per_week" 
                  value={formData.hours_per_week} 
                  onChange={handleChange}
                  options={['< 10 hours', '10-20 hours', '20-40 hours', '40+ hours']}
                  required
                />
                
                <div className="mt-12 flex items-center justify-between">
                  <button 
                    onClick={prevStep}
                    className="text-sm font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Back
                  </button>
                  <MagneticWrapper>
                    <button 
                      onClick={nextStep} 
                      disabled={!formData.experience_level}
                      className="inline-flex h-14 items-center justify-center rounded-full bg-accent px-10 font-bold uppercase tracking-wide text-accent-foreground transition-transform hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                      Next Step →
                    </button>
                  </MagneticWrapper>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center text-foreground font-display font-bold text-xl">3</div>
                  <h2 className="text-3xl font-display font-bold tracking-tight">Portfolio</h2>
                </div>
                <p className="text-base text-muted-foreground mb-10 font-medium">Show us what you can do. We look for pacing, hook retention, and clean captions.</p>
                
                <Select 
                  label="Primary Platform" 
                  name="primary_platform" 
                  value={formData.primary_platform} 
                  onChange={handleChange}
                  required
                  options={[
                    'Instagram Reels', 
                    'YouTube Shorts', 
                    'TikTok', 
                    'X / Twitter', 
                    'LinkedIn', 
                    'Facebook Reels', 
                    'Pinterest', 
                    'Other'
                  ]}
                />
                <Input label="Social Handle" placeholder="@username" name="primary_social_handle" value={formData.primary_social_handle} onChange={handleChange} />
                <Input label="Link to your BEST edited clip" placeholder="https://..." name="sample_clip_url" type="url" value={formData.sample_clip_url} onChange={handleChange} required />
                
                <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
                  <button 
                    onClick={prevStep}
                    className="text-sm font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors w-full sm:w-auto text-left"
                  >
                    ← Back
                  </button>
                  
                  <div className="w-full sm:w-auto flex flex-col items-end gap-3">
                    <MagneticWrapper>
                      <button 
                        onClick={handleGoogleSignInAndSubmit} 
                        disabled={loading || !formData.sample_clip_url || !formData.primary_platform}
                        className="inline-flex h-14 items-center justify-center rounded-full bg-foreground px-8 font-bold uppercase tracking-wide text-background transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-brutal gap-3 w-full sm:w-auto"
                      >
                        {loading ? 'Processing...' : (session ? 'Submit Application' : 'Submit via Google')}
                        {!loading && !session && (
                          <div className="bg-white p-1 rounded-full flex items-center justify-center">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                          </div>
                        )}
                      </button>
                    </MagneticWrapper>
                    {!session && (
                      <p className="text-xs text-muted-foreground max-w-[200px] text-right">
                        Google Sign-In required to verify email.
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-foreground/10 text-foreground rounded-full flex items-center justify-center mx-auto mb-8 border border-border">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h2 className="text-4xl font-display font-bold uppercase tracking-tight mb-6">Application Received</h2>
                <p className="text-muted-foreground mb-12 max-w-md mx-auto text-lg leading-relaxed">
                  We've sent a confirmation to your email. Our team will review your portfolio and get back to you within 48 hours.
                </p>
                <MagneticWrapper>
                  <button 
                    onClick={() => router.push('/')} 
                    className="inline-flex h-14 items-center justify-center rounded-full border border-border bg-transparent px-10 font-bold uppercase tracking-wide text-foreground transition-colors hover:bg-foreground hover:text-background"
                  >
                    Return to Home
                  </button>
                </MagneticWrapper>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
