import { Resend } from "resend";
import { NextApiRequest, NextApiResponse } from 'next';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("API route /api/send-email invoked");
    console.log("Resend API Key:", process.env.RESEND_API_KEY);

    if (req.method === "POST") {
        const { to, subject, text } = req.body;

        try {
            const emailResponse = await resend.emails.send({
                from: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
                to,
                subject,
                text,
            });

            res.status(200).json({ message: "Email sent successfully", emailResponse });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error sending email:", error.message);
                res.status(500).json({ error: "Failed to send email", details: error.message });
            } else {
                console.error("Unexpected error:", error);
                res.status(500).json({ error: "Failed to send email", details: "Unknown error occurred" });
            }
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}