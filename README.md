# NEXTGEN CODERS — site officiel

Site du club de programmation **NEXTGEN CODERS** de l'EST Laâyoune.
Canvas blanc en papier pointillé, encre presque noire et or du logo `#FEA901` en accent principal, dans un langage visuel de club (titres serif, cartes colorées, ombres dures, polaroids) inspiré de hackclub.com/clubs : le layout de Hack Club, les couleurs de NEXTGEN CODERS. Titres en Fraunces, texte en Inter, mode sombre disponible, mobile d'abord, français avec bascule anglais.

**« Code smarter, not harder. »**

## Ce qui est inclus

- 8 pages : Accueil, À propos, Parcours, Événements, Galerie, Bureau, Rejoindre,
  Contact + page 404.
- Formulaire d'adhésion validé côté client. Sans Supabase, chaque demande est
  enregistrée dans une base SQLite locale (`data/nextgen.sqlite`) via
  `POST /api/join` ; avec les clés Supabase, elle part dans Supabase (RLS).
- Liste d'événements lue depuis Supabase quand elle est configurée, avec
  repli sur les données locales.
- Bascule FR / EN mémorisée dans le navigateur.
- Vraies photos du club (intégration, hackathon santé, Best Website Competition,
  atelier n8n, Computer Day, rencontre Bank of Africa) et vrai logo, optimisés en
  WebP (chaque image < 200 Ko) dans `public/images/`. La page Galerie rassemble
  16 photos filtrables par type d'événement.
- Bureau de 6 membres : Ali El Amrani (président), Issam Brahmi (vice-président),
  Anas Errafiq (RH), Chaima Labsiri (secrétaire générale), Nezha Azizi
  (communauté et réseaux sociaux) et Adnan El Idrissi (photographe).
  Chaque membre a son portrait dans la carte dorée de la page Bureau
  (`public/images/board/`, recadré depuis le dossier `BOARD PHOTOS`).
- Chiffres affichés sur la page Bureau : 115 membres, 190 followers Instagram et
  69 followers LinkedIn (chiffres fournis par le club).
- SEO : titres et descriptions uniques, Open Graph, canonical, `sitemap.xml`,
  `robots.txt`, image OG 1200×630 construite avec le logo du club.
- Accessibilité : labels, champs en fieldsets, focus visibles, lien d'évitement,
  contrastes, respect de `prefers-reduced-motion`.
- 40 cas de test Playwright sur deux tailles d'écran (390×844 et 1280×800).
  Sans Supabase : 37 réussis, 3 ciblés par écran. Avec Supabase configuré :
  35 réussis, 5 ignorés (les 2 tests d'écriture SQLite ne s'appliquent plus).

## Démarrer

```bash
npm install
copy .env.example .env   # PowerShell ; ou cp sur macOS/Linux
npm run dev
```

Le site tourne sans `.env` : le formulaire enregistre les demandes dans la base
SQLite locale et les événements viennent de `src/data/events.js`.

### Variables d'environnement

| Variable | Rôle |
| --- | --- |
| `VITE_SUPABASE_URL` | URL du projet Supabase |
| `VITE_SUPABASE_ANON_KEY` | Clé **anon** publique (jamais `service_role`) |
| `VITE_SITE_URL` | URL publique, utilisée pour canonical / OG |
| `JOIN_DB_PATH` | *(optionnel, variable du shell)* chemin du fichier SQLite |

La configuration Supabase complète est dans [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md).

### Base de données locale du formulaire

Sans clés Supabase, chaque demande envoyée depuis `/join` est enregistrée dans
`data/nextgen.sqlite`. La table `join_requests` ne contient que les informations
du formulaire : `name`, `email`, `track`, `level`, `message` et `created_at`.

```bash
npm run join:list                 # les 50 dernières demandes
npm run join:list -- --limit 200  # en afficher davantage
npm run join:export               # CSV dans data/join-requests-AAAA-MM-JJ.csv
npm run join:export -- --out data/demandes.csv
```

La base et le dossier `data/` sont créés au premier envoi et ignorés par Git.
Le serveur Vite expose `POST /api/join` en développement **et** avec
`npm run preview`. Sur un hébergement 100 % statique (Vercel), ce point d'entrée
n'existe pas : utilise Supabase pour la production.

## Scripts

```bash
npm run dev        # serveur local Vite + API /api/join
npm run build      # build de production dans dist/
npm run preview    # prévisualiser le build (avec l'API locale)
npm test           # tests Playwright (mobile + desktop)
npm run images     # régénérer les WebP depuis les dossiers photos du club
npm run og         # régénérer l'image Open Graph 1200×630
npm run join:list  # lire les demandes enregistrées en local
npm run join:export # exporter ces demandes en CSV
```

`npm run images` lit le logo et les dossiers `PHOTOS OF …` à la racine du
projet. Si les originaux sont ailleurs :

```bash
node scripts/optimize-images.mjs --assets "C:\chemin\vers\NEXT GEN CODERS FILE"
```

Les tests utilisent Microsoft Edge déjà installé (`channel: 'msedge'`) pour ne
pas télécharger un navigateur. Si tu préfères Chromium : `npx playwright install chromium`
puis retire `channel` dans `playwright.config.js`.

## Structure

```text
src/
  components/     Navbar, Footer, JoinForm, TrackCard, EventCard, CtaBand, SEO…
  data/           parcours, événements, galerie, timeline, infos du club (FR + EN)
  i18n/           dictionnaires fr.js / en.js et provider de langue
  lib/            client Supabase, envoi du formulaire, contexte événements
  pages/          une page par route
server/              API /api/join et stockage SQLite (node:sqlite)
scripts/join-admin.mjs  lecture et export CSV des demandes
data/                base locale nextgen.sqlite (créée à la volée, ignorée par Git)
supabase/schema.sql   tables, contraintes, RLS, données d'exemple
tests/                tests Playwright
public/               favicons, robots.txt, sitemap.xml, og-image.png, images/ (WebP)
```

Les textes visibles vivent dans `src/data/` et `src/i18n/`, pas dans la logique.
Les chiffres et dates viennent du brief `DEEPSEEK.md` : 31 participants / 9 projets
/ 48 h (hackathon santé, 28–29 octobre 2026), 50 participants (atelier n8n),
6 équipes / 25 participants (hackathon d'avril, date à confirmer).

## Photos et logo

Les originaux restent dans les dossiers `LOGO OF THE CLUB/` et `PHOTOS OF …/`.
`scripts/optimize-images.mjs` en produit les versions du site :

| Fichier | Usage |
| --- | --- |
| `logo-mark.png`, `favicon-*.png`, `apple-touch-icon.png` | logo réel (emblème détouré) |
| `hero-club.webp` / `hero-club-sm.webp` | photo de l'image Open Graph (et réserve) |
| `home-about.webp` | photo large à côté de l'histoire du club |
| `about-team.webp`, `about-stage.webp`, `about-partners.webp` | portraits et rencontres |
| `gallery-*.webp` | photos supplémentaires de la page Galerie |
| `event-*.webp` | vignettes 16:10 des événements |
| `upcoming-hackathon.webp` | visuel du hackathon d'avril 2027 |

Chaque image est recadrée, passée en WebP et pèse moins de 200 Ko. Les textes
alternatifs FR / EN sont dans `src/data/events.js`, `src/data/gallery.js` et
`src/i18n/`.

## Déploiement (Vercel, gratuit)

Le dépôt est sur GitHub : <https://github.com/ALIPRF5/nextgen-coders>.
`.env` et `data/` sont ignorés par Git, donc aucun secret n'est poussé.

1. Sur Vercel : **Add New → Project**, importe `ALIPRF5/nextgen-coders`.
2. Nom du projet : `nextgen-coders-rho` (l'URL obtenue est
   <https://nextgen-coders-rho.vercel.app>, celle utilisée dans
   `VITE_SITE_URL`, le sitemap et les balises canonical). Attention :
   `nextgen-coders.vercel.app` appartient à un autre site, ne pas l'utiliser.
3. Preset **Vite**, Root `./`, Build `npm run build`, Output `dist`.
4. Ajoute ces variables pour **Production, Preview et Development** :
   - `VITE_SUPABASE_URL` = `https://gjkubpotihnrkjyoeupw.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = la clé « publishable » (Supabase → Project
     Settings → API Keys ; la même valeur que dans ton `.env` local)
   - `VITE_SITE_URL` = `https://nextgen-coders-rho.vercel.app`
5. Déploie. Ensuite chaque `git push` sur `main` redéploie tout seul
   (Vercel Git integration) ; les autres branches donnent des URLs de preview.
6. Ouvre l'URL sur téléphone et ordinateur, puis envoie une vraie demande
   d'adhésion pour vérifier la ligne dans Supabase.
7. Le fichier `vercel.json` ajoute le rewrite SPA (toutes les routes vers
   `index.html`) pour que `/about` fonctionne aussi après un rafraîchissement.
8. Si tu changes de domaine, mets à jour `VITE_SITE_URL`, `public/sitemap.xml`,
   `public/robots.txt` et les URLs dans `index.html` (OG / canonical).
   L'image OG se régénère avec `npm run og`.

## Limites assumées

- Les photos fournies sont utilisées telles quelles, sans retouche mensongère ;
  les cadrages sont faits pour le web. Aucune photo d'événement n'est générée.
- Le visuel du hackathon d'avril 2027 est une affiche typographique, pas une
  photo d'un événement qui n'a pas encore eu lieu.
- Pas d'écran admin : les demandes se lisent avec `npm run join:list` ou
  s'exportent en CSV avec `npm run join:export` (Supabase Table Editor si
  Supabase est configuré).
- L'événement d'avril 2027 est marqué « date à confirmer » — aucune date exacte
  n'a été inventée.
- Les tests automatisés vérifient l'écriture réelle dans la base SQLite locale
  (puis suppriment la ligne de test) et la validation du formulaire ; le test
  d'écriture locale est ignoré quand Supabase est configuré.

## Skills pack

Le dossier `.agents/skills/` et le brief `DEEPSEEK.md` sont conservés tels quels :
ils décrivent le projet, le design system, le frontend, le backend, les tests, le
déploiement et le SEO. Ce site est leur implémentation.
