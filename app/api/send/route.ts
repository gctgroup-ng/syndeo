import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { contactEmailTemplate } from '@/lib/email-template'

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT) || 2525,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.firstName || !body.lastName || !body.email || !body.phone || !body.message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const info = await transporter.sendMail({
      from: `"Syndeo Contact Form" <${process.env.MAIL_FROM}>`,
      to: "support@syndeoltd.com",
      replyTo: body.email,
      subject: `New message from ${body.firstName} ${body.lastName}`,
      html: contactEmailTemplate(body),
    })

    return NextResponse.json({ success: true, messageId: info.messageId })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: 'Internal server error: ' + message }, { status: 500 })
  }
}
// import { NextResponse } from 'next/server'
// import { Resend } from 'resend'

// const resend = new Resend(process.env.RESEND_API_KEY)

// export async function POST(request: Request) {
//   try {
//     const body = await request.json()
//     console.log('Received form data:', body) // Add logging
    
//     // Validate required fields
//     if (!body.firstName || !body.lastName || !body.email || !body.phone || !body.message) {
//       return NextResponse.json(
//         { error: 'All fields are required' },
//         { status: 400 }
//       )
//     }

//     // Send email
//     // Temporary testing version - use this until domain is verified
//     const { data, error } = await resend.emails.send({
//       from: 'onboarding@resend.dev',  // Use Resend's test domain
//       to: 'isaacchukwuka67@gmail.com',  // Your verified email
//       subject: 'New Contact Form Submission',
//       html: `
//         <h2>New Contact Submission</h2>
//         <p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
//         <p><strong>Email:</strong> ${body.email}</p>
//         <p><strong>Phone:</strong> ${body.phone}</p>
//         <p><strong>Message:</strong> ${body.message}</p>
//       `
//     })

//     if (error) {
//       console.error('Resend API error:', error)
//       return NextResponse.json(
//         { error: 'Failed to send email: ' + error.message },
//         { status: 500 }
//       )
//     }

//     console.log('Email sent successfully:', data)
//     return NextResponse.json(data)

//   } catch (error) {
//     console.error('Server error:', error)
//     return NextResponse.json(
//       { error: 'Internal server error: ' + error.message },
//       { status: 500 }
//     )
//   }
// }