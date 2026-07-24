import { motion } from 'motion/react';

const SECTIONS = [
  {
    title: '1. Who we are',
    body: `MacOutlet is an online retailer specialising in certified pre-owned and Open Box Apple products. Our registered address and contact details are available on our Contact page. We are the data controller for all personal data collected through this website.`,
  },
  {
    title: '2. What data we collect',
    body: `We collect the following categories of personal data:

• **Contact information** — name, email address, phone number, and delivery address when you place an order or contact us.
• **Account information** — email and password if you create an account.
• **Order information** — products purchased, order history, payment method (we do not store full card details), and transaction records.
• **Device and usage data** — IP address, browser type, pages visited, and time spent on the site, collected automatically via cookies.
• **Communications** — records of any emails or messages you send to our support team.`,
  },
  {
    title: '3. How we use your data',
    body: `We use your personal data for the following purposes:

• To process and fulfil your orders, including shipping and warranty registration.
• To create and manage your customer account.
• To communicate with you about your order, warranty, or support queries.
• To send marketing emails if you have opted in (you can unsubscribe at any time).
• To improve our website and product offering using anonymised analytics data.
• To comply with legal and regulatory obligations.`,
  },
  {
    title: '4. Legal basis for processing',
    body: `We process your data under the following legal bases under GDPR:

• **Contract** — processing necessary to fulfil your order.
• **Legitimate interests** — fraud prevention, improving our services, and direct marketing to existing customers.
• **Consent** — marketing emails and non-essential cookies, where you have given explicit consent.
• **Legal obligation** — tax records and regulatory compliance.`,
  },
  {
    title: '5. Cookies',
    body: `We use cookies to improve your experience on our site. These include:

• **Essential cookies** — required for the site to function (cart, session, login).
• **Analytics cookies** — help us understand how visitors use the site (Google Analytics, anonymised).
• **Marketing cookies** — used to show relevant ads if you have consented.

You can manage your cookie preferences at any time via the cookie settings banner or your browser settings.`,
  },
  {
    title: '6. Sharing your data',
    body: `We do not sell your personal data. We share it only with trusted third parties who help us operate our business:

• **Payment processors** — Stripe, PayPal (PCI-DSS compliant; they process payments, we never see your full card number).
• **Shipping carriers** — UPS, DHL, FedEx (to fulfil delivery).
• **Email service providers** — for transactional and marketing emails.
• **Analytics providers** — Google Analytics (data is anonymised).

All third-party processors are contractually bound to handle your data in accordance with GDPR.`,
  },
  {
    title: '7. International transfers',
    body: `Some of our service providers may process data outside the European Economic Area (EEA). Where this occurs, we ensure appropriate safeguards are in place — including Standard Contractual Clauses (SCCs) approved by the European Commission.`,
  },
  {
    title: '8. Data retention',
    body: `We retain your personal data only as long as necessary:

• Order records are retained for 7 years to comply with tax and accounting regulations.
• Account data is retained for as long as your account is active, plus 2 years after your last activity.
• Marketing preferences are retained until you unsubscribe or request deletion.
• Support communications are retained for 3 years.`,
  },
  {
    title: '9. Your rights',
    body: `Under GDPR, you have the following rights regarding your personal data:

• **Right of access** — request a copy of the data we hold about you.
• **Right to rectification** — ask us to correct inaccurate data.
• **Right to erasure** — request deletion of your data (subject to legal retention requirements).
• **Right to restrict processing** — ask us to limit how we use your data.
• **Right to data portability** — receive your data in a structured, machine-readable format.
• **Right to object** — object to processing based on legitimate interests or for direct marketing.
• **Right to withdraw consent** — where processing is based on consent, you may withdraw it at any time.

To exercise any of these rights, contact us at privacy@macoutlet.com. We will respond within 30 days.`,
  },
  {
    title: '10. Security',
    body: `We take the security of your data seriously. Our website uses 256-bit SSL/TLS encryption. Payment processing is handled by PCI-DSS Level 1 certified providers. Access to personal data within our organisation is restricted to staff who need it to perform their role.`,
  },
  {
    title: '11. Children\'s privacy',
    body: `Our website is not directed at children under the age of 16. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us and we will delete it promptly.`,
  },
  {
    title: '12. Changes to this policy',
    body: `We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date below and notify registered customers by email if the changes are material. We encourage you to review this page periodically.`,
  },
  {
    title: '13. Contact & complaints',
    body: `If you have any questions about this Privacy Policy or how we handle your data, please contact us at privacy@macoutlet.com or via our Contact page.

If you are not satisfied with our response, you have the right to lodge a complaint with your local data protection authority. In Poland, this is the Urząd Ochrony Danych Osobowych (UODO) at uodo.gov.pl.`,
  },
];

function renderBody(body: string) {
  return body.split('\n').map((line, i) => {
    if (line.startsWith('•')) {
      const content = line.slice(1).trim();
      const parts = content.split(/\*\*(.*?)\*\*/g);
      return (
        <div key={i} className="flex items-start gap-2.5" style={{ marginBottom: '6px' }}>
          <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: '#0071e3' }} />
          <span style={{ fontSize: '15px', color: '#6e6e73', lineHeight: 1.7 }}>
            {parts.map((p, j) => j % 2 === 1 ? <strong key={j} style={{ color: '#1d1d1f', fontWeight: 600 }}>{p}</strong> : p)}
          </span>
        </div>
      );
    }
    if (line.trim() === '') return <div key={i} style={{ height: '8px' }} />;
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <p key={i} style={{ fontSize: '15px', color: '#6e6e73', lineHeight: 1.75, marginBottom: '4px' }}>
        {parts.map((p, j) => j % 2 === 1 ? <strong key={j} style={{ color: '#1d1d1f', fontWeight: 600 }}>{p}</strong> : p)}
      </p>
    );
  });
}

export function PrivacyPage() {
  return (
    <div style={{ paddingTop: '56px' }}>

      {/* Hero */}
      <section style={{ background: '#f5f5f7', padding: '64px 0 48px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="max-w-[800px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-block px-3 py-1 rounded-full mb-4" style={{ background: 'rgba(0,113,227,0.08)', color: '#0071e3', fontSize: '13px', fontWeight: 500 }}>
              Legal
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.03em', marginBottom: '12px' }}>
              Privacy Policy
            </h1>
            <p style={{ fontSize: '15px', color: '#6e6e73' }}>Last updated: July 2026</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: '#fff', padding: '64px 0 96px' }}>
        <div className="max-w-[800px] mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '16px', color: '#6e6e73', lineHeight: 1.8, marginBottom: '48px', paddingBottom: '40px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}
          >
            At MacOutlet, we take your privacy seriously. This Privacy Policy explains what personal data we collect, how we use it, and what rights you have under the General Data Protection Regulation (GDPR) and applicable data protection laws. Please read it carefully.
          </motion.p>

          <div className="flex flex-col gap-10">
            {SECTIONS.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                style={{ paddingBottom: '40px', borderBottom: i < SECTIONS.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}
              >
                <h2 style={{ fontSize: '19px', fontWeight: 600, color: '#1d1d1f', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                  {section.title}
                </h2>
                <div>{renderBody(section.body)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
