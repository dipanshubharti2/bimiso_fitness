import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory demo users database for Member Portal authentication
interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  memberTier: string;
  homeBranch: string;
  memberSince: string;
  checkInCount: number;
  qrCode: string;
}

const USERS: User[] = [
  {
    id: 'BOMISO-M7821',
    name: 'Rohit Malhotra',
    email: 'rohit@bomiso.in',
    password: 'password123',
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
    password: 'password123',
    phone: '+91 98234 56789',
    memberTier: 'Mind & Body Sanctuary Pass',
    homeBranch: 'DLF Star Mall (Sector 30)',
    memberSince: 'June 2021',
    checkInCount: 98,
    qrCode: 'BOMISO-PASS-6390-SEC30',
  },
  {
    id: 'BOMISO-M5104',
    name: 'Tanmay Kapoor',
    email: 'tanmay@bomiso.in',
    password: 'password123',
    phone: '+91 99123 45678',
    memberTier: 'Functional Strength & Spin Member',
    homeBranch: 'Good Earth City Centre (Sector 50)',
    memberSince: 'January 2023',
    checkInCount: 84,
    qrCode: 'BOMISO-PASS-5104-SEC50',
  },
];

// Initialize Gemini Client
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

const BOMISO_KNOWLEDGE = `
You are BOMISO AI, the official intelligent fitness concierge for BOMISO FITNESS located in Gurugram, Haryana, India.
Brand Philosophy: BODY. MIND. SOUL. (BOMISO = Body, Mind, Soul).
Tone: Energetic, professional, welcoming, motivating, authoritative on biomechanics and wellness, concise.

Key Club Information:
1. M3M Tee Point (Sector 65): 3rd Floor, South Block, Golf Course Extension Road. Established 2021. Highlights: 4-side panoramic glass views with natural skyline light, sprint turf, competition-grade barbell platforms, aerial yoga and reformer studio, luxury steam recovery. Contact: +91 98109 57491 / +91 93192 78231.
2. Good Earth City Centre (Sector 50): 2nd Floor, Malibu Towne. Established 2016. Highlights: Group fitness studio for Zumba and Les Mills Body Pump, immersive spin studio, cable circuit, functional movement assessment. Contact: +91 98109 57491 / +91 97176 93532.
3. DLF Star Mall (Sector 30): LG 06, NH 8. Established 2013 (foundational club). Highlights: Heavy dumbbells up to 50kg, TRX suspension bay, Hatha/Vinyasa studio, 1-on-1 personal training. Contact: +91 98109 57491 / +91 99100 57491.

Timings: Monday through Saturday: 6:00 AM – 10:00 PM; Sunday: 7:00 AM – 8:00 PM.
WhatsApp Enquiry Line: +91 99106 65194.
Central Call Desk: +91 98109 57491.
Email: info@bomiso.in.

Programs: Strength & Hypertrophy, Crossdrill Functional Arena, 1-on-1 Personal Coaching, Yoga & Mindful Movement, Pilates & Core Sculpt, Boxing & Combat Conditioning, Zumba & Dance Fitness, Spinning & Indoor Cycling, Youth Movement & Athletic Agility.
Coaches: Certified with ISSA, ACE, CrossFit Level 1, Les Mills, and Yoga Alliance.
Complimentary Trial: Available to prospective members; includes facility access, equipment induction, and baseline movement assessment.
Guidelines: Always answer questions accurately, give concise helpful fitness advice, and encourage prospective members to visit or book a free trial at their nearest Gurugram branch.
`;

// Authentication Endpoints
app.post('/api/auth/login', (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(400).json({ error: 'Please provide email/phone and password.' });
  }

  const cleanIdentifier = identifier.trim().toLowerCase();
  const user = USERS.find(
    (u) =>
      u.email.toLowerCase() === cleanIdentifier ||
      u.phone.replace(/\D/g, '') === cleanIdentifier.replace(/\D/g, '')
  );

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials. Try demo email: rohit@bomiso.in with password: password123' });
  }

  // Return safe user object (without password)
  const { password: _, ...safeUser } = user;
  return res.json({ user: safeUser, token: `bomiso_token_${user.id}_${Date.now()}` });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, phone, password, homeBranch } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: 'Name, email, phone, and password are required.' });
  }

  const cleanEmail = email.trim().toLowerCase();
  if (USERS.some((u) => u.email.toLowerCase() === cleanEmail)) {
    return res.status(409).json({ error: 'An account with this email already exists.' });
  }

  const newUser: User = {
    id: `BOMISO-M${Math.floor(1000 + Math.random() * 9000)}`,
    name: name.trim(),
    email: cleanEmail,
    password: password,
    phone: phone.trim(),
    memberTier: 'Trial / Standard Member',
    homeBranch: homeBranch || 'M3M Tee Point (Sector 65)',
    memberSince: 'October 2026',
    checkInCount: 1,
    qrCode: `BOMISO-PASS-${Date.now().toString().slice(-4)}`,
  };

  USERS.push(newUser);

  const { password: _, ...safeUser } = newUser;
  return res.json({ user: safeUser, token: `bomiso_token_${newUser.id}_${Date.now()}` });
});

app.get('/api/auth/demo-accounts', (_req, res) => {
  const demoUsers = USERS.map(({ password: _, ...u }) => ({
    name: u.name,
    email: u.email,
    branch: u.homeBranch,
    tier: u.memberTier,
    defaultPassword: 'password123',
  }));
  res.json({ demoUsers });
});

// AI Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required.' });
  }

  // If Gemini client is available, call gemini-3.8-flash
  if (ai && process.env.GEMINI_API_KEY) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [{ text: `${BOMISO_KNOWLEDGE}\n\nUser Question: ${message}` }],
          },
        ],
        config: {
          temperature: 0.7,
        },
      });

      const replyText = response.text || "I'm here to help you achieve your goals at BOMISO FITNESS!";
      return res.json({ reply: replyText, source: 'gemini-3.8-flash' });
    } catch (err: any) {
      console.error('Gemini API Error, falling back to local knowledge:', err?.message);
    }
  }

  // High-fidelity fallback knowledge engine
  const q = message.toLowerCase();
  let fallbackReply = '';

  if (q.includes('location') || q.includes('branch') || q.includes('where') || q.includes('address') || q.includes('center')) {
    fallbackReply = `BOMISO FITNESS operates 3 premier clubs across Gurugram:\n\n1. **M3M Tee Point (Sector 65)** - 3rd Floor, South Block, Golf Course Extension Road (Panoramic 4-side open skyline views & turf arena).\n2. **Good Earth City Centre (Sector 50)** - 2nd Floor, Malibu Towne (High-energy group exercise, Les Mills, & spin theater).\n3. **DLF Star Mall (Sector 30)** - LG 06, NH 8 (Our flagship club with heavy barbell free-weights & TRX conditioning).\n\nAll clubs are open Mon–Sat: 6 AM – 10 PM and Sun: 7 AM – 8 PM!`;
  } else if (q.includes('timing') || q.includes('hours') || q.includes('time') || q.includes('open') || q.includes('close')) {
    fallbackReply = `All three BOMISO clubs operate:\n• **Monday to Saturday**: 6:00 AM – 10:00 PM\n• **Sunday**: 7:00 AM – 8:00 PM\n\nMorning peak slots are 6:30–9:30 AM, and evening sessions run from 5:30–9:30 PM. Would you like to reserve a visit slot?`;
  } else if (q.includes('price') || q.includes('cost') || q.includes('fee') || q.includes('membership') || q.includes('plan')) {
    fallbackReply = `We offer Single-Club and Multi-Club All-Access memberships with quarterly, semi-annual, and annual options. Each membership includes access to strength and cardio floors, certified coach floor induction, and locker access.\n\nYou can also book a complimentary 1-day trial to experience the facilities before choosing a package! Call our desk at **+91 98109 57491** or WhatsApp **+91 99106 65194** for current promotional seasonal rates.`;
  } else if (q.includes('trial') || q.includes('free') || q.includes('guest') || q.includes('tour')) {
    fallbackReply = `Yes! We offer a complimentary trial pass for first-time visitors in Gurugram. It includes full access to the strength/cardio floor, an optional coach movement screen, and facility tour. You can request your trial via the form on this page or WhatsApp us at **+91 99106 65194**.`;
  } else if (q.includes('trainer') || q.includes('coach') || q.includes('personal training') || q.includes('pt')) {
    fallbackReply = `Our coaches hold elite accreditations including ISSA Master Trainer, ACE, CrossFit Level 1, Les Mills, and 500-Hr Yoga Alliance certifications. 1-on-1 personal coaching is available at all 3 branches with body composition monitoring and custom programming.`;
  } else if (q.includes('yoga') || q.includes('pilates') || q.includes('zumba') || q.includes('crossdrill') || q.includes('program') || q.includes('classes')) {
    fallbackReply = `BOMISO offers a complete Body, Mind, Soul program ecosystem:\n• **Strength**: Barbell Hypertrophy & Olympic Lifting\n• **Athletic**: Crossdrill Turf Arena & Combat Boxing\n• **Mind-Body**: Vinyasa & Hatha Yoga, Core Pilates\n• **Group Cardio**: Zumba Dance, Spinning & Les Mills Body Pump\n• **Youth**: Kids' Agility & Postural Development.\n\nSchedules run morning and evening across Sector 30, 50, and 65!`;
  } else if (q.includes('whatsapp') || q.includes('contact') || q.includes('phone') || q.includes('number')) {
    fallbackReply = `You can reach our Gurugram teams directly:\n• **WhatsApp Chat**: +91 99106 65194\n• **Central Phone Desk**: +91 98109 57491\n• **Email**: info@bomiso.in`;
  } else {
    fallbackReply = `Hello! I'm BOMISO AI. I can assist you with details regarding our 3 Gurugram clubs (Sector 30, Sector 50, Sector 65), class timetables (Strength, Crossdrill, Yoga, Zumba, Spin), certified trainers, membership plans, or booking a complimentary trial. What would you like to know?`;
  }

  return res.json({ reply: fallbackReply, source: 'local-concierge-knowledge' });
});

// Mount Vite or serve static
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`BOMISO server running on port ${PORT}`);
  });
}

startServer();
