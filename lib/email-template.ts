export interface ContactEmailProps {
    firstName: string
    lastName: string
    email: string
    phone: string
    message: string
}

export function contactEmailTemplate({
    firstName,
    lastName,
    email,
    phone,
    message,
}: ContactEmailProps): string {
    const initials = `${firstName[0]}${lastName[0]}`.toUpperCase()
    const date = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>New Contact Submission</title>
        </head>
        <body style="margin:0;padding:0;background-color:#f4f4f7;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7;padding:40px 16px;">
            <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

                <!-- Header -->
                <tr>
                    <td style="background:linear-gradient(135deg,#6642EC 0%,#F15A29 100%);border-radius:16px 16px 0 0;padding:40px 48px;text-align:center;">
                    <!-- Accent bar -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                        <tr>
                        <td align="center">
                            <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="width:32px;height:3px;background:rgba(255,255,255,0.9);border-radius:2px;"></td>
                                <td style="width:8px;height:3px;background:#F15A29;border-radius:2px;margin:0 4px;padding:0 4px;"></td>
                                <td style="width:32px;height:3px;background:rgba(255,255,255,0.9);border-radius:2px;"></td>
                            </tr>
                            </table>
                        </td>
                        </tr>
                    </table>
                    <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,0.75);">
                        Syndeo
                    </p>
                    <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;line-height:1.3;">
                        New Contact Submission
                    </h1>
                    <p style="margin:10px 0 0;font-size:13px;color:rgba(255,255,255,0.65);">
                        ${date}
                    </p>
                    </td>
                </tr>

                <!-- Orange accent strip -->
                <tr>
                    <td style="height:4px;background:linear-gradient(90deg,#F15A29 0%,#6642EC 100%);"></td>
                </tr>

                <!-- Body -->
                <tr>
                    <td style="background:#ffffff;padding:40px 48px;">

                    <!-- Avatar + name -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                        <tr>
                        <td style="vertical-align:middle;">
                            <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="
                                width:54px;height:54px;
                                border-radius:50%;
                                background:linear-gradient(135deg,#F15A29 0%,#6642EC 100%);
                                text-align:center;vertical-align:middle;
                                font-size:18px;font-weight:700;color:#ffffff;
                                line-height:54px;
                                ">
                                ${initials}
                                </td>
                                <td style="padding-left:14px;vertical-align:middle;">
                                <p style="margin:0;font-size:18px;font-weight:700;color:#1a1a2e;">
                                    ${firstName} ${lastName}
                                </p>
                                <p style="margin:3px 0 0;font-size:13px;color:#F15A29;font-weight:500;">
                                    Submitted a contact request
                                </p>
                                </td>
                            </tr>
                            </table>
                        </td>
                        </tr>
                    </table>

                    <!-- Divider -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                        <tr>
                        <td style="height:1px;background:linear-gradient(90deg,#F15A29,#6642EC,#f4f4f7);"></td>
                        </tr>
                    </table>

                    <!-- Fields -->
                    ${field('Email Address', `<a href="mailto:${email}" style="color:#6642EC;text-decoration:none;font-weight:600;">${email}</a>`)}
                    ${field('Phone Number', phone)}

                    <!-- Message box -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
                        <tr>
                        <td style="padding-bottom:8px;">
                            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#aaa;">
                            Message
                            </p>
                        </td>
                        </tr>
                        <tr>
                        <td style="
                            background:#fdf6f3;
                            border-left:4px solid #F15A29;
                            border-radius:0 8px 8px 0;
                            padding:18px 20px;
                            ">
                            <p style="margin:0;font-size:15px;color:#333;line-height:1.8;">
                            ${message}
                            </p>
                        </td>
                        </tr>
                    </table>

                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="
                    background:#1a1a2e;
                    border-radius:0 0 16px 16px;
                    padding:24px 48px;
                    text-align:center;
                    ">
                    <!-- Footer accent dots -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                        <tr>
                        <td align="center">
                            <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="width:6px;height:6px;border-radius:50%;background:#F15A29;"></td>
                                <td style="width:6px;"></td>
                                <td style="width:6px;height:6px;border-radius:50%;background:#6642EC;"></td>
                                <td style="width:6px;"></td>
                                <td style="width:6px;height:6px;border-radius:50%;background:#F15A29;"></td>
                            </tr>
                            </table>
                        </td>
                        </tr>
                    </table>
                    <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.4);line-height:1.7;">
                        This email was sent automatically from your website's contact form.<br/>
                        © ${new Date().getFullYear()} Syndeo. All rights reserved.
                    </p>
                    </td>
                </tr>

                </table>
            </td>
            </tr>
        </table>

        </body>
        </html>
    `
}

function field(label: string, value: string): string {
    return `
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
            <tr>
            <td style="padding-bottom:6px;">
                <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#aaa;">
                ${label}
                </p>
            </td>
            </tr>
            <tr>
            <td style="
                background:#f9f8ff;
                border-radius:8px;
                border-left:3px solid #6642EC;
                padding:12px 16px;
                font-size:15px;
                color:#1a1a2e;
                font-weight:500;
                ">
                ${value}
            </td>
            </tr>
        </table>
    `
}