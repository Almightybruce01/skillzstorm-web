export type GradeLevel = 'K-2' | '3-5' | '6-8' | '9-12';
export type GameCategory = 'StormBattle' | 'StormDash' | 'StormPuzzle' | 'StormQuick' | 'Storm3D' | 'StormVR';

export interface GameInfo {
  id: string;
  name: string;
  description: string;
  category: GameCategory;
  iconEmoji: string;
  supportedGrades: GradeLevel[];
  isAvailable: boolean;
  isFeatured: boolean;
  isPremium: boolean;
}

export const gradeLevels: { value: GradeLevel; label: string; subtitle: string; color: string }[] = [
  { value: 'K-2', label: 'K – 2', subtitle: 'Foundations', color: '#00ff80' },
  { value: '3-5', label: '3 – 5', subtitle: 'Core Skills', color: '#0099ff' },
  { value: '6-8', label: '6 – 8', subtitle: 'Middle School', color: '#9933ff' },
  { value: '9-12', label: '9 – 12', subtitle: 'High School', color: '#ff2626' },
];

export const categories: { value: GameCategory; label: string; subtitle: string; icon: string; colors: string[] }[] = [
  { value: 'StormBattle', label: 'StormBattle', subtitle: 'Integrated Learning Arcade', icon: '🔥', colors: ['#1a66ff', '#6619e6'] },
  { value: 'StormDash', label: 'StormDash', subtitle: 'Dash / Runner + Knowledge Gate', icon: '🐇', colors: ['#00cc66', '#008033'] },
  { value: 'StormPuzzle', label: 'StormPuzzle', subtitle: 'Puzzle & Strategy', icon: '🧩', colors: ['#ffcc00', '#ff8000'] },
  { value: 'StormQuick', label: 'StormQuick', subtitle: 'Quick Play Mini Games', icon: '⚡', colors: ['#ff3366', '#cc1980'] },
  { value: 'Storm3D', label: 'Storm3D', subtitle: '3D Immersive Games', icon: '🎮', colors: ['#8000ff', '#cc00cc'] },
  { value: 'StormVR', label: 'StormVR', subtitle: 'VR Experience', icon: '🥽', colors: ['#00cccc', '#0066cc'] },
];

export const allGames: GameInfo[] = [
  // StormBattle
  { id: 'astromath_wars', name: 'AstroMath Wars', description: 'Space shooter — destroy asteroids containing wrong answers. Boss fights are word problems.', category: 'StormBattle', iconEmoji: '🚀', supportedGrades: ['K-2','3-5','6-8','9-12'], isAvailable: true, isFeatured: true, isPremium: false },
  { id: 'multiplication_meteors', name: 'Multiplication Meteors', description: 'Meteors rain down with multiplication problems. Shoot the correct answer before they hit your base.', category: 'StormBattle', iconEmoji: '☄️', supportedGrades: ['K-2','3-5','6-8'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'fraction_frenzy', name: 'Fraction Frenzy', description: 'Fast-paced fraction matching and solving. Chain combos for multiplier streaks.', category: 'StormBattle', iconEmoji: '🍕', supportedGrades: ['3-5','6-8'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'algebra_blaster', name: 'Algebra Blaster', description: 'Solve algebraic equations in an intense space battle.', category: 'StormBattle', iconEmoji: '⚡', supportedGrades: ['6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'vocabulary_sniper', name: 'Vocabulary Sniper', description: 'Aim and shoot targets matching word definitions.', category: 'StormBattle', iconEmoji: '🎯', supportedGrades: ['3-5','6-8','9-12'], isAvailable: true, isFeatured: true, isPremium: false },
  { id: 'grammar_gladiator', name: 'Grammar Gladiator', description: 'Arena combat where attacks are powered by correct grammar choices.', category: 'StormBattle', iconEmoji: '⚔️', supportedGrades: ['3-5','6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'science_defender', name: 'Science Defender', description: 'Defend your lab by answering science questions.', category: 'StormBattle', iconEmoji: '🔬', supportedGrades: ['3-5','6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'history_timeline_rush', name: 'History Timeline Rush', description: 'Race to place historical events in the correct order.', category: 'StormBattle', iconEmoji: '📜', supportedGrades: ['3-5','6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'geometry_defender', name: 'Geometry Defender', description: 'Protect your geometric fortress by solving shape problems.', category: 'StormBattle', iconEmoji: '📐', supportedGrades: ['6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'sat_word_arena', name: 'SAT Word Arena', description: 'Competitive word knowledge arena with definitions and synonyms.', category: 'StormBattle', iconEmoji: '📖', supportedGrades: ['9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'statistics_paintball', name: 'Statistics Paintball', description: 'Paintball arena where ammo is earned by solving statistics problems.', category: 'StormBattle', iconEmoji: '🎨', supportedGrades: ['9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'chem_lab_chaos', name: 'Chem Lab Chaos', description: 'Mix chemicals and balance equations. Don\'t let the lab explode.', category: 'StormBattle', iconEmoji: '🧪', supportedGrades: ['9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'financial_literacy_run', name: 'Financial Literacy Run', description: 'Navigate the stock market and learn compound interest.', category: 'StormBattle', iconEmoji: '💰', supportedGrades: ['9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'coordinate_conquest', name: 'Coordinate Conquest', description: 'Plot points to conquer territory. Strategic math warfare.', category: 'StormBattle', iconEmoji: '📊', supportedGrades: ['6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'data_defender', name: 'Data Defender', description: 'Protect data sets by interpreting graphs and charts.', category: 'StormBattle', iconEmoji: '🛡️', supportedGrades: ['6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'wordwave_survival', name: 'WordWave Survival', description: 'Zombie-style survival arena. Defeat enemies with correct word definitions.', category: 'StormBattle', iconEmoji: '🧟', supportedGrades: ['3-5','6-8','9-12'], isAvailable: true, isFeatured: true, isPremium: false },

  // StormDash
  { id: 'skilldash', name: 'SkillDash', description: 'Auto-runner inspired by Geometry Dash. Answer questions at checkpoints.', category: 'StormDash', iconEmoji: '💨', supportedGrades: ['K-2','3-5','6-8','9-12'], isAvailable: true, isFeatured: true, isPremium: false },
  { id: 'sentence_sprint', name: 'Sentence Sprint', description: 'Side-scrolling runner. Hit words in correct order to form sentences.', category: 'StormDash', iconEmoji: '✍️', supportedGrades: ['K-2','3-5','6-8'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'bull_run_logic', name: 'Bull Run Logic', description: 'Run from the bull! Solve equations before it catches you.', category: 'StormDash', iconEmoji: '🐂', supportedGrades: ['3-5','6-8','9-12'], isAvailable: true, isFeatured: true, isPremium: false },
  { id: 'equation_escape', name: 'Equation Escape', description: 'Escape a collapsing maze by solving equations at each door.', category: 'StormDash', iconEmoji: '🏃', supportedGrades: ['3-5','6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'maze_of_ratios', name: 'Maze of Ratios', description: 'Navigate a ratio-based maze with proportional thinking.', category: 'StormDash', iconEmoji: '🌀', supportedGrades: ['6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'physics_platform', name: 'Physics Platform', description: 'Platformer where physics equations control gravity and speed.', category: 'StormDash', iconEmoji: '🎮', supportedGrades: ['9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'word_rocket_run', name: 'Word Rocket Run', description: 'Rocket through space collecting vocabulary words.', category: 'StormDash', iconEmoji: '🚀', supportedGrades: ['K-2','3-5','6-8'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'logic_tunnel', name: 'Logic Tunnel', description: 'Speed through a tunnel solving logic puzzles.', category: 'StormDash', iconEmoji: '🕳️', supportedGrades: ['6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'history_dash', name: 'History Dash', description: 'Run through historical eras answering history questions.', category: 'StormDash', iconEmoji: '🏛️', supportedGrades: ['3-5','6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'chem_jump', name: 'Chem Jump', description: 'Jump across periodic table elements.', category: 'StormDash', iconEmoji: '⚗️', supportedGrades: ['9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'speed_reading_dash', name: 'Speed Reading Dash', description: 'Run and read! Comprehension gates test your reading.', category: 'StormDash', iconEmoji: '📚', supportedGrades: ['3-5','6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'essay_builder_rush', name: 'Essay Builder Rush', description: 'Collect paragraph components to build essays.', category: 'StormDash', iconEmoji: '📝', supportedGrades: ['6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'market_mayhem', name: 'Market Mayhem', description: 'Stock market simulation runner. Solve percentage problems.', category: 'StormDash', iconEmoji: '📈', supportedGrades: ['9-12'], isAvailable: true, isFeatured: true, isPremium: false },
  { id: 'debate_dash', name: 'Debate Dash', description: 'Build logical arguments to break through barriers.', category: 'StormDash', iconEmoji: '🗣️', supportedGrades: ['9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'geometry_glide', name: 'Geometry Glide', description: 'Glide through geometric shapes identifying properties.', category: 'StormDash', iconEmoji: '🔷', supportedGrades: ['6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },

  // StormPuzzle
  { id: 'sentence_builder_pro', name: 'Sentence Builder Pro', description: 'Drag and drop words to build sentences.', category: 'StormPuzzle', iconEmoji: '🧩', supportedGrades: ['K-2','3-5','6-8'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'context_clue_hunt', name: 'Context Clue Hunt', description: 'Detective investigation using context clues.', category: 'StormPuzzle', iconEmoji: '🔍', supportedGrades: ['3-5','6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'pattern_blast', name: 'Pattern Blast', description: 'Identify and extend patterns.', category: 'StormPuzzle', iconEmoji: '🔢', supportedGrades: ['K-2','3-5','6-8'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'ratio_architect', name: 'Ratio Architect', description: 'Build structures using correct ratios.', category: 'StormPuzzle', iconEmoji: '🏗️', supportedGrades: ['6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'timeline_builder', name: 'Timeline Builder', description: 'Construct historical timelines.', category: 'StormPuzzle', iconEmoji: '📅', supportedGrades: ['3-5','6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'proof_builder', name: 'Proof Builder', description: 'Construct mathematical proofs step by step.', category: 'StormPuzzle', iconEmoji: '✅', supportedGrades: ['9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'word_connect_storm', name: 'Word Connect Storm', description: 'Connect related words in a web of meanings.', category: 'StormPuzzle', iconEmoji: '🕸️', supportedGrades: ['3-5','6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'probability_quest', name: 'Probability Quest', description: 'Navigate choices using probability.', category: 'StormPuzzle', iconEmoji: '🎲', supportedGrades: ['6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'code_breaker', name: 'Code Breaker', description: 'Crack coded messages with logic and math.', category: 'StormPuzzle', iconEmoji: '🔐', supportedGrades: ['6-8','9-12'], isAvailable: true, isFeatured: true, isPremium: false },
  { id: 'logic_tower', name: 'Logic Tower', description: 'Build a tower of logic with reasoning puzzles.', category: 'StormPuzzle', iconEmoji: '🗼', supportedGrades: ['3-5','6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },

  // StormQuick
  { id: 'word_balloon_pop', name: 'Word Balloon Pop', description: 'Pop balloons with correct answers.', category: 'StormQuick', iconEmoji: '🎈', supportedGrades: ['K-2','3-5'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'number_catch', name: 'Number Catch', description: 'Catch falling correct numbers.', category: 'StormQuick', iconEmoji: '🔢', supportedGrades: ['K-2','3-5','6-8'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'grammar_clicker', name: 'Grammar Clicker', description: 'Rapid-fire grammar corrections.', category: 'StormQuick', iconEmoji: '✏️', supportedGrades: ['3-5','6-8'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'flash_fact_frenzy', name: 'Flash Fact Frenzy', description: 'True or false lightning round.', category: 'StormQuick', iconEmoji: '⚡', supportedGrades: ['K-2','3-5','6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'speed_multiplication', name: 'Speed Multiplication', description: 'Multiplication speed drill.', category: 'StormQuick', iconEmoji: '✖️', supportedGrades: ['K-2','3-5','6-8'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'spelling_sniper', name: 'Spelling Sniper', description: 'Snipe misspelled words from scrolling text.', category: 'StormQuick', iconEmoji: '🎯', supportedGrades: ['3-5','6-8'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'color_equation', name: 'Color Equation', description: 'Solve equations where colors represent numbers.', category: 'StormQuick', iconEmoji: '🌈', supportedGrades: ['K-2','3-5','6-8'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'quick_sat', name: 'Quick SAT', description: '60-second SAT prep blitz.', category: 'StormQuick', iconEmoji: '📋', supportedGrades: ['9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'brain_boost', name: 'Brain Boost', description: 'Mixed skill challenges that get harder.', category: 'StormQuick', iconEmoji: '🧠', supportedGrades: ['K-2','3-5','6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'memory_matrix', name: 'Memory Matrix', description: 'Remember patterns of increasing complexity.', category: 'StormQuick', iconEmoji: '🧩', supportedGrades: ['K-2','3-5','6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },

  // Storm3D
  { id: 'geometry_runner_3d', name: 'Geometry Runner 3D', description: 'Run through a 3D geometric world solving spatial puzzles.', category: 'Storm3D', iconEmoji: '🎮', supportedGrades: ['3-5','6-8','9-12'], isAvailable: true, isFeatured: true, isPremium: false },
  { id: 'math_galaxy_3d', name: 'Math Galaxy 3D', description: 'Explore a 3D galaxy solving math on each planet.', category: 'Storm3D', iconEmoji: '🌌', supportedGrades: ['K-2','3-5','6-8','9-12'], isAvailable: true, isFeatured: false, isPremium: false },
  { id: 'word_world_3d', name: 'Word World 3D', description: 'Navigate a 3D word landscape.', category: 'Storm3D', iconEmoji: '🌍', supportedGrades: ['3-5','6-8'], isAvailable: true, isFeatured: false, isPremium: false },

  // StormVR
  { id: 'vr_math_dojo', name: 'VR Math Dojo', description: 'Immersive VR math training dojo.', category: 'StormVR', iconEmoji: '🥋', supportedGrades: ['6-8','9-12'], isAvailable: false, isFeatured: true, isPremium: true },
  { id: 'vr_science_lab', name: 'VR Science Lab', description: 'Virtual science experiments.', category: 'StormVR', iconEmoji: '🧫', supportedGrades: ['6-8','9-12'], isAvailable: false, isFeatured: false, isPremium: true },
  { id: 'vr_history_explorer', name: 'VR History Explorer', description: 'Walk through history in VR.', category: 'StormVR', iconEmoji: '🏺', supportedGrades: ['6-8','9-12'], isAvailable: false, isFeatured: false, isPremium: true },

  // Storm Defenders (Tower Defense)
  { id: 'storm_defenders', name: 'Storm Defenders', description: 'Tower defense where you place Brain Turrets to fight zombie waves. Answer questions to place and upgrade 10 unique defenders. Survive endless waves, unlock new turrets, and outsmart boss zombies.', category: 'StormBattle', iconEmoji: '🛡️', supportedGrades: ['K-2','3-5','6-8','9-12'], isAvailable: true, isFeatured: true, isPremium: false },
  { id: 'storm_defenders_vr', name: 'Storm Defenders VR', description: 'Immersive 3D tower defense. Look down at the battlefield from above, place defenders by answering questions, and watch zombies march in real-time 3D.', category: 'Storm3D', iconEmoji: '🥽', supportedGrades: ['K-2','3-5','6-8','9-12'], isAvailable: true, isFeatured: true, isPremium: false },
];

export function getGamesForCategory(category: GameCategory): GameInfo[] {
  return allGames.filter(g => g.category === category);
}

export function getGamesForGrade(grade: GradeLevel): GameInfo[] {
  return allGames.filter(g => g.supportedGrades.includes(grade));
}

export function getFeaturedGames(): GameInfo[] {
  return allGames.filter(g => g.isFeatured);
}
