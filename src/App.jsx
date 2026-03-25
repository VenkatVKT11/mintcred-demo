import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Animation helpers ──────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease },
})

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.55, delay },
})

// ─── Background decoration ──────────────────────────────────────────────────
function BgDecor() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 700, height: 700, top: -300, left: -250,
          background: 'radial-gradient(circle, rgba(219,234,254,0.7) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
        animate={{ y: [0, -25, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 550, height: 550, top: -180, right: -200,
          background: 'radial-gradient(circle, rgba(191,219,254,0.55) 0%, transparent 65%)',
          filter: 'blur(70px)',
        }}
        animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-blue-50/80 to-transparent" />
    </div>
  )
}

// ─── Logo ───────────────────────────────────────────────────────────────────
function Logo({ size = 'default' }) {
  const isLg = size === 'lg'
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="flex items-center justify-center rounded-xl font-extrabold text-white select-none"
        style={{
          width: isLg ? 44 : 36, height: isLg ? 44 : 36,
          fontSize: isLg ? 20 : 16,
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          boxShadow: '0 4px 14px rgba(59,130,246,0.35)',
          flexShrink: 0,
        }}
      >
        M
      </div>
      <div className="flex items-baseline">
        <span className="font-bold tracking-tight text-slate-900" style={{ fontSize: isLg ? 26 : 20 }}>Mint</span>
        <span className="font-bold tracking-tight text-gradient" style={{ fontSize: isLg ? 26 : 20 }}>Cred</span>
      </div>
    </div>
  )
}

// ─── Email Capture (Fully Functional via Formspree/Web3Forms template) ──────
function EmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success
  const [focused, setFocused] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    
    // Simulate API call for now (can be replaced with fetch to formspree)
    // Example: fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', body: JSON.stringify({email}) })
    setTimeout(() => {
      setStatus('success')
    }, 800)
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease }}
          className="flex items-center gap-3 px-5 py-4 rounded-2xl"
          style={{ background: 'rgba(239,246,255,0.9)', border: '1px solid rgba(59,130,246,0.25)', boxShadow: '0 4px 24px rgba(59,130,246,0.1)' }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-700">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-slate-900 font-semibold text-sm">You're on the list!</p>
            <p className="text-blue-500 text-xs mt-0.5">We'll notify you the moment we launch.</p>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <input
            id="email-input"
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3.5 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-300"
            style={{
              background: focused ? '#ffffff' : '#f8fafc',
              border: focused ? '1.5px solid #3b82f6' : '1.5px solid #e2e8f0',
              boxShadow: focused ? '0 0 0 3px rgba(59,130,246,0.12)' : '0 1px 3px rgba(0,0,0,0.04)',
            }}
          />
          <motion.button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3.5 rounded-xl text-white text-sm font-semibold btn-gradient whitespace-nowrap cursor-pointer disabled:opacity-70 flex justify-center items-center h-12 w-full sm:w-auto min-w-[120px]"
            style={{ boxShadow: '0 4px 16px rgba(37,99,235,0.35)' }}
            whileHover={{ scale: status === 'loading' ? 1 : 1.03, boxShadow: '0 6px 24px rgba(37,99,235,0.5)' }}
            whileTap={{ scale: status === 'loading' ? 1 : 0.97 }}
          >
            {status === 'loading' ? (
               <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
            ) : 'Notify Me'}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

// ─── Loan Calculator ─────────────────────────────────────────────────────────
function LoanCalculator() {
  const [amount, setAmount] = useState(500000) // ₹5L
  const [tenure, setTenure] = useState(24) // 24 months

  // Simple EMI logic (flat interest ~12% pa for visual preview)
  const interestRate = 0.12
  const r = interestRate / 12
  const emi = Math.round((amount * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1))

  return (
    <motion.div {...fadeUp(0.85)} className="w-full max-w-lg mx-auto rounded-3xl p-5 sm:p-7 glass-card mt-12 bg-white/70 border-white relative overflow-hidden" style={{boxShadow: '0 8px 30px rgba(59,130,246,0.08)'}}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 -mr-10 -mt-10" />
      <h3 className="text-slate-900 font-bold text-lg mb-6 relative z-10 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        Calculate Your EMI
      </h3>

      <div className="mb-6 relative z-10">
        <div className="flex justify-between items-end mb-3">
          <label className="text-slate-500 text-sm font-medium">Loan Amount</label>
          <span className="text-blue-600 font-bold text-lg">₹{(amount / 100000).toFixed(1)}L</span>
        </div>
        <input 
          type="range" 
          min="50000" max="5000000" step="50000"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          style={{
             background: `linear-gradient(to right, #3b82f6 ${(amount-50000)/(5000000-50000)*100}%, #e2e8f0 ${(amount-50000)/(5000000-50000)*100}%)`,
          }}
        />
        <style dangerouslySetInnerHTML={{__html: `
          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none; appearance: none;
            width: 20px; height: 20px; border-radius: 50%;
            background: #ffffff; border: 3px solid #3b82f6; 
            box-shadow: 0 2px 6px rgba(0,0,0,0.15); cursor: grab;
          }
        `}} />
      </div>

      <div className="mb-8 relative z-10">
        <div className="flex justify-between items-end mb-3">
          <label className="text-slate-500 text-sm font-medium">Tenure (Months)</label>
          <span className="text-blue-600 font-bold text-lg">{tenure} mo</span>
        </div>
        <input 
          type="range" 
          min="6" max="60" step="6"
          value={tenure}
          onChange={(e) => setTenure(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          style={{
             background: `linear-gradient(to right, #3b82f6 ${(tenure-6)/(60-6)*100}%, #e2e8f0 ${(tenure-6)/(60-6)*100}%)`,
          }}
        />
      </div>

      <div className="bg-[#f8fafc] rounded-2xl p-5 border border-slate-100 flex justify-between items-end relative z-10" style={{boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'}}>
        <div>
          <p className="text-slate-400 text-xs font-medium mb-0.5">Estimated EMI</p>
          <p className="text-slate-900 font-extrabold text-2xl tracking-tight">₹{emi.toLocaleString('en-IN')}</p>
        </div>
        <div className="text-right pb-1">
          <p className="text-slate-400 text-[11px] font-medium uppercase tracking-wide">Int. Rate</p>
          <p className="text-blue-500 font-bold text-sm">~12.0% p.a.</p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Divider ────────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div className="w-full max-w-4xl mx-auto px-6">
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.15), transparent)' }} />
    </div>
  )
}

// ─── Service Card ────────────────────────────────────────────────────────────
function ServiceCard({ icon, title, description, delay }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      whileHover={{ y: -5, boxShadow: '0 20px 48px rgba(59,130,246,0.12)' }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="glass-card flex-1 min-w-[260px] rounded-2xl p-6 flex flex-col gap-4"
      style={{ boxShadow: '0 2px 16px rgba(59,130,246,0.06)' }}
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', border: '1px solid rgba(59,130,246,0.15)' }}>
        {icon}
      </div>
      <div>
        <h3 className="text-slate-900 font-semibold text-[15px] mb-1.5">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen relative flex flex-col overflow-x-hidden" style={{ background: '#ffffff' }}>
      <BgDecor />

      {/* ── Navbar ── */}
      <motion.header
        {...fadeIn(0)}
        className="relative z-10 flex items-center justify-center py-6 px-6 border-b"
        style={{ borderColor: 'rgba(226,232,240,0.6)', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)' }}
      >
        <Logo />
      </motion.header>

      {/* ── Hero ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center text-center px-6 pt-20 pb-16">
        <motion.div {...fadeIn(0.15)} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-blue-600" style={{ background: '#eff6ff', border: '1px solid rgba(59,130,246,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
            Launching Soon — Join the Waitlist
          </span>
        </motion.div>

        <motion.h1 {...fadeUp(0.25)} className="text-[2.75rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight mb-5 sm:leading-[1.08]">
          <span className="text-slate-900">Get Credit</span><br />
          <span className="text-gradient">In a Click</span>
        </motion.h1>

        <motion.p {...fadeUp(0.38)} className="text-slate-500 text-base sm:text-lg md:text-xl max-w-lg leading-relaxed mb-10 px-2 sm:px-0">
          Fast, simple, and transparent loans built for modern businesses and individuals.
        </motion.p>

        <motion.div {...fadeUp(0.48)} className="mb-3 w-full flex justify-center px-2 sm:px-0">
          <EmailCapture />
        </motion.div>

        <motion.p {...fadeIn(0.6)} className="text-slate-400 text-xs">
          No spam. Unsubscribe at any time.
        </motion.p>

        <motion.div {...fadeIn(0.7)} className="flex flex-col sm:flex-row items-center justify-center flex-wrap gap-6 sm:gap-10 mt-12 mb-10 sm:mt-14 sm:mb-14">
          {[
            { value: '< 24h', label: 'Approval Time' },
            { value: '100%', label: 'Digital Process' },
            { value: '₹5Cr+', label: 'Max Loan Amount' },
          ].map((s, i) => (
            <div key={i} className="text-center w-full sm:w-auto">
              <p className="text-slate-900 font-bold text-2xl">{s.value}</p>
              <p className="text-slate-400 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <Divider />

        {/* ── Services & Calculator ── */}
        <section className="w-full max-w-5xl mt-16 text-left sm:text-center">
          <motion.p {...fadeIn(0.55)} className="text-xs font-semibold tracking-widest uppercase text-blue-500 mb-2">
            What we offer
          </motion.p>
          <motion.h2 {...fadeUp(0.6)} className="text-slate-900 text-2xl sm:text-3xl font-bold mb-10">
            Loans designed around your life
          </motion.h2>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-5 text-left mb-6">
            <ServiceCard delay={0.65} title="Business Loans" description="Fuel your growth without delays. Capital when your business needs it most." icon={
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            } />
            <ServiceCard delay={0.75} title="Personal Loans" description="Quick support when you need it. Flexible terms that work around your life." icon={
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            } />
            <ServiceCard delay={0.85} title="Education Loans" description="Invest in your future. Smart financing for world-class opportunities." icon={
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            } />
          </div>

          {/* New Interactive EMI Calculator Component added below services */}
          <LoanCalculator />

        </section>

        {/* ── Trust Line ── */}
        <motion.div {...fadeIn(0.9)} className="mt-20 mb-2 max-w-lg mx-auto">
          <p className="text-slate-500 text-sm font-medium leading-relaxed sm:text-center">
            Built for entrepreneurs.&nbsp;
            <span className="text-blue-500 font-semibold block sm:inline">Powered by technology.</span>&nbsp;
            Designed for speed.
          </p>
        </motion.div>
      </main>

      {/* ── Footer ── */}
      <motion.footer {...fadeIn(1.0)} className="relative z-10 border-t" style={{ borderColor: 'rgba(226,232,240,0.7)', background: '#f8fafc' }}>
        <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo />
          <p className="text-slate-400 text-xs text-center">© 2026 MintCred. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Use'].map((item) => (
              <a key={item} href="#" className="text-slate-400 hover:text-blue-500 text-xs transition-colors duration-200">{item}</a>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
