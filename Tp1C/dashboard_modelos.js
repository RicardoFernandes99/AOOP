const chartInstances=[];
const META={overview:["Overview","Portfolio-level comparison across regression and classification models, using the latest generated bundle."],linear_regression:["Linear Regression","Baseline regression model with direct train and test diagnostic comparisons."],random_forest:["Random Forest","Ensemble regressor view focused on predictive spread, residual stability, and test behavior."],decision_tree:["Decision Tree","Tree-based regression diagnostics framed in the same observatory layout as the mock references."]};
const fmt=(v,d=2)=>Number(v).toFixed(d);
const pct=(v,d=1)=>`${(Number(v)*100).toFixed(d)}%`;
const esc=(v)=>String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
const cLabel=(v)=>Number(v)===0.01?"C = 0.01":Number(v)===1?"C = 1":Number(v)===100?"C = 100":`C = ${v}`;
const secKey=(v)=>Number(v)===0.01?"logistic_c_001":Number(v)===1?"logistic_c_1":Number(v)===100?"logistic_c_100":`logistic_c_${String(v).replace(".","_")}`;
const width=(v,m)=>!isFinite(v)||!isFinite(m)||m===0?0:Math.max(8,Math.min(100,v/m*100));
const signedWidth=(v,min=-1,max=1)=>((Math.max(min,Math.min(max,v))-min)/(max-min))*100;
const quality=(s,t)=>s>=t.excellent?"Excellent":s>=t.good?"Strong":s>=t.ok?"Stable":"Watch";
const tone=(v,dir="high")=>dir==="low"?(v<=8?"ok":v<=12?"":"warn"):(v>=0.85?"ok":v>=0.6?"":"warn");
const pill=(label,cls="")=>`<span class="pill ${cls}"><span class="dot"></span><span>${esc(label)}</span></span>`;
const intro=(title,eyebrow,desc,chip="")=>`<div class="intro"><div><div class="eyebrow">${esc(eyebrow)}</div><h3>${esc(title)}</h3><p>${esc(desc)}</p></div>${chip}</div>`;
const hero=(label,value,meta,progress,cls="")=>`<div class="card hero ${cls}"><div class="accent"></div><div class="body"><div class="eyebrow">${esc(label)}</div><div class="hero-val"><strong>${value}</strong><span class="meta">${esc(meta)}</span></div><div class="track"><span style="width:${Math.max(8,Math.min(100,progress))}%"></span></div></div></div>`;
const band=(label,value,max,opt={})=>`<div class="band"><div class="band-top"><strong>${esc(label)}</strong>${opt.badge?pill(opt.badge,opt.badgeClass):""}</div><div class="bar${opt.signed?" signed":""}"><div class="fill ${opt.cls||""}${opt.signed?" signed":""}" style="width:${opt.signed?signedWidth(value):width(value,max)}%"></div></div><div class="meta" style="margin-top:10px">${fmt(value,opt.digits??(opt.signed?4:2))}</div></div>`;
const plot=(model)=>`<div class="plot"><canvas id="chart-${model.key}" aria-label="${esc(model.name)}"></canvas></div>`;
const cm=(m)=>`<div class="matrix"><div class="mlabel"></div><div class="mlabel">Pred 0</div><div class="mlabel">Pred 1</div><div class="mlabel">Real 0</div><div class="mcell hit"><strong>${m[0][0]}</strong><span>Correct negatives</span></div><div class="mcell miss"><strong>${m[0][1]}</strong><span>False positives</span></div><div class="mlabel">Real 1</div><div class="mcell miss"><strong>${m[1][0]}</strong><span>False negatives</span></div><div class="mcell hit"><strong>${m[1][1]}</strong><span>Correct positives</span></div></div>`;
const matrixTone=(v,dir="high")=>dir==="low"?(v<=8?"hit":v<=12?"":"miss"):(v>=0.45?"hit":v>=0.1?"":"miss");
const regressionMatrix=(tr,te)=>`<div class="matrix"><div class="mlabel"></div><div class="mlabel">Train</div><div class="mlabel">Test</div><div class="mlabel">Error</div><div class="mcell ${matrixTone(tr.rmse,"low")}"><strong>${fmt(tr.rmse)}</strong><span>RMSE</span></div><div class="mcell ${matrixTone(te.rmse,"low")}"><strong>${fmt(te.rmse)}</strong><span>RMSE</span></div><div class="mlabel">Fit</div><div class="mcell ${matrixTone(tr.r2)}"><strong>${fmt(tr.r2,4)}</strong><span>R2</span></div><div class="mcell ${matrixTone(te.r2)}"><strong>${fmt(te.r2,4)}</strong><span>R2</span></div></div>`;
const treeNode=(node)=>`<div class="tree-node ${node.is_leaf?"leaf":"split"}"><div class="eyebrow">${node.is_leaf?"Leaf node":"Decision node"}</div><div class="tree-rule">${esc(node.is_leaf?`prediction = ${fmt(node.value)}`:`${node.label} <= ${fmt(node.threshold)}`)}</div><div class="tree-meta"><span>Samples: ${node.samples}</span><span>${node.is_leaf?"Prediction":"Impurity"}: ${fmt(node.is_leaf?node.value:node.impurity,4)}</span></div></div>`;
const featureLabel=(label)=>String(label||"feature").replace(/^(num|cat)__/, "").split("_").filter(Boolean).map(part=>part.charAt(0).toUpperCase()+part.slice(1)).join(" ");
const previewTerminal=(node)=>!!node&&(node.is_leaf||node.label==="leaf"||(!node.left&&!node.right));
const pctInt=(v)=>`${Math.round(Number(v)*100)}%`;
const treeFitScale=(tree)=>{
  if(!tree)return 1;
  const byLeaves=18/Math.max(8,tree.n_leaves||8);
  const byDepth=8/Math.max(4,(tree.max_depth||1)+1);
  return Math.max(.18,Math.min(.85,Math.min(byLeaves,byDepth)));
};
function renderTreePreview(tree){
  if(!tree||!tree.root){
    return `<div class="empty">Tree structure not available in the bundle yet. Run <strong>python generate_dashboard_bundle.py</strong> after exporting the decision tree preview.</div>`;
  }
  const root=tree.root;
  const branches=[["True",root.left],["False",root.right]].filter(([,node])=>node);
  return `<div class="tree-stage"><div class="tree-root">${treeNode(root)}</div>${branches.length?`<div class="tree-children">${branches.map(([edge,node])=>`<div class="tree-branch"><div class="tree-edge"><span class="tree-chip">${edge}</span></div>${treeNode(node)}${!node.is_leaf&&node.left&&node.right?`<div class="tree-children"><div class="tree-branch"><div class="tree-edge"><span class="tree-chip">True</span></div>${treeNode(node.left)}</div><div class="tree-branch"><div class="tree-edge"><span class="tree-chip">False</span></div>${treeNode(node.right)}</div></div>`:""}</div>`).join("")}</div>`:""}</div>`;
}
function renderDecisionArchitecture(tree){
  if(!tree||!tree.root){
    return `<div class="empty">Tree structure not available in the bundle yet. Run <strong>python generate_dashboard_bundle.py</strong> after exporting the decision tree preview.</div>`;
  }
  const root=tree.root;
  const branch=(node,caption,share,branchLabel)=>`<div class="dt-arch-branch">
    <div class="dt-branch-label">${branchLabel} · ${share}</div>
    <div class="dt-arch-node ${previewTerminal(node)?"terminal":"split"}">
      <span class="dt-arch-caption">${caption}</span>
      <strong>${esc(previewTerminal(node)?`Prediction ${fmt(node.value)}`:`${featureLabel(node.label)} <= ${fmt(node.threshold,3)}`)}</strong>
      <span>${node.samples} samples · impurity ${fmt(node.impurity,2)}</span>
    </div>
    <div class="dt-branch-markers">
      <span class="${node&&node.left?"ok":""}">${node&&node.left?"True child":"Terminal"}</span>
      <span class="${node&&node.right?"warn":""}">${node&&node.right?"False child":"Leaf"}</span>
    </div>
  </div>`;
  return `<div class="dt-arch-stage">
    <div class="dt-arch-root">
      <div class="dt-arch-node root">
        <span class="dt-arch-caption">Root split</span>
        <strong>${esc(`${featureLabel(root.label)} <= ${fmt(root.threshold,3)}`)}</strong>
        <span>${root.samples} samples · impurity ${fmt(root.impurity,2)}</span>
      </div>
    </div>
    <div class="dt-arch-row">
      <svg class="dt-arch-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="50" y1="0" x2="24" y2="48"></line>
        <line x1="50" y1="0" x2="76" y2="48"></line>
      </svg>
      ${root.left?branch(root.left,"Left branch",pctInt(root.left.samples/root.samples),"True"):""}
      ${root.right?branch(root.right,"Right branch",pctInt(root.right.samples/root.samples),"False"):""}
    </div>
  </div>`;
}
function renderFullTreeNode(node){
  const isLeaf=previewTerminal(node);
  const headline=isLeaf?`Prediction ${fmt(node.value)}`:`${featureLabel(node.label)} <= ${fmt(node.threshold,3)}`;
  const meta=isLeaf?`Leaf node · ${node.samples} samples`:`Split node · ${node.samples} samples`;
  const children=[["True",node.left],["False",node.right]].filter(([,child])=>child);
  return `<div class="ft-subtree">
    <div class="ft-node ${isLeaf?"leaf":"split"}">
      <div class="eyebrow">${isLeaf?"Terminal":"Decision"}</div>
      <div class="ft-title">${esc(headline)}</div>
      <div class="ft-meta"><span>${meta}</span><span>Impurity ${fmt(node.impurity,2)}</span></div>
    </div>
    ${children.length?`<div class="ft-children ${children.length===1?"single":"double"}">${children.map(([edge,child])=>`<div class="ft-child"><div class="ft-edge">${edge}</div>${renderFullTreeNode(child)}</div>`).join("")}</div>`:""}
  </div>`;
}
function renderFullTreeViewer(tree){
  if(!tree||!tree.root){
    return `<div class="empty">Tree structure not available in the bundle yet. Run <strong>python generate_dashboard_bundle.py</strong> to export the full decision tree.</div>`;
  }
  const fitScale=treeFitScale(tree);
  return `<div class="ft-shell" data-tree-viewer data-fit-scale="${fitScale.toFixed(3)}">
    <div class="ft-toolbar">
      <div class="ft-stats">
        <span>${tree.node_count} nodes</span>
        <span>${tree.n_leaves} leaves</span>
        <span>depth ${tree.max_depth}</span>
      </div>
      <div class="ft-actions">
        <button type="button" class="ft-btn" data-tree-action="zoom-out" aria-label="Zoom out">-</button>
        <button type="button" class="ft-btn" data-tree-action="zoom-in" aria-label="Zoom in">+</button>
        <button type="button" class="ft-btn" data-tree-action="fit">Fit</button>
        <button type="button" class="ft-btn" data-tree-action="reset">100%</button>
        <span class="ft-scale" data-tree-scale>${Math.round(fitScale*100)}%</span>
      </div>
    </div>
    <div class="ft-scroller" data-tree-scroller>
      <div class="ft-viewport" data-tree-viewport style="--tree-scale:${fitScale}">
        ${renderFullTreeNode(tree.root)}
      </div>
    </div>
  </div>`;
}
function applyTreeScale(viewer,scale){
  const viewport=viewer.querySelector("[data-tree-viewport]");
  const label=viewer.querySelector("[data-tree-scale]");
  if(!viewport)return;
  const clamped=Math.max(.12,Math.min(1.6,scale));
  viewer.dataset.scale=String(clamped);
  viewport.style.setProperty("--tree-scale",clamped);
  if(label)label.textContent=`${Math.round(clamped*100)}%`;
}
function centerTreeViewer(viewer){
  const scroller=viewer.querySelector("[data-tree-scroller]");
  const viewport=viewer.querySelector("[data-tree-viewport]");
  if(!scroller||!viewport)return;
  scroller.scrollLeft=Math.max(0,(viewport.scrollWidth-scroller.clientWidth)/2);
}
function initTreeViewers(){
  document.querySelectorAll("[data-tree-viewer]").forEach(viewer=>{
    if(viewer.dataset.bound==="true")return;
    viewer.dataset.bound="true";
    const fitScale=Number(viewer.dataset.fitScale||.45);
    applyTreeScale(viewer,fitScale);
    viewer.addEventListener("click",event=>{
      const button=event.target.closest("[data-tree-action]");
      if(!button)return;
      const action=button.dataset.treeAction;
      const current=Number(viewer.dataset.scale||fitScale);
      if(action==="zoom-in")applyTreeScale(viewer,current*1.15);
      if(action==="zoom-out")applyTreeScale(viewer,current/1.15);
      if(action==="fit")applyTreeScale(viewer,fitScale);
      if(action==="reset")applyTreeScale(viewer,1);
      if(action==="fit"||action==="reset")requestAnimationFrame(()=>centerTreeViewer(viewer));
    });
    const scroller=viewer.querySelector("[data-tree-scroller]");
    if(scroller){
      scroller.addEventListener("wheel",event=>{
        if(!event.ctrlKey)return;
        event.preventDefault();
        const current=Number(viewer.dataset.scale||fitScale);
        applyTreeScale(viewer,current*(event.deltaY<0?1.08:.92));
      },{passive:false});
    }
    requestAnimationFrame(()=>centerTreeViewer(viewer));
  });
}
function renderDecisionTrend(tr,te){
  const y=(n)=>150-Math.max(0,Math.min(1,n))*110;
  const r2Train=(tr.r2+1)/2;
  const r2Test=(te.r2+1)/2;
  const rmseMax=Math.max(tr.rmse,te.rmse)*1.15||1;
  const rmseTrain=1-(tr.rmse/rmseMax);
  const rmseTest=1-(te.rmse/rmseMax);
  return `<div class="dt-trend">
    <svg viewBox="0 0 400 180" aria-label="Decision tree fit profile">
      <line x1="40" y1="150" x2="360" y2="150"></line>
      <line x1="40" y1="40" x2="360" y2="40" class="fade"></line>
      <line x1="40" y1="95" x2="360" y2="95" class="fade"></line>
      <path d="M40,${y(r2Train)} Q200,${Math.min(y(r2Train),y(r2Test))-22} 360,${y(r2Test)}" class="dt-line primary"></path>
      <path d="M40,${y(rmseTrain)} Q200,${Math.min(y(rmseTrain),y(rmseTest))-18} 360,${y(rmseTest)}" class="dt-line secondary"></path>
      <circle cx="40" cy="${y(r2Train)}" r="4" class="dt-point primary"></circle>
      <circle cx="360" cy="${y(r2Test)}" r="4" class="dt-point primary"></circle>
      <circle cx="40" cy="${y(rmseTrain)}" r="4" class="dt-point secondary"></circle>
      <circle cx="360" cy="${y(rmseTest)}" r="4" class="dt-point secondary"></circle>
      <text x="34" y="170">Train</text>
      <text x="350" y="170">Test</text>
    </svg>
  </div>
  <div class="dt-trend-legend">
    <span><i class="primary"></i>R2 trajectory</span>
    <span><i class="secondary"></i>Inverse RMSE</span>
  </div>`;
}
function renderDecisionImpurity(tree,gapRmse){
  if(!tree||!tree.root){
    return `<div class="empty">Structural metadata is unavailable for the current tree export.</div>`;
  }
  const root=tree.root;
  const weighted=((root.left?root.left.impurity*root.left.samples:0)+(root.right?root.right.impurity*root.right.samples:0))/Math.max(1,(root.left?root.left.samples:0)+(root.right?root.right.samples:0));
  const series=[
    {label:"Root",value:root.impurity},
    root.left?{label:"True",value:root.left.impurity}:null,
    root.right?{label:"False",value:root.right.impurity}:null,
    {label:"Blend",value:weighted}
  ].filter(Boolean);
  const min=Math.min(...series.map(item=>item.value));
  const max=Math.max(...series.map(item=>item.value));
  const xStep=series.length>1?520/(series.length-1):0;
  const pointAt=(item,index)=>{
    const x=24+(index*xStep);
    const y=144-((item.value-min)/Math.max(1,max-min))*108;
    return {x,y,label:item.label,value:item.value};
  };
  const points=series.map(pointAt);
  const best=points.reduce((acc,item)=>item.value<acc.value?item:acc,points[0]);
  return `<div class="dt-analysis">
    <div class="dt-impurity">
      <svg viewBox="0 0 580 170" aria-label="Decision tree impurity profile">
        <line x1="24" y1="144" x2="556" y2="144"></line>
        <path d="${points.map((point,index)=>`${index===0?"M":"L"}${point.x},${point.y}`).join(" ")}" class="dt-line tertiary"></path>
        ${points.map(point=>`<circle cx="${point.x}" cy="${point.y}" r="${point.label===best.label?5:4}" class="dt-point ${point.label===best.label?"best":"tertiary"}"></circle><text x="${point.x-12}" y="164">${point.label}</text>`).join("")}
        <text x="${best.x+10}" y="${best.y-10}" class="dt-note">Lowest impurity: ${best.label}</text>
      </svg>
      <div class="dt-curve-caption">Top-level impurity profile derived from the exported root split and its immediate branches.</div>
    </div>
    <div class="dt-metric-stack">
      <div class="dt-metric-box"><span>Root Feature</span><strong>${esc(featureLabel(root.label))}</strong></div>
      <div class="dt-metric-box"><span>Leaf Density</span><strong>${pctInt(tree.n_leaves/tree.node_count)}</strong></div>
      <div class="dt-metric-box"><span>Gap Pressure</span><strong>${fmt(gapRmse)}</strong></div>
    </div>
  </div>`;
}

function setSummary(stats){
  const l=stats.models.logistic_regression.metrics.selected;
  document.getElementById("sidebar-summary").innerHTML=`<div class="eyebrow">Dataset Snapshot</div><div class="headline">${stats.dataset.rows} registros, ${stats.dataset.columns-1} features úteis</div><p>Bundle consolidado para regressão e classificação. O classificador atual atinge ${pct(l.test_accuracy)} de accuracy em teste.</p><div class="mini-grid"><div class="mini-row"><span>Target</span><strong>indicador_kpi</strong></div><div class="mini-row"><span>Split</span><strong>80 / 20</strong></div><div class="mini-row"><span>Classifier C</span><strong>${cLabel(l.c)}</strong></div></div>`;
}

function renderLogisticNav(vars){
  document.getElementById("logistic-nav").innerHTML=vars.map(v=>`<button class="navbtn subnav" data-section="${secKey(v.c)}" onclick="showSection('${secKey(v.c)}',this)"><span class="material-symbols-outlined">tune</span><span>${cLabel(v.c)}</span></button>`).join("");
  const logisticCount=document.getElementById("logistic-count");
  if(logisticCount){
    logisticCount.innerHTML=`<span class="dot"></span><span>${vars.length} variant${vars.length===1?"":"s"}</span>`;
  }
}

function syncLogisticSections(vars){
  const c=document.getElementById("logistic-sections");
  const ids=new Set(vars.map(v=>`sec-${secKey(v.c)}`));
  Array.from(c.querySelectorAll(".section")).forEach(s=>{if(!ids.has(s.id))s.remove();});
  vars.forEach(v=>{const id=`sec-${secKey(v.c)}`;if(document.getElementById(id))return;const s=document.createElement("section");s.id=id;s.className="section";c.appendChild(s);});
}

function setHeader(name){
  const t=document.getElementById("page-title");
  const s=document.getElementById("page-subtitle");
  if(META[name]){t.textContent=META[name][0];s.textContent=META[name][1];return;}
  if(name.startsWith("logistic_c_")){
    const label=document.querySelector(".navbtn.subnav.active span:last-child");
    t.textContent=`Logistic Regression · ${label?label.textContent:"Variant"}`;
    s.textContent="Classifier diagnostics with confusion matrix, train versus test metrics, and prediction balance.";
  }
}

function showSection(name,btn){
  document.querySelectorAll(".section").forEach(e=>e.classList.remove("active"));
  document.querySelectorAll(".navbtn").forEach(e=>e.classList.remove("active"));
  const s=document.getElementById("sec-"+name);
  if(s)s.classList.add("active");
  if(btn)btn.classList.add("active");
  if(name.startsWith("logistic_c_")){
    document.getElementById("logistic-toggle").classList.add("active");
    setLogisticOpen(true);
  }
  setHeader(name);
}

function setLogisticOpen(open){
  document.getElementById("logistic-toggle").classList.toggle("open",open);
  document.getElementById("logistic-nav").classList.toggle("open",open);
}

function toggleLogisticNav(btn){setLogisticOpen(!btn.classList.contains("open"));}

function openLogisticSection(btn){
  const nav=document.getElementById("logistic-nav");
  const activeBtn=nav.querySelector(".navbtn.subnav.active");
  const targetBtn=activeBtn||nav.querySelector(".navbtn.subnav");
  if(!targetBtn){
    setLogisticOpen(!btn.classList.contains("open"));
    return;
  }
  setLogisticOpen(true);
  showSection(targetBtn.dataset.section,targetBtn);
}

function renderOverview(stats){
  const lin=stats.models.linear_regression.metrics.selected;
  const rf=stats.models.random_forest.metrics.selected;
  const dt=stats.models.decision_tree.metrics.selected;
  const lg=stats.models.logistic_regression.metrics.selected;
  const regs=[{key:"random_forest",name:"Random Forest",m:rf,cls:"ok"},{key:"decision_tree",name:"Decision Tree",m:dt,cls:""},{key:"linear_regression",name:"Linear Regression",m:lin,cls:"warn"}];
  const byRmse=[...regs].sort((a,b)=>a.m.test.rmse-b.m.test.rmse);
  const byMae=[...regs].sort((a,b)=>a.m.test.mae-b.m.test.mae);
  const byMse=[...regs].sort((a,b)=>a.m.test.mse-b.m.test.mse);
  const byR2=[...regs].sort((a,b)=>b.m.test.r2-a.m.test.r2);
  const maxRmse=Math.max(...regs.map(i=>i.m.test.rmse));
  const maxMae=Math.max(...regs.map(i=>i.m.test.mae));
  const maxMse=Math.max(...regs.map(i=>i.m.test.mse));
  const rank=(list,n)=>{const i=list.findIndex(x=>x.name===n);return [["Gold","gold"],["Silver","silver"],["Bronze","bronze"]][i];};
  return `${intro("Observatory Overview","Portfolio View","This screen consolidates the dataset footprint, the strongest model by task, and the relative performance of the regression candidates alongside the logistic classifier.",pill("Bundle Ready","ok"))}
  <div class="grid4">
    ${hero("Dataset Rows",stats.dataset.rows,"latest processed dataset",Math.min(100,stats.dataset.rows/250*100),"ok")}
    ${hero("Feature Count",stats.dataset.columns-1,"excluding target",Math.min(100,(stats.dataset.columns-1)/20*100))}
    ${hero("Best Regression RMSE",fmt(byRmse[0].m.test.rmse),byRmse[0].name,Math.min(100,100-byRmse[0].m.test.rmse*4),"blue")}
    ${hero("Logistic Accuracy",pct(lg.test_accuracy),cLabel(lg.c),lg.test_accuracy*100,"warn")}
  </div>
  <div class="grid2">
    <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Models At A Glance</div><div class="title">Current lineup</div><p class="sub">Mock-inspired cards adapted to the metrics available in the generated bundle.</p></div>${pill("Live Feed","ok")}</div><div class="models">
      ${regs.map(i=>`<div class="model"><div class="model-top"><div><h4>${i.name}</h4><p>${i.key==="linear_regression"?"Baseline fit and generalization readout":i.key==="random_forest"?"Ensemble regression performance panel":"Tree-driven regression behavior panel"}</p></div>${pill(i.m.test.r2===byR2[0].m.test.r2?"Top R2":i.m.test.rmse===byRmse[0].m.test.rmse?"Lowest RMSE":"Tracked",i.m.test.rmse===byRmse[0].m.test.rmse?"ok":"")}</div><div class="mini-grid"><div class="mini-row"><span>Test RMSE</span><strong>${fmt(i.m.test.rmse)}</strong></div><div class="mini-row"><span>Test MAE</span><strong>${fmt(i.m.test.mae)}</strong></div><div class="mini-row"><span>Test R2</span><strong>${fmt(i.m.test.r2,4)}</strong></div></div></div>`).join("")}
      <div class="model"><div class="model-top"><div><h4>Logistic Regression</h4><p>Classifier variant shelf driven by the selected C value.</p></div>${pill("Accuracy Lead","ok")}</div><div class="mini-grid"><div class="mini-row"><span>Selected Variant</span><strong>${cLabel(lg.c)}</strong></div><div class="mini-row"><span>Test Accuracy</span><strong>${pct(lg.test_accuracy)}</strong></div><div class="mini-row"><span>Test F1</span><strong>${fmt(lg.test.f1)}</strong></div></div></div>
    </div></div></div>
    <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Comparison Board</div><div class="title">Regression ranking signals</div><p class="sub">The highest-signal metrics from the current bundle, laid out in a denser observatory comparison panel.</p></div>${pill("Best by RMSE: "+byRmse[0].name,"ok")}</div><div class="grid2" style="margin-bottom:0">
      <div class="stack">${regs.map(i=>band(`${i.name} · RMSE`,i.m.test.rmse,maxRmse,{cls:i.cls,badge:rank(byRmse,i.name)[0],badgeClass:rank(byRmse,i.name)[1]})).join("")}</div>
      <div class="stack">${regs.map(i=>band(`${i.name} · MAE`,i.m.test.mae,maxMae,{cls:i.cls,badge:rank(byMae,i.name)[0],badgeClass:rank(byMae,i.name)[1]})).join("")}</div>
      <div class="stack">${regs.map(i=>band(`${i.name} · MSE`,i.m.test.mse,maxMse,{cls:i.cls,badge:rank(byMse,i.name)[0],badgeClass:rank(byMse,i.name)[1]})).join("")}</div>
      <div class="stack">${regs.map(i=>band(`${i.name} · R2`,i.m.test.r2,1,{signed:true,cls:i.cls,badge:rank(byR2,i.name)[0],badgeClass:rank(byR2,i.name)[1]})).join("")}</div>
    </div></div></div>
  </div>
  <div class="foot">Frontend redesign driven by the visual patterns in <code>Mocks/</code>, while preserving the current HTML + Chart.js bundle contract.</div>`;
}

function renderRegression(model){
  const tr=model.metrics.selected.train;
  const te=model.metrics.selected.test;
  const gapRmse=Math.abs(te.rmse-tr.rmse);
  const gapMae=Math.abs(te.mae-tr.mae);
  const gapR2=Math.abs(te.r2-tr.r2);
  const max=Math.max(tr.rmse,te.rmse,tr.mae,te.mae,tr.mse,te.mse);
  const health=quality(te.r2,{excellent:.8,good:.45,ok:.1});
  const cls=model.key==="random_forest"?"ok":model.key==="decision_tree"?"warn":"";
  const desc=model.key==="linear_regression"?"Baseline regression model with direct fit diagnostics":model.key==="random_forest"?"Ensemble regression performance panel":"Tree-driven regression behavior panel";
  return `${intro(model.name,"Performance",`${desc} in the darker observatory shell inspired by the mock files.`,pill(health,te.r2>=.1?"ok":"warn"))}
  <div class="grid4">
    ${hero("Test RMSE",fmt(te.rmse),"lower is better",Math.min(100,100-te.rmse*4),cls)}
    ${hero("Test MAE",fmt(te.mae),"average absolute error",Math.min(100,100-te.mae*4))}
    ${hero("Test R2",fmt(te.r2,4),"explained variance",Math.max(8,Math.min(100,(te.r2+1)*50)),"blue")}
    ${hero("Generalization Gap",fmt(gapRmse),"abs(train RMSE - test RMSE)",Math.max(8,Math.min(100,100-gapRmse*8)),"warn")}
  </div>
  <div class="grid21">
    <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Actual vs Predicted</div><div class="title">${model.name} scatter diagnostics</div><p class="sub">Chart.js scatter plot preserved from the current dashboard, restyled to match the dark observatory theme.</p></div>${pill("Test Plot")}</div>${plot(model)}</div></div>
    <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Model Readout</div><div class="title">Train vs test metrics</div><p class="sub">Compact performance panel derived entirely from the selected metric block.</p></div></div><div class="stack">
      ${band("Train RMSE",tr.rmse,max,{cls:tone(tr.rmse,"low")})}${band("Test RMSE",te.rmse,max,{cls:tone(te.rmse,"low")})}${band("Train MAE",tr.mae,max,{cls:tone(tr.mae,"low")})}${band("Test MAE",te.mae,max,{cls:tone(te.mae,"low")})}${band("Train R2",tr.r2,1,{signed:true,cls:tone(tr.r2)})}${band("Test R2",te.r2,1,{signed:true,cls:tone(te.r2)})}
    </div><div class="head" style="margin-top:18px"><div><div class="eyebrow">Performance Matrix</div><div class="title">Train vs test status grid</div><p class="sub">Matrix-style diagnostic panel inspired by the confusion-matrix treatment in the mockups.</p></div></div>${regressionMatrix(tr,te)}</div></div>
  </div>
  <div class="grid2">
    <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Metric Table</div><div class="title">Selected metrics</div><p class="sub">The original metric table retained in a stronger visual container.</p></div></div><table><thead><tr><th>Metric</th><th>Train</th><th>Test</th></tr></thead><tbody><tr><th>MAE</th><td>${fmt(tr.mae)}</td><td>${fmt(te.mae)}</td></tr><tr><th>MSE</th><td>${fmt(tr.mse)}</td><td>${fmt(te.mse)}</td></tr><tr><th>RMSE</th><td>${fmt(tr.rmse)}</td><td>${fmt(te.rmse)}</td></tr><tr><th>R2</th><td>${fmt(tr.r2,4)}</td><td>${fmt(te.r2,4)}</td></tr></tbody></table></div></div>
    <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Generalization Signals</div><div class="title">Gap diagnostics</div><p class="sub">A model health strip inspired by the mock detail screens.</p></div></div><div class="split"><div class="split-card"><div class="eyebrow">RMSE Gap</div><strong>${fmt(gapRmse)}</strong><div class="sub">Distance between train and test RMSE.</div></div><div class="split-card"><div class="eyebrow">MAE Gap</div><strong>${fmt(gapMae)}</strong><div class="sub">Absolute shift in average error between splits.</div></div><div class="split-card"><div class="eyebrow">R2 Gap</div><strong>${fmt(gapR2,4)}</strong><div class="sub">Variance-explained stability across train and test.</div></div><div class="split-card"><div class="eyebrow">Model Posture</div><strong>${health}</strong><div class="sub">Heuristic label based on current test R2.</div></div></div></div></div>
  </div>`;
}

function renderDecisionTree(model){
  const tr=model.metrics.selected.train;
  const te=model.metrics.selected.test;
  const gapRmse=Math.abs(te.rmse-tr.rmse);
  const gapMae=Math.abs(te.mae-tr.mae);
  const gapR2=Math.abs(te.r2-tr.r2);
  const health=quality(te.r2,{excellent:.8,good:.45,ok:.1});
  const tree=model.tree;
  const root=tree&&tree.root?tree.root:null;
  return `${intro(model.name,"Performance","Decision Tree redesigned against the mock example layout, while keeping the existing bundle metrics and structure export intact.",pill(health,te.r2>=.1?"ok":"warn"))}
  <div class="dt-layout">
    <div class="dt-sidebar">
      <div class="card"><div class="body"><div class="dt-panel-title"><span class="material-symbols-outlined">tune</span><span>Hyperparameters</span></div><div class="dt-kv">
        <div class="dt-kv-card"><label>Root Feature</label><strong>${root?esc(featureLabel(root.label)):"Unavailable"}</strong></div>
        <div class="dt-kv-card"><label>Max Depth</label><strong>${tree?tree.max_depth:"n/a"}</strong><span>${tree?"full tree export":"structure unavailable"}</span></div>
        <div class="dt-kv-card"><label>Node Count</label><strong>${tree?tree.node_count:"n/a"}</strong><span>${tree?`${tree.n_leaves} leaves in full tree`:"structure unavailable"}</span></div>
        <div class="dt-kv-card"><label>Primary Split</label><strong>${root?fmt(root.threshold,3):"n/a"}</strong><span>${root?`${root.samples} training samples at root`:"no tree root available"}</span></div>
      </div></div></div>
      <div class="card"><div class="body"><div class="dt-panel-title"><span class="material-symbols-outlined">insights</span><span>Signals</span></div><div class="dt-kv">
        <div class="dt-kv-card"><label>Model Posture</label><strong>${health}</strong><span>Based on current test R2.</span></div>
        <div class="dt-kv-card"><label>RMSE Gap</label><strong>${fmt(gapRmse)}</strong><span>Train versus test distance.</span></div>
        <div class="dt-kv-card"><label>R2 Gap</label><strong>${fmt(gapR2,4)}</strong><span>Variance explained drift.</span></div>
        <div class="dt-kv-card"><label>Leaf Density</label><strong>${tree?pctInt(tree.n_leaves/tree.node_count):"n/a"}</strong><span>Leaf share across total nodes.</span></div>
      </div></div></div>
    </div>
    <div class="dt-main">
      <div class="grid4">
        ${hero("Test RMSE",fmt(te.rmse),"lower is better",Math.min(100,100-te.rmse*4),"warn")}
        ${hero("Tree Depth",tree?tree.max_depth:"n/a",tree?`${tree.n_leaves} leaves`:"preview unavailable",tree?Math.min(100,tree.max_depth*12):8,"blue")}
        ${hero("Node Count",tree?tree.node_count:"n/a",tree?"full hierarchy":"structure unavailable",tree?Math.min(100,tree.node_count):8,"ok")}
        ${hero("Test R2",fmt(te.r2,4),"explained variance",Math.max(8,Math.min(100,(te.r2+1)*50)),"blue")}
      </div>
      <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Tree Architecture</div><div class="title">Full decision tree</div><p class="sub">The entire exported tree is rendered here. Use zoom controls or Ctrl + mouse wheel to inspect branches while keeping the full hierarchy available.</p></div>${pill(tree?`Depth ${tree.max_depth}`:"No Tree",tree?"ok":"warn")}</div>${renderFullTreeViewer(tree)}</div></div>
      <div class="grid2">
        <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Actual vs Predicted</div><div class="title">${model.name} scatter diagnostics</div><p class="sub">Observed versus predicted test values kept as the main visual validation panel.</p></div>${pill("Test Plot")}</div>${plot(model)}</div></div>
        <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Fit Profile</div><div class="title">Train to test trajectory</div><p class="sub">A mock-inspired curve view using the exported train/test R2 and RMSE signals.</p></div></div>${renderDecisionTrend(tr,te)}</div></div>
      </div>
      <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Complexity Analysis</div><div class="title">Impurity and structure readout</div><p class="sub">The lower analysis panel mirrors the example layout, but it uses root and branch impurities from the exported tree plus bundle-level generalization signals.</p></div>${pill(tree?`${tree.n_leaves} Leaves`:"No Tree",tree?"ok":"warn")}</div>${renderDecisionImpurity(tree,gapRmse)}</div></div>
      <div class="grid2">
        <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Performance Matrix</div><div class="title">Train vs test status grid</div><p class="sub">Matrix-style summary retained from the current dashboard for exact diagnostics.</p></div></div>${regressionMatrix(tr,te)}</div></div>
        <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Metric Table</div><div class="title">Selected metrics</div><p class="sub">Underlying train and test metrics remain available in table form.</p></div></div><table><tbody><tr><th>Train MAE</th><td>${fmt(tr.mae)}</td></tr><tr><th>Test MAE</th><td>${fmt(te.mae)}</td></tr><tr><th>Train RMSE</th><td>${fmt(tr.rmse)}</td></tr><tr><th>Test RMSE</th><td>${fmt(te.rmse)}</td></tr><tr><th>Train R2</th><td>${fmt(tr.r2,4)}</td></tr><tr><th>Test R2</th><td>${fmt(te.r2,4)}</td></tr>${tree?`<tr><th>Depth</th><td>${tree.max_depth}</td></tr><tr><th>Leaves</th><td>${tree.n_leaves}</td></tr>`:""}</tbody></table></div></div>
      </div>
    </div>
  </div>`;
}

function renderLogistic(model,v){
  const m=v.test.confusion_matrix;
  const tn=m[0][0],fp=m[0][1],fn=m[1][0],tp=m[1][1],total=tn+fp+fn+tp,correct=tn+tp;
  return `${intro(`${model.name} · ${cLabel(v.c)}`,"Classifier View","Classifier diagnostics in the visual language of the mock files, keeping the existing logistic regression payload and section model intact.",pill(quality(v.test_accuracy,{excellent:.85,good:.72,ok:.6}),v.test_accuracy>=.6?"ok":"warn"))}
  <div class="grid4">
    ${hero("Test Accuracy",pct(v.test_accuracy),"overall correctness",v.test_accuracy*100,"ok")}
    ${hero("Precision",fmt(v.test.precision),"positive prediction quality",v.test.precision*100)}
    ${hero("Recall",fmt(v.test.recall),"positive detection",v.test.recall*100,"blue")}
    ${hero("F1 Score",fmt(v.test.f1),"balance precision/recall",v.test.f1*100,"warn")}
  </div>
  <div class="grid21">
    <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Confusion Matrix</div><div class="title">Prediction breakdown</div><p class="sub">Matrix layout preserved, but redesigned to fit the same dark observatory shell as the other model screens.</p></div>${pill(cLabel(v.c))}</div>${cm(m)}</div></div>
    <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Classification Signals</div><div class="title">Variant summary</div><p class="sub">Compact readout for the selected logistic variant.</p></div></div><div class="split" style="margin-top:0"><div class="split-card"><div class="eyebrow">Correct Predictions</div><strong>${correct}</strong><div class="sub">${pct(correct/total)} of the evaluation set.</div></div><div class="split-card"><div class="eyebrow">Prediction Errors</div><strong>${fp+fn}</strong><div class="sub">${pct(1-v.test_accuracy)} error rate on the test split.</div></div><div class="split-card"><div class="eyebrow">False Positives</div><strong>${fp}</strong><div class="sub">Predicted positive, actual negative.</div></div><div class="split-card"><div class="eyebrow">False Negatives</div><strong>${fn}</strong><div class="sub">Missed positive examples.</div></div></div></div></div>
  </div>
  <div class="grid2">
    <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Train vs Test</div><div class="title">Selected metrics</div><p class="sub">Exact numbers from the logistic variant payload.</p></div></div><table><thead><tr><th>Metric</th><th>Train</th><th>Test</th></tr></thead><tbody><tr><th>Accuracy</th><td>${pct(v.train_accuracy)}</td><td>${pct(v.test_accuracy)}</td></tr><tr><th>Precision</th><td>${fmt(v.train.precision)}</td><td>${fmt(v.test.precision)}</td></tr><tr><th>Recall</th><td>${fmt(v.train.recall)}</td><td>${fmt(v.test.recall)}</td></tr><tr><th>F1 Score</th><td>${fmt(v.train.f1)}</td><td>${fmt(v.test.f1)}</td></tr></tbody></table></div></div>
    <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Scoreboard</div><div class="title">Metric bands</div><p class="sub">A denser visual treatment in the style of the mock classifier screens.</p></div></div><div class="stack">${band("Accuracy",v.test_accuracy,1,{cls:tone(v.test_accuracy)})}${band("Precision",v.test.precision,1,{cls:tone(v.test.precision)})}${band("Recall",v.test.recall,1,{cls:tone(v.test.recall)})}${band("F1 Score",v.test.f1,1,{cls:tone(v.test.f1)})}</div></div></div>
  </div>`;
}

function destroyCharts(){while(chartInstances.length)chartInstances.pop().destroy();}

function initChart(model,plotData){
  const c=document.getElementById(`chart-${model.key}`);
  if(!c||typeof Chart==="undefined")return;
  const min=plotData.min,max=plotData.max;
  const chart=new Chart(c,{type:"scatter",data:{datasets:[{data:plotData.points.map(p=>({x:p.actual,y:p.predicted})),backgroundColor:"rgba(180,197,255,.78)",borderColor:"rgba(180,197,255,1)",pointRadius:5,pointHoverRadius:7},{type:"line",data:[{x:min,y:min},{x:max,y:max}],borderColor:"rgba(78,222,163,.92)",borderDash:[8,6],borderWidth:2,pointRadius:0}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:"rgba(8,17,33,.96)",titleColor:"#dae2fd",bodyColor:"#dae2fd",borderColor:"rgba(180,197,255,.18)",borderWidth:1}},scales:{x:{min,max,title:{display:true,text:"Observed",color:"#9aa5c7"},ticks:{color:"#9aa5c7"},grid:{color:"rgba(180,197,255,.08)"}},y:{min,max,title:{display:true,text:"Predicted",color:"#9aa5c7"},ticks:{color:"#9aa5c7"},grid:{color:"rgba(180,197,255,.08)"}}}}});
  chartInstances.push(chart);
}

function renderDashboard(stats){
  destroyCharts();
  setSummary(stats);
  renderLogisticNav(stats.models.logistic_regression.metrics.variants);
  syncLogisticSections(stats.models.logistic_regression.metrics.variants);
  document.getElementById("sec-overview").innerHTML=renderOverview(stats);
  document.getElementById("sec-linear_regression").innerHTML=renderRegression(stats.models.linear_regression);
  document.getElementById("sec-random_forest").innerHTML=renderRegression(stats.models.random_forest);
  document.getElementById("sec-decision_tree").innerHTML=renderDecisionTree(stats.models.decision_tree);
  stats.models.logistic_regression.metrics.variants.forEach(v=>{const s=document.getElementById(`sec-${secKey(v.c)}`);if(s)s.innerHTML=renderLogistic(stats.models.logistic_regression,v);});
  initTreeViewers();
  initChart(stats.models.linear_regression,stats.models.linear_regression.plots.test_actual_vs_predicted);
  initChart(stats.models.random_forest,stats.models.random_forest.plots.test_actual_vs_predicted);
  initChart(stats.models.decision_tree,stats.models.decision_tree.plots.test_actual_vs_predicted);
  setHeader("overview");
  setLogisticOpen(false);
}

if(window.MODEL_STATS){renderDashboard(window.MODEL_STATS);}else{document.querySelectorAll(".section").forEach(s=>s.innerHTML='<div class="empty">Bundle missing. Run <strong>python generate_dashboard_bundle.py</strong> to generate the frontend data from the latest MLflow run.</div>');}
