(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const f of t.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&a(f)}).observe(document,{childList:!0,subtree:!0});function m(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=m(e);fetch(e.href,t)}})();const h=document.querySelector("#app");if(!h)throw new Error("#app element not found");h.innerHTML=`
  <main class="wrapper">
    <header>
      <p class="badge">Game 03</p>
      <h1>ターゲットハント</h1>
      <p class="lead">
        動き回るターゲットを制限時間30秒で何回倒せるか挑戦するミニゲームです。
        スタート後はターゲットが0.7秒ごとに移動するので集中力が試されます。
      </p>
    </header>

    <section class="card">
      <div class="stat-grid">
        <div>
          <p class="label">残り時間</p>
          <p id="time-display" class="value">30s</p>
        </div>
        <div>
          <p class="label">命中数</p>
          <p id="score-display" class="value">0</p>
        </div>
        <div>
          <p class="label">コンボ</p>
          <p id="combo-display" class="value">0</p>
        </div>
      </div>

      <div class="field" id="target-field">
        <button id="target" class="target" disabled>●</button>
      </div>

      <div class="control-row">
        <button id="start-btn" class="primary">スタート</button>
        <span class="hint">マウスを離すとコンボがリセットされます</span>
      </div>
    </section>
  </main>
`;const v=document.querySelector("#start-btn"),s=document.querySelector("#target"),y=document.querySelector("#target-field"),d=document.querySelector("#score-display"),l=document.querySelector("#combo-display"),n=document.querySelector("#time-display");let o=null,i=null,b=0,u=0,c=30;const x=()=>{o&&(clearInterval(o),o=null),i&&(clearInterval(i),i=null),s?.setAttribute("disabled","true"),v?.removeAttribute("disabled")},g=()=>{if(!y||!s)return;const p=y.getBoundingClientRect(),r=s.getBoundingClientRect(),m=p.width-r.width,a=p.height-r.height,e=Math.random()*m,t=Math.random()*a;s.style.transform=`translate(${e}px, ${t}px)`};v?.addEventListener("click",()=>{b=0,u=0,c=30,d&&(d.textContent="0"),l&&(l.textContent="0"),n&&(n.textContent="30s"),s?.removeAttribute("disabled"),v.setAttribute("disabled","true"),g(),o&&clearInterval(o),i&&clearInterval(i),o=window.setInterval(g,700),i=window.setInterval(()=>{c-=1,n&&(n.textContent=`${c}s`),c<=0&&(x(),n&&(n.textContent="0s"))},1e3)});s?.addEventListener("click",()=>{!s||s.disabled||(b+=1,u+=1,d&&(d.textContent=`${b}`),l&&(l.textContent=`${u}`),s.classList.add("hit"),setTimeout(()=>s.classList.remove("hit"),160),g())});y?.addEventListener("mouseleave",()=>{u=0,l&&(l.textContent="0")});
