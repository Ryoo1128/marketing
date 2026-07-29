'use client';

import { useMemo, useState } from 'react';
const makeIcon = (glyph) => function Icon({ size = 18 }) { return <span aria-hidden="true" style={{ fontSize: size, lineHeight: 1 }}>{glyph}</span>; };
const Activity = makeIcon('◉');
const BarChart3 = makeIcon('▥');
const ChevronRight = makeIcon('›');
const Download = makeIcon('↓');
const FileText = makeIcon('▤');
const Filter = makeIcon('≡');
const Grid2X2 = makeIcon('▦');
const Lightbulb = makeIcon('◌');
const Search = makeIcon('⌕');
const Settings = makeIcon('⚙');
const Sparkles = makeIcon('✦');
const TrendingUp = makeIcon('↗');
const UploadCloud = makeIcon('↑');
import PptxGenJS from 'pptxgenjs';

const creatives = [
  {
    id: 1,
    brand: 'Brand A',
    platform: 'Meta',
    title: '여름 시즌 최대 40% 할인',
    copy: '이번 주말까지만 적용되는 시즌 한정 프로모션',
    cta: '지금 구매하기',
    offer: '최대 40%',
    hook: '기간 한정',
    tone: '긴급·혜택',
    score: 92,
    hue: 'violet',
  },
  {
    id: 2,
    brand: 'Brand B',
    platform: 'Google',
    title: '첫 구매 무료배송',
    copy: '신규 고객을 위한 간단하고 명확한 진입 혜택',
    cta: '혜택 받기',
    offer: '무료배송',
    hook: '첫 구매',
    tone: '직관·전환',
    score: 87,
    hue: 'blue',
  },
  {
    id: 3,
    brand: 'Brand C',
    platform: 'Naver',
    title: '오늘만 추가 쿠폰 지급',
    copy: '가격 혜택과 오늘 한정 메시지를 동시에 강조',
    cta: '쿠폰 확인',
    offer: '추가 쿠폰',
    hook: '오늘만',
    tone: '즉시성',
    score: 89,
    hue: 'green',
  },
  {
    id: 4,
    brand: 'Brand D',
    platform: 'Meta',
    title: '후기 1만 개가 증명한 선택',
    copy: '사회적 증거를 전면에 배치한 신뢰 중심 소재',
    cta: '후기 보기',
    offer: '리뷰 강조',
    hook: '1만 개 후기',
    tone: '신뢰·검증',
    score: 84,
    hue: 'orange',
  },
];

const navItems = [
  ['dashboard', 'Dashboard', Grid2X2],
  ['library', 'Creative Library', Search],
  ['insights', 'AI Insights', Sparkles],
  ['export', 'PPT Export', FileText],
];

function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

function Sidebar({ view, setView }) {
  return (
    <aside className="sidebar">
      <div className="brandmark"><span>CI</span><div><strong>Competitor</strong><small>Intelligence</small></div></div>
      <nav>
        {navItems.map(([key, label, Icon]) => (
          <button key={key} className={view === key ? 'nav active' : 'nav'} onClick={() => setView(key)}>
            <Icon size={18} /> {label}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="nav"><Settings size={18} /> Settings</button>
        <div className="sync-box"><Activity size={16}/><div><strong>자동 수집 활성화</strong><small>최근 동기화 10분 전</small></div></div>
      </div>
    </aside>
  );
}

function Header({ title, subtitle }) {
  return (
    <header className="topbar">
      <div><h1>{title}</h1><p>{subtitle}</p></div>
      <div className="top-actions"><button className="secondary"><UploadCloud size={17}/> 경쟁사 등록</button><button className="primary"><Sparkles size={17}/> AI 분석 실행</button></div>
    </header>
  );
}

function Dashboard({ setView, setSelected }) {
  const stats = [
    ['신규 소재', '128', '+18%', TrendingUp],
    ['활성 캠페인', '42', '+7%', Activity],
    ['수집 경쟁사', '16', '+2', BarChart3],
    ['AI 분석 완료', '96%', '+4%p', Sparkles],
  ];
  return (
    <>
      <Header title="Marketing Intelligence" subtitle="경쟁사의 캠페인과 광고 소재 변화를 한 화면에서 확인합니다." />
      <section className="content">
        <div className="stat-grid">
          {stats.map(([label, value, delta, Icon]) => <div className="stat-card" key={label}><div className="stat-icon"><Icon size={18}/></div><span>{label}</span><strong>{value}</strong><small>{delta} vs. 지난주</small></div>)}
        </div>
        <div className="grid-2">
          <div className="panel large"><div className="panel-title"><div><h2>플랫폼별 소재 분포</h2><p>최근 30일 자동 수집 기준</p></div><Badge>Last 30 days</Badge></div><div className="chart-bars">
            {[['Meta',72],['Google',54],['Naver',41],['YouTube',26]].map(([name,val])=><div className="bar-row" key={name}><span>{name}</span><div className="track"><i style={{width:`${val}%`}}/></div><b>{val}</b></div>)}
          </div>
          <div className="panel"><div className="panel-title"><div><h2>급상승 메시지</h2><p>사용 빈도 변화</p></div></div><div className="trend-list">
            {['오늘만','무료배송','첫 구매','최대 40%'].map((x,i)=><div key={x}><span>{i+1}</span><strong>{x}</strong><small>+{34-i*5}%</small></div>)}
          </div></div>
        </div>
        <div className="panel"><div className="panel-title"><div><h2>최근 수집된 광고 소재</h2><p>AI 분석 점수가 높은 순서입니다.</p></div><button className="text-btn" onClick={()=>setView('library')}>전체 보기 <ChevronRight size={16}/></button></div><div className="creative-row">
          {creatives.slice(0,3).map(c=><CreativeMini key={c.id} creative={c} onClick={()=>{setSelected(c);setView('detail')}}/>)}
        </div></div>
      </section>
    </>
  );
}

function CreativeMini({ creative, onClick }) {
  return <button className="creative-mini" onClick={onClick}><div className={`creative-art ${creative.hue}`}><span>{creative.offer}</span><strong>{creative.hook}</strong></div><div className="creative-copy"><div><Badge>{creative.platform}</Badge><span className="score">AI {creative.score}</span></div><h3>{creative.title}</h3><p>{creative.brand}</p></div></button>
}

function Library({ setView, setSelected }) {
  const [query, setQuery] = useState('');
  const [platform, setPlatform] = useState('전체');
  const filtered = useMemo(()=>creatives.filter(c=>(platform==='전체'||c.platform===platform)&&(`${c.title} ${c.brand} ${c.hook}`.toLowerCase().includes(query.toLowerCase()))),[query,platform]);
  return <><Header title="Creative Library" subtitle="플랫폼별 광고 소재를 검색하고 AI 분석 결과를 비교합니다."/><section className="content"><div className="filterbar"><div className="searchbox"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="브랜드, 메시지, 혜택 검색"/></div><div className="chips">{['전체','Meta','Google','Naver'].map(x=><button key={x} onClick={()=>setPlatform(x)} className={platform===x?'chip active':'chip'}>{x}</button>)}</div><button className="secondary"><Filter size={16}/> 필터</button></div><div className="library-grid">{filtered.map(c=><CreativeMini key={c.id} creative={c} onClick={()=>{setSelected(c);setView('detail')}}/>)}</div></section></>
}

function Detail({ creative, setView }) {
  return <><Header title="Creative Analysis" subtitle={`${creative.brand} · ${creative.platform} 소재 분석`}/><section className="content detail-layout"><div className="panel preview-panel"><div className={`creative-art hero ${creative.hue}`}><span>{creative.offer}</span><strong>{creative.hook}</strong><small>{creative.cta}</small></div><h2>{creative.title}</h2><p>{creative.copy}</p><button className="primary full">원본 광고 보기</button></div><div className="analysis-stack"><div className="panel score-card"><div><small>AI Creative Score</small><strong>{creative.score}</strong><span>/ 100</span></div><div className="ring" style={{'--score':`${creative.score*3.6}deg`}}><i>{creative.score}</i></div></div><div className="panel"><div className="panel-title"><div><h2>소재 특성</h2><p>메시지와 디자인 신호를 자동 태깅했습니다.</p></div></div><div className="tag-grid">{[['Hook',creative.hook],['Offer',creative.offer],['CTA',creative.cta],['Tone',creative.tone],['Framework','AIDA'],['Visual','High contrast']].map(([a,b])=><div key={a}><small>{a}</small><strong>{b}</strong></div>)}</div></div><div className="panel insight-box"><Lightbulb size={22}/><div><h3>AI Review</h3><p>혜택을 첫 화면에 크게 노출하고 기간 한정 표현을 결합해 즉시성을 높였습니다. CTA가 구체적이며 모바일 피드에서 빠르게 이해되는 구조입니다.</p></div></div><button className="secondary" onClick={()=>setView('insights')}>전체 전략 인사이트 보기 <ChevronRight size={16}/></button></div></section></>
}

function Insights({ setView }) {
  return <><Header title="AI Insights" subtitle="수집된 캠페인과 소재에서 반복되는 패턴을 전략으로 변환합니다."/><section className="content"><div className="hero-insight"><div><Badge>Weekly Intelligence</Badge><h2>경쟁사들은 ‘즉시 혜택 + 기간 한정’ 조합을 강화하고 있습니다.</h2><p>최근 30일 기준, 긴급성 카피 사용률이 34% 증가했고 신규 고객 혜택은 무료배송 중심으로 재편되었습니다.</p><button className="primary" onClick={()=>setView('export')}>전략 리포트 생성 <ChevronRight size={16}/></button></div><div className="signal-card"><span>Top Signal</span><strong>+34%</strong><p>긴급성 메시지 사용 증가</p></div></div><div className="grid-3"><InsightCard title="메시지 전략" text="‘오늘만’, ‘이번 주말까지’처럼 종료 시점을 명확하게 제시합니다."/><InsightCard title="혜택 전략" text="신규 고객에게는 할인율보다 무료배송·쿠폰 지급을 우선 노출합니다."/><InsightCard title="크리에이티브 전략" text="한 화면에 한 가지 혜택만 강조하고 CTA 대비를 높입니다."/></div><div className="panel"><div className="panel-title"><div><h2>자사 적용 우선순위</h2><p>경쟁사 패턴과 실행 난이도를 함께 반영했습니다.</p></div></div><div className="priority-table"><div><span>1</span><strong>첫 구매 무료배송 소재 A/B 테스트</strong><Badge>High impact</Badge></div><div><span>2</span><strong>종료 시점을 명시한 리타겟팅 카피</strong><Badge>Quick win</Badge></div><div><span>3</span><strong>리뷰 수치를 활용한 신뢰형 소재</strong><Badge>Test</Badge></div></div></div></section></>
}

function InsightCard({title,text}){return <div className="panel insight-card"><div className="stat-icon"><Lightbulb size={18}/></div><h3>{title}</h3><p>{text}</p></div>}

function ExportView({ onExport, exporting }) {
  return <><Header title="PPT Report Builder" subtitle="분석 내용을 선택해 PowerPoint 보고서로 내보냅니다."/><section className="content export-layout"><div className="panel export-form"><h2>보고서 설정</h2><label>보고서 제목<input defaultValue="경쟁사 광고 캠페인 분석 리포트"/></label><label>분석 기간<select defaultValue="최근 30일"><option>최근 7일</option><option>최근 30일</option><option>최근 90일</option></select></label><div className="check-list"><label><input type="checkbox" defaultChecked/> 캠페인·소재 요약</label><label><input type="checkbox" defaultChecked/> 소재 특성·인사이트</label><label><input type="checkbox" defaultChecked/> 경쟁사 전략 비교</label><label><input type="checkbox" defaultChecked/> 자사 적용 전략 제안</label></div><button className="primary full" onClick={onExport} disabled={exporting}><Download size={18}/>{exporting?'PPT 생성 중...':'PPT 다운로드'}</button></div><div className="panel slide-preview"><div className="slide cover"><small>COMPETITOR INTELLIGENCE</small><h2>경쟁사 광고 캠페인<br/>분석 리포트</h2><p>Campaign · Creative · Strategy</p></div><div className="thumb-row"><div>01<br/><b>Executive Summary</b></div><div>02<br/><b>Creative Analysis</b></div><div>03<br/><b>Strategy Proposal</b></div></div></div></section></>
}

export default function Page(){
  const [view,setView]=useState('dashboard');
  const [selected,setSelected]=useState(creatives[0]);
  const [exporting,setExporting]=useState(false);

  async function exportPpt(){
    setExporting(true);
    try{
      const pptx=new PptxGenJS();
      pptx.layout='LAYOUT_WIDE';
      pptx.author='Competitor Intelligence';
      pptx.subject='경쟁사 광고 캠페인 분석';
      pptx.title='경쟁사 광고 캠페인 분석 리포트';
      pptx.company='Marketing Intelligence';
      const addTitle=(slide,title,sub)=>{slide.addText(title,{x:.6,y:.4,w:8.5,h:.5,fontFace:'Arial',fontSize:24,bold:true,color:'172033'});slide.addText(sub,{x:.6,y:1,w:11.5,h:.35,fontFace:'Arial',fontSize:10,color:'667085'});};
      let s=pptx.addSlide();s.background={color:'111827'};s.addText('COMPETITOR INTELLIGENCE',{x:.7,y:.7,w:5,h:.3,fontSize:11,bold:true,color:'A78BFA',charSpacing:2});s.addText('경쟁사 광고 캠페인\n분석 리포트',{x:.7,y:1.6,w:7,h:1.5,fontSize:32,bold:true,color:'FFFFFF',breakLine:false});s.addText('Campaign · Creative · Strategy',{x:.7,y:3.5,w:5,h:.4,fontSize:15,color:'CBD5E1'});
      s=pptx.addSlide();addTitle(s,'Executive Summary','최근 30일 광고 라이브러리 자동 수집 데이터 기반');s.addText('128',{x:.8,y:1.8,w:1.5,h:.6,fontSize:30,bold:true,color:'6D5DFB'});s.addText('신규 소재',{x:.8,y:2.45,w:1.5,h:.3,fontSize:11,color:'667085'});s.addText('42',{x:3.2,y:1.8,w:1.5,h:.6,fontSize:30,bold:true,color:'6D5DFB'});s.addText('활성 캠페인',{x:3.2,y:2.45,w:1.8,h:.3,fontSize:11,color:'667085'});s.addText('핵심 인사이트',{x:.8,y:3.5,w:3,h:.4,fontSize:20,bold:true,color:'172033'});s.addText('• 긴급성 카피 사용률 34% 증가\n• 신규 고객 혜택은 무료배송 중심\n• 한 화면에 한 가지 혜택을 강조하는 소재 증가',{x:.9,y:4.1,w:8.8,h:1.5,fontSize:15,color:'344054',breakLine:false,margin:0.03});
      s=pptx.addSlide();addTitle(s,'Creative Analysis','상위 점수 소재의 공통 특성');creatives.slice(0,3).forEach((c,i)=>{const x=.7+i*4.1;s.addShape(pptx.ShapeType.roundRect,{x,y:1.6,w:3.6,h:3.9,rectRadius:.08,fill:{color:['EDE9FE','DBEAFE','DCFCE7'][i]},line:{color:'E4E7EC'}});s.addText(c.offer,{x:x+.25,y:2,w:2.8,h:.35,fontSize:13,bold:true,color:'6D5DFB'});s.addText(c.hook,{x:x+.25,y:2.5,w:3,h:.6,fontSize:22,bold:true,color:'172033'});s.addText(c.title,{x:x+.25,y:3.5,w:3,h:.7,fontSize:14,bold:true,color:'344054'});s.addText(`AI Score ${c.score}`,{x:x+.25,y:4.8,w:2,h:.3,fontSize:11,color:'667085'});});
      s=pptx.addSlide();addTitle(s,'Strategy Proposal','자사 적용 우선순위');const rows=[['1','첫 구매 무료배송 소재 A/B 테스트','High impact'],['2','종료 시점을 명시한 리타겟팅 카피','Quick win'],['3','리뷰 수치를 활용한 신뢰형 소재','Test']];s.addTable([['Priority','Action','Type'],...rows],{x:.7,y:1.6,w:11.7,h:3.2,border:{type:'solid',color:'D0D5DD',pt:1},fill:'FFFFFF',fontFace:'Arial',fontSize:13,color:'344054',bold:false,margin:.12,rowH:.6,colW:[1.1,8.3,2.3]});
      await pptx.writeFile({fileName:'competitor-intelligence-report.pptx'});
    }finally{setExporting(false)}
  }

  let body;
  if(view==='dashboard') body=<Dashboard setView={setView} setSelected={setSelected}/>;
  else if(view==='library') body=<Library setView={setView} setSelected={setSelected}/>;
  else if(view==='detail') body=<Detail creative={selected} setView={setView}/>;
  else if(view==='insights') body=<Insights setView={setView}/>;
  else body=<ExportView onExport={exportPpt} exporting={exporting}/>;

  return <main className="app"><Sidebar view={view==='detail'?'library':view} setView={setView}/><div className="workspace">{body}</div></main>;
}
