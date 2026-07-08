export const navLinks = [
  { href: '#expertise', label: 'Expertise' },
  { href: '#solutions', label: 'Solutions' },
  { href: '#technologie', label: 'Technologie' },
  { href: '#realisations', label: 'Réalisations' },
  { href: '#equipements', label: 'Équipements' },
  { href: '#qualite', label: 'Qualité' },
  { href: '#contact', label: 'Contact' },
]

export const systemStatus = [
  { label: 'Rail Inspection', status: 'online' },
  { label: 'Welding System', status: 'online' },
  { label: 'Surface Restoration', status: 'online' },
  { label: 'Quality Control', status: 'online' },
  { label: '24 Months Warranty', status: 'online' },
]

export const missions = [
  {
    id: '01',
    title: 'Réparation des rails',
    description:
      'Rechargement par soudage MIG-MAG / CMT et hardfacing pour restaurer la section de rail usée sans remplacement complet.',
    before: ['Fissures', 'Usure gorge', 'Défauts surface'],
    after: ['Section restaurée', 'Durée de vie prolongée', 'Conformité roue/rail'],
  },
  {
    id: '02',
    title: 'Restauration des appareils de voie',
    description:
      'Intervention sur lames d\'aiguilles, cœurs de croisement et zones critiques pour garantir le bon fonctionnement des ADV.',
    before: ['Usure lames', 'Zones critiques', 'Défauts géométrie'],
    after: ['ADV optimisés', 'Passage sécurisé', 'Maintenance différée'],
  },
  {
    id: '03',
    title: 'Maintenance préventive',
    description:
      'Meulage correctif et préventif des rails à gorge, contrôle thermique et planification pour éviter les arrêts imprévus.',
    before: ['Vibrations', 'Usure progressive', 'Risque rupture'],
    after: ['Profil optimisé', 'Vie rail +24 mois', 'Coûts maîtrisés'],
  },
]

export const solutions = [
  {
    title: 'Rechargement des rails',
    desc: 'Soudage CMT haute précision avec contrôle thermique et rechargement dur.',
  },
  {
    title: 'Meulage de précision',
    desc: 'Meulage correctif et préventif des rails à gorge pour profil optimal.',
  },
  {
    title: 'Appareils de voie',
    desc: 'Rénovation des lames d\'aiguilles et zones critiques roue/rail.',
  },
]

export const technologies = [
  {
    id: 'laser',
    title: 'Vision Laser 2D/3D',
    subtitle: 'Analyse précise des défauts',
    description:
      'Scan laser haute résolution pour détecter fissures, usures et défauts géométriques avant intervention.',
    icon: 'scan',
  },
  {
    id: 'cnc',
    title: 'CNC Precision',
    subtitle: 'Usinage contrôlé',
    description:
      'Installation mobile automatisée CNC pour usinage et préparation de surface avec répétabilité industrielle.',
    icon: 'cpu',
  },
  {
    id: 'cmt',
    title: 'CMT Welding',
    subtitle: 'Rechargement haute précision',
    description:
      'Soudage MIG-MAG / CMT avec torche automatisée, préchauffage contrôlé et rechargement dur (hardfacing).',
    icon: 'flame',
  },
]

export const timelineSteps = [
  { step: '01', title: 'Détection du défaut', desc: 'Inspection visuelle et scan laser 2D/3D' },
  { step: '02', title: 'Analyse', desc: 'Évaluation technique et plan d\'intervention' },
  { step: '03', title: 'Préparation du rail', desc: 'Nettoyage, usinage CNC si nécessaire' },
  { step: '04', title: 'Préchauffage', desc: 'Contrôle thermique pour conditions optimales' },
  { step: '05', title: 'Rechargement', desc: 'Soudage CMT et hardfacing de précision' },
  { step: '06', title: 'Contrôle qualité', desc: 'Vérification géométrique et garantie 24 mois' },
]

export const equipment = [
  { name: 'Unité mobile CNC', spec: 'Usinage automatisé terrain' },
  { name: 'Système vision laser', spec: 'Scan 2D/3D haute précision' },
  { name: 'Torche CMT automatisée', spec: 'Rechargement contrôlé' },
  { name: 'Meuleuses rail', spec: 'Profilage gorge correctif' },
  { name: 'Contrôle thermique', spec: 'Préchauffage régulé' },
]

export const assistantSteps = [
  {
    id: 'infrastructure',
    question: 'Quel type d\'infrastructure ?',
    options: ['Rail ferroviaire', 'Tramway', 'Appareil de voie', 'Autre'],
  },
  {
    id: 'problem',
    question: 'Quel type de problème constatez-vous ?',
    options: ['Usure / fissure', 'Défaut gorge', 'Lame d\'aiguille', 'Maintenance préventive', 'Urgence'],
  },
  {
    id: 'urgency',
    question: 'Quel est le niveau d\'urgence ?',
    options: ['Immédiat (< 48h)', 'Planifié (< 2 semaines)', 'Maintenance programmée', 'Étude / devis'],
  },
  {
    id: 'location',
    question: 'Localisation de l\'intervention ?',
    type: 'text' as const,
    placeholder: 'Ville, ligne, PK ou référence chantier',
  },
  {
    id: 'details',
    question: 'Détails complémentaires (photos, références) ?',
    type: 'textarea' as const,
    placeholder: 'Décrivez le défaut observé, références techniques...',
  },
]
