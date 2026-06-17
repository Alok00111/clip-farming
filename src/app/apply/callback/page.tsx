'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ApplyCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState('Verifying authentication...');
  const [error, setError] = useState('');

  useEffect(() => {
    const submitApplication = async () => {
      try {
        const storedData = localStorage.getItem('pendingApplication');
        
        if (!storedData) {
          router.push('/apply');
          return;
        }

        setStatus('Submitting application...');
        
        const formData = JSON.parse(storedData);
        
        const res = await fetch('/api/apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Submission failed');
        }

        // Clear storage on success
        localStorage.removeItem('pendingApplication');
        
        setStatus('Success! Redirecting...');
        
        // Use a simple query param or context to show success state on the apply page
        router.push('/apply?success=true');
        
      } catch (err: any) {
        setError(err.message || 'Something went wrong during submission.');
        localStorage.removeItem('pendingApplication');
      }
    };

    // Small delay to ensure Supabase client finishes auth state sync
    const timer = setTimeout(() => {
      submitApplication();
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-10 max-w-md w-full text-center">
        {error ? (
          <>
            <div className="w-16 h-16 bg-red-500/20 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Submission Failed</h2>
            <p className="text-foreground/70 mb-6 text-sm">{error}</p>
            <button 
              onClick={() => router.push('/apply')}
              className="px-4 py-2 bg-foreground text-background rounded-md text-sm font-medium"
            >
              Try Again
            </button>
          </>
        ) : (
          <>
            <div className="w-12 h-12 border-4 border-foreground/20 border-t-foreground rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-xl font-bold mb-2">{status}</h2>
            <p className="text-foreground/70 text-sm">Please don't close this window.</p>
          </>
        )}
      </div>
    </div>
  );
}
