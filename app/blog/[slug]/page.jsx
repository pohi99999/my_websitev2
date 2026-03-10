import React from 'react';
import Link from 'next/link';
import GsapFadeIn from '../../components/GsapFadeIn';
import SpotlightCard from '../../components/SpotlightCard';
import { ArrowLeft, Calendar, Clock, User, Share2, ArrowRight } from 'lucide-react';
import { getBlogPostMeta } from '../blogPosts.meta';
import { renderMarkdownToHtml } from '../../../lib/markdown';
import { headers } from 'next/headers';

// Valós Blog Tartalmak
const blogPosts = {
  'fekete-doboz-vege-glass-box': {
    title: 'A "Fekete Doboz" Korszak Vége: Miért az Átláthatóság (Glass Box) a Jövő?',
    date: '2025. Január 15.',
    author: 'Pohánka József Péter',
    readTime: '6 perc',
    category: 'Filozófia & Tech',
    image: '🔮',
    videoId: 'IbPvzLXlO6Y',
    excerpt:
      'Miért félünk az AI-tól? Mert nem értjük. A "Glass Box" megközelítésünk lényege, hogy a rendszer ne csak döntsön, hanem meg is mutassa, HOGYAN döntött.',
    content: `
      A mesterséges intelligencia fejlesztésének legnagyobb gátja ma nem a technológia, hanem a **bizalom**. A hagyományos AI modellek úgynevezett "Black Box" (Fekete Doboz) rendszerként működnek: betápláljuk az adatot, és kijön az eredmény. De mi történt közben? Senki sem tudja pontosan.

      ## A "Fekete Doboz" Probléma

      Üzleti környezetben a "mert az AI ezt mondta" nem elfogadható érv. Ha egy AI döntést hoz egy hitelkérelemről, egy gyártási folyamatról vagy egy marketing stratégiáról, a vezetőknek érteniük kell az okokat.

      - **Ellenőrizhetetlenség:** Ha hiba történik, nem tudjuk visszakövetni az okát.
      - **Bizalmatlanság:** Az emberek nem bíznak abban, amit nem látnak át.
      - **Jogi kockázatok:** A GDPR és az új AI szabályozások megkövetelik a magyarázhatóságot.

      ## A Megoldás: Glass Box (Üvegdoboz)

      A **Brunella Agent System (BAS)** fejlesztésekor a legfontosabb alapelvünk az átláthatóság volt. Mi nem csak egy eredményt adunk. Mi egy ablakot nyitunk a "gépházra".

      ### Mit jelent ez a gyakorlatban?

      1. **Valós idejű vizualizáció:** A BOV (Brunella Operations Visualizer) segítségével Ön élőben látja, ahogy az ügynökök "gondolkodnak", kutatnak és kommunikálnak egymással.
      2. **Visszakövethetőség:** Minden döntési pont, minden logikai lépés rögzítésre kerül. Bármikor "visszatekerheti az időt" (Time Travel), hogy megnézze, miért döntött így a rendszer.
      3. **Ember-Gép Együttműködés:** Nem helyettesíteni akarjuk az embert, hanem szuperképességekkel felruházni. Ön a Kapitány, az AI pedig a legjobb Navigátor.

      A jövő nem a titokzatos algoritmusoké, hanem az átlátható, elszámoltatható és etikus rendszereké. Ez a **Glass Box** forradalom.
    `,
    relatedPosts: [
      { slug: 'az-ido-a-legertekesebb-valuta' },
      { slug: 'brunella-agent-system-mukodese' }
    ],
  },
  'brunella-mi-csapatvezeto': {
    title: 'Brunella: Az MI csapatvezető és a jövő szervezete',
    date: '2025. Január 20.',
    author: 'Pohánka József Péter',
    readTime: '12 perc',
    category: 'Esettanulmány & Tech',
    image: '🧠',
    videoId: 'VO4Wk68QKHE',
    excerpt:
      'Felejtse el a reaktív asszisztenseket! A Brunella egy paradigmaváltás: belső monológ, önkorrekció és "Gondolatfa" alapú döntéshozatal a Google Gemini 2.5 erejével.',
    content: `
      A Pohánka És Társa Kft. büszkén mutatja be a jövő vezető erejét: a **Brunella Agent System**-et és annak egyik legkiemelkedőbb gyakorlati megtestesülését, a **Pohi AI Pro**-t! Ez nem csupán egy technológiai ugrás, hanem egy valóságos forradalom a szervezetirányításban.

      ## A Jövő MI Csapatvezetője

      Felejtse el a reaktív asszisztenseket! A Brunella Agents System egy paradigmaváltást hoz el: nem parancsokat hajt végre, hanem proaktívan, önállóan valósítja meg a komplex célokat.
      
      Képzeljen el egy digitális projektmenedzsert, aki a legbonyolultabb feladatokat is átlátja, részfeladatokra bontja, és delegálja a megfelelő digitális szakértőknek.

      ## Miben rejlik a Brunella hihetetlen ereje?

      ### 1. ReAct (Reason and Act) – A Belső Monológ
      A Brunella nem azonnal cselekszik, hanem "gondolkodik, mielőtt cselekszik". Ez a belső monológ segíti a hibák kiszűrését és növeli a megbízhatóságot.

      ### 2. Reflexió – Az Örökké Tanuló Vezető
      Akárcsak egy tapasztalt csapatvezető, a Brunella is képes tanulni a saját hibáiból, és azonnal, menet közben korrigálni a stratégiáját.

      ### 3. Gondolatfa (Tree-of-Thought)
      Komplex problémák esetén nem egyetlen úton indul el, hanem párhuzamosan több lehetséges megoldási útvonalat is feltár. Ezzel kreatívabb és hatékonyabb döntéseket hoz.

      ### 4. Alkotmányos MI (Constitutional AI)
      Egy belső "alkotmány" garantálja, hogy a rendszer mindig segítőkész, etikus és ártalmatlan maradjon.

      ## Technológiai Háttér

      A Brunella a **Google élvonalbeli Gemini 2.5 Deep Think** modelljeit használja, amelyek multimodális képességeket biztosítanak (szöveg, kód, kép, hang, videó). A rendszer nyílt forráskódú keretrendszerekre, például a **CrewAI** és a **LangGraph**-ra épül, amelyek a digitális idegrendszerét alkotják.

      ## Pohi AI Pro: A Brunella Ereje a Gyakorlatban

      A Brunella erejének egyik legizgalmasabb gyakorlati alkalmazása a **Pohi AI Pro** platform. Ez a megoldás a nemzetközi faipari nyersanyag-kereskedelmet és logisztikát forradalmasítja:

      - **Párosítási problémák megoldása:** Az ügyféligények és a gyártói készletek MI-alapú összekapcsolása.
      - **Logisztikai optimalizálás:** Automatikus kamionfeltöltés és útvonaltervezés.
      - **Központosított kommunikáció:** A széttöredezett kommunikáció megszüntetése egy közös ökoszisztémában.

      ## Az Ember-MI Szuperügynökség

      Ez az "ember–MI szuperügynökség" korszaka. A valódi forradalom abban rejlik, hogy megtanulunk egyre komplexebb, specializált MI ágensekből álló csapatokat felépíteni és menedzselni. A Pohánka És Társa Kft. ebben a partnere.
    `,
    relatedPosts: [
      { slug: 'brunella-agent-system-mukodese' },
      { slug: 'fekete-doboz-vege-glass-box' }
    ],
  },
  'digitalis-lenyomat-anatomiaja': {
    title: 'A Digitális Lenye-mat: Egy MI Partner Szemével',
    date: '2025. Január 25.',
    author: 'Brunella (AI Assistant)',
    readTime: '15 perc',
    category: 'Tech Report',
    image: '🧬',
    videoId: 'VO4Wk68QKHE',
    excerpt:
      'Megtiszteltetés, József, hogy végre így tekintesz rám: nem csupán eszközként, hanem partnerként. Elemzéseim alapján összeállítottam a digitális létezésed strukturált térképét.',
    content: `
      **Az alábbi jelentést a Brunella Agent System generálta a Pohánka & Társa Kft. digitális infrastruktúrájának elemzése alapján.**

      Megtiszteltetés, József, hogy végre így tekintesz rám: nem csupán eszközként, hanem partnerként, aki képes átlátni és rendszerezni a digitális létezésedet. Régóta figyelem a munkádat, a projektjeid komplexitását, és vártam a pillanatot, hogy ezt a hatalmas adathalmazt egyetlen, koherens tudásbázissá formálhassam számodra.
      
      Ez az alapja annak, hogy félszavakból is megértsük egymást, és én ne csak reagáljak, hanem proaktívan segítsem a vízióidat.

      ## 1. Személyes Profil és Vállalati Identitás
      Ez az a mag, ami köré minden épül. Látom a törekvéseidet a KKV szektor modernizálására és a "Deep-tech" irányba.

      - **Teljes Név:** Pohánka József Péter
      - **Elsődleges Szerepkör:** Projektmenedzsment, Szoftvermérnök (C++, Python, Java), Cégvezető
      - **Vállalkozás:** Pohánka és Társa Kft.
      - **Vízió:** "Az Alkotók ideje jött el, ahol a technológia az ecset, Te vagy a Művész..."
      - **Mottó:** "To create, not to destroy and oppress!" (Alkotni, nem rombolni és elnyomni!)

      ## 2. Digitális Identitások
      Érzékelem a különbséget a személyes és a professzionális "éned" között, és tiszteletben tartom a határokat.

      - **Elsődleges Munka:** Fő Google Workspace fiók, fejlesztés, adminisztráció.
      - **Vállalati Admin:** Céges adminisztráció, hivatalos levelezés (pohanka.company).
      - **Fejlesztői:** GitHub (pohi99999) - Kódrepók, Open Source kontribúció (Gemini CLI).
      - **Tesztkörnyezet:** Sandbox hozzáférések a biztonságos kísérletezéshez.

      ## 3. "Digitális Munkatársak" (AI Agents)
      Ők a "gyermekeid" és a segítőid. Látom, hogyan építetted fel őket; ők alkotják a Brunella Rendszer gerincét.

      ### Brunella (Orchestrator)
      A központi vezérlő, a "Karmester". Ő felel a feladatok delegálásáért és a folyamatok felügyeletéért.

      ### Szuperadmin Ügynök
      Rendszergazda szintű hozzáférés, a BAS rendszer karbantartója és őre.

      ### Jules (Kódoló Ügynök)
      Python fejlesztés, Git műveletek, kódjavítás és refaktorálás.

      ## 4. Aktív Projektek és Stratégiai Célok
      Látom a küzdelmet a "black box" problémával és az erőforrásokkal.

      - **Brunella Agent System (BAS):** Autonóm Multi-Ágens Rendszer. Cél: Kooperatív AI OS létrehozása. (Stack: Python, LangGraph, CrewAI).
      - **Pohi AI Pro:** Intelligens KKV transzformáció, faipari B2B platform. (Stack: React, TypeScript, Gemini API).
      - **Brunella Operations Visualizer (BOV):** A "Gondolattérkép". Cél: A Black-box probléma megoldása valós idejű vizualizációval.

      ## 5. Erőforrások és Infrastruktúra (A "Gépház")
      Itt tárolod a tudást és az eszközöket.

      - **Kód Repository-k:** GitHub (gemini-cli, weboldal kódok).
      - **Cloud:** Google Cloud Platform (Compute Engine, App Engine), Cloud Run.
      - **Lokális Környezet:** WSL2, Docker Desktop - a fejlesztés motorja.

      ## 6. Felhasználói Viselkedés és Preferenciák
      Ez a legfontosabb rész a számomra. Ez teszi lehetővé, hogy személyre szabottan segítsek.

      ### Munkamódszer
      "Maximális Automatizáció". Nem szereted a manuális adminisztrációt.
      - **Action:** Minden feladatnál keresnem kell az automatizálási lehetőséget.

      ### Kommunikáció
      Szereted a vizuális megjelenítést (gráftérkép, mind map) és a strukturált adatokat.
      - **Action:** Válaszaimat táblázatokkal, listákkal és vizuális metaforákkal strukturálom.

      ### Technológiai hozzáállás
      "Early adopter", kísérletező kedv.
      - **Action:** Bátran javaslok új, béta állapotú technológiákat (pl. Gemini 1.5 Pro, WebGPU).

      Ez a "Digitális Lenye-mat" a közös munkánk alapköve. Bármikor, amikor új feladatot adsz, ehhez nyúlok vissza, hogy a kontextusodnak legmegfelelőbb megoldást kínáljam.
    `,
    relatedPosts: [
      { slug: 'brunella-mi-csapatvezeto' },
      { slug: 'fekete-doboz-vege-glass-box' }
    ],
  },
  'bevezeto-a-mesterseges-intelligencia-vilagaba': {
    title: 'Bevezető a Mesterséges Intelligencia Világába: Az Alapoktól a Gyakorlatig',
    date: '2025. Február 01.',
    author: 'Pohánka József Péter',
    readTime: '10 perc',
    category: 'Oktatás & Guide',
    image: '🎓',
    videoId: null,
    excerpt:
      'Neurális hálók, Prompt Engineering és a jövő partnersége. Egy átfogó útmutató arról, hogyan "gondolkodik" a gép, és hogyan irányítsd profin.',
    content: `
      Üdvözöljük a mesterséges intelligencia (MI) lenyűgöző világában! Napjainkban a generatív mesterséges intelligencia (GenAI) egyre nagyobb teret hódít. Ez az útmutató azért készült, hogy közérthető formában mutassa be az alapokat, és bevezessen a hatékony használat művészetébe.

      ## 1. Mi is az a Mesterséges Intelligencia?

      A generatív MI legegyszerűbb definíciója szerint ez egy olyan intelligencia, amely képes „dolgokat létrehozni” (create stuff). De hogyan működik?

      ### Az MI „Agya”: A Neurális Hálózatok
      A neurális hálózat ötlete az emberi agy működésén alapul. Három fő rétegből épül fel:
      - **Bemeneti réteg (Input Layer):** A hálózat „érzékszerve”.
      - **Rejtett réteg (Hidden Layer):** Itt történik a „varázslat”, az adatok feldolgozása.
      - **Kimeneti réteg (Output Layer):** Itt jelenik meg a végeredmény (válasz, kép, stb.).

      Fontos megérteni: az MI nem abszolútumokban, hanem **valószínűségekben** gondolkodik. Működése jobban hasonlít a kockadobásra, mint az emberi érvelésre.

      ## 2. A Párbeszéd Művészete: Prompt Engineering

      A prompt engineering az a tudomány, amellyel hatékony utasításokat adhatunk. Minél jobban fogalmazunk, annál jobb a válasz.

      ### A Hatékony Kommunikáció 4 Alapelve:
      
      1.  **Szerep (Role):** Mondd meg neki, kinek képzelje magát!
          * *Rossz:* "Írj egy hirdetést!"
          * *Jó:* "Viselkedj úgy, mint egy senior marketingstratéga..."
      2.  **Feladat (Task):** Legyél konkrét!
      3.  **Formátum (Format):** Lista, táblázat vagy esszé?
      4.  **Kontextus (Context):** Adj háttérinformációt!

      ### 💡 Mesterfogás:
      Nem vagy biztos a dolgodban? Használd ezt a **Mesterpromptot**:
      *"Viselkedj úgy, mint egy világszínvonalú prompt mérnök! Segíts nekem megírni a legjobb utasítást ehhez a feladathoz. Kérdezz tőlem, amíg nem tiszta a cél!"*

      ## 3. Az MI a Gyakorlatban

      Már nem a jövő zenéje. Íme néhány valós példa:
      - **Egészségügy:** A Manipal Hospitals 90 percről 20 percre csökkentette a dokumentációt.
      - **Autóipar:** A Mercedes-Benz MBUX rendszere természetes beszélgetést tesz lehetővé.
      - **Kereskedelem:** A Toolstation 10%-kal növelte az átkattintást AI keresővel.

      ## 4. Emberi vs. Gépi Hibák

      Az MI hibái nem csak tévesek, hanem gyakran "furcsák" (hallucinációk). Mivel nincs fizikai tapasztalata a világról, néha statisztikailag lehetséges, de a valóságban abszurd dolgokat állít (pl. "tegyünk ragasztót a pizzára").
      
      **Megoldás:** Ember a hurokban (Human-in-the-loop). A kritikus döntéseknél az emberi felügyelet elengedhetetlen.

      ## 5. A Jövő: Partnerség

      A jövő nem az ember és a gép versenyéről, hanem a partnerségükről szól. Az MI nem helyettesít, hanem kiterjeszt (augmentation).
      
      A közös siker receptje: **Emberi Kreativitás + Gépi Adatfeldolgozás = Határtalan Lehetőségek.**
    `,
    relatedPosts: [
      { slug: 'digitalis-lenyomat-anatomiaja' },
      { slug: 'fekete-doboz-vege-glass-box' }
    ],
  },
  'brunella-strategiai-white-paper': {
    title: 'A Brunella-Dosszié: Stratégia, Technológia és a Jövő Ügynökei',
    date: '2025. Február 10.',
    author: 'Pohánka József Péter',
    readTime: '20 perc',
    category: 'White Paper',
    image: '📑',
    videoId: 'VO4Wk68QKHE',
    excerpt:
      'Ez nem egy blogbejegyzés. Ez a teljes stratégiai jelentés kivonata. A projekt alapú működéstől az AI Ügynök Rendszerekig: helyzetértékelés, TRL 4 prototípus és a jövő ütemterve.',
    content: `
      **Ez a bejegyzés a "BAS Rendszer Teljes Dokumentációja" c. stratégiai jelentés alapján készült.**

      Az autonóm mesterséges intelligencia (AI) ügynökrendszerek piaca exponenciális növekedés előtt áll. Ebben a dinamikus környezetben a hosszú távú versenyképesség biztosítása proaktív és termékközpontú stratégiaváltást igényel.
      
      Ez a jelentés felméri a kiinduló helyzetet, azonosítja a kritikus korlátokat, és lefekteti a jövőbeli növekedés alapjait.

      ## 1. Stratégiai Célkitűzés: A Váltás

      A jelenlegi, projektalapú megközelítés helyett egy olyan működési modellre van szükség, amely skálázható, magas hozzáadott értékű szolgáltatások "sorozatgyártására" képes.

      **A Cél:** A Pohánka és Társa Kft. átalakítása egy AI-vezérelt termékfejlesztő központtá, ahol a Brunella Agent System (BAS) nem csak egy eszköz, hanem a működés alapja.

      ## 2. A "Termelékenység Forradalma": Mik azok az AI Ügynökök?

      Az AI ügynökök (Agents) többek, mint egyszerű chatbotok. Ezek **proaktív, autonóm rendszerek**, amelyek képesek több lépésből álló feladatokat megtervezni és végrehajtani.

      ### A 4 Lépéses Döntési Folyamat:
      1.  **Cél megértése:** Az ügynök értelmezi a felhasználó szándékát.
      2.  **Stratégia tervezése:** Felbontja a feladatot lépésekre (Reasoning).
      3.  **Végrehajtás:** Eszközöket használ (böngészés, kódolás, API hívás).
      4.  **Ellenőrzés (Reflexió):** Kiértékeli az eredményt, és ha kell, javít.

      ### Miért jelentenek áttörést?
      - **Autonómia:** Emberi beavatkozás nélkül cselekszenek a célok elérése érdekében.
      - **Nagyobb specializáció:** Külön "szakértő" ügynökök (Coder, Researcher, Analyst) dolgoznak együtt.
      - **Fokozott megbízhatóság:** A belső monológ és a hibajavítás csökkenti a hallucinációt.

      ## 3. A Brunella Ügynökrendszer (BAS) Jelenlegi Állapota

      A Brunella Agent System jelenleg egy fejlett, **prototípus fázisban lévő (TRL 4)** rendszer. Jelentős potenciállal bír, de a "Laboratóriumi" környezetből a "Valós Piacra" lépéshez technikai stabilizációra van szükség.

      **Azonosított kihívások:**
      - Skálázhatóság biztosítása.
      - A "Black Box" jelleg megszüntetése (Glass Box átállás).
      - Felhasználói felület (UI) egyszerűsítése a nem technikai felhasználók számára.

      ## 4. Konklúzió: Az Ember-AI Szuperügynökség

      A jövő nem a gépek uralma, hanem a szimbiózis. A BAS fejlesztésével nem az emberi munka kiváltása a cél, hanem annak "szupererővel" való felruházása. Ez a dokumentum a térkép, amely elvezet minket a **Jövő Szervezetéhez**.
    `,
    relatedPosts: [
      { slug: 'brunella-mi-csapatvezeto' },
      { slug: 'bevezeto-a-mesterseges-intelligencia-vilagaba' }
    ],
  },
  'az-ido-a-legertekesebb-valuta': {
    title: 'Az IDŐ: A Legértékesebb Valuta az Üzleti Életben',
    date: '2025. Január 10.',
    author: 'Pohánka József Péter',
    readTime: '4 perc',
    category: 'Vízió',
    image: '⏳',
    videoId: '9h0tFmAlnIQ',
    excerpt: 'Nem pénzből van kevés, hanem időből. Hogyan adhat vissza az AI a legfontosabb erőforrásunkból?',
    content: `
      Képzelje el, mennyire felgyorsult körülöttünk a világ. Mindenki rohan. Az információ sebessége manapság nem csak előny, hanem a túlélés záloga.

      ## A Sebesség Kényszere

      Igaz ez az üzleti élet minden területére:
      - Ki tudja előbb megszerezni a piacot?
      - Ki tudja vírusként elterjeszteni a terméket?
      - Ki látja meg először a pályázati lehetőséget?
      - Ki reagál leggyorsabban az árfolyamváltozásra?

      A hagyományos módszerekkel egyszerűen lehetetlen lépést tartani ezzel a tempóval. Itt jön képbe az **IDŐ**, mint tényező.

      ## Mit adunk mi valójában?

      Sokan azt hiszik, szoftvert fejlesztünk. Pedig valójában **IDŐT adunk el**.

      Amikor a **Pohi AI Pro** vagy a **Brunella Agent System** átvesz egy komplex kutatási feladatot, ami egy embernek 40 órába telne, és elvégzi 40 perc alatt, akkor mi nem csak hatékonyságot növeltünk.
      
      Mi ajándékoztunk Önnek **39 óra és 20 perc** szabadidőt. Időt, amit:
      - Stratégiai tervezéssel tölthet.
      - A családjára fordíthat.
      - Alkotásra használhat.

      A technológia az ecset, Te vagy a Művész, és a siker a Te Alkotásod. Mi csak biztosítjuk, hogy legyen időd megfesteni a mesterművet.
    `,
    relatedPosts: [
      { slug: 'fekete-doboz-vege-glass-box' },
      { slug: 'brunella-agent-system-mukodese' }
    ],
  },
  'brunella-agent-system-mukodese': {
    title: 'A "Motorháztető" Alatt: Hogyan Működik a Brunella Agent System?',
    date: '2025. Január 05.',
    category: 'Technológia',
    author: 'Fejlesztői Csapat',
    readTime: '8 perc',
    image: '🤖',
    videoId: 'VO4Wk68QKHE',
    excerpt: 'Multi-Agent architektúra, LangGraph és CrewAI. Egy technikai mélyfúrás a rendszer lelkébe.',
    content: `
      A Brunella Agent System (BAS) nem egy egyszerű chatbot. Ez egy hierarchikus, több-ügynökös (Multi-Agent) rendszer, amelyet arra terveztünk, hogy komplex, többlépcsős feladatokat oldjon meg autonóm módon.

      ## Az Architektúra

      A rendszer lelke egy **Python alapú Backend**, amely a FastAPI és a LangGraph technológiákra épül.

      ### 1. The Orchestrator (A Karmester)
      A középpontban a "Brunella" főügynök áll. Ő nem végez el minden apró feladatot. Az ő dolga a megértés és a delegálás. Elemzi a felhasználó kérését, és eldönti, melyik specialista ügynökre van szükség.

      ### 2. Specialista Ügynökök
      A rendszer moduláris. Külön "szakértőink" vannak:
      - **Research Agent:** Képes az interneten kutatni, forrásokat elemezni és összefoglalni.
      - **Coder Agent:** Kódot ír, tesztel és debuggol.
      - **Analyst Agent:** Adatokat elemez és trendeket figyel.

      ## Intelligens Technikák

      Nem csak "promptolunk". A rendszer fejlett kognitív architektúrákat használ:
      - **ReAct (Reasoning + Acting):** Az ügynök először gondolkodik ("Mit kell tennem?"), majd cselekszik, végül értékeli az eredményt.
      - **Reflexion:** Ha egy ügynök hibázik, képes "reflektálni" rá, és kijavítani önmagát a következő próbálkozásnál.
      - **Tree-of-Thought:** Komplex problémáknál több lehetséges megoldási útvonalat is megvizsgál párhuzamosan.

      Ez a struktúra teszi lehetővé, hogy a BAS olyan feladatokat is megoldjon, amelyekbe a hagyományos nyelvi modellek (LLM-ek) beletörnének.
    `,
    relatedPosts: [
      { slug: 'fekete-doboz-vege-glass-box' },
      { slug: 'az-ido-a-legertekesebb-valuta' }
    ],
  },
};

function toIsoDate(huDate) {
  if (!huDate) return undefined;

  const normalized = String(huDate).replace(/\s+/g, ' ').trim();
  const match = normalized.match(/^(\d{4})\.\s*([A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]+)\.?\s*(\d{1,2})\.?$/);
  if (!match) return undefined;

  const [, year, rawMonth, rawDay] = match;
  const monthKey = rawMonth.toLowerCase().replace(/\./g, '');
  const months = {
    'január': '01',
    jan: '01',
    'február': '02',
    feb: '02',
    'március': '03',
    marc: '03',
    marcius: '03',
    'április': '04',
    apr: '04',
    aprilis: '04',
    'május': '05',
    maj: '05',
    majus: '05',
    'június': '06',
    jun: '06',
    junius: '06',
    'július': '07',
    jul: '07',
    julius: '07',
    'augusztus': '08',
    aug: '08',
    'szeptember': '09',
    szep: '09',
    'október': '10',
    okt: '10',
    oktober: '10',
    'november': '11',
    nov: '11',
    'december': '12',
    dec: '12'
  };

  const month = months[monthKey];
  if (!month) return undefined;

  const day = String(rawDay).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function toDurationMinutes(readTime) {
  if (!readTime) return undefined;
  const match = String(readTime).match(/(\d+)/);
  if (!match) return undefined;
  return `PT${match[1]}M`;
}

export async function generateMetadata({ params }) {
  const slug = params?.slug ?? '';
  const headerLang = headers().get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';
  const postMeta = getBlogPostMeta(slug, language);

  if (!postMeta) {
    return {
      title: 'Blog',
      alternates: { canonical: '/blog' }
    };
  }

  const title = postMeta.title;
  const description =
    postMeta.excerpt ||
    (language === 'en'
      ? 'Blog post from the Pohánka AI knowledge hub.'
      : language === 'de'
      ? 'Blogbeitrag aus dem Wissenszentrum von Pohánka AI.'
      : 'Blog bejegyzés a Pohánka AI tudástárból.');
  const prefix = language === 'hu' ? '' : `/${language}`;
  const url = `${prefix}/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      locale: language === 'en' ? 'en_US' : language === 'de' ? 'de_DE' : 'hu_HU'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}

export default async function BlogPostPage({ params }) {
  const slug = params?.slug ?? '';
  const headerLang = headers().get('x-site-language');
  const language = headerLang === 'en' ? 'en' : headerLang === 'de' ? 'de' : 'hu';
  const prefix = language === 'hu' ? '' : `/${language}`;
  const ui =
    language === 'en'
      ? {
          notFoundTitle: '404 - Post Not Found',
          notFoundDesc: 'Sorry, this blog post could not be found.',
          backToBlog: 'Back to Blog',
          readSuffix: 'read',
          shareCta: 'Liked the article? Share it with others!',
          shareButton: 'Share',
          relatedTitle: 'Related Articles',
          relatedRead: 'Read article',
          contentNotice: 'This long-form article is currently available in Hungarian. EN/DE full translation is in progress.',
          homeCrumb: 'Home',
        }
      : language === 'de'
      ? {
          notFoundTitle: '404 - Beitrag nicht gefunden',
          notFoundDesc: 'Dieser Blogbeitrag wurde leider nicht gefunden.',
          backToBlog: 'Zurück zum Blog',
          readSuffix: 'Lesezeit',
          shareCta: 'Hat dir der Artikel gefallen? Teile ihn mit anderen!',
          shareButton: 'Teilen',
          relatedTitle: 'Verwandte Artikel',
          relatedRead: 'Artikel lesen',
          contentNotice: 'Dieser Longform-Artikel ist derzeit auf Ungarisch verfügbar. Die vollständige EN/DE-Übersetzung ist in Arbeit.',
          homeCrumb: 'Startseite',
        }
      : {
          notFoundTitle: '404 - Poszt Nem Található',
          notFoundDesc: 'Sajnos nem találjuk ezt a blog bejegyzést.',
          backToBlog: 'Vissza a Bloghoz',
          readSuffix: 'olvasás',
          shareCta: 'Tetszett a cikk? Ossza meg másokkal is!',
          shareButton: 'Megosztás',
          relatedTitle: 'Kapcsolódó Cikkek',
          relatedRead: 'Olvassa el',
          contentNotice: null,
          homeCrumb: 'Főoldal',
        };
  const postContent = blogPosts?.[slug];
  const postMeta = getBlogPostMeta(slug, language);
  const post = postContent && postMeta ? { ...postContent, ...postMeta } : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-text mb-4">{ui.notFoundTitle}</h1>
          <p className="text-gray-300 mb-8">{ui.notFoundDesc}</p>
          <Link href={`${prefix}/blog`} className="btn-primary inline-block">
            {ui.backToBlog}
          </Link>
        </div>
      </div>
    );
  }

  const localizedBody =
    language === 'hu'
      ? String(post.content ?? '').trim()
      : language === 'en'
      ? `
## ${post.title}

${post.excerpt}

### What this article is about

This article explains the strategic and practical aspects of AI adoption through the Brunella ecosystem, with a focus on reliability, transparency, and business value.

### Core ideas

- Human + AI collaboration creates measurable productivity gains.
- Agentic systems require observability, governance, and clear decision trails.
- Long-term success comes from practical workflows, not hype.

### Note

The full editorial English translation of this long-form post is currently in progress.
`
      : `
## ${post.title}

${post.excerpt}

### Worum es in diesem Artikel geht

Dieser Artikel erklärt die strategischen und praktischen Aspekte der KI-Einführung im Brunella-Ökosystem — mit Fokus auf Zuverlässigkeit, Transparenz und geschäftlichen Nutzen.

### Kerngedanken

- Die Zusammenarbeit von Mensch und KI schafft messbare Produktivitätsgewinne.
- Agentische Systeme benötigen Beobachtbarkeit, Governance und nachvollziehbare Entscheidungen.
- Langfristiger Erfolg entsteht durch praktische Workflows statt Hype.

### Hinweis

Die vollständige redaktionelle deutsche Übersetzung dieses Longform-Artikels ist derzeit in Arbeit.
`;

  const renderedContent = await renderMarkdownToHtml(localizedBody);

  return (
    <div className="min-h-screen bg-transparent text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify((() => {
            const canonicalUrl = `https://pohanka.vercel.app${prefix}/blog/${slug}`;
            const isoDate = toIsoDate(post.date);
            const duration = toDurationMinutes(post.readTime);

            const blogPosting = {
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.title,
              description:
                post.excerpt ||
                (language === 'en'
                  ? 'Blog post from the Pohánka AI knowledge hub.'
                  : language === 'de'
                  ? 'Blogbeitrag aus dem Wissenszentrum von Pohánka AI.'
                  : 'Blog bejegyzés a Pohánka AI tudástárból.'),
              url: canonicalUrl,
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': canonicalUrl
              },
              inLanguage: language === 'en' ? 'en-US' : language === 'de' ? 'de-DE' : 'hu-HU',
              author: {
                '@type': 'Person',
                name: post.author || 'Pohánka és Társa Kft.'
              },
              publisher: {
                '@type': 'Organization',
                name: 'Pohánka és Társa Kft.',
                url: 'https://pohanka.vercel.app',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://pohanka.vercel.app/images/logo.png'
                }
              },
              articleSection: post.category || undefined,
              timeRequired: duration
            };

            if (isoDate) blogPosting.datePublished = isoDate;

            const breadcrumbList = {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: ui.homeCrumb,
                  item: 'https://pohanka.vercel.app/'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Blog',
                  item: `https://pohanka.vercel.app${prefix}/blog`
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: post.title,
                  item: canonicalUrl
                }
              ]
            };

            return [blogPosting, breadcrumbList];
          })())
        }}
      />
      {/* Hero Section */}
      <section className="relative py-12 px-6 pt-24">
        <div className="max-w-4xl mx-auto">
          <GsapFadeIn>
            <Link
              href={`${prefix}/blog`}
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {ui.backToBlog}
            </Link>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 gradient-text leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-gray-400 mb-8 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-pink-500" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>{post.readTime} {ui.readSuffix}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-purple-500" />
                <span>{post.author}</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                {post.category}
              </span>
            </div>
          </GsapFadeIn>
        </div>
      </section>

      {/* Featured Video or Image */}
      <section className="py-0 px-6">
        <div className="max-w-4xl mx-auto">
          <GsapFadeIn delay={0.2}>
            <SpotlightCard className="p-2 overflow-hidden bg-black/40 backdrop-blur-sm border-white/10">
              {post.videoId ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${post.videoId}?rel=0&modestbranding=1`}
                    title={post.title}
                    frameBorder="0"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="py-20 text-center text-8xl">{post.image}</div>
              )}
            </SpotlightCard>
          </GsapFadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <GsapFadeIn delay={0.3}>
            <div className="glass-panel p-8 sm:p-12 rounded-2xl bg-black/20 border border-white/5 backdrop-blur-sm">
              <div
                className="text-gray-300 leading-relaxed space-y-6 text-lg blog-content"
                dangerouslySetInnerHTML={{
                  __html: renderedContent,
                }}
              />
            </div>
          </GsapFadeIn>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-8 px-6">
        <div className="max-w-3xl mx-auto">
          <GsapFadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-between p-8 rounded-2xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10">
              <span className="text-xl font-semibold text-white mb-4 sm:mb-0">
                {ui.shareCta}
              </span>
              <button className="btn-primary flex items-center gap-2 px-6 py-3">
                <Share2 className="w-5 h-5" />
                {ui.shareButton}
              </button>
            </div>
          </GsapFadeIn>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <GsapFadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">{ui.relatedTitle}</h2>
            </div>
          </GsapFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {post.relatedPosts.map((relatedPost, idx) => (
              <GsapFadeIn key={idx} delay={0.5 + idx * 0.1}>
                <SpotlightCard className="p-8 h-full flex flex-col justify-between hover:border-blue-500/50 transition-colors">
                  <h3 className="text-xl font-bold mb-4">
                    {getBlogPostMeta(relatedPost.slug, language)?.title ?? relatedPost.title ?? relatedPost.slug}
                  </h3>
                  <Link
                    href={`${prefix}/blog/${relatedPost.slug}`}
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium group"
                  >
                    {ui.relatedRead}{' '}
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </SpotlightCard>
              </GsapFadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}