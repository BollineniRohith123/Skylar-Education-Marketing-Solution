import React, { useState } from 'react';
import { AppState, CareerOption } from './types';
import AttractScreen from './components/AttractScreen';
import CameraCapture from './components/CameraCapture';
import ProcessingView from './components/ProcessingView';
import { transformUserImage } from './services/geminiService';
import { 
  Stethoscope, 
  HardHat, 
  Gavel, 
  GraduationCap, 
  Briefcase, 
  ArrowLeft,
  Download,
  Share2,
  RefreshCcw,
  Wand2,
  Sparkles,
  CheckCircle,
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
  LayoutGrid,
  Wrench,
  Gamepad2,
  Video,
  Palette,
  Bot
} from 'lucide-react';

// --- Constants ---

/**
 * PRODUCTION PROMPT TEMPLATES (SCORE 10/10)
 * Optimized for:
 * 1. Identity Safety (No occlusions)
 * 2. Hand Safety (No holding props)
 * 3. Text Safety (No specific spellings)
 * 4. Lighting Safety (Natural skin tones)
 */
const CAREER_OPTIONS: CareerOption[] = [
  {
    id: 'doctor',
    title: 'Doctor',
    icon: 'Stethoscope',
    description: 'Saving lives, one patient at a time.',
    prompt: `
      SUBJECT_ROLE: Senior Medical Consultant.
      WARDROBE: Premium white medical coat with distinct fabric weave texture, embroidered hospital crest on pocket. Stethoscope draped naturally around the neck (not held in hands). Underneath: Crisp light blue button-down shirt.
      ENVIRONMENT: Modern high-end hospital corridor. Clean architectural lines, glass walls, heavy bokeh (blur) to isolate subject.
      LIGHTING: "Clinical Beauty" lighting. Soft, large-source white light from the side, creating gentle modeling on the face. Catchlights in eyes.
      VISUAL_STYLE: 8K resolution, Photorealistic, Trustworthy, Sterile, 85mm lens f/1.8.
    `,
    themeColor: 'bg-blue-600'
  },
  {
    id: 'engineer',
    title: 'Engineer',
    icon: 'HardHat',
    description: 'Building the future. Select your field.',
    prompt: '', // Container
    themeColor: 'bg-orange-500',
    subOptions: [
      {
        id: 'civil_engineer',
        title: 'Civil Engineer',
        icon: 'HardHat',
        description: 'Designing skyscrapers and infrastructure.',
        prompt: `
          SUBJECT_ROLE: Lead Civil Engineer / Architect.
          WARDROBE: High-visibility neon safety vest (weathered matte texture, not plastic) over a plaid flannel work shirt. Wearing a white hard hat securely on head.
          ENVIRONMENT: Infrastructure construction site at golden hour. Steel girders, cranes, and atmospheric dust haze in distance.
          LIGHTING: "Golden Hour". Warm sunlight from the side. Rim light on subject. High contrast shadows.
          VISUAL_STYLE: Cinematic, Heroic, Industrial, 35mm lens f/4, High Contrast.
        `,
        themeColor: 'bg-orange-600'
      },
      {
        id: 'mechanical_engineer',
        title: 'Mechanical Engineer',
        icon: 'Wrench',
        description: 'Master of machines and mechanics.',
        prompt: `
          SUBJECT_ROLE: Industrial Mechanical Engineer.
          WARDROBE: Heavy-duty navy blue cotton coveralls with realistic grease smudges and wear patterns. No handheld tools to prevent artifacts.
          ENVIRONMENT: Massive factory interior. Turbine hall, complex pipes, steam, and gears in background.
          LIGHTING: "Moody Industrial". Cool blue ambient light mixed with warm tungsten task lighting on face. Volumetric fog.
          VISUAL_STYLE: Gritty, Detailed, Textured, 50mm lens f/1.8.
        `,
        themeColor: 'bg-slate-600'
      },
      {
        id: 'software_engineer',
        title: 'Software Engineer',
        icon: 'Code',
        description: 'Architecting the digital world.',
        prompt: `
          SUBJECT_ROLE: Senior Full-Stack Architect.
          WARDROBE: "Silicon Valley" aesthetic. High-quality heather grey hoodie or flannel shirt. No glasses (unless user wears them).
          ENVIRONMENT: Dark, high-tech server room. Racks of servers with blinking blue/green LEDs in background (out of focus).
          LIGHTING: "Cyberpunk Glow". Cool blue monitor light reflecting on the face from the front.
          VISUAL_STYLE: Sharp focus on eyes, Digital Crispness, 85mm lens f/1.4 (Creamy Bokeh).
        `,
        themeColor: 'bg-indigo-600'
      },
      {
        id: 'electrical_engineer',
        title: 'Electrical Engineer',
        icon: 'Zap',
        description: 'Powering the world with innovation.',
        prompt: `
          SUBJECT_ROLE: High-Voltage Electrical Engineer.
          WARDROBE: Flame-resistant (FR) work shirt with safety patches. Hands at side (no gloves visible).
          ENVIRONMENT: Electrical substation. Copper coils, transformers, and high-voltage ceramic insulators in background.
          LIGHTING: "High Voltage". Dramatic, high-contrast lighting. Electric sparks or blue arc-flash glow in distance.
          VISUAL_STYLE: Energetic, Dangerous, 50mm lens, Sharp.
        `,
        themeColor: 'bg-yellow-500'
      },
      {
        id: 'chemical_engineer',
        title: 'Chemical Engineer',
        icon: 'FlaskConical',
        description: 'Creating solutions at a molecular level.',
        prompt: `
          SUBJECT_ROLE: Research Chemist.
          WARDROBE: Pristine white lab coat, safety goggles pushed up on forehead (not over eyes). Blue nitrile gloves.
          ENVIRONMENT: Wet lab. Background filled with blurred distillation columns and colorful chemical solutions.
          LIGHTING: "Scientific Clean". Bright, diffuse white fluorescent lighting. Reflections on glass in background.
          VISUAL_STYLE: Macro-style portrait, Clean, Precise, 100mm lens f/2.8.
        `,
        themeColor: 'bg-teal-500'
      }
    ]
  },
  {
    id: 'new_age',
    title: 'Gen Z & Tech',
    icon: 'Gamepad2',
    description: 'New age careers for the digital generation.',
    prompt: '',
    themeColor: 'bg-purple-500',
    subOptions: [
      {
        id: 'pro_gamer',
        title: 'Esports Gamer',
        icon: 'Gamepad2',
        description: 'Conquering virtual worlds professionally.',
        prompt: `
          SUBJECT_ROLE: Professional Esports Athlete.
          WARDROBE: Premium team jersey (synthetic sports fabric) with geometric patterns. Over-ear RGB gaming headset around neck.
          ENVIRONMENT: Esports tournament arena stage. Dark background, intense neon purple and blue laser lights, atmospheric smoke.
          LIGHTING: "Stage Lighting". Strong purple/blue backlight outlining the silhouette. CRITICAL: Keep face lighting neutral/white to preserve skin tone accuracy.
          VISUAL_STYLE: Vibrant, High Energy, 85mm lens f/1.8, ISO 800 grain.
        `,
        themeColor: 'bg-purple-600'
      },
      {
        id: 'content_creator',
        title: 'Content Creator',
        icon: 'Video',
        description: 'Influencing the world through media.',
        prompt: `
          SUBJECT_ROLE: Social Media Influencer.
          WARDROBE: Trendy streetwear layer. Stylish jacket. Modern fashion.
          ENVIRONMENT: Curated studio room. Acoustic foam panels, neon sign (Pink/Cyan) in background.
          LIGHTING: "Ring Light". Soft, flattering illumination on face. Ensure skin texture remains visible (pores, not plastic).
          VISUAL_STYLE: Pop colors, Shallow Depth of Field, 50mm lens f/2.0.
        `,
        themeColor: 'bg-pink-500'
      },
      {
        id: 'ai_architect',
        title: 'AI Architect',
        icon: 'Bot',
        description: 'Building the mind of the future.',
        prompt: `
          SUBJECT_ROLE: AI Architect / Futurist.
          WARDROBE: Minimalist futuristic fashion. Sleek black turtleneck or metallic sheen jacket.
          ENVIRONMENT: Abstract data visualization background. Floating holographic nodes and data streams (ensure they do not cover the face).
          LIGHTING: "Sci-Fi". Cool cyan and white glow.
          VISUAL_STYLE: Ultra-sharp, Digital Art Hybrid, Clean.
        `,
        themeColor: 'bg-cyan-600'
      },
      {
        id: 'digital_artist',
        title: 'Digital Artist',
        icon: 'Palette',
        description: 'Creating art for the metaverse.',
        prompt: `
          SUBJECT_ROLE: VR Digital Artist.
          WARDROBE: Artistic, expressive clothing with abstract patterns.
          ENVIRONMENT: Creative studio. Digital tablets, VR headsets, floating digital canvases in background.
          LIGHTING: Warm cozy ambient light mixed with cool screen glow.
          VISUAL_STYLE: Dreamy, Soft Focus background, Imaginative. No glitch effects on the face.
        `,
        themeColor: 'bg-fuchsia-500'
      }
    ]
  },
  {
    id: 'scientist',
    title: 'Scientist',
    icon: 'Microscope',
    description: 'Discovering the unknown boundaries.',
    prompt: '', // Container
    themeColor: 'bg-indigo-600',
    subOptions: [
      {
        id: 'isro_scientist',
        title: 'ISRO Scientist',
        icon: 'Rocket',
        description: 'Taking India to the stars.',
        prompt: `
          SUBJECT_ROLE: Senior Space Scientist.
          WARDROBE: Formal white shirt/coat with a generic space agency patch (rocket insignia). ID card lanyard.
          ENVIRONMENT: Launch pad at Satish Dhawan Space Centre. Massive GSLV rocket standing vertically in distance.
          LIGHTING: "Bright Daylight". Harsh realistic sun. Clear blue sky.
          VISUAL_STYLE: Patriotic, Inspirational, High Resolution, 35mm lens f/8.
        `,
        themeColor: 'bg-blue-700'
      },
      {
        id: 'robotics_scientist',
        title: 'Robotics Scientist',
        icon: 'Cpu',
        description: 'Building intelligent machines.',
        prompt: `
          SUBJECT_ROLE: Robotics Engineer.
          WARDROBE: Smart-casual lab wear. No facial accessories.
          ENVIRONMENT: Advanced robotics lab. Humanoid robot parts, servos, wires in blurred background.
          LIGHTING: "Lab Tech". Clean, cold (6000K) lighting. Metallic reflections.
          VISUAL_STYLE: Innovative, Sharp, Tech-focused, 85mm lens.
        `,
        themeColor: 'bg-violet-600'
      },
      {
        id: 'bio_scientist',
        title: 'Bio-Medical Scientist',
        icon: 'FlaskConical',
        description: 'Curing diseases, advancing life.',
        prompt: `
          SUBJECT_ROLE: Geneticist.
          WARDROBE: High-tech bio-safety suit (face fully visible, no mask) or premium lab coat.
          ENVIRONMENT: DNA sequencing center. Double-helix holographic displays, sterile glass.
          LIGHTING: "Sterile Blue". Sci-Fi medical aesthetic.
          VISUAL_STYLE: Clean, Futuristic, Macro details.
        `,
        themeColor: 'bg-emerald-600'
      }
    ]
  },
  {
    id: 'uniform_services',
    title: 'Police & Defence',
    icon: 'Shield',
    description: 'Serving the nation with pride.',
    prompt: '', // Container
    themeColor: 'bg-emerald-800',
    subOptions: [
      {
        id: 'ips_officer',
        title: 'IPS Officer',
        icon: 'Award',
        description: 'Indian Police Service.',
        prompt: `
          SUBJECT_ROLE: IPS Officer.
          WARDROBE: Immaculate Khaki uniform, starched. Detailed shoulder epaulets with rank insignia. Leather cross belt.
          ENVIRONMENT: Government building exterior. Indian Tricolor flag fluttering in background.
          LIGHTING: "Natural Authority". Bright daylight. Dignified posture.
          VISUAL_STYLE: Portrait Photography, Respectful, Realistic Fabric Texture.
        `,
        themeColor: 'bg-yellow-700'
      },
      {
        id: 'army_officer',
        title: 'Indian Army',
        icon: 'Target',
        description: 'Defending the borders.',
        prompt: `
          SUBJECT_ROLE: Indian Army Officer.
          WARDROBE: Digital camouflage combat uniform (rugged texture). Tactical vest. Beret.
          ENVIRONMENT: Mountain border outpost. Rocks, snow, sandbags.
          LIGHTING: "War Movie". Harsh dramatic outdoor sun. High contrast.
          VISUAL_STYLE: Gritty, Intense, 50mm lens, Realistic.
        `,
        themeColor: 'bg-green-800'
      },
      {
        id: 'pilot',
        title: 'Air Force Pilot',
        icon: 'Plane',
        description: 'Ruling the skies.',
        prompt: `
          SUBJECT_ROLE: Fighter Pilot.
          WARDROBE: Olive green G-suit (flight suit), patches, harness straps. No helmet in hands.
          ENVIRONMENT: Airbase tarmac. Fighter jet (Rafale) parked in background. Heat haze rising from ground.
          LIGHTING: "Sunset Silhouette". Low sun, warm rim light. Golden hour.
          VISUAL_STYLE: Cinematic, "Top Gun" aesthetic, Anamorphic lens flare.
        `,
        themeColor: 'bg-sky-700'
      }
    ]
  },
  {
    id: 'ias',
    title: 'IAS Officer',
    icon: 'Briefcase',
    description: 'Leading the nation with integrity.',
    prompt: `
      SUBJECT_ROLE: District Collector / IAS Officer.
      WARDROBE: Formal Jodhpuri Bandhgala suit (Navy/Black) or elegant saree. Tailored fit.
      ENVIRONMENT: Classic government office. Wood paneling, leather chair, Indian Tricolor flag in background, mahogany desk.
      LIGHTING: "Executive". Warm indoor ambient light. Dignified.
      VISUAL_STYLE: Low Key, Powerful, 85mm lens f/2.0.
    `,
    themeColor: 'bg-yellow-600'
  },
  {
    id: 'ca',
    title: 'Chartered Accountant',
    icon: 'TrendingUp',
    description: 'Master of finance and economy.',
    prompt: `
      SUBJECT_ROLE: Financial Executive.
      WARDROBE: Bespoke navy blue business suit. Crisp white shirt. Silk tie.
      ENVIRONMENT: Corner office, glass skyscraper. City skyline view.
      LIGHTING: "Corporate". Cool daylight window light mixed with warm interior.
      VISUAL_STYLE: Sharp, Wealthy, Professional.
    `,
    themeColor: 'bg-slate-800'
  },
  {
    id: 'lawyer',
    title: 'Lawyer',
    icon: 'Gavel',
    description: 'Defending justice in the courtroom.',
    prompt: `
      SUBJECT_ROLE: Senior Advocate.
      WARDROBE: Traditional black advocate's gown/coat with white neckband.
      ENVIRONMENT: Courtroom or law library. Rows of books, wooden furniture.
      LIGHTING: "Dramatic Justice". Spotlit feel, serious.
      VISUAL_STYLE: Authoritative, 85mm lens f/1.8.
    `,
    themeColor: 'bg-slate-700'
  },
  {
    id: 'custom',
    title: 'Custom Dream',
    icon: 'Wand2',
    description: 'Imagine anything. You describe it.',
    prompt: '', // Populated by user input
    themeColor: 'bg-pink-600'
  }
];

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.ATTRACT);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  // State for Navigation within Dreams (Nested Menus)
  const [selectedCareer, setSelectedCareer] = useState<CareerOption | null>(null);
  const [activeCategory, setActiveCategory] = useState<CareerOption | null>(null);
  
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [leadPhone, setLeadPhone] = useState<string>('');
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessingComplete, setIsProcessingComplete] = useState<boolean>(false);

  // --- Handlers ---

  const handleStart = () => setAppState(AppState.CAPTURE);

  const handleCapture = (image: string) => {
    setCapturedImage(image);
    setAppState(AppState.SELECT_DREAM);
  };

  const handleSelectCareer = (career: CareerOption) => {
    if (career.subOptions && career.subOptions.length > 0) {
      // Enter the sub-menu (e.g., Engineering types)
      setActiveCategory(career);
    } else {
      // It's a leaf node selection
      setSelectedCareer(career);
      if (career.id !== 'custom') {
        startProcessing(career.prompt);
      }
    }
  };

  const handleBack = () => {
    if (activeCategory) {
      // Go back up one level to main menu
      setActiveCategory(null);
    } else {
      // Go back to Capture screen
      setAppState(AppState.CAPTURE);
    }
  };

  const handleCustomSubmit = () => {
    if (selectedCareer && customPrompt) {
      startProcessing(customPrompt);
    }
  };

  const startProcessing = async (prompt: string) => {
    if (!capturedImage) return;
    
    setAppState(AppState.PROCESSING);
    setIsProcessingComplete(false);
    setError(null);

    try {
      const generatedImage = await transformUserImage(capturedImage, prompt);
      setResultImage(generatedImage);
      
      // Visual confirmation that processing is done
      setIsProcessingComplete(true);

      // Brief delay to let the user see the success state before showing result
      setTimeout(() => {
        setAppState(AppState.RESULT);
        setIsProcessingComplete(false); // Reset for next time
      }, 1500);

    } catch (err) {
      console.error(err);
      setError("Failed to generate your future self. Please try again.");
      setAppState(AppState.SELECT_DREAM);
    }
  };

  const handleTryAnother = () => {
    // Reset selection and result, but KEEP capturedImage and leadPhone
    setResultImage(null);
    setSelectedCareer(null);
    setActiveCategory(null);
    setCustomPrompt('');
    setLeadSubmitted(false); // Reset this so they can send again if they want
    setAppState(AppState.SELECT_DREAM);
  };

  const handleReset = () => {
    setCapturedImage(null);
    setResultImage(null);
    setSelectedCareer(null);
    setActiveCategory(null); // Reset navigation
    setCustomPrompt('');
    setLeadPhone('');
    setLeadSubmitted(false);
    setAppState(AppState.ATTRACT);
  };

  const handleDownloadImage = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = `Skylar-Dream-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadPhone.trim()) return;
    
    // In a real app, send to CRM
    console.log("Lead Captured:", leadPhone);
    setLeadSubmitted(true);
  };

  // --- Render Helpers ---

  const renderIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Stethoscope': return <Stethoscope className={className} />;
      case 'HardHat': return <HardHat className={className} />;
      case 'Gavel': return <Gavel className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      case 'Wand2': return <Wand2 className={className} />;
      case 'Code': return <Code className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'FlaskConical': return <FlaskConical className={className} />;
      case 'Rocket': return <Rocket className={className} />;
      case 'Microscope': return <Microscope className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'Plane': return <Plane className={className} />;
      case 'TrendingUp': return <TrendingUp className={className} />;
      case 'Award': return <Award className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Target': return <Target className={className} />;
      case 'Wrench': return <Wrench className={className} />;
      case 'Gamepad2': return <Gamepad2 className={className} />;
      case 'Video': return <Video className={className} />;
      case 'Bot': return <Bot className={className} />;
      case 'Palette': return <Palette className={className} />;
      default: return <GraduationCap className={className} />;
    }
  };

  // --- Main Render ---

  return (
    <div className="w-full min-h-dvh bg-[#0A192F] text-white overflow-x-hidden font-sans pb-safe">
      {appState === AppState.ATTRACT && <AttractScreen onStart={handleStart} />}
      
      {appState === AppState.CAPTURE && (
        <CameraCapture 
          onCapture={handleCapture} 
          onBack={() => setAppState(AppState.ATTRACT)} 
        />
      )}

      {appState === AppState.SELECT_DREAM && (
        <div className="w-full min-h-dvh flex flex-col p-4 md:p-8 pt-safe">
          <div className="flex items-center mb-6 sticky top-0 top-safe z-20 bg-[#0A192F]/95 backdrop-blur-md py-4 -mx-4 px-4 shadow-sm border-b border-white/5">
            <button onClick={handleBack} className="p-2 rounded-full hover:bg-white/10 transition-colors touch-manipulation">
              <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <h2 className="text-xl md:text-3xl font-bold ml-3 font-heading text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white truncate">
              {activeCategory ? activeCategory.title : "Skylar Dreams"}
            </h2>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-xl mb-6 text-sm md:text-base animate-pulse">
              {error}
            </div>
          )}

          {selectedCareer?.id === 'custom' ? (
             <div className="flex-1 flex flex-col items-center justify-start max-w-2xl mx-auto w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 mt-2">
               <h3 className="text-lg md:text-2xl font-bold text-cyan-400 text-center">Describe your dream job</h3>
               <textarea 
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g. A chef in a high-end futuristic kitchen..."
                  className="w-full h-40 bg-slate-800 border border-slate-600 rounded-xl p-4 text-white focus:ring-2 focus:ring-cyan-500 outline-none resize-none text-base md:text-lg shadow-inner appearance-none"
                  style={{ fontSize: '16px' }} // Prevents iOS zoom
               />
               <div className="flex w-full gap-4 mt-auto md:mt-0">
                  <button onClick={() => setSelectedCareer(null)} className="flex-1 py-4 bg-slate-700 hover:bg-slate-600 font-bold rounded-xl transition-colors active:scale-95 touch-manipulation">
                    Back
                  </button>
                  <button 
                    onClick={handleCustomSubmit}
                    disabled={!customPrompt.trim()}
                    className="flex-[2] py-4 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-[#0A192F] font-bold text-lg md:text-xl rounded-xl transition-all shadow-[0_0_20px_rgba(100,255,218,0.3)] active:scale-95 touch-manipulation"
                  >
                    GENERATE
                  </button>
               </div>
             </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 pb-20 animate-in fade-in zoom-in duration-300">
              {/* If activeCategory is set, show subOptions, else show main list */}
              {(activeCategory?.subOptions || CAREER_OPTIONS).map((career) => (
                <button
                  key={career.id}
                  onClick={() => handleSelectCareer(career)}
                  className={`relative group h-[180px] md:h-[300px] rounded-2xl md:rounded-3xl overflow-hidden glass-panel hover:neon-glow transition-all duration-300 text-left p-4 md:p-6 flex flex-col justify-between border-2 border-transparent hover:border-cyan-400/50 active:scale-[0.98] touch-manipulation`}
                >
                  <div className={`absolute top-0 right-0 p-16 md:p-32 bg-gradient-to-br ${career.themeColor} to-transparent opacity-20 rounded-bl-full transform translate-x-4 -translate-y-4 md:translate-x-10 md:-translate-y-10 group-hover:scale-110 transition-transform`}></div>
                  
                  <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center bg-white/10 backdrop-blur-md mb-2`}>
                    {renderIcon(career.icon, "w-5 h-5 md:w-8 md:h-8 text-white")}
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-sm md:text-2xl font-bold mb-1 md:mb-2 font-heading leading-tight">{career.title}</h3>
                    <p className="text-[10px] md:text-sm text-slate-300 opacity-80 line-clamp-2 md:line-clamp-3">{career.description}</p>
                  </div>

                  <div className="hidden md:flex w-full py-3 mt-2 rounded-xl bg-white/5 group-hover:bg-cyan-500 group-hover:text-[#0A192F] items-center justify-center font-bold transition-colors">
                    {career.subOptions ? 'EXPLORE' : 'SELECT'}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {appState === AppState.PROCESSING && <ProcessingView isComplete={isProcessingComplete} />}

      {appState === AppState.RESULT && resultImage && (
        <div className="w-full min-h-dvh flex flex-col lg:flex-row bg-[#0A192F] pt-safe pb-safe">
          {/* Result Image Area */}
          <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-black/30 relative min-h-[50vh] lg:h-auto">
             <div className="relative max-w-[600px] w-full shadow-2xl rounded-sm border-[4px] md:border-[10px] border-white bg-white transform md:rotate-1 hover:rotate-0 transition-transform duration-500">
                <img src={resultImage} alt="Future Self" className="w-full h-auto block" />
                
                {/* Branding Overlay on Image */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 md:p-6 pt-12">
                   <div className="flex justify-between items-end">
                      <div>
                        <p className="text-cyan-400 font-bold uppercase tracking-widest text-[10px] md:text-sm shadow-black drop-shadow-md">Future {selectedCareer?.title}</p>
                        <p className="text-white text-[8px] md:text-xs opacity-90 shadow-black drop-shadow-md">Generated by Skylar Team</p>
                      </div>
                      <div className="w-6 h-6 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20">
                        <Sparkles className="w-3 h-3 md:w-6 md:h-6 text-yellow-400" />
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Sidebar / Actions */}
          <div className="w-full lg:w-[400px] bg-white text-[#0A192F] p-5 md:p-8 flex flex-col justify-center space-y-4 md:space-y-8 shadow-2xl z-10 rounded-t-3xl lg:rounded-none lg:h-auto overflow-y-auto">
             <div className="text-center lg:text-left pt-2">
               <h2 className="text-2xl md:text-4xl font-black font-heading mb-1 md:mb-2">IT'S A MATCH!</h2>
               <p className="text-slate-600 text-xs md:text-base">Your future looks bright. Capture this moment.</p>
             </div>

             <div className="space-y-3 md:space-y-4">
               <button 
                  onClick={handleDownloadImage}
                  className="w-full py-3 md:py-4 bg-cyan-600 text-white rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-200 transform active:scale-95 duration-200 touch-manipulation"
               >
                 <Download className="w-5 h-5 md:w-6 md:h-6" />
                 <span className="text-sm md:text-lg">DOWNLOAD IMAGE</span>
               </button>

               <div className="p-3 md:p-4 bg-slate-100 rounded-xl border border-slate-200">
                 <h4 className="font-bold mb-2 flex items-center text-xs md:text-sm">
                   <Share2 className="w-4 h-4 mr-2" />
                   Get via WhatsApp / Email
                 </h4>
                 
                 {leadSubmitted ? (
                    <div className="flex items-center justify-center space-x-2 py-3 text-green-600 bg-green-50 rounded-lg border border-green-100 animate-in fade-in zoom-in duration-300">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-bold text-sm">Sent successfully!</span>
                    </div>
                 ) : (
                    <form onSubmit={handleLeadSubmit} className="flex space-x-2">
                        <input 
                            type="tel" 
                            placeholder="Mobile Number" 
                            className="flex-1 px-3 py-2 md:px-4 md:py-3 rounded-lg border border-slate-300 focus:border-cyan-500 outline-none text-sm appearance-none"
                            style={{ fontSize: '16px' }}
                            value={leadPhone}
                            onChange={(e) => setLeadPhone(e.target.value)}
                        />
                        <button type="submit" className="bg-slate-800 text-white px-3 md:px-4 rounded-lg font-bold hover:bg-slate-700 text-xs md:text-sm active:scale-95 transition-transform touch-manipulation">
                            SEND
                        </button>
                    </form>
                 )}
               </div>

               <button 
                  onClick={handleTryAnother}
                  className="w-full py-3 border-2 border-cyan-100 bg-cyan-50 text-cyan-700 rounded-xl font-bold hover:bg-cyan-100 transition-colors flex items-center justify-center space-x-2 text-sm md:text-base active:scale-95 touch-manipulation"
               >
                 <LayoutGrid className="w-5 h-5" />
                 <span>TRY ANOTHER DREAM</span>
               </button>

               <button 
                  onClick={handleReset}
                  className="w-full py-3 border-2 border-slate-200 text-slate-500 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center space-x-2 text-sm md:text-base active:scale-95 touch-manipulation"
               >
                 <RefreshCcw className="w-5 h-5" />
                 <span>START OVER</span>
               </button>
             </div>
             
             <div className="text-center text-[10px] text-slate-400 font-medium pt-2 pb-6 md:pb-0">
               Generated by Skylar Team
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;