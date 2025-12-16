import React, { useState } from 'react';
import { AppState, CareerOption, CategoryGroup, CategoryType } from './types';
import AttractScreen from './components/AttractScreen';
import CameraCapture from './components/CameraCapture';
import ProcessingView from './components/ProcessingView';
import { transformUserImage } from './services/geminiService';
import {
  Stethoscope,
  HardHat,
  Gavel,
  Briefcase,
  ArrowLeft,
  Download,
  RefreshCcw,
  Wand2,
  Sparkles,
  Code,
  Zap,
  FlaskConical,
  Rocket,
  Microscope,
  Shield,
  Plane,
  TrendingUp,
  Award,
  Cpu,
  Target,
  Wrench,
  Gamepad2,
  Video,
  Palette,
  Bot,
  Printer,
  Camera,
  ThumbsUp,
  RotateCcw,
  Crown,
  Sword,
  Flame,
  Star,
  Heart,
  Music,
  Snowflake,
  Sun,
  Moon,
  Cat,
  Fish,
  Bug,
  Leaf,
  Mountain,
  Waves,
  Gem,
  Anchor,
  Book,
  Users,
  Flower2,
  CircleDot,
  Feather
} from 'lucide-react';

// ============================================
// ALL CATEGORY DATA - COMPLETE ECOSYSTEM
// ============================================

const CATEGORY_GROUPS: CategoryGroup[] = [
  // ========== DREAM CAREERS ==========
  {
    id: 'careers',
    title: 'Dream Careers',
    icon: 'Briefcase',
    emoji: '👔',
    characterPreview: '👨‍⚕️ Doctor • 👮 Police • ⚖️ Lawyer',
    description: 'Future profession',
    themeColor: 'bg-blue-600',
    bgGradient: 'from-blue-500 via-indigo-600 to-violet-600',
    options: [

      {
        id: 'civil_engineer',
        title: 'Civil Engineer',
        icon: 'HardHat',
        description: 'Building infrastructure',
        prompt: `A natural portrait of the person wearing a white hard hat and yellow safety vest over casual clothes. Standing outdoors at a construction site with cranes in background. Natural sunlight. Holding a rolled blueprint. Authentic professional look. clearly visible face matching the input.`,
        themeColor: 'bg-orange-600'
      },
      {
        id: 'mechanical_engineer',
        title: 'Mechanical Engineer',
        icon: 'Wrench',
        description: 'Machines & Systems',
        prompt: `A natural portrait of the person wearing blue mechanical coveralls or shop coat. Holding a wrench or tablet. Standing in a clean modern factory floor with machinery in background. Natural industrial lighting. Authentic professional look. clearly visible face matching the input.`,
        themeColor: 'bg-slate-600'
      },
      {
        id: 'robotics_engineer',
        title: 'Robotics Engineer',
        icon: 'Bot',
        description: 'Future Tech',
        prompt: `A natural portrait of the person wearing a lab coat or smart casual tech wear. Standing in a high-tech robotics lab next to a robot arm. Holding a tablet controller. Soft modern lab lighting. Authentic innovator look. clearly visible face matching the input.`,
        themeColor: 'bg-cyan-600'
      },
      {
        id: 'ai_engineer',
        title: 'AI Engineer',
        icon: 'Cpu',
        description: 'Artificial Intelligence',
        prompt: `A natural portrait of the person wearing smart casual hoodie or blazer. Sitting at a high-tech setup with multiple code screens displaying blue data streams. Modern office background. Cinematic office lighting. Intelligent focused look. clearly visible face matching the input.`,
        themeColor: 'bg-indigo-600'
      },
      {
        id: 'electrical_engineer',
        title: 'Electrical Engineer',
        icon: 'Zap',
        description: 'Power & Energy',
        prompt: `A natural portrait of the person wearing a safety helmet and insulated work gear. Standing near high-tech electrical panels or a solar farm. Holding a multimeter. Natural outdoor or industrial lighting. Competent professional look. clearly visible face matching the input.`,
        themeColor: 'bg-yellow-600'
      },
      {
        id: 'chemical_engineer',
        title: 'Chemical Engineer',
        icon: 'FlaskConical',
        description: 'Science & Innovation',
        prompt: `A natural portrait of the person wearing a white lab coat and safety glasses (on forehead). Holding a test tube or clipboard. Standing in a modern chemistry lab with glassware. Bright clean lab lighting. Scientific expert look. clearly visible face matching the input.`,
        themeColor: 'bg-teal-600'
      },
      {
        id: 'doctor',
        title: 'Doctor',
        icon: 'Stethoscope',
        description: 'Saving lives',
        prompt: `A natural portrait of the person wearing a white medical lab coat with a stethoscope around their neck. Standing in a well-lit hospital hallway. Professional and kind expression. Realistic photography style. clearly visible face matching the input.`,
        themeColor: 'bg-blue-600'
      },
      {
        id: 'lawyer',
        title: 'Lawyer',
        icon: 'Gavel',
        description: 'Justice & Law',
        prompt: `A natural portrait of the person wearing a traditional black lawyer's gown and white neckband. Standing in a law library with books in the background. Natural indoor lighting. Professional and dignified pose. Authentic look. clearly visible face matching the input.`,
        themeColor: 'bg-slate-800'
      },
      {
        id: 'ca',
        title: 'Chartered Accountant',
        icon: 'TrendingUp',
        description: 'Financial expert',
        prompt: `A natural portrait of the person wearing a sharp business suit. Sitting at a modern office desk with a laptop. City view in background. Natural office lighting. Professional and successful look. Authentic look. clearly visible face matching the input.`,
        themeColor: 'bg-emerald-700'
      },
      {
        id: 'police',
        title: 'Police Officer',
        icon: 'Shield',
        description: 'Protecting serve',
        prompt: `A natural portrait of the person wearing a khaki police uniform with badges. Standing outdoors on a city street. Natural daylight. Brave and responsible posture. Authentic look. clearly visible face matching the input.`,
        themeColor: 'bg-yellow-700'
      },
      {
        id: 'ias',
        title: 'IAS Officer',
        icon: 'Award',
        description: 'District Magistrate',
        prompt: `A natural portrait of the person wearing formal official clothes (suit or formal traditional wear). Standing in a government office with an Indian flag in the background. Dignified and authoritative. Realistic photography style. clearly visible face matching the input.`,
        themeColor: 'bg-indigo-800'
      }
    ]
  },

  // ========== FANTASY HEROES ==========
  {
    id: 'fantasy',
    title: 'Fantasy Heroes',
    icon: 'Zap',
    emoji: '🦸',
    characterPreview: '🕷️ Spidey • ⚡ Thor • 🦇 Batman',
    description: 'Superheroes',
    themeColor: 'bg-red-600',
    bgGradient: 'from-red-600 via-rose-600 to-orange-500',
    options: [
      {
        id: 'spiderman',
        title: 'Spider-Man',
        icon: 'Bug',
        description: 'Friendly neighborhood',
        prompt: `A realistic photo of the person wearing a high-quality red and blue spider-hero costume suit. The mask is removed and held in their hand, showing their face clearly. Sitting on a rooftop ledge. Warm sunset lighting. Friendly and heroic vibe. Authentic cosplay style. Your face must be clearly visible, natural, and matching the input photo exactly.`,
        themeColor: 'bg-red-600'
      },
      {
        id: 'superman',
        title: 'Superman',
        icon: 'Sun',
        description: 'Man of Steel',
        prompt: `A realistic photo of the person wearing a blue superhero shirt with a red 'S' symbol and a flowing red cape. Standing proudly against a blue sky. Hands on hips in a brave pose. Natural daylight. Authentic cosplay style. Your face must be clearly visible, confident, and matching the input photo exactly.`,
        themeColor: 'bg-blue-700'
      },
      {
        id: 'ironman',
        title: 'Iron Man',
        icon: 'Cpu',
        description: 'Tech Genius',
        prompt: `A realistic photo of the person wearing a high-tech red and gold mechanical suit armor. The helmet is OFF, revealing the face clearly. Glowing blue arc reactor in chest. Standing in a modern tech lab. Cool blue lighting. Confident and smart look. Authentic cosplay style. Your face must be clearly visible and matching the input photo exactly.`,
        themeColor: 'bg-yellow-600'
      },
      {
        id: 'batman',
        title: 'Batman',
        icon: 'Moon',
        description: 'Dark Knight',
        prompt: `A realistic photo of the person wearing a detailed black superhero armor suit with a cape. The cowl/mask is DOWN around the neck, showing the face clearly. Standing on a balcony at night with city lights behind. Dramatic but clear lighting. Serious and brave hero look. Authentic cosplay style. Your face must be clearly visible and matching the input photo exactly.`,
        themeColor: 'bg-slate-900'
      },
      {
        id: 'hulk',
        title: 'Hulk',
        icon: 'Mountain',
        description: 'Incredible Power',
        prompt: `A realistic photo of the person with an enhanced muscular physique. Keep the person's natural skin color unchanged. Wearing a casual purple or dark colored t-shirt (not torn, completely intact). Strong muscular arms and athletic build. Clenched fists with bright green glowing gamma energy swirling around both hands. Standing confidently against a dramatic rocky outdoor landscape background. Natural daylight. Heroic power pose with arms slightly spread. Confident and powerful expression. High quality photography. The face must be perfectly preserved, clearly visible, natural, and matching the input photo exactly. Suitable for all ages.`,
        themeColor: 'bg-green-700'
      },
      {
        id: 'thor',
        title: 'Thor',
        icon: 'Zap',
        description: 'God of Thunder',
        prompt: `A realistic photo of the person as the mighty Thunder Hero. Wearing detailed silver armor and a flowing red cape. Holding a mystical hammer (Mjolnir) raised high. Blue lightning sparks in the background (not on face). Standing on a mountain top. Brave and royal pose. Authentic cosplay style. Your face must be clearly visible, natural, and matching the input photo exactly.`,
        themeColor: 'bg-slate-600'
      },
      {
        id: 'wonder_woman',
        title: 'Wonder Woman',
        icon: 'Star',
        description: 'Amazon Warrior',
        prompt: `A realistic photo of the person wearing a red and gold warrior armor with a tiara and bracelets. Standing in an ancient majestic temple. Golden sunlight. Brave and graceful pose. Authentic cosplay style. Your face must be clearly visible, natural, and matching the input photo exactly.`,
        themeColor: 'bg-red-700'
      }
    ]
  },

  // ========== DOLLS & PRINCESSES ==========
  {
    id: 'dolls',
    title: 'Dolls & Princesses',
    icon: 'Heart',
    emoji: '👸',
    characterPreview: '💄 Barbie • ❄️ Elsa • 🧜‍♀️ Mermaid',
    description: 'Magical & Beautiful',
    themeColor: 'bg-pink-500',
    bgGradient: 'from-pink-500 via-fuchsia-500 to-purple-500',
    options: [
      {
        id: 'barbie',
        title: 'Barbie',
        icon: 'Heart',
        description: 'Fashion Icon',
        prompt: `A natural portrait of the person wearing a stylish pink fashion dress. Standing in a bright, modern room with pink decor. Authentic makeup and hair. Stylish and confident pose. Natural lighting. Realistic photography style. clearly visible face matching the input.`,
        themeColor: 'bg-pink-500'
      },
      {
        id: 'elsa',
        title: 'Elsa',
        icon: 'Snowflake',
        description: 'Ice Queen',
        prompt: `A natural portrait of the person wearing a beautiful light blue gown with sequins. Standing in a snowy winter landscape. Natural daylight. Elegant pose. Authentic cosplay style. clearly visible face matching the input.`,
        themeColor: 'bg-cyan-500'
      },
      {
        id: 'fairy',
        title: 'Magical Fairy',
        icon: 'Sparkles',
        description: 'Forest Magic',
        prompt: `A natural portrait of the person wearing a floral woodland dress and wearing fairy wings on their back. Standing in a garden or forest. Natural soft lighting. Whimsical pose. Realistic photography style. clearly visible face matching the input.`,
        themeColor: 'bg-green-500'
      }
    ]
  },

  // ========== DEVOTIONAL ==========
  {
    id: 'devotional',
    title: 'Devotional',
    icon: 'Flower2',
    emoji: '🙏',
    characterPreview: '🪈 Krishna • 🏹 Ram',
    description: 'Divine Blessings',
    themeColor: 'bg-orange-500',
    bgGradient: 'from-orange-500 via-amber-500 to-yellow-500',
    options: [
      {
        id: 'krishna',
        title: 'Lord Krishna',
        icon: 'Feather',
        description: 'Divine Flute Player',
        prompt: `A majestic portrait of the person dressed as a royal king with rich yellow silk robes and heavy golden jewelry. Wearing a crown with a peacock feather over natural dense dark wavy hair. Holding a flute. lush garden background. Natural lighting. Divine but realistic photography style. clearly visible face matching the input.`,
        themeColor: 'bg-blue-600'
      },
      {
        id: 'ram',
        title: 'Lord Ram',
        icon: 'Target',
        description: 'Maryada Purushottam',
        prompt: `A majestic portrait of the person dressed as a warrior king in saffron robes and armor pieces. Natural dense dark wavy hair visible under headgear. Holding a bow. Standing in a forest setting with sun rays. Natural lighting. Noble and brave expression. Authentic traditional attire. clearly visible face matching the input.`,
        themeColor: 'bg-orange-600'
      },
      {
        id: 'ganesha_devotee',
        title: 'Disguise',
        icon: 'Gem',
        description: 'Festive Celebration',
        prompt: `A natural portrait of the person wearing a grand traditional Indian festive outfit (Sherwani or Kurta). Standing next to a large Ganesha statue. Festive background with flowers. Natural lighting. Folding hands in prayer. Authentic cultural photography. clearly visible face matching the input.`,
        themeColor: 'bg-red-600'
      }
    ]
  },

  // ========== SPORTS & GAMES ==========
  {
    id: 'games',
    title: 'Sports & Games',
    icon: 'Gamepad2',
    emoji: '🏏',
    characterPreview: '🏏 Cricket • ⚽ Football • ♟️ Chess',
    description: 'Champion athlete',
    themeColor: 'bg-green-600',
    bgGradient: 'from-green-500 via-emerald-600 to-teal-600',
    options: [
      // ===== OUTDOOR SPORTS =====
      {
        id: 'cricket',
        title: 'Cricket Star',
        icon: 'Target',
        description: 'India\'s #1 Sport',
        prompt: `A natural portrait of the person wearing Indian cricket team blue jersey and white pants. Holding a cricket bat in a confident batting stance. Standing on a cricket pitch with a packed stadium in the background. Natural daylight with stadium lights. Champion player pose. Confident and focused expression. Authentic sports photography style. Clearly visible face matching the input.`,
        themeColor: 'bg-blue-600'
      },
      {
        id: 'football',
        title: 'Football Player',
        icon: 'CircleDot',
        description: 'Goal Scorer',
        prompt: `A natural portrait of the person wearing a professional football jersey and shorts with cleats. Standing on a green football field with a football at their feet. Stadium with crowd in background. Natural daylight. Dynamic athletic pose. Confident and energetic expression. Authentic sports photography style. Clearly visible face matching the input.`,
        themeColor: 'bg-green-700'
      },
      {
        id: 'basketball',
        title: 'Basketball Champion',
        icon: 'Target',
        description: 'Slam Dunk Star',
        prompt: `A natural portrait of the person wearing a basketball jersey and shorts. Holding a basketball in one hand with arm raised. Standing on a shiny basketball court with arena lights. Professional basketball stadium background. Dramatic lighting. Powerful athletic pose. Confident expression. Authentic sports photography style. Clearly visible face matching the input.`,
        themeColor: 'bg-orange-600'
      },
      {
        id: 'hockey',
        title: 'Hockey Champion',
        icon: 'Award',
        description: 'India\'s Pride',
        prompt: `A natural portrait of the person wearing Indian hockey team blue jersey and hockey gear. Holding a hockey stick in a ready position. Standing on an astroturf hockey field with a stadium in background. Natural daylight. Strong athletic pose. Determined expression. National sport pride. Authentic sports photography style. Clearly visible face matching the input.`,
        themeColor: 'bg-sky-600'
      },
      {
        id: 'badminton',
        title: 'Badminton Star',
        icon: 'Zap',
        description: 'Smash Champion',
        prompt: `A natural portrait of the person wearing sporty badminton attire (polo shirt and shorts). Holding a badminton racket in a smash action pose. Standing on an indoor badminton court. Bright indoor lighting. Dynamic athletic pose. Focused and confident expression. Olympic champion vibes. Authentic sports photography style. Clearly visible face matching the input.`,
        themeColor: 'bg-purple-600'
      },
      {
        id: 'kabaddi',
        title: 'Kabaddi Warrior',
        icon: 'Flame',
        description: 'Pro Kabaddi Star',
        prompt: `A natural portrait of the person wearing a sleeveless kabaddi jersey and shorts. Strong athletic build pose with arms spread. Standing on an indoor kabaddi court with Pro Kabaddi League style arena setting. Bright stadium lights. Warrior expression. Powerful and intense look. Authentic sports photography style. Clearly visible face matching the input.`,
        themeColor: 'bg-red-600'
      },
      {
        id: 'khokho',
        title: 'Kho-Kho Player',
        icon: 'Zap',
        description: 'Speed Champion',
        prompt: `A natural portrait of the person wearing a traditional kho-kho sports uniform (jersey and shorts). Athletic running pose with agile movement. Outdoor sports ground with green grass. Natural daylight. Fast and dynamic expression. Traditional Indian sports champion. Authentic sports photography style. Clearly visible face matching the input.`,
        themeColor: 'bg-amber-600'
      },
      {
        id: 'athletics',
        title: 'Track Champion',
        icon: 'Award',
        description: 'Gold Medalist',
        prompt: `A natural portrait of the person wearing athletic track and field uniform (singlet and shorts). Standing on a running track with Olympic-style stadium in background. Holding a gold medal around neck. Victory pose with arms raised. Natural sunlight. Champion expression. Celebrating a race victory. Authentic sports photography style. Clearly visible face matching the input.`,
        themeColor: 'bg-yellow-500'
      },
      // ===== INDOOR GAMES =====
      {
        id: 'chess',
        title: 'Chess Grandmaster',
        icon: 'Crown',
        description: 'Strategic Mind',
        prompt: `A natural portrait of the person sitting at an elegant chess table with wooden chess pieces arranged. Wearing smart casual clothing (blazer or formal shirt). Hand on chin in a thoughtful grandmaster pose. Looking at the chess board with deep concentration. Soft warm lighting. Book-lined room or tournament hall in background. Intelligent and focused expression. Authentic photography style. Clearly visible face matching the input.`,
        themeColor: 'bg-slate-700'
      },
      {
        id: 'carrom',
        title: 'Carrom Champion',
        icon: 'Target',
        description: 'Precision Master',
        prompt: `A natural portrait of the person sitting at a carrom board. Wearing comfortable casual clothes. Fingers positioned to strike the striker. Carrom coins arranged on the board. Indoor home or club setting. Warm ambient lighting. Focused and skillful expression. Traditional Indian game champion. Authentic photography style. Clearly visible face matching the input.`,
        themeColor: 'bg-amber-700'
      },
      {
        id: 'tabletennis',
        title: 'Table Tennis Pro',
        icon: 'Zap',
        description: 'Quick Reflexes',
        prompt: `A natural portrait of the person wearing sporty attire (t-shirt and shorts). Holding a table tennis paddle in a ready position. Standing at a professional table tennis table. Indoor sports hall with bright lights. Dynamic athletic stance. Quick and alert expression. Competitive sports champion. Authentic sports photography style. Clearly visible face matching the input.`,
        themeColor: 'bg-blue-500'
      }
    ]
  },

  // ========== FAMILY GROUP PHOTOS ==========
  {
    id: 'family',
    title: 'Family Photos',
    icon: 'Users',
    emoji: '👨‍👩‍👧‍👦',
    characterPreview: '👨‍⚕️ Medical Team • 👑 Royal Family',
    description: 'Group memories',
    themeColor: 'bg-rose-600',
    bgGradient: 'from-rose-500 via-pink-600 to-fuchsia-600',
    options: [
      {
        id: 'family_doctors',
        title: 'Medical Team',
        icon: 'Stethoscope',
        description: 'Family of Doctors',
        prompt: `A professional group portrait of the family members wearing white medical lab coats with stethoscopes. Standing together in a modern hospital hallway. Natural lighting. Each person has a caring and professional expression. United as a medical team. Authentic professional photography style. All faces clearly visible and matching the input photo exactly.`,
        themeColor: 'bg-blue-600'
      },
      {
        id: 'family_superheroes',
        title: 'Superhero Family',
        icon: 'Zap',
        description: 'Avengers Style',
        prompt: `A heroic group portrait of the family members as a superhero team. Each wearing unique colorful superhero costumes with capes. Standing together in a powerful team pose. City skyline in background. Dramatic golden hour lighting. Confident and brave expressions. Epic superhero team vibes. Authentic cosplay photography style. All faces clearly visible and matching the input photo exactly.`,
        themeColor: 'bg-red-600'
      },
      {
        id: 'family_royal',
        title: 'Royal Family',
        icon: 'Crown',
        description: 'King, Queen & More',
        prompt: `A majestic group portrait of the family as royalty. Wearing elegant royal attire - robes, gowns, and crowns. Standing in a grand palace hall with golden decorations. Regal and dignified poses. Warm ambient lighting. Noble and graceful expressions. Royal family portrait style. Authentic photography. All faces clearly visible and matching the input photo exactly.`,
        themeColor: 'bg-purple-700'
      },
      {
        id: 'family_sports',
        title: 'Sports Team',
        icon: 'Award',
        description: 'Champion Family',
        prompt: `A victorious group portrait of the family as a sports team. Wearing matching sports jerseys and athletic gear. Holding a trophy together. Stadium background with cheering crowd. Bright stadium lighting. Celebrating and joyful expressions. Champion team vibes. Authentic sports photography style. All faces clearly visible and matching the input photo exactly.`,
        themeColor: 'bg-green-600'
      },
      {
        id: 'family_pilots',
        title: 'Pilot Crew',
        icon: 'Plane',
        description: 'Aviation Family',
        prompt: `A professional group portrait of the family as an aviation crew. Wearing pilot uniforms with captain hats and flight attendant attire. Standing in front of an airplane. Airport terminal in background. Clear daylight. Confident and professional expressions. Aviation family dream. Authentic photography style. All faces clearly visible and matching the input photo exactly.`,
        themeColor: 'bg-sky-700'
      }
    ]
  },

  // ========== FRIENDS GROUP PHOTOS ==========
  {
    id: 'friends',
    title: 'Friends Squad',
    icon: 'Users',
    emoji: '👯',
    characterPreview: '👨‍⚕️ Doctor Squad • 🏏 Cricket Team',
    description: 'Squad goals',
    themeColor: 'bg-violet-600',
    bgGradient: 'from-violet-500 via-purple-600 to-indigo-600',
    options: [
      {
        id: 'friends_doctors',
        title: 'Doctor Squad',
        icon: 'Stethoscope',
        description: 'Medical Best Friends',
        prompt: `A professional group portrait of best friends as doctors. All wearing white medical lab coats with stethoscopes. Standing together in a modern hospital. Friendly and confident expressions. Team of young doctors ready to save lives. Bright natural lighting. Authentic professional photography style. All faces clearly visible and matching the input photo exactly.`,
        themeColor: 'bg-teal-600'
      },
      {
        id: 'friends_cricket',
        title: 'Cricket Team',
        icon: 'Target',
        description: '3 Batsmen Together',
        prompt: `A dynamic group portrait of best friends as cricket players. Wearing Indian cricket team blue jerseys. Holding cricket bats together in victory pose. Standing on a cricket pitch with packed stadium behind. Natural daylight. Celebrating a match victory. Champion team pose. Authentic sports photography style. All faces clearly visible and matching the input photo exactly.`,
        themeColor: 'bg-blue-700'
      },
      {
        id: 'friends_dance',
        title: 'Dance Squad',
        icon: 'Music',
        description: 'Dance Crew',
        prompt: `A vibrant group portrait of best friends as a dance squad. Wearing trendy streetwear dance outfits. Dynamic dance poses together. Colorful stage with neon lights in background. Energetic and confident expressions. Hip-hop dance crew vibes. Dramatic stage lighting. Authentic performance photography style. All faces clearly visible and matching the input photo exactly.`,
        themeColor: 'bg-pink-600'
      },
      {
        id: 'friends_superheroes',
        title: 'Hero Squad',
        icon: 'Shield',
        description: 'Superhero Team',
        prompt: `An epic group portrait of best friends as a superhero team. Each wearing unique superhero costumes in different colors. Standing in powerful team formation. City rooftop at sunset. Dramatic heroic lighting. Brave and confident expressions. Ready to save the world together. Authentic cosplay photography style. All faces clearly visible and matching the input photo exactly.`,
        themeColor: 'bg-red-700'
      },
      {
        id: 'friends_band',
        title: 'Music Band',
        icon: 'Music',
        description: 'Rock Stars',
        prompt: `A cool group portrait of best friends as a music band. Wearing rock band outfits - leather jackets, band t-shirts. Holding musical instruments - guitars, drums, microphone. Concert stage with spotlights in background. Dramatic stage lighting. Rock star expressions. Famous band vibes. Authentic music photography style. All faces clearly visible and matching the input photo exactly.`,
        themeColor: 'bg-slate-800'
      }
    ]
  }
];


// Icon mapping
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Stethoscope, HardHat, Gavel, Briefcase, ArrowLeft, Download, RefreshCcw, Wand2, Sparkles,
  Code, Zap, FlaskConical, Rocket, Microscope, Shield, Plane, TrendingUp, Award, Cpu, Target,
  Wrench, Gamepad2, Video, Palette, Bot, Printer, Camera, ThumbsUp, RotateCcw, Crown, Sword,
  Flame, Star, Heart, Music, Snowflake, Sun, Moon, Cat, Fish, Bug, Leaf, Mountain, Waves,
  Gem, Anchor, Book, Users, Flower2, CircleDot, Feather
};

const getIcon = (name: string) => iconMap[name] || Star;

// ============================================
// MAIN APP COMPONENT
// ============================================

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.ATTRACT);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // Category and option selection
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState<CategoryGroup | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<CareerOption | null>(null);

  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessingComplete, setIsProcessingComplete] = useState<boolean>(false);

  // --- Handlers ---

  const handleStart = () => setAppState(AppState.CAPTURE);

  const handleCapture = (image: string) => {
    setCapturedImage(image);
    setAppState(AppState.PHOTO_REVIEW);
  };

  const handleApprovePhoto = () => {
    setAppState(AppState.SELECT_CATEGORY);
  };

  const handleRetakePhoto = () => {
    setCapturedImage(null);
    setAppState(AppState.CAPTURE);
  };

  const handleSelectCategory = (category: CategoryGroup) => {
    setSelectedCategoryGroup(category);
    setAppState(AppState.SELECT_DREAM);
  };

  const handleSelectOption = (option: CareerOption) => {
    console.log('🎯 [APP] Selected option:', option.title);
    console.log('🎯 [APP] Option prompt:', option.prompt);
    console.log('🎯 [APP] Captured image exists:', !!capturedImage);
    setSelectedCareer(option);
    startProcessing(option.prompt);
  };

  const handleBack = () => {
    if (appState === AppState.SELECT_DREAM) {
      setAppState(AppState.SELECT_CATEGORY);
      setSelectedCategoryGroup(null);
    } else if (appState === AppState.SELECT_CATEGORY) {
      setAppState(AppState.PHOTO_REVIEW);
    } else {
      setAppState(AppState.CAPTURE);
    }
  };

  const startProcessing = async (prompt: string) => {
    console.log('⚙️ [APP] Starting processing with prompt length:', prompt?.length);

    if (!prompt || prompt.length === 0) {
      console.error('❌ [APP] ERROR: Empty prompt!');
      setError('No prompt provided for this character');
      return;
    }

    if (!capturedImage) {
      console.error('❌ [APP] ERROR: No captured image!');
      setError('No photo captured. Please take a photo first.');
      return;
    }

    setAppState(AppState.PROCESSING);
    setError(null);
    setIsProcessingComplete(false);
    try {
      console.log('⏳ [APP] Calling transformUserImage...');
      const result = await transformUserImage(capturedImage!, prompt);
      console.log('✅ [APP] Generation successful! Result length:', result?.length);
      setResultImage(result);
      setIsProcessingComplete(true);
    } catch (err: any) {
      console.error("❌ [APP] Generation Error:", err);
      setError(err.message || 'Image generation failed');
      setAppState(AppState.SELECT_DREAM);
    }
  };

  const handleProcessingComplete = () => {
    setAppState(AppState.RESULT);
  };

  const handleDownloadImage = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      const safeTitle = selectedCareer?.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'photo';
      link.download = `FutureFrame-${safeTitle}-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePrintImage = () => {
    if (resultImage) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Future Frame Print</title>
            <style>
              @media print {
                @page { margin: 0; size: 4in 6in; }
                body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: black; }
                img { max-width: 100%; max-height: 100%; object-fit: contain; }
              }
              body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #000; flex-direction: column; }
              img { max-width: 90vw; max-height: 80vh; border-radius: 8px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
              .print-info { margin-top: 20px; color: #666; font-family: sans-serif; }
            </style>
          </head>
          <body>
            <img src="${resultImage}" alt="Future Frame" />
            <div class="print-info">Future ${selectedCareer?.title} • Future Frame</div>
          </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => printWindow.print(), 500);
      }
    }
  };

  const handleTryAnother = () => {
    setResultImage(null);
    setSelectedCareer(null);
    setSelectedCategoryGroup(null);
    setIsProcessingComplete(false);
    setAppState(AppState.SELECT_CATEGORY);
  };

  const handleStartOver = () => {
    setAppState(AppState.ATTRACT);
    setCapturedImage(null);
    setResultImage(null);
    setSelectedCareer(null);
    setSelectedCategoryGroup(null);
    setError(null);
    setIsProcessingComplete(false);
  };

  // ============================================
  // RENDER FUNCTIONS
  // ============================================

  // Category Selection Grid (Main Categories)
  const renderCategorySelection = () => (
    <div className="w-full min-h-dvh bg-gradient-to-b from-[#0A192F] via-[#112240] to-[#020c1b] flex flex-col">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 flex items-center">
        <button onClick={handleBack} className="p-2 rounded-full text-white/80 hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="ml-3">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse">
            ✨ Choose Your Adventure ✨
          </h2>
          <p className="text-white/60 text-sm mt-1">Tap a category to explore characters</p>
        </div>
      </div>

      {/* Category Grid with staggered animation */}
      <div className="flex-1 overflow-auto px-4 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
          {CATEGORY_GROUPS.map((category, index) => (
            <button
              key={category.id}
              onClick={() => handleSelectCategory(category)}
              style={{ animationDelay: `${index * 50}ms` }}
              className={`
                relative overflow-hidden rounded-2xl p-4 md:p-5 text-left 
                transition-all duration-300 transform 
                hover:scale-105 hover:-translate-y-1 hover:shadow-2xl
                active:scale-95 touch-manipulation 
                bg-gradient-to-br ${category.bgGradient} 
                border border-white/20 shadow-lg
                animate-[fadeInUp_0.5s_ease-out_forwards]
                group
              `}
            >
              {/* Large Emoji */}
              <div className="text-4xl md:text-5xl mb-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                {category.emoji || '✨'}
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-base md:text-lg mb-0.5 drop-shadow-md">
                {category.title}
              </h3>

              {/* Character Preview */}
              {category.characterPreview && (
                <p className="text-white/80 text-[10px] md:text-xs font-medium truncate">
                  {category.characterPreview}
                </p>
              )}

              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-2xl"></div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="absolute -top-2 -left-2 w-12 h-12 bg-white/5 rounded-full blur-lg"></div>

              {/* Sparkle effect */}
              <div className="absolute top-2 right-2 text-white/40 text-xs group-hover:text-white/80 transition-colors">
                <Sparkles className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Option Selection Grid (Within a Category)
  const renderOptionSelection = () => {
    if (!selectedCategoryGroup) return null;

    return (
      <div className={`w-full min-h-dvh bg-gradient-to-b ${selectedCategoryGroup.bgGradient} to-[#020c1b] flex flex-col`}>
        {/* Header */}
        <div className="px-4 pt-6 pb-4 flex items-center">
          <button onClick={handleBack} className="p-2 rounded-full text-white/80 hover:bg-white/10">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="ml-3">
            <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">
              {selectedCategoryGroup.title}
            </h2>
            <p className="text-white/60 text-xs">{selectedCategoryGroup.description}</p>
          </div>
        </div>

        {/* Options Grid */}
        <div className="flex-1 overflow-auto px-4 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-3xl mx-auto">
            {selectedCategoryGroup.options.map((option) => {
              const IconComp = getIcon(option.icon);
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option)}
                  className={`relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 shadow-lg`}
                >
                  <div className={`w-10 h-10 rounded-xl ${option.themeColor} flex items-center justify-center mb-2`}>
                    <IconComp className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-sm md:text-base mb-1">{option.title}</h3>
                  <p className="text-white/60 text-xs">{option.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Photo Review Screen
  const renderPhotoReview = () => (
    <div className="relative w-full h-dvh flex flex-col items-center justify-center bg-black overflow-hidden">
      {capturedImage && (
        <img src={capturedImage} alt="Captured" className="absolute inset-0 w-full h-full object-contain" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none"></div>

      <div className="absolute top-6 left-0 right-0 z-20 text-center">
        <div className="inline-block bg-black/60 px-6 py-2 rounded-full backdrop-blur-md">
          <p className="text-white text-sm md:text-lg font-medium">Does this photo look good?</p>
        </div>
      </div>

      <div className="absolute bottom-0 w-full pb-safe z-30 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="pb-8 pt-12 flex justify-center items-center gap-6 max-w-lg mx-auto px-6">
          <button
            onClick={handleRetakePhoto}
            className="flex flex-col items-center space-y-2 text-white/90 active:text-white transition-all active:scale-95 touch-manipulation"
          >
            <div className="p-4 rounded-full bg-red-600/80 backdrop-blur-md border border-white/10 shadow-lg">
              <RotateCcw className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <span className="text-xs md:text-sm font-bold tracking-wider uppercase">Retake</span>
          </button>

          <button
            onClick={handleApprovePhoto}
            className="flex flex-col items-center space-y-2 text-white active:scale-95 touch-manipulation"
          >
            <div className="p-5 rounded-full bg-green-500 shadow-[0_0_30px_rgba(34,197,94,0.5)] border-4 border-white/30">
              <ThumbsUp className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <span className="text-sm md:text-base font-bold tracking-wider uppercase">Looks Good!</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Result Screen
  const renderResult = () => (
    <div className="relative w-full h-dvh flex flex-col items-center justify-center bg-black overflow-hidden">
      {resultImage && (
        <>
          <img src={resultImage} alt="Result" className="absolute inset-0 w-full h-full object-contain" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 pointer-events-none"></div>

          <div className="absolute top-4 left-4 z-20">
            <button onClick={handleStartOver} className="p-3 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-20">
            <div className="max-w-md mx-auto space-y-3">
              <div className="bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-cyan-400 font-bold uppercase tracking-widest text-xs md:text-sm">
                      {selectedCareer?.title}
                    </p>
                    <p className="text-white text-[10px] md:text-xs opacity-90">Powered by Future Frame</p>
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handlePrintImage}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(6,182,212,0.4)] active:scale-95 touch-manipulation transition-all"
              >
                <Printer className="w-6 h-6" />
                PRINT THIS!
              </button>

              <div className="flex gap-3">
                <button
                  onClick={handleTryAnother}
                  className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl flex items-center justify-center gap-2 backdrop-blur-md border border-white/20 active:scale-95 touch-manipulation"
                >
                  <RefreshCcw className="w-5 h-5" />
                  Try Another
                </button>
                <button
                  onClick={handleDownloadImage}
                  className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl flex items-center justify-center gap-2 backdrop-blur-md border border-white/20 active:scale-95 touch-manipulation"
                >
                  <Download className="w-5 h-5" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  // ============================================
  // MAIN RENDER
  // ============================================

  return (
    <div className="w-full min-h-dvh font-sans">
      {appState === AppState.ATTRACT && <AttractScreen onStart={handleStart} />}

      {appState === AppState.CAPTURE && (
        <CameraCapture onCapture={handleCapture} onBack={handleStartOver} />
      )}

      {appState === AppState.PHOTO_REVIEW && renderPhotoReview()}

      {appState === AppState.SELECT_CATEGORY && renderCategorySelection()}

      {appState === AppState.SELECT_DREAM && renderOptionSelection()}

      {appState === AppState.PROCESSING && (
        <ProcessingView
          onComplete={handleProcessingComplete}
          isActuallyComplete={isProcessingComplete}
        />
      )}

      {appState === AppState.RESULT && renderResult()}

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-20 left-4 right-4 z-50">
          <div className="max-w-md mx-auto bg-red-500/90 backdrop-blur-md text-white px-4 py-3 rounded-xl text-center text-sm">
            {error}
            <button onClick={() => setError(null)} className="ml-2 underline">Dismiss</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;