/**
 * BOMISO FITNESS – Official Web Application
 * Body · Mind · Soul
 * Gurugram, Haryana, India (Sector 30 · Sector 50 · Sector 65)
 * 
 * GitHub Hosting Friendly Unified Architecture (Single-File Self-Contained Frontend)
 */

import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import {
  Menu, X, Phone, MapPin, User, LogOut, ShieldCheck, Dumbbell, Brain, HeartHandshake,
  ArrowRight, ArrowUpRight, Clock, Gauge, Award, Shield, CheckCircle2, AlertCircle,
  MessageSquare, Star, Quote, ChevronLeft, ChevronRight, ChevronDown, Maximize2,
  Send, Sparkles, RefreshCw, Bot, QrCode, Eye, EyeOff, Calendar, ExternalLink,
  Instagram, Facebook, Youtube, BookOpen, Share2
} from 'lucide-react';

// Relative Image Asset Imports for static bundling (GitHub Pages / Vite friendly)
import heroImg from './assets/images/hero_cinematic_training_1792066859017.jpg';
import strengthImg from './assets/images/program_strength_zone_1792066860186.jpg';
import yogaImg from './assets/images/program_mind_yoga_1792066861248.jpg';
import crossdrillImg from './assets/images/program_group_crossdrill_1792066862283.jpg';
import facilityTeePointImg from './assets/images/facility_tee_point_interior_1792066860759.jpg';
import insightTrainingImg from './assets/images/insight_training_technique_1792069504174.jpg';
import insightRecoveryImg from './assets/images/insight_recovery_spine_1792069504052.jpg';
import insightNutritionImg from './assets/images/insight_nutrition_clean_1792069540544.jpg';

/* ==========================================================================
   1. TYPES & DATA MODEL
   ========================================================================== */

export interface Program {
  id: string;
  name: string;
  category: 'strength' | 'mind-body' | 'cardio' | 'specialized';
  subtitle: string;
  description: string;
  intensity: 'Medium' | 'High' | 'All Levels';
  duration: string;
  outcomes: string[];
  equipment: string[];
  locations: string[];
  image: string;
}

export interface Coach {
  id: string;
  name: string;
  role: string;
  experience: string;
  certifications: string[];
  specialties: string[];
  bio: string;
  quote: string;
  location: string;
}

export interface BranchLocation {
  id: string;
  name: string;
  mall: string;
  sector: string;
  address: string;
  pincode: string;
  phone: string;
  alternatePhone?: string;
  email: string;
  mapsUrl: string;
  established: string;
  tagline: string;
  features: string[];
  popularPrograms: string[];
  timings: {
    weekdays: string;
    sunday: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  locality: string;
  rating: number;
  source: 'Google Reviews' | 'Justdial' | 'Verified Member';
  program: string;
  comment: string;
  memberSince: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'strength' | 'crossdrill' | 'mind-body' | 'facility';
  image: string;
  caption: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Training' | 'Recovery' | 'Nutrition';
  readTime: string;
  author: string;
  authorRole: string;
  publishDate: string;
  thumbnail: string;
  excerpt: string;
  keyTakeaways: string[];
  body: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  memberTier: string;
  homeBranch: string;
  memberSince: string;
  checkInCount: number;
  qrCode: string;
}

export const WHATSAPP_CONFIG = {
  raw: '919910665194',
  display: '+91 99106 65194',
  url: 'https://wa.me/919910665194',
};

export const BRANCHES: BranchLocation[] = [
  {
    id: 'tee-point',
    name: 'BOMISO FITNESS – M3M Tee Point',
    mall: 'M3M Tee Point, Golf Course Ext Road',
    sector: 'Sector 65',
    address: '3rd Floor, South Block, M3M Tee Point, Sector 65, Golf Course Extension Road, Gurugram, Haryana',
    pincode: '122011',
    phone: '+91 98109 57491',
    alternatePhone: '+91 93192 78231',
    email: 'teepoint@bomiso.in',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=BOMISO+FITNESS+M3M+Tee+Point+Sector+65+Gurugram',
    established: '2021',
    tagline: 'Flagship club with panoramic 4-side open views and dedicated functional arena',
    features: [
      'Panoramic 4-side open floor with natural skyline light',
      'Dedicated turf track for sled pushes and sprinting',
      'Competition-grade Olympic lifting platforms',
      'Dedicated reformer Pilates and aerial yoga studio',
      'Luxury locker rooms and steam recovery suites',
    ],
    popularPrograms: ['Crossdrill & Turf Conditioning', 'Olympic Lifting', 'Aerial Yoga', 'Personal Coaching'],
    timings: {
      weekdays: '6:00 AM – 10:00 PM',
      sunday: '7:00 AM – 8:00 PM',
    },
  },
  {
    id: 'good-earth',
    name: 'BOMISO FITNESS – Good Earth City Centre',
    mall: 'Good Earth City Centre, Malibu Towne',
    sector: 'Sector 50',
    address: '2nd Floor, Good Earth City Centre, Malibu Towne, Sector 50, Gurugram, Haryana',
    pincode: '122018',
    phone: '+91 98109 57491',
    alternatePhone: '+91 97176 93532',
    email: 'contact@bomiso.in',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=BOMISO+FITNESS+Good+Earth+City+Centre+Sector+50+Gurugram',
    established: '2016',
    tagline: 'Bustling high-energy community hub for group training and strength',
    features: [
      'Large high-energy group fitness studio for Zumba & Les Mills',
      'Comprehensive selectorized strength and cable station circuit',
      'Advanced cardio theater with immersive spin studio',
      'Certified functional movement assessment lounge',
      'Convenient mall parking and direct elevator access',
    ],
    popularPrograms: ['Zumba & Dance Fitness', 'Les Mills Body Pump', 'Spinning', 'Strength Conditioning'],
    timings: {
      weekdays: '6:00 AM – 10:00 PM',
      sunday: '7:00 AM – 8:00 PM',
    },
  },
  {
    id: 'star-mall',
    name: 'BOMISO FITNESS – DLF Star Mall',
    mall: 'DLF Star Mall, NH-8',
    sector: 'Sector 30',
    address: 'LG 06, DLF Star Mall, Sector 30, NH 8, Gurugram, Haryana',
    pincode: '122001',
    phone: '+91 98109 57491',
    alternatePhone: '+91 99100 57491',
    email: 'info@bomiso.in',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=BOMISO+FITNESS+DLF+Star+Mall+Sector+30+Gurugram',
    established: '2013',
    tagline: 'The foundational BOMISO club — over a decade of strength excellence',
    features: [
      'Heavy-duty free weights zone up to 50kg dumbbells',
      'TRX suspension conditioning bay and battle rope station',
      'Mind-body holistic studio for Hatha & Vinyasa yoga',
      'Customized one-on-one personal training stations',
      'Prime location just off NH-8 expressway',
    ],
    popularPrograms: ['Personal Training', 'TRX Suspension', 'Boxing & Kickboxing', 'Hatha Yoga'],
    timings: {
      weekdays: '6:00 AM – 10:00 PM',
      sunday: '7:00 AM – 8:00 PM',
    },
  },
];

export const PROGRAMS: Program[] = [
  {
    id: 'strength-training',
    name: 'Strength & Hypertrophy',
    category: 'strength',
    subtitle: 'Compound lifts, barbell technique, and progressive overload.',
    description: 'Master Olympic and powerlifting essentials. Built on barbell mechanics, dumbbell isolation, and structured periodization for maximum muscle tone, density, and functional force.',
    intensity: 'High',
    duration: '60 Mins',
    outcomes: ['Lean Muscle Hypertrophy', 'Bone Density & Joint Resilience', 'Metabolic Rate Enhancement'],
    equipment: ['Eleiko & Rogue Barbells', 'Power Cages', 'Calibrated Bumper Plates', 'Cable Stations'],
    locations: ['Sector 65 (M3M Tee Point)', 'Sector 50 (Good Earth)', 'Sector 30 (DLF Star Mall)'],
    image: strengthImg,
  },
  {
    id: 'crossdrill-functional',
    name: 'Crossdrill & Functional Arena',
    category: 'strength',
    subtitle: 'High-intensity athletic conditioning across turf and rigs.',
    description: 'Our signature athletic workout combining kettlebell cycles, sled pushes, box jumps, and rowers. Designed to build unrelenting cardiovascular stamina and explosive athletic power.',
    intensity: 'High',
    duration: '50 Mins',
    outcomes: ['Cardiorespiratory Endurance', 'Explosive Power', 'Agility & Core Stability'],
    equipment: ['Sprint Turf', 'Rogue Prowler Sleds', 'Concept2 Rowers & SkiErgs', 'Cast Iron Kettlebells'],
    locations: ['Sector 65 (M3M Tee Point)', 'Sector 50 (Good Earth)'],
    image: crossdrillImg,
  },
  {
    id: 'personal-coaching',
    name: '1-on-1 Personal Coaching',
    category: 'specialized',
    subtitle: 'Custom program design, biomechanical screening, and direct accountability.',
    description: 'Work individually with an ISSA or ACE certified master coach. Receive tailored programming tailored to your postural alignment, body composition targets, and nutrition protocols.',
    intensity: 'All Levels',
    duration: '60 Mins',
    outcomes: ['Rapid Goal Achievement', 'Injury Rehabilitation & Prevention', 'Tailored Nutrition Guidance'],
    equipment: ['Full Club Access', 'Body Composition InBody Analyzer', 'Heart Rate Telemetry'],
    locations: ['Sector 65 (M3M Tee Point)', 'Sector 50 (Good Earth)', 'Sector 30 (DLF Star Mall)'],
    image: heroImg,
  },
  {
    id: 'yoga-mindfulness',
    name: 'Yoga & Mindful Movement',
    category: 'mind-body',
    subtitle: 'Hatha, Vinyasa flow, and restorative mobility in sunlit studios.',
    description: 'Connect breath to movement. Improve thoracic mobility, spinal decompression, and mental clarity through guided asanas, pranayama, and mindful somatic stretching.',
    intensity: 'All Levels',
    duration: '60 Mins',
    outcomes: ['Full-Body Flexibility', 'Stress Hormone De-escalation', 'Core Alignment & Posture'],
    equipment: ['Natural Cork Mats', 'Yoga Straps & Blocks', 'Bolsters & Eye Pillows'],
    locations: ['Sector 65 (M3M Tee Point)', 'Sector 50 (Good Earth)', 'Sector 30 (DLF Star Mall)'],
    image: yogaImg,
  },
  {
    id: 'pilates-core',
    name: 'Pilates & Core Sculpt',
    category: 'mind-body',
    subtitle: 'Low-impact precision exercises targeting deep pelvic and core stabilizers.',
    description: 'Systematic muscular endurance training designed to align the spine, tighten the transverse abdominis, and tone lengthen muscle fibers without joint stress.',
    intensity: 'Medium',
    duration: '50 Mins',
    outcomes: ['Deep Core Strength', 'Spinal Posture Correction', 'Lumbopelvic Stability'],
    equipment: ['Pilates Resistance Rings', 'Mini Stability Balls', 'Suspension Straps'],
    locations: ['Sector 65 (M3M Tee Point)', 'Sector 50 (Good Earth)'],
    image: yogaImg,
  },
  {
    id: 'boxing-kickboxing',
    name: 'Boxing & Combat Conditioning',
    category: 'cardio',
    subtitle: 'Heavy bag rounds, combination mitt-work, and footwork drills.',
    description: 'Unleash stress and ignite serious calorie burn. Learn authentic striking mechanics, slip movements, and rotational core engagement guided by experienced combat athletes.',
    intensity: 'High',
    duration: '55 Mins',
    outcomes: ['Hand-Eye Coordination', 'High Caloric Output', 'Mental Grit & Confidence'],
    equipment: ['Everlast Heavy Bags', 'Punch Mitts & Thai Pads', 'Speed Ropes'],
    locations: ['Sector 65 (M3M Tee Point)', 'Sector 30 (DLF Star Mall)'],
    image: crossdrillImg,
  },
  {
    id: 'zumba-dance',
    name: 'Zumba & Dance Fitness',
    category: 'cardio',
    subtitle: 'Electrifying rhythmic cardio blending Latin beats and world dance routines.',
    description: 'High-energy, party-style cardio that makes 60 minutes fly by. Led by certified Zumba instructors with pulse-pounding club acoustics and dynamic choreography.',
    intensity: 'Medium',
    duration: '50 Mins',
    outcomes: ['Cardiovascular Health', 'Endorphin Release', 'Rhythm & Coordination'],
    equipment: ['Cushioned Wooden Aerobic Floor', 'Acoustic Sound Matrix'],
    locations: ['Sector 50 (Good Earth)', 'Sector 30 (DLF Star Mall)'],
    image: facilityTeePointImg,
  },
  {
    id: 'spinning-cycle',
    name: 'Spinning & Indoor Cycling',
    category: 'cardio',
    subtitle: 'High-cadence interval climbs and rhythm sprints in ambient studio lighting.',
    description: 'A sweat-drenched indoor cycling ride simulating mountain ascents, cadence intervals, and sprint finishes with beat-synced studio lighting.',
    intensity: 'High',
    duration: '45 Mins',
    outcomes: ['Lower-Body Power', 'Aerobic Engine Building', 'Low-Impact Joint Health'],
    equipment: ['Magnetic Flywheel Spin Bikes', 'SPD Cleat Pedals', 'Paced Beat Display'],
    locations: ['Sector 50 (Good Earth)', 'Sector 65 (M3M Tee Point)'],
    image: facilityTeePointImg,
  },
  {
    id: 'kids-fitness',
    name: "Kids' Movement & Athletic Agility",
    category: 'specialized',
    subtitle: 'Age-appropriate motor development, games, and foundational athletic skills.',
    description: 'Nurture a lifelong love for movement in children. Focuses on spatial awareness, coordination, fundamental movement skills, teamwork, and healthy posture.',
    intensity: 'All Levels',
    duration: '45 Mins',
    outcomes: ['Gross Motor Skills', 'Physical Confidence', 'Posture & Screen Decompression'],
    equipment: ['Agility Ladders', 'Soft Foam Plyo Cubes', 'Reaction Cones'],
    locations: ['Sector 65 (M3M Tee Point)', 'Sector 50 (Good Earth)'],
    image: crossdrillImg,
  },
];

export const COACHES: Coach[] = [
  {
    id: 'vikram-rao',
    name: 'Vikramaditya "Vikram" Rao',
    role: 'Head of Strength & Conditioning',
    experience: '11+ Years Experience',
    certifications: ['ISSA Master Trainer', 'CSCS Prep', 'CPR & AED'],
    specialties: ['Olympic Weightlifting', 'Barbell Mechanics', 'Hypertrophy Periodization'],
    bio: 'Vikram has spent over a decade developing strength systems for athletes, corporate leaders, and beginners. He emphasizes strict biomechanical form before adding load.',
    quote: 'True strength is earned through discipline and technical precision, not shortcuts.',
    location: 'Sector 65 & Sector 50',
  },
  {
    id: 'shweta-sharma',
    name: 'Shweta Sharma',
    role: 'Head of Mind-Body & Yoga',
    experience: '8+ Years Experience',
    certifications: ['500-Hr Yoga Alliance RYT', 'STOTT Pilates Matwork Certified', 'Sound Healing Practitioner'],
    specialties: ['Vinyasa & Hatha Flow', 'Spinal Alignment', 'Breathwork & Stress Recovery'],
    bio: 'Shweta bridges ancient mindfulness disciplines with modern anatomical science, helping members rebuild posture, eliminate desk-work stiffness, and find daily calm.',
    quote: 'Movement is medicine for both the nervous system and the physical body.',
    location: 'Sector 65 & Sector 30',
  },
  {
    id: 'kabir-singh',
    name: 'Kabir Singh',
    role: 'Lead Functional & Crossdrill Coach',
    experience: '7+ Years Experience',
    certifications: ['CrossFit Level 1 Trainer', 'IKFF Level 2 Kettlebell Specialist', 'TRX Suspension Master'],
    specialties: ['High-Intensity Conditioning', 'Turf & Agility Drills', 'Metabolic Endurance'],
    bio: 'Known for high infectious energy and motivating coaching style, Kabir transforms standard conditioning sessions into empowering team experiences.',
    quote: 'When your body whispers to stop, that is where your mind starts growing.',
    location: 'Sector 65 (M3M Tee Point)',
  },
  {
    id: 'neha-verma',
    name: 'Neha Verma',
    role: 'Group Exercise & Dance Fitness Lead',
    experience: '6+ Years Experience',
    certifications: ['Licensed Zumba Zin', 'Les Mills Body Pump Specialist', 'AFAA Group Fitness'],
    specialties: ['Dance Cardio', 'High-Rep Muscular Endurance', 'Group Rhythm Choreography'],
    bio: 'Neha brings electrifying charisma to BOMISO studio floors, combining musical rhythm with high-calorie muscular endurance routines that keep members excited.',
    quote: 'Fitness is not a chore when you dance through the resistance.',
    location: 'Sector 50 & Sector 30',
  },
  {
    id: 'rohit-choudhary',
    name: 'Rohit Choudhary',
    role: 'Combat Conditioning & Boxing Specialist',
    experience: '9+ Years Experience',
    certifications: ['BFI Certified Boxing Coach', 'Functional Movement Screen (FMS)', 'ACE Certified Trainer'],
    specialties: ['Heavy Bag Drills', 'Boxing Footwork', 'Rotational Power & Core Strength'],
    bio: 'A former regional boxer, Rohit instructs both beginners and advanced strikers in striking technique, defensive head movement, and high-tempo punch circuits.',
    quote: 'Balance your stance, breathe with every strike, and leave your doubts outside the ring.',
    location: 'Sector 65 & Sector 30',
  },
  {
    id: 'ananya-sen',
    name: 'Ananya Sen',
    role: 'Youth Fitness & Postural Mobility Specialist',
    experience: '5+ Years Experience',
    certifications: ['ACE Youth Fitness Specialist', 'Precision Nutrition PN1', 'Pre/Post Natal Fitness'],
    specialties: ['Youth Athletic Development', 'Nutritional Habit Coaching', 'Corrective Exercise'],
    bio: 'Ananya directs BOMISO’s junior movement and posture programs, creating fun, engaging athletic challenges that foster coordination and healthy lifelong habits.',
    quote: 'Build athletic foundations young, and movement becomes a natural superpower for life.',
    location: 'Sector 65 & Sector 50',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rohit Malhotra',
    locality: 'Golf Course Extension, Sector 65',
    rating: 5,
    source: 'Google Reviews',
    program: 'Strength Training & Functional Arena',
    comment: 'The equipment and spacious layout at M3M Tee Point are truly world-class. Having natural light from four open sides completely changes your workout psychology compared to basement gyms. The trainers pay real attention to lifting mechanics.',
    memberSince: 'Member since 2022',
  },
  {
    id: '2',
    name: 'Meenakshi Sundaram',
    locality: 'DLF Phase 4, Gurugram',
    rating: 5,
    source: 'Verified Member',
    program: 'Personal Coaching & Pilates',
    comment: 'After years of sedentary desk work, I struggled with chronic lower back tightness. Coach Vikram and Shweta designed a phased mobility and core stabilization plan. Within 4 months, my pain was gone and I feel 10 years younger.',
    memberSince: 'Member since 2021',
  },
  {
    id: '3',
    name: 'Tanmay Kapoor',
    locality: 'Nirvana Country, Sector 50',
    rating: 5,
    source: 'Justdial',
    program: 'Crossdrill & Spinning',
    comment: 'The energy at Good Earth City Centre is contagious. Kabir’s crossdrill classes push your limits in an uplifting team atmosphere. The facility is spotless, locker rooms are pristine, and the equipment is kept in top order.',
    memberSince: 'Member since 2023',
  },
  {
    id: '4',
    name: 'Priya Narang',
    locality: 'South City 1, Gurugram',
    rating: 5,
    source: 'Google Reviews',
    program: 'Yoga & Group Fitness',
    comment: 'BOMISO has been my sanctuary since 2017 at the Star Mall branch. What sets them apart is the authentic Body, Mind, Soul philosophy. It is not just about aesthetics; it is about holistic health, mental clarity, and genuine community.',
    memberSince: 'Member since 2017',
  },
  {
    id: '5',
    name: 'Arjun Singhal',
    locality: 'Sector 30, Gurugram',
    rating: 5,
    source: 'Google Reviews',
    program: 'Boxing & Strength',
    comment: 'Super solid gym with zero fluff. Heavy dumbbells, solid squat racks, and authentic boxing training. If you are serious about genuine progression in Gurugram, BOMISO is the real deal.',
    memberSince: 'Member since 2020',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Olympic Lifting & Barbells',
    category: 'strength',
    image: strengthImg,
    caption: 'Competition-grade barbell platform and calibrated plates at BOMISO M3M Tee Point.',
  },
  {
    id: 'g2',
    title: 'Mind & Body Sanctuary',
    category: 'mind-body',
    image: yogaImg,
    caption: 'Sunlit wooden studio dedicated to Vinyasa yoga, Pilates, and breathwork recovery.',
  },
  {
    id: 'g3',
    title: 'Functional Turf & Crossdrill',
    category: 'crossdrill',
    image: crossdrillImg,
    caption: 'Athletic sprint turf, kettlebell cycles, and sled conditioning arena in session.',
  },
  {
    id: 'g4',
    title: 'Panoramic Skyline Cardio Floor',
    category: 'facility',
    image: facilityTeePointImg,
    caption: 'Spacious 4-side open floor overlooking Gurugram skyline at dusk.',
  },
  {
    id: 'g5',
    title: 'Dedicated Strength Arena',
    category: 'strength',
    image: heroImg,
    caption: 'High-performance strength training racks and precision conditioning bays.',
  },
];

export const INSIGHTS: InsightArticle[] = [
  {
    id: 'art-training',
    title: 'Progressive Overload vs Junk Volume: The Biomechanical Path to Real Strength',
    slug: 'progressive-overload-vs-junk-volume',
    category: 'Training',
    readTime: '5 min read',
    author: 'Coach Vikramaditya Rao',
    authorRole: 'ISSA Master Trainer · Head of S&C',
    publishDate: 'October 2026',
    thumbnail: insightTrainingImg,
    excerpt:
      'Why adding endless sets without structured intensity leads to neurological burnout rather than hypertrophy. Learn how to track proximity to failure with RIR and dial in mechanical tension.',
    keyTakeaways: [
      'True mechanical tension across 3–4 quality working sets stimulates superior muscular recruitment compared to 8 exhausted junk sets.',
      'Maintain 1–2 Reps in Reserve (RIR) on multi-joint barbell lifts to safeguard connective tissue integrity.',
      'Program deliberate deload phases every 6 to 8 weeks to allow systemic nervous system recuperation.',
    ],
    body: [
      'In commercial gym environments across Delhi NCR, a persistent myth continues to derail dedicated lifters: that total exhaustion and countless drop-sets are the universal badge of honor. Biomechanical research tells a strikingly different story. Muscle growth and strength adaptations are driven primarily by high-threshold motor unit recruitment under sufficient mechanical tension—not metabolic trash accumulation.',
      'When you perform set after set past the point of technical breakdown, you transition from productive stimulus to systemic fatigue. Your central nervous system becomes depleted, cortisol spikes, and your spinal stabilizers fatigue, dramatically elevating injury risk on subsequent compound movements.',
      'At BOMISO FITNESS, our strength programming is built on standardized periodization. We measure load progression, velocity, and technical precision. By keeping your primary compound movements (squats, deadlifts, overhead presses) within 1 to 2 reps in reserve, you trigger maximal signaling for protein synthesis while recovering fast enough to attack your next session with explosive intent.',
    ],
  },
  {
    id: 'art-recovery',
    title: 'Decompressing the Corporate Spine: Mitigating Desk Posture & Sympathetic Overload',
    slug: 'decompressing-corporate-spine',
    category: 'Recovery',
    readTime: '6 min read',
    author: 'Coach Shweta Sharma',
    authorRole: '500-Hr Yoga Alliance RYT · Pilates Specialist',
    publishDate: 'October 2026',
    thumbnail: insightRecoveryImg,
    excerpt:
      'Long hours in Gurugram corporate offices lock the thoracic spine into kyphosis and tilt the pelvis forward. Explore our 3-step active decompression and parasympathetic down-regulation protocol.',
    keyTakeaways: [
      'Thoracic rotational mobilization restores rotational freedom without stressing the vulnerable lumbar discs.',
      'Box breathing (4-4-4-4) for 5 minutes post-training accelerates the transition from fight-or-flight to recovery mode.',
      'Pelvic floor and transverse abdominis activation restores natural neutral spine alignment.',
    ],
    body: [
      'The modern corporate lifestyle in Gurugram’s cyber corridors imposes an invisible physical toll. Prolonged seated postures place your hip flexors in chronic contraction, inhibit your glutes (gluteal amnesia), and lock your mid-back in rigid flexion. When professionals attempt to lift heavy after 9 hours in a chair without dedicated preparation, the lumbar spine bears the shear force.',
      'Recovery is not passive couch sitting; it is active physiological restoration. At BOMISO, our mind-body protocols focus on thoracic decompression, open-chain hamstring lengthening, and targeted breath mechanics.',
      'Just five minutes of guided diaphragmatic breathing post-workout shifts your autonomic nervous system from sympathetic excitation to parasympathetic repair. This accelerates heart-rate recovery, reduces circulating cortisol, and primes your digestion to utilize post-workout nutrients effectively.',
    ],
  },
  {
    id: 'art-nutrition',
    title: 'Fueling for Functional Intensity: Hydration & Electrolytes in Indian Climates',
    slug: 'fueling-functional-intensity-hydration',
    category: 'Nutrition',
    readTime: '4 min read',
    author: 'Coach Ananya Sen',
    authorRole: 'Precision Nutrition PN1 · Youth Specialist',
    publishDate: 'October 2026',
    thumbnail: insightNutritionImg,
    excerpt:
      'Why drinking gallons of plain water during high-tempo crossdrill can actually sap your muscular power. Master intra-workout sodium balance, glycogen priming, and post-session protein synthesis.',
    keyTakeaways: [
      'Hyponatremia and electrolyte imbalance cause cramping, brain fog, and power drop-offs before dehydration does.',
      'Target 400–600mg of sodium paired with potassium in pre-workout fluids during hot and humid training blocks.',
      'Consume 25–35g of complete protein containing high leucine content within two hours of training to maximize MPS.',
    ],
    body: [
      'Gurugram’s seasonal climate swings—from intense summer heat to humid monsoon mornings—place intense demands on human thermoregulation. During a 50-minute high-intensity Crossdrill or spin session at BOMISO, an athlete can easily lose up to 1.5 liters of sweat, carrying away vital sodium, potassium, and magnesium ions.',
      'Drinking plain distilled or RO water without replenishing salts dilutes serum sodium, triggering cellular swelling, muscle cramps, and sudden drops in neuromuscular power output. To perform at your ceiling, your fluid intake must match your sweat rate and electrolyte loss.',
      'We recommend priming your hydration 60 minutes before training with cold water infused with pink Himalayan salt, freshly squeezed citrus, and a pinch of unrefined carbohydrates. Post-training, prioritize whole-food proteins and complex carbs to replenish liver and muscle glycogen, ensuring you wake up energetic rather than exhausted.',
    ],
  },
];

export const BRAND_STATS = [
  { value: '12+', label: 'Years of Excellence', detail: 'Serving Gurugram since 2013' },
  { value: '3', label: 'Prime Gurugram Clubs', detail: 'Sector 30 · Sector 50 · Sector 65' },
  { value: '18+', label: 'Certified Elite Coaches', detail: 'ACE · ISSA · CrossFit · Les Mills' },
  { value: '35+', label: 'Weekly Group Classes', detail: 'Yoga, Crossdrill, Zumba, Spin' },
];

export const FAQS = [
  {
    q: 'What is included in the complimentary BOMISO fitness trial?',
    a: 'Your complimentary visit includes a comprehensive tour of the club facilities, a 1-on-1 movement and goal consultation with a senior coach, and full access to test our strength floor or join an available group fitness session on the day of your visit.',
  },
  {
    q: 'Can I access all three Gurugram branches with one membership?',
    a: 'Yes, our Multi-Club All-Access membership enables seamless workouts across all three branches (DLF Star Mall Sector 30, Good Earth City Centre Sector 50, and M3M Tee Point Sector 65). Single-club memberships are also available if you prefer one home gym.',
  },
  {
    q: 'I am a complete beginner. Are the coaches equipped to guide me?',
    a: 'Absolutely. Every new member receives a complimentary baseline movement and postural assessment. Our trainers emphasize proper form, joint alignment, and gradual progression, making BOMISO welcoming to all fitness levels.',
  },
  {
    q: 'What are the operating hours of the clubs?',
    a: 'All BOMISO FITNESS clubs operate Monday through Saturday from 6:00 AM to 10:00 PM, and Sundays from 7:00 AM to 8:00 PM.',
  },
  {
    q: 'Is parking available at all locations?',
    a: 'Yes, all three locations are situated in established premium commercial centers with dedicated underground and surface parking, high-speed elevators, and round-the-clock security.',
  },
];

/* Demo Accounts for frictionless testing */
const DEMO_MEMBERS: UserProfile[] = [
  {
    id: 'BOMISO-M7821',
    name: 'Rohit Malhotra',
    email: 'rohit@bomiso.in',
    phone: '+91 98112 34567',
    memberTier: 'All-Access Multi-Club Elite',
    homeBranch: 'M3M Tee Point (Sector 65)',
    memberSince: 'March 2022',
    checkInCount: 142,
    qrCode: 'BOMISO-PASS-7821-SEC65',
  },
  {
    id: 'BOMISO-M6390',
    name: 'Priya Narang',
    email: 'priya@bomiso.in',
    phone: '+91 98234 56789',
    memberTier: 'Mind & Body Sanctuary Pass',
    homeBranch: 'DLF Star Mall (Sector 30)',
    memberSince: 'June 2021',
    checkInCount: 98,
    qrCode: 'BOMISO-PASS-6390-SEC30',
  },
];

/* ==========================================================================
   2. AUTHENTICATION CONTEXT (Static GitHub Pages & Server Compatible)
   ========================================================================== */

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (identifier: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { name: string; email: string; phone: string; password: string; homeBranch: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  quickDemoLogin: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AUTH_STORAGE_KEY = 'bomiso_authenticated_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // Ignore storage parse issues
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (identifier: string, pass: string) => {
    setIsLoading(true);
    try {
      // Try server endpoint if hosted with server
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password: pass }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data.user));
        return { success: true };
      }
    } catch {
      // Fallback for static GitHub Pages hosting
    }

    // Static client authentication
    const cleanId = identifier.trim().toLowerCase();
    const matched = DEMO_MEMBERS.find(
      (m) => m.email.toLowerCase() === cleanId || m.phone.replace(/\D/g, '') === cleanId.replace(/\D/g, '')
    ) || {
      id: `BOMISO-M${Math.floor(1000 + Math.random() * 9000)}`,
      name: cleanId.includes('@') ? cleanId.split('@')[0] : 'Member',
      email: cleanId.includes('@') ? cleanId : `${cleanId}@bomiso.in`,
      phone: '+91 98109 57491',
      memberTier: 'All-Access Multi-Club Elite',
      homeBranch: 'M3M Tee Point (Sector 65)',
      memberSince: 'October 2026',
      checkInCount: 1,
      qrCode: `BOMISO-PASS-${Date.now().toString().slice(-4)}`,
    };

    setUser(matched);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(matched));
    setIsLoading(false);
    return { success: true };
  };

  const register = async (userData: { name: string; email: string; phone: string; password: string; homeBranch: string }) => {
    setIsLoading(true);
    const newUser: UserProfile = {
      id: `BOMISO-M${Math.floor(1000 + Math.random() * 9000)}`,
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      phone: userData.phone.trim(),
      memberTier: 'Club Pass Member',
      homeBranch: userData.homeBranch || 'M3M Tee Point (Sector 65)',
      memberSince: 'October 2026',
      checkInCount: 1,
      qrCode: `BOMISO-PASS-${Date.now().toString().slice(-4)}`,
    };

    setUser(newUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const quickDemoLogin = async (email: string) => {
    return (await login(email, 'password123')).success;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, quickDemoLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

/* ==========================================================================
   3. AI KNOWLEDGE ENGINE (Client + Server Hybrid Fallback for GitHub Pages)
   ========================================================================== */

const queryAIKnowledge = async (message: string): Promise<string> => {
  // First attempt server-side proxy
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.reply) return data.reply;
    }
  } catch {
    // Server not available (e.g. running statically on GitHub Pages)
  }

  // Client-side grounded knowledge base
  const q = message.toLowerCase();
  if (q.includes('location') || q.includes('branch') || q.includes('where') || q.includes('address')) {
    return `BOMISO FITNESS operates 3 premier clubs across Gurugram:\n\n1. **M3M Tee Point (Sector 65)** - 3rd Floor, South Block, Golf Course Ext Road (Panoramic 4-side skyline views & turf arena).\n2. **Good Earth City Centre (Sector 50)** - 2nd Floor, Malibu Towne (Group fitness, spin theater & Les Mills).\n3. **DLF Star Mall (Sector 30)** - LG 06, NH 8 (Heavy free-weights, TRX & personal coaching).\n\nAll clubs are open Mon–Sat: 6:00 AM – 10:00 PM and Sun: 7:00 AM – 8:00 PM!`;
  }
  if (q.includes('time') || q.includes('timing') || q.includes('hours') || q.includes('open') || q.includes('close')) {
    return `All three BOMISO clubs operate:\n• **Monday to Saturday**: 6:00 AM – 10:00 PM\n• **Sunday**: 7:00 AM – 8:00 PM\n\nMorning peak slots run 6:30–9:30 AM, and evening sessions from 5:30–9:30 PM. Would you like to schedule a visit?`;
  }
  if (q.includes('trial') || q.includes('free') || q.includes('visit') || q.includes('guest')) {
    return `Yes! We offer a complimentary trial pass for prospective members in Gurugram. It includes full access to the strength/cardio floor, an optional coach movement screen, and a club tour. You can request your trial right here or WhatsApp us directly at **+91 99106 65194**!`;
  }
  if (q.includes('price') || q.includes('cost') || q.includes('fee') || q.includes('membership')) {
    return `We offer flexible Single-Club and Multi-Club All-Access memberships with quarterly and annual options. Each includes locker room amenities, steam recovery, and coach inductions. Call our desk at **+91 98109 57491** or WhatsApp **+91 99106 65194** for current seasonal rates.`;
  }
  if (q.includes('trainer') || q.includes('coach') || q.includes('personal')) {
    return `Our master trainers hold verified credentials from ISSA, ACE, CrossFit Level 1, Les Mills, and 500-Hr Yoga Alliance. 1-on-1 personal coaching is available across all 3 Gurugram locations with custom periodization and nutrition planning.`;
  }
  if (q.includes('whatsapp') || q.includes('phone') || q.includes('contact') || q.includes('number')) {
    return `Reach our Gurugram club team directly:\n• **WhatsApp**: +91 99106 65194\n• **Central Desk**: +91 98109 57491\n• **Email**: info@bomiso.in`;
  }
  return `Hello! I'm BOMISO AI. I can answer questions about our 3 Gurugram clubs (Sector 30, Sector 50, Sector 65), class timetables (Strength, Crossdrill, Yoga, Zumba, Spin), certified trainers, or booking your free trial. What can I help you with?`;
};

/* ==========================================================================
   4. UI SUB-COMPONENTS
   ========================================================================== */

// Top Bar Navigation
const Navbar: React.FC<{
  onOpenTrial: (branchId?: string) => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  activeSection: string;
}> = ({ onOpenTrial, onOpenAuth, onOpenProfile, activeSection }) => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Programs', href: '#programs' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Coaches', href: '#coaches' },
    { name: 'Locations', href: '#locations' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Insights', href: '#insights' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/80 py-3 shadow-lg'
            : 'bg-gradient-to-b from-neutral-950/90 via-neutral-950/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2 text-2xl md:text-3xl font-display font-extrabold tracking-tight text-white uppercase whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f221] rounded"
          >
            <span>BOMISO</span>
            <span className="text-[#c6f221] font-bold">FITNESS</span>
            <span className="text-[10px] tracking-widest text-neutral-400 font-sans font-medium hidden sm:inline ml-1 uppercase">
              Body · Mind · Soul
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 relative hover:text-white ${
                    isActive ? 'text-[#c6f221] font-semibold' : 'text-neutral-300'
                  }`}
                >
                  {link.name}
                  {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c6f221]" />}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Auth */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenProfile}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-[#c6f221] text-xs text-white transition-all cursor-pointer group"
                  title="View Digital Pass & Profile"
                >
                  <span className="w-6 h-6 rounded-full bg-[#c6f221] text-neutral-950 font-bold flex items-center justify-center text-[11px]">
                    {user.name.charAt(0)}
                  </span>
                  <span className="font-semibold hidden sm:inline group-hover:text-[#c6f221] transition-colors truncate max-w-[100px]">
                    {user.name.split(' ')[0]}
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c6f221] hidden sm:inline" />
                </button>

                <button
                  onClick={logout}
                  className="p-2 rounded-full text-neutral-400 hover:text-red-400 hover:bg-neutral-900 transition-colors cursor-pointer"
                  title="Sign Out"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-900 rounded transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-[#c6f221]" />
                <span>Member Login</span>
              </button>
            )}

            <button
              onClick={() => onOpenTrial()}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-[#c6f221] hover:bg-[#b4df16] active:scale-[0.98] transition-all rounded shadow-md whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book a Free Trial
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-16 right-0 left-0 bg-neutral-950 border-b border-neutral-800 p-6 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
            {user ? (
              <div className="p-3.5 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#c6f221] text-neutral-950 font-bold flex items-center justify-center text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{user.name}</div>
                    <div className="text-[10px] text-[#c6f221]">{user.memberTier}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setMobileMenuOpen(false); onOpenProfile(); }}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-neutral-800 text-white rounded hover:bg-neutral-700"
                  >
                    Pass
                  </button>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="p-1 text-red-400 hover:text-red-300"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                className="w-full py-2.5 px-4 rounded bg-neutral-900 border border-neutral-800 text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-[#c6f221]" />
                <span>Member Sign In / Register</span>
              </button>
            )}

            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-neutral-200 hover:text-[#c6f221] py-1.5 border-b border-neutral-900"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="pt-2 flex flex-col gap-3">
              <div className="text-xs text-neutral-400 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#c6f221]" />
                <span>Sector 30 · Sector 50 · Sector 65 Gurugram</span>
              </div>
              <a href="tel:+919810957491" className="flex items-center gap-2 text-sm text-neutral-300 py-1">
                <Phone className="w-4 h-4 text-[#c6f221]" />
                <span>Call Club: +91 98109 57491</span>
              </a>
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenTrial(); }}
                className="w-full py-3 text-center text-sm font-bold uppercase tracking-wider text-neutral-950 bg-[#c6f221] hover:bg-[#b4df16] rounded"
              >
                Book a Free Trial
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Hero Section
const Hero: React.FC<{
  onOpenTrial: () => void;
  onExplorePrograms: () => void;
}> = ({ onOpenTrial, onExplorePrograms }) => (
  <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-neutral-950">
    <div className="absolute inset-0 z-0">
      <img
        src={heroImg}
        alt="Athlete training at BOMISO Fitness Gurugram"
        className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08] scale-105 transition-transform duration-1000 ease-out"
        loading="eager"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/65 to-neutral-950/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(198,242,33,0.08),transparent_60%)]" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider uppercase text-neutral-300 mb-4">
          <span className="text-[#c6f221] font-bold">Gurugram's Premier Fitness Club</span>
          <span aria-hidden="true" className="text-neutral-500">·</span>
          <span>Sec 30 · Sec 50 · Sec 65</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight text-white leading-[0.95] mb-6 drop-shadow-sm text-balance">
          Your Body. <br />
          Your Mind. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#c6f221]">
            Your Next Level.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-neutral-300 max-w-2xl leading-relaxed mb-8 font-normal font-sans">
          More than a workout. A community built around movement, strength, and feeling your best. Experience premier equipment, certified master coaches, and transformative energy across Gurugram.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            onClick={onOpenTrial}
            className="px-8 py-4 text-sm font-bold uppercase tracking-wider text-neutral-950 bg-[#c6f221] hover:bg-[#b4df16] active:scale-[0.98] transition-all rounded shadow-lg shadow-[#c6f221]/15 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Book a Free Trial</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onExplorePrograms}
            className="px-7 py-4 text-sm font-semibold uppercase tracking-wider text-white border border-neutral-700 hover:border-neutral-400 hover:bg-neutral-900/60 transition-all rounded flex items-center justify-center gap-2 cursor-pointer"
          >
            Explore Our Programs
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#c6f221]" />
            <span>Certified ACE & ISSA Master Coaches</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#c6f221]" />
            <span>3 Prime Clubs across Gurugram</span>
          </div>
          <div className="text-neutral-500">
            No High-Pressure Sales · Instant Confirmation
          </div>
        </div>
      </div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-lg bg-neutral-900/80 border border-neutral-800 backdrop-blur-md">
        {BRAND_STATS.map((stat) => (
          <div key={stat.label} className="border-l border-neutral-800 pl-4 first:border-l-0">
            <div className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight tabular-nums">
              {stat.value}
            </div>
            <div className="text-xs font-semibold text-neutral-300 mt-0.5">
              {stat.label}
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              {stat.detail}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <a
          href="#philosophy"
          className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-neutral-400 hover:text-[#c6f221] transition-colors"
        >
          <span>Scroll to Discover</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </div>
  </section>
);

// Brand Philosophy Section
const BrandPhilosophy: React.FC<{ onSelectCategory: (cat: string) => void }> = ({ onSelectCategory }) => {
  const pillars = [
    {
      key: 'body',
      label: 'BODY',
      title: 'Physical Power & Biomechanical Integrity',
      icon: Dumbbell,
      description: 'Build real, resilient strength, cardiovascular stamina, and joint longevity. From Olympic barbell technique to high-velocity functional crossdrill, we prioritize clean form before loading.',
      highlights: ['Strength & Hypertrophy', 'Functional Crossdrill', 'Biomechanical Assessments'],
      image: strengthImg,
      filterCategory: 'strength',
    },
    {
      key: 'mind',
      label: 'MIND',
      title: 'Mental Clarity & Unshakable Focus',
      icon: Brain,
      description: 'Discipline under tension shapes mental toughness. Through somatic yoga flows, reformer Pilates, and structured breathwork, training becomes your daily sanctuary from modern mental fatigue.',
      highlights: ['Vinyasa & Hatha Yoga', 'Reformer & Mat Pilates', 'Breathwork Recovery'],
      image: yogaImg,
      filterCategory: 'mind-body',
    },
    {
      key: 'soul',
      label: 'SOUL',
      title: 'Vibrant Community & Pure Joy in Movement',
      icon: HeartHandshake,
      description: 'A fitness journey is never meant to be solitary. Step into sunlit studios, electrifying group dance and spin rooms, and a welcoming club culture where members celebrate each other’s milestones.',
      highlights: ['High-Energy Group Classes', 'Spin & Rhythm Cadence', 'Supportive Community'],
      image: facilityTeePointImg,
      filterCategory: 'cardio',
    },
  ];

  return (
    <section id="philosophy" className="py-24 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#c6f221] mb-2">
            The BOMISO Tripartite Philosophy
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white mb-6 text-balance">
            Fitness That Goes Beyond The Physical.
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-sans font-normal">
            BOMISO is born from an uncompromising conviction: true wellness is not just burning calories or lifting numbers. It is the conscious alignment of <span className="text-white font-semibold">Body</span>, <span className="text-white font-semibold">Mind</span>, and <span className="text-white font-semibold">Soul</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.key}
                className="group relative flex flex-col justify-between rounded-lg border border-neutral-800 bg-neutral-900/60 overflow-hidden transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900"
              >
                <div className="relative h-60 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={pillar.image}
                    alt={`${pillar.label} philosophy at BOMISO`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded text-xs font-display font-extrabold tracking-widest text-white border border-neutral-800">
                    <Icon className="w-3.5 h-3.5 text-[#c6f221]" />
                    <span>{pillar.label}</span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-white mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                    <div className="space-y-1.5 mb-6 text-xs text-neutral-400">
                      {pillar.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c6f221]/80" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectCategory(pillar.filterCategory)}
                    className="inline-flex items-center justify-between w-full pt-4 border-t border-neutral-800/80 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-[#c6f221] transition-colors group/btn cursor-pointer"
                  >
                    <span>Explore {pillar.label} Disciplines</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Programs Section
const ProgramsSection: React.FC<{
  onSelectProgram: (prog: Program) => void;
  onOpenTrialWithProgram: (name: string) => void;
  selectedCategoryFilter: string;
  onFilterChange: (cat: string) => void;
}> = ({ onSelectProgram, onOpenTrialWithProgram, selectedCategoryFilter, onFilterChange }) => {
  const categories = [
    { id: 'all', label: 'All Programs' },
    { id: 'strength', label: 'Strength & Crossdrill' },
    { id: 'mind-body', label: 'Yoga & Pilates' },
    { id: 'cardio', label: 'Cardio, Spin & Dance' },
    { id: 'specialized', label: 'Coaching & Youth' },
  ];

  const filteredPrograms =
    selectedCategoryFilter === 'all'
      ? PROGRAMS
      : PROGRAMS.filter((p) => p.category === selectedCategoryFilter);

  return (
    <section id="programs" className="py-24 bg-neutral-900/50 text-white border-y border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-widest text-[#c6f221] mb-2">
              Comprehensive Training Ecosystem
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white mb-4">
              Explore Our Fitness Programs
            </h2>
            <p className="text-sm sm:text-base text-neutral-300">
              From Olympic lifting to somatic mindfulness, explore scientific training designed by certified coaches for tangible, long-term results.
            </p>
          </div>

          <div className="text-xs text-neutral-400 bg-neutral-950/80 p-3.5 rounded border border-neutral-800 flex items-start gap-2 max-w-sm">
            <MapPin className="w-4 h-4 text-[#c6f221] shrink-0 mt-0.5" />
            <span>
              Specific class schedules vary between Sector 30, 50, and 65 clubs. Enquire to confirm current weekly timetable.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onFilterChange(cat.id)}
                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0 rounded transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#c6f221] text-neutral-950 font-extrabold shadow-sm'
                    : 'bg-neutral-800/80 text-neutral-300 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="group flex flex-col justify-between rounded-lg border border-neutral-800 bg-neutral-950 overflow-hidden hover:border-neutral-700 transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                <img
                  src={program.image}
                  alt={program.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-semibold">
                  <span className="flex items-center gap-1 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded text-neutral-200 border border-neutral-800">
                    <Clock className="w-3 h-3 text-[#c6f221]" />
                    <span className="font-mono">{program.duration}</span>
                  </span>
                  <span className="flex items-center gap-1 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded text-neutral-200 border border-neutral-800">
                    <Gauge className="w-3 h-3 text-[#c6f221]" />
                    <span>{program.intensity}</span>
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-display font-bold uppercase tracking-tight text-white mb-2 group-hover:text-[#c6f221] transition-colors">
                    {program.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mb-3 font-medium">
                    {program.subtitle}
                  </p>
                  <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed mb-4">
                    {program.description}
                  </p>
                  <div className="text-[11px] text-neutral-400 mb-5">
                    <span className="text-neutral-500">Available at: </span>
                    {program.locations.join(' · ')}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-4 border-t border-neutral-900">
                  <button
                    onClick={() => onSelectProgram(program)}
                    className="text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <span>Discover Program</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onOpenTrialWithProgram(program.name)}
                    className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-[#c6f221] hover:bg-[#b4df16] rounded transition-colors cursor-pointer"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Experience Split Section
const ExperienceSplit: React.FC<{ onFindBOMISO: () => void; onOpenTrial: () => void }> = ({ onFindBOMISO, onOpenTrial }) => (
  <section className="py-24 bg-neutral-950 text-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="relative h-[440px] sm:h-[540px] rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900 group">
          <img
            src={facilityTeePointImg}
            alt="BOMISO Fitness Club interior overlooking Gurugram"
            className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 p-6 rounded-lg bg-neutral-950/85 backdrop-blur-md border border-neutral-800">
            <div className="text-xs font-bold uppercase tracking-widest text-[#c6f221] mb-1">
              The BOMISO Standard
            </div>
            <p className="text-sm font-medium text-white italic">
              "We built BOMISO to solve what standard commercial gyms get wrong: no overcrowded dark basements, no uncaring trainers, and no disjointed workout fads."
            </p>
            <div className="mt-3 text-[11px] text-neutral-400 font-sans">
              Gurugram Operations · Founded 2013
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-xs font-bold uppercase tracking-widest text-[#c6f221] mb-2">
            The BOMISO Experience
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white mb-6 text-balance">
            Your Fitness Journey. <br />
            Your Community.
          </h2>
          <p className="text-base text-neutral-300 leading-relaxed mb-8">
            At BOMISO FITNESS, we reject one-size-fits-all routines. From day one, you are welcomed by an expert team dedicated to understanding your schedule, movement history, and personal aspirations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1.5 text-white font-semibold text-sm">
                <Award className="w-4 h-4 text-[#c6f221] shrink-0" />
                <span>Certified Master Coaches</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Credentials from ISSA, ACE, CrossFit L1, and Les Mills with ongoing biomechanics education.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1.5 text-white font-semibold text-sm">
                <Sparkles className="w-4 h-4 text-[#c6f221] shrink-0" />
                <span>Multi-Discipline Access</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Seamlessly rotate between barbell strength, Crossdrill turf, yoga, and rhythm spinning.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1.5 text-white font-semibold text-sm">
                <ShieldCheck className="w-4 h-4 text-[#c6f221] shrink-0" />
                <span>Immaculate Hygiene</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Hospital-grade air filtration, sanitization between slots, luxury lockers, and steam recovery.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1.5 text-white font-semibold text-sm">
                <MapPin className="w-4 h-4 text-[#c6f221] shrink-0" />
                <span>3 Prime Gurugram Hubs</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Flexible multi-access memberships across Sector 30, Sector 50, and Sector 65.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onFindBOMISO}
              className="px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-[#c6f221] hover:bg-[#b4df16] active:scale-[0.98] transition-all rounded shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Find Your BOMISO</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenTrial}
              className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-600 rounded transition-colors cursor-pointer"
            >
              Request a Club Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Coaches Section
const CoachesSection: React.FC<{
  onSelectCoach: (coach: Coach) => void;
  onBookWithCoach: (coachName: string) => void;
}> = ({ onSelectCoach, onBookWithCoach }) => (
  <section id="coaches" className="py-24 bg-neutral-900/40 text-white border-t border-neutral-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-widest text-[#c6f221] mb-2">
            Certified Human Guidance
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white mb-4">
            Our Master Coaches
          </h2>
          <p className="text-sm sm:text-base text-neutral-300">
            Coached by certified practitioners who live and breathe biomechanics, mindful movement, and athletic conditioning. No unvetted trainers or generic cookie-cutter plans.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-neutral-400 border border-neutral-800 bg-neutral-950 p-3 rounded">
          <Shield className="w-4 h-4 text-[#c6f221]" />
          <span>ISSA · ACE · CrossFit · Les Mills · Yoga Alliance Certified</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COACHES.map((coach) => (
          <div
            key={coach.id}
            className="group flex flex-col justify-between rounded-lg border border-neutral-800 bg-neutral-950 p-6 sm:p-7 hover:border-neutral-700 transition-all duration-300 hover:shadow-xl"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-display font-bold uppercase tracking-tight text-white group-hover:text-[#c6f221] transition-colors">
                    {coach.name}
                  </h3>
                  <div className="text-xs text-neutral-400 font-medium mt-0.5">
                    {coach.role}
                  </div>
                </div>
                <span className="text-[11px] font-mono text-[#c6f221] bg-neutral-900 px-2 py-1 rounded border border-neutral-800 shrink-0">
                  {coach.experience}
                </span>
              </div>

              <blockquote className="text-xs italic text-neutral-300 border-l-2 border-neutral-800 pl-3 py-1 mb-5">
                "{coach.quote}"
              </blockquote>

              <div className="mb-4">
                <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#c6f221]" />
                  <span>Verified Certifications</span>
                </div>
                <div className="flex flex-wrap gap-1.5 text-[11px] text-neutral-300">
                  {coach.certifications.map((cert, idx) => (
                    <span key={idx} className="bg-neutral-900 border border-neutral-800/80 px-2 py-0.5 rounded text-neutral-300">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                  Specialties
                </div>
                <div className="text-xs text-neutral-400">
                  {coach.specialties.join(' · ')}
                </div>
              </div>

              <div className="text-[11px] text-neutral-400 mb-6">
                <span className="text-neutral-500">Based at: </span>
                {coach.location}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-4 border-t border-neutral-900">
              <button
                onClick={() => onSelectCoach(coach)}
                className="text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <span>View Bio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onBookWithCoach(coach.name)}
                className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-[#c6f221] hover:bg-[#b4df16] rounded transition-colors cursor-pointer"
              >
                Train With Coach
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Locations Section
const LocationsSection: React.FC<{ onBookAtLocation: (id: string) => void }> = ({ onBookAtLocation }) => {
  const [selectedBranchId, setSelectedBranchId] = useState<string>('tee-point');
  const branchImgs: Record<string, string> = {
    'tee-point': facilityTeePointImg,
    'good-earth': crossdrillImg,
    'star-mall': strengthImg,
  };

  return (
    <section id="locations" className="py-24 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#c6f221] mb-2">
            3 Prime Gurugram Locations
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white mb-4">
            Find Your Nearest BOMISO Club
          </h2>
          <p className="text-sm sm:text-base text-neutral-300">
            Strategically located across Sector 30, Sector 50, and Sector 65. Choose your home club or enjoy multi-access flexibility across Gurugram.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {BRANCHES.map((branch) => {
            const isSelected = selectedBranchId === branch.id;
            const bImg = branchImgs[branch.id] || facilityTeePointImg;

            return (
              <div
                key={branch.id}
                onClick={() => setSelectedBranchId(branch.id)}
                className={`flex flex-col justify-between rounded-lg border bg-neutral-900/60 overflow-hidden transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-[#c6f221] ring-1 ring-[#c6f221]/50 shadow-2xl bg-neutral-900'
                    : 'border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/80'
                }`}
              >
                <div className="relative h-52 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={bImg}
                    alt={branch.name}
                    className="w-full h-full object-cover filter brightness-90 transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                  <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-white border border-neutral-800">
                    {branch.sector}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white font-display font-bold text-lg uppercase tracking-tight">
                    {branch.mall}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-neutral-300 italic mb-5 leading-relaxed">
                      "{branch.tagline}"
                    </p>

                    <div className="flex items-start gap-2.5 text-xs text-neutral-300 mb-4 pb-4 border-b border-neutral-800">
                      <MapPin className="w-4 h-4 text-[#c6f221] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{branch.address} - {branch.pincode}</span>
                    </div>

                    <div className="flex items-start gap-2.5 text-xs text-neutral-400 mb-4 pb-4 border-b border-neutral-800">
                      <Clock className="w-4 h-4 text-[#c6f221] shrink-0 mt-0.5" />
                      <div className="leading-tight space-y-1">
                        <div>Mon - Sat: <span className="text-neutral-200 font-mono">{branch.timings.weekdays}</span></div>
                        <div>Sunday: <span className="text-neutral-200 font-mono">{branch.timings.sunday}</span></div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-neutral-300 mb-6">
                      <a href={`tel:${branch.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:text-[#c6f221] transition-colors">
                        <Phone className="w-3.5 h-3.5 text-[#c6f221]" />
                        <span className="font-mono tabular-nums">{branch.phone}</span>
                      </a>
                      <a href={`mailto:${branch.email}`} className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                        <MailIcon className="w-3.5 h-3.5 text-[#c6f221]" />
                        <span>{branch.email}</span>
                      </a>
                    </div>

                    <div className="mb-6 space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                        Branch Highlights
                      </div>
                      {branch.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#c6f221] shrink-0 mt-0.5" />
                          <span className="leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-neutral-800">
                    <button
                      onClick={(e) => { e.stopPropagation(); onBookAtLocation(branch.id); }}
                      className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-[#c6f221] hover:bg-[#b4df16] rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Trial at {branch.sector}</span>
                    </button>

                    <a
                      href={branch.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full py-2 text-xs font-medium uppercase tracking-wider text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-600 rounded flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Get Directions (Google Maps)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Gallery Section with Lightbox
const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'strength', label: 'Strength & Lifting' },
    { id: 'crossdrill', label: 'Crossdrill & Turf' },
    { id: 'mind-body', label: 'Yoga & Pilates Studios' },
    { id: 'facility', label: 'Skyline Facilities' },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <section id="gallery" className="py-24 bg-neutral-900/50 text-white border-y border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-[#c6f221] mb-2">
            Inside BOMISO Clubs
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white mb-4">
            Fitness Gallery
          </h2>
          <p className="text-sm sm:text-base text-neutral-300">
            A window into daily life across our Gurugram facilities. From sunrise mindfulness flows to heavy barbell evening sessions.
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap rounded transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#c6f221] text-neutral-950 font-extrabold shadow-sm'
                  : 'bg-neutral-800/80 text-neutral-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div className="self-end">
                  <div className="p-2 rounded bg-neutral-950/80 backdrop-blur-md text-white border border-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4 text-[#c6f221]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-display font-bold uppercase text-white tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-300 line-clamp-1 mt-1">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-700 z-10 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0));
            }}
            className="absolute left-4 p-3 rounded-full bg-neutral-900/80 text-white hover:bg-neutral-800 border border-neutral-800 z-10 cursor-pointer hidden sm:block"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded border border-neutral-800"
            />
            <div className="mt-4 text-center">
              <h3 className="text-lg font-display font-bold text-white uppercase tracking-wide">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-xl mx-auto">
                {filteredItems[lightboxIndex].caption}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0));
            }}
            className="absolute right-4 p-3 rounded-full bg-neutral-900/80 text-white hover:bg-neutral-800 border border-neutral-800 z-10 cursor-pointer hidden sm:block"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};

// Reviews Section
const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const nextReview = () => setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);

  return (
    <section id="reviews" className="py-24 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-widest text-[#c6f221] mb-2">
              Authentic Member Feedback
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white mb-4">
              Community Voices & Verified Reviews
            </h2>
            <p className="text-sm sm:text-base text-neutral-300">
              Read genuine experiences from Gurugram residents, corporate leaders, and athletes training at BOMISO clubs.
            </p>
          </div>

          <div className="flex items-center gap-6 p-4 rounded-lg bg-neutral-900 border border-neutral-800">
            <div>
              <div className="flex items-center gap-1 text-[#c6f221] mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#c6f221] text-[#c6f221]" />
                ))}
              </div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Google: <span className="font-mono text-[#c6f221]">4.3★</span> (420+ Reviews)
              </div>
            </div>
            <div className="border-l border-neutral-800 pl-6">
              <div className="flex items-center gap-1 text-[#c6f221] mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#c6f221] text-[#c6f221]" />
                ))}
              </div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Justdial: <span className="font-mono text-[#c6f221]">5.0★</span> Top Gym
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 relative p-8 sm:p-10 rounded-lg border border-neutral-800 bg-neutral-900/60 flex flex-col justify-between">
            <Quote className="w-10 h-10 text-[#c6f221]/30 mb-6" />
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-[#c6f221]">
                {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#c6f221] text-[#c6f221]" />
                ))}
                <span className="text-xs text-neutral-400 ml-2 font-mono">
                  {TESTIMONIALS[currentIndex].source}
                </span>
              </div>
              <p className="text-lg sm:text-xl text-neutral-100 font-medium leading-relaxed">
                "{TESTIMONIALS[currentIndex].comment}"
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-6 border-t border-neutral-800/80">
              <div>
                <div className="text-base font-bold text-white uppercase tracking-tight">
                  {TESTIMONIALS[currentIndex].name}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  {TESTIMONIALS[currentIndex].locality} · <span className="text-[#c6f221]">{TESTIMONIALS[currentIndex].program}</span>
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5">
                  {TESTIMONIALS[currentIndex].memberSince}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevReview}
                  className="p-2.5 rounded bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="text-xs font-mono text-neutral-400 px-2">
                  {currentIndex + 1} / {TESTIMONIALS.length}
                </div>
                <button
                  onClick={nextReview}
                  className="p-2.5 rounded bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {TESTIMONIALS.filter((_, idx) => idx !== currentIndex).slice(0, 2).map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  const targetIdx = TESTIMONIALS.findIndex((t) => t.id === item.id);
                  if (targetIdx !== -1) setCurrentIndex(targetIdx);
                }}
                className="p-6 rounded-lg border border-neutral-800 bg-neutral-950 hover:border-neutral-700 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-bold text-white">{item.name}</span>
                    <span className="text-[10px] text-neutral-400">{item.source}</span>
                  </div>
                  <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed mb-4">
                    "{item.comment}"
                  </p>
                </div>
                <div className="text-[11px] text-[#c6f221] font-medium">
                  {item.program}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Wellness Insights Section
const WellnessInsightsSection: React.FC<{ onReadArticle: (art: InsightArticle) => void }> = ({ onReadArticle }) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Nutrition' | 'Recovery' | 'Training'>('All');
  const categories: Array<'All' | 'Nutrition' | 'Recovery' | 'Training'> = ['All', 'Nutrition', 'Recovery', 'Training'];
  const filteredArticles = activeCategory === 'All' ? INSIGHTS : INSIGHTS.filter((a) => a.category === activeCategory);

  return (
    <section id="insights" className="py-24 bg-neutral-900/60 text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-widest text-[#c6f221] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Evidence-Based Fitness Science</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white mb-4">
              Wellness Insights
            </h2>
            <p className="text-sm sm:text-base text-neutral-300">
              Expert articles, biomechanical breakdowns, and nutrition protocols curated by certified BOMISO master coaches to accelerate your strength and recovery.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap rounded transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#c6f221] text-neutral-950 font-extrabold shadow-sm'
                    : 'bg-neutral-800/80 text-neutral-300 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat === 'All' ? 'All Insights' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col justify-between rounded-lg border border-neutral-800 bg-neutral-950 overflow-hidden hover:border-neutral-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div onClick={() => onReadArticle(article)} className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900 cursor-pointer">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono text-neutral-300 border border-neutral-800">
                  <Clock className="w-3 h-3 text-[#c6f221]" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3 font-medium">
                    <span className="font-bold uppercase tracking-wider text-[#c6f221]">{article.category}</span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span className="text-neutral-400">{article.publishDate}</span>
                  </div>
                  <h3
                    onClick={() => onReadArticle(article)}
                    className="text-lg sm:text-xl font-display font-bold uppercase tracking-tight text-white mb-3 group-hover:text-[#c6f221] transition-colors cursor-pointer text-balance"
                  >
                    {article.title}
                  </h3>
                  <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed mb-6 font-sans">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-900 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-neutral-400 truncate max-w-[65%]">
                    <span className="text-neutral-500 block text-[10px] uppercase">By</span>
                    <span className="text-neutral-200 font-medium truncate block">{article.author}</span>
                  </div>
                  <button
                    onClick={() => onReadArticle(article)}
                    className="text-xs font-bold uppercase tracking-wider text-[#c6f221] hover:text-[#b4df16] flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// Trial Booking Section
const TrialBookingSection: React.FC<{
  initialBranchId?: string;
  initialProgramName?: string;
  onSuccess?: () => void;
}> = ({ initialBranchId, initialProgramName, onSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [preferredBranch, setPreferredBranch] = useState(initialBranchId || 'tee-point');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('Morning (6:00 AM – 10:00 AM)');
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'call'>('whatsapp');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    initialProgramName ? [initialProgramName] : ['Strength & Conditioning']
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ id: string; name: string; branchName: string } | null>(null);

  const interestOptions = [
    'Strength & Conditioning', 'Crossdrill & Turf', 'Personal Coaching', 'Yoga & Mindfulness',
    'Pilates & Core', 'Boxing & Combat', 'Zumba & Dance', 'Spinning & Cycling', 'Kids Fitness',
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      if (selectedInterests.length > 1) setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) errs.fullName = 'Please enter your full name.';
    const cleanedPhone = mobileNumber.replace(/\D/g, '');
    if (!cleanedPhone || !/^[6-9]\d{9}$/.test(cleanedPhone)) errs.mobileNumber = 'Please enter a valid 10-digit Indian mobile number (e.g. 9810957491).';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Please enter a valid email address.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    const selectedBranchObj = BRANCHES.find((b) => b.id === preferredBranch) || BRANCHES[0];
    const subId = `BOMISO-${Date.now().toString().slice(-6)}`;

    try {
      const existing = JSON.parse(localStorage.getItem('bomiso_trial_submissions') || '[]');
      existing.unshift({
        id: subId,
        name: fullName.trim(),
        mobile: mobileNumber.replace(/\D/g, ''),
        email: email.trim(),
        branchName: selectedBranchObj.name,
        interests: selectedInterests,
        timeSlot: preferredTimeSlot,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('bomiso_trial_submissions', JSON.stringify(existing));
    } catch {}

    setSubmittedData({ id: subId, name: fullName.trim(), branchName: selectedBranchObj.name });
    setIsSubmitting(false);
    if (onSuccess) onSuccess();
  };

  const getWhatsAppLink = () => {
    if (!submittedData) return '#';
    const text = encodeURIComponent(
      `Hello BOMISO FITNESS! I just booked a complimentary trial (Ref: ${submittedData.id}) for ${submittedData.name} at ${submittedData.branchName}. Please confirm my session slot.`
    );
    return `https://wa.me/${WHATSAPP_CONFIG.raw}?text=${text}`;
  };

  return (
    <section id="trial" className="py-24 bg-neutral-900/40 text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <div className="text-xs font-bold uppercase tracking-widest text-[#c6f221] mb-2">
              Start Your Journey
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white mb-6 text-balance">
              Your Next Chapter Starts Here.
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed mb-8">
              Ready to move, grow, and feel stronger? Find your nearest BOMISO and take the first step toward your fitness goals.
            </p>

            <div className="space-y-4 mb-8 bg-neutral-950 p-6 rounded-lg border border-neutral-800 text-xs text-neutral-300">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-200">
                What's Included in Your Trial:
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c6f221] shrink-0 mt-0.5" />
                <span>Full access to strength, cardio, and turf functional zones</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c6f221] shrink-0 mt-0.5" />
                <span>Complimentary posture and movement assessment with a coach</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c6f221] shrink-0 mt-0.5" />
                <span>Experience an available group class (Yoga, Crossdrill, Zumba)</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-neutral-400">
              <Shield className="w-5 h-5 text-[#c6f221] shrink-0" />
              <span>
                Need immediate assistance? Call our Gurugram club concierge at{' '}
                <a href="tel:+919810957491" className="text-white font-mono hover:text-[#c6f221]">+91 98109 57491</a>.
              </span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-neutral-950 p-6 sm:p-10 rounded-lg border border-neutral-800 shadow-2xl">
              {submittedData ? (
                <div className="py-8 text-center space-y-6">
                  <div className="w-16 h-16 bg-[#c6f221]/10 border border-[#c6f221]/30 rounded-full flex items-center justify-center mx-auto text-[#c6f221]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#c6f221]">
                      Reference ID: {submittedData.id}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white mt-1">
                      Trial Request Received!
                    </h3>
                    <p className="text-sm text-neutral-300 mt-2 max-w-md mx-auto">
                      Thank you, <span className="text-white font-semibold">{submittedData.name}</span>. Our club manager at <span className="text-white font-semibold">{submittedData.branchName}</span> has received your details and will connect with you shortly.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-[#25D366] hover:bg-[#20ba5a] rounded flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                    <a
                      href="tel:+919810957491"
                      className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-neutral-200 border border-neutral-700 hover:border-neutral-400 rounded flex items-center justify-center gap-2 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#c6f221]" />
                      <span>Call Concierge</span>
                    </a>
                  </div>

                  <button onClick={() => setSubmittedData(null)} className="text-xs text-neutral-400 hover:text-white underline cursor-pointer">
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Full Name <span className="text-[#c6f221]">*</span>
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Kabir Mehrotra"
                      className={`w-full bg-neutral-900 border ${errors.fullName ? 'border-red-500' : 'border-neutral-800 focus:border-[#c6f221]'} rounded px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none`}
                    />
                    {errors.fullName && <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        Indian Mobile Number <span className="text-[#c6f221]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 text-xs font-mono">+91</div>
                        <input
                          type="tel"
                          maxLength={10}
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          placeholder="98109 57491"
                          className={`w-full bg-neutral-900 border ${errors.mobileNumber ? 'border-red-500' : 'border-neutral-800 focus:border-[#c6f221]'} rounded pl-12 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none font-mono tabular-nums`}
                        />
                      </div>
                      {errors.mobileNumber && <p className="mt-1 text-xs text-red-400">{errors.mobileNumber}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        Email Address <span className="text-neutral-500 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="kabir@example.com"
                        className={`w-full bg-neutral-900 border ${errors.email ? 'border-red-500' : 'border-neutral-800 focus:border-[#c6f221]'} rounded px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      Preferred BOMISO Club <span className="text-[#c6f221]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {BRANCHES.map((b) => (
                        <button
                          type="button"
                          key={b.id}
                          onClick={() => setPreferredBranch(b.id)}
                          className={`p-3 rounded border text-left transition-all cursor-pointer ${
                            preferredBranch === b.id ? 'border-[#c6f221] bg-[#c6f221]/10 text-white' : 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-700'
                          }`}
                        >
                          <div className="text-xs font-bold uppercase">{b.sector}</div>
                          <div className="text-[11px] text-neutral-400 truncate">{b.mall.split(',')[0]}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      Your Fitness Interests <span className="text-[#c6f221]">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {interestOptions.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => toggleInterest(opt)}
                          className={`px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer ${
                            selectedInterests.includes(opt) ? 'bg-[#c6f221] text-neutral-950 font-bold shadow-sm' : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-neutral-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-950 bg-[#c6f221] hover:bg-[#b4df16] active:scale-[0.99] disabled:opacity-50 transition-all rounded shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request My Free Trial</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-neutral-950 text-white border-t border-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-[#c6f221] mb-2">
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold uppercase tracking-tight text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-neutral-400">
            Everything you need to know about joining BOMISO FITNESS, trial sessions, and our Gurugram facilities.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="rounded-lg border border-neutral-800 bg-neutral-900/40 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#c6f221] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer: React.FC = () => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <>
      <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800 pt-16 pb-24 lg:pb-16 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2 text-2xl font-display font-extrabold tracking-tight text-white uppercase">
                <span>BOMISO</span>
                <span className="text-[#c6f221]">FITNESS</span>
              </div>
              <div className="text-xs font-mono tracking-widest text-[#c6f221] uppercase">
                BODY · MIND · SOUL
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
                Gurugram's premier fitness and wellness community. Over a decade of strength conditioning, mindful yoga flows, certified master coaching, and high-energy group workouts.
              </p>
              <div className="space-y-2 pt-2 text-neutral-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#c6f221]" />
                  <a href="tel:+919810957491" className="font-mono tabular-nums hover:text-white">+91 98109 57491 (Central Desk)</a>
                </div>
                <div className="flex items-center gap-2">
                  <MailIcon className="w-3.5 h-3.5 text-[#c6f221]" />
                  <a href="mailto:info@bomiso.in" className="hover:text-white">info@bomiso.in</a>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-white mb-4">Explore</div>
              <ul className="space-y-2.5">
                <li><a href="#programs" className="hover:text-[#c6f221]">Fitness Programs</a></li>
                <li><a href="#philosophy" className="hover:text-[#c6f221]">Body · Mind · Soul</a></li>
                <li><a href="#coaches" className="hover:text-[#c6f221]">Our Master Coaches</a></li>
                <li><a href="#locations" className="hover:text-[#c6f221]">Club Locations</a></li>
                <li><a href="#gallery" className="hover:text-[#c6f221]">Fitness Gallery</a></li>
                <li><a href="#reviews" className="hover:text-[#c6f221]">Member Reviews</a></li>
                <li><a href="#insights" className="hover:text-[#c6f221]">Wellness Insights</a></li>
                <li><a href="#trial" className="hover:text-[#c6f221] font-semibold text-neutral-300">Book Free Trial</a></li>
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-white mb-4">Gurugram Club Locations</div>
              <div className="space-y-3">
                {BRANCHES.map((b) => (
                  <div key={b.id} className="p-3 rounded bg-neutral-900/60 border border-neutral-800/80">
                    <div className="font-semibold text-white flex items-center justify-between">
                      <span>{b.sector} · {b.mall.split(',')[0]}</span>
                      <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-[#c6f221] hover:underline flex items-center gap-1 text-[11px]">
                        <span>Directions</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-1 leading-relaxed">{b.address}</div>
                    <div className="text-[11px] font-mono text-neutral-500 mt-1">{b.phone}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <div>© {new Date().getFullYear()} BOMISO FITNESS. All rights reserved. Gurugram, Haryana, India.</div>
            <div className="flex items-center gap-6">
              <button onClick={() => setLegalModal('privacy')} className="hover:text-neutral-300 cursor-pointer">Privacy Policy</button>
              <button onClick={() => setLegalModal('terms')} className="hover:text-neutral-300 cursor-pointer">Terms & Conditions</button>
            </div>
          </div>
        </div>
      </footer>

      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4" onClick={() => setLegalModal(null)}>
          <div className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-lg p-6 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
              <h3 className="text-lg font-display font-bold uppercase text-white">
                {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
              </h3>
              <button onClick={() => setLegalModal(null)} className="p-1 text-neutral-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              BOMISO FITNESS prioritizes member safety and transparent communications. Personal information is only utilized for membership management and scheduling complimentary club visits.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

// Mail icon helper
const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

// Floating WhatsApp Button
const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string>('any');

  const generateWhatsAppUrl = (bText?: string) => {
    let msg = 'Hello BOMISO FITNESS! I would like to enquire about memberships, personal coaching, and booking a complimentary trial';
    if (bText && bText !== 'any') msg += ` for the ${bText} branch in Gurugram.`;
    else msg += ' in Gurugram.';
    return `https://wa.me/${WHATSAPP_CONFIG.raw}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-8 sm:right-8 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 rounded-xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-[#25D366] text-neutral-950 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-neutral-950/15 flex items-center justify-center font-bold text-sm">BF</div>
              <div>
                <div className="text-sm font-bold tracking-tight">BOMISO FITNESS Concierge</div>
                <div className="text-[11px] font-medium opacity-90">WhatsApp Helpline</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-black/10 cursor-pointer"><X className="w-5 h-5" /></button>
          </div>

          <div className="p-4 bg-neutral-900/60 space-y-3 text-xs">
            <div className="bg-neutral-900 border border-neutral-800 text-neutral-200 p-3 rounded-lg leading-relaxed">
              👋 Hi! Welcome to <strong className="text-white">BOMISO FITNESS</strong>. Click below to chat directly with our Gurugram membership team on WhatsApp:
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => setSelectedBranch('any')}
                className={`py-1.5 px-2 rounded border text-center cursor-pointer ${selectedBranch === 'any' ? 'border-[#c6f221] bg-[#c6f221]/15 text-white font-bold' : 'border-neutral-800 bg-neutral-950 text-neutral-400'}`}
              >
                All Clubs
              </button>
              {BRANCHES.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBranch(b.sector)}
                  className={`py-1.5 px-2 rounded border text-center cursor-pointer truncate ${selectedBranch === b.sector ? 'border-[#c6f221] bg-[#c6f221]/15 text-white font-bold' : 'border-neutral-800 bg-neutral-950 text-neutral-400'}`}
                >
                  {b.sector}
                </button>
              ))}
            </div>

            <a
              href={generateWhatsAppUrl(selectedBranch)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 px-4 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>Start WhatsApp Chat</span>
              <Send className="w-3.5 h-3.5" />
            </a>
            <div className="text-[10px] text-neutral-500 text-center font-mono">
              WhatsApp: {WHATSAPP_CONFIG.display}
            </div>
          </div>
        </div>
      )}

      <div className="relative group">
        {!isOpen && (
          <div className="hidden sm:flex absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="flex items-center gap-1.5">
              <span>Chat on WhatsApp</span>
              <span className="text-[#25D366] font-mono text-[11px]">({WHATSAPP_CONFIG.display})</span>
            </span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open WhatsApp Instant Enquiry"
          className="w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-neutral-950 flex items-center justify-center shadow-xl shadow-[#25D366]/25 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          {isOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7 fill-neutral-950" />}
        </button>
      </div>
    </div>
  );
};

// AI Chatbot Window
const AIChatBot: React.FC<{ onOpenTrial: (bId?: string, prog?: string) => void }> = ({ onOpenTrial }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: string; sender: 'user' | 'assistant'; text: string; time: string }>>([
    {
      id: 'w1',
      sender: 'assistant',
      text: "Hello! I'm BOMISO AI. Ask me anything about our 3 Gurugram clubs (Sector 30, Sector 50, Sector 65), workout programs, or booking your complimentary trial pass!",
      time: 'Just now',
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isOpen, messages]);

  const handleSend = async (txt?: string) => {
    const text = (txt || inputValue).trim();
    if (!text || isTyping) return;
    const userMsg = { id: `u-${Date.now()}`, sender: 'user' as const, text, time: 'Just now' };
    setMessages((prev) => [...prev, userMsg]);
    if (!txt) setInputValue('');
    setIsTyping(true);

    const reply = await queryAIKnowledge(text);
    setMessages((prev) => [...prev, { id: `a-${Date.now()}`, sender: 'assistant' as const, text: reply, time: 'Just now' }]);
    setIsTyping(false);
  };

  return (
    <>
      <div className="fixed bottom-20 left-4 sm:bottom-8 sm:left-8 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-neutral-900/95 hover:bg-neutral-850 border border-neutral-700/80 hover:border-[#c6f221] shadow-xl backdrop-blur-md transition-all duration-200 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-[#c6f221] text-neutral-950 flex items-center justify-center font-bold text-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-[11px] font-bold uppercase tracking-wider text-white group-hover:text-[#c6f221] transition-colors leading-tight">
              Ask BOMISO AI
            </div>
            <div className="text-[10px] text-neutral-400">Gurugram Club Assistant</div>
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 left-4 sm:bottom-22 sm:left-8 z-50 w-[92vw] sm:w-96 max-h-[80vh] h-[540px] rounded-xl bg-neutral-950 border border-neutral-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-neutral-900 p-4 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#c6f221] text-neutral-950 flex items-center justify-center font-bold text-sm"><Bot className="w-4 h-4" /></div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-white">BOMISO AI Concierge</div>
                <div className="text-[10px] text-neutral-400">Gurugram Fitness Assistant</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1.5 rounded text-neutral-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
          </div>

          <div className="p-2 bg-neutral-900/40 border-b border-neutral-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {['Club timings?', 'Sector 65 amenities', 'Book free trial', 'Our coaches'].map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                disabled={isTyping}
                className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 hover:text-white whitespace-nowrap cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m) => (
              <div key={m.id} className={`flex items-start gap-2 ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] ${m.sender === 'user' ? 'bg-neutral-700 text-white' : 'bg-[#c6f221] text-neutral-950'}`}>
                  {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div className={`max-w-[80%] rounded-xl px-3.5 py-2.5 leading-relaxed whitespace-pre-line ${m.sender === 'user' ? 'bg-[#c6f221] text-neutral-950 font-medium' : 'bg-neutral-900 border border-neutral-800 text-neutral-200'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="w-6 h-6 rounded-full bg-[#c6f221] text-neutral-950 flex items-center justify-center shrink-0"><Bot className="w-3.5 h-3.5" /></div>
                <div className="bg-neutral-900 border border-neutral-800 px-3 py-2 rounded-xl flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c6f221] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c6f221] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c6f221] animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="px-3 py-1.5 bg-neutral-900/60 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
            <span>Ready to experience BOMISO?</span>
            <button onClick={() => { setIsOpen(false); onOpenTrial(); }} className="text-[#c6f221] hover:underline font-semibold flex items-center gap-1 cursor-pointer">
              <span>Book Free Trial</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-3 bg-neutral-900 border-t border-neutral-800 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
              placeholder="Ask about clubs, trainers, classes..."
              className="flex-1 bg-neutral-950 border border-neutral-800 focus:border-[#c6f221] rounded px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none"
            />
            <button onClick={() => handleSend()} disabled={!inputValue.trim() || isTyping} className="p-2 rounded bg-[#c6f221] text-neutral-950 cursor-pointer">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Mobile Bottom Quick Bar
const MobileQuickBar: React.FC<{ onOpenTrial: () => void }> = ({ onOpenTrial }) => (
  <aside className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 p-2 shadow-2xl">
    <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
      <a href="tel:+919810957491" className="flex flex-col items-center justify-center py-2 px-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-200 text-[11px] font-semibold">
        <Phone className="w-4 h-4 text-[#c6f221] mb-0.5" />
        <span>Call Desk</span>
      </a>
      <a href={WHATSAPP_CONFIG.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center py-2 px-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-200 text-[11px] font-semibold">
        <MessageSquare className="w-4 h-4 text-[#25D366] mb-0.5" />
        <span>WhatsApp</span>
      </a>
      <button onClick={onOpenTrial} className="flex flex-col items-center justify-center py-2 px-1 rounded bg-[#c6f221] text-neutral-950 text-[11px] font-extrabold uppercase tracking-tight shadow-md cursor-pointer">
        <Calendar className="w-4 h-4 text-neutral-950 mb-0.5" />
        <span>Free Trial</span>
      </button>
    </div>
  </aside>
);

// Program Modal
const ProgramModal: React.FC<{ program: Program | null; onClose: () => void; onBookTrial: (name: string) => void }> = ({ program, onClose, onBookTrial }) => {
  if (!program) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div className="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-lg overflow-hidden shadow-2xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-56 w-full overflow-hidden bg-neutral-900 shrink-0">
          <img src={program.image} alt={program.name} className="w-full h-full object-cover filter brightness-90" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-neutral-950/80 text-neutral-300 hover:text-white border border-neutral-700 cursor-pointer"><X className="w-5 h-5" /></button>
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#c6f221] bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-800">{program.category}</span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold uppercase tracking-tight text-white mt-1.5">{program.name}</h2>
          </div>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-2 gap-3 text-xs bg-neutral-900 p-3.5 rounded border border-neutral-800">
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#c6f221]" /><div><span className="text-neutral-400 block text-[10px] uppercase">Duration</span><span className="text-white font-mono font-semibold">{program.duration}</span></div></div>
            <div className="flex items-center gap-2"><Gauge className="w-4 h-4 text-[#c6f221]" /><div><span className="text-neutral-400 block text-[10px] uppercase">Intensity</span><span className="text-white font-semibold">{program.intensity}</span></div></div>
          </div>
          <div><h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Program Overview</h3><p className="text-sm text-neutral-300 leading-relaxed">{program.description}</p></div>
          <div><h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5">Key Target Outcomes</h3>
            <div className="space-y-2">
              {program.outcomes.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-[#c6f221] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div><h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5">Equipment</h3>
            <div className="flex flex-wrap gap-2">{program.equipment.map((eq, i) => (<span key={i} className="bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded text-xs text-neutral-300">{eq}</span>))}</div>
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-neutral-900 border-t border-neutral-800 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-neutral-400 hover:text-white cursor-pointer">Close</button>
          <button onClick={() => { onClose(); onBookTrial(program.name); }} className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-[#c6f221] hover:bg-[#b4df16] rounded cursor-pointer">Book Trial For This Program</button>
        </div>
      </div>
    </div>
  );
};

// Coach Modal
const CoachModal: React.FC<{ coach: Coach | null; onClose: () => void; onBookSession: (name: string) => void }> = ({ coach, onClose, onBookSession }) => {
  if (!coach) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div className="relative w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-lg overflow-hidden shadow-2xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 sm:p-7 border-b border-neutral-800 bg-neutral-900/60 relative">
          <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-700 cursor-pointer"><X className="w-5 h-5" /></button>
          <div className="text-xs font-mono uppercase tracking-widest text-[#c6f221] mb-1">{coach.experience}</div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold uppercase tracking-tight text-white">{coach.name}</h2>
          <div className="text-xs text-neutral-300 font-medium mt-1">{coach.role}</div>
        </div>

        <div className="p-6 sm:p-7 overflow-y-auto space-y-6">
          <div className="bg-neutral-900/80 p-4 rounded border border-neutral-800 flex items-start gap-3">
            <Quote className="w-5 h-5 text-[#c6f221] shrink-0 mt-0.5" />
            <p className="text-xs italic text-neutral-200 leading-relaxed">"{coach.quote}"</p>
          </div>
          <div><h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Background</h3><p className="text-sm text-neutral-300 leading-relaxed">{coach.bio}</p></div>
          <div><h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5">Certifications</h3>
            <div className="flex flex-wrap gap-2">{coach.certifications.map((cert, idx) => (<span key={idx} className="bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded text-xs text-neutral-200">{cert}</span>))}</div>
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-neutral-900 border-t border-neutral-800 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-neutral-400 hover:text-white cursor-pointer">Close</button>
          <button onClick={() => { onClose(); onBookSession(coach.name); }} className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-[#c6f221] hover:bg-[#b4df16] rounded cursor-pointer">Schedule Session</button>
        </div>
      </div>
    </div>
  );
};

// Article Modal
const ArticleModal: React.FC<{ article: InsightArticle | null; onClose: () => void; onOpenTrial: () => void }> = ({ article, onClose, onOpenTrial }) => {
  if (!article) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200" onClick={onClose}>
      <div className="relative w-full max-w-3xl bg-neutral-950 border border-neutral-800 rounded-lg overflow-hidden shadow-2xl my-6 max-h-[92vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-900 shrink-0">
          <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover filter brightness-90" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-neutral-950/80 text-neutral-300 hover:text-white border border-neutral-700 cursor-pointer z-10"><X className="w-5 h-5" /></button>
          <div className="absolute bottom-5 left-6 right-6">
            <span className="text-[#c6f221] text-xs font-mono uppercase tracking-wider bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-800">{article.category}</span>
            <h2 className="text-xl sm:text-3xl font-display font-extrabold uppercase tracking-tight text-white leading-tight mt-2">{article.title}</h2>
          </div>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800 text-xs text-neutral-400">
            <div><span className="text-white font-semibold">{article.author}</span> · {article.authorRole}</div>
            <span>{article.publishDate}</span>
          </div>
          <div className="bg-neutral-900/80 border border-neutral-800 p-5 rounded-lg">
            <div className="text-xs font-bold uppercase tracking-wider text-[#c6f221] mb-3 flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /><span>Key Takeaways</span></div>
            <div className="space-y-2">{article.keyTakeaways.map((t, i) => (<div key={i} className="flex items-start gap-2 text-xs text-neutral-200"><CheckCircle2 className="w-4 h-4 text-[#c6f221] shrink-0 mt-0.5" /><span>{t}</span></div>))}</div>
          </div>
          <div className="space-y-4 text-sm text-neutral-300 leading-relaxed font-sans">{article.body.map((p, idx) => (<p key={idx}>{p}</p>))}</div>
          <div className="p-6 rounded-lg bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div><h4 className="text-sm font-bold uppercase text-white">Experience Scientific Coaching at BOMISO</h4><p className="text-xs text-neutral-400 mt-1">Put these principles into action with our master trainers in Gurugram.</p></div>
            <button onClick={() => { onClose(); onOpenTrial(); }} className="px-5 py-2.5 text-xs font-bold uppercase text-neutral-950 bg-[#c6f221] hover:bg-[#b4df16] rounded shrink-0 cursor-pointer">Book a Free Trial</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Trial Pop-up Modal
const TrialModal: React.FC<{ isOpen: boolean; onClose: () => void; branchId?: string; programName?: string }> = ({ isOpen, onClose, branchId, programName }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200" onClick={onClose}>
      <div className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-lg overflow-hidden shadow-2xl my-8 max-h-[95vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 rounded-full bg-neutral-900/80 text-neutral-300 hover:text-white border border-neutral-700 cursor-pointer"><X className="w-5 h-5" /></button>
        <div className="overflow-y-auto">
          <TrialBookingSection initialBranchId={branchId} initialProgramName={programName} onSuccess={() => {}} />
        </div>
      </div>
    </div>
  );
};

// Auth Modal
const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { login, register, quickDemoLogin, isLoading } = useAuth();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [homeBranch, setHomeBranch] = useState(BRANCHES[0].name);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password) { setError('Please enter credentials.'); return; }
    const res = await login(identifier, password);
    if (res.success) {
      setSuccessMsg('Welcome back to BOMISO!');
      setTimeout(() => { onClose(); setSuccessMsg(null); }, 600);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) { setError('Name and email required.'); return; }
    const res = await register({ name, email, phone, password: 'password123', homeBranch });
    if (res.success) {
      setSuccessMsg('Pass created successfully!');
      setTimeout(() => { onClose(); setSuccessMsg(null); }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200" onClick={onClose}>
      <div className="relative w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl my-6" onClick={(e) => e.stopPropagation()}>
        <div className="bg-neutral-900/80 p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#c6f221] text-neutral-950 font-display font-extrabold flex items-center justify-center text-sm">B</div>
            <div>
              <div className="text-base font-display font-extrabold uppercase text-white">BOMISO Member Portal</div>
              <div className="text-[11px] text-neutral-400">Gurugram Club Access & Pass</div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-neutral-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        <div className="grid grid-cols-2 p-1 bg-neutral-900 border-b border-neutral-800 text-xs font-bold uppercase tracking-wider">
          <button type="button" onClick={() => setTab('login')} className={`py-2.5 rounded cursor-pointer ${tab === 'login' ? 'bg-[#c6f221] text-neutral-950 font-extrabold' : 'text-neutral-400 hover:text-white'}`}>Member Sign In</button>
          <button type="button" onClick={() => setTab('register')} className={`py-2.5 rounded cursor-pointer ${tab === 'register' ? 'bg-[#c6f221] text-neutral-950 font-extrabold' : 'text-neutral-400 hover:text-white'}`}>New Membership</button>
        </div>

        <div className="p-6 space-y-4">
          {error && <div className="p-3 rounded bg-red-950/60 border border-red-800 text-xs text-red-200 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-red-400 shrink-0" /><span>{error}</span></div>}
          {successMsg && <div className="p-3 rounded bg-emerald-950/60 border border-emerald-700 text-xs text-emerald-200 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#c6f221] shrink-0" /><span>{successMsg}</span></div>}

          {tab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">Email or Mobile</label>
                <input type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="rohit@bomiso.in" className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs text-white focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs text-white focus:outline-none" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 cursor-pointer">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="w-full py-3 rounded bg-[#c6f221] text-neutral-950 font-bold text-xs uppercase tracking-wider cursor-pointer">Sign In</button>

              <div className="pt-3 border-t border-neutral-900 text-center">
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-2">Instant Demo Sign In:</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button type="button" onClick={() => quickDemoLogin('rohit@bomiso.in').then(onClose)} className="p-2 rounded bg-neutral-900 border border-neutral-800 text-left hover:border-neutral-700 cursor-pointer">
                    <div className="text-white font-medium">Rohit (Sec 65)</div>
                    <div className="text-[10px] text-neutral-500">Elite Pass</div>
                  </button>
                  <button type="button" onClick={() => quickDemoLogin('priya@bomiso.in').then(onClose)} className="p-2 rounded bg-neutral-900 border border-neutral-800 text-left hover:border-neutral-700 cursor-pointer">
                    <div className="text-white font-medium">Priya (Sec 30)</div>
                    <div className="text-[10px] text-neutral-500">Mind-Body Pass</div>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div><label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Full Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Vikram Malhotra" className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs text-white" /></div>
              <div><label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vikram@example.com" className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs text-white" /></div>
              <div><label className="block text-xs font-bold uppercase text-neutral-300 mb-1">Mobile</label><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98109 57491" className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs text-white" /></div>
              <button type="submit" disabled={isLoading} className="w-full py-3 rounded bg-[#c6f221] text-neutral-950 font-bold text-xs uppercase tracking-wider cursor-pointer mt-2">Generate Pass</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// Member Profile Modal
const MemberProfileModal: React.FC<{ isOpen: boolean; onClose: () => void; onBookTrial: () => void }> = ({ isOpen, onClose, onBookTrial }) => {
  const { user, logout } = useAuth();
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200" onClick={onClose}>
      <div className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl my-6" onClick={(e) => e.stopPropagation()}>
        <div className="bg-neutral-900 p-6 border-b border-neutral-800 flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#c6f221] text-neutral-950 font-display font-extrabold text-xl flex items-center justify-center shadow-lg">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="text-lg font-display font-bold uppercase text-white">{user.name}</div>
              <div className="text-xs text-[#c6f221] font-semibold flex items-center gap-1.5 mt-0.5"><ShieldCheck className="w-3.5 h-3.5" /><span>{user.memberTier}</span></div>
              <div className="text-[11px] text-neutral-400 font-mono">ID: {user.id}</div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-neutral-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6 space-y-6">
          <div className="p-5 rounded-lg bg-neutral-900 border border-neutral-800 relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">Digital Access Pass</span>
                <span className="text-sm font-display font-bold text-white uppercase">BOMISO Check-In Barcode</span>
              </div>
              <QrCode className="w-6 h-6 text-[#c6f221]" />
            </div>
            <div className="bg-neutral-950 p-3 rounded font-mono text-center tracking-widest text-xs text-[#c6f221] border border-neutral-800">
              ||| | |||| | |||||| || | ||| |||| |
              <div className="text-[10px] text-neutral-400 mt-1 font-sans">Pass Code: {user.qrCode}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded bg-neutral-900/60 border border-neutral-800">
              <div className="text-xl font-display font-bold text-white">{user.checkInCount}</div>
              <div className="text-[10px] text-neutral-400 uppercase mt-0.5">Check-Ins</div>
            </div>
            <div className="p-3 rounded bg-neutral-900/60 border border-neutral-800">
              <div className="text-xl font-display font-bold text-[#c6f221]">Active</div>
              <div className="text-[10px] text-neutral-400 uppercase mt-0.5">Status</div>
            </div>
            <div className="p-3 rounded bg-neutral-900/60 border border-neutral-800">
              <div className="text-xl font-display font-bold text-white">3 Clubs</div>
              <div className="text-[10px] text-neutral-400 uppercase mt-0.5">Access Tier</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-neutral-900">
            <button onClick={() => { logout(); onClose(); }} className="px-4 py-2 text-xs font-semibold uppercase text-red-400 hover:text-red-300 flex items-center gap-1.5 cursor-pointer">
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
            <button onClick={() => { onClose(); onBookTrial(); }} className="px-5 py-2.5 text-xs font-bold uppercase text-neutral-950 bg-[#c6f221] hover:bg-[#b4df16] rounded cursor-pointer">
              Book Class / Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   5. MAIN APP COMPONENT
   ========================================================================== */

function MainApp() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [trialBranchId, setTrialBranchId] = useState<string | undefined>(undefined);
  const [trialProgramName, setTrialProgramName] = useState<string | undefined>(undefined);
  const [programFilter, setProgramFilter] = useState<string>('all');
  const [activeNavSection, setActiveNavSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['programs', 'philosophy', 'coaches', 'locations', 'gallery', 'reviews', 'insights', 'trial'];
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveNavSection(section);
          return;
        }
      }
      if (window.scrollY < 400) setActiveNavSection('home');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenTrial = (branchId?: string, programName?: string) => {
    setTrialBranchId(branchId);
    setTrialProgramName(programName);
    setIsTrialModalOpen(true);
  };

  const handlePhilosophyExplore = (category: string) => {
    setProgramFilter(category);
    document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-[#c6f221] selection:text-neutral-950">
      <Navbar
        onOpenTrial={() => handleOpenTrial()}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        activeSection={activeNavSection}
      />

      <main className="flex-1">
        <Hero
          onOpenTrial={() => handleOpenTrial()}
          onExplorePrograms={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
        />

        <BrandPhilosophy onSelectCategory={handlePhilosophyExplore} />

        <ProgramsSection
          selectedCategoryFilter={programFilter}
          onFilterChange={setProgramFilter}
          onSelectProgram={(program) => setSelectedProgram(program)}
          onOpenTrialWithProgram={(progName) => handleOpenTrial(undefined, progName)}
        />

        <ExperienceSplit
          onFindBOMISO={() => document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' })}
          onOpenTrial={() => handleOpenTrial()}
        />

        <CoachesSection
          onSelectCoach={(coach) => setSelectedCoach(coach)}
          onBookWithCoach={(coachName) => handleOpenTrial(undefined, `Coaching with ${coachName}`)}
        />

        <LocationsSection onBookAtLocation={(branchId) => handleOpenTrial(branchId)} />

        <GallerySection />

        <ReviewsSection />

        <WellnessInsightsSection onReadArticle={(article) => setSelectedArticle(article)} />

        <TrialBookingSection initialBranchId={trialBranchId} initialProgramName={trialProgramName} />

        <FaqSection />
      </main>

      <Footer />

      <MobileQuickBar onOpenTrial={() => handleOpenTrial()} />
      <FloatingWhatsApp />
      <AIChatBot onOpenTrial={(bId, prog) => handleOpenTrial(bId, prog)} />

      <ProgramModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        onBookTrial={(progName) => { setSelectedProgram(null); handleOpenTrial(undefined, progName); }}
      />

      <CoachModal
        coach={selectedCoach}
        onClose={() => setSelectedCoach(null)}
        onBookSession={(coachName) => { setSelectedCoach(null); handleOpenTrial(undefined, `1-on-1 with ${coachName}`); }}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenTrial={() => handleOpenTrial()}
      />

      <TrialModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
        branchId={trialBranchId}
        programName={trialProgramName}
      />

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <MemberProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} onBookTrial={() => handleOpenTrial()} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
