import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactFormData } from '@/types';

const resend = new Resend(process.env.RESEND_API_KEY);

function validateBody(body: unknown): body is ContactFormData & { recaptchaToken?: string } {
  if (!body || typeof body !== 'object') return false;
  const o = body as Record<string, unknown>;
  return (
    typeof o.firstName === 'string' &&
    typeof o.lastName === 'string' &&
    typeof o.email === 'string' &&
    typeof o.phone === 'string' &&
    typeof o.details === 'string' &&
    (o.company === undefined || typeof o.company === 'string') &&
    (o.recaptchaToken === undefined || typeof o.recaptchaToken === 'string')
  );
}

function formatEmailBody(data: ContactFormData): string {
  const lines = [
    `Name: ${data.firstName} ${data.lastName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    ...(data.company ? [`Company: ${data.company}`] : []),
    '',
    'Message:',
    data.details,
  ];
  return lines.join('\n');
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.CONTACT_EMAIL;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Email service is not configured' },
      { status: 500 }
    );
  }
  if (!fromEmail || !toEmail) {
    return NextResponse.json(
      { error: 'RESEND_FROM_EMAIL and CONTACT_EMAIL must be set' },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  if (!validateBody(body)) {
    return NextResponse.json(
      { error: 'Missing or invalid fields: firstName, lastName, email, phone, details' },
      { status: 400 }
    );
  }

  const recaptchaToken = body.recaptchaToken;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (secretKey) {
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification required' },
        { status: 400 }
      );
    }
    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: secretKey, response: recaptchaToken }).toString(),
    });
    const verify = (await verifyRes.json()) as { success?: boolean; score?: number; action?: string };
    if (!verify.success) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }
    const score = verify.score ?? 0;
    if (score < 0.5) {
      return NextResponse.json(
        { error: 'reCAPTCHA score too low. Please try again.' },
        { status: 400 }
      );
    }
  }

  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: body.email,
    subject: 'Torres Motorsports Contact Form Submission',
    text: formatEmailBody(body),
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, id: data?.id });
}
