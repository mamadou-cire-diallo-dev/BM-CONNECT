import { User, Store, Wrench, CheckCircle,SearchCheck, Droplets, Snowflake, Plug2, Fan, SearchCode, Phone, Filter        , CalendarClock  , MapPin , Navigation,ShieldCheck  ,Star , MessageSquare, Clock   } from 'lucide-react';

export const featuresData = [
    {
        icon: <Droplets className="w-6 h-6 text-white" />,
        title: 'Plomberie',
        desc: ' Des fuites aux installations complètes, nos plombiers certifiés interviennent rapidement pour sécuriser votre eau et votre confort.',
        detail: ['Réparation de fuites, robinetterie, toilettes, canalisations bouchées.','Interventions à domicile et en entreprise, 7j/7 selon disponibilité des techniciens','Devis clair avant chaque intervention, suivi et historique dans votre espace client.']
    },
    {
        icon: <Plug2 className="w-6 h-6 text-white" />,
        title: 'Electricité',
        desc: ' Une électricité sûre, stable et conforme aux normes pour protéger votre famille, vos équipements et votre activité.',
        detail: ['Dépannage de pannes, courts-circuits, prises et éclairage.','Installation et mise aux normes de tableaux électriques et protections.','Techniciens qualifiés, traçabilité des interventions et conseils de sécurité.']

    },
    {
        icon: <Snowflake className="w-6 h-6 text-white" />,
        title: 'Climatisation',
        desc: 'Restez au frais toute l’année grâce à des climatiseurs bien entretenus et des techniciens spécialisés',
        detail: ['Installation, entretien et réparation de climatiseurs et groupes de froid.','Nettoyage, recharge gaz, optimisation de la consommation électrique.','Interventions programmées ou urgentes, avec suivi de vos équipements.']

    }
];

export const trouveServicesData = [
    {
        name:'services',
        desc:'Choisir un service',
        option:['plomberie','électricité','climatisation'],
        icon: <SearchCheck className="w-6 h-6 text-[#f26f0e] " />,
    },
    {
        name:'lieu',
        desc:'Choisir le lieu',
        option:['Conakry','Mamou','Kindia','Labé','Dalaba'],
        icon: <MapPin className="w-6 h-6 text-[#f26f0e]" />,
    },
    {
        name:'prix',
        desc:'Filtrer par prix',
        option:['100.000gnf','50.000gnf','200.000gnf'],
        icon: <Filter className="w-6 h-6 text-[#f26f0e]" />,
    }
]
export const heureOuvertureData = [
    {
        icon: <CheckCircle className="w-4 h-4 text-[#f26f0e]" />, 
        jours:'Lundi - Vendredi',
        heure: '8h00 - 18h00',
    },
    {
        icon: <CheckCircle className="w-4 h-4 text-[#f26f0e]" />, 
        jours:'Samedi',
        heure: '9h00 - 16h00',
    },
    {
        icon: <Clock className="w-4 h-4 text-gray-500" />, 
        jours:'Dimanche',
        heure: 'Fermé',
    },
]
export const prestatairesDispo = [
    {
        prenom:'Mouctar',
        image:'/images/mKourouma.webp',
        nom:'Barry',
        fonctions:['plomberie','climatisation'],
        specialiste:'Plomberie',
        evaluation:4.8,
        lieu:'Kaloum, Conakry',
        status:1 ,
        prix_diagnostic:50000
    },
    {
        prenom:'Mamadou Cire',
        nom:'DIALLO',
        image:'/images/mCisse.jpg',
        fonctions:['Electricité','climatisation'],
        specialiste:'Electricité',
        evaluation:4.8,
        lieu:'Petel, Mamou',
        status:1 ,
        prix_diagnostic:100000
    },
    {
        prenom:'Issaga',
        nom:'DIALLO',
        image:'/images/mMamadou.avif',
        fonctions:['climatisation'],
        specialiste:'Climatisation',
        evaluation:4.1,
        lieu:'Centre, Dalaba',
        status:0 ,
        prix_diagnostic:30000
    },
    {
        prenom:'Aissatou Bobo ',
        nom:'DIALLO',
        image:'/images/groupeMaintenancier.png',
        fonctions:['plomberie','electricité'],
        specialiste:'electricité',
        evaluation:5.1,
        lieu:'Abbatoir, Kindia',
        status:0 ,
        prix_diagnostic:50000
    },
    {
        prenom:'Alpha Oumar',
        nom:'BALDE',
        image:'/images/groupeMaintenancierReel.png',
        fonctions:['plomberie'],
        specialiste:'plomberie',
        evaluation:5.1,
        lieu:'Kaloum, Conakry',
        status:0 ,
        prix_diagnostic:50000
    },
    {
        prenom:'Mariame',
        nom:'DIANE',
        image:'/images/groupeMaintenancier.png',
        fonctions:['electricité','climatisation'],
        specialiste:'Climatisation',
        evaluation:4.8,
        lieu:'Ratoma, Conakry',
        status:1 ,
        prix_diagnostic:100000
    },
]

export const ValeurData = [
    {
        icon: <Filter className="w-6 h-6 text-white" />,
        title: 'Recherche',
        desc:'Trouvez rapidement des prestataires qualifiés près de chez vous',
        codeCouleur:'#2563EB',
        degrade:'#60A5FA'
    },
    {
        icon: <CalendarClock className="w-6 h-6 text-white" />,
        title: 'Réservation en temps réel',
        desc: ' Planifiez vos interventions selon les disponibilités ',
        codeCouleur:'#7C3AED',
        degrade:'#C4B5FD'
    },
    {
        icon: <MapPin className="w-6 h-6 text-white" />,
        title: 'Géolocalisation',
        desc: "Suivez l'arrivée de votre technicien en direct",
        codeCouleur:'#16A34A',
        degrade:'#4ADE80'
    },
     {
        icon: <ShieldCheck className="w-6 h-6 text-white" />,
        title: 'Paiements sécurisés',
        desc: "Mobile Money, cartes bancaires et paiements échelonnés   ",
         codeCouleur:'#0F172A',
        degrade:'#3b5c89ff'
    },
     {
        icon: <Star className="w-6 h-6 text-white" />,
        title: 'Evaluation & Avis',
        desc: "Consultez les notes et commentaires des clients",
        codeCouleur:'#7C3AED',
        degrade:'#FDE047'
    },
     {
        icon: <MessageSquare className="w-6 h-6 text-white" />,
        title: 'Notifications SMS',
        desc: "Restez informé par SMS même sans smartphone",
         codeCouleur:'#0EA5E9',
        degrade:'#7DD3FC'
    }
];

export const optionsConnexion = [
    {
        icon: <User className="w-10 h-10 text-[#f26f0e] " />,
        title: 'Client',
        type:'Client',
        desc:'Réserver des services de maintenance',
        codeCouleur:'#0F172A',
        degrade:'#3f7accff'
    },
    {
        icon: <Wrench className="w-10 h-10 text-[#f26f0e] " />,
        title: 'Prestataire',
        type:'Prestataire',
        desc: ' Offrir des services de maintenance ',
        codeCouleur:'#0F172A',
        degrade:'#3f7accff'
    },
    {
        icon: <Store className="w-10 h-10 text-[#f26f0e] " />,
        title: 'Vendeur',
        type:'Vendeur',
        desc: "Vendre des pièces détachées",
        codeCouleur:'#0F172A',
        degrade:'#3f7accff'
    },
    
];

export const contactData = [
     {
        icon: <Phone className="w-6 h-6 text-white" />,
        title: 'Téléphone',
        list:['+224 621 123 456',' +224 657 789 012'],
        textAccroche:'Lun - Sam: 8h - 18h',
        codeCouleur:'#0EA5E9',
        degrade:'#7DD3FC'
    },
   {
        icon: <MessageSquare className="w-6 h-6 text-white" />,
        title: 'Email',
        list:['contact@maintenancegn.com','support@maintenancegn.com'],
        textAccroche:'Réponse sous 24h',
        codeCouleur:'#0EA5E9',
        degrade:'#7DD3FC'
    },
    {
        icon: <MapPin className="w-6 h-6 text-white" />,
        title: 'Adresse',
        list:['Immeuble Kaloum Center','Avenue de la République','Conakry, Guinée'],
        textAccroche:'',
        codeCouleur:'#16A34A',
        degrade:'#4ADE80'
    },
     
];


export const plansData = [
    {
        id: 'starter',
        name: 'Starter',
        price: '$499',
        desc: 'Best for early-stage startups.',
        credits: 'One-time',
        features: [
            'Project discovery & planning',
            'UI/UX design',
            'Basic website development',
            '1 revision round',
            'Email support'
        ]
    },
    {
        id: 'pro',
        name: 'Growth',
        price: '$1,499',
        desc: 'Growing teams and businesses.',
        credits: 'Monthly',
        features: [
            'Everything in Starter',
            'Advanced UI/UX design',
            'Custom development',
            'Performance optimization',
            'Priority support'
        ],
        popular: true
    },
    {
        id: 'ultra',
        name: 'Scale',
        price: '$3,999',
        desc: 'For brands ready to scale fast.',
        credits: 'Custom',
        features: [
            'Everything in Growth',
            'Dedicated project manager',
            'Ongoing optimization',
            'Marketing & growth support',
            'Chat + Email support'
        ]
    }
];

export const questionsData = [
    {
        question: '• Comment devenir prestataire ?',
        answer: 'Vous choisissez le type de service (plomberie, électricité, climatisation), indiquez votre adresse et l’horaire souhaité, puis confirmez la réservation et l’acompte directement dans l’application.'
    },
    {
        question: '• Quels modes de paiement acceptez-vous ?',
        answer: 'Vous payez uniquement via la plateforme (Mobile Money ou carte). Le montant est sécurisé jusqu’à la fin de l’intervention, puis libéré au prestataire après votre validation.'
    },
    {
        question: '• Comment annuler une réservation ?',
        answer: 'Vous avez jusqu’à 72 heures pour signaler un problème sur l’équipement réparé. Un nouveau créneau est automatiquement réservé avec le même prestataire (ou un autre, selon le cas).'

    },
    {
        question: '• Où sont disponibles vos services ?',
        answer: 'Les techniciens sont vérifiés (identité, compétences), puis évalués en continu grâce aux notes et avis des clients après chaque intervention.'
    }
];



export const faqData = [
    {
        question: '1. Comment réserver un technicien sur BM CONNECT ?',
        answer: 'Vous choisissez le type de service (plomberie, électricité, climatisation), indiquez votre adresse et l’horaire souhaité, puis confirmez la réservation et l’acompte directement dans l’application.'
    },
    {
        question: '2. Comment se passe le paiement des services ?',
        answer: 'Vous payez uniquement via la plateforme (Mobile Money ou carte). Le montant est sécurisé jusqu’à la fin de l’intervention, puis libéré au prestataire après votre validation.'
    },
    {
        question: '3. Que faire si le problème revient après l’intervention ?',
        answer: 'Vous avez jusqu’à 72 heures pour signaler un problème sur l’équipement réparé. Un nouveau créneau est automatiquement réservé avec le même prestataire (ou un autre, selon le cas).'

    },
    {
        question: '4. Comment les techniciens sont-ils sélectionnés ?',
        answer: 'Les techniciens sont vérifiés (identité, compétences), puis évalués en continu grâce aux notes et avis des clients après chaque intervention.'
    },
    {
        question: '5. Puis-je payer en espèce directement au prestataire ?',
        answer: 'Non. Pour être protégé (facture, suivi, litige couvert), tous les paiements doivent obligatoirement passer par la plateforme BM CONNECT.'
    },
];

export const footerLinks = [
    {
        title: "Services",
        links: [
            { name: "Plomberie", url: "#" },
            { name: "Electricité", url: "#" },
            { name: "Climatisation", url: "#" },
            { name: "Contact", url: "#" }
        ]
    },
    {
        title: "Entreprise",
        links: [
            { name: "A Propos", url: "#" },
            { name: "Contact", url: "#" },
            { name: "Acceuil", url: "#" }
        ]
    },
    {
        title: "BM Connect",
        links: [
            { name: "Twitter", url: "#" },
            { name: "LinkedIn", url: "#" },
            { name: "GitHub", url: "#" }
        ]
    }
];