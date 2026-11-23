const IMG={};for(let i=1;i<=39;i++)IMG[i]="img/"+i+".jpg";
const P=[
[1,"Одежда","Худи белое","Тёплое худи с логотипом LD",3900],
[34,"Одежда","Худи «35 лет»","Принт «Смелость быть первым», 1992",4900],
[35,"Одежда","Худи «35 лет», вариант 2","Крупный принт на чёрном",4900],
[38,"Одежда","Флисовая толстовка","На молнии, с капюшоном",4200],
[10,"Одежда","Спортивная футболка","«Время заводов», белая",1500],
[33,"Одежда","Базовая футболка","Белая и чёрная, логотип на груди",1400],
[13,"Одежда","Футболка-поло","Чёрная и жёлтая",2100],
[22,"Одежда","Жилет","Две модели, чёрный",3800],
[36,"Одежда","Кепка «35 лет»","Жёлтая, шесть панелей",1600],
[8,"Одежда","Кепка «LD Russia»","Чёрно-жёлтая",1500],
[11,"Одежда","Фирменные кепки","Белая, жёлтая, чёрная",1400],
[12,"Одежда","Шапка","Чёрная или жёлтая",1100],
[5,"Канцелярия","Блокнот","Чёрный, с жёлтым логотипом",450],
[6,"Канцелярия","Ручка","Чёрная, фирменная",150],
[7,"Канцелярия","Карандаш","Жёлто-чёрный",60],
[23,"Канцелярия","Ежедневник","Синтетическая кожа",1300],
[15,"Канцелярия","Картхолдер","Чёрная кожа",900],
[29,"Канцелярия","Магнитный кошелёк","Чёрная текстурная кожа, «35»",1800],
[3,"Сувениры","Бутылка для воды","Стекло и жёлтый чехол",1100],
[28,"Сувениры","Термокружка","Чёрная, герметичная крышка",1500],
[19,"Сувениры","Кружки","Матовые, жёлтая внутри",800],
[32,"Сувениры","Кружка с пробковым дном","Керамика, «Смелость быть первым»",1100],
[37,"Сувениры","Кружка «35 лет»","Белая керамика с принтом",700],
[4,"Сувениры","Шоппер","Жёлтый с чёрным карманом",900],
[9,"Сувениры","Рюкзак","Чёрный, вместительный",3900],
[26,"Сувениры","Портплед","Для поездок, плотная ткань",2900],
[27,"Сувениры","Дорожная сумка","Объёмная, усиленные ручки",3500],
[14,"Сувениры","Повербанк","Чёрный, логотип LD",1900],
[25,"Сувениры","Магнитное зарядное устройство","Металл, 35 лет компании",2300],
[17,"Сувениры","Флешка","Жёлто-белая",500],
[16,"Сувениры","Зонт складной","Чёрно-жёлтый",1400],
[24,"Сувениры","Зонт","Чёрный",1300],
[18,"Сувениры","Номерные рамки","Чёрно-жёлтые",600],
[20,"Сувениры","Подушка","Жёлтая, с логотипом",1100],
[21,"Сувениры","Открытки","С заводским вайбом",250],
[2,"Сувениры","Брелок-шаровая пробка","Серебристый металл",350],
[31,"Сувениры","Брелок «Инструменты»","Пять подвесок-инструментов",450],
[39,"Сувениры","Значок на магните","Серебро и золото к юбилею",0]
];
const $=s=>document.querySelector(s),fmt=n=>n.toLocaleString("ru-RU")+" ₽";
let cat="Все",cart={};
try{cart=JSON.parse(localStorage.getItem("ldcart")||"{}")}catch(e){}
$("#collage").innerHTML=[34,36,37].map(i=>`<img src="${IMG[i]}" alt="">`).join("");
const cats=["Все",...new Set(P.map(p=>p[1]))];
$("#chips").innerHTML=cats.map(c=>`<button class="chip${c=="Все"?" on":""}" data-c="${c}">${c}</button>`).join("")+'<input id="q" placeholder="Поиск по каталогу">';
function draw(){
 const q=$("#q").value.trim().toLowerCase();
 const l=P.filter(p=>(cat=="Все"||p[1]==cat)&&(p[2]+p[3]).toLowerCase().includes(q));
 $("#grid").innerHTML=l.length?l.map(p=>`<article class="card"><div class="ph"><img loading="lazy" src="${IMG[p[0]]}" alt="${p[2]}"></div><div class="cb"><small>${p[1]}</small><h3>${p[2]}</h3><p>${p[3]}</p><div class="pr"><b>${p[4]?fmt(p[4]):"Скоро"}</b><button class="btn" data-a="${p[0]}" ${p[4]?"":"disabled"}>В корзину</button></div></div></article>`).join(""):'<p class="empty">Ничего не найдено.</p>';
}
function save(){try{localStorage.setItem("ldcart",JSON.stringify(cart))}catch(e){}}
function rcart(){
 const ids=Object.keys(cart).filter(k=>cart[k]>0);let s=0,c=0;
 $("#items").innerHTML=ids.length?ids.map(k=>{const p=P.find(x=>x[0]==k);s+=p[4]*cart[k];c+=cart[k];
  return `<div class="it"><img src="${IMG[k]}" alt=""><div>${p[2]}<div class="qt"><button data-m="${k}">−</button>${cart[k]}<button data-p="${k}">+</button></div></div><b>${fmt(p[4]*cart[k])}</b></div>`}).join(""):'<p class="empty">Корзина пуста. Добавьте что-нибудь из каталога.</p>';
 $("#sum").textContent=fmt(s);$("#cnt").textContent=c;$("#of").style.display=ids.length?"grid":"none";save();
}
function open_(o){$("#dr").classList.toggle("on",o);$("#ov").classList.toggle("on",o);if(o)$("#ook").style.display="none"}
document.addEventListener("click",e=>{
 const t=e.target;
 if(t.dataset.c){cat=t.dataset.c;document.querySelectorAll(".chip").forEach(b=>b.classList.toggle("on",b==t));draw()}
 if(t.dataset.a){cart[t.dataset.a]=(cart[t.dataset.a]||0)+1;rcart();open_(true)}
 if(t.dataset.p){cart[t.dataset.p]++;rcart()}
 if(t.dataset.m){cart[t.dataset.m]--;rcart()}
});
$("#q").oninput=draw;$("#cartBtn").onclick=()=>open_(true);$("#cx").onclick=$("#ov").onclick=()=>open_(false);
$("#of").onsubmit=e=>{e.preventDefault();cart={};rcart();e.target.reset();$("#ook").style.display="block"};
$("#cf").onsubmit=e=>{e.preventDefault();e.target.reset();$("#cok").style.display="block"};
$("#nf").onsubmit=e=>{e.preventDefault();e.target.reset();$("#nok").style.display="block"};
draw();rcart();
