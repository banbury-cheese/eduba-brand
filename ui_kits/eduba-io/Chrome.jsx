/* ============================================================
   Chrome.jsx — Frame shell matching Layout.tsx exactly.
   - Outer grid: auto 1fr auto, fixed inset, padding 8px
   - TopNav: row 1, inside the dark frame
   - Content: row 2, #FEFBF6 card, scrollable
   - BottomNav: row 3, nested ticket + slide-up contact form
   ============================================================ */

const { useState, useEffect, useRef, useCallback } = React;
const MONO = "'IBM Plex Mono', ui-monospace, monospace";

/* ---- Top Nav ----------------------------------------------- */
function TopNav({ onNav }) {
  return (
    <nav style={{
      display:'flex', justifyContent:'space-between', alignItems:'center',
      gap:12, padding:'0px 2px 7px 3px', color:'#EAD5D6',
      fontFamily:MONO, fontSize:11, fontWeight:600,
      textTransform:'uppercase', letterSpacing:'0.04em',
    }}>
      {/* Logo */}
      <button onClick={()=>onNav('home')} style={{
        background:'none', border:'none', color:'inherit', font:'inherit',
        textTransform:'uppercase', cursor:'pointer', display:'flex',
        alignItems:'center', gap:10, letterSpacing:'0.04em',
      }}>
        <img src="../../assets/brand-mark-white.svg" style={{height:11}}/>
        <span>THE FACES OF INTERFACE</span>
      </button>

      {/* Nav links */}
      <div style={{display:'flex', alignItems:'center', gap:18}}>
        {/* Readings — plain text */}
        <a href="https://jakevanclief.substack.com/" target="_blank" rel="noreferrer"
          style={{color:'#EAD5D6', textDecoration:'none', fontSize:11, fontWeight:600,
            textTransform:'uppercase', transition:'opacity .2s ease', cursor:'pointer'}}
          onMouseEnter={e=>e.currentTarget.style.opacity='.7'}
          onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
          Readings
        </a>

        {/* Clief Notes chip — rose */}
        <ChipButton bg="#D8BFC0" color="#5d3136" label="Clief Notes"
          href="https://www.skool.com/quantum-quill-lyceum-1116/about"/>

        {/* Primary CTA — black with green dot */}
        <ChipButton bg="#000" color="#fff" label="theceo@eduba.io"
          href="mailto:theceo@eduba.io" dot/>
      </div>
    </nav>
  );
}

function ChipButton({ bg, color, label, href, dot }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{
        display:'inline-flex', alignItems:'center', gap:6,
        padding:'3px 12px', borderRadius:4, height:28,
        background: hovered && bg==='#D8BFC0' ? '#FEFBF6' : bg,
        color: hovered && bg==='#D8BFC0' ? '#5d3136' : color,
        fontFamily:MONO, fontSize:11, fontWeight:600, textTransform:'uppercase',
        letterSpacing:'0.04em', textDecoration:'none', cursor:'pointer',
        transform: hovered ? 'scaleX(1.04)' : 'scaleX(1)',
        transition:'all .18s ease',
      }}>
      {dot && <span style={{width:5,height:5,background:'#25CA58',borderRadius:'50%',
        animation:'dotBlink 2s ease-in-out infinite',flexShrink:0}}/>}
      {label}
    </a>
  );
}

/* ---- Bottom Nav (matches Layout.tsx bottom nav) ------------ */
function BottomNav({ contentRef }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const arrowRef = useRef(null);
  const panelRef = useRef(null);
  const isOpenRef = useRef(false);

  const open = useCallback(() => {
    isOpenRef.current = true;
    setIsOpen(true);
    if (arrowRef.current) gsap.to(arrowRef.current, { rotate:180, duration:.38, ease:'power2.inOut' });
    if (contentRef?.current) gsap.to(contentRef.current, { filter:'blur(7px)', duration:.45, ease:'power2.out' });
    // Stagger fields
    setTimeout(() => {
      const fields = panelRef.current?.querySelectorAll('[data-field]') ?? [];
      gsap.fromTo(fields, { opacity:0, y:7 }, { opacity:1, y:0, duration:.26, stagger:.055, ease:'power2.out' });
    }, 90);
  }, [contentRef]);

  const close = useCallback(() => {
    isOpenRef.current = false;
    setIsOpen(false);
    if (arrowRef.current) gsap.to(arrowRef.current, { rotate:0, duration:.32, ease:'power2.inOut' });
    if (contentRef?.current) gsap.to(contentRef.current, { filter:'blur(0px)', duration:.32, ease:'power2.out' });
  }, [contentRef]);

  const toggle = useCallback(() => {
    if (isOpenRef.current) close(); else open();
  }, [open, close]);

  useEffect(() => {
    const onKey = e => { if (e.key==='Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [close]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !message) return;
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setEmail(''); setMessage(''); close(); }, 1400);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div onClick={close} style={{ position:'absolute', inset:0, zIndex:39, cursor:'pointer' }}/>}

      <nav style={{
        position:'absolute', bottom:0, left:0, right:0,
        display:'flex', justifyContent:'space-between', alignItems:'center',
        gap:12, padding:'19px 20px 20px', borderRadius:4,
        pointerEvents:'none', zIndex:40,
      }}>
        {/* Left: nested ticket + form */}
        <div style={{pointerEvents:'auto', display:'flex', alignItems:'flex-end', gap:3}}>
          {/* Outer frame */}
          <div style={{background:'#FEFBF6', border:'1px solid #5d3136', padding:5}}>
            {/* Middle frame */}
            <div style={{background:'#F9ECDF', border:'1px solid #A2777A', padding:2}}>
              {/* Contact form panel (grid expand) */}
              <div ref={panelRef} style={{
                display:'grid',
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                transition:'grid-template-rows 0.52s cubic-bezier(0.16,1,0.3,1)',
              }}>
                <div style={{overflow:'hidden', minHeight:0}}>
                  <div style={{padding:'6px 4px 6px', borderBottom:'1px dashed rgba(93,49,54,.22)', marginBottom:2}}>
                    {/* Header */}
                    <div style={{textAlign:'center', padding:'2px 0 6px',
                      borderBottom:'1px dashed rgba(93,49,54,.18)', marginBottom:7}} data-field>
                      <span style={{fontFamily:MONO, fontSize:8, fontWeight:700,
                        letterSpacing:'0.12em', color:'#A2777A'}}>(compose_message)</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                      {/* Email */}
                      <div style={{padding:'0 2px 6px', borderBottom:'1px dashed rgba(93,49,54,.12)', marginBottom:6}} data-field>
                        <label style={{display:'block', fontFamily:MONO, fontSize:7, fontWeight:700,
                          letterSpacing:'0.09em', textTransform:'uppercase', color:'#A2777A', marginBottom:4}}>
                          From ················
                        </label>
                        <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                          placeholder="your@email.com" required
                          style={{width:'100%', background:'transparent', border:'none',
                            borderBottom:'1px solid rgba(93,49,54,.2)', padding:'2px 0 3px',
                            fontFamily:MONO, fontSize:9, color:'#5d3136', outline:'none'}}/>
                      </div>
                      {/* Message */}
                      <div style={{padding:'0 2px 6px'}} data-field>
                        <label style={{display:'block', fontFamily:MONO, fontSize:7, fontWeight:700,
                          letterSpacing:'0.09em', textTransform:'uppercase', color:'#A2777A', marginBottom:4}}>
                          Message ············
                        </label>
                        <textarea value={message} onChange={e=>setMessage(e.target.value)}
                          placeholder="Write your message..." rows={3} required
                          style={{width:'100%', background:'transparent', border:'none',
                            borderBottom:'1px solid rgba(93,49,54,.2)', padding:'2px 0 3px',
                            fontFamily:MONO, fontSize:9, color:'#5d3136', outline:'none',
                            resize:'none', display:'block', lineHeight:1.5}}/>
                      </div>
                      {/* Submit */}
                      <div style={{padding:'4px 2px 0'}} data-field>
                        <button type="submit" style={{
                          width:'100%', display:'flex', alignItems:'center',
                          justifyContent: success ? 'center' : 'space-between',
                          background: success ? '#1a9c43' : '#5d3136', color:'#FEFBF6',
                          border:'none', padding:'5px 7px 5px 8px',
                          fontFamily:MONO, fontSize:8, fontWeight:800,
                          letterSpacing:'0.12em', textTransform:'uppercase', cursor:'pointer',
                          transition:'background .2s ease',
                        }}>
                          <span>{success ? 'Message opened ✓' : 'Send message'}</span>
                          {!success && <span style={{fontSize:12}}>→</span>}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* Trigger row */}
              <button type="button" onClick={toggle}
                style={{background:'none', border:'1px solid #A2777A',
                  padding:'5px 28px 5px 5px', cursor:'pointer', display:'flex',
                  flexDirection:'column', textAlign:'left', width:'100%', minWidth:200, font:'inherit'}}>
                <span style={{fontFamily:MONO, fontSize:12, fontWeight:700,
                  textTransform:'uppercase', color:'#5d3136'}}>START A CONVERSATION</span>
                <span style={{fontFamily:MONO, fontSize:6, letterSpacing:1,
                  textTransform:'uppercase', color:'#A2777A', marginTop:2}}>theceo@eduba.io</span>
              </button>
            </div>
          </div>

          {/* Arrow toggle (double-chevron, rotates 180° on open) */}
          <button type="button" onClick={toggle} style={{
            background:'none', border:'none', padding:0, cursor:'pointer',
            pointerEvents:'auto', height:15, width:14, flexShrink:0,
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <svg ref={arrowRef} width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x=".25" y=".25" width="13.5" height="14.5" fill="white" stroke="#421D24" strokeWidth=".5"/>
              <path fillRule="evenodd" clipRule="evenodd"
                d="M11.2577 7.13831H11.2766L7.13832 2.99998L3 7.13831H3.01893C5.37182 5.07315 8.90483 5.07315 11.2577 7.13831Z"
                fill="#421D24"/>
              <path fillRule="evenodd" clipRule="evenodd"
                d="M11.2885 11.1691H11.3075L7.16914 7.03081L3.03082 11.1691H3.04976C5.40264 9.10398 8.93566 9.10397 11.2885 11.1691Z"
                fill="#421D24"/>
            </svg>
          </button>
        </div>

        {/* Right: clock */}
        <Clock/>
      </nav>
    </>
  );
}

/* ---- Clock -------------------------------------------------- */
function Clock() {
  const [t, setT] = useState(new Date());
  useEffect(()=>{ const id=setInterval(()=>setT(new Date()),1000); return ()=>clearInterval(id); },[]);
  const hh = String(t.getHours()).padStart(2,'0');
  const mm = String(t.getMinutes()).padStart(2,'0');
  const ss = String(t.getSeconds()).padStart(2,'0');
  return (
    <div style={{
      fontFamily:MONO, fontSize:10, fontWeight:600,
      color:'#EAD5D6', textTransform:'uppercase', letterSpacing:'0.12em',
      display:'flex', flexDirection:'column', alignItems:'flex-end', gap:2,
      pointerEvents:'none',
    }}>
      <span>EDINBURGH · GMT</span>
      <span style={{fontSize:11}}>{hh}:{mm}:{ss}</span>
    </div>
  );
}

Object.assign(window, { TopNav, BottomNav, Clock });
