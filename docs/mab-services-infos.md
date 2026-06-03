# MAB Services - Site Web Complet
## Spécification Complète du Site / Website Specification

**Purpose of this document:** This file contains all content, structure, and design information from the existing MAB Services website. It serves as a complete reference for recreating the website with a professional design using Claude Code.

---

## 1. CONTEXTE DE L'INDUSTRIE / INDUSTRY CONTEXT

### Secteur: Services Financiers et Assurance de Personnes au Canada

**Réglementation:**
- Le domaine est fortement réglementé au Canada. Au Québec, les conseillers en sécurité financière doivent être autorisés par l'Autorité des marchés financiers (AMF). En Ontario, les courtiers en assurance de personnes sont réglementés par la Financial Services Regulatory Authority of Ontario (FSRA).
- Un numéro d'agrément professionnel unique est requis pour exercer.
- Le site doit respecter les règles de publicité et de présentoir de l'AMF et de la FSRA.

**Public cible:**
- Particuliers résidant au Québec et en Ontario
- Jeunes familles cherchant à protéger leurs proches et épargner
- Professionnels en début ou milieu de carrière planifiant leur retraite
- Propriétaires d'entreprise cherchant une protection et optimisation fiscale

**Tendances du secteur en 2025-2026:**
- Digital-first: Les clients s'attendent à une présence web professionnelle avec formulaire de contact en ligne
- Transparance et éducation: Les sites les plus performants offrent du contenu éducatif (articles, FAQ, masterclass)
- Multi-tags: Présence sur LinkedIn, Facebook, Google My Business
- Mobile-first: La majorité des visites se font sur mobile
- Multilingue: Sites en français et anglais pour couvrir le marché canadien

**Compétition:**
- Courtiers indépendants locaux
- Grandes compagnies d'assurance (Desjardins, Sun Life, Manuvie)
- Conseillers travaillant dans des réseaux (Uniprix, Promutuel)

**Positionnement de MAB Services:**
- Courtier indépendant avec double agrément Québec/Ontario
- Approche personnalisée et transparente
- Focus sur l'éducation client (masterclass gratuites)
- Solutions sur mesure pour épargne, investissement et protection

---

## 2. IDENTITÉ DE MARQUE / BRAND IDENTITY

### Nom de la marque
**MAB Services**

### Titre complet
**Mohammed Amine BENZAKOUR**

### Slogan / Tagline
**"Votre confiance construit notre avenir"**
(Your trust builds our future)

### Titres professionnels
- Conseiller en sécurité financière - Québec
- Courtier en assurance de personnes - Ontario

### Logo
- Forme: Carré
- Couleur principale: Bleu-vert foncé (teal/dark blue, approximativement #1A475E ou similaire)
- Texte dans le logo: "MAB SERVICES" en majuscules
- Style: Minimaliste et professionnel
- Placement: Haut à gauche dans la barre de navigation

### Thème / Style visuel
- Thème Google Sites utilisé: **Diplomat**
- Couleurs du thème: Palette de bleu marine/bleu foncé
- Style général: Sobre, professionnel, financier
- Arrière-plan: Off-white / crème clair pour les cartes de contenu
- Couleurs d'accentuation: Vert pour les boutons de soumission, bleu pour les liens et boutons CTA
---

## 3. STRUCTURE DU SITE / SITE STRUCTURE

### Navigation
Le site comporte 6 pages accessibles via une barre de navigation horizontale:

1. **Accueil** (Home) - Page par défaut
2. **À Propos** (About) - Dans la nav principale
3. **Assurance et protection** - Dans la nav principale
4. **More** (Dropdown menu) contient:
    - **Epargne et investissement**
    - **Confidentialité** (Privacy Policy)
    - **Contact**

### Arbre de navigation
```
MAB Services
├── Accueil
├── À Propos
├── Assurance et protection
├── Epargne et investissement (dans More)
├── Confidentialité (dans More)
└── Contact (dans More)
```

---

## 4. PAGE: ACCUEIL / HOME

### 4.1 Header
- Logo MAB Services (gauche)
- Barre de navigation avec toutes les pages
- Tagline: "Votre confiance construit notre avenir"

### 4.2 Section Hero
**Titre principal:** MAB SERVICES
**Sous-titre:** Mohammed Amine BENZAKOUR
**Métiers:**
- CONSEILLER EN SÉCURITÉ FINANCIÈRE - QUÉBEC
- COURTIER EN ASSURANCE DE PERSONNES - ONTARIO

**Ligne de séparation** (règle horizontale)

**Description:**
Solutions sur mesure en **assurance vie, épargne et investissement** pour protéger vos proches et préparer votre avenir financier au Québec et en Ontario.

### 4.3 Section Services - Deux colonnes

**Colonne gauche: Épargne & Investissements**
Titre: **Épargne & Investissements**

Liste:
- **REER** – Régime enregistré d'épargne-retraite
- **CELI** – Compte d'épargne libre d'impôt
- **REEE** – Régime enregistré d'épargne-études
- **REEI** – Régime enregistré d'épargne-invalidité
- Investissements non enregistrés

**Colonne droite: Assurance & Protection**
Titre: **Assurance & Protection**

Liste:
- Assurance vie
- Assurance maladie grave
- Assurance soins de santé
- Assurance invalidité
- Assurance voyage

### 4.4 Section: Consultation Gratuite
**Titre:** Consultation Gratuite

**Formulaire de demande:**
Titre du formulaire: **Demande de Consultation Gratuite**

Champs:
1. **Nom:** (champ texte)
2. **Prénom:** (champ texte)
3. **Courriel:** (champ texte, type email)
4. **Téléphone:** (champ texte, type tel)
5. **Décrivez brièvement l'état d'avancement de vos projets financiers:** (zone de texte)
6. **Date et heure où vous préférez être contacté:** (champ texte avec placeholder "Ex: Lundi à 14h, ou 25 octobre en matinée")

**Bouton d'envoi:** "Envoyer ma demande" (style vert)
**Action:** Envoie un email à sales@mabservices-ca.com avec le sujet "Demande de Consultation Gratuite MAB Services"

### 4.5 Section: Inscription Masterclass Gratuite
**Titre:** Inscription Masterclass Gratuite

Champs:
1. **Nom:** (champ texte)
2. **Prénom:** (champ texte)
3. **Adresse mail:** (champ texte, type email)
4. **Téléphone:** (champ texte, type tel)
5. **Option choisie:** (boutons radio)
    - **Option 1:** Assister à la présentation épargne et investissement
    - **Option 2:** Assister à la présentation assurance vie, invalidité, accident et maladie
    - **Option 3:** Assister à l'ensemble de la présentation (option sélectionnée par défaut)

**Bouton d'inscription:** "S'inscrire à la Masterclass" (style bleu)
**Action:** Envoie un email à sales@mabservices-ca.com avec le sujet "Inscription Masterclass MAB Services"

---

## 5. PAGE: À PROPOS / ABOUT

**Titre de la page:** À propos de MAB SERVICES

### Contenu principal

**Paragraphe 1:**
**MAB SERVICES**, représenté par **Mohammed Amine BENZAKOUR**, courtier en assurance de personnes et conseiller en sécurité financière, offre ses services au Québec et en Ontario.

**Paragraphe 2:**
Il accompagne sa clientèle dans la recherche de solutions adaptées à leurs besoins personnels et familiaux, notamment en assurance vie ainsi qu'en matière d'épargne et d'investissement. Les stratégies d'épargne sont mises en place à travers des régimes enregistrés ou des solutions d'assurance vie.

**Paragraphe 3:**
Une approche visant à protéger les proches, à préparer l'avenir et à répondre à divers objectifs de sécurité financière est privilégiée. Elle repose sur une démarche simple, transparente et personnalisée, permettant à chaque client de choisir les solutions les mieux adaptées à sa situation.

---

## 6. PAGE: ASSURANCE ET PROTECTION / INSURANCE AND PROTECTION

**Titre de la page:** SOLUTIONS D'ASSURANCE ET PROTECTION

**Description introductive:**
Nous offrons une gamme complète de couvertures pour sécuriser votre patrimoine et protéger vos proches face aux imprévus.

### 6.1 Assurance vie temporaire
**Description:** Une protection flexible pour couvrir vos besoins financiers sur une période déterminée.

### 6.2 Assurance vie permanente
**Description:** Une couverture garantie pour toute la vie, incluant souvent une composante d'épargne ou de valeur de rachat.

### 6.3 Assurance invalidité
**Description:** Un remplacement de revenu essentiel si vous devenez incapable de travailler suite à un accident ou une maladie.

### 6.4 Assurance maladies graves
**Description:** Un versement forfaitaire libre d'impôt pour vous soutenir financièrement lors du diagnostic d'une maladie couverte.

**Note layout:** Tous ces éléments sont présentés dans un conteneur à bordure gauche stylisée (bordure gauche bleue foncée/teal, style "card" premium).

---

## 7. PAGE: ÉPARGNE ET INVESTISSEMENT / SAVINGS AND INVESTMENT

**Titre de la page:** RÉGIMES D'ÉPARGNE ET D'INVESTISSEMENT

**Description introductive:**
Découvrez les différents véhicules de placement pour optimiser votre fiscalité et atteindre vos objectifs financiers.

### 7.1 CELI – Compte d'épargne libre d'impôt
**Description:** Un régime qui permet de mettre de l'argent de côté à l'abri de l'impôt. Les gains de placement (intérêts, dividendes, gains en capital) réalisés dans un CELI ne sont pas imposables, même lors du retrait.

### 7.2 CELIAPP – Compte d'épargne libre d'impôt pour l'achat d'une première propriété
**Description:** Un régime conçu pour aider les particuliers à épargner pour l'achat de leur première habitation. Il combine les avantages du REER (cotisations déductibles d'impôt) et du CELI (retraits non imposables pour l'achat d'une maison).

### 7.3 REER – Régime enregistré d'épargne-retraite
**Description:** Un régime destiné principalement à l'épargne pour la retraite. Les cotisations sont déductibles de votre revenu imposable, ce qui réduit votre impôt à payer annuellement. L'impôt est reporté au moment du retrait des fonds.

### 7.4 REEE – Régime enregistré d'épargne-études
**Description:** Un compte de placement spécial utilisé par les parents pour épargner en vue des études postsecondaires d'un enfant. Ce régime donne accès à des subventions gouvernementales généreuses qui s'ajoutent à votre épargne.

### 7.5 REEI – Régime enregistré d'épargne-invalidité
**Description:** Un régime d'épargne qui aide les Canadiens vivant avec une déficience et leur famille à épargner pour assurer leur sécurité financière à long terme. Il permet également de bénéficier de bons et de subventions de l'État.

**Note layout:** Chaque section est présentée dans un conteneur à bordure gauche stylisée (bordure gauche bleue foncée/teal, style "card" premium).

---

## 8. PAGE: CONFIDENTIALITÉ / PRIVACY POLICY

**Titre de la page:** Politique de Confidentialité

### 8.1 Introduction
**MAB SERVICES** s'engage à assurer la protection de vos renseignements personnels recueillis au Québec et en Ontario.

### 8.2 Collecte des renseignements
**Titre de section:** Collecte des renseignements

Les données transmises via le formulaire de contact sont utilisées exclusivement par **Mohammed Amine BENZAKOUR** pour l'analyse de vos besoins financiers et la proposition de contrats d'assurance ou d'investissement.

### 8.3 Vos Droits
**Titre de section:** Vos Droits

Conformément aux lois en vigueur, vous disposez d'un droit d'accès et de rectification de vos données. Aucune information n'est transmise à des tiers sans votre consentement explicite.

---

## 9. PAGE: CONTACT

**Pas de titre de page formel**, mais le contenu est présenté dans une carte centrée.

### 9.1 Carte de contact
**En-tête:** MAB SERVICES

**Informations de contact:**
- **TÉLÉPHONE:** 613-261-4428
- **ADRESSE COURRIEL:** sales@mabservices-ca.com

### 9.2 Réseaux sociaux
**Titre:** SUIVEZ-NOUS
- **Facebook:** Icone Facebook cliquable (lien vers la page Facebook de MAB Services)

**Design:** La carte de contact a une bordure supérieure arrondie et stylisée bleue foncée, avec un fond off-white/crème clair. Le téléphone et email sont séparés par des lignes de séparation grises horizontales.

---


## 10. RECOMMANDATIONS DESIGN ET TECHNIQUES / DESIGN AND TECHNICAL RECOMMENDATIONS

### 10.1 Palette de couleurs recommandée

**Couleurs principales (basées sur le thème actuel):**
- **Bleu foncé primaire:** `#1A475E` (couleur du logo et de la nav)
- **Bleu marine:** `#0D2B38`
- **Bleu intermédiaire:** `#2C5F7A`
- **Bleu clair / accent:** `#4A90B8`

**Couleurs d'accentuation:**
- **Vert (boutons CTA):** `#2E7D32` ou `#388E3C`
- **Bleu (boutons secondaires):** `#1976D2`
- **Off-white / crème (fond cartes):** `#F8F6F2` ou `#FAF8F5`
- **Blanc:** `#FFFFFF`

**Couleurs neutres:**
- **Gris foncé (texte):** `#2D3748`
- **Gris moyen:** `#718096`
- **Gris clair (bordures/lignes):** `#E2E8F0`

### 10.2 Typographie recommandée

**Pour un look professionnel financier:**
- **Titres:** Une police sans-serif moderne et clean (Inter, Poppins, Montserrat, ou Roboto)
- **Corps de texte:** Une police très lisible (Inter, Open Sans, Source Sans Pro)
- **Échelle:** Titres H1: 2.5rem, H2: 2rem, H3: 1.5rem, corps: 1rem

### 10.3 Structure de layout

**Header/Navbar:**
-/navbar fixe ou sticky
- Logo à gauche, navigation à droite
- Responsive: hamburger menu sur mobile
- Fond blanc ou très clair, shadow subtil

**Section Hero (Accueil):**
- Grille 12 colonnes
- Titre centré, texte de présentation dans une carte
- Bordure gauche stylisée ou badge décoratif
- Fond off-white ou dégradé subtil

**Section Services (2 colonnes):**
- Grid 2x responsive (1x sur mobile)
- Cartes avec ombre portée légère
- Titres en couleur bleue foncée
- Listes à puces stylisées

**Section Forms:**
- Deux formulaires côte à côte ou en dessous l'un de l'autre
- Background différent (gris très clair ou beige clair) pour les distinguer
- Boutons colorés avec hover states

**Footer:**
- Peut être ajouté (pas présent dans la version actuelle)
- Liens de navigation, contact, réseaux sociaux
- Copyright et liens légaux

### 10.4 Fonctionnalités à implémenter

**Formulaires:**
- Validation client-side de tous les champs
- Placeholder text comme spécifié
- Boutons radio pour les options de masterclass
- Envoi via mailto (ou mieux: backend API pour un envoi propre)

**Navigation:**
- Dropdown menu "More" pour les pages secondaires
- Highlight de la page active
- Smooth scroll pour les ancres intra-page

**Responsive:**
- Mobile-first approach recommandé
- Breakpoints: 640px, 768px, 1024px, 1280px
- Toutes les cartes et grilles doivent empiler verticalement sur mobile

### 10.5 Stack technique recommandé pour Claude Code

**Option A - Next.js / React (Recommandée pour un site professionnel):**
- Framework: Next.js 14+ avec App Router
- Styling: Tailwind CSS ou styled-components
- Déploiement: Vercel
- Avantages: SEO optimal, performance, facile à maintenir

**Option B - HTML/CSS/JS pur:**
- HTML5 sémantique
- CSS moderne (Flexbox, Grid, CSS variables)
- Vanilla JS pour les interactions
- Déploiement: Netlify, Vercel, ou hébergement traditionnel
- Avantages: Simplicité, pas de dépendances

**Option C - Astro avec React:**
- Framework: Astro pour le contenu statique + React pour les composants interactifs (formulaires)
- Déploiement: Netlify ou Vercel
- Avantages: Performance maximale, SEO excellent

### 10.6 Optimisations à prévoir

- **SEO:** Balises meta complètes, Open Graph tags, sitemap.xml, robots.txt
- **Performance:** Images optimisées (WebP), lazy loading, minification CSS/JS
- **Accessibilité:** Attributs ARIA, contrastes de couleur suffisants (WCAG AA), navigation au clavier
- **Analytics:** Google Analytics 4 ou Plausible
- **SSL:** HTTPS obligatoire (standard pour tous les hébergements modernes)
- **Compliance AMF/FSRA:** Page de disclosure, numéro d'agrément visible, avertissements réglementaires si nécessaire

### 10.7 Éléments manquants à envisager d'ajouter

Pour un site financier professionnel complet, envisagez d'ajouter:
- **FAQ** section sur chaque page de service
- **Témoignages clients** (avec accord)
- **Blog** ou section articles éducatifs
- **Page profil** avec photo professionnelle du conseiller
- **Google My Business** integration / carte
- **Disclaimer réglementaire** dans le footer
- **Version anglaise** du site ( Anglais/Français switcher )
- **Chatbot** ou live chat pour les consultations rapides

---

## 11. RÉSUMÉ DES PAGES / PAGE SUMMARY TABLE

| Page | URL suggérée | Titres de sections | Éléments clés |
|------|-------------|-------------------|---------------|
| Accueil | `/` ou `/accueil` | Hero, Services (2 col), Consultation Gratuite, Masterclass | 2 formulaires |
| À Propos | `/a-propos` | Contenu principal (3 paragraphes) | Texte seulement |
| Assurance et protection | `/assurance-protection` | Intro + 4 sections (vie temp, vie perm, invalidité, maladies graves) | Cartes à bordure gauche |
| Épargne et investissement | `/epargne-investissement` | Intro + 5 sections (CELI, CELIAPP, REER, REEE, REEI) | Cartes à bordure gauche |
| Confidentialité | `/confidentialite` | Intro, Collecte, Droits | Texte seulement |
| Contact | `/contact` | Carte contact (tel, email, Facebook) | Informations statiques |

---

## 12. CONTACTS ET INFORMATIONS TECHNIQUES

- **Email:** sales@mabservices-ca.com
- **Téléphone:** 613-261-4428
- **Facebook:** À compléter avec le lien exact
- **Conseiller:** Mohammed Amine BENZAKOUR
- **Agrément Québec:** Conseiller en sécurité financière (AMF)
- **Agrément Ontario:** Courtier en assurance de personnes (FSRA)

---

*Document généré le 2 juin 2026 à partir du site Google Sites MAB Services.*
*Ce document contient l'intégralité du contenu et de la structure du site pour servir de référence complète à la reconstruction avec un design professionnel.*