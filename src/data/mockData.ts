import { Product, InsurancePlan, TaxiNeedOption, CaracasZone, FaqItem, CommunityStory } from '../types';

export const BCV_EXCHANGE_RATE = 791.66; // Tasa Oficial Banco Central de Venezuela (BCV) actualizada

export const formatVES = (usd: number, rate: number = BCV_EXCHANGE_RATE): string => {
  const total = usd * rate;
  return total.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' VES';
};

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Bravecto Antipulgas & Garrapatas',
    brand: 'Bravecto (MSD)',
    activeIngredient: 'Fluralaner',
    cat: 'antiparasitarios',
    pet: 'perro',
    rx: false,
    tag: 'Protección 12 semanas',
    img: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&w=400&h=300&q=80',
    discount: '-10% con póliza',
    description: 'Comprimido masticable para el tratamiento y prevención de infestaciones por pulgas y garrapatas durante 12 semanas continuas.',
    ageGroups: ['cachorro', 'adulto', 'senior'],
    weightVariants: {
      toy: { label: 'Fluralaner · 112.5mg (2–4.5kg)', price: 28.90 },
      small: { label: 'Fluralaner · 250mg (4.5–10kg)', price: 34.20 },
      medium: { label: 'Fluralaner · 500mg (10–20kg)', price: 39.50 },
      large: { label: 'Fluralaner · 1000mg (20–40kg)', price: 46.00 },
      giant: { label: 'Fluralaner · 1400mg (+40kg)', price: 52.00 }
    }
  },
  {
    id: 'p2',
    name: 'Revolution Plus Gatos',
    brand: 'Zoetis',
    activeIngredient: 'Selamectina + Sarolaner',
    cat: 'antiparasitarios',
    pet: 'gato',
    rx: false,
    tag: 'Pipeta mensual felina',
    img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=400&h=300&q=80',
    discount: '-10% con póliza',
    description: 'Protección integral 6 en 1 contra pulgas, garrapatas, ácaros del oído, nematodos y anquilostomas en gatos.',
    ageGroups: ['cachorro', 'adulto', 'senior'],
    weightVariants: {
      toy: { label: 'Pipeta Gatitos (<2.5kg)', price: 26.50 },
      small: { label: 'Pipeta Gatos Medianos (2.5–5kg)', price: 29.90 },
      medium: { label: 'Pipeta Gatos Grandes (5–10kg)', price: 33.00 }
    }
  },
  {
    id: 'p3',
    name: 'Simparica Trio',
    brand: 'Zoetis',
    activeIngredient: 'Sarolaner + Moxidectina + Pirantel',
    cat: 'antiparasitarios',
    pet: 'perro',
    rx: false,
    tag: 'Triple acción mensual',
    img: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=400&h=300&q=80',
    discount: '-10% con póliza',
    description: 'Protege contra pulgas, garrapatas, parásitos intestinales y el peligroso gusano del corazón (dirofilaria).',
    ageGroups: ['adulto', 'senior'],
    weightVariants: {
      toy: { label: 'Sarolaner Trio · 3mg (1.3–2.5kg)', price: 32.00 },
      small: { label: 'Sarolaner Trio · 6mg (2.5–5kg)', price: 38.50 },
      medium: { label: 'Sarolaner Trio · 12mg (5–10kg)', price: 44.00 },
      large: { label: 'Sarolaner Trio · 24mg (10–20kg)', price: 51.00 },
      giant: { label: 'Sarolaner Trio · 48mg (20–40kg)', price: 58.00 }
    }
  },
  {
    id: 'p4',
    name: 'NexGard Spectra',
    brand: 'Boehringer Ingelheim',
    activeIngredient: 'Afoxolaner + Milbemicina',
    cat: 'antiparasitarios',
    pet: 'perro',
    rx: false,
    tag: 'Tableta palatable',
    img: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=400&h=300&q=80',
    discount: '-10% con póliza',
    description: 'Tratamiento mensual con sabor a carne para control interno y externo de parásitos.',
    ageGroups: ['cachorro', 'adulto', 'senior'],
    weightVariants: {
      toy: { label: 'Afoxolaner · 9.38mg (2–3.5kg)', price: 22.00 },
      small: { label: 'Afoxolaner · 18.75mg (3.5–7.5kg)', price: 26.00 },
      medium: { label: 'Afoxolaner · 37.5mg (7.5–15kg)', price: 31.00 },
      large: { label: 'Afoxolaner · 75mg (15–30kg)', price: 36.50 },
      giant: { label: 'Afoxolaner · 150mg (30–60kg)', price: 44.00 }
    }
  },
  {
    id: 'p5',
    name: 'Apoquel Control Alergias & Picor',
    brand: 'Zoetis',
    activeIngredient: 'Oclacitinib maleato',
    cat: 'recipe',
    pet: 'ambos',
    rx: true,
    tag: '📋 Requiere récipe',
    img: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=400&h=300&q=80',
    discount: '-20% con póliza',
    description: 'Alivio rápido del picor y la inflamación asociados con dermatitis alérgica y dermatitis atópica en perros.',
    ageGroups: ['adulto', 'senior'],
    weightVariants: {
      toy: { label: 'Oclacitinib · 3.6mg (Frasco x20)', price: 29.00 },
      small: { label: 'Oclacitinib · 5.4mg (Frasco x20)', price: 33.00 },
      medium: { label: 'Oclacitinib · 16mg (Frasco x20)', price: 36.00 },
      large: { label: 'Oclacitinib · 16mg (Frasco x50)', price: 48.00 },
      giant: { label: 'Oclacitinib · 16mg (Frasco x100)', price: 82.00 }
    }
  },
  {
    id: 'p6',
    name: 'Clavamox Gotas / Comprimidos',
    brand: 'Zoetis',
    activeIngredient: 'Amoxicilina + Ácido Clavulánico',
    cat: 'recipe',
    pet: 'ambos',
    price: 22.40,
    rx: true,
    tag: '📋 Requiere récipe',
    spec: 'Suspensión 62.5mg/ml (15ml)',
    img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&h=300&q=80',
    discount: '-20% con póliza',
    description: 'Antibiótico de amplio espectro para infecciones dérmicas, respiratorias, urinarias y periodontales.',
    ageGroups: ['cachorro', 'adulto', 'senior']
  },
  {
    id: 'p7',
    name: 'Vetmedin Soporte Cardíaco',
    brand: 'Boehringer Ingelheim',
    activeIngredient: 'Pimobendán',
    cat: 'recipe',
    pet: 'perro',
    price: 41.00,
    rx: true,
    tag: 'Tratamiento continuo',
    spec: 'Pimobendán · 5mg x50 cápsulas',
    img: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&w=400&h=300&q=80',
    discount: '-20% con póliza',
    description: 'Inotrópico positivo y vasodilatador para el manejo de insuficiencia cardíaca congestiva en caninos.',
    ageGroups: ['senior']
  },
  {
    id: 'p8',
    name: 'Royal Canin Gastrointestinal Dog',
    brand: 'Royal Canin Veterinary Diet',
    activeIngredient: 'Dieta clínica digestiva',
    cat: 'alimentos',
    pet: 'perro',
    price: 78.00,
    rx: true,
    tag: 'Saco 10kg',
    spec: 'Alta digestibilidad + prebióticos',
    img: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=400&h=300&q=80',
    discount: 'auto-reorden (-5%)',
    description: 'Fórmula nutricional con alta densidad energética para trastornos gastrointestinales agudos o crónicos.',
    ageGroups: ['cachorro', 'adulto', 'senior']
  },
  {
    id: 'p9',
    name: "Hill's Prescription Diet k/d Renal",
    brand: "Hill's Pet Nutrition",
    activeIngredient: 'Dieta clínica renal',
    cat: 'alimentos',
    pet: 'ambos',
    price: 69.50,
    rx: true,
    tag: 'Saco 3.8kg',
    spec: 'Fósforo controlado + EPA/DHA',
    img: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=400&h=300&q=80',
    discount: 'auto-reorden (-5%)',
    description: 'Nutrición clínicamente comprobada para proteger la función renal vital y estimular el apetito.',
    ageGroups: ['senior']
  },
  {
    id: 'p10',
    name: 'Royal Canin Hypoallergenic',
    brand: 'Royal Canin Veterinary Diet',
    activeIngredient: 'Proteína de soja hidrolizada',
    cat: 'alimentos',
    pet: 'perro',
    price: 84.00,
    rx: true,
    tag: 'Saco 7.5kg',
    spec: 'Péptidos hidrolizados hipoalergénicos',
    img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&h=300&q=80',
    discount: 'auto-reorden (-5%)',
    description: 'Dieta de eliminación para perros con reacciones adversas al alimento (alergias o intolerancias).',
    ageGroups: ['cachorro', 'adulto', 'senior']
  },
  {
    id: 'p11',
    name: 'Champú Antiséptico Medipet',
    brand: 'Medipet Laboratorios',
    activeIngredient: 'Clorhexidina 4% + Ketoconazol 1%',
    cat: 'higiene',
    pet: 'ambos',
    price: 16.50,
    rx: false,
    tag: 'Dermatológico',
    spec: 'Frasco 250ml',
    img: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=400&h=300&q=80',
    discount: '-15% con póliza',
    description: 'Champú medicado para el tratamiento de dermatitis bacterianas y fúngicas (malassezia).',
    ageGroups: ['cachorro', 'adulto', 'senior']
  },
  {
    id: 'p12',
    name: 'Limpiador Ótico OtiClean',
    brand: 'OtiClean Vet',
    activeIngredient: 'Ácido Salicílico + Aloe Vera',
    cat: 'higiene',
    pet: 'ambos',
    price: 9.90,
    rx: false,
    tag: 'Higiene clínica',
    spec: 'Gotero 120ml',
    img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&h=300&q=80',
    discount: '-15% con póliza',
    description: 'Solución no irritante para limpieza de cerumen y prevención de otitis externa.',
    ageGroups: ['cachorro', 'adulto', 'senior']
  },
  {
    id: 'p13',
    name: 'Advantage Multi Gatos',
    brand: 'Elanco',
    activeIngredient: 'Imidacloprid + Moxidectina',
    cat: 'antiparasitarios',
    pet: 'gato',
    rx: false,
    tag: 'Pipeta para gatos',
    price: 27.90,
    spec: 'Pipeta mensual gatos (<4kg)',
    img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=400&h=300&q=80',
    discount: '-10% con póliza',
    description: 'Prevención integral de pulgas, ácaros de oreja y parásitos intestinales en felinos.',
    ageGroups: ['cachorro', 'adulto', 'senior']
  },
  {
    id: 'p14',
    name: 'Royal Canin Indoor 27 Cat',
    brand: 'Royal Canin Feline Health',
    activeIngredient: 'Nutrición especializada interior',
    cat: 'alimentos',
    pet: 'gato',
    rx: false,
    tag: 'Gatos de interior',
    price: 36.50,
    spec: 'Bolsa 3kg (anti-bolas de pelo)',
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&h=300&q=80',
    discount: 'auto-reorden (-5%)',
    description: 'Ayuda a reducir el olor de las heces y favorece la evacuación de pelos ingeridos.',
    ageGroups: ['adulto', 'senior']
  },
  {
    id: 'p15',
    name: "Hill's Prescription Diet c/d Urinary Stress",
    brand: "Hill's Pet Nutrition",
    activeIngredient: 'Cuidado urinario felino + L-triptófano',
    cat: 'alimentos',
    pet: 'gato',
    rx: false,
    tag: 'Salud urinaria',
    price: 42.00,
    spec: 'Bolsa 2.7kg (disuelve cálculos estruvitas)',
    img: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=400&h=300&q=80',
    discount: 'auto-reorden (-5%)',
    description: 'Reduce la recurrencia de signos urinarios felinos relacionados al estrés en un 89%.',
    ageGroups: ['adulto', 'senior']
  },
  {
    id: 'p16',
    name: 'Dermocat Espuma Limpiadora Seca',
    brand: 'Dermocat Care',
    activeIngredient: 'Extracto de Manzanilla + Avena Coloidal',
    cat: 'higiene',
    pet: 'gato',
    rx: false,
    tag: 'Baño sin agua',
    price: 15.90,
    spec: 'Dosificador espumante 200ml',
    img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=400&h=300&q=80',
    discount: '-15% con póliza',
    description: 'Higiene sin estrés para gatos con miedo al agua. Hidrata la piel y neutraliza olores.',
    ageGroups: ['cachorro', 'adulto', 'senior']
  }
];

export const INSURANCE_PLANS: InsurancePlan[] = [
  {
    id: 'sv-mi-mascota',
    name: 'Póliza Mi Mascota',
    insurer: 'Seguros Venezuela',
    type: 'seguro',
    badge: 'Más contratada',
    tags: ['Accidentes', 'Enfermedades agudas', 'Telemedicina 24/7', 'Exámenes de laboratorio'],
    mainHighlight: 'Cobertura médica directa para emergencias, traumatismos e intervenciones por enfermedad aguda, con acceso a red clínica en Caracas.',
    description: 'Póliza respaldada por Seguros Venezuela. Diseñada para cubrir gastos médicos imprevistos, hospitalización de urgencia y estudios diagnósticos sin trámites engorrosos.',
    priceEstimate: 'Desde $12 / mes',
    coverageLimit: 'Hasta $2,500 / evento',
    recommendedFor: 'Mascotas activas propensas a accidentes o infecciones imprevistas.'
  },
  {
    id: 'appa-digital',
    name: 'Plan Digital Appa',
    insurer: 'Appa Mascota Digital',
    type: 'seguro',
    badge: '100% Digital',
    tags: ['Emergencias', 'Cirugías', 'Hospitalización', 'Reembolso express'],
    mainHighlight: 'Gestión 100% desde tu celular con reembolso express en menos de 48 horas o pago directo en clínicas aliadas.',
    description: 'Solución moderna enfocada en propietarios que prefieren gestionar todo vía app: coberturas quirúrgicas, hospitalización por intoxicación o heridas y consultas preventivas.',
    priceEstimate: 'Desde $15 / mes',
    coverageLimit: 'Hasta $3,500 / año',
    recommendedFor: 'Propietarios que valoran rapidez y gestión digital sin papeleos.'
  },
  {
    id: 'universitas-petcare',
    name: 'Petcare / Mi Primera Protección',
    insurer: 'Seguros Universitas',
    type: 'seguro',
    badge: 'Red Veterinaria Amplia',
    tags: ['Red de clínicas', 'Consultas de control', 'Vacunación', 'Emergencias 24h'],
    mainHighlight: 'Acceso prioritario a una de las redes veterinarias más extensas de Caracas, incluyendo consultas de control anual y vacunas esenciales.',
    description: 'Una opción equilibrada que combina cobertura contra siniestros mayores con chequeos preventivos programados y apoyo en fármacos hospitalarios.',
    priceEstimate: 'Desde $18 / mes',
    coverageLimit: 'Hasta $3,000 / año',
    recommendedFor: 'Familias que buscan medicina preventiva combinada con respaldo en urgencias.'
  },
  {
    id: 'hispana-amigo-fiel',
    name: 'Póliza Amigo Fiel',
    insurer: 'Hispana de Seguros',
    type: 'seguro',
    badge: 'Cobertura Familiar',
    tags: ['Accidentes', 'Responsabilidad civil', 'Asistencia funeraria', 'Cirugías mayores'],
    mainHighlight: 'Incluye cláusula de responsabilidad civil por daños a terceros, gastos de cirugía mayor y servicio de cremación/asistencia digna.',
    description: 'Póliza integral con más de 25 años de experiencia aseguradora en Venezuela. Cubre tanto la salud del animal como imprevistos legales o daños a terceros.',
    priceEstimate: 'Desde $14 / mes',
    coverageLimit: 'Hasta $4,000 / siniestro',
    recommendedFor: 'Razas medianas/grandes y tutores que buscan protección legal y médica integral.'
  },
  {
    id: 'mivete-online',
    name: 'MiVeteOnline Asistencia Digital',
    insurer: 'MiVeteOnline (Servicio Clínico)',
    type: 'servicio',
    badge: 'Telemedicina sin póliza',
    tags: ['Orientación 24/7', 'Videoconsulta', 'Triaje veterinario', 'Sin deducible'],
    mainHighlight: 'Servicio de telemedicina veterinaria inmediata con médicos veterinarios certificados para dudas, triaje y seguimiento post-quirúrgico.',
    description: 'No es una póliza de seguro, sino una membresía de atención veterinaria a distancia. Ideal para resolver dudas en la madrugada o tener una segunda opinión médica al instante.',
    priceEstimate: 'Desde $7 / mes',
    coverageLimit: 'Consultas ilimitadas',
    recommendedFor: 'Primerizos o tutores que necesitan respuesta rápida a dudas cotidianas.'
  }
];

export const TAXI_NEEDS: TaxiNeedOption[] = [
  {
    id: 'rampa',
    label: 'Rampa de subida fácil',
    description: 'Para perritos viejitos, grandes o con dificultad para subir.',
    forPet: 'perro',
    priceAddonUSD: 0.0
  },
  {
    id: 'jaula-segura',
    label: 'Jaula transportadora limpia y fija',
    description: 'Espacio cómodo y seguro para gatos o perritos pequeños.',
    forPet: 'ambos',
    priceAddonUSD: 0.0
  },
  {
    id: 'acompanante',
    label: 'Viaja con tutor / acompañante',
    description: 'Asiento disponible para que acompañes a tu peludo.',
    forPet: 'ambos',
    priceAddonUSD: 0.0
  },
  {
    id: 'perro-grande',
    label: 'Espacio para perro grande (+25kg)',
    description: 'Asientos traseros libres con arnés y cinturón especial.',
    forPet: 'perro',
    priceAddonUSD: 0.0
  },
  {
    id: 'calm-music',
    label: 'Aire acondicionado y música relajante',
    description: 'Ambiente fresco y tranquilo para que viaje sin estrés.',
    forPet: 'ambos',
    priceAddonUSD: 0.0
  },
  {
    id: 'atencion-especial',
    label: 'Cuidado especial / traslado a consulta',
    description: 'Conducción suave y parada con calma para mayor tranquilidad.',
    forPet: 'ambos',
    priceAddonUSD: 0.0
  }
];

export const CARACAS_ZONES: CaracasZone[] = [
  { id: 'chacao', name: 'Chacao / El Rosal', municipio: 'Chacao', baseFareUSD: 8.0, avgDeliveryMin: 25, available: true },
  { id: 'altamira', name: 'Altamira / Los Palos Grandes', municipio: 'Chacao', baseFareUSD: 8.5, avgDeliveryMin: 20, available: true },
  { id: 'las-mercedes', name: 'Las Mercedes / San Román', municipio: 'Baruta', baseFareUSD: 9.0, avgDeliveryMin: 25, available: true },
  { id: 'la-castellana', name: 'La Castellana / Country Club', municipio: 'Chacao', baseFareUSD: 9.0, avgDeliveryMin: 22, available: true },
  { id: 'el-hatillo', name: 'El Hatillo / La Lagunita', municipio: 'El Hatillo', baseFareUSD: 14.0, avgDeliveryMin: 45, available: true },
  { id: 'santa-fe', name: 'Santa Fe / Prados del Este', municipio: 'Baruta', baseFareUSD: 11.0, avgDeliveryMin: 35, available: true },
  { id: 'bello-monte', name: 'Colinas de Bello Monte', municipio: 'Baruta', baseFareUSD: 8.5, avgDeliveryMin: 30, available: true },
  { id: 'san-bernardino', name: 'San Bernardino / La Florida', municipio: 'Libertador', baseFareUSD: 10.0, avgDeliveryMin: 35, available: true },
  { id: 'el-paraiso', name: 'El Paraíso / Montalbán', municipio: 'Libertador', baseFareUSD: 12.5, avgDeliveryMin: 40, available: true },
  { id: 'la-trinidad', name: 'La Trinidad / Sorocaima', municipio: 'Baruta', baseFareUSD: 11.5, avgDeliveryMin: 35, available: true },
  { id: 'los-salias', name: 'San Antonio de los Altos', municipio: 'Los Salias', baseFareUSD: 22.0, avgDeliveryMin: 65, available: true }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    cat: 'general',
    question: '¿Qué es Firulais y cómo opera en Venezuela?',
    answer: 'Firulais es una plataforma hiperlocal de servicios veterinarios. Conectamos tus pedidos con Pet Shops y farmacias veterinarias aliadas en Caracas (cada una debidamente autorizada con licencia sanitaria). En seguros, te ayudamos a comparar las pólizas reales del mercado venezolano y coordinamos la emisión con aseguradoras aliadas. Además, contamos con una flota propia de Taxi Pet acondicionada para traslados seguros.'
  },
  {
    id: 'faq-2',
    cat: 'farmacia',
    question: '¿Cómo funciona la validación de récipe médica?',
    answer: 'Al subir la foto de tu récipe, nuestro sistema realiza una pre-lectura asistida por IA para comprobar principio activo, dosificación y vigencia según el peso y edad de tu mascota. Luego, el farmacéutico / veterinario del comercio aliado que prepara la orden valida la prescripción físicamente antes del despacho.'
  },
  {
    id: 'faq-3',
    cat: 'farmacia',
    question: '¿Qué métodos de pago aceptan en Caracas?',
    answer: 'Aceptamos Pago Móvil (tasa BCV del día), Zelle, transferencias bancarias nacionales, Banesco Panamá y Efectivo contra entrega (USD exacto o cambio coordinado por WhatsApp).'
  },
  {
    id: 'faq-4',
    cat: 'seguros',
    question: '¿Firulais es una aseguradora?',
    answer: 'No somos una aseguradora ni emitimos pólizas directamente. Actuamos como un comparador transparente y canal de facilitación comercial: te mostramos coberturas, deducibles y exclusiones reales de aseguradoras reguladas (como Seguros Venezuela, Appa, Universitas e Hispana), y gestionamos tu solicitud directamente con el corredor oficial.'
  },
  {
    id: 'faq-5',
    cat: 'taxipet',
    question: '¿Cómo son las unidades de Taxi Pet?',
    answer: 'Nuestras camionetas y vehículos están equipados con forros impermeables de grado médico, jaulas de transporte fijadas con anclaje ISOFIX, cinturones de seguridad para arnés canino, aire acondicionado continuo y rampas de ascenso para mascotas convalecientes o con sobrepeso. Se desinfectan con virucida de grado veterinario entre cada servicio.'
  },
  {
    id: 'faq-6',
    cat: 'taxipet',
    question: '¿Puedo enviar a mi mascota sola en el Taxi Pet?',
    answer: 'Sí. Puedes acompañarla o enviarla con nuestro conductor capacitado en manejo animal. Si viaja sola, te enviamos enlace de seguimiento GPS en tiempo real y confirmación fotográfica al entregarla en la clínica veterinaria o peluquería.'
  }
];

export const COMMUNITY_STORIES: CommunityStory[] = [
  {
    id: 'story-1',
    petName: 'Firulais',
    petKind: 'perro',
    age: 'Golden Retriever · 3 años',
    zone: 'Altamira, Caracas',
    quote: 'Conseguir su Bravecto para 35kg y su comida renal sin recorrer tres farmacias en Caracas nos ahorró horas enteras.',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&h=400&q=80',
    rotation: '-rotate-2'
  },
  {
    id: 'story-2',
    petName: 'Michi & Luna',
    petKind: 'gato',
    age: 'Gatos mestizos · 1 y 2 años',
    zone: 'Chacao',
    quote: 'Pedir el Taxi Pet para llevarlos a su esterilización en transportadora acolchada fue cero estrés. Llegaron súper tranquilos.',
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=400&h=400&q=80',
    rotation: 'rotate-3'
  },
  {
    id: 'story-3',
    petName: 'Toby',
    petKind: 'perro',
    age: 'Beagle Senior · 7 años',
    zone: 'Las Mercedes',
    quote: 'La comparación de pólizas me ayudó a elegir la cobertura con telemedicina 24/7 de Seguros Venezuela para sus controles.',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=400&h=400&q=80',
    rotation: '-rotate-3'
  },
  {
    id: 'story-4',
    petName: 'Milo',
    petKind: 'gato',
    age: 'Siamés · 4 años',
    zone: 'Los Palos Grandes',
    quote: 'Subí la foto del récipe de sus antibióticos óticos y en 30 minutos ya estaba en camino desde la tienda aliada.',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=400&h=400&q=80',
    rotation: 'rotate-2'
  }
];

export const VET_DOCTORS = [
  { name: 'Dra. Andreína Suárez', mpps: 'MPPS 48.213', clinic: 'Clínica Veterinaria Chacao' },
  { name: 'Dr. Carlos Farías', mpps: 'MPPS 51.027', clinic: 'Hospital Veterinario Las Mercedes' },
  { name: 'Dra. Génesis Moreno', mpps: 'MPPS 49.561', clinic: 'Centro Integral Veterinario Altamira' },
  { name: 'Dr. Roberto Mendoza', mpps: 'MPPS 42.890', clinic: 'Especialidades Veterinarias Caracas' }
];
