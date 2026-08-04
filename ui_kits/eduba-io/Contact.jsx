const { useState: useStateC } = React;

const MONO = "'IBM Plex Mono', ui-monospace, monospace";
const DIA  = "'Diatype', 'Space Grotesk', system-ui, sans-serif";

/* ---- Contact ----------------------------------------------- */
function Contact() {
  const [form, setForm] = useStateC({ from:'', message:'' });
  const [sent, setSent] = useStateC(false);
  const change = k => e => setForm(f => ({...f,[k]:e.target.value}));
  const submit = e => {
    e.preventDefault();
    if (!form.from || !form.message) return;
    setSent(true);
    setTimeout(()=>{ setSent(false); setForm({from:'',message:''}); }, 2400);
  };
  return (
    <section data-screen-label="05 Contact" style={{background:'#FEFBF6', color:'#4A2C2A', padding:'80px 40px 100px'}}>
      <div style={{display:'grid', gridTemplateColumns:'1fr 360px', gap:60, alignItems:'flex-start'}}>
        <div>
          {/* mono section label */}
          <div style={{fontFamily:MONO, fontSize:8, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#A2777A', marginBottom:12}}>SECTION 05 / CONTACT</div>
          {/* Diatype heading */}
          <h2 style={{fontFamily:DIA, fontSize:48, fontWeight:700, margin:'0 0 20px', letterSpacing:'-0.02em', maxWidth:560, lineHeight:1.05}}>
            Write us a note, not a brief.
          </h2>
          {/* Diatype body */}
          <p style={{fontFamily:DIA, fontWeight:300, fontSize:15, lineHeight:1.6, color:'#7D5658', maxWidth:420, margin:0}}>
            We don't have a sales funnel. We read every email that lands in theceo@eduba.io — and usually answer within the week.
          </p>
        </div>

        <form onSubmit={submit} style={{padding:'0 2px', fontFamily:MONO}}>
          <div style={{textAlign:'center', padding:'6px 0 12px', borderBottom:'1px dashed rgba(93,49,54,.22)', marginBottom:14}}>
            <span style={{fontSize:8, fontWeight:700, letterSpacing:'0.12em', color:'#A2777A'}}>(compose_message)</span>
          </div>
          <Field label="From ···················" v={form.from} onChange={change('from')} placeholder="your@email.com"/>
          <Field label="Message ············" v={form.message} onChange={change('message')} placeholder="Write your message..." multiline/>
          <button type="submit" style={{
            marginTop:24, width:'100%', background: sent ? '#1a9c43' : '#5d3136', color:'#FEFBF6',
            border:'none', padding:'10px 12px', fontFamily:MONO, fontSize:9, fontWeight:800,
            letterSpacing:'0.12em', textTransform:'uppercase', cursor:'pointer',
            display:'flex', justifyContent:'space-between', alignItems:'center',
            transition:'background .2s ease',
          }}>
            <span>{sent ? 'Message opened ✓' : 'Send message'}</span>
            {!sent && <span style={{fontSize:14}}>→</span>}
          </button>
        </form>
      </div>
    </section>
  );
}

const contactInputStyle = {
  width:'100%', background:'transparent', border:'none',
  borderBottom:'1px solid rgba(93,49,54,.2)', padding:'4px 0 5px',
  fontFamily:"'IBM Plex Mono', monospace", fontSize:10, color:'#5d3136', outline:'none',
  resize:'none',
};

function Field({ label, v, onChange, placeholder, multiline }) {
  return (
    <div style={{padding:'0 2px 8px', borderBottom:'1px dashed rgba(93,49,54,.18)', marginBottom:8}}>
      <label style={{display:'block', fontFamily:"'IBM Plex Mono',monospace", fontSize:7, fontWeight:700, letterSpacing:'0.09em', textTransform:'uppercase', color:'#A2777A', marginBottom:4}}>{label}</label>
      {multiline
        ? <textarea value={v} onChange={onChange} placeholder={placeholder} rows={3} style={contactInputStyle}/>
        : <input type="text" value={v} onChange={onChange} placeholder={placeholder} style={contactInputStyle}/>
      }
    </div>
  );
}

/* ---- Footer ------------------------------------------------ */
function Footer() {
  return (
    <footer data-screen-label="06 Footer" style={{
      background:'#5d3136', color:'#EAD5D6', padding:'60px 40px 120px',
      fontFamily: MONO,
    }}>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:40, paddingBottom:40, borderBottom:'1px solid rgba(162,119,122,.4)'}}>
        <div>
          <img src="../../assets/brand-mark-white.svg" style={{height:14, marginBottom:14}}/>
          {/* Diatype footer description */}
          <div style={{fontFamily:DIA, fontWeight:300, fontSize:14, lineHeight:1.6, opacity:.7, letterSpacing:0, textTransform:'none'}}>
            Computational orchestration &amp; applied AI, based in Edinburgh.
          </div>
        </div>
        {[
          { h:'PRODUCTS', items:['Scribe','Study-Arcade','Vox-Meet','Clief Notes'] },
          { h:'RESEARCH', items:['ICR Soft Power','Ethics Engine','Policy Briefs'] },
          { h:'ELSEWHERE', items:['Substack →','LinkedIn →','GitHub →'] },
        ].map(col => (
          <div key={col.h}>
            <div style={{fontSize:8, letterSpacing:'0.12em', color:'#D8BFC0', marginBottom:10}}>{col.h}</div>
            {col.items.map(x=>(
              <div key={x} style={{fontSize:10, marginBottom:6}}>{x}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', paddingTop:24, fontSize:9, opacity:.7}}>
        <span>© EDUBA LTD · EST. 2023 · EDINBURGH, SCOTLAND</span>
        <span>THE FACES OF INTERFACE</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Contact, Footer });
