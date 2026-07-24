import { motion } from 'motion/react';
import { Link } from '../router';
import { ChevronRight, PackageCheck, Sparkles, ScanLine, Wrench, RotateCcw, FileText, Truck, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: PackageCheck,
    title: 'Source verification',
    body: 'Every device begins its journey with us at the source. We work exclusively with verified suppliers in the United States — corporate lease returns, authorised trade-ins, and certified resellers. We know the provenance of every single device we buy.',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Professional cleaning',
    body: 'Before any technical inspection begins, each device is thoroughly cleaned — exterior surfaces, keyboard, ports, display, and internal components. We use compressed air and professional-grade cleaning solutions to bring every device to a pristine standard.',
  },
  {
    number: '03',
    icon: ScanLine,
    title: '60-point technical inspection',
    body: 'Our qualified technicians run a comprehensive 60-point diagnostic check on every device. This covers the display (pixels, brightness, colour accuracy), keyboard, trackpad, all ports, speakers, microphone, camera, Wi-Fi, Bluetooth, battery health and cycle count, and full logic board diagnostics.',
  },
  {
    number: '04',
    icon: Wrench,
    title: 'Component servicing',
    body: 'If any component does not meet our standards, it is replaced. This may include the battery, keyboard, display, or other parts. We only use quality-grade components. A device is not listed for sale until every component passes our threshold.',
  },
  {
    number: '05',
    icon: RotateCcw,
    title: 'Factory reset & fresh macOS',
    body: 'Every device is fully erased and restored to factory settings. We then install the latest compatible version of macOS — so your device arrives clean, updated, and ready to set up as if it were brand new.',
  },
  {
    number: '06',
    icon: FileText,
    title: 'Condition report',
    body: 'After passing all checks, each device receives a detailed written condition report. This documents the exact condition grade, battery health percentage, cycle count, any cosmetic marks, and a full summary of what was inspected and verified. This report ships with the device.',
  },
  {
    number: '07',
    icon: Truck,
    title: 'Secure packaging & dispatch',
    body: 'Devices are packed in protective packaging with all included accessories clearly listed. Orders are dispatched within 24 hours of purchase on business days. Tracking is provided at every stage.',
  },
];

const CHECKS = [
  'Display — pixels, brightness, True Tone, colour accuracy',
  'Keyboard — every key tested individually',
  'Trackpad — click, force touch, gestures',
  'Battery health & cycle count',
  'All USB-C / Thunderbolt ports',
  'MagSafe connector (where applicable)',
  'SD card slot (where applicable)',
  'HDMI port (where applicable)',
  'Speakers — left and right channels',
  'Microphone array',
  'FaceTime / FaceID camera',
  'Wi-Fi — 2.4GHz and 5GHz',
  'Bluetooth',
  'Touch ID / Face ID',
  'Logic board diagnostics',
  'Fan and thermal management',
  'SSD speed and health',
  'RAM integrity',
  'macOS system integrity',
  'External cosmetic condition — all surfaces',
];

export function CertificationPage() {
  return (
    <div style={{ paddingTop: '56px' }}>

      {/* Hero */}
      <section style={{ background: '#1d1d1f', padding: '96px 0 80px' }}>
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: 'rgba(0,113,227,0.15)', color: '#0071e3', fontSize: '13px', fontWeight: 500 }}>
              <ShieldCheck size={13} />
              Our certification standard
            </div>
            <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.035em', lineHeight: 1.08, marginBottom: '20px' }}>
              Every device. Every check.<br />No exceptions.
            </h1>
            <p style={{ fontSize: '19px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto' }}>
              Our 7-step certification process ensures that every device we sell meets a standard we are personally proud to put our name on.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section style={{ background: '#f5f5f7', padding: '96px 0' }}>
        <div className="max-w-[900px] mx-auto px-6">
          <div className="flex flex-col gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex gap-6 p-8 rounded-2xl"
                style={{ background: '#fff' }}
              >
                {/* Number + icon */}
                <div className="flex flex-col items-center gap-3 flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,113,227,0.08)' }}>
                    <step.icon size={22} style={{ color: '#0071e3' }} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#0071e3', letterSpacing: '0.05em' }}>{step.number}</span>
                </div>

                {/* Content */}
                <div>
                  <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#1d1d1f', marginBottom: '10px', letterSpacing: '-0.01em' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: '#6e6e73', lineHeight: 1.75 }}>
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 60-point checklist */}
      <section style={{ background: '#fff', padding: '96px 0' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
            <div className="inline-block px-3 py-1 rounded-full mb-4" style={{ background: '#f5f5f7', color: '#6e6e73', fontSize: '13px', fontWeight: 500 }}>
              Step 3 in detail
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.03em', marginBottom: '12px' }}>
              What we check — every single time
            </h2>
            <p style={{ fontSize: '16px', color: '#6e6e73', maxWidth: '560px', margin: '0 auto' }}>
              Our 60-point inspection covers every component and function. Here is a sample of what we verify on every device.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CHECKS.map((check, i) => (
              <motion.div
                key={check}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="flex items-start gap-3 px-4 py-3 rounded-xl"
                style={{ background: '#f5f5f7' }}
              >
                <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#0071e3' }}>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1.5 4L4 6.5L8.5 1.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <span style={{ fontSize: '13px', color: '#1d1d1f', lineHeight: 1.5 }}>{check}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Condition report callout */}
      <section style={{ background: '#f5f5f7', padding: '96px 0' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-block px-3 py-1 rounded-full mb-4" style={{ background: 'rgba(0,113,227,0.08)', color: '#0071e3', fontSize: '13px', fontWeight: 500 }}>
                Included with every device
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '16px' }}>
                Your condition report
              </h2>
              <p style={{ fontSize: '16px', color: '#6e6e73', lineHeight: 1.75, marginBottom: '28px' }}>
                Every device ships with a printed and digital condition report — a full summary of everything our technicians found, measured, and verified. No surprises. No hidden issues.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  'Assigned condition grade with explanation',
                  'Battery health % and cycle count',
                  'List of all 60 checks — pass / fail / N/A',
                  'Notes on any cosmetic marks with location',
                  'Technician sign-off and date of inspection',
                  'Serial number and device specifications',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#0071e3' }}>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1.5 4L4 6.5L8.5 1.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span style={{ fontSize: '15px', color: '#1d1d1f' }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img
                  src="https://images.unsplash.com/photo-1692645214212-ea7fdb37ca6d?w=900&h=675&fit=crop"
                  alt="Technician cleaning a MacBook"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, color: '#1d1d1f', letterSpacing: '-0.025em', marginBottom: '12px' }}>
              Buy with confidence.
            </h2>
            <p style={{ fontSize: '16px', color: '#6e6e73', marginBottom: '28px' }}>
              Every device we sell has passed our full 7-step process. Browse our current stock — all certified, all warranted.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ background: '#0071e3', color: '#fff', fontSize: '15px', fontWeight: 500 }}>
                Browse devices <ChevronRight size={15} />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ background: '#f5f5f7', color: '#1d1d1f', fontSize: '15px', fontWeight: 500 }}>
                About us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
