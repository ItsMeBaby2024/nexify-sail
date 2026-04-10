export type Lang = 'zh' | 'en'

export const t = {
  zh: {
    tagline: 'Nexify 年度晚宴 2026',
    heroSub: '回答幾個小問題，AI 船長會用幽默方式為你推薦最適合今晚的飲品！',
    startBtn: '開始你的航程',
    cardSub: '今晚就用這杯飲品，航向無限可能！',
    back: '返回',
    step: '第',
    of: '步，共 4 步',
    q1Title: '第一站：你想飲有酒精定冇酒精？',
    q1Sub: '船長要先知道你今晚想唔想「醉」一下～',
    alcoholic: '有酒精',
    alcoholicSub: 'Cocktail 航線',
    nonAlcoholic: '冇酒精',
    nonAlcoholicSub: 'Mocktail 航線',
    q2Title: '第二站：你會形容自己的性格是？',
    eType: 'E人',
    eSub: '喜歡與人互動\n派對型船員',
    iType: 'I人',
    iSub: '擅長思考與觀察\n沉思型船長',
    q3Title: '第三站：你今天的心情是？',
    moods: ['😄 開心愉快', '⚡ 活力滿滿', '😌 輕鬆悠閒', '🧐 充滿好奇'],
    q4Title: '最後一站：你希望這杯飲品帶來什麼感覺？',
    feelings: ['☕ 醒腦提神', '🌊 清爽舒暢', '🔥 溫暖療癒', '✨ 創意驚喜'],
    loading: '船長正在為你調酒…',
    loadingDot: 'SAILING...',
    ingredients: 'INGREDIENTS',
    ratings: 'RATINGS',
    alcLevel: 'Alcohol Level',
    socialVibe: 'Social Vibe',
    soulTitle: 'Soul Elements',
    pairingTitle: 'Perfect Pairings',
    captainNote: '船長評語：完美匹配你的性格＋心情＋願望！',
    restart: '再來一次航程',
    home: '返回首頁',
    alcBadge: '有酒精',
    nonAlcBadge: '零酒精',
    low: 'LOW', mid: 'MID', high: 'HIGH',
    timeUp: '時間到！⏱️',
    timeUpSub: '60秒已過，重新出發吧！',
    switchToMock: '切換到無酒精版本',
    switchToAlc: '切換到有酒精版本',
    langSwitch: 'English',
  },
  en: {
    tagline: 'Nexify Annual Dinner 2026',
    heroSub: 'Answer a few fun questions and Captain AI will recommend the perfect drink for tonight!',
    startBtn: 'Start Your Voyage',
    cardSub: 'Toast to infinite possibilities tonight!',
    back: 'Back',
    step: 'Step ',
    of: ' of 4',
    q1Title: 'Port 1: Alcohol or No Alcohol?',
    q1Sub: "Captain needs to know if you're sailing into tipsy waters tonight~",
    alcoholic: 'Alcoholic',
    alcoholicSub: 'Cocktail Route',
    nonAlcoholic: 'Non-Alcoholic',
    nonAlcoholicSub: 'Mocktail Route',
    q2Title: 'Port 2: How would you describe your personality?',
    eType: 'Extrovert',
    eSub: 'Loves socializing\nParty crew member',
    iType: 'Introvert',
    iSub: 'Thoughtful & observant\nReflective Captain',
    q3Title: "Port 3: What's your mood today?",
    moods: ['😄 Happy & Joyful', '⚡ Full of Energy', '😌 Relaxed & Chill', '🧐 Curious & Bold'],
    q4Title: 'Final Port: What vibe do you want from this drink?',
    feelings: ['☕ Wake Me Up', '🌊 Cool & Refreshing', '🔥 Warm & Healing', '✨ Creative Surprise'],
    loading: 'Captain is mixing your drink…',
    loadingDot: 'SAILING...',
    ingredients: 'INGREDIENTS',
    ratings: 'RATINGS',
    alcLevel: 'Alcohol Level',
    socialVibe: 'Social Vibe',
    soulTitle: 'Soul Elements',
    pairingTitle: 'Perfect Pairings',
    captainNote: "Captain's Note: Perfect match for your personality + mood + wish!",
    restart: 'Another Voyage',
    home: 'Back to Home',
    alcBadge: 'Alcoholic',
    nonAlcBadge: 'Non-Alcoholic',
    low: 'LOW', mid: 'MID', high: 'HIGH',
    timeUp: "Time's Up! ⏱️",
    timeUpSub: '60 seconds have passed — try again!',
    switchToMock: 'Switch to Non-Alcoholic',
    switchToAlc: 'Switch to Alcoholic',
    langSwitch: '中文',
  },
}

export type RatingLevel = 'low' | 'mid' | 'high'

export interface DrinkData {
  name: string
  nameMock: string
  flavorTag: { zh: string; en: string }
  /** CSS/SVG hue colour for the orb */
  color: string
  color2: string          // secondary gradient stop
  alcIngredients: string
  mockIngredients: string
  taste: { zh: string; en: string }
  funny: { zh: string; en: string }
  /** Ratings */
  alcLevel: RatingLevel
  socialVibe: RatingLevel
  /** Soul tags — icon + label pairs */
  soul: { icon: string; tags: { zh: string; en: string }[] }[]
  /** Perfect pairings */
  pairings: { icon: string; name: { zh: string; en: string }; sub: { zh: string; en: string } }[]
}

export const drinkData: Record<number, DrinkData> = {
  0: {
    name: 'Pineapeel',
    nameMock: 'Pineapeel Mocktail',
    flavorTag: { zh: '活力爆發 · 甜蜜熱帶', en: 'Flavour Elevation — Bold & Tropical' },
    color: '#FFCC33',
    color2: '#FF9A00',
    alcIngredients: 'Infused Vodka · Pineapple · Lime',
    mockIngredients: 'Pineapple Juice · Sparkling Water · Lime',
    taste: {
      zh: '甜蜜熱帶、微酸清新，像陽光下衝浪一樣暢快！你活力四射，永遠是人群中最閃亮的那顆星。',
      en: 'Sweet tropical, lightly sour — like surfing in sunshine! You radiate energy and light up every room.',
    },
    funny: {
      zh: '哈哈！這杯像你一樣活力四射，簡直係出海必備的「快樂水」！',
      en: "Ha! This drink is as vibrant as you — the essential 'happy juice' for any voyage!",
    },
    alcLevel: 'mid',
    socialVibe: 'high',
    soul: [
      { icon: '🍍', tags: [{ zh: '#活力', en: '#Energetic' }, { zh: '#陽光', en: '#Sunshine' }, { zh: '#無懼', en: '#Fearless' }] },
      { icon: '🌊', tags: [{ zh: '#穩健', en: '#Grounded' }, { zh: '#可靠', en: '#Reliable' }, { zh: '#實際', en: '#Practical' }] },
      { icon: '🎁', tags: [{ zh: '#值得信賴', en: '#Trustworthy' }, { zh: '#坦率', en: '#Genuine' }, { zh: '#溫暖', en: '#Warm' }] },
    ],
    pairings: [
      { icon: '🍹', name: { zh: 'Blue Kamikaze', en: 'Blue Kamikaze' }, sub: { zh: '適合派對靈魂', en: 'for party souls' } },
      { icon: '🌹', name: { zh: 'Roserry', en: 'Roserry' }, sub: { zh: '適合浪漫夜晚', en: 'for dreamy nights' } },
    ],
  },
  1: {
    name: 'Blue Kamikaze',
    nameMock: 'Blue Kamikaze Mocktail',
    flavorTag: { zh: '海洋衝擊 · 柑橘爆發', en: 'Ocean Burst — Zesty & Electric' },
    color: '#00D4FF',
    color2: '#0077BB',
    alcIngredients: 'Vodka · Blue Curaçao · Lime',
    mockIngredients: 'Blue Curaçao Syrup (0%) · Lemon · Soda',
    taste: {
      zh: '藍色海洋、柑橘爆擊，喝落去即刻感覺自己喺公海飛馳！你天生喜歡冒險、追求刺激。',
      en: 'Ocean blue, citrus burst — one sip and you\'re racing across the high seas! Born adventurous.',
    },
    funny: {
      zh: '哇！E人+活力爆棚的你，絕配！呢杯藍色神風會帶你直衝派對甲板！',
      en: 'Wow! Extrovert + full energy = perfect match! This Blue Kamikaze will launch you to the party deck!',
    },
    alcLevel: 'mid',
    socialVibe: 'high',
    soul: [
      { icon: '⚡', tags: [{ zh: '#直率', en: '#Direct' }, { zh: '#可靠', en: '#Reliable' }, { zh: '#落地', en: '#Grounded' }] },
      { icon: '🧊', tags: [{ zh: '#穩定', en: '#Stable' }, { zh: '#有條理', en: '#Structured' }, { zh: '#一致', en: '#Consistent' }] },
      { icon: '🛡️', tags: [{ zh: '#值得信賴', en: '#Trustworthy' }, { zh: '#驗證', en: '#Proven' }, { zh: '#穩固', en: '#Steady' }] },
    ],
    pairings: [
      { icon: '🍍', name: { zh: 'Pineapeel', en: 'Pineapeel' }, sub: { zh: '適合敏銳心靈', en: 'for sharp minds' } },
      { icon: '🥃', name: { zh: 'Amaretto Sour', en: 'Amaretto Sour' }, sub: { zh: '適合深夜思考', en: 'for late-night thinkers' } },
    ],
  },
  2: {
    name: 'Roserry',
    nameMock: 'Roserry Mocktail',
    flavorTag: { zh: '花香優雅 · 浪漫平衡', en: 'Floral Elegance — Soft & Romantic' },
    color: '#FF6699',
    color2: '#CC3366',
    alcIngredients: 'Roselle · Gin · Cranberry',
    mockIngredients: 'Roselle Tea · Cranberry · Sparkling Water',
    taste: {
      zh: '花香酸甜、優雅平衡，像日落時分的浪漫航程。你溫柔細膩，懂得欣賞生活中的美好。',
      en: 'Floral and bittersweet, elegantly balanced — like a romantic sunset voyage. Gentle and refined.',
    },
    funny: {
      zh: 'I人+療癒心情？這杯剛剛好～喝完會覺得自己係船上最有氣質嘅乘客！',
      en: "Introvert + healing mood? This is it! After one sip you'll feel like the most elegant passenger on board!",
    },
    alcLevel: 'low',
    socialVibe: 'mid',
    soul: [
      { icon: '🌹', tags: [{ zh: '#浪漫', en: '#Romantic' }, { zh: '#感性', en: '#Sensitive' }, { zh: '#優雅', en: '#Elegant' }] },
      { icon: '🎀', tags: [{ zh: '#溫柔', en: '#Gentle' }, { zh: '#細心', en: '#Thoughtful' }, { zh: '#真誠', en: '#Sincere' }] },
      { icon: '🌸', tags: [{ zh: '#藝術', en: '#Artistic' }, { zh: '#夢幻', en: '#Dreamy' }, { zh: '#獨特', en: '#Unique' }] },
    ],
    pairings: [
      { icon: '🥃', name: { zh: 'Amaretto Sour', en: 'Amaretto Sour' }, sub: { zh: '適合夢幻夜晚', en: 'for dreamy nights' } },
      { icon: '🍍', name: { zh: 'Pineapeel', en: 'Pineapeel' }, sub: { zh: '適合活力補充', en: 'for an energy boost' } },
    ],
  },
  3: {
    name: 'Amaretto Sour',
    nameMock: 'Amaretto Sour Mocktail',
    flavorTag: { zh: '杏仁暖心 · 微酸驚喜', en: 'Warm Almond — Smooth & Surprising' },
    color: '#FFB366',
    color2: '#E07820',
    alcIngredients: 'Amaretto · Whiskey · Lemon',
    mockIngredients: 'Non-alc Amaretto · Lemon · Simple Syrup',
    taste: {
      zh: '杏仁甜香 + 微酸，暖心又帶點小驚喜。你充滿智慧，善於在平靜中發現無限可能。',
      en: 'Almond sweetness + gentle sourness — warm, comforting with a delightful twist. Wise and curious.',
    },
    funny: {
      zh: '好奇+想溫暖療癒？船長特調！飲完你會覺得自己變身海上哲學家～',
      en: "Curious + healing? Captain's special! After this you'll feel like an ocean philosopher~",
    },
    alcLevel: 'mid',
    socialVibe: 'mid',
    soul: [
      { icon: '🥃', tags: [{ zh: '#好奇', en: '#Curious' }, { zh: '#智慧', en: '#Wise' }, { zh: '#深度', en: '#Depth' }] },
      { icon: '🔍', tags: [{ zh: '#分析', en: '#Analytical' }, { zh: '#觀察', en: '#Observant' }, { zh: '#洞察', en: '#Insightful' }] },
      { icon: '📚', tags: [{ zh: '#哲學', en: '#Philosophical' }, { zh: '#沉思', en: '#Reflective' }, { zh: '#獨立', en: '#Independent' }] },
    ],
    pairings: [
      { icon: '🌊', name: { zh: 'Blue Kamikaze', en: 'Blue Kamikaze' }, sub: { zh: '適合敏銳心靈', en: 'for sharp minds' } },
      { icon: '🌹', name: { zh: 'Roserry', en: 'Roserry' }, sub: { zh: '適合夢幻夜晚', en: 'for dreamy nights' } },
    ],
  },
}

export const drinkMatrix: Record<string, Record<string, Record<string, Record<string, number>>>> = {
  alcoholic: {
    E: {
      happy:    { energizing: 0, refreshing: 1, healing: 2, surprise: 1 },
      energetic:{ energizing: 1, refreshing: 0, healing: 3, surprise: 1 },
      relaxed:  { energizing: 2, refreshing: 3, healing: 2, surprise: 3 },
      curious:  { energizing: 3, refreshing: 1, healing: 0, surprise: 0 },
    },
    I: {
      happy:    { energizing: 2, refreshing: 3, healing: 3, surprise: 2 },
      energetic:{ energizing: 3, refreshing: 0, healing: 1, surprise: 0 },
      relaxed:  { energizing: 0, refreshing: 2, healing: 0, surprise: 3 },
      curious:  { energizing: 1, refreshing: 3, healing: 2, surprise: 1 },
    },
  },
  'non-alcoholic': {
    E: {
      happy:    { energizing: 1, refreshing: 0, healing: 3, surprise: 1 },
      energetic:{ energizing: 0, refreshing: 1, healing: 2, surprise: 0 },
      relaxed:  { energizing: 3, refreshing: 2, healing: 1, surprise: 3 },
      curious:  { energizing: 2, refreshing: 3, healing: 0, surprise: 2 },
    },
    I: {
      happy:    { energizing: 3, refreshing: 2, healing: 0, surprise: 3 },
      energetic:{ energizing: 2, refreshing: 3, healing: 1, surprise: 2 },
      relaxed:  { energizing: 1, refreshing: 0, healing: 3, surprise: 1 },
      curious:  { energizing: 0, refreshing: 1, healing: 2, surprise: 0 },
    },
  },
}

export const moodKeys    = ['happy', 'energetic', 'relaxed', 'curious']   as const
export const feelingKeys = ['energizing', 'refreshing', 'healing', 'surprise'] as const
