import React from 'react';
import Link from 'next/link';
import GsapFadeIn from '../../components/GsapFadeIn';
import SpotlightCard from '../../components/SpotlightCard';
import { ArrowLeft, Calendar, Clock, User, Share2, ArrowRight } from 'lucide-react';
import { getBlogPostMeta } from '../blogPosts.meta';
import { renderMarkdownToHtml } from '../../../lib/markdown';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';

// Valós Blog Tartalmak
const blogPosts = {
  'automatizalt-bongeszo-agensek': {
    title: 'Automatizált Böngésző Ágensek: A Digitális Munkatársad a Hétköznapokban',
    date: '2026. Június 8.',
    author: 'Pohánka József Péter',
    readTime: '6 perc',
    category: 'Automatizáció',
    image: '🤖',
    videoId: 'MxCrG5LsIPM',
    excerpt:
      'Mit jelent az, hogy egy robotpilóta helyetted böngészi a webet? Hogyan spórolnak meg órákat az AI ágensek egy átlagos vállalkozásnak?',
    content: `
      Képzelje el, hogy van egy láthatatlan asszisztense, aki leül a számítógép elé, megnyitja a böngészőt, megkeresi a konkurens árakat, letölti a havi számlákat, beírja őket egy táblázatba, majd küld egy értesítést, ha készen van. Nem hibázik, nem fárad el, és mindezt másodpercek alatt végzi el.

      Ők az **automatizált böngésző ágensek** — és hamarosan alapjaiban változtatják meg, hogyan dolgozunk a mindennapokban.

      ## Mi az a böngésző ágens és hogyan működik?

      A hagyományos szoftverekkel ellentétben a modern, mesterséges intelligenciával támogatott böngésző ágensek (mint például a Skyvern, vagy a mi saját fejlesztésű Brunella rendszerünk) nem merev kódokat követnek.

      Úgy látják és értelmezik a weboldalakat, mint egy ember:
      - **Képernyő-megértés:** Nem zavarja meg őket, ha egy weboldal frissül, és máshová kerül a "Megrendelés" vagy a "Bejelentkezés" gomb. Felismerik az elemeket a funkciójuk alapján.
      - **Autonóm döntéshozatal:** Ha egy oldalon felugrik egy hibaüzenet vagy egy cookie-elfogadó ablak, az ágens önállóan kitalálja, hogyan lépjen túl rajta.
      - **Eszközhasználat:** Képesek gépelni, kattintani, görgetni, fájlokat letölteni és feltölteni.

      ## Mire használható a mindennapokban?

      Íme néhány konkrét példa, ami egy átlagos vállalkozásnak azonnal órákat spórol meg:

      ### 1. Automata Lead-kutatás (Web Rescue)
      Az ágens rákeres a Google Maps-en a célcsoportodba tartozó cégekre, megnyitja a weboldalukat, kinyeri a kapcsolati adatokat (email, telefon, közösségi média linkek), és lefuttat egy Lighthouse teljesítmény-auditot. Ha a weboldaluk lassú, az adatokat automatikusan beírja a CRM-rendszeredbe, hogy készíthesd a személyre szabott ajánlatot.

      ### 2. Intelligens Árfigyelés és Konkurencia-elemzés
      Ha webáruházad van, az ágens naponta végigböngészi a versenytársaid oldalait, kigyűjti a termékek árait, és egy Excel táblázatba rendezi őket. Akár arra is beprogramozható, hogy ha a konkurens árat csökkent, a saját áraidat is automatikusan igazítsa.

      ### 3. Rutin Adminisztráció és Számlaletöltés
      Minden hónap elején órákat töltesz a telefonszámlák, közműszámlák és szoftver-előfizetések számláinak letöltésével a különböző portálokról? Az ágens bejelentkezik az összes fiókodba, letölti a PDF fájlokat, elnevezi őket a megfelelő formátumban, feltölti a Google Drive-ra, és továbbítja a könyvelőnek.

      ## Az IDŐ: A legfontosabb valuta

      A modern üzleti életben a sebesség és az idő a legfontosabb erőforrás. Amikor egy böngésző ágens átvesz egy olyan unalmas, monoton kattintgatós folyamatot, ami egy embernek hetente 5-10 órát venne igénybe, nem csak a hibákat minimalizálja.

      Valójában **időt ad vissza Önnek**. Időt, amit a vállalkozása építésére, stratégiai döntésekre, vagy a családjára fordíthat.

      A robotpilóta korszak megérkezett a böngészőnkbe is. Ön készen áll átadni az irányítást a rutinfeladatokban?
    `,
    relatedPosts: [
      { slug: 'brunella-agent-system-mukodese' },
      { slug: 'ai-automatizalas-kkv-knak' }
    ],
  },
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
  'ai-automatizalas-kkv-knak': {
    title: 'AI Automatizálás KKV-knak: Honnan Kezdjük?',
    date: '2025. Március 5.',
    author: 'Pohánka József Péter',
    readTime: '7 perc',
    category: 'Útmutató',
    image: '🚀',
    videoId: '',
    excerpt: 'A legtöbb KKV pontosan nem tudja, hol kezdje az AI bevezetését. Megmutatjuk azt az egyszerű 3 lépéses keretet, amellyel 30 napon belül mérhető eredményeket érhet el.',
    content: `
Az AI bevezetése nem a nagyvállalatoknak szóló luxus — hanem egy **versenyelőny, amelyet a kis- és középvállalkozások most tudnak megragadni**, mielőtt a piac ezt alapkövetelménnyé teszi.

## Miért most?

A ChatGPT megjelenése óta az AI eszközök elérhetősége és ára drasztikusan megváltozott. Ma már egy KKV is hozzáférhet olyan rendszerekhez, amelyek öt évvel ezelőtt csak Fortune 500-as cégek számára voltak elérhetőek.

De az elérhető eszközök önmagukban nem elegendőek. A kérdés az: **hogyan**?

## A 3 Lépéses KKV AI Keret

### 1. Lépés: Fájdalompontok azonosítása (1. hét)

Ne az AI-tól indulj el — a problémádtól. Kérdezd meg magadtól:
- Mire megy el a legtöbb ideje a csapatodnak ismétlődő feladatokra?
- Hol csúszik el a legtöbb ügyfélkommunikáció?
- Melyik folyamatban van a legtöbb emberi hiba?

Tipikus KKV fájdalompontok: ajánlatküldés, ügyfél-visszajelzés kezelése, időpontfoglalás, riportálás.

### 2. Lépés: Egyetlen folyamat automatizálása (2-3. hét)

Ne akarj mindent egyszerre. Válassz ki **egyetlen folyamatot** — azt, amelyik a legtöbb időt veszi el — és automatizáld azt egy AI ügynökkel.

Egy ügyfélszolgálati chatbot, amely a kérdések 70%-át megválaszolja, azonnal mérhető ROI-t termel: kevesebb elszalasztott lead, gyorsabb válaszidő.

### 3. Lépés: Mérés és skálázás (4. hét és utána)

Amint az első folyamat fut, mérd az eredményeket: mennyivel csökkent a válaszidő? Hány órát spórolt a csapat? Mennyivel nőtt a konverzió?

Ezekre az adatokra alapozva döntsd el, hova érdemes a következő AI befektetést irányítani.

## Összefoglalás

Az AI-ba való belépés nem kell, hogy drága vagy bonyolult legyen. Egy jól megválasztott első lépéssel 30 napon belül mérhető eredményeket érhetsz el. A Brunella Consulting pont ebben segít.
    `,
    relatedPosts: [
      { slug: 'chatbot-az-ugyfelszolgalatban' },
      { slug: 'folyamat-automatizalas-5-lepes' }
    ],
  },
  'chatbot-az-ugyfelszolgalatban': {
    title: 'Chatbot az Ügyfélszolgálatban: Mítoszok és Valóság',
    date: '2025. Március 18.',
    author: 'Pohánka József Péter',
    readTime: '5 perc',
    category: 'Elemzés',
    image: '🤖',
    videoId: '',
    excerpt: 'A chatbotok nem helyettesítik az embert — de a kérdések 70%-át megoldják. Megnézzük, mi igaz és mi nem a chatbotokról szóló legendákból.',
    content: `
A chatbotról szóló vita sokszor két táborra osztja a vállalkozókat: az egyik tábor mindent lát bennük, a másik semmit. Az igazság, mint mindig, **valahol a kettő között van**.

## Ami igaz a chatbotokról

**A kérdések 60-70%-a ismétlődő.** Nyitvatartási idő, árlista, rendelési státusz, alapvető szervizinfo — ezeket egy jól betanított chatbot tökéletesen megválaszolja, és 24/7-ben teszi.

**A válaszidő számít.** Tanulmányok szerint az ügyfelek 82%-a azonnali választ vár (5 percen belül). Egy chatbot ezt garantálja; egy emberi ügyfélszolgálat nem mindig.

**Az ember felszabadul az értékes munkára.** Ha a bot kezeli a rutinkérdéseket, az emberek a bonyolult, empatikus interakciókra fókuszálhatnak — amelyek valódi értéket teremtenek.

## Ami nem igaz

**"A chatbot hideg és személytelen."** A modern, LLM-alapú chatbotok hangszínét, stílusát és személyiségét pontosan be lehet állítani. Egy jól konfigurált bot barátságos, segítőkész és a márkád hangján szól.

**"Mindenki utálja a chatbotokat."** Az ügyfelek akkor utálják a chatbotokat, ha azok nem tudnak segíteni. Ha a bot gyors, releváns választ ad és tud eskalálni, az elégedettség magas.

**"Drága és nehéz integrálni."** 2025-ben egy KKV is beüzemelhet egy személyre szabott chatbotot érthető áron, weboldalba, CRM-be és e-mail rendszerbe integrálva.

## Mikor NE vezess be chatbotot?

Ha az ügyfélkommunikáció elsősorban komplex, érzelmi, vagy egyedi — például jogi- vagy egészségügyi tanácsadás — ott az emberi jelenlét pótolhatatlan. A chatbot **kiegészíti**, nem helyettesíti az embert.

## Összefoglalás

A chatbot nem varázspálca, de nem is zsákutca. Egy jól tervezett, célzottan bevezetett chatbot **az egyik legjobb megtérülést nyújtó AI befektetés** egy ügyfélközpontú KKV számára.
    `,
    relatedPosts: [
      { slug: 'ai-automatizalas-kkv-knak' },
      { slug: 'folyamat-automatizalas-5-lepes' }
    ],
  },
  'folyamat-automatizalas-5-lepes': {
    title: '5 Lépés az Üzleti Folyamat Automatizáláshoz',
    date: '2025. Április 2.',
    author: 'Pohánka József Péter',
    readTime: '8 perc',
    category: 'Stratégia',
    image: '⚙️',
    videoId: '',
    excerpt: 'Az üzleti folyamatok automatizálása nem rakétatudomány — ha tudod, honnét indulj el. 5 konkrét lépés valós példákkal.',
    content: `
Az üzleti folyamat automatizálás (BPA) az egyik legtöbbet emlegetett, de legkevésbé értett fogalom a KKV-k világában. Sokan azt hiszik, hogy ehhez hatalmas IT-csapat és milliós büdzsé kell. **Nem kell.**

## Miért érdemes automatizálni?

Egy átlagos KKV munkaidejének 20-40%-a megy el ismétlődő, értéket nem termelő adminisztratív feladatokra. Ez nem hatékonysági probléma — ez **pénzügyi vérzés**, amit AI-jal el lehet állítani.

## Az 5 Lépés

### 1. Folyamat-feltérképezés
Rajzold le az összes kulcslépést: ki mit csinál, milyen adattal dolgozik, hol csúszik el. Eszköz: egy whiteboard és 2 óra csapatmunka.

### 2. Prioritizálás az ROI alapján
Minden folyamathoz becsüld meg: hány óra megy rá hetente × hány ember × órabér = ez az automatizálás potenciális megtakarítása. Válaszd a legmagasabb számot.

### 3. Adatminőség ellenőrzése
Az AI-nak adatra van szüksége. Mielőtt automatizálsz, győződj meg, hogy az érintett adatok rendezetten, hozzáférhető formátumban léteznek (Excel, CRM, ERP).

### 4. Pilot futtatása
Ne vezess be mindent egyszerre. Futtass egy 2-4 hetes pilotot egyetlen folyamaton, egyetlen csapattal. Mérd az eredményt: idő-, hiba- és költségmegtakarítás.

### 5. Skálázás és integráció
A sikeres pilot eredményei alapján döntsd el, hova érdemes kiterjeszteni az automatizálást. Integráld a meglévő rendszereidbe (CRM, számlázó, email) API-kon keresztül.

## Valós példa: Ajánlatküldés automatizálása

Egy 8 fős tanácsadó cég esetében az ajánlatküldési folyamat (adatgyűjtés → sablon töltés → PDF export → email) 3,5 órába telt ajanlatonként. Egy AI-ügynökkel ez 12 percre csökkent. Heti 15 ajánlatnál ez **47 óra megtakarítás hetente**.

## Összefoglalás

Az automatizálás nem egyszeri projekt — hanem folyamatos fejlődés. Kezdd a legfájóbb ponttal, mérd, tanulj, és skálázz. A Brunella Consulting ebben az úton végigkísér.
    `,
    relatedPosts: [
      { slug: 'ai-automatizalas-kkv-knak' },
      { slug: 'chatbot-az-ugyfelszolgalatban' }
    ],
  },
};

  const localizedLongformBodies = {
    en: {
    'automatizalt-bongeszo-agensek': `
  ## Automated Browser Agents: Autopilot for the Web

  Imagine a digital worker that logs in, retrieves data, processes invoices, and fills spreadsheets just like you do.

  ### How they work

  Modern browser agents understand the visual structure of web pages. They don't break when a button changes color or moves.

  ### Key use cases

  1. **Lead Generation & Auditing:** Scanning targets and collecting details.
  2. **Competitor Price Monitoring:** Tracking market shifts automatically.
  3. **Repetitive Administration:** Fetching billing receipts and matching records.

  Embrace browser automation to reclaim hours of manual work every week.
  `,
    'fekete-doboz-vege-glass-box': `
  ## Why transparency matters in AI

  Most organizations do not struggle with AI capability — they struggle with trust. If people cannot see *why* a system reached a conclusion, adoption slows down.

  ### The Black Box risk

  - Decisions are difficult to audit.
  - Teams hesitate to rely on outputs.
  - Regulatory pressure (GDPR, emerging AI rules) requires explainability.

  ### Our Glass Box approach

  At Brunella, every major step is observable:

  1. **Live operational visibility** of agent reasoning and actions.
  2. **Traceable decision paths** for review and post-analysis.
  3. **Human-in-command workflow**, where AI augments experts rather than replacing them.

  The future belongs to systems that are not only powerful, but accountable.
  `,
    'brunella-mi-csapatvezeto': `
  ## Brunella as an AI team lead

  Brunella is not a reactive assistant. It operates as an orchestration layer that can plan, delegate and supervise multi-step work.

  ### What enables this model

  - **ReAct loops**: reason first, act second.
  - **Reflection**: detect and repair weak intermediate results.
  - **Tree-of-Thought** branching for complex decisions.
  - **Constitutional constraints** for safe, aligned behavior.

  ### Business impact

  In practice, this means shorter execution cycles, fewer handoff losses, and better visibility across cross-functional workstreams.
  `,
    'digitalis-lenyomat-anatomiaja': `
  ## Digital footprint as an operational asset

  Your digital footprint is not just identity — it is an execution map: accounts, tools, repositories, workflows, and behavioral preferences.

  ### Why this matters

  - Better context leads to better AI assistance.
  - Cleaner identity boundaries reduce operational risk.
  - Structured knowledge enables proactive support, not only reactive responses.

  Brunella uses this model to align recommendations with your real environment and goals.
  `,
    'bevezeto-a-mesterseges-intelligencia-vilagaba': `
  ## Practical introduction to AI

  AI systems are probability engines, not mystical black magic. The quality of your results depends heavily on context and instruction quality.

  ### Core foundations

  1. **Neural models** transform patterns into outputs.
  2. **Prompt engineering** defines role, task, format, and context.
  3. **Human review** remains essential for critical decisions.

  ### Practical takeaway

  Treat AI as a co-pilot: combine machine-scale processing with human judgment.
  `,
    'brunella-strategiai-white-paper': `
  ## Strategic direction: from projects to products

  The AI agent market is evolving quickly. To remain competitive, organizations need productized, repeatable service delivery rather than one-off project execution.

  ### Key shift

  Move from ad-hoc delivery to a scalable AI operations model where BAS is a core platform capability.

  ### What this enables

  - Higher repeatability and quality.
  - Better unit economics.
  - Faster innovation cycles with controlled risk.
  `,
    'az-ido-a-legertekesebb-valuta': `
  ## Time is the real currency

  In modern business, speed is not optional. Market access, campaign timing, and decision latency directly affect outcomes.

  ### What AI should deliver

  Not only automation, but **time reclaimed** for strategic thinking, innovation, and leadership.

  When a 40-hour process becomes a 40-minute workflow, value is created beyond cost savings.
  `,
    'brunella-agent-system-mukodese': `
  ## How BAS works under the hood

  BAS is a multi-agent architecture where an orchestrator assigns tasks to specialized agents based on intent and required capability.

  ### Core components

  - **Orchestrator** for decomposition and routing.
  - **Specialists** (research, coding, analysis).
  - **Reasoning loops** with validation and reflection.

  This structure allows BAS to handle workflows that are too complex for single-turn LLM interaction.
  `,
    },
    de: {
    'automatizalt-bongeszo-agensek': `
  ## Automatisierte Browser-Agenten: Autopilot fürs Web

  Stellen Sie sich einen digitalen Assistenten vor, der sich einloggt, Daten sammelt, Rechnungen verarbeitet und Tabellen ausfüllt – genau wie Sie.

  ### Funktionsweise

  Moderne Browser-Agenten verstehen den visuellen Aufbau von Webseiten. Sie scheitern nicht, wenn sich ein Button verschiebt oder die Farbe ändert.

  ### Anwendungsfälle

  1. **Lead-Generierung & Audit:** Zielgruppen scannen und Details sammeln.
  2. **Konkurrenz-Preismonitoring:** Marktveränderungen automatisch verfolgen.
  3. **Routine-Administration:** Rechnungen herunterladen und abgleichen.

  Nutzen Sie Browser-Automatisierung, um jede Woche Stunden manueller Arbeit zurückzugewinnen.
  `,
    'fekete-doboz-vege-glass-box': `
  ## Warum Transparenz in der KI entscheidend ist

  Das Hauptproblem ist oft nicht die Leistungsfähigkeit von KI, sondern das Vertrauen. Wenn nicht nachvollziehbar ist, *warum* ein System eine Entscheidung trifft, wird es kaum akzeptiert.

  ### Risiken der Black Box

  - Entscheidungen sind schwer prüfbar.
  - Teams vertrauen Ergebnissen weniger.
  - Regulatorik verlangt nachvollziehbare Erklärbarkeit.

  ### Unser Glass-Box-Ansatz

  Bei Brunella ist jeder wichtige Schritt sichtbar:

  1. **Live-Transparenz** über Denken und Handeln der Agenten.
  2. **Nachvollziehbare Entscheidungswege** für Analyse und Audit.
  3. **Mensch im Kontrollzentrum**, KI als Verstärker.

  Die Zukunft gehört Systemen, die nicht nur stark, sondern auch verantwortbar sind.
  `,
    'brunella-mi-csapatvezeto': `
  ## Brunella als KI-Teamlead

  Brunella ist kein reaktiver Assistent, sondern eine Orchestrierungsschicht, die komplexe Aufgaben planen, delegieren und steuern kann.

  ### Technische Bausteine

  - **ReAct-Loops**: erst denken, dann handeln.
  - **Reflexion**: Zwischenergebnisse prüfen und verbessern.
  - **Tree-of-Thought** für komplexe Entscheidungen.
  - **Konstitutionelle Leitplanken** für sichere Ausführung.

  ### Geschäftlicher Nutzen

  Schnellere Umsetzungszyklen, weniger Reibungsverluste und bessere Transparenz in funktionsübergreifenden Prozessen.
  `,
    'digitalis-lenyomat-anatomiaja': `
  ## Digitaler Fußabdruck als operativer Vorteil

  Ein digitaler Fußabdruck ist mehr als Identität — er ist eine Ausführungskarte aus Konten, Tools, Repositories und Arbeitsmustern.

  ### Warum das wichtig ist

  - Besserer Kontext erzeugt bessere KI-Unterstützung.
  - Klare Identitätsgrenzen reduzieren Risiken.
  - Strukturierte Wissensbasis ermöglicht proaktive Hilfe.

  Brunella nutzt dieses Modell, um Empfehlungen auf reale Ziele und Umgebungen auszurichten.
  `,
    'bevezeto-a-mesterseges-intelligencia-vilagaba': `
  ## Praktische Einführung in KI

  KI-Systeme sind Wahrscheinlichkeitsmaschinen. Die Qualität der Ergebnisse hängt stark von Kontext und klaren Anweisungen ab.

  ### Grundlagen

  1. **Neuronale Modelle** erkennen Muster und erzeugen Ausgaben.
  2. **Prompt Engineering** definiert Rolle, Aufgabe, Format und Kontext.
  3. **Menschliche Prüfung** bleibt bei kritischen Entscheidungen unverzichtbar.

  ### Fazit

  Nutzen Sie KI als Co-Pilot: maschinelle Skalierung plus menschliches Urteilsvermögen.
  `,
    'brunella-strategiai-white-paper': `
  ## Strategiewechsel: von Projekten zu Produkten

  Der Markt für KI-Agenten entwickelt sich schnell. Für langfristige Wettbewerbsfähigkeit braucht es skalierbare, produktisierte Liefermodelle.

  ### Der zentrale Wandel

  Von ad-hoc Projekten zu einer wiederholbaren KI-Betriebslogik, in der BAS eine Plattformfähigkeit ist.

  ### Ergebnis

  - Höhere Reproduzierbarkeit und Qualität.
  - Bessere Wirtschaftlichkeit.
  - Schnellere Innovation bei kontrolliertem Risiko.
  `,
    'az-ido-a-legertekesebb-valuta': `
  ## Zeit ist die wichtigste Währung

  Im modernen Geschäft ist Geschwindigkeit kein Bonus, sondern Voraussetzung. Marktzugang, Kampagnen-Timing und Entscheidungsdauer beeinflussen direkt das Ergebnis.

  ### Was KI liefern sollte

  Nicht nur Automatisierung, sondern **zurückgewonnene Zeit** für Strategie, Innovation und Führung.

  Wenn aus 40 Stunden 40 Minuten werden, entsteht Wert weit über reine Kosteneffizienz hinaus.
  `,
    'brunella-agent-system-mukodese': `
  ## BAS unter der Haube

  BAS ist eine Multi-Agent-Architektur: Ein Orchestrator zerlegt Aufgaben und delegiert sie an spezialisierte Agenten.

  ### Kernbausteine

  - **Orchestrator** für Aufteilung und Routing.
  - **Spezialisten** (Recherche, Coding, Analyse).
  - **Reasoning- und Reflexionsschleifen** mit Validierung.

  So kann BAS Workflows lösen, die klassische Einzelinteraktionen mit LLMs nicht zuverlässig abdecken.
  `,
    },
  };

function stripIndent(str) {
  if (!str) return '';
  const match = str.match(/^[ \t]*(?=\S)/gm);
  if (!match) return str;
  const min = Math.min(...match.map(x => x.length));
  const re = new RegExp(`^[ \\t]{${min}}`, 'gm');
  return min > 0 ? str.replace(re, '') : str;
}

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
  const resolvedParams = await params;
  const slug = resolvedParams?.slug ?? '';
  const headerStore = await headers();
  const headerLang = headerStore.get('x-site-language');
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
  const resolvedParams = await params;
  const slug = resolvedParams?.slug ?? '';
  const headerStore = await headers();
  const headerLang = headerStore.get('x-site-language');
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
    notFound();
  }

  const localizedBody =
    language === 'hu'
      ? stripIndent(String(post.content ?? '').trim())
      : stripIndent(localizedLongformBodies[language]?.[slug] ?? `\n## ${post.title}\n\n${post.excerpt}\n`);

  const renderedContent = await renderMarkdownToHtml(localizedBody);

  return (
    <div className="min-h-screen bg-transparent text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify((() => {
            const canonicalUrl = `https://www.pohankaestarsa.com${prefix}/blog/${slug}`;
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
                url: 'https://www.pohankaestarsa.com',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://www.pohankaestarsa.com/images/logo.png'
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
                  item: 'https://www.pohankaestarsa.com/'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Blog',
                  item: `https://www.pohankaestarsa.com${prefix}/blog`
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
                  __html: DOMPurify.sanitize(renderedContent),
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