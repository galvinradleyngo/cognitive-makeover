import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  AlertTriangle, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Save, 
  Music, 
  Play, 
  FileText, 
  BarChart2, 
  Activity, 
  Zap,
  Info,
  HelpCircle,
  Presentation,
  Map as MapIcon,
  Volume2,
  X,
  BookOpen,
  Printer,
  Download
} from 'lucide-react';

// --- DATA: MAYER's PRINCIPLES ---
const mayerPrinciples = [
  { id: 'coherence', name: 'Coherence', desc: 'Remove extraneous words, sounds, and graphics.' },
  { id: 'signaling', name: 'Signaling', desc: 'Add cues that highlight the organization of essential material.' },
  { id: 'redundancy', name: 'Redundancy', desc: 'Don\'t use both on-screen text and audio narration for the same words.' },
  { id: 'spatial', name: 'Spatial Contiguity', desc: 'Place corresponding words and pictures near each other.' },
  { id: 'temporal', name: 'Temporal Contiguity', desc: 'Present corresponding words and pictures simultaneously.' },
  { id: 'segmenting', name: 'Segmenting', desc: 'Present lessons in learner-paced segments.' },
  { id: 'pretraining', name: 'Pre-training', desc: 'Teach names and characteristics of core concepts first.' },
  { id: 'modality', name: 'Modality', desc: 'Use spoken words rather than on-screen text for graphics.' },
  { id: 'personalization', name: 'Personalization', desc: 'Use conversational rather than formal style.' }
];

// --- DATA: SCENARIOS (Neutralized Contexts) ---
const scenarios = [
  {
    id: 1,
    title: "Pre-K: The Alphabet App",
    level: "Early Elementary",
    description: "An interactive app designed to teach the letter 'B'. It includes audio, animations, and text elements to engage young users during their alphabet lesson.",
    targetAudience: "Ages 4-6, Pre-readers",
    artifactType: "Tablet App",
  },
  {
    id: 2,
    title: "Middle School: Volume Formula",
    level: "Upper Elementary / Middle",
    description: "An 8-minute video tutorial covering the calculation for the volume of a cylinder, featuring an instructor working through the math problem on a digital whiteboard.",
    targetAudience: "Ages 11-13, Novice Math Students",
    artifactType: "Video Tutorial",
  },
  {
    id: 3,
    title: "High School: Photosynthesis",
    level: "High School Biology",
    description: "A presentation slide detailing the process of photosynthesis. It includes a diagram of a chloroplast alongside a detailed written explanation.",
    targetAudience: "Ages 15-18, AP Biology Students",
    artifactType: "Presentation Slide",
  },
  {
    id: 4,
    title: "Higher Ed: History Lecture",
    level: "Undergraduate / Graduate",
    description: "A university-level history module about the Battle of Gettysburg. The instructional content is distributed across three consecutive slides that the student must navigate through.",
    targetAudience: "University History Students",
    artifactType: "eLearning Module",
  },
  {
    id: 5,
    title: "Corporate: Leadership Training",
    level: "Adult Professional",
    description: "A mandatory professional development module on 'Synergizing Paradigms'. It uses standard presentation software with bulleted lists and illustrative clipart.",
    targetAudience: "Mid-level Managers",
    artifactType: "eLearning Module",
  }
];

// --- ARTIFACT MOCKUPS ---

const useSpeech = (text, options = {}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = React.useRef(null);
  const intervalRef = React.useRef(null);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const toggle = () => {
    if (!window.speechSynthesis) return;
    
    if (isPlaying) {
      window.speechSynthesis.cancel();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    
    // Play optional background music using Web Audio API
    if (options.withMusic) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        gain.gain.value = 0.05; // Keep it somewhat quiet but distracting
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        
        // Play a fast, repetitive nursery-rhyme style arpeggio
        const notes = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63]; 
        let step = 0;
        
        intervalRef.current = setInterval(() => {
           if (ctx.state === 'running') {
             osc.frequency.setValueAtTime(notes[step % notes.length], ctx.currentTime);
             step++;
           }
        }, 200);
      }
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (options.rate) utterance.rate = options.rate;
    if (options.pitch) utterance.pitch = options.pitch;
    
    const cleanupAudio = () => {
      setIsPlaying(false);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    utterance.onend = cleanupAudio;
    utterance.onerror = cleanupAudio;
    
    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return { isPlaying, toggle };
};

const Mockup1_PreK = () => {
  const { isPlaying, toggle } = useSpeech("B is for Bear! Can you say Bear? Look at the blue ball in the corner!", { pitch: 1.4, rate: 0.9, withMusic: true });

  return (
    <div className="relative w-full h-[400px] bg-yellow-300 overflow-hidden border-4 border-slate-800 rounded-3xl flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 left-4 animate-bounce"><Music size={32} className="text-pink-500" /></div>
      <div className="absolute bottom-10 right-10 animate-pulse"><Zap size={48} className="text-orange-500" /></div>
      <div className="absolute top-20 right-20 animate-spin-slow"><div className="w-16 h-16 bg-blue-400 rounded-full opacity-50"></div></div>
      
      <div className="text-8xl font-black text-white drop-shadow-[0_5px_5px_rgba(255,0,0,0.8)] animate-pulse mb-8">
        Bb
      </div>
      
      <div className="bg-white/90 p-4 rounded-xl text-center shadow-lg transform rotate-2">
        <h2 className="text-2xl font-black text-red-600 mb-2">B IS FOR BEAR!</h2>
        <p className="text-lg font-bold text-blue-600">CAN YOU SAY BEAR?</p>
        <p className="text-sm font-bold text-green-600 mt-2">LOOK AT THE BLUE BALL IN THE CORNER!</p>
      </div>
      
      <button 
        onClick={toggle}
        className={`absolute bottom-4 left-4 ${isPlaying ? 'bg-red-500' : 'bg-black'} text-white text-xs px-3 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform z-50`}
      >
        {isPlaying ? <span className="animate-pulse">🔊 Playing Narration... (Click to Stop)</span> : "▶️ Play Narration"}
      </button>
    </div>
  );
};

const Mockup2_Math = () => {
  const { isPlaying, toggle } = useSpeech("To calculate the volume of a cylinder, we use V equals pi R squared H. So 3 point 1 4 times 5 squared... wait, what was the height? Oh, H is 12. So 78 point 5 times 12 equals 942.", { rate: 1.1 });

  return (
    <div className="relative w-full h-[400px] bg-slate-900 rounded-xl overflow-hidden flex flex-col">
      <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
        <div className="text-xl font-mono text-green-400 border border-green-400 px-4 py-2 rounded bg-black">
          V = π r² h
        </div>
        <div className="text-slate-400 text-sm">Time: 4:12 / 8:00 (No chapters)</div>
      </div>
      
      <div className="flex-grow p-6 relative">
        <div className="absolute top-1/4 left-1/4 transform -rotate-12 text-red-400 font-mono text-lg opacity-80">
          3.14 * 5 * 5 = 78.5
        </div>
        <div className="absolute top-1/2 right-1/4 transform rotate-6 text-blue-400 font-mono text-lg opacity-80">
          h = 10... wait, h = 12
        </div>
        <div className="absolute bottom-1/4 left-1/3 transform -rotate-6 text-yellow-400 font-mono text-2xl opacity-80">
          78.5 * 12 = 942
        </div>
        
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M10,90 Q30,50 50,90 T90,90" fill="none" stroke="white" strokeWidth="1" />
          <path d="M20,80 Q40,60 80,70" fill="none" stroke="red" strokeWidth="0.5" />
        </svg>
      </div>

      <div 
        className="bg-slate-800 p-3 flex items-center gap-4 cursor-pointer hover:bg-slate-700 transition-colors" 
        onClick={toggle}
      >
        {isPlaying ? <Activity className="text-red-500 animate-pulse" size={20} /> : <Play className="text-white fill-white" size={20} />}
        <div className="h-2 flex-grow bg-slate-600 rounded-full overflow-hidden">
          <div className={`h-full bg-red-500 ${isPlaying ? 'w-full transition-all duration-[10000ms] ease-linear' : 'w-0'}`}></div>
        </div>
      </div>
    </div>
  );
};

const Mockup3_Biology = () => {
  const { isPlaying, toggle } = useSpeech("Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy that, through cellular respiration, can later be released to fuel the organism's activities.", { rate: 0.9 });

  return (
    <div className="relative w-full h-[400px] bg-white border border-slate-300 rounded-xl overflow-hidden flex shadow-inner">
      <div className="w-1/2 p-4 border-r border-slate-200 flex flex-col items-center justify-center relative bg-slate-50">
        <div className="w-48 h-48 bg-green-200 rounded-full border-4 border-green-600 relative">
          <div className="absolute top-10 left-10 w-10 h-10 bg-green-500 rounded-full"></div>
          <div className="absolute top-8 left-6 bg-white border border-black px-1 font-bold text-xs">A</div>
          
          <div className="absolute bottom-12 right-12 w-16 h-8 bg-green-700 rounded-full"></div>
          <div className="absolute bottom-10 right-8 bg-white border border-black px-1 font-bold text-xs">B</div>
          
          <div className="absolute top-20 right-10 w-8 h-8 bg-green-400 rounded-full"></div>
          <div className="absolute top-16 right-6 bg-white border border-black px-1 font-bold text-xs">C</div>
        </div>
        <div className="mt-4 text-xs text-red-500 italic font-bold">
          *Legend for A, B, and C located on slide 42.
        </div>
      </div>
      
      <div className="w-1/2 p-6 overflow-y-auto">
        <h3 className="font-bold text-lg mb-2 underline flex justify-between items-center">
          Photosynthesis Process
          <button onClick={toggle} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs no-underline flex items-center gap-1 hover:bg-blue-200">
            {isPlaying ? "⏹ Stop Reading" : "▶️ Read Verbatim"}
          </button>
        </h3>
        <p className="text-[10px] leading-tight text-justify text-slate-800">
          Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy that, through cellular respiration, can later be released to fuel the organism's activities. Some of this chemical energy is stored in carbohydrate molecules, such as sugars and starches, which are synthesized from carbon dioxide and water – hence the name photosynthesis, from the Greek phōs (φῶς), "light", and synthesis (σύνθεσις), "putting together". Most plants, algae, and cyanobacteria perform photosynthesis; such organisms are called photoautotrophs. Photosynthesis is largely responsible for producing and maintaining the oxygen content of the Earth's atmosphere, and supplies most of the energy necessary for life on Earth.
          <br/><br/>
          The process always begins when energy from light is absorbed by proteins called reaction centers that contain green chlorophyll pigments. In plants, these proteins are held inside organelles called chloroplasts, which are most abundant in leaf cells, while in bacteria they are embedded in the plasma membrane. In these light-dependent reactions, some energy is used to strip electrons from suitable substances, such as water, producing oxygen gas.
        </p>
      </div>
    </div>
  );
};

const Mockup4_History = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const { isPlaying, toggle } = useSpeech("During Phase 3, Pickett's Charge originated from Seminary Ridge on the west, moving aggressively across the open field toward the center of the Union fishhook line, located just behind the stone wall on Cemetery Ridge.", { rate: 0.95, pitch: 0.9 });

  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, 3));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 1));

  useEffect(() => {
    if (currentSlide !== 3 && isPlaying) toggle();
  }, [currentSlide]);

  return (
    <div className="relative w-full h-[400px] bg-[#fdfbf7] border border-slate-300 rounded-xl overflow-hidden flex flex-col shadow-inner font-serif">
      
      {/* Header - Fixed to top */}
      <div className="bg-slate-800 text-amber-50 p-2 sm:p-3 flex justify-between items-center border-b-4 border-amber-700 shrink-0">
        <h2 className="font-bold text-sm sm:text-lg tracking-wide truncate">HIST 302: The Battle of Gettysburg</h2>
        <div className="text-xs sm:text-sm font-sans bg-slate-700 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap ml-2">Slide {currentSlide} of 3</div>
      </div>

      {/* Content Area - Scrollable if content exceeds bounds */}
      <div className="flex-grow p-4 sm:p-6 flex flex-col items-center justify-start sm:justify-center relative overflow-y-auto">
        
        {/* SLIDE 1: DETAILED MAP */}
        {currentSlide === 1 && (
          <div className="w-full h-full flex flex-col items-center justify-center animate-in fade-in max-w-md mx-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-slate-800 border-b border-slate-300 pb-1 w-full text-center shrink-0">
              Tactical Map: July 1-3, 1863
            </h3>
            
            <div className="relative w-full aspect-[2/1] max-h-[220px] bg-[#e6e2d3] border-4 border-[#c2b897] rounded shadow-md overflow-hidden shrink-0">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
                {/* Topography Lines */}
                <path d="M -50 50 Q 150 100 450 20" fill="none" stroke="#d5ceb6" strokeWidth="2"/>
                <path d="M -50 80 Q 150 130 450 50" fill="none" stroke="#d5ceb6" strokeWidth="2"/>
                <path d="M -50 180 Q 150 150 450 190" fill="none" stroke="#d5ceb6" strokeWidth="2"/>
                
                {/* Union Line (Fishhook shape) */}
                <path d="M 260 180 L 260 80 Q 260 40 290 40 Q 320 40 320 70" fill="none" stroke="#1e3a8a" strokeWidth="6" strokeLinecap="round"/>
                <text x="270" y="140" fontSize="10" fill="#1e3a8a" fontWeight="bold" transform="rotate(-90 270 140)">Cemetery Ridge</text>

                {/* Confederate Line */}
                <path d="M 120 190 L 120 20" fill="none" stroke="#991b1b" strokeWidth="6" strokeLinecap="round"/>
                <text x="110" y="120" fontSize="10" fill="#991b1b" fontWeight="bold" transform="rotate(-90 110 120)">Seminary Ridge</text>

                {/* Phase 1 Arrows */}
                <path d="M 210 190 L 250 150" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#blueArrow)"/>
                
                {/* Phase 2 Arrows */}
                <path d="M 130 170 Q 200 190 250 170" fill="none" stroke="#991b1b" strokeWidth="2" markerEnd="url(#redArrow)"/>
                <path d="M 130 30 Q 200 10 310 30" fill="none" stroke="#991b1b" strokeWidth="2" markerEnd="url(#redArrow)"/>

                {/* Phase 3 Arrow */}
                <path d="M 130 100 L 245 100" fill="none" stroke="#991b1b" strokeWidth="4" markerEnd="url(#redArrowLarge)"/>
                
                {/* Embedded Labels (Ensures they scale properly with the SVG) */}
                <g transform="translate(220, 16)">
                  <rect width="45" height="14" fill="rgba(255,255,255,0.7)" stroke="black" strokeWidth="1"/>
                  <text x="22.5" y="10" fontSize="9" fontWeight="bold" textAnchor="middle" fill="black">PHASE 1</text>
                </g>
                <g transform="translate(180, 175)">
                  <rect width="45" height="14" fill="rgba(255,255,255,0.7)" stroke="black" strokeWidth="1"/>
                  <text x="22.5" y="10" fontSize="9" fontWeight="bold" textAnchor="middle" fill="black">PHASE 2</text>
                </g>
                <g transform="translate(170, 86)">
                  <rect width="48" height="16" fill="rgba(255,255,255,0.9)" stroke="#991b1b" strokeWidth="1"/>
                  <text x="24" y="11" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#991b1b">PHASE 3</text>
                </g>

                <defs>
                  <marker id="blueArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#1e3a8a" />
                  </marker>
                  <marker id="redArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#991b1b" />
                  </marker>
                  <marker id="redArrowLarge" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#991b1b" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        )}

        {/* SLIDE 2: TEXT ONLY */}
        {currentSlide === 2 && (
          <div className="w-full flex flex-col justify-center max-w-lg mx-auto animate-in fade-in my-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-slate-800 border-b pb-2">Phase 1 & 2: Flanking Maneuvers</h3>
            <p className="text-sm text-slate-700 mb-3 leading-relaxed">
              <strong>Phase 1:</strong> The Union forces (blue) established a strong defensive fishhook line along Cemetery Ridge early in the morning, anticipating a frontal assault.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>Phase 2:</strong> General Lee ordered Confederate forces (red) to attack the flanks. The southern forces swept up from the rocky terrain in the south, attempting to turn the Union's left flank, while a secondary force pushed from the northeast.
            </p>
            <div className="mt-4 p-3 bg-amber-100 text-amber-800 text-xs italic rounded border border-amber-200">
              Note: Please refer back to the map on Slide 1 to visualize these movements.
            </div>
          </div>
        )}

        {/* SLIDE 3: AUDIO + DECORATIVE VISUAL */}
        {currentSlide === 3 && (
          <div className="w-full flex flex-col items-center justify-center animate-in fade-in my-auto pb-4">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-slate-800 border-b pb-2 w-full max-w-md text-center">
              Phase 3: The Center Assault
            </h3>
            
            <div className="w-full max-w-md bg-white p-4 sm:p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col">
              
              <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-stretch">
                {/* Decorative Visual */}
                <div className="w-full sm:w-1/3 flex flex-col items-center sm:border-r border-slate-100 sm:pr-4">
                  <div className="w-16 h-20 sm:w-20 sm:h-24 bg-slate-200 rounded-t-full border-2 border-slate-300 overflow-hidden relative mb-2 shadow-inner shrink-0">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-14 sm:w-12 sm:h-16 bg-slate-400 rounded-t-full"></div>
                    <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 w-6 h-8 sm:w-8 sm:h-10 bg-slate-300 rounded-full"></div>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase text-center leading-tight">Gen. George Pickett</span>
                </div>
                
                {/* Bullet Points */}
                <div className="w-full sm:w-2/3 flex flex-col justify-center">
                  <ul className="list-disc pl-5 sm:pl-4 text-sm text-slate-700 space-y-2 font-sans">
                    <li>12,500 infantry men advanced</li>
                    <li>Targeted the "Copse of Trees"</li>
                    <li>Suffered over 50% casualties</li>
                  </ul>
                </div>
              </div>

              {/* Audio Controls */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col items-center w-full">
                <button 
                  onClick={toggle}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold font-sans text-sm flex items-center gap-2 transition-transform w-full justify-center ${isPlaying ? 'bg-indigo-600 text-white shadow-lg scale-[1.02] animate-pulse' : 'bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200'}`}
                >
                  {isPlaying ? "⏹ Stop Lecture Audio" : "▶️ Play Lecture Audio"}
                </button>
                <span className="text-[9px] sm:text-[10px] text-slate-400 mt-2 font-sans text-center">
                  Listen to spatial description of Phase 3
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer - Fixed to bottom */}
      <div className="bg-slate-100 p-2 sm:p-3 flex justify-between items-center border-t border-slate-300 font-sans shrink-0">
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 1}
          className={`px-3 sm:px-4 py-1.5 rounded flex items-center gap-1 text-xs sm:text-sm font-bold transition-colors ${currentSlide === 1 ? 'text-slate-400 cursor-not-allowed' : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-50'}`}
        >
          <ChevronLeft size={16} /> <span className="hidden sm:inline">Previous Slide</span><span className="sm:hidden">Prev</span>
        </button>
        <button 
          onClick={nextSlide}
          disabled={currentSlide === 3}
          className={`px-3 sm:px-4 py-1.5 rounded flex items-center gap-1 text-xs sm:text-sm font-bold transition-colors ${currentSlide === 3 ? 'text-slate-400 cursor-not-allowed' : 'text-white bg-slate-800 hover:bg-slate-700'}`}
        >
          <span className="hidden sm:inline">Next Slide</span><span className="sm:hidden">Next</span> <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const Mockup5_Corporate = () => {
  const { isPlaying, toggle } = useSpeech("Alright team, let's synergize our paradigms today! We really need to leverage our core competencies to robustly architect holistic team alignments. And remember, everyone can be a hero!", { pitch: 1.1, rate: 1.2 });

  return (
    <div className="relative w-full h-[400px] bg-blue-50 border border-slate-300 rounded-xl overflow-hidden flex flex-col p-8 shadow-md">
      <h1 className="text-3xl font-black text-blue-900 text-center mb-6 uppercase tracking-widest border-b-2 border-blue-200 pb-2">
        Synergizing Leadership Paradigms
      </h1>
      
      <div className="flex gap-6 relative">
        <div className="w-3/4">
          <ul className="list-disc pl-6 space-y-4 text-sm font-medium text-slate-800">
            <li>Leverage core competencies to robustly architect holistic team alignments.</li>
            <li>Drive granular cross-functional ideation to disrupt legacy communication silos.</li>
            <li>Incentivize proactive paradigm shifts while boiling the ocean on KPIs.</li>
            <li>Operationalize scalable emotional intelligence vectors.</li>
          </ul>
        </div>
        
        <div className="w-1/4 flex flex-col items-center justify-center">
          <div className="bg-yellow-400 w-24 h-24 rounded-full flex items-center justify-center shadow-lg transform rotate-12 mb-2">
            <Zap size={40} className="text-red-500" />
          </div>
          <div className="bg-white px-2 py-1 text-xs font-bold border-2 border-dashed border-red-500 transform -rotate-6">
            BE A HERO!
          </div>
        </div>
      </div>

      <div 
        onClick={toggle}
        className={`absolute bottom-4 left-4 text-xs px-3 py-1.5 rounded cursor-pointer font-bold flex items-center gap-2 transition-colors ${isPlaying ? 'bg-indigo-600 text-white animate-pulse' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
      >
        {isPlaying ? "🔊 Presenter Speaking..." : "▶️ Play Presenter Audio"}
      </div>

      <div className="absolute bottom-4 right-4 bg-slate-200 text-slate-500 text-xs px-2 py-1 rounded">
        Slide 42 of 108
      </div>
    </div>
  );
};

// --- UI COMPONENTS ---

const ModalOverlay = ({ children, onClose, title, icon: Icon }) => (
  <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
      <div className="flex items-center justify-between p-4 md:p-5 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center gap-3 font-bold text-lg text-slate-800">
          {Icon && <div className="p-2 bg-indigo-100 rounded-lg"><Icon className="text-indigo-600" size={20} /></div>}
          {title}
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
          <X size={20} />
        </button>
      </div>
      <div className="p-6 overflow-y-auto flex-grow">
        {children}
      </div>
    </div>
  </div>
);

const Dashboard = ({ onSelectScenario }) => (
  <div className="max-w-6xl mx-auto p-8 animate-in fade-in duration-500">
    <header className="mb-12 text-center">
      <div className="inline-flex items-center justify-center p-4 bg-indigo-100 rounded-full mb-4">
        <BrainCircuit size={48} className="text-indigo-600" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">The Cognitive Makeover</h1>
      <p className="text-xl text-slate-600 max-w-2xl mx-auto">
        Analyze the cognitive load of flawed multimedia artifacts, apply Mayer's Principles, and design strategic violations for specific learners.
      </p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {scenarios.map((s) => (
        <div 
          key={s.id} 
          onClick={() => onSelectScenario(s)}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col h-full group"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full">
              {s.level}
            </span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Settings size={20} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
          <p className="text-slate-600 text-sm flex-grow mb-6">{s.description}</p>
          <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-medium group-hover:bg-indigo-600 transition-colors">
            Inspect Artifact
          </button>
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN WORKSPACE COMPONENT ---

const ScenarioWorkspace = ({ scenario, onBack }) => {
  const [activeTab, setActiveTab] = useState('diagnosis');
  const [saved, setSaved] = useState(false);
  const [revealedHints, setRevealedHints] = useState([]);

  // Form State
  const [diagnosisText, setDiagnosisText] = useState('');
  const [selectedPrinciples, setSelectedPrinciples] = useState([]);
  const [violationPrinciple, setViolationPrinciple] = useState('');
  const [violationJustification, setViolationJustification] = useState('');

  const togglePrinciple = (id) => {
    setSelectedPrinciples(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleHint = (e, id) => {
    e.stopPropagation();
    setRevealedHints(prev => prev.includes(id) ? prev.filter(h => h !== id) : [...prev, id]);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const renderArtifact = () => {
    switch(scenario.id) {
      case 1: return <Mockup1_PreK />;
      case 2: return <Mockup2_Math />;
      case 3: return <Mockup3_Biology />;
      case 4: return <Mockup4_History />;
      case 5: return <Mockup5_Corporate />;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 animate-in slide-in-from-right duration-300">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-500 hover:text-indigo-600 mb-6 transition-colors"
      >
        <ChevronLeft size={20} className="mr-1" /> Back to Dashboard
      </button>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: THE ARTIFACT */}
        <div className="flex flex-col">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900">{scenario.title}</h2>
            <p className="text-slate-500 flex items-center gap-2 text-sm mt-1">
              <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-bold">{scenario.artifactType}</span>
              Target: {scenario.targetAudience}
            </p>
          </div>
          
          <div className="bg-slate-100 p-2 rounded-2xl shadow-inner mb-4">
            {renderArtifact()}
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3">
            <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-900 leading-relaxed">
              <strong>Context:</strong> {scenario.description}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: THE MAKEOVER TOOLKIT */}
        <div className="flex flex-col h-full bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          
          {/* Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50">
            <button 
              className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 ${activeTab === 'diagnosis' ? 'bg-white text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:bg-slate-100'}`}
              onClick={() => setActiveTab('diagnosis')}
            >
              <Activity size={18} className="hidden sm:block"/> <span className="hidden sm:block">1.</span> Diagnosis
            </button>
            <button 
              className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 ${activeTab === 'treatment' ? 'bg-white text-emerald-600 border-b-2 border-emerald-600' : 'text-slate-500 hover:bg-slate-100'}`}
              onClick={() => setActiveTab('treatment')}
            >
              <FileText size={18} className="hidden sm:block"/> <span className="hidden sm:block">2.</span> Treatment
            </button>
            <button 
              className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 ${activeTab === 'violation' ? 'bg-white text-rose-600 border-b-2 border-rose-600' : 'text-slate-500 hover:bg-slate-100'}`}
              onClick={() => setActiveTab('violation')}
            >
              <Zap size={18} className="hidden sm:block"/> <span className="hidden sm:block">3.</span> Violation
            </button>
            <button 
              className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 ${activeTab === 'summary' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:bg-slate-100'}`}
              onClick={() => setActiveTab('summary')}
            >
              <Presentation size={18} className="hidden sm:block"/> <span className="hidden sm:block">4.</span> Summary
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 flex-grow overflow-y-auto print:p-0">
            
            {/* Step 1: Diagnosis */}
            {activeTab === 'diagnosis' && (
              <div className="animate-in fade-in space-y-4">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Identify Cognitive Overload</h3>
                <p className="text-sm text-slate-600 mb-4">Inspect the artifact. What specific elements are causing high Extraneous Load for this specific learner?</p>
                <textarea 
                  className="w-full h-48 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                  placeholder="The main issue with this design is..."
                  value={diagnosisText}
                  onChange={(e) => setDiagnosisText(e.target.value)}
                ></textarea>
                <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm flex gap-2">
                  <Info size={18} className="flex-shrink-0 mt-0.5" />
                  <p>Remember: <strong>Intrinsic Load</strong> is the natural complexity of the topic. <strong>Extraneous Load</strong> is how badly it's designed. You are trying to fix the latter.</p>
                </div>
              </div>
            )}

            {/* Step 2: Treatment */}
            {activeTab === 'treatment' && (
              <div className="animate-in fade-in space-y-4">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Apply Mayer's Principles</h3>
                <p className="text-sm text-slate-600 mb-4">Select the top 2-3 principles you would use to redesign this artifact to reduce extraneous load. (Click the ? for a hint).</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mayerPrinciples.map(p => (
                    <div 
                      key={p.id}
                      onClick={() => togglePrinciple(p.id)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedPrinciples.includes(p.id) 
                          ? 'border-emerald-500 bg-emerald-50 shadow-md' 
                          : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold text-sm ${selectedPrinciples.includes(p.id) ? 'text-emerald-700' : 'text-slate-700'}`}>
                            {p.name}
                          </span>
                          <HelpCircle 
                            size={14} 
                            className="text-slate-400 hover:text-indigo-500 transition-colors" 
                            onClick={(e) => toggleHint(e, p.id)}
                            title="Click for hint"
                          />
                        </div>
                        {selectedPrinciples.includes(p.id) && <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
                      </div>
                      {revealedHints.includes(p.id) && (
                        <p className="text-xs text-slate-500 mt-2 animate-in fade-in">{p.desc}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Violation */}
            {activeTab === 'violation' && (
              <div className="animate-in fade-in space-y-4">
                <h3 className="text-lg font-bold text-rose-600 mb-2">The Strategic Violation</h3>
                <p className="text-sm text-slate-600 mb-4">Expert designers know when to break the rules. Given this specific audience ({scenario.targetAudience}), which principle will you intentionally violate, and why?</p>
                
                <div className="mb-4">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Select Principle to Violate:</label>
                  <select 
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white"
                    value={violationPrinciple}
                    onChange={(e) => setViolationPrinciple(e.target.value)}
                  >
                    <option value="">-- Choose Principle --</option>
                    {mayerPrinciples.map(p => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Justification (How does this support Germane Load?):</label>
                  <textarea 
                    className="w-full h-32 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 resize-none"
                    placeholder="I am breaking this rule because for this specific learner..."
                    value={violationJustification}
                    onChange={(e) => setViolationJustification(e.target.value)}
                  ></textarea>
                </div>
              </div>
            )}

            {/* Step 4: Summary */}
            {activeTab === 'summary' && (
              <div className="animate-in fade-in space-y-6">
                <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                  <h3 className="text-xl font-bold text-slate-900">Your Makeover Pitch</h3>
                  <button className="text-sm bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md text-slate-700 font-medium transition-colors print:hidden flex items-center gap-2" onClick={() => window.print()}>
                     <Printer size={16} /> Print / PDF
                  </button>
                </div>

                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                  <h4 className="text-xs uppercase font-bold text-indigo-500 mb-1">Target Audience Context</h4>
                  <p className="font-medium text-indigo-900">{scenario.targetAudience}</p>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 font-bold text-slate-800 border-b border-slate-200 pb-2 mb-3">
                    <Activity size={16} className="text-indigo-600"/> 1. The Diagnosis
                  </h4>
                  <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-100 whitespace-pre-wrap">
                    {diagnosisText || <span className="text-slate-400 italic">No diagnosis provided.</span>}
                  </p>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 font-bold text-slate-800 border-b border-slate-200 pb-2 mb-3">
                    <FileText size={16} className="text-emerald-600"/> 2. The Treatment Plan
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPrinciples.length > 0 ? (
                      selectedPrinciples.map(id => {
                        const principle = mayerPrinciples.find(p => p.id === id);
                        return <span key={id} className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-sm font-bold shadow-sm">{principle?.name}</span>;
                      })
                    ) : (
                      <span className="text-slate-400 text-sm italic">No principles selected.</span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 font-bold text-slate-800 border-b border-slate-200 pb-2 mb-3">
                    <Zap size={16} className="text-rose-600"/> 3. The Strategic Violation
                  </h4>
                  <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
                    <p className="text-sm font-bold text-rose-900 mb-2">
                      Violated Principle: {violationPrinciple || <span className="font-normal italic text-rose-500">None selected</span>}
                    </p>
                    <p className="text-sm text-rose-800 italic bg-white/50 p-3 rounded border border-rose-200/50">
                      "{violationJustification || "No justification provided."}"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center print:hidden">
            <span className="text-sm text-slate-500 font-medium">
              {activeTab === 'diagnosis' ? 'Step 1 of 4' : activeTab === 'treatment' ? 'Step 2 of 4' : activeTab === 'violation' ? 'Step 3 of 4' : 'Final Step'}
            </span>
            
            {activeTab !== 'summary' ? (
              <button 
                onClick={() => {
                  if (activeTab === 'diagnosis') setActiveTab('treatment');
                  else if (activeTab === 'treatment') setActiveTab('violation');
                  else if (activeTab === 'violation') setActiveTab('summary');
                }}
                className="px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
              >
                Next Step <ChevronRight size={18} />
              </button>
            ) : (
              <button 
                onClick={handleSave}
                className={`px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
                  saved 
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                }`}
              >
                {saved ? 'Saved!' : 'Save & Present'} <Save size={18} />
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

// --- APP ENTRY POINT ---

export default function App() {
  const [activeScenario, setActiveScenario] = useState(null);
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-200">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm print:hidden">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setActiveScenario(null)}
        >
          <div className="bg-indigo-600 p-1.5 rounded-md text-white">
            <BrainCircuit size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight">EduDesign Lab</span>
        </div>
        <div className="flex gap-4 text-sm font-medium text-slate-500">
          <button 
            onClick={() => setShowTheoryModal(true)}
            className="hover:text-indigo-600 transition-colors flex items-center gap-1"
          >
            <BookOpen size={16} /> Theory Reference
          </button>
          <button 
            onClick={() => setShowExportModal(true)}
            className="hover:text-indigo-600 transition-colors flex items-center gap-1"
          >
            <Download size={16} /> Export Work
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pb-20">
        {!activeScenario ? (
          <Dashboard onSelectScenario={setActiveScenario} />
        ) : (
          <ScenarioWorkspace scenario={activeScenario} onBack={() => setActiveScenario(null)} />
        )}
      </main>

      {/* MODALS */}
      {showTheoryModal && (
        <ModalOverlay title="Mayer's Principles of Multimedia Learning" icon={BookOpen} onClose={() => setShowTheoryModal(false)}>
          <p className="text-slate-600 text-sm mb-6">
            A quick reference guide for diagnosing cognitive overload and designing better instructional materials.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mayerPrinciples.map(p => (
              <div key={p.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all">
                <h4 className="font-bold text-indigo-700 text-base mb-1">{p.name}</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </ModalOverlay>
      )}

      {showExportModal && (
        <ModalOverlay title="Export Your Work" icon={Download} onClose={() => setShowExportModal(false)}>
          <div className="space-y-6 text-center py-4">
            {activeScenario ? (
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                <p className="text-sm text-indigo-800 font-medium mb-1">Currently working on:</p>
                <p className="text-lg font-bold text-indigo-900">{activeScenario.title}</p>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-sm text-slate-600">You are currently on the dashboard. Open a specific scenario workspace to export your Makeover Plan.</p>
              </div>
            )}

            <button 
              onClick={() => {
                setShowExportModal(false);
                setTimeout(() => window.print(), 300); // short delay to allow modal to close before printing
              }}
              className="w-full md:w-auto mx-auto bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <Printer size={20} />
              Print / Save as PDF
            </button>
            <p className="text-xs text-slate-400 mt-4">
              Tip: When the print dialog opens, select "Save as PDF" as your destination to save your work digitally.
            </p>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
}