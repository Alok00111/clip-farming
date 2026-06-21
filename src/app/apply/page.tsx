'use client';

import MagneticButton from '@/components/MagneticButton';
import { motion } from 'framer-motion';

export default function ApplyPage() {
  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 px-4 md:px-6 relative overflow-hidden bg-background">
      
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center py-8"
          >
            <div className="w-24 h-24 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-8 border-2 border-[#25D366]/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6 text-foreground">Ready to prove your skills?</h2>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-lg mx-auto leading-relaxed">
              We process all applications directly through WhatsApp. Join the waiting room and drop a link to your best work. If you meet the standard, an admin will pull you into the Inner Circle.
            </p>
            
            <a href="https://chat.whatsapp.com/LXi8pjuHhbUENDa6cAiXoG" target="_blank" rel="noopener noreferrer">
              <MagneticButton className="h-16 px-8 md:px-12 text-sm md:text-base font-black tracking-widest uppercase bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-[6px_6px_0px_0px_#128C7E]">
                Join The Waiting Room →
              </MagneticButton>
            </a>
            
            <p className="mt-8 text-sm text-muted-foreground font-bold tracking-wide">
              *ONLY THE BEST APPLY*
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
