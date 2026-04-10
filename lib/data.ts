export type Lang = 'zh' | 'en'

export const t = {
  zh: {
    tagline: 'Nexify 年度晚宴 2026',
    heroTitle1: '出海',
    heroTitle2: '飲一杯',
    heroHighlight: '你的完美航海飲品',
    heroSub: '回答幾個小問題，AI 船長會用幽默方式為你推薦最適合今晚的飲品！',
    startBtn: '開始你的航程',
    badge1: '藍金奢華出海風',
    badge2: '波浪動畫 + 船隻插圖',
    cardTitle: 'Sail Beyond the World',
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
    ingredients: '主要成分',
    taste: '味道特徵',
    captainNote: '船長評語：完美匹配你的性格＋心情＋願望！',
    restart: '再來一次航程',
    home: '返回首頁',
    alcBadge: '🍹 有酒精',
    nonAlcBadge: '🥤 零酒精',
    langSwitch: 'English',
  },
  en: {
    tagline: 'Nexify Annual Dinner 2026',
    heroTitle1: 'Sail Beyond',
    heroTitle2: 'the Sip',
    heroHighlight: 'Your Perfect Voyage Drink',
    heroSub: 'Answer a few fun questions and Captain AI will recommend the perfect drink for tonight with a dash of humor!',
    startBtn: 'Start Your Voyage',
    badge1: 'Navy & Gold Luxury Theme',
    badge2: 'Wave Animation + Ship Art',
    cardTitle: 'Sail Beyond the World',
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
    q3Title: 'Port 3: What\'s your mood today?',
    moods: ['😄 Happy & Joyful', '⚡ Full of Energy', '😌 Relaxed & Chill', '🧐 Curious & Adventurous'],
    q4Title: 'Final Port: What vibe do you want from this drink?',
    feelings: ['☕ Wake Me Up', '🌊 Cool & Refreshing', '🔥 Warm & Healing', '✨ Creative Surprise'],
    loading: 'Captain is mixing your drink…',
    loadingDot: 'SAILING...',
    ingredients: 'Key Ingredients',
    taste: 'Taste Profile',
    captainNote: "Captain's Note: Perfect match for your personality + mood + wish!",
    restart: 'Another Voyage',
    home: 'Back to Home',
    alcBadge: '🍹 Alcoholic',
    nonAlcBadge: '🥤 Non-Alcoholic',
    langSwitch: '中文',
  },
}

export interface DrinkData {
  name: string
  nameMock: string
  emoji: string
  color: string
  alc: string
  mock: string
  taste: { zh: string; en: string }
  funny: { zh: string; en: string }
}

export const drinkData: Record<number, DrinkData> = {
  0: {
    name: 'Pineapeel',
    nameMock: 'Pineapeel Mocktail',
    emoji: '🍍',
    color: '#FFCC33',
    alc: 'Infused vodka, pineapple',
    mock: 'Pineapple juice, sparkling water, lime',
    taste: {
      zh: '甜蜜熱帶、微酸清新，像陽光下衝浪一樣暢快！',
      en: 'Sweet tropical, lightly sour — like surfing in sunshine!',
    },
    funny: {
      zh: '哈哈！這杯像你一樣活力四射，簡直係出海必備的「快樂水」！',
      en: "Ha! This drink is as vibrant as you — the essential 'happy juice' for any voyage!",
    },
  },
  1: {
    name: 'Blue Kamikaze',
    nameMock: 'Blue Kamikaze Mocktail',
    emoji: '🌊',
    color: '#00D4FF',
    alc: 'Vodka, blue curacao',
    mock: 'Blue curacao syrup (0%), lemon, soda',
    taste: {
      zh: '藍色海洋、柑橘爆擊，喝落去即刻感覺自己喺公海飛馳！',
      en: 'Ocean blue, citrus burst — one sip and you\'re racing across the high seas!',
    },
    funny: {
      zh: '哇！E人+活力爆棚的你，絕配！呢杯藍色神風會帶你直衝派對甲板！',
      en: 'Wow! Extrovert + full energy = perfect match! This Blue Kamikaze will launch you straight to the party deck!',
    },
  },
  2: {
    name: 'Roserry',
    nameMock: 'Roserry Mocktail',
    emoji: '🌹',
    color: '#FF6699',
    alc: 'Roselle, gin, cranberry',
    mock: 'Roselle tea, cranberry, sparkling water',
    taste: {
      zh: '花香酸甜、優雅平衡，像日落時分的浪漫航程',
      en: 'Floral and bittersweet, elegantly balanced — like a romantic sunset voyage.',
    },
    funny: {
      zh: 'I人+療癒心情？這杯剛剛好～喝完會覺得自己係船上最有氣質嘅乘客！',
      en: 'Introvert + healing mood? This is it! After one sip you\'ll feel like the most sophisticated passenger on board!',
    },
  },
  3: {
    name: 'Amaretto Sour',
    nameMock: 'Amaretto Sour Mocktail',
    emoji: '🥃',
    color: '#FFB366',
    alc: 'Amaretto, whiskey',
    mock: 'Non-alc amaretto, lemon, simple syrup',
    taste: {
      zh: '杏仁甜香 + 微酸，暖心又帶點小驚喜',
      en: 'Almond sweetness + gentle sourness — warm, comforting with a little twist.',
    },
    funny: {
      zh: '好奇+想溫暖療癒？船長特調！飲完你會覺得自己變身海上哲學家～',
      en: "Curious + healing? Captain's special! After this you'll feel like an ocean philosopher~",
    },
  },
}

// Answer → drink index lookup
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

export const moodKeys = ['happy', 'energetic', 'relaxed', 'curious'] as const
export const feelingKeys = ['energizing', 'refreshing', 'healing', 'surprise'] as const
