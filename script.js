// ================= CUSTOMIZE HERE =================
const SECRET_PASSWORD = "FOREVER3";
// Change this to your actual college final day:
const GRADUATION_DATE = "2027-04-30T17:00:00";
// ====================================================

const gate=document.getElementById("gate");
const intro=document.getElementById("intro");
const site=document.getElementById("site");
const pass=document.getElementById("passwordInput");
const error=document.getElementById("passwordError");

function unlock(){
 if(pass.value.toUpperCase()===SECRET_PASSWORD){
   gate.classList.add("hidden");
   intro.classList.remove("hidden");
   setTimeout(showSite,11500);
 }else{
   error.textContent="Oops... that's not our secret password ♡";
   pass.value="";
 }
}
document.getElementById("unlockBtn").addEventListener("click",unlock);
pass.addEventListener("keydown",e=>{if(e.key==="Enter")unlock()});
function showSite(){
 intro.classList.add("hidden");
 site.classList.remove("hidden");
 window.scrollTo(0,0);
}
document.getElementById("skipIntro").addEventListener("click",showSite);

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const glow=document.querySelector(".cursor-glow");
window.addEventListener("mousemove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});

// Lightbox
const box=document.getElementById("lightbox"), boxImg=document.getElementById("lightboxImg"), boxCap=document.getElementById("lightboxCaption");
document.querySelectorAll(".photo-card").forEach(card=>card.addEventListener("click",()=>{
 boxImg.src=card.dataset.img; boxCap.textContent=card.dataset.caption; box.classList.add("show");
}));
function closeBox(){box.classList.remove("show")}
document.getElementById("closeLightbox").onclick=closeBox;
box.onclick=e=>{if(e.target===box)closeBox()};

// Memory machine
const memories=[
"That one day when we said 'just one photo' and took fifty.",
"The corridor walks that somehow became therapy sessions.",
"Shared snacks > any five-star restaurant.",
"The random laughs that made absolutely no sense to anyone else.",
"One look across the room and we already knew what the other person meant.",
"The annual-day outfits, confidence, panic and photos.",
"The final-year realization: wait... when did time move this fast?",
"Every silly selfie is now secretly a treasure.",
"The days we thought were normal are the days we'll miss the most.",
"Three people. Infinite inside jokes."
];
function pickMemory(){
 const r=document.getElementById("machineResult");r.style.opacity=0;
 setTimeout(()=>{r.textContent="✦ "+memories[Math.floor(Math.random()*memories.length)];r.style.opacity=1},180);
}
document.getElementById("memoryMachine").onclick=pickMemory;
document.getElementById("randomMemory").onclick=()=>{pickMemory();document.querySelector(".memory-machine").scrollIntoView({behavior:"smooth"})};

// Secret letters - edit these to make them more personal
const letters=[
 {eyebrow:"LETTER 01 · FOR MY PERSON",title:"To the one who feels like home,",text:[
 "I don't think you realize how much comfort your presence has given me. Some friendships need constant effort. Ours somehow felt easy — like finding a familiar place in a completely unfamiliar chapter.",
 "Thank you for listening to the things I couldn't explain properly, for staying through my moods, and for being part of so many days that would have been ordinary without you.",
 "If life gets busy, please don't let us become strangers with a beautiful past. I still want us to laugh about the same stupid things years from now."
 ]},
 {eyebrow:"LETTER 02 · FOR MY FAVORITE CHAOS",title:"To the one who made life funnier,",text:[
 "Thank you for making boring days impossible to remember as boring. Somehow every serious moment had the possibility of becoming a joke when you were around.",
 "I will miss the random expressions, the unnecessary drama, the photos, the teasing and every tiny thing that only makes sense because it happened with you.",
 "Promise me we will never become too grown-up to be this ridiculous together."
 ]},
 {eyebrow:"LETTER 03 · FOR US",title:"To the three of us,",text:[
 "One day we will look at these photos and notice how young we were. Maybe we will laugh at our outfits. Maybe we will forget the exact date of some of these pictures.",
 "But I hope we never forget how it felt. How safe it felt to have people beside you who slowly became part of your everyday life.",
 "This chapter is ending, but I refuse to call our story finished. The next chapters might look different. Different cities. Different jobs. Different routines. But hopefully, the same us."
 ]}
];
const modal=document.getElementById("letterModal");
document.querySelectorAll(".secret-letter").forEach(btn=>btn.onclick=()=>{
 const l=letters[btn.dataset.letter];
 document.getElementById("modalEyebrow").textContent=l.eyebrow;
 document.getElementById("modalTitle").textContent=l.title;
 document.getElementById("modalText").innerHTML=l.text.map(x=>`<p>${x}</p>`).join("");
 modal.classList.add("show");
});
function closeLetter(){modal.classList.remove("show")}
document.getElementById("closeLetter").onclick=closeLetter;
modal.onclick=e=>{if(e.target===modal)closeLetter()};

// Countdown
function updateCountdown(){
 const diff=new Date(GRADUATION_DATE)-new Date();
 const safe=Math.max(diff,0);
 document.getElementById("days").textContent=Math.floor(safe/86400000);
 document.getElementById("hours").textContent=Math.floor(safe/3600000)%24;
 document.getElementById("minutes").textContent=Math.floor(safe/60000)%60;
 document.getElementById("seconds").textContent=Math.floor(safe/1000)%60;
}
updateCountdown();setInterval(updateCountdown,1000);

// Future bucket list persistence
document.querySelectorAll(".bucket-list input").forEach((cb,i)=>{
 cb.checked=localStorage.getItem("threeSoulsFuture"+i)==="true";
 cb.addEventListener("change",()=>localStorage.setItem("threeSoulsFuture"+i,cb.checked));
});

// Finale confetti
document.getElementById("confettiBtn").onclick=()=>{
 const symbols=["♡","✦","★","∞","☀"];
 for(let i=0;i<100;i++){
  const p=document.createElement("span");
  p.textContent=symbols[Math.floor(Math.random()*symbols.length)];
  p.style.cssText=`position:fixed;left:${Math.random()*100}vw;top:-30px;z-index:999;color:hsl(${Math.random()*360},70%,70%);font-size:${12+Math.random()*22}px;pointer-events:none;animation:fall ${2+Math.random()*3}s linear forwards`;
  document.body.appendChild(p);setTimeout(()=>p.remove(),5500);
 }
};
const st=document.createElement("style");st.textContent="@keyframes fall{to{transform:translateY(110vh) rotate(720deg);opacity:0}}";document.head.appendChild(st);

// Gentle generated ambience using Web Audio (no external music file needed)
let audioCtx=null, ambienceOn=false, nodes=[];
document.getElementById("soundBtn").onclick=()=>{
 const btn=document.getElementById("soundBtn");
 if(!ambienceOn){
  audioCtx=new (window.AudioContext||window.webkitAudioContext)();
  const master=audioCtx.createGain();master.gain.value=.018;master.connect(audioCtx.destination);
  [196,246.94,293.66].forEach((freq,i)=>{
   const osc=audioCtx.createOscillator(),gain=audioCtx.createGain();
   osc.type=i===0?"sine":"triangle";osc.frequency.value=freq;gain.gain.value=.35;
   osc.connect(gain);gain.connect(master);osc.start();nodes.push(osc);
  });
  ambienceOn=true;btn.textContent="♪ ambience on";
 }else{
  nodes.forEach(n=>n.stop());nodes=[];audioCtx.close();audioCtx=null;ambienceOn=false;btn.textContent="♪ ambience";
 }
};
