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
  // ========== INDIAN GODS ==========
  {
    id: 'indian_gods',
    title: 'Indian Gods',
    icon: 'CircleDot',
    emoji: '🙏',
    characterPreview: '🪈 Krishna • 🐒 Hanuman • 🐘 Ganesha',
    description: 'Divine avatars',
    themeColor: 'bg-orange-500',
    bgGradient: 'from-orange-600 via-amber-500 to-yellow-400',
    options: [
      {
        id: 'krishna',
        title: 'Lord Krishna',
        icon: 'Feather',
        description: 'Divine flute player',
        prompt: `The person as Lord Krishna wearing beautiful yellow silk dhoti, golden jewelry, and peacock feather crown. Holding flute gracefully. Vrindavan garden with peacocks in background. Divine golden glow. Professional portrait photo. Face clearly visible.`,
        themeColor: 'bg-blue-600'
      },
      {
        id: 'hanuman',
        title: 'Lord Hanuman',
        icon: 'Flame',
        description: 'Mighty devotee',
        prompt: `The person as Lord Hanuman wearing golden warrior armor, red cape, and ornate crown with Hanuman motif. Holding golden mace (gada). Temple or mountain with divine glow in background. Strong heroic pose. Professional portrait photo. Face clearly visible.`,
        themeColor: 'bg-orange-600'
      },
      {
        id: 'ganesha',
        title: 'Lord Ganesha',
        icon: 'Gem',
        description: 'Remover of obstacles',
        prompt: `COSTUME: Lord Ganesha themed outfit. The person (KEEP THEIR EXACT FACE UNCHANGED) wearing rich red and gold silk dhoti/dress with Ganesha-inspired golden crown. Holding modak sweets and lotus flowers. Decorated temple background with festive lights. Golden auspicious glow. Professional costume photo. Face must remain the SAME as input - do NOT add elephant features.`,
        themeColor: 'bg-red-600'
      },
      {
        id: 'ram',
        title: 'Lord Ram',
        icon: 'Target',
        description: 'Maryada Purushottam',
        prompt: `COSTUME: Lord Ram prince outfit. The person (KEEP THEIR EXACT FACE UNCHANGED) wearing royal Ram costume - royal blue and gold prince attire, golden crown with gems. Bow and arrow (dhanush) held or nearby. Ayodhya palace or forest background. Divine golden aura effect. Noble dignified pose. Professional costume photo. Face must be the SAME as input.`,
        themeColor: 'bg-blue-700'
      },
      {
        id: 'shiva',
        title: 'Lord Shiva',
        icon: 'Moon',
        description: 'The Destroyer',
        prompt: `COSTUME: Lord Shiva outfit. The person (KEEP THEIR EXACT FACE UNCHANGED) wearing Shiva costume - rudraksha beads around neck, crescent moon accessory in hair, tiger skin print lower garment. Trident (trishul) held or nearby. Third eye tilak mark on forehead. Kailash mountain background. Divine blue aura. Professional costume photo. Face must be SAME as input.`,
        themeColor: 'bg-purple-700'
      }
    ]
  },


  // ========== INDIAN GODDESSES ==========
  {
    id: 'indian_goddesses',
    title: 'Indian Goddesses',
    icon: 'Flower2',
    emoji: '🪷',
    characterPreview: '⚔️ Durga • 💰 Lakshmi • 📚 Saraswati',
    description: 'Divine feminine',
    themeColor: 'bg-pink-600',
    bgGradient: 'from-pink-500 via-rose-500 to-red-400',
    options: [
      {
        id: 'durga',
        title: 'Goddess Durga',
        icon: 'Sword',
        description: 'Divine warrior',
        prompt: `COSTUME: Goddess Durga outfit. The person (KEEP THEIR EXACT FACE UNCHANGED) wearing beautiful Durga costume - elegant red and gold saree, golden crown, traditional jewelry. Lion statue or imagery in background. Temple setting with divine red glow. Powerful warrior goddess pose. Professional costume photo. Face must be SAME as input.`,
        themeColor: 'bg-red-600'
      },
      {
        id: 'lakshmi',
        title: 'Goddess Lakshmi',
        icon: 'Gem',
        description: 'Goddess of wealth',
        prompt: `COSTUME: Goddess Lakshmi outfit. The person (KEEP THEIR EXACT FACE UNCHANGED) wearing Lakshmi costume - pink and gold saree, heavy golden jewelry, golden crown. Sitting near lotus flowers with gold coins around. Elephant statues in background. Divine golden glow. Graceful serene pose. Professional costume photo. Face must be SAME as input.`,
        themeColor: 'bg-yellow-600'
      },
      {
        id: 'saraswati',
        title: 'Goddess Saraswati',
        icon: 'Book',
        description: 'Goddess of knowledge',
        prompt: `COSTUME: Goddess Saraswati outfit. The person (KEEP THEIR EXACT FACE UNCHANGED) wearing Saraswati costume - white and gold saree, elegant jewelry, white lotus crown. Veena instrument nearby. Books and swan in background. White lotus setting. Soft white glow. Scholarly graceful pose. Professional costume photo. Face must be SAME as input.`,
        themeColor: 'bg-white'
      },
      {
        id: 'parvati',
        title: 'Goddess Parvati',
        icon: 'Heart',
        description: 'Divine mother',
        prompt: `COSTUME: Goddess Parvati outfit. The person (KEEP THEIR EXACT FACE UNCHANGED) wearing Parvati costume - green and gold saree, elegant jewelry. Lotus flowers around. Nature or temple background. Green and gold divine aura. Gentle maternal graceful pose. Professional costume photo. Face must be SAME as input.`,
        themeColor: 'bg-green-600'
      }
    ]
  },

  // ========== DESI HEROES (Indian Cartoons) ==========
  {
    id: 'desi_heroes',
    title: 'Desi Heroes',
    icon: 'Star',
    emoji: '🇮🇳',
    characterPreview: '💪 Bheem • 🚔 Singham • ⚡ Shiva',
    description: 'Indian cartoon heroes',
    themeColor: 'bg-amber-500',
    bgGradient: 'from-amber-400 via-orange-500 to-red-500',
    options: [
      {
        id: 'chhota_bheem',
        title: 'Chhota Bheem',
        icon: 'Shield',
        description: 'Dholakpur hero',
        prompt: `COSTUME: Chhota Bheem outfit. The person (KEEP THEIR EXACT FACE UNCHANGED) wearing Bheem costume - orange dhoti/shorts, no shirt or orange vest showing muscles. Holding a laddoo sweet. Indian village Dholakpur background with trees. Heroic action pose. Realistic photo NOT cartoon. Face must be SAME as input.`,
        themeColor: 'bg-orange-500'
      },
      {
        id: 'chutki',
        title: 'Chutki',
        icon: 'Heart',
        description: 'Smart and brave',
        prompt: `COSTUME: Chutki outfit. The person (KEEP THEIR EXACT FACE UNCHANGED) wearing Chutki costume - pink and purple traditional Indian dress (lehenga choli). Hair in two braids with flowers. Holding books or laddoo. Indian village background. Smart confident pose. Realistic photo NOT cartoon. Face must be SAME as input.`,
        themeColor: 'bg-pink-500'
      },
      {
        id: 'little_singham',
        title: 'Little Singham',
        icon: 'Shield',
        description: 'Young police hero',
        prompt: `COSTUME: Little Singham outfit. The person (KEEP THEIR EXACT FACE UNCHANGED) wearing police uniform - khaki shirt and pants, police cap, aviator sunglasses on head. Police badge visible. City or police station background. Confident hero pose. Realistic photo NOT cartoon. Face must be SAME as input.`,
        themeColor: 'bg-yellow-700'
      },
      {
        id: 'shiva_cartoon',
        title: 'Shiva',
        icon: 'Zap',
        description: 'Tech hero kid',
        prompt: `COSTUME: Shiva (cartoon) outfit. The person (KEEP THEIR EXACT FACE UNCHANGED) wearing Shiva costume - blue t-shirt with special tech gadget watch on wrist. Modern Indian city background. Cool tech hero pose. Realistic photo NOT cartoon. Face must be SAME as input.`,
        themeColor: 'bg-blue-500'
      },
      {
        id: 'mighty_raju',
        title: 'Mighty Raju',
        icon: 'Zap',
        description: 'Super powered kid',
        prompt: `COSTUME: Mighty Raju outfit. The person (KEEP THEIR EXACT FACE UNCHANGED) wearing superhero costume - red and blue suit with cape. Flying or action hero pose. City skyline background. Energy glow around hands. Realistic photo NOT cartoon. Face must be SAME as input.`,
        themeColor: 'bg-red-500'
      }
    ]
  },

  // ========== MARVEL HEROES ==========
  {
    id: 'marvel',
    title: 'Marvel Heroes',
    icon: 'Shield',
    emoji: '🦸',
    characterPreview: '🕷️ Spider-Man • 🤖 Iron Man • 🔨 Thor',
    description: 'Avengers & more',
    themeColor: 'bg-red-600',
    bgGradient: 'from-red-500 via-red-600 to-orange-500',
    options: [
      {
        id: 'spiderman',
        title: 'Spider-Man',
        icon: 'Bug',
        description: 'Friendly neighborhood hero',
        prompt: `The person as Spider-Man wearing the red and blue Spider-Man suit with web pattern design. No mask - face clearly visible. Standing on a New York city rooftop at sunset. Heroic confident pose. Professional movie-style photo. Face clearly visible.`,
        themeColor: 'bg-red-600'
      },
      {
        id: 'ironman',
        title: 'Iron Man',
        icon: 'Cpu',
        description: 'Genius billionaire',
        prompt: `The person wearing a red and gold superhero armored suit with blue glowing chest reactor. High-tech futuristic lab with holographic displays in background. Confident heroic stance. Professional movie-style photo. Face clearly visible.`,
        themeColor: 'bg-yellow-600'
      },
      {
        id: 'thor',
        title: 'Thor',
        icon: 'Zap',
        description: 'God of Thunder',
        prompt: `The person as Thor wearing Asgardian armor with flowing red cape. Mjolnir hammer in hand. Stormy sky with lightning in background. Powerful god-like pose. Professional movie-style photo. Face clearly visible.`,
        themeColor: 'bg-blue-700'
      },
      {
        id: 'captain',
        title: 'Captain America',
        icon: 'Shield',
        description: 'Super soldier',
        prompt: `The person as Captain America wearing the blue tactical Captain America suit with white star on chest. Holding the round shield. City or military base in background. Noble heroic stance. Professional movie-style photo. Face clearly visible.`,
        themeColor: 'bg-blue-800'
      },
      {
        id: 'hulk',
        title: 'Hulk',
        icon: 'Mountain',
        description: 'Incredible strength',
        prompt: `The person in a Hulk-inspired powerful pose. Wearing torn purple shirt/clothing. Green glowing energy effects around their fists. Rocky mountain background. Muscular powerful stance with clenched fists. Keep person's real face and body unchanged. Add dramatic green power effects. Professional movie-style photo. Face clearly visible.`,
        themeColor: 'bg-green-700'
      },
      {
        id: 'blackpanther',
        title: 'Black Panther',
        icon: 'Cat',
        description: 'King of Wakanda',
        prompt: `COSTUME: Black Panther suit. The person (KEEP THEIR EXACT FACE UNCHANGED) wearing Black Panther costume - sleek black vibranium suit with panther design. Mask is OFF, showing their real face. Wakanda palace background. Regal powerful pose. Professional costume photo. Face must be SAME as input.`,
        themeColor: 'bg-purple-900'
      }
    ]
  },

  // ========== DC HEROES ==========
  {
    id: 'dc',
    title: 'DC Heroes',
    icon: 'Sword',
    emoji: '🦹',
    characterPreview: '🦇 Batman • 💪 Superman • ⭐ Wonder Woman',
    description: 'Justice League',
    themeColor: 'bg-blue-800',
    bgGradient: 'from-blue-600 via-indigo-700 to-slate-800',
    options: [
      {
        id: 'batman',
        title: 'Batman',
        icon: 'Moon',
        description: 'Dark Knight',
        prompt: `The person as Batman wearing dark tactical bat suit with flowing black cape. No cowl/mask - face clearly visible. Standing on Gotham city rooftop at night with bat-signal in sky. Dark heroic pose. Professional movie-style photo. Face clearly visible.`,
        themeColor: 'bg-slate-800'
      },
      {
        id: 'superman',
        title: 'Superman',
        icon: 'Sun',
        description: 'Man of Steel',
        prompt: `The person as Superman wearing the blue Superman suit with red cape and S symbol on chest. Flying pose with Metropolis city skyline in background. Heroic powerful stance. Professional movie-style photo. Face clearly visible.`,
        themeColor: 'bg-blue-700'
      },
      {
        id: 'wonderwoman',
        title: 'Wonder Woman',
        icon: 'Crown',
        description: 'Amazon warrior',
        prompt: `The person as Wonder Woman wearing red and gold warrior armor with tiara and bracelets. Themyscira island or ancient Greek temple in background. Powerful warrior goddess pose. Professional movie-style photo. Face clearly visible.`,
        themeColor: 'bg-red-700'
      },
      {
        id: 'flash',
        title: 'The Flash',
        icon: 'Zap',
        description: 'Fastest man alive',
        prompt: `The person as The Flash wearing red Flash suit with lightning bolt emblem. No mask - face clearly visible. Lightning speed effects around them. City street background. Dynamic running pose. Professional movie-style photo. Face clearly visible.`,
        themeColor: 'bg-red-600'
      },
      {
        id: 'aquaman',
        title: 'Aquaman',
        icon: 'Waves',
        description: 'King of Atlantis',
        prompt: `The person as Aquaman wearing golden and green scale armor. Holding trident. Underwater Atlantis palace in background. Powerful ocean king pose. Professional movie-style photo. Face clearly visible.`,
        themeColor: 'bg-teal-600'
      }
    ]
  },

  // ========== DISNEY PRINCESSES ==========
  {
    id: 'disney_princess',
    title: 'Disney Princesses',
    icon: 'Crown',
    emoji: '👸',
    characterPreview: '❄️ Elsa • 🌊 Moana • 👑 Rapunzel',
    description: 'Fairy tale royalty',
    themeColor: 'bg-pink-500',
    bgGradient: 'from-pink-400 via-purple-500 to-indigo-500',
    options: [
      {
        id: 'elsa',
        title: 'Elsa',
        icon: 'Snowflake',
        description: 'Ice Queen',
        prompt: `COSTUME: Elsa outfit. The person (KEEP THEIR EXACT FACE UNCHANGED) wearing Elsa costume - sparkly light blue ice queen gown with flowing cape. Ice palace or snowy mountain background. Snowflakes floating. Elegant princess pose. Professional costume photo. Face must be SAME as input.`,
        themeColor: 'bg-cyan-500'
      },
      {
        id: 'moana',
        title: 'Moana',
        icon: 'Waves',
        description: 'Ocean voyager',
        prompt: `COSTUME: Moana outfit. The person (KEEP THEIR EXACT FACE UNCHANGED) wearing Moana costume - traditional Polynesian red and tan outfit. Tropical ocean beach background with palm trees. Adventurous pose. Professional costume photo. Face must be SAME as input.`,
        themeColor: 'bg-teal-500'
      },
      {
        id: 'rapunzel',
        title: 'Rapunzel',
        icon: 'Sun',
        description: 'Tower princess',
        prompt: `COSTUME: Rapunzel outfit. The person (KEEP THEIR EXACT FACE UNCHANGED) wearing Rapunzel costume - purple and pink princess dress, long blonde wig with flowers. Floating lanterns in sky background. Sweet princess pose. Professional costume photo. Face must be SAME as input.`,
        themeColor: 'bg-purple-500'
      },
      {
        id: 'cinderella',
        title: 'Cinderella',
        icon: 'Sparkles',
        description: 'Ball princess',
        prompt: `COSTUME: Cinderella outfit. The person (KEEP THEIR EXACT FACE UNCHANGED) wearing Cinderella costume - elegant light blue ball gown with sparkles. Palace ballroom background. Elegant princess pose. Professional costume photo. Face must be SAME as input.`,
        themeColor: 'bg-blue-400'
      },
      {
        id: 'jasmine',
        title: 'Jasmine',
        icon: 'Gem',
        description: 'Arabian princess',
        prompt: `COSTUME: Jasmine outfit. The person (KEEP THEIR EXACT FACE UNCHANGED) wearing Jasmine costume - teal Arabian princess outfit. Agrabah palace background with domes. Confident princess pose. Professional costume photo. Face must be SAME as input.`,
        themeColor: 'bg-teal-600'
      },
      {
        id: 'belle',
        title: 'Belle',
        icon: 'Book',
        description: 'Beauty & the Beast',
        prompt: `COSTUME: Belle outfit. The person (KEEP THEIR EXACT FACE UNCHANGED) wearing Belle costume - elegant golden yellow ball gown. Enchanted castle library background. Graceful pose. Professional costume photo. Face must be SAME as input.`,
        themeColor: 'bg-yellow-500'
      }
    ]
  },

  // ========== BARBIE ==========
  {
    id: 'barbie',
    title: 'Barbie World',
    icon: 'Heart',
    emoji: '💄',
    characterPreview: '👑 Princess • 🪩 Fairy • 🧜‍♀️ Mermaid',
    description: 'Fabulous & fun',
    themeColor: 'bg-pink-400',
    bgGradient: 'from-pink-400 via-fuchsia-500 to-purple-500',
    options: [
      {
        id: 'barbie_princess',
        title: 'Barbie Princess',
        icon: 'Crown',
        description: 'Royal Barbie',
        prompt: `COSTUME: Barbie Princess outfit. The person (KEEP THEIR EXACT FACE UNCHANGED) wearing pink princess ball gown, tiara, and jewelry. Pink palace ballroom background. Sparkly princess pose. Professional costume photo. Face must be SAME as input.`,
        themeColor: 'bg-pink-500'
      },
      {
        id: 'barbie_fairy',
        title: 'Barbie Fairy',
        icon: 'Sparkles',
        description: 'Magical fairy',
        prompt: `COSTUME: Barbie Fairy outfit. The person (KEEP THEIR EXACT FACE UNCHANGED) wearing pink and purple fairy costume with sparkly wings attached. Magical forest background. Sweet fairy pose. Professional costume photo. Face must be SAME as input.`,
        themeColor: 'bg-purple-400'
      },
      {
        id: 'barbie_mermaid',
        title: 'Barbie Mermaid',
        icon: 'Fish',
        description: 'Ocean princess',
        prompt: `COSTUME: Barbie Mermaid outfit. The person (KEEP THEIR EXACT FACE UNCHANGED) wearing pink mermaid costume with tail. Sitting pose. Ocean beach background with seashells. Professional costume photo. Face must be SAME as input.`,
        themeColor: 'bg-cyan-400'
      },
      {
        id: 'barbie_rockstar',
        title: 'Barbie Rockstar',
        icon: 'Music',
        description: 'Pop star diva',
        prompt: `The person as Barbie Rockstar in glamorous sparkly pink rock outfit. Holding microphone. Concert stage with pink lights background. Rock star pose. Confident performer expression. Movie-quality photo. Face fully visible.`,
        themeColor: 'bg-fuchsia-500'
      }
    ]
  },

  // ========== DORAEMON WORLD ==========
  {
    id: 'doraemon',
    title: 'Doraemon World',
    icon: 'CircleDot',
    emoji: '🐱',
    characterPreview: '👦 Nobita • 👧 Shizuka • 🤖 Doraemon',
    description: 'Future gadgets',
    themeColor: 'bg-blue-400',
    bgGradient: 'from-blue-400 via-cyan-500 to-teal-400',
    options: [
      {
        id: 'nobita',
        title: 'Nobita',
        icon: 'Star',
        description: 'Adventurous dreamer',
        prompt: `The person as Nobita from Doraemon - a friendly school kid wearing yellow shirt and blue shorts. Round glasses. School bag. Japanese suburban neighborhood or bedroom background. Friendly pose with Doraemon robot cat nearby. Realistic photo style (not cartoon). Face clearly visible.`,
        themeColor: 'bg-yellow-500'
      },
      {
        id: 'shizuka',
        title: 'Shizuka',
        icon: 'Heart',
        description: 'Kind and caring',
        prompt: `The person as Shizuka from Doraemon - a sweet Japanese school girl in pink dress. Hair with bow. Holding violin or flowers. Japanese garden or home background. Kind gentle expression. Realistic photo style (not cartoon). Face clearly visible.`,
        themeColor: 'bg-pink-400'
      },
      {
        id: 'doraemon_friend',
        title: 'Doraemon Friend',
        icon: 'CircleDot',
        description: 'With robot cat',
        prompt: `The person as a friend of Doraemon - wearing casual colorful clothes. Standing with Doraemon the blue robot cat beside them. Futuristic gadgets floating around. Japanese home or anywhere door background. Happy adventurous pose. Realistic photo. Face clearly visible.`,
        themeColor: 'bg-blue-500'
      }
    ]
  },

  // ========== ANIME HEROES ==========
  {
    id: 'anime',
    title: 'Anime Heroes',
    icon: 'Star',
    emoji: '✨',
    characterPreview: '🥋 Naruto • 🔥 Goku • ⚔️ Demon Slayer',
    description: 'Japanese animation',
    themeColor: 'bg-orange-500',
    bgGradient: 'from-orange-500 via-red-500 to-pink-500',
    options: [
      {
        id: 'naruto',
        title: 'Naruto',
        icon: 'Leaf',
        description: 'Ninja warrior',
        prompt: `The person as Naruto in orange and black ninja outfit. Headband with leaf symbol on forehead. Hidden village with trees background. Dynamic ninja pose. Realistic photo style (not cartoon). Face fully visible.`,
        themeColor: 'bg-orange-500'
      },
      {
        id: 'goku',
        title: 'Goku',
        icon: 'Flame',
        description: 'Super Saiyan',
        prompt: `The person as Goku in orange gi fighting outfit. Spiky hair (Super Saiyan blonde if desired). Energy aura around body. Mountain or tournament background. Powerful fighting stance. Realistic photo. Face fully visible.`,
        themeColor: 'bg-orange-600'
      },
      {
        id: 'demonslayer',
        title: 'Tanjiro',
        icon: 'Sword',
        description: 'Demon Slayer',
        prompt: `The person as Tanjiro from Demon Slayer in black uniform with checkered green haori coat. Scar on forehead. Katana sword at side. Japanese forest background. Determined warrior pose. Realistic style. Face fully visible.`,
        themeColor: 'bg-green-700'
      },
      {
        id: 'luffy',
        title: 'Luffy',
        icon: 'Anchor',
        description: 'Pirate King',
        prompt: `The person as Luffy from One Piece in red vest and straw hat (hat behind head). Pirate ship with ocean background. Excited adventurous pose. Realistic photo style. Face fully visible and expressive.`,
        themeColor: 'bg-red-600'
      }
    ]
  },

  // ========== GAMING LEGENDS ==========
  {
    id: 'gaming',
    title: 'Gaming Heroes',
    icon: 'Gamepad2',
    emoji: '🎮',
    characterPreview: '⛏️ Minecraft • ⚡ Pokemon • 🍄 Mario',
    description: 'Video game legends',
    themeColor: 'bg-green-600',
    bgGradient: 'from-green-500 via-emerald-500 to-teal-500',
    options: [
      {
        id: 'minecraft',
        title: 'Minecraft Steve',
        icon: 'Mountain',
        description: 'Block builder',
        prompt: `The person as Minecraft character in pixelated diamond armor. Blocky Minecraft world with grass and trees background. Pickaxe nearby. Adventurous pose. Stylized realistic photo. Face fully visible.`,
        themeColor: 'bg-green-600'
      },
      {
        id: 'pokemon',
        title: 'Pokemon Trainer',
        icon: 'Target',
        description: 'Gotta catch em all',
        prompt: `The person as Pokemon Trainer like Ash in red cap and blue jacket. Pokeball in hand. Pikachu nearby. Pokemon center or grassy field background. Excited trainer pose. Realistic photo. Face fully visible.`,
        themeColor: 'bg-red-500'
      },
      {
        id: 'mario',
        title: 'Super Mario',
        icon: 'Star',
        description: "It's-a me!",
        prompt: `The person as Mario in red cap with M logo, blue overalls, red shirt. Mushroom Kingdom background with colorful blocks. Cheerful jumping pose. Realistic photo. Face fully visible.`,
        themeColor: 'bg-red-600'
      },
      {
        id: 'fortnite',
        title: 'Fortnite Hero',
        icon: 'Target',
        description: 'Victory Royale',
        prompt: `The person as Fortnite character in colorful tactical outfit. Battle bus or neon island background. Dynamic action pose. Realistic photo. Face fully visible.`,
        themeColor: 'bg-purple-600'
      }
    ]
  },

  // ========== FANTASY WORLD ==========
  {
    id: 'fantasy',
    title: 'Fantasy World',
    icon: 'Wand2',
    emoji: '🪄',
    characterPreview: '⚡ Harry Potter • 🧹 Fairy • 🧜 Mermaid',
    description: 'Magic & adventure',
    themeColor: 'bg-purple-600',
    bgGradient: 'from-purple-500 via-violet-600 to-indigo-600',
    options: [
      {
        id: 'wizard',
        title: 'Harry Potter',
        icon: 'Wand2',
        description: 'Hogwarts student',
        prompt: `The person as Harry Potter in Hogwarts black robes with Gryffindor colors. Magic wand in hand. Hogwarts castle or library background. Lightning scar on forehead optional. Magical pose. Realistic photo. Face fully visible.`,
        themeColor: 'bg-purple-700'
      },
      {
        id: 'fairy',
        title: 'Forest Fairy',
        icon: 'Sparkles',
        description: 'Magical creature',
        prompt: `The person as a magical fairy with delicate sparkly wings. Colorful flower dress. Enchanted forest with glowing mushrooms background. Magical sparkles floating. Sweet pose. Realistic photo. Face fully visible.`,
        themeColor: 'bg-pink-500'
      },
      {
        id: 'mermaid',
        title: 'Mermaid',
        icon: 'Fish',
        description: 'Ocean magic',
        prompt: `The person as a beautiful mermaid with colorful tail sitting on rock. Seashell accessories. Ocean reef background. Graceful pose. Realistic photo. Face fully visible.`,
        themeColor: 'bg-cyan-500'
      },
      {
        id: 'knight',
        title: 'Noble Knight',
        icon: 'Sword',
        description: 'Medieval warrior',
        prompt: `The person as a noble knight in shining silver armor. Sword at side. Medieval castle background. Chivalrous pose. Helmet off. Realistic photo. Face fully visible.`,
        themeColor: 'bg-slate-600'
      }
    ]
  },

  // ========== DREAM CAREERS ==========
  {
    id: 'careers',
    title: 'Dream Careers',
    icon: 'Briefcase',
    emoji: '👔',
    characterPreview: '👨‍⚕️ Doctor • ✈️ Pilot • 🚀 Astronaut',
    description: 'Future profession',
    themeColor: 'bg-blue-600',
    bgGradient: 'from-blue-500 via-indigo-600 to-violet-600',
    options: [
      {
        id: 'doctor',
        title: 'Doctor',
        icon: 'Stethoscope',
        description: 'Saving lives',
        prompt: `The person as a doctor wearing white medical coat with stethoscope around neck. Hospital hallway background. Natural lighting. Realistic workplace photo. Face clearly visible.`,
        themeColor: 'bg-blue-600'
      },
      {
        id: 'pilot',
        title: 'Pilot',
        icon: 'Plane',
        description: 'Flying high',
        prompt: `The person as a pilot in olive green flight suit. Aircraft or airbase background. Outdoor lighting. Professional pilot photo. Face clearly visible.`,
        themeColor: 'bg-sky-700'
      },
      {
        id: 'astronaut',
        title: 'Astronaut',
        icon: 'Rocket',
        description: 'Space explorer',
        prompt: `The person as astronaut in NASA-style white space suit. Helmet under arm. Space center or rocket background. Professional astronaut photo. Face clearly visible.`,
        themeColor: 'bg-slate-700'
      },
      {
        id: 'scientist',
        title: 'Scientist',
        icon: 'Microscope',
        description: 'Discovery awaits',
        prompt: `The person as scientist in white lab coat in modern laboratory. Research equipment in background. Clean lab lighting. Realistic photo. Face clearly visible.`,
        themeColor: 'bg-emerald-600'
      },
      {
        id: 'engineer',
        title: 'Engineer',
        icon: 'HardHat',
        description: 'Building future',
        prompt: `The person as engineer at construction site wearing yellow safety vest and white hard hat. Construction equipment background. Natural daylight. Realistic photo. Face clearly visible.`,
        themeColor: 'bg-orange-600'
      },
      {
        id: 'police',
        title: 'Police Officer',
        icon: 'Shield',
        description: 'Protecting people',
        prompt: `The person as police officer in official khaki uniform. Government building background. Natural daylight. Official respectful photo. Face clearly visible.`,
        themeColor: 'bg-yellow-700'
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
      link.download = `FutureFrame-${Date.now()}.jpg`;
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