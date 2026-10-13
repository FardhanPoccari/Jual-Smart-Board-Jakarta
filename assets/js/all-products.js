/* Setiap kata pencarian dan semua filter harus cocok; kartu tetap ada dalam HTML. */
document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector(".catalog-section");
  if (!root) return;
  const groups = [...root.querySelectorAll(".catalog-brand")];
  const cards = [...root.querySelectorAll(".brand-model-card")];
  const normalizeSearch = value => value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('id-ID')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
  // Indeks dibentuk sekali. Kode model juga tersedia tanpa tanda baca/spasi.
  const searchIndex = new Map(cards.map(card => {
    const terms = normalizeSearch(card.dataset.productSearch || card.textContent);
    const model = normalizeSearch(card.querySelector('h3')?.textContent || '');
    return [card, `${terms} ${model.replace(/\s+/g, '')}`];
  }));
  const results = root.querySelector("#catalog-visible-count");
  const empty = root.querySelector("#catalog-empty");
  const search = root.querySelector("#catalog-search");
  const clear = root.querySelector("#catalog-search-clear");
  const size = root.querySelector("#catalog-size");
  const reset = root.querySelector("#catalog-reset");
  const filters = {brand:root.querySelector('[data-filter="brand"]'),series:root.querySelector('[data-filter="series"]')};
  if (!search || !size || !filters.brand || !filters.series) return;
  const catalogSeries = {
    hikvision:[["hikvision-ultra","Ultra Series"],["hikvision-performance","Performance Series"],["accessories","Accessories"]],
    samsung:[["samsung-wmb","Flip WMB"],["samsung-wad","Flip WAD"],["accessories","Accessories"]],
    zelt:[["zelt-pro","ZELT Pro"],["zelt-lite","ZELT Lite"],["accessories","Accessories"]]
  };
  const params = new URLSearchParams(location.search);
  const state = {brand:Object.hasOwn(catalogSeries,params.get('merek')) ? params.get('merek') : 'all',series:params.get('seri')||'all',size:params.get('ukuran')||'all',q:params.get('q')||''};
  const sizes = [...new Set(cards.map(c=>c.dataset.productSize).filter(Boolean))].sort((a,b)=>+a-+b);
  sizes.forEach(s=>{const option=document.createElement('option');option.value=s;option.textContent=s+' Inch';size.append(option)});
  if (!sizes.includes(state.size))state.size='all';size.value=state.size;search.value=state.q;
  function seriesOptions(brand){const arr=brand==='all'?Object.keys(catalogSeries):[brand];const options=new Map();arr.forEach(b=>catalogSeries[b].forEach(([v,label])=>options.set(v,label)));return [['all','Semua seri'],...options.entries()]}
  function setOptions(filter,values){const menu=filter.querySelector('.brand-series-menu');menu.replaceChildren();values.forEach(([v,label])=>{const b=document.createElement('button');b.type='button';b.className='brand-series-option';b.dataset.value=v;b.textContent=label;b.setAttribute('role','menuitemradio');menu.append(b)})}
  function sync(){Object.entries(filters).forEach(([kind,el])=>{const match=[...el.querySelectorAll('.brand-series-option')].find(o=>o.dataset.value===state[kind]);el.dataset.value=match?state[kind]:'all';el.querySelector('.brand-series-current').textContent=match?.textContent||(kind==='brand'?'Semua merek':'Semua seri');el.querySelectorAll('.brand-series-option').forEach(o=>o.setAttribute('aria-checked',String(o===match)))})}
  function apply(save=false){
    const tokens=normalizeSearch(state.q).split(/\s+/).filter(Boolean);let n=0;
    groups.forEach(group=>{
      let inBrand=0;
      group.querySelectorAll('.catalog-series-group').forEach(section=>{
        let inSeries=0;
        section.querySelectorAll('.brand-model-card').forEach(card=>{
          const terms=searchIndex.get(card);
          const visible=(state.brand==='all'||group.dataset.brand===state.brand)&&(state.series==='all'||section.dataset.series===state.series)&&(state.size==='all'||card.dataset.productSize===state.size)&&tokens.every(token=>terms.includes(token));
          card.hidden=!visible;if(visible)inSeries++;
        });
        section.hidden=inSeries===0;inBrand+=inSeries;
      });
      group.hidden=inBrand===0;n+=inBrand;
    });
    results.textContent=String(n);empty.hidden=n!==0;clear.hidden=!search.value;sync();
    if(save&&history.replaceState){const u=new URL(location.href);[['merek','brand'],['seri','series'],['ukuran','size'],['q','q']].forEach(([k,v])=>{if(!state[v]||state[v]==='all')u.searchParams.delete(k);else u.searchParams.set(k,state[v])});history.replaceState(history.state,'',u.pathname+u.search+u.hash)}
  }
  function select(kind,value){state[kind]=value;if(kind==='brand'){const allowed=seriesOptions(value);if(!allowed.some(([v])=>v===state.series))state.series='all';setOptions(filters.series,allowed)}apply(true)}
  function close(el,focus=false){const menu=el.querySelector('.brand-series-menu');menu.hidden=true;el.classList.remove('is-open');const trigger=el.querySelector('.brand-series-trigger');trigger.setAttribute('aria-expanded','false');if(focus)trigger.focus()}
  function open(el){Object.values(filters).forEach(e=>close(e));const menu=el.querySelector('.brand-series-menu');menu.hidden=false;el.classList.add('is-open');el.querySelector('.brand-series-trigger').setAttribute('aria-expanded','true')}
  Object.entries(filters).forEach(([kind,el])=>{
    const trigger=el.querySelector('.brand-series-trigger'),menu=el.querySelector('.brand-series-menu');
    trigger.addEventListener('click',()=>menu.hidden?open(el):close(el));
    trigger.addEventListener('keydown',e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();open(el);(menu.querySelector('[aria-checked="true"]')||menu.querySelector('button'))?.focus()}else if(e.key==='Escape')close(el)});
    menu.addEventListener('click',e=>{const b=e.target.closest('.brand-series-option');if(b){select(kind,b.dataset.value);close(el,true)}});
    menu.addEventListener('keydown',e=>{const opts=[...menu.querySelectorAll('.brand-series-option')],idx=opts.indexOf(document.activeElement);let target;if(e.key==='ArrowDown')target=opts[(idx+1)%opts.length];else if(e.key==='ArrowUp')target=opts[(idx-1+opts.length)%opts.length];else if(e.key==='Home')target=opts[0];else if(e.key==='End')target=opts[opts.length-1];else if(e.key==='Escape'){e.preventDefault();close(el,true);return}else if(e.key==='Tab'){close(el);return}else return;e.preventDefault();target?.focus()});
    document.addEventListener('click',e=>{if(!el.contains(e.target))close(el)});
  });
  if(!seriesOptions(state.brand).some(([s])=>s===state.series))state.series='all';setOptions(filters.series,seriesOptions(state.brand));
  search.addEventListener('input',()=>{state.q=search.value;apply(true)});
  search.addEventListener('search',()=>{state.q=search.value;apply(true)});
  search.addEventListener('keydown',e=>{if(e.key==='Escape'){search.value='';state.q='';apply(true)}});
  clear.addEventListener('click',()=>{search.value='';state.q='';apply(true);search.focus()});
  size.addEventListener('change',()=>{state.size=size.value;apply(true)});
  reset.addEventListener('click',()=>{state.brand='all';state.series='all';state.size='all';state.q='';search.value='';size.value='all';setOptions(filters.series,seriesOptions('all'));apply(true);search.focus()});
  apply();
});
