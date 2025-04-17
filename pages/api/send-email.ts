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
                from: "nadlan@urbanize.co.il", // Replace with your verified sender email
                to,
                subject,
                text,
            });

            res.status(200).json({ message: "Email sent successfully", emailResponse });
        } catch (error: any) {
            console.error("Error sending email:", error.response?.data || error.message || error);
            res.status(500).json({ error: "Failed to send email", details: error.response?.data || error.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}