const chartInstances=[];
const DATA_PAGES=["dashboard","data_distributions","data_correlations","data_scatter"];
const META={dashboard:["Data Explorer",""],data_distributions:["Distributions",""],data_correlations:["Correlations",""],data_scatter:["Scatterplot",""],overview:["Overview",""],linear_regression:["Linear Regression",""],random_forest:["Random Forest",""],decision_tree:["Decision Tree",""],logistic_regression:["Logistic Regression",""],predictions:["Predictions",""]};
const fmt=(v,d=2)=>Number(v).toFixed(d);
const pct=(v,d=1)=>`${(Number(v)*100).toFixed(d)}%`;
const esc=(v)=>String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
const chartNumber=(value)=>Number.isFinite(Number(value))?fmt(Number(value),2):String(value);
const cLabel=(v)=>Number(v)===0.01?"C = 0.01":Number(v)===1?"C = 1":Number(v)===100?"C = 100":`C = ${v}`;
const secKey=(v)=>Number(v)===0.01?"logistic_c_001":Number(v)===1?"logistic_c_1":Number(v)===100?"logistic_c_100":`logistic_c_${String(v).replace(".","_")}`;
const width=(v,m)=>!isFinite(v)||!isFinite(m)||m===0?0:Math.max(8,Math.min(100,v/m*100));
const signedWidth=(v,min=-1,max=1)=>((Math.max(min,Math.min(max,v))-min)/(max-min))*100;
const quality=(s,t)=>s>=t.excellent?"Excellent":s>=t.good?"Strong":s>=t.ok?"Stable":"Watch";
const tone=(v,dir="high")=>dir==="low"?(v<=8?"ok":v<=12?"":"warn"):(v>=0.85?"ok":v>=0.6?"":"warn");
const pill=()=>``;
const stripTileComments=(html)=>String(html).replace(/<p class="sub">[\s\S]*?<\/p>/g,"").replace(/<div class="sub">[\s\S]*?<\/div>/g,"");
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
const TREE_NODE_WIDTH=220;
const TREE_NODE_HEIGHT=112;
const TREE_H_GAP=36;
const TREE_V_GAP=132;
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
function treeChildren(node){
  return [["True",node.left],["False",node.right]].filter(([,child])=>child);
}
function measureTreeLayout(node){
  const children=treeChildren(node).map(([edge,child])=>({edge,node:child,layout:measureTreeLayout(child)}));
  const childrenWidth=children.reduce((sum,item)=>sum+item.layout.width,0)+TREE_H_GAP*Math.max(0,children.length-1);
  return {width:Math.max(TREE_NODE_WIDTH,childrenWidth||0),children};
}
function positionTreeLayout(node,layout,x,y,nodes,edges,badges,depth=0){
  const centerX=x+(layout.width/2);
  const isLeaf=previewTerminal(node);
  const headline=isLeaf?`Prediction ${fmt(node.value)}`:`${featureLabel(node.label)} <= ${fmt(node.threshold,2)}`;
  const metaPrimary=isLeaf?"Leaf node":"Decision node";
  const metaSecondary=isLeaf?`${node.samples} samples · value ${fmt(node.value,2)}`:`${node.samples} samples · impurity ${fmt(node.impurity,2)}`;
  nodes.push({className:isLeaf?"leaf":"split",x:centerX-(TREE_NODE_WIDTH/2),y,headline,metaPrimary,metaSecondary,isRoot:depth===0});
  if(!layout.children.length)return centerX;
  const childrenTotal=layout.children.reduce((sum,item)=>sum+item.layout.width,0)+TREE_H_GAP*Math.max(0,layout.children.length-1);
  let cursor=x+((layout.width-childrenTotal)/2);
  layout.children.forEach(item=>{
    const childCenter=positionTreeLayout(item.node,item.layout,cursor,y+TREE_V_GAP,nodes,edges,badges,depth+1);
    const junctionY=y+TREE_NODE_HEIGHT+26;
    const childTop=y+TREE_V_GAP;
    edges.push({fromX:centerX,fromY:y+TREE_NODE_HEIGHT,toX:childCenter,toY:childTop});
    badges.push({label:item.edge,x:(centerX+childCenter)/2,y:junctionY-22});
    cursor+=item.layout.width+TREE_H_GAP;
  });
  return centerX;
}
function renderFullTreeViewer(tree){
  if(!tree||!tree.root){
    return `<div class="empty">Tree structure not available in the bundle yet. Run <strong>python generate_dashboard_bundle.py</strong> to export the full decision tree.</div>`;
  }
  const fitScale=treeFitScale(tree);
  const layout=measureTreeLayout(tree.root);
  const nodes=[];
  const edges=[];
  const badges=[];
  positionTreeLayout(tree.root,layout,24,24,nodes,edges,badges);
  const diagramWidth=Math.max(960,layout.width+48);
  const maxDepth=Math.max(0,tree.max_depth||0);
  const diagramHeight=(maxDepth*TREE_V_GAP)+TREE_NODE_HEIGHT+64;
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
        <div class="ft-diagram" style="width:${diagramWidth}px;height:${diagramHeight}px">
          <svg class="ft-svg" viewBox="0 0 ${diagramWidth} ${diagramHeight}" aria-hidden="true">
            ${edges.map(edge=>`<path d="M ${edge.fromX} ${edge.fromY} L ${edge.fromX} ${(edge.fromY+edge.toY)/2} L ${edge.toX} ${(edge.fromY+edge.toY)/2} L ${edge.toX} ${edge.toY}" />`).join("")}
          </svg>
          ${badges.map(badge=>`<div class="ft-edge-badge" style="left:${badge.x}px;top:${badge.y}px">${badge.label}</div>`).join("")}
          ${nodes.map(node=>`<div class="ft-node ${node.className}"${node.isRoot?' data-tree-root="true"':""} style="left:${node.x}px;top:${node.y}px"><div class="eyebrow">${node.metaPrimary}</div><div class="ft-title">${esc(node.headline)}</div><div class="ft-meta"><span>${esc(node.metaSecondary)}</span></div></div>`).join("")}
        </div>
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
function zoomTreeAtPointer(viewer,nextScale,pointerX,pointerY){
  const scroller=viewer.querySelector("[data-tree-scroller]");
  if(!scroller){
    applyTreeScale(viewer,nextScale);
    return;
  }
  const currentScale=Number(viewer.dataset.scale||viewer.dataset.fitScale||1);
  const clamped=Math.max(.12,Math.min(1.6,nextScale));
  const safeScale=Math.max(currentScale,.001);
  const contentX=scroller.scrollLeft+(pointerX/safeScale);
  const contentY=scroller.scrollTop+(pointerY/safeScale);
  applyTreeScale(viewer,clamped);
  scroller.scrollLeft=Math.max(0,contentX-(pointerX/clamped));
  scroller.scrollTop=Math.max(0,contentY-(pointerY/clamped));
}
function centerTreeViewer(viewer){
  const scroller=viewer.querySelector("[data-tree-scroller]");
  const rootNode=viewer.querySelector("[data-tree-root]");
  if(!scroller||!rootNode)return;
  const scrollerRect=scroller.getBoundingClientRect();
  const rootRect=rootNode.getBoundingClientRect();
  const rootCenter=(rootRect.left+(rootRect.width/2))-scrollerRect.left;
  scroller.scrollLeft=Math.max(0,scroller.scrollLeft+(rootCenter-(scroller.clientWidth/2)));
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
      let dragging=false;
      let startX=0;
      let startY=0;
      let startLeft=0;
      let startTop=0;
      const stopDragging=()=>{
        dragging=false;
        scroller.classList.remove("dragging");
      };
      scroller.addEventListener("mousedown",event=>{
        if(event.button!==0)return;
        dragging=true;
        startX=event.clientX;
        startY=event.clientY;
        startLeft=scroller.scrollLeft;
        startTop=scroller.scrollTop;
        scroller.classList.add("dragging");
        event.preventDefault();
      });
      window.addEventListener("mousemove",event=>{
        if(!dragging)return;
        scroller.scrollLeft=startLeft-(event.clientX-startX);
        scroller.scrollTop=startTop-(event.clientY-startY);
      });
      window.addEventListener("mouseup",stopDragging);
      scroller.addEventListener("mouseleave",stopDragging);
      scroller.addEventListener("wheel",event=>{
        event.preventDefault();
        const current=Number(viewer.dataset.scale||fitScale);
        const rect=scroller.getBoundingClientRect();
        const pointerX=event.clientX-rect.left;
        const pointerY=event.clientY-rect.top;
        zoomTreeAtPointer(viewer,current*(event.deltaY<0?1.08:.92),pointerX,pointerY);
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
  return;
  const l=stats.models.logistic_regression.metrics.selected;
  document.getElementById("sidebar-summary").innerHTML=`<div class="eyebrow">Dataset Snapshot</div><div class="headline">${stats.dataset.rows} registros, ${stats.dataset.columns-1} features úteis</div><p>Bundle consolidado para regressão e classificação. O classificador atual atinge ${pct(l.test_accuracy)} de accuracy em teste.</p><div class="mini-grid"><div class="mini-row"><span>Target</span><strong>indicador_kpi</strong></div><div class="mini-row"><span>Split</span><strong>80 / 20</strong></div><div class="mini-row"><span>Classifier C</span><strong>${cLabel(l.c)}</strong></div></div>`;
}

function renderLogisticNav(vars){
  const nav=document.getElementById("logistic-nav");
  if(!nav)return;
  nav.innerHTML=vars.map(v=>`<button class="navbtn subnav" data-section="${secKey(v.c)}" onclick="showSection('${secKey(v.c)}',this)"><span class="material-symbols-outlined">tune</span><span>${cLabel(v.c)}</span></button>`).join("");
  const logisticCount=document.getElementById("logistic-count");
  if(logisticCount){
    logisticCount.innerHTML=`<span class="dot"></span><span>${vars.length} variant${vars.length===1?"":"s"}</span>`;
  }
}

function renderDashboardPlaceholder(){
  return `${intro("Stats Dashboard","CSV Stats","This area is reserved for dataset and CSV-level statistics. It is intentionally empty for now.",pill("Coming Soon","warn"))}
  <div class="card"><div class="body"><div class="empty">CSV statistics will be added here later.</div></div></div>`;
}

function renderDataTable(rows,columns,labels={}){
  return `<div class="data-table-wrap"><table class="data-table"><thead><tr>${columns.map(column=>`<th>${esc(labels[column]||featureLabel(column))}</th>`).join("")}</tr></thead><tbody>${rows.map(row=>`<tr>${columns.map(column=>`<td>${esc(row[column] ?? "n/a")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function renderDataOverview(eda){
  const summaryColumns=["feature","n","min","max","mediana","media","desvio_padrao"];
  const sampleColumns=Array.isArray(eda.sample_preview&&eda.sample_preview.columns)?eda.sample_preview.columns:[];
  const sampleRows=Array.isArray(eda.sample_preview&&eda.sample_preview.rows)?eda.sample_preview.rows:[];
  const missingRows=Array.isArray(eda.missing)?eda.missing:[];
  const missingTotal=missingRows.reduce((sum,item)=>sum+Number(item.count||0),0);
  const missingColumns=missingRows.filter(item=>Number(item.count||0)>0);
  const auditRows=(missingColumns.length?missingColumns:missingRows).slice(0,8);
  return `<div class="data-kpi-grid">
    <div class="data-kpi-card"><span>Rows</span><strong>${eda.kpis.rows}</strong><small></small></div>
    <div class="data-kpi-card"><span>Mean KPI</span><strong>${fmt(eda.kpis.mean_kpi)}</strong><small>${esc(eda.target)}</small></div>
    <div class="data-kpi-card"><span>Mean Satisfaction</span><strong>${fmt(eda.kpis.mean_satisfacao)}</strong><small>satisfacao_cidadao</small></div>
    <div class="data-kpi-card"><span>Mean Resolution</span><strong>${fmt(eda.kpis.mean_resolucao)}</strong><small>taxa_resolucao</small></div>
    <div class="data-kpi-card"><span>Mean Response</span><strong>${fmt(eda.kpis.mean_tempo_resposta)}</strong><small>tempo_resposta</small></div>
    <div class="data-kpi-card"><span>Mean Dropoff</span><strong>${fmt(eda.kpis.mean_taxa_abandono)}</strong><small>taxa_abandono</small></div>
  </div>
  <div class="grid2">
    <div class="card data-card"><div class="body"><div class="head"><div><div class="eyebrow">Distribution</div><div class="title">Target distribution</div><p class="sub">Histogram bins derived from the saved EDA subset.</p></div>${pill("EDA","ok")}</div><div class="data-chart"><canvas id="eda-target-distribution"></canvas></div></div></div>
    <div class="card data-card"><div class="body"><div class="head"><div><div class="eyebrow">Completeness</div><div class="title">Missing values audit</div><p class="sub">Coverage across the current dataset columns.</p></div>${pill("Clean","ok")}</div><div class="data-audit"><div class="data-audit-summary"><div class="data-audit-metric"><span>Missing cells</span><strong>${missingTotal}</strong></div><div class="data-audit-metric"><span>Columns checked</span><strong>${missingRows.length}</strong></div><div class="data-audit-metric"><span>Columns with gaps</span><strong>${missingColumns.length}</strong></div></div><div class="data-audit-list">${auditRows.map(item=>`<div class="data-audit-row"><span>${esc(item.column)}</span><strong>${Number(item.count||0)}</strong></div>`).join("")}</div></div></div></div>
  </div>
  <div class="stack">
    <div class="card data-card"><div class="body"><div class="head"><div><div class="eyebrow">Descriptive Stats</div><div class="title">Numeric summary</div><p class="sub">Core descriptive measures exported by <code>eda.py</code>.</p></div></div>${renderDataTable(eda.numeric_summary,summaryColumns,{feature:"Feature",n:"N",min:"Min",max:"Max",mediana:"Median",media:"Mean",desvio_padrao:"Std"})}</div></div>
  </div>
  <div class="stack">
    <div class="card data-card"><div class="body"><div class="head"><div><div class="eyebrow">CSV Sample</div><div class="title">Dataset preview</div><p class="sub">A few rows from the current CSV used to generate the EDA bundle.</p></div></div>${sampleColumns.length&&sampleRows.length?renderDataTable(sampleRows,sampleColumns):'<div class="empty">Sample rows are not available in the current EDA bundle. Regenerate the frontend assets.</div>'}</div></div>
  </div>
  `;
}

function renderDataDistributions(eda){
  const histogramKeys=["indicador_kpi","tempo_resposta","taxa_resolucao","indicador_si","volume_interacoes","satisfacao_cidadao","taxa_abandono","erros_tecnicos"];
  return `<div class="data-chart-grid">${histogramKeys.map(key=>`<div class="card data-card"><div class="body"><div class="head"><div><div class="eyebrow">Histogram</div><div class="title">${esc(featureLabel(key))}</div><p class="sub">Distribution bins reconstructed from the EDA output.</p></div></div><div class="data-chart medium"><canvas id="hist-${key}"></canvas></div></div></div>`).join("")}</div>`;
}

function heatColor(value){
  const clamped=Math.max(-1,Math.min(1,Number(value)||0));
  if(Math.abs(clamped)<0.001)return "rgba(226,232,240,.16)";
  const hue=clamped<0?212:6;
  const alpha=.18+(Math.abs(clamped)*.72);
  const lightness=clamped<0?58:56;
  return `hsla(${hue}, 78%, ${lightness}%, ${alpha})`;
}

function heatTextColor(value){
  return Math.abs(Number(value)||0)>=.42?"#f8fbff":"#dbe4ff";
}

function renderCorrelationMatrix(eda){
  const labels=eda.correlation.labels;
  const header=labels.map(label=>`<div class="heat-cell heat-label">${esc(featureLabel(label))}</div>`).join("");
  const rows=labels.map((label,rowIndex)=>`<div class="heat-cell heat-label">${esc(featureLabel(label))}</div>${eda.correlation.matrix[rowIndex].map(value=>`<div class="heat-cell" style="background:${heatColor(value)};color:${heatTextColor(value)}">${fmt(value,2)}</div>`).join("")}`).join("");
  const legendTicks=[1,.75,.5,.25,0,-.25,-.5,-.75,-1];
  return `<div class="corr-matrix-shell">
    <div class="heat-grid heat-grid-plot" style="grid-template-columns:repeat(${labels.length+1},minmax(0,1fr))"><div class="heat-cell heat-corner"></div>${header}${rows}</div>
    <aside class="corr-legend" aria-label="Correlation legend">
      <div class="corr-legend-body">
        <div class="corr-legend-scale" aria-hidden="true"></div>
        <div class="corr-legend-ticks">${legendTicks.map(value=>`<span>${value>0?`+${fmt(value,2)}`:fmt(value,2)}</span>`).join("")}</div>
      </div>
    </aside>
  </div>`;
}

function renderDataCorrelations(eda){
  return `<div class="grid2">
    <div class="card data-card"><div class="body"><div class="head"><div><div class="eyebrow">Correlation Matrix</div><div class="title">Numeric relationships</div><p class="sub">Heatmap-style view of the EDA correlations.</p></div>${pill("EDA")}</div>${renderCorrelationMatrix(eda)}</div></div>
    <div class="card data-card"><div class="body"><div class="head"><div><div class="eyebrow">Top Pairs</div><div class="title">Strongest relationships</div><p class="sub">Highest absolute correlations in the exported EDA subset.</p></div></div>${renderDataTable(eda.correlation.top_pairs.map(row=>({feature_1:featureLabel(row.feature_1),feature_2:featureLabel(row.feature_2),correlation:fmt(row.correlation,2)})),["feature_1","feature_2","correlation"],{feature_1:"Feature 1",feature_2:"Feature 2",correlation:"Correlation"})}</div></div>
  </div>`;
}

function scatterColumns(eda){
  const scatterData=window.EDA_SCATTER_DATA;
  if(Array.isArray(scatterData)&&scatterData.length)return Object.keys(scatterData[0]);
  return Array.isArray(eda&&eda.numeric_columns)?eda.numeric_columns:[];
}

function scatterCorrelation(eda,xKey,yKey){
  if(!eda||!eda.correlation||!Array.isArray(eda.correlation.labels)||!Array.isArray(eda.correlation.matrix))return null;
  const xIndex=eda.correlation.labels.indexOf(xKey);
  const yIndex=eda.correlation.labels.indexOf(yKey);
  if(xIndex===-1||yIndex===-1)return null;
  const row=eda.correlation.matrix[xIndex];
  if(!Array.isArray(row))return null;
  const value=row[yIndex];
  return Number.isFinite(Number(value))?Number(value):null;
}

function renderDataScatter(eda){
  const columns=scatterColumns(eda);
  const defaultX=columns[0]||"indicador_si";
  const preferredY=eda&&eda.target!==defaultX?eda.target:null;
  const defaultY=(preferredY&&columns.includes(preferredY)?preferredY:null)||columns.find(column=>column!==defaultX)||defaultX;
  const option=(column,selected)=>`<option value="${esc(column)}"${column===selected?" selected":""}>${esc(featureLabel(column))}</option>`;
  return `<div class="card data-card"><div class="body"><div class="scatter-controls"><label class="scatter-control"><span>X</span><select id="eda-scatter-x" class="scatter-select">${columns.map(column=>option(column,defaultX)).join("")}</select></label><label class="scatter-control"><span>Y</span><select id="eda-scatter-y" class="scatter-select">${columns.map(column=>option(column,defaultY)).join("")}</select></label></div><div class="data-chart tall"><canvas id="eda-scatter-chart"></canvas></div></div></div>`;
}

function renderPredictionField(field){
  const label=featureLabel(field.label||field.name);
  if(field.type==="select"){
    return `<label class="pred-control"><span>${esc(label)}</span><select class="pred-input" name="${esc(field.name)}">${(field.options||[]).map(option=>`<option value="${esc(option)}"${option===field.default?" selected":""}>${esc(option)}</option>`).join("")}</select></label>`;
  }
  if(field.type==="date"){
    return `<label class="pred-control"><span>${esc(label)}</span><input class="pred-input" type="date" name="${esc(field.name)}" value="${field.default?esc(field.default):""}" /></label>`;
  }
  const minAttr=field.min==null?"":` min="${field.min}"`;
  const maxAttr=field.max==null?"":` max="${field.max}"`;
  return `<label class="pred-control"><span>${esc(label)}</span><input class="pred-input" type="number" name="${esc(field.name)}" step="${field.step??0.01}"${minAttr}${maxAttr} value="${field.default==null?"":field.default}" /></label>`;
}

function renderPredictionPage(stats){
  const payload=stats&&stats.predictions;
  if(!payload||!payload.transform||!payload.models){
    return `<div class="empty">Prediction payload is unavailable. Run <strong>python generate_dashboard_bundle.py</strong> after exporting the latest MLflow models and preprocessor.</div>`;
  }
  const modelOptions=Object.values(payload.models);
  return `<div class="pred-shell">
    <div class="card"><div class="body">
      <div class="head"><div><div class="eyebrow">Inference Console</div><div class="title">Generate a model prediction</div><p class="sub">Inputs use the original dataset schema. Categorical values are rendered as dropdowns, and preprocessing is applied in-browser before scoring the selected MLflow model.</p></div>${pill(`${modelOptions.length} Models`,"ok")}</div>
      <div class="pred-toolbar">
        <label class="pred-control pred-model"><span>Model</span><select id="pred-model" class="pred-input">${modelOptions.map(model=>`<option value="${esc(model.key)}">${esc(model.name)}</option>`).join("")}</select></label>
      </div>
      <form id="prediction-form" class="pred-form">
        <div class="pred-grid">${(payload.transform.raw_fields||[]).map(renderPredictionField).join("")}</div>
        <div class="pred-actions">
          <button type="submit" class="ft-btn">Generate Prediction</button>
          <button type="button" class="ft-btn" data-predict-action="reset">Reset</button>
        </div>
      </form>
    </div></div>
    <div class="card"><div class="body">
      <div class="head"><div><div class="eyebrow">Prediction Output</div><div class="title">Current estimate</div><p class="sub">The result below comes from the currently selected model and the latest exported MLflow bundle.</p></div></div>
      <div id="prediction-result" class="pred-result"><div class="pred-empty">Select a model, review the input values, and generate a prediction.</div></div>
    </div></div>
  </div>`;
}

function parsePredictionDate(value){
  if(!value)return null;
  const date=new Date(`${value}T00:00:00`);
  if(Number.isNaN(date.getTime()))return null;
  return {year:date.getFullYear(),month:date.getMonth()+1,day:date.getDate()};
}

function buildPredictionVector(transform,input){
  const vector=Array(transform.feature_count||0).fill(0);
  const dateParts=transform.date_field?parsePredictionDate(input[transform.date_field]):null;
  (transform.numeric||[]).forEach(spec=>{
    let rawValue=spec.fill_value;
    if(spec.source==="date"&&dateParts&&spec.part in dateParts)rawValue=dateParts[spec.part];
    if(spec.source!=="date"){
      const parsed=Number(input[spec.input_name]);
      if(Number.isFinite(parsed))rawValue=parsed;
    }
    vector[spec.index]=(Number(rawValue)*Number(spec.scale))+Number(spec.min);
  });
  (transform.categorical||[]).forEach(spec=>{
    const selected=input[spec.input_name]||spec.fill_value;
    const match=(spec.options||[]).find(option=>option.value===selected);
    if(match)vector[match.index]=1;
  });
  return vector;
}

function predictTreeValue(tree,vector){
  let node=0;
  while(tree.children_left[node]!==tree.children_right[node]){
    node=vector[tree.feature[node]]<=tree.threshold[node]?tree.children_left[node]:tree.children_right[node];
  }
  return Number(tree.value[node]);
}

function predictWithModel(model,vector,payload){
  if(model.kind==="linear_regression"){
    const value=Number(model.intercept)+model.coefficients.reduce((sum,coef,index)=>sum+(Number(coef)*vector[index]),0);
    return {type:"regression",value,headline:fmt(value,3),subtitle:`Predicted ${payload.target_column}`};
  }
  if(model.kind==="decision_tree"){
    const value=predictTreeValue(model.tree,vector);
    return {type:"regression",value,headline:fmt(value,3),subtitle:`Predicted ${payload.target_column}`};
  }
  if(model.kind==="random_forest"){
    const predictions=(model.trees||[]).map(tree=>predictTreeValue(tree,vector));
    const value=predictions.reduce((sum,item)=>sum+item,0)/Math.max(1,predictions.length);
    return {type:"regression",value,headline:fmt(value,3),subtitle:`Predicted ${payload.target_column}`};
  }
  if(model.kind==="logistic_regression"){
    const coefficients=(model.coefficients&&model.coefficients[0])||[];
    const intercept=((model.intercept&&model.intercept[0])||0);
    const score=Number(intercept)+coefficients.reduce((sum,coef,index)=>sum+(Number(coef)*vector[index]),0);
    const probability=1/(1+Math.exp(-score));
    const positiveClass=String((model.classes||[])[(model.classes||[]).length-1]??1);
    const negativeClass=String((model.classes||[])[0]??0);
    const predicted=probability>=Number(model.threshold??0.5)?positiveClass:negativeClass;
    const label=(model.labels&&model.labels[predicted])||predicted;
    return {
      type:"classification",
      value:predicted,
      headline:label,
      subtitle:`Predicted class for ${payload.target_column}`,
      probability
    };
  }
  return {type:"unknown",headline:"n/a",subtitle:"Unsupported model type."};
}

function renderPredictionResult(result,model,payload){
  if(!result)return '<div class="pred-empty">Prediction output will appear here.</div>';
  const detailRows=result.type==="classification"
    ? `<div class="pred-detail-row"><span>Positive-class probability</span><strong>${pct(result.probability,1)}</strong></div><div class="pred-detail-row"><span>Threshold rule</span><strong>${esc(model.labels&&model.labels["1"]?model.labels["1"]:`>= ${payload.classification_threshold}`)}</strong></div>`
    : `<div class="pred-detail-row"><span>Numeric estimate</span><strong>${fmt(result.value,4)}</strong></div><div class="pred-detail-row"><span>Target column</span><strong>${esc(payload.target_column)}</strong></div>`;
  return `<div class="pred-target">${esc(model.name)}</div><div class="pred-value">${esc(result.headline)}</div><div class="pred-subtitle">${esc(result.subtitle)}</div><div class="pred-detail"><div class="pred-detail-row"><span>Model type</span><strong>${esc(model.task)}</strong></div>${detailRows}</div>`;
}

function initPredictionPage(stats){
  const payload=stats&&stats.predictions;
  if(!payload)return;
  const form=document.getElementById("prediction-form");
  const modelSelect=document.getElementById("pred-model");
  const result=document.getElementById("prediction-result");
  if(!form||!modelSelect||!result)return;
  const runPrediction=()=>{
    const input=Object.fromEntries(new FormData(form).entries());
    const model=payload.models[modelSelect.value];
    const vector=buildPredictionVector(payload.transform,input);
    const prediction=predictWithModel(model,vector,payload);
    result.innerHTML=renderPredictionResult(prediction,model,payload);
  };
  form.addEventListener("submit",event=>{
    event.preventDefault();
    runPrediction();
  });
  modelSelect.addEventListener("change",runPrediction);
  const resetButton=document.querySelector("[data-predict-action='reset']");
  if(resetButton){
    resetButton.addEventListener("click",()=>{
      form.reset();
      (payload.transform.raw_fields||[]).forEach(field=>{
        const element=form.elements.namedItem(field.name);
        if(element&&field.default!=null)element.value=String(field.default);
      });
      runPrediction();
    });
  }
  runPrediction();
}

function syncLogisticSections(vars){
  const c=document.getElementById("logistic-sections");
  if(!c)return;
  const ids=new Set(vars.map(v=>`sec-${secKey(v.c)}`));
  Array.from(c.querySelectorAll(".section")).forEach(s=>{if(!ids.has(s.id))s.remove();});
  vars.forEach(v=>{const id=`sec-${secKey(v.c)}`;if(document.getElementById(id))return;const s=document.createElement("section");s.id=id;s.className="section";c.appendChild(s);});
}

function setHeader(name){
  const t=document.getElementById("page-title");
  const s=document.getElementById("page-subtitle");
  if(!t||!s)return;
  if(META[name]){t.textContent=META[name][0];s.textContent=META[name][1];return;}
  if(name.startsWith("logistic_c_")){
    const label=document.querySelector("#logistic-nav .navbtn.subnav.active span:last-child");
    t.textContent=`Logistic Regression · ${label?label.textContent:"Variant"}`;
    s.textContent="";
  }
}

function setNavGroupOpen(group,open){
  const toggle=document.getElementById(`${group}-toggle`);
  const nav=document.getElementById(`${group}-nav`);
  if(toggle){
    toggle.classList.toggle("open",open);
    toggle.setAttribute("aria-expanded",String(open));
  }
  if(nav)nav.classList.toggle("open",open);
}

function syncNavigation(name){
  const statsPage=name==="dashboard";
  const predictionsPage=name==="predictions";
  const statsToggle=document.getElementById("stats-toggle");
  const modelsToggle=document.getElementById("models-toggle");
  if(statsToggle)statsToggle.classList.toggle("active",statsPage);
  if(modelsToggle)modelsToggle.classList.toggle("active",!statsPage&&!predictionsPage);
  setNavGroupOpen("stats",statsPage);
  setNavGroupOpen("models",!statsPage&&!predictionsPage);
  setLogisticOpen(name.startsWith("logistic_c_"));
}

function showSection(name,btn){
  document.querySelectorAll(".section").forEach(e=>e.classList.remove("active"));
  document.querySelectorAll(".navbtn").forEach(e=>e.classList.remove("active"));
  const s=document.getElementById("sec-"+name);
  if(s)s.classList.add("active");
  if(btn)btn.classList.add("active");
  syncNavigation(name);
  if(name.startsWith("logistic_c_"))document.getElementById("logistic-toggle").classList.add("active");
  setHeader(name);
}

function setLogisticOpen(open){
  const toggle=document.getElementById("logistic-toggle");
  const nav=document.getElementById("logistic-nav");
  if(toggle)toggle.classList.toggle("open",open);
  if(nav)nav.classList.toggle("open",open);
}

function toggleLogisticNav(btn){setLogisticOpen(!btn.classList.contains("open"));}

function openStatsSection(btn){
  const targetBtn=document.querySelector('#stats-nav [data-section="dashboard"]');
  if(targetBtn)showSection("dashboard",targetBtn);
}

function toggleModelsSection(btn){
  const open=!btn.classList.contains("open");
  setNavGroupOpen("models",open);
  if(open)setNavGroupOpen("stats",false);
}

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
    ${hero("Logistic Accuracy",pct(lg.test_accuracy),"classification benchmark",lg.test_accuracy*100,"warn")}
  </div>
  <div class="grid2">
    <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Models At A Glance</div><div class="title">Current lineup</div><p class="sub">Mock-inspired cards adapted to the metrics available in the generated bundle.</p></div>${pill("Live Feed","ok")}</div><div class="models">
      ${regs.map(i=>`<div class="model"><div class="model-top"><div><h4>${i.name}</h4><p>${i.key==="linear_regression"?"Baseline fit and generalization readout":i.key==="random_forest"?"Ensemble regression performance panel":"Tree-driven regression behavior panel"}</p></div>${pill(i.m.test.r2===byR2[0].m.test.r2?"Top R2":i.m.test.rmse===byRmse[0].m.test.rmse?"Lowest RMSE":"Tracked",i.m.test.rmse===byRmse[0].m.test.rmse?"ok":"")}</div><div class="mini-grid"><div class="mini-row"><span>Test RMSE</span><strong>${fmt(i.m.test.rmse)}</strong></div><div class="mini-row"><span>Test MAE</span><strong>${fmt(i.m.test.mae)}</strong></div><div class="mini-row"><span>Test R2</span><strong>${fmt(i.m.test.r2,4)}</strong></div></div></div>`).join("")}
      <div class="model"><div class="model-top"><div><h4>Logistic Regression</h4><p>Classifier diagnostics from the selected bundle output.</p></div>${pill("Classifier","ok")}</div><div class="mini-grid"><div class="mini-row"><span>Model</span><strong>Logistic Regression</strong></div><div class="mini-row"><span>Test Accuracy</span><strong>${pct(lg.test_accuracy)}</strong></div><div class="mini-row"><span>Test F1</span><strong>${fmt(lg.test.f1)}</strong></div></div></div>
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
  const health=quality(te.r2,{excellent:.8,good:.45,ok:.1});
  const tree=model.tree;
  const root=tree&&tree.root?tree.root:null;
  return `${intro(model.name,"Performance","Decision Tree redesigned against the mock example layout, while keeping the existing bundle metrics and structure export intact.",pill(health,te.r2>=.1?"ok":"warn"))}
  <div class="grid4 dt-top-grid">
    ${hero("Test RMSE",fmt(te.rmse),"lower is better",Math.min(100,100-te.rmse*4),"warn")}
    ${hero("Tree Depth",tree?tree.max_depth:"n/a",tree?`${tree.n_leaves} leaves`:"preview unavailable",tree?Math.min(100,tree.max_depth*12):8,"blue")}
    ${hero("Node Count",tree?tree.node_count:"n/a",tree?"full hierarchy":"structure unavailable",tree?Math.min(100,tree.node_count):8,"ok")}
    ${hero("Test R2",fmt(te.r2,4),"explained variance",Math.max(8,Math.min(100,(te.r2+1)*50)),"blue")}
  </div>
  <div class="dt-tree-row">
    <div class="dt-sidebar">
      <div class="card"><div class="body"><div class="dt-panel-title"><span class="material-symbols-outlined">tune</span><span>Hyperparameters</span></div><div class="dt-kv">
        <div class="dt-kv-card"><label>Root Feature</label><strong>${root?esc(featureLabel(root.label)):"Unavailable"}</strong></div>
        <div class="dt-kv-card"><label>Max Depth</label><strong>${tree?tree.max_depth:"n/a"}</strong><span>${tree?"full tree export":"structure unavailable"}</span></div>
        <div class="dt-kv-card"><label>Node Count</label><strong>${tree?tree.node_count:"n/a"}</strong><span>${tree?`${tree.n_leaves} leaves in full tree`:"structure unavailable"}</span></div>
        <div class="dt-kv-card"><label>Primary Split</label><strong>${root?fmt(root.threshold,3):"n/a"}</strong><span>${root?`${root.samples} training samples at root`:"no tree root available"}</span></div>
      </div></div></div>
    </div>
    <div class="dt-tree-main">
      <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Tree Architecture</div><div class="title">Full decision tree</div><p class="sub">The entire exported tree is rendered here. Use zoom controls or Ctrl + mouse wheel to inspect branches while keeping the full hierarchy available.</p></div>${pill(tree?`Depth ${tree.max_depth}`:"No Tree",tree?"ok":"warn")}</div>${renderFullTreeViewer(tree)}</div></div>
    </div>
  </div>
  <div class="dt-full-row"><div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Actual vs Predicted</div><div class="title">${model.name} scatter diagnostics</div><p class="sub">Observed versus predicted test values kept as the main visual validation panel.</p></div>${pill("Test Plot")}</div>${plot(model)}</div></div></div>
  <div class="grid2">
    <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Performance Matrix</div><div class="title">Train vs test status grid</div><p class="sub">Matrix-style summary retained from the current dashboard for exact diagnostics.</p></div></div>${regressionMatrix(tr,te)}</div></div>
    <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Metric Table</div><div class="title">Selected metrics</div><p class="sub">Underlying train and test metrics remain available in table form.</p></div></div><table><tbody><tr><th>Train MAE</th><td>${fmt(tr.mae)}</td></tr><tr><th>Test MAE</th><td>${fmt(te.mae)}</td></tr><tr><th>Train RMSE</th><td>${fmt(tr.rmse)}</td></tr><tr><th>Test RMSE</th><td>${fmt(te.rmse)}</td></tr><tr><th>Train R2</th><td>${fmt(tr.r2,4)}</td></tr><tr><th>Test R2</th><td>${fmt(te.r2,4)}</td></tr>${tree?`<tr><th>Depth</th><td>${tree.max_depth}</td></tr><tr><th>Leaves</th><td>${tree.n_leaves}</td></tr>`:""}</tbody></table></div></div>
  </div>`;
}

function renderLogistic(model,v=model.metrics.selected){
  const m=v.test.confusion_matrix;
  const tn=m[0][0],fp=m[0][1],fn=m[1][0],tp=m[1][1],total=tn+fp+fn+tp,correct=tn+tp;
  return `${intro("Logistic Regression","Classifier View","Classifier diagnostics in the visual language of the mock files, using the selected logistic regression output from the bundle.",pill(quality(v.test_accuracy,{excellent:.85,good:.72,ok:.6}),v.test_accuracy>=.6?"ok":"warn"))}
  <div class="grid4">
    ${hero("Test Accuracy",pct(v.test_accuracy),"overall correctness",v.test_accuracy*100,"ok")}
    ${hero("Precision",fmt(v.test.precision),"positive prediction quality",v.test.precision*100)}
    ${hero("Recall",fmt(v.test.recall),"positive detection",v.test.recall*100,"blue")}
    ${hero("F1 Score",fmt(v.test.f1),"balance precision and recall",v.test.f1*100,"warn")}
  </div>
  <div class="grid21">
    <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Confusion Matrix</div><div class="title">Prediction breakdown</div><p class="sub">Matrix layout preserved, but redesigned to fit the same dark observatory shell as the other model screens.</p></div>${pill("Classifier")}</div>${cm(m)}</div></div>
    <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Classification Signals</div><div class="title">Model summary</div><p class="sub">Compact readout for the logistic regression model.</p></div></div><div class="split" style="margin-top:0"><div class="split-card"><div class="eyebrow">Correct Predictions</div><strong>${correct}</strong><div class="sub">${pct(correct/total)} of the evaluation set.</div></div><div class="split-card"><div class="eyebrow">Prediction Errors</div><strong>${fp+fn}</strong><div class="sub">${pct(1-v.test_accuracy)} error rate on the test split.</div></div><div class="split-card"><div class="eyebrow">False Positives</div><strong>${fp}</strong><div class="sub">Predicted positive, actual negative.</div></div><div class="split-card"><div class="eyebrow">False Negatives</div><strong>${fn}</strong><div class="sub">Missed positive examples.</div></div></div></div></div>
  </div>
  <div class="grid2">
    <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Train vs Test</div><div class="title">Selected metrics</div><p class="sub">Exact numbers from the logistic regression payload.</p></div></div><table><thead><tr><th>Metric</th><th>Train</th><th>Test</th></tr></thead><tbody><tr><th>Accuracy</th><td>${pct(v.train_accuracy)}</td><td>${pct(v.test_accuracy)}</td></tr><tr><th>Precision</th><td>${fmt(v.train.precision)}</td><td>${fmt(v.test.precision)}</td></tr><tr><th>Recall</th><td>${fmt(v.train.recall)}</td><td>${fmt(v.test.recall)}</td></tr><tr><th>F1 Score</th><td>${fmt(v.train.f1)}</td><td>${fmt(v.test.f1)}</td></tr></tbody></table></div></div>
    <div class="card"><div class="body"><div class="head"><div><div class="eyebrow">Scoreboard</div><div class="title">Metric bands</div><p class="sub">A denser visual treatment in the style of the mock classifier screens.</p></div></div><div class="stack">${band("Accuracy",v.test_accuracy,1,{cls:tone(v.test_accuracy)})}${band("Precision",v.test.precision,1,{cls:tone(v.test.precision)})}${band("Recall",v.test.recall,1,{cls:tone(v.test.recall)})}${band("F1 Score",v.test.f1,1,{cls:tone(v.test.f1)})}</div></div></div>
  </div>`;
}

function destroyCharts(){while(chartInstances.length)chartInstances.pop().destroy();}

function initChart(model,plotData){
  const c=document.getElementById(`chart-${model.key}`);
  if(!c||typeof Chart==="undefined")return;
  const min=plotData.min,max=plotData.max;
  const chart=new Chart(c,{type:"scatter",data:{datasets:[{data:plotData.points.map(p=>({x:p.actual,y:p.predicted})),backgroundColor:"rgba(180,197,255,.78)",borderColor:"rgba(180,197,255,1)",pointRadius:5,pointHoverRadius:7},{type:"line",data:[{x:min,y:min},{x:max,y:max}],borderColor:"rgba(78,222,163,.92)",borderDash:[8,6],borderWidth:2,pointRadius:0}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:"rgba(8,17,33,.96)",titleColor:"#dae2fd",bodyColor:"#dae2fd",borderColor:"rgba(180,197,255,.18)",borderWidth:1,callbacks:{label:(context)=>`Observed: ${chartNumber(context.parsed.x)} | Predicted: ${chartNumber(context.parsed.y)}`}}},scales:{x:{min,max,title:{display:true,text:"Observed",color:"#9aa5c7"},ticks:{color:"#9aa5c7",callback:(value)=>chartNumber(value)},grid:{color:"rgba(180,197,255,.08)"}},y:{min,max,title:{display:true,text:"Predicted",color:"#9aa5c7"},ticks:{color:"#9aa5c7",callback:(value)=>chartNumber(value)},grid:{color:"rgba(180,197,255,.08)"}}}}});
  chartInstances.push(chart);
}

function initCanvasChart(id,config){
  const canvas=document.getElementById(id);
  if(!canvas||typeof Chart==="undefined")return;
  chartInstances.push(new Chart(canvas,config));
}

function dataChartOptions(yLabel="Count"){
  return {responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:"#9aa5c7"}},tooltip:{callbacks:{label:(context)=>`${context.dataset.label?`${context.dataset.label}: `:""}${chartNumber(context.parsed.y ?? context.raw)}`}}},scales:{x:{ticks:{color:"#9aa5c7",callback:(value)=>chartNumber(value)},grid:{color:"rgba(180,197,255,.08)"}},y:{title:{display:true,text:yLabel,color:"#9aa5c7"},ticks:{color:"#9aa5c7",callback:(value)=>chartNumber(value)},grid:{color:"rgba(180,197,255,.08)"}}}};
}

function initDataOverviewCharts(eda){
  initCanvasChart("eda-target-distribution",{type:"bar",data:{labels:eda.target_distribution.bins,datasets:[{label:"Frequency",data:eda.target_distribution.counts,backgroundColor:"rgba(96,165,250,.72)",borderColor:"rgba(96,165,250,1)",borderWidth:1,borderRadius:8}]},options:dataChartOptions("Records")});
}

function initDataDistributionCharts(eda){
  Object.entries(eda.histograms).forEach(([key,entry])=>{
    initCanvasChart(`hist-${key}`,{type:"bar",data:{labels:entry.bins,datasets:[{label:featureLabel(key),data:entry.counts,backgroundColor:"rgba(129,140,248,.72)",borderColor:"rgba(129,140,248,1)",borderWidth:1,borderRadius:8}]},options:dataChartOptions("Records")});
  });
}

function initDataCorrelationCharts(eda){
  initCanvasChart("eda-transparency-detail",{type:"bar",data:{labels:eda.transparency.map(item=>item.label),datasets:[{label:"Count",data:eda.transparency.map(item=>item.count),backgroundColor:["rgba(251,191,36,.78)","rgba(96,165,250,.78)"],borderRadius:10}]},options:dataChartOptions("Records")});
  initCanvasChart("eda-poisson-detail",{type:"line",data:{labels:eda.poisson.k,datasets:[{label:"Observed",data:eda.poisson.observed,borderColor:"rgba(244,114,182,1)",backgroundColor:"rgba(244,114,182,.14)",tension:.26,fill:false,pointRadius:3},{label:"Poisson",data:eda.poisson.expected,borderColor:"rgba(78,222,163,1)",backgroundColor:"rgba(78,222,163,.14)",tension:.26,fill:false,pointRadius:3}]},options:dataChartOptions("Probability")});
}

function initDataScatterChart(eda){
  const records=Array.isArray(window.EDA_SCATTER_DATA)?window.EDA_SCATTER_DATA:[];
  const canvas=document.getElementById("eda-scatter-chart");
  const xSelect=document.getElementById("eda-scatter-x");
  const ySelect=document.getElementById("eda-scatter-y");
  if(!canvas||!xSelect||!ySelect||typeof Chart==="undefined"||!records.length)return;
  const buildPoints=(xKey,yKey)=>records.map(row=>({x:Number(row[xKey]),y:Number(row[yKey])})).filter(point=>Number.isFinite(point.x)&&Number.isFinite(point.y));
  const chart=new Chart(canvas,{type:"scatter",data:{datasets:[{label:"EDA subset",data:[],backgroundColor:"rgba(96,165,250,.72)",borderColor:"rgba(96,165,250,1)",pointRadius:4,pointHoverRadius:6,pointBackgroundColor:"rgba(96,165,250,.72)",pointBorderColor:"rgba(180,197,255,.9)",pointBorderWidth:1}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:"rgba(8,17,33,.96)",titleColor:"#dae2fd",bodyColor:"#dae2fd",borderColor:"rgba(180,197,255,.18)",borderWidth:1,callbacks:{label:(context)=>`${featureLabel(xSelect.value)}: ${chartNumber(context.parsed.x)} | ${featureLabel(ySelect.value)}: ${chartNumber(context.parsed.y)}`}}},scales:{x:{title:{display:true,text:"",color:"#9aa5c7"},ticks:{color:"#9aa5c7",callback:(value)=>chartNumber(value)},grid:{color:"rgba(180,197,255,.08)"}},y:{title:{display:true,text:"",color:"#9aa5c7"},ticks:{color:"#9aa5c7",callback:(value)=>chartNumber(value)},grid:{color:"rgba(180,197,255,.08)"}}}}});
  chartInstances.push(chart);
  const updateScatter=()=>{
    let xKey=xSelect.value;
    let yKey=ySelect.value;
    if(xKey===yKey){
      const fallback=Array.from(ySelect.options).map(option=>option.value).find(value=>value!==xKey);
      if(fallback){
        yKey=fallback;
        ySelect.value=fallback;
      }
    }
    const points=buildPoints(xKey,yKey);
    chart.data.datasets[0].data=points;
    chart.options.scales.x.title.text=featureLabel(xKey);
    chart.options.scales.y.title.text=featureLabel(yKey);
    chart.update();
  };
  xSelect.addEventListener("change",updateScatter);
  ySelect.addEventListener("change",updateScatter);
  updateScatter();
}

function renderDashboard(stats){
  destroyCharts();
  setSummary(stats);
  renderLogisticNav(stats.models.logistic_regression.metrics.variants);
  syncLogisticSections(stats.models.logistic_regression.metrics.variants);
  document.getElementById("sec-dashboard").innerHTML=stripTileComments(renderDashboardPlaceholder());
  document.getElementById("sec-overview").innerHTML=stripTileComments(renderOverview(stats));
  document.getElementById("sec-linear_regression").innerHTML=stripTileComments(renderRegression(stats.models.linear_regression));
  document.getElementById("sec-random_forest").innerHTML=stripTileComments(renderRegression(stats.models.random_forest));
  document.getElementById("sec-decision_tree").innerHTML=stripTileComments(renderDecisionTree(stats.models.decision_tree));
  stats.models.logistic_regression.metrics.variants.forEach(v=>{const s=document.getElementById(`sec-${secKey(v.c)}`);if(s)s.innerHTML=stripTileComments(renderLogistic(stats.models.logistic_regression,v));});
  initTreeViewers();
  initChart(stats.models.linear_regression,stats.models.linear_regression.plots.test_actual_vs_predicted);
  initChart(stats.models.random_forest,stats.models.random_forest.plots.test_actual_vs_predicted);
  initChart(stats.models.decision_tree,stats.models.decision_tree.plots.test_actual_vs_predicted);
  showSection("dashboard",document.querySelector('#stats-nav [data-section="dashboard"]'));
}

function initFrontendMenu(page){
  document.querySelectorAll("[data-page-link]").forEach(link=>{
    link.classList.toggle("active",link.dataset.pageLink===page);
  });
  document.querySelectorAll("[data-group-toggle]").forEach(toggle=>{
    if(toggle.dataset.bound==="true")return;
    toggle.dataset.bound="true";
    toggle.addEventListener("click",()=>{
      const group=toggle.dataset.groupToggle;
      const next=!toggle.classList.contains("open");
      document.querySelectorAll("[data-group-toggle]").forEach(other=>{
        if(other.dataset.groupToggle!==group)setNavGroupOpen(other.dataset.groupToggle,false);
      });
      setNavGroupOpen(group,next);
    });
  });
  const activeGroup=DATA_PAGES.includes(page)?"stats":page==="predictions"?"":"models";
  document.querySelectorAll("[data-group-toggle]").forEach(toggle=>{
    toggle.classList.toggle("active",toggle.dataset.groupToggle===activeGroup);
  });
  setNavGroupOpen("stats",activeGroup==="stats");
  setNavGroupOpen("models",activeGroup==="models");
}

function renderCurrentPage(stats){
  const page=document.body.dataset.page;
  const eda=window.EDA_DATA;
  if(!page)return false;
  const root=document.getElementById("page-root");
  if(!root)return false;
  destroyCharts();
  initFrontendMenu(page);
  setHeader(page);
  if(DATA_PAGES.includes(page)&&!eda){
    root.innerHTML='<div class="empty">EDA bundle missing. Regenerate the dashboard assets to include exploratory data outputs.</div>';
    return true;
  }
  if(page==="data_scatter"&&(!Array.isArray(window.EDA_SCATTER_DATA)||!window.EDA_SCATTER_DATA.length)){
    root.innerHTML='<div class="empty">Scatter dataset missing. Regenerate the frontend assets to include row-level numeric points for the EDA scatterplot.</div>';
    return true;
  }
  if(!stats&&!DATA_PAGES.includes(page)){
    root.innerHTML='<div class="empty">Bundle missing. Run <strong>python generate_dashboard_bundle.py</strong> to generate the frontend data from the latest MLflow run.</div>';
    return true;
  }
  if(page==="dashboard")root.innerHTML=stripTileComments(renderDataOverview(eda));
  if(page==="data_distributions")root.innerHTML=stripTileComments(renderDataDistributions(eda));
  if(page==="data_correlations")root.innerHTML=stripTileComments(renderDataCorrelations(eda));
  if(page==="data_scatter")root.innerHTML=stripTileComments(renderDataScatter(eda));
  if(page==="overview")root.innerHTML=stripTileComments(renderOverview(stats));
  if(page==="linear_regression")root.innerHTML=stripTileComments(renderRegression(stats.models.linear_regression));
  if(page==="random_forest")root.innerHTML=stripTileComments(renderRegression(stats.models.random_forest));
  if(page==="decision_tree")root.innerHTML=stripTileComments(renderDecisionTree(stats.models.decision_tree));
  if(page==="logistic_regression")root.innerHTML=stripTileComments(renderLogistic(stats.models.logistic_regression));
  if(page==="predictions")root.innerHTML=stripTileComments(renderPredictionPage(stats));
  if(page==="dashboard")initDataOverviewCharts(eda);
  if(page==="data_distributions")initDataDistributionCharts(eda);
  if(page==="data_correlations")initDataCorrelationCharts(eda);
  if(page==="data_scatter")initDataScatterChart(eda);
  if(page==="predictions")initPredictionPage(stats);
  initTreeViewers();
  if(page==="linear_regression")initChart(stats.models.linear_regression,stats.models.linear_regression.plots.test_actual_vs_predicted);
  if(page==="random_forest")initChart(stats.models.random_forest,stats.models.random_forest.plots.test_actual_vs_predicted);
  if(page==="decision_tree")initChart(stats.models.decision_tree,stats.models.decision_tree.plots.test_actual_vs_predicted);
  return true;
}

if(!renderCurrentPage(window.MODEL_STATS)){
  if(window.MODEL_STATS){renderDashboard(window.MODEL_STATS);}else{document.querySelectorAll(".section").forEach(s=>s.innerHTML='<div class="empty">Bundle missing. Run <strong>python generate_dashboard_bundle.py</strong> to generate the frontend data from the latest MLflow run.</div>');}
}
