/* Parascand Consulting — interactions & animations */
(function(){
  // sticky header shrink
  var header=document.querySelector('.site-header');
  function onScroll(){ if(header){ header.classList.toggle('scrolled', window.scrollY>20); } }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  // mobile menu
  var btn=document.querySelector('.menu-btn'), nav=document.querySelector('.nav');
  if(btn&&nav){ btn.addEventListener('click',function(){ nav.classList.toggle('open'); });
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');});}); }

  // scroll reveal
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

  // animated counters
  function animateCount(el){
    var target=parseFloat(el.dataset.count), suf=el.dataset.suffix||'', dur=1400, start=performance.now();
    function tick(now){
      var p=Math.min((now-start)/dur,1), val=target*(1-Math.pow(1-p,3));
      el.textContent=(target%1===0?Math.round(val):val.toFixed(1))+suf;
      if(p<1) requestAnimationFrame(tick);
    } requestAnimationFrame(tick);
  }
  var cio=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ animateCount(e.target); cio.unobserve(e.target);} });
  },{threshold:.6});
  document.querySelectorAll('[data-count]').forEach(function(el){cio.observe(el);});

  // year
  var y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
})();
