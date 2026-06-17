import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendEmail } from '@/lib/email';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    
    // 1. Verify user is authenticated
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
    }

    const userId = session.user.id;
    const email = session.user.email;

    // 2. Parse request body
    const body = await request.json();
    const {
      full_name,
      country,
      phone,
      experience_level,
      platforms,
      primary_platform,
      primary_social_handle,
      niches,
      editing_software,
      portfolio_urls,
      sample_clip_url,
      hours_per_week,
    } = body;

    // 3. Basic validation
    if (!full_name || !country || !experience_level) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 4. Check if they already applied
    const { data: existingApp } = await supabaseAdmin
      .from('applications')
      .select('id, status')
      .eq('user_id', userId)
      .single();

    if (existingApp) {
      return NextResponse.json(
        { error: `You have already applied. Application status: ${existingApp.status}` },
        { status: 400 }
      );
    }

    // 5. Insert application
    const { data: application, error: insertError } = await supabaseAdmin
      .from('applications')
      .insert({
        user_id: userId,
        email: email,
        full_name,
        country,
        phone,
        experience_level,
        platforms,
        primary_platform,
        primary_social_handle,
        niches,
        editing_software,
        portfolio_urls,
        sample_clip_url,
        hours_per_week,
        status: 'submitted',
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting application:', insertError);
      return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
    }

    // 6. Send confirmation email
    await sendEmail({
      to: email!,
      subject: 'Application Received - ClippingAgency',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #111;">We got your application, ${full_name.split(' ')[0]}!</h2>
          <p style="color: #444; font-size: 16px; line-height: 1.5;">
            Thanks for applying to join the ClippingAgency network. Our team will review your portfolio and social handle.
          </p>
          <p style="color: #444; font-size: 16px; line-height: 1.5;">
            Expect to hear back from us within 48 hours. If approved, we'll send you your portal login link and Discord invite.
          </p>
          <br/>
          <p style="color: #666; font-size: 14px;">
            - The ClippingAgency Team
          </p>
        </div>
      `
    });

    return NextResponse.json({ success: true, application });

  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
