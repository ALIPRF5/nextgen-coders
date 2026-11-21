# Supabase — setup manuel

Le site fonctionne sans Supabase : les demandes du formulaire sont enregistrées
dans la base **SQLite locale** (`data/nextgen.sqlite`, voir le README) et les
événements viennent de `src/data/events.js`. Pour envoyer les demandes dans
Supabase (nécessaire sur un hébergement statique) et lire les événements depuis
la base, suis ces étapes (environ 10 minutes, gratuit).

## 1. Créer le projet

1. Va sur [supabase.com](https://supabase.com) → **New project**.
2. Choisis la région la plus proche (une région EU, par exemple Paris ou Francfort).
3. Note le mot de passe de la base (garde-le dans un gestionnaire de mots de passe).

## 2. Créer les tables

1. Dans le dashboard : **SQL Editor** → **New query**.
2. Colle tout le contenu de [`supabase/schema.sql`](./schema.sql) → **Run**.
3. Vérifie dans **Table Editor** que `join_requests` et `events` existent,
   et que les 6 événements actuels sont là.

Le script active **Row Level Security** :

- `join_requests` : insertion ouverte à tous, lecture réservée aux utilisateurs connectés (admins).
- `events` : lecture publique, écriture réservée aux admins.

## 3. Créer l'admin (sans inscription publique)

1. **Authentication → Sign In / Providers → Email** : désactive
   **Allow new users to sign up**. Comme ça, personne ne peut créer de compte
   depuis le site (il n'y a d'ailleurs aucun écran d'inscription).
2. **Authentication → Users → Add user** : crée l'admin (email + mot de passe).
   Coche l'email comme confirmé si l'option est proposée.
3. C'est ce compte qui pourra lire les demandes d'adhésion. Il n'y a pas
   encore d'écran admin : lis les demandes dans **Table Editor → join_requests**
   (le dashboard utilise la clé service_role, qui ne doit jamais sortir de là).

## 4. Brancher le frontend

1. **Project Settings → API** : copie **Project URL** et la clé **anon public**.
2. À la racine du projet, copie `.env.example` en `.env` et remplis :

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_SITE_URL=https://nextgen-coders.vercel.app
```

3. Relance `npm run dev`. Sur la page **Rejoindre**, le bandeau « base de
   données locale » disparaît : le formulaire écrit maintenant dans Supabase.
4. Envoie une demande depuis le site, puis vérifie la ligne dans
   **Table Editor → join_requests**.

> La clé `anon` est publique par design. La clé `service_role` ne doit JAMAIS
> apparaître dans le frontend, dans `.env` local, ni dans un message.

## 5. Tester que RLS protège vraiment

Dans le **SQL Editor** :

```sql
-- Un visiteur anonyme ne doit voir AUCUNE demande d'adhésion.
set role anon;
select count(*) from public.join_requests; -- résultat attendu : 0
reset role;
```

Si le compte renvoie les lignes, la policy de lecture est mal configurée :
vérifie que RLS est bien activé (`rowsecurity = true`) et qu'il n'existe pas
de policy `select` pour `anon`.

## 6. Gérer les événements

Dans **Table Editor → events** :

- `status` : `upcoming` ou `past`.
- `facts` : tableau JSON, par exemple
  `[{"value":"6","label_fr":"équipes","label_en":"teams"}]`.
- `badge_top` / `badge_bottom` : le petit bloc date affiché en haut de la carte
  (ex. `AVR.` / `2027`).
- Les champs `_en` sont optionnels : si vides, le site affiche le français.

Si la table est vide ou inaccessible, le site garde les événements locaux —
aucune page cassée.

## Ce qui reste manuel (assumé)

- Créer le projet et l'admin.
- Lire les demandes (dashboard, pas d'interface admin pour l'instant).
- Écrire les événements (dashboard, tant qu'il n'y a pas d'écran admin).
