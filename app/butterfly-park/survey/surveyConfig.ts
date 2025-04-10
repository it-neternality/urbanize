import { CommentStep, ProfileStep, RatingOption, RatingStep, SurveyStep } from "./types";

// Rating options
export const ratingOptions: RatingOption[] = [
  { value: 0, label: 'כלל לא' },
  { value: 1, label: 'מועטה' },
  { value: 2, label: 'בינונית' },
  { value: 3, label: 'רבה' },
  { value: 4, label: 'רבה מאוד' },
  { value: 5, label: 'ממש חובה' }
];

// Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAqWug5VeDWY972KKkQf5FgTccnqGDIT4o",
  authDomain: "rehovot-poll.firebaseapp.com",
  databaseURL: "https://rehovot-poll.firebaseio.com",
  projectId: "rehovot-poll",
  storageBucket: "rehovot-poll.appspot.com",
  messagingSenderId: "939148001003",
  appId: "1:939148001003:web:3d797a740fc5cb146048ae",
  measurementId: "G-21KV3FNQDK"
};

// Survey data for each step
export const surveySteps: SurveyStep[] = [
  // Profile step
  {
    title: "פרטים אישיים",
    description: "ראשית, חשוב לנו להכיר אתכם. ענו על שאלון ההכרות הקצר הבא:",
    category: "profile",
    introText: "לראשונה בישראל, התושבים משתתפים בבחירת השירותים והחנויות במרכז המסחרי!",
    progress: 20,
    fields: [
      {
        title: "* שם ושם משפחה",
        inputs: [
          { key: "fname", type: "text", label: "שם פרטי", required: true },
          { key: "lname", type: "text", label: "שם משפחה", required: true },
          {
            key: "gender",
            type: "radio",
            label: "מגדר",
            required: false,
            options: ['זכר', 'נקבה']
          }
        ]
      },
      {
        title: "* כתובת מגורים וטלפון",
        inputs: [
          {
            key: "address",
            type: "select",
            label: "כתובת",
            required: true,
            options: [
              'חזון איש',
              'הרב גרז זבולון',
              'הרב יעקב מזרחי',
              'דרך ששת הימים',
              'משולם סרנגה',
              'אמנון ותמר',
              'שמשון צור',
              'דובנוב',
              'אחר'
            ]
          },
          { key: "address_number", type: "number", label: "מספר בית", required: true },
          { key: "phone", type: "number", label: "טלפון", required: true },
          {
            key: "phone_prefix",
            type: "select",
            label: "קידומת",
            required: true,
            options: ['050', '051', '052', '053', '054', '055', '058']
          }
        ]
      },
      {
        title: "הרכב התא המשפחתי",
        inputs: [
          {
            key: "sibiling",
            type: "select",
            label: "סטטוס",
            required: false,
            options: [
              'רווק/רווקה',
              'נשוי/אה ללא ילדים',
              'הורים לילד/ים בגיל הרך',
              'הורים לילדים צעירים עד כיתה ו',
              'הורים לילדים בוגרים',
              'גרוש/גרושה או אלמן/אלמנה'
            ]
          },
          {
            key: "kupat_cholim",
            type: "select",
            label: "* קופת חולים",
            required: true,
            options: [
              'שירותי בריאות כללית',
              'מכבי שירותי בריאות',
              'קופת חולים מאוחדת',
              'לאומית שירותי בריאות',
              'חיל הרפואה'
            ]
          }
        ]
      }
    ]
  } as ProfileStep,
  
  // Food and restaurants 
  {
    title: "מזון והסעדה",
    description: "נא לדרג עד כמה נחוץ לדעתך",
    category: "food",
    progress: 20,
    ratingType: true,
    items: [
      { key: "supermarket", label: "סופרמרקט", rating: 0 },
      { key: "coffeeshop", label: "בית קפה", rating: 0 },
      { key: "pizza", label: "פיצריה", rating: 0 },
      { key: "icecream", label: "גלידריה", rating: 0 },
      { key: "fastfood", label: "מזון מהיר אחר", rating: 0 },
      { key: "bakery", label: "מאפיה/קונדיטוריה", rating: 0 },
      { key: "deli", label: "מעדנייה וסלטים", rating: 0 },
      { key: "spices", label: "פיצוחים ותבלינים", rating: 0 }
    ],
    maxPoints: 28 // 8 items * 3.5 points average
  } as RatingStep,
  
  // Shops
  {
    title: "חנויות",
    description: "נא לדרג עד כמה נחוץ לדעתך",
    category: "shops",
    progress: 20,
    ratingType: true,
    items: [
      { key: "kiosk", label: "קיוסק", rating: 0 },
      { key: "cellular", label: "סלולר ומחשבים", rating: 0 },
      { key: "homedepot", label: "כלי עבודה/טמבור", rating: 0 },
      { key: "optics", label: "אופטיקה", rating: 0 },
      { key: "kidsfashion", label: "חנות בגדי ילדים", rating: 0 },
      { key: "officedepot", label: "ספרים וכלי כתיבה", rating: 0 },
      { key: "toys", label: "צעצועים ומתנות", rating: 0 }
    ],
    maxPoints: 25 // 7 items * 3.5 points average
  } as RatingStep,
  
  // Services
  {
    title: "שירותים",
    description: "מעולה! זוהי הקטגוריה הלפני אחרונה",
    category: "services",
    progress: 20,
    ratingType: true,
    items: [
      { key: "hmo", label: "קופת חולים", rating: 0 },
      { key: "clinic", label: "מרפאת רופאים", rating: 0 },
      { key: "pharm", label: "בית מרקחת/פארם", rating: 0 },
      { key: "vet", label: "וטרינר", rating: 0 },
      { key: "atm", label: "כספומט", rating: 0 },
      { key: "laundry", label: "מכבסה וניקוי יבש", rating: 0 },
      { key: "barber", label: "מספרה", rating: 0 },
      { key: "cosmetics", label: "מכון יופי/קוסמטיקה", rating: 0 },
      { key: "kindergarden", label: "מעון ילדים/פעוטון", rating: 0 }
    ],
    maxPoints: 32 // 9 items * 3.5 points average
  } as RatingStep,
  
  // Entertainment
  {
    title: "בילוי ופנאי",
    description: "כל הכבוד! זוהי הקטגוריה האחרונה לדרג",
    category: "pleasure",
    progress: 20,
    ratingType: true,
    items: [
      { key: "studio", label: "סטודיו לריקוד", rating: 0 },
      { key: "judo", label: "ג'ודו/קפוארה/ספורט", rating: 0 },
      { key: "technology", label: "מרכז לימוד מחשבים", rating: 0 },
      { key: "gym", label: "חדר כושר/פילאטיס", rating: 0 },
      { key: "jimboree", label: "משחקיה / ג'ימבורי", rating: 0 },
      { key: "kidsactivities", label: "פעילות ילדים אחרת", rating: 0 }
    ],
    maxPoints: 21 // 6 items * 3.5 points average
  } as RatingStep,
  
  // Comments
  {
    title: "רעיונות נוספים",
    description: "תודה רבה! סייעתם רבות לתכנון המרכז לפי רצונכם. אנא לחצו \"שלח\" לסיום",
    category: "other",
    progress: 0,
    commentType: true
  } as CommentStep
];
