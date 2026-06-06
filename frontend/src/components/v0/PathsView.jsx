<style>
*{box-sizing:border-box;margin:0;padding:0}
.app{max-width:390px;margin:0 auto;background:#0d1018;min-height:600px;position:relative;overflow:hidden}
.screen{position:absolute;top:0;left:0;width:100%;min-height:600px;transition:transform 0.32s cubic-bezier(.4,0,.2,1),opacity 0.32s;background:#0d1018}
.screen.active{transform:translateX(0);opacity:1;pointer-events:all;position:relative}
.screen.go-left{transform:translateX(-100%);opacity:0;pointer-events:none}
.screen.go-right{transform:translateX(100%);opacity:0;pointer-events:none}
.topbar{display:flex;align-items:center;justify-content:space-between;padding:14px 16px 6px}
.topbar-title{font-size:18px;font-weight:500;color:#F5C518}
.topbar-sub{font-size:12px;color:rgba(255,255,255,0.45);margin-top:1px}
.back-btn{display:flex;align-items:center;gap:5px;font-size:13px;color:rgba(255,255,255,0.55);background:none;border:none;cursor:pointer;padding:0}
.path-row{padding:8px 12px;margin:2px 6px;border-radius:10px;cursor:pointer;transition:background 0.15s}
.path-row:hover{background:rgba(255,255,255,0.04)}
.node{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;position:relative;border:2px solid transparent}
.node.curr{width:38px;height:38px}
.nc{background:#2D9E5F;border-color:#3DB870}
.nl{background:#2a2820;border-color:#444}
.na{background:#F5C518;border-color:#D4A017}
.nrl{background:#2a2820;border-color:#444}
.nrd{background:#185FA5;border-color:#2070C0}
.nra{background:#C60B1E;border-color:#FF3040}
.milo-pin{position:absolute;top:-18px;left:50%;transform:translateX(-50%);font-size:13px;line-height:1}
.conn{flex:1;height:3px;border-radius:2px;opacity:0.75}
.conn-dash{flex:1;border-top:2px dashed;height:0;opacity:0.6}
.lmark{display:flex;justify-content:space-around;padding:2px 0 6px;font-size:14px;opacity:0.4}
.hdiv{height:1px;background:rgba(255,255,255,0.06);margin:4px 8px}
.focus-wrap{padding:0 14px 20px;display:flex;flex-direction:column;align-items:center}
.fnode{width:54px;height:54px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2.5px solid transparent;transition:transform 0.15s;position:relative;cursor:pointer}
.fnode:hover{transform:scale(1.07)}
.fnode.fl{background:#2a2820;border-color:#444;cursor:default;opacity:0.4}
.fnode.fl:hover{transform:none}
.fnode.fc{background:#2D9E5F;border-color:#3DB870}
.fnode.fa{background:#F5C518;border-color:#D4A017}
.fnode.fcurr{background:#F5C518;border-color:#D4A017}
.fnode.frl{background:#2a2820;border-color:#444;cursor:default;opacity:0.4}
.fnode.frl:hover{transform:none}
.fnode.frd{background:#185FA5;border-color:#2070C0}
.fnode.fra{background:#C60B1E;border-color:#FF3040}
.milo-f{position:absolute;top:-22px;left:50%;transform:translateX(-50%);font-size:17px}
.flabel{text-align:center;margin-top:7px;margin-bottom:3px}
.fconn{width:3px;border-radius:2px;opacity:0.65}
.word-row{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-radius:10px;border:0.5px solid rgba(255,255,255,0.08);margin-bottom:7px}
.abtn{width:100%;padding:14px;border-radius:12px;font-size:15px;font-weight:500;border:none;cursor:pointer;margin-top:8px}
.abtn.pri{background:#F5C518;color:#1a1200}
.abtn.sec{background:transparent;color:rgba(255,255,255,0.4);border:0.5px solid rgba(255,255,255,0.12)}
.abtn.dis{background:#2a2820;color:#555;cursor:default}
</style>

<div class="app" id="app">
  <div class="screen active" id="s0">
    <div class="topbar">
      <div><div class="topbar-title">Paths</div><div class="topbar-sub">Walk with Milo</div></div>
      <div style="font-size:12px;color:rgba(255,255,255,0.35)">8/10 today</div>
    </div>
    <div id="ov"></div>
  </div>

  <div class="screen go-right" id="s1">
    <div class="topbar">
      <button class="back-btn" onclick="nav(0,null,null)"><i class="ti ti-arrow-left" aria-hidden="true"></i> All paths</button>
    </div>
    <div id="pv"></div>
  </div>

  <div class="screen go-right" id="s2">
    <div class="topbar">
      <button class="back-btn" onclick="nav(1,curP,null)"><i class="ti ti-arrow-left" aria-hidden="true"></i> <span id="sb"></span></button>
    </div>
    <div id="sv"></div>
  </div>
</div>

<script>
const TH={
  dawn:{sky:'#1c0f22',card:'#281530',con:'#C080A0',tx:'#F0C8DC',sub:'#A07090'},
  day:{sky:'#0c1a0e',card:'#101e12',con:'#3a9e2f',tx:'#B8F0A8',sub:'#68A858'},
  golden:{sky:'#1a0f05',card:'#221408',con:'#A87010',tx:'#F0D070',sub:'#987840'},
  night:{sky:'#07090f',card:'#0c0f1c',con:'#304898',tx:'#8898D8',sub:'#485880'},
};
const PD=[
  {id:'p1',title:'El Primer Encuentro',en:'The First Meeting',sub:'Beginner I',done:5,rdone:true,
   lm:['ð²','ð¸','ðª¨','ð»','ð²','ð'],
   stops:[
    {id:'p1s1',t:'Hola y AdiÃ³s',st:'c',type:'s',w:[{es:'hola',en:'hello'},{es:'adiÃ³s',en:'goodbye'},{es:'buenos dÃ­as',en:'good morning'},{es:'buenas noches',en:'good night'},{es:'buenas tardes',en:'good afternoon'}]},
    {id:'p1s2',t:'Por Favor y Gracias',st:'c',type:'s',w:[{es:'gracias',en:'thank you'},{es:'de nada',en:"you're welcome"},{es:'por favor',en:'please'},{es:'perdÃ³n',en:'pardon'},{es:'lo siento',en:"i'm sorry"}]},
    {id:'p1s3',t:'Mucho Gusto',st:'c',type:'s',w:[{es:'mucho gusto',en:'nice to meet you'},{es:'encantado',en:'pleased to meet'},{es:'hasta luego',en:'see you later'},{es:'salud',en:'cheers'},{es:'suerte',en:'good luck'}]},
    {id:'p1s4',t:'SÃ­ y No',st:'c',type:'s',w:[{es:'sÃ­',en:'yes'},{es:'no',en:'no'},{es:'el',en:'the (m)'},{es:'la',en:'the (f)'},{es:'hay',en:'there is'}]},
    {id:'p1s5',t:'Yo y TÃº',st:'c',type:'s',w:[{es:'un',en:'a (m)'},{es:'una',en:'a (f)'},{es:'yo',en:'i'},{es:'tÃº',en:'you'},{es:'mi',en:'my'}]},
    {id:'p1r',t:'Â¡Prueba!',st:'rd',type:'r',w:[]},
  ]},
  {id:'p2',title:'Yo Soy',en:'I Am',sub:'Beginner I',done:3,rdone:false,
   lm:['ðï¸','ð²','ð','ð²','ð¿','ð'],
   stops:[
    {id:'p2s1',t:'Ãl y Ella',st:'c',type:'s',w:[{es:'Ã©l',en:'he'},{es:'ella',en:'she'},{es:'me',en:'me'},{es:'se',en:'himself'},{es:'su',en:'his/her'}]},
    {id:'p2s2',t:'Ser â Yo',st:'c',type:'s',w:[{es:'ser',en:'to be'},{es:'soy',en:'i am'},{es:'eres',en:'you are'},{es:'es',en:'he is'},{es:'hombre',en:'man'}]},
    {id:'p2s3',t:'La Gente',st:'c',type:'s',w:[{es:'mujer',en:'woman'},{es:'niÃ±o',en:'boy'},{es:'niÃ±a',en:'girl'},{es:'espaÃ±ol',en:'spanish'},{es:'inglÃ©s',en:'english'}]},
    {id:'p2s4',t:'Estar â Yo',st:'curr',type:'s',w:[{es:'estar',en:'to be'},{es:'estoy',en:'i am here'},{es:'estÃ¡s',en:'you are here'},{es:'estÃ¡',en:'he is here'},{es:'aquÃ­',en:'here'}]},
    {id:'p2s5',t:'Las Palabras Clave',st:'l',type:'s',w:[{es:'en',en:'in/at'},{es:'con',en:'with'},{es:'y',en:'and'},{es:'o',en:'or'},{es:'dÃ³nde',en:'where'}]},
    {id:'p2r',t:'Â¡Prueba!',st:'rl',type:'r',w:[]},
  ]},
  {id:'p3',title:'Necesito y Tengo',en:'I Need and I Have',sub:'Beginner II',done:0,rdone:false,
   lm:['ð','ð²','ðï¸','ð¸','âº','ð'],
   stops:[
    {id:'p3s1',t:'Necesitar',st:'l',type:'s',w:[]},
    {id:'p3s2',t:'Tener',st:'l',type:'s',w:[]},
    {id:'p3s3',t:'Querer',st:'l',type:'s',w:[]},
    {id:'p3s4',t:'Poder',st:'l',type:'s',w:[]},
    {id:'p3s5',t:'Hacer y Saber',st:'l',type:'s',w:[]},
    {id:'p3r',t:'Â¡Prueba!',st:'rl',type:'r',w:[]},
  ]},
];

let cT='day',curP=null,curS=null;

function setT(t){
  cT=t;
  renderOv();
}

function nav(to,pid,sid){
  const ids=['s0','s1','s2'];
  ids.forEach((id,i)=>{
    const el=document.getElementById(id);
    el.className='screen '+(i===to?'active':i<to?'go-left':'go-right');
  });
  if(to===1&&pid){curP=pid;renderPv(pid);}
  if(to===2&&sid){curS=sid;renderSv(sid);}
  document.getElementById('app').style.minHeight='600px';
}

function nodeSmCls(s){
  if(s.type==='r'){
    if(s.st==='rl')return'node nl nrl';
    if(s.st==='rd')return'node nc nrd';
    return'node nra curr';
  }
  if(s.st==='c')return'node nc';
  if(s.st==='curr')return'node na curr';
  if(s.st==='a')return'node na';
  return'node nl';
}
function nodeSmIcon(s){
  if(s.type==='r'){
    if(s.st==='rl')return`<i class="ti ti-lock" style="font-size:10px;color:#555" aria-hidden="true"></i>`;
    if(s.st==='rd')return`<i class="ti ti-trophy" style="font-size:12px;color:white" aria-hidden="true"></i>`;
    return`<i class="ti ti-star" style="font-size:12px;color:white" aria-hidden="true"></i>`;
  }
  if(s.st==='c')return`<i class="ti ti-check" style="font-size:12px;color:white" aria-hidden="true"></i>`;
  if(s.st==='l')return`<i class="ti ti-lock" style="font-size:10px;color:#555" aria-hidden="true"></i>`;
  return`<i class="ti ti-paw" style="font-size:12px;color:#1a1200" aria-hidden="true"></i>`;
}

function renderOv(){
  const th=TH[cT];
  let h=`<div style="background:${th.sky};padding:4px 0 20px">`;
  PD.forEach((p,pi)=>{
    const acs=[
      {c:'rgba(245,197,24,0.9)',bg:'rgba(245,197,24,0.1)',b:'rgba(245,197,24,0.25)'},
      {c:'rgba(245,197,24,0.55)',bg:'rgba(245,197,24,0.06)',b:'rgba(245,197,24,0.12)'},
      {c:'rgba(255,255,255,0.28)',bg:'rgba(255,255,255,0.04)',b:'rgba(255,255,255,0.08)'},
    ];
    const ac=acs[pi];
    h+=`<div class="path-row" onclick="nav(1,'${p.id}',null)">`;
    h+=`<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
      <div style="width:22px;height:22px;border-radius:50%;background:${ac.bg};color:${ac.c};border:1px solid ${ac.b};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:500;flex-shrink:0">${pi+1}</div>
      <div style="flex:1">
        <div style="font-size:14px;font-weight:500;color:${th.tx}">${p.title}</div>
        <div style="font-size:11px;color:${th.sub}">${p.en} Â· ${p.sub}</div>
      </div>
      <div style="font-size:11px;color:${th.sub}">${p.done}/5 <i class="ti ti-chevron-right" style="font-size:10px" aria-hidden="true"></i></div>
    </div>`;
    h+=`<div style="display:flex;align-items:center;padding:2px 0 4px">`;
    p.stops.forEach((s,si)=>{
      if(si>0){
        const pd=['c','rd'].includes(p.stops[si-1].st);
        const col=pd?th.con:'#333';
        if(si===5)h+=`<div class="conn-dash" style="border-color:${col}"></div>`;
        else h+=`<div class="conn" style="background:${col}"></div>`;
      }
      const cls=nodeSmCls(s);
      const isc=s.st==='curr';
      const sz=(isc||s.type==='r')?'34px':'30px';
      h+=`<div class="${cls}" style="width:${sz};height:${sz}">`;
      if(isc)h+=`<span class="milo-pin">ð</span>`;
      h+=nodeSmIcon(s);
      h+=`</div>`;
    });
    h+=`</div>`;
    h+=`<div class="lmark">${p.lm.map(x=>`<span>${x}</span>`).join('')}</div>`;
    if(pi<PD.length-1)h+=`<div class="hdiv"></div>`;
    h+=`</div>`;
  });
  h+=`<div style="padding:14px 16px;text-align:center;font-size:11px;color:${th.sub}">+ 9 more paths locked</div>`;
  h+=`</div>`;
  document.getElementById('ov').innerHTML=h;
}

function fnCls(s){
  if(s.type==='r'){
    if(s.st==='rl')return'fnode frl';
    if(s.st==='rd')return'fnode frd';
    return'fnode fra';
  }
  if(s.st==='c')return'fnode fc';
  if(s.st==='curr')return'fnode fcurr';
  if(s.st==='a')return'fnode fa';
  return'fnode fl';
}
function fnIcon(s){
  if(s.type==='r'){
    if(s.st==='rl')return`<i class="ti ti-lock" style="font-size:18px;color:#444" aria-hidden="true"></i>`;
    if(s.st==='rd')return`<i class="ti ti-trophy" style="font-size:20px;color:white" aria-hidden="true"></i>`;
    return`<i class="ti ti-star" style="font-size:20px;color:white" aria-hidden="true"></i>`;
  }
  if(s.st==='c')return`<i class="ti ti-check" style="font-size:20px;color:white" aria-hidden="true"></i>`;
  if(s.st==='l')return`<i class="ti ti-lock" style="font-size:16px;color:#444" aria-hidden="true"></i>`;
  return`<i class="ti ti-paw" style="font-size:20px;color:#1a1200" aria-hidden="true"></i>`;
}

function renderPv(pid){
  const p=PD.find(x=>x.id===pid);
  const th=TH[cT];
  let h=`<div style="padding:0 16px 8px">
    <div style="font-size:20px;font-weight:500;color:${th.tx}">${p.title}</div>
    <div style="font-size:13px;color:${th.sub};margin-top:2px">${p.en} Â· ${p.sub} Â· ${p.done}/5 complete</div>
  </div>`;
  h+=`<div style="background:${th.sky};margin:0 12px;border-radius:14px;padding:28px 20px;display:flex;flex-direction:column;align-items:center">`;
  p.stops.forEach((s,si)=>{
    if(si>0){
      const pd=['c','rd'].includes(p.stops[si-1].st);
      const col=pd?th.con:'#333';
      const off=si%2===0?'-28px':'28px';
      if(si===5){
        h+=`<div style="width:0;height:26px;border-left:2px dashed ${col};opacity:0.6;margin-left:calc(50% + ${off});transform:translateX(-50%)"></div>`;
      } else {
        h+=`<div style="width:3px;height:26px;border-radius:2px;background:${col};opacity:0.65;margin-left:calc(50% + ${off});transform:translateX(-50%)"></div>`;
      }
    }
    const isLocked=s.st==='l'||s.st==='rl';
    const isCurr=s.st==='curr';
    const isRev=s.type==='r';
    const off=si%2===0?'0':'56px';
    const cls=fnCls(s);
    const clickable=!isLocked;
    h+=`<div style="margin-left:${off};display:flex;flex-direction:column;align-items:center" ${clickable?`onclick="nav(2,null,'${s.id}')"`:''}">`;
    h+=`<div class="${cls}" style="width:54px;height:54px">`;
    if(isCurr)h+=`<span class="milo-f">ð</span>`;
    h+=fnIcon(s);
    h+=`</div>`;
    const lt=isRev?'â Â¡Prueba!':`Stop ${si+1}`;
    let ls='Locked';
    if(s.st==='c')ls='Done â';
    else if(s.st==='curr')ls='In progress';
    else if(s.st==='a')ls='Ready';
    else if(s.st==='rd')ls='Passed â';
    else if(isRev&&s.st==='rl')ls='All 5 stops first';
    h+=`<div class="flabel">
      <div style="font-size:12px;font-weight:500;color:${isLocked?th.sub:th.tx}">${lt}</div>
      <div style="font-size:10px;color:${th.sub};margin-top:2px">${ls}</div>
    </div>`;
    h+=`</div>`;
  });
  h+=`</div>`;
  document.getElementById('pv').innerHTML=h;
  document.getElementById('s1').style.background='#0d1018';
}

function renderSv(sid){
  const p=PD.find(x=>x.stops.some(s=>s.id===sid));
  const s=p.stops.find(x=>x.id===sid);
  const si=p.stops.indexOf(s);
  const th=TH[cT];
  const isRev=s.type==='r';
  const isLocked=s.st==='l'||s.st==='rl';
  const isDone=s.st==='c'||s.st==='rd';
  document.getElementById('sb').textContent=p.title;
  let h=`<div style="padding:0 16px 20px">`;
  h+=`<div style="background:${th.card};border-radius:12px;padding:14px;margin-bottom:12px;border:0.5px solid rgba(255,255,255,0.07)">`;
  if(isRev){
    h+=`<div style="font-size:11px;color:#C60B1E;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.5px;font-weight:500">Path Review</div>`;
    h+=`<div style="font-size:20px;font-weight:500;color:${th.tx}">Â¡Prueba!</div>`;
    h+=`<div style="font-size:13px;color:${th.sub};margin-top:4px">All 25 words from ${p.title}</div>`;
    h+=`<div style="font-size:12px;color:${th.sub};margin-top:2px">70% correct to pass Â· unlimited retries</div>`;
  } else {
    h+=`<div style="font-size:11px;color:rgba(245,197,24,0.7);margin-bottom:4px;text-transform:uppercase;letter-spacing:0.5px;font-weight:500">Stop ${si+1} of 5</div>`;
    h+=`<div style="font-size:20px;font-weight:500;color:${th.tx}">${s.t}</div>`;
    if(isDone)h+=`<div style="display:inline-flex;align-items:center;gap:4px;font-size:11px;padding:3px 8px;border-radius:20px;background:#2D9E5F;color:white;margin-top:6px"><i class="ti ti-check" style="font-size:11px" aria-hidden="true"></i> Passed</div>`;
  }
  h+=`</div>`;
  if(!isRev&&s.w.length>0){
    h+=`<div style="font-size:11px;color:${th.sub};padding:4px 0 8px;text-transform:uppercase;letter-spacing:0.5px">5 words in this stop</div>`;
    s.w.forEach(w=>{
      h+=`<div class="word-row" style="background:${th.card}">
        <div style="font-size:16px;font-weight:500;color:${th.tx}">${w.es}</div>
        <div style="font-size:13px;color:${th.sub}">${w.en}</div>
      </div>`;
    });
  }
  if(!isLocked){
    h+=`<button class="abtn pri" onclick="alert('Fetch would launch here!')">${isDone?'Fetch again ð¾':'Start Fetch ð¾'}</button>`;
    h+=`<button class="abtn sec" style="opacity:0.35;cursor:default">Watch lesson ð¬ â coming soon</button>`;
  } else {
    h+=`<button class="abtn dis">Complete previous stop first</button>`;
  }
  h+=`</div>`;
  document.getElementById('sv').innerHTML=h;
  document.getElementById('s2').style.background='#0d1018';
}

const hr=new Date().getHours();
setT(hr<8?'dawn':hr<17?'day':hr<20?'golden':'night');
</script>
