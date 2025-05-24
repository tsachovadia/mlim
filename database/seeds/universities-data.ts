// נתוני אוניברסיטאות ישראליות - Israeli Universities Data
// Seeds for Academic Program Matching Platform

export const institutionsData = [
  {
    id: 'tau',
    nameHebrew: 'אוניברסיטת תל אביב',
    nameEnglish: 'Tel Aviv University',
    city: 'תל אביב',
    website: 'https://www.tau.ac.il',
    logoUrl: '/logos/tau.png',
    description: 'האוניברסיטה הגדולה והמגוונת ביותר בישראל',
    establishedYear: 1956
  },
  {
    id: 'huji',
    nameHebrew: 'האוניברסיטה העברית בירושלים',
    nameEnglish: 'Hebrew University of Jerusalem',
    city: 'ירושלים',
    website: 'https://www.huji.ac.il',
    logoUrl: '/logos/huji.png',
    description: 'האוניברסיטה הראשונה בישראל ומוקד המחקר המוביל',
    establishedYear: 1918
  },
  {
    id: 'technion',
    nameHebrew: 'הטכניון - מכון טכנולוגי לישראל',
    nameEnglish: 'Technion - Israel Institute of Technology',
    city: 'חיפה',
    website: 'https://www.technion.ac.il',
    logoUrl: '/logos/technion.png',
    description: 'המוסד הטכנולוגי המוביל בישראל',
    establishedYear: 1912
  },
  {
    id: 'bgu',
    nameHebrew: 'אוניברסיטת בן גוריון בנגב',
    nameEnglish: 'Ben-Gurion University of the Negev',
    city: 'באר שבע',
    website: 'https://www.bgu.ac.il',
    logoUrl: '/logos/bgu.png',
    description: 'אוניברסיטת המחקר של הנגב',
    establishedYear: 1969
  },
  {
    id: 'biu',
    nameHebrew: 'אוניברסיטת בר אילן',
    nameEnglish: 'Bar-Ilan University',
    city: 'רמת גן',
    website: 'https://www.biu.ac.il',
    logoUrl: '/logos/biu.png',
    description: 'אוניברסיטה מחקרית עם זהות יהודית',
    establishedYear: 1955
  },
  {
    id: 'haifa',
    nameHebrew: 'אוניברסיטת חיפה',
    nameEnglish: 'University of Haifa',
    city: 'חיפה',
    website: 'https://www.haifa.ac.il',
    logoUrl: '/logos/haifa.png',
    description: 'אוניברסיטה רב-תרבותית המשרתת את צפון הארץ',
    establishedYear: 1963
  },
  {
    id: 'ariel',
    nameHebrew: 'אוניברסיטת אריאל',
    nameEnglish: 'Ariel University',
    city: 'אריאל',
    website: 'https://www.ariel.ac.il',
    logoUrl: '/logos/ariel.png',
    description: 'אוניברסיטה צעירה ודינמית',
    establishedYear: 1982
  },
  {
    id: 'ono',
    nameHebrew: 'אוניברסיטת אונו',
    nameEnglish: 'Ono Academic College',
    city: 'קרית אונו',
    website: 'https://www.ono.ac.il',
    logoUrl: '/logos/ono.png',
    description: 'מוסד אקדמי פרטי מוביל',
    establishedYear: 1991
  },
  {
    id: 'jct',
    nameHebrew: 'מכללת ירושלים - מכון לוסטיג',
    nameEnglish: 'Jerusalem College of Technology - Lev Academic Center',
    city: 'ירושלים',
    website: 'https://www.jct.ac.il',
    logoUrl: '/logos/jct.png',
    description: 'מכללה הנדסית ותוכנה דתית',
    establishedYear: 1969
  },
  {
    id: 'idc',
    nameHebrew: 'המרכז הבינתחומי הרצליה',
    nameEnglish: 'Reichman University (IDC Herzliya)',
    city: 'הרצליה',
    website: 'https://www.runi.ac.il',
    logoUrl: '/logos/idc.png',
    description: 'אוניברסיטה פרטית עם גישה בינתחומית',
    establishedYear: 1994
  }
];

export const facultiesData = [
  // תל אביב
  {
    id: 'tau-cs',
    nameHebrew: 'בית הספר למדעי המחשב',
    nameEnglish: 'School of Computer Science',
    institutionId: 'tau',
    description: 'בית ספר מוביל למדעי המחשב בישראל',
    website: 'https://www.cs.tau.ac.il'
  },
  {
    id: 'tau-psychology',
    nameHebrew: 'בית הספר לפסיכולוגיה',
    nameEnglish: 'School of Psychology',
    institutionId: 'tau',
    description: 'בית ספר מוביל לפסיכולוגיה בישראל',
    website: 'https://www.psychology.tau.ac.il'
  },
  
  // האוניברסיטה העברית
  {
    id: 'huji-cs',
    nameHebrew: 'בית הספר למדעי המחשב והנדסה',
    nameEnglish: 'School of Computer Science and Engineering',
    institutionId: 'huji',
    description: 'בית ספר מוביל למחקר במדעי המחשב',
    website: 'https://www.cs.huji.ac.il'
  },
  {
    id: 'huji-psychology',
    nameHebrew: 'המחלקה לפסיכולוגיה',
    nameEnglish: 'Department of Psychology',
    institutionId: 'huji',
    description: 'מחלקה מובילה לפסיכולוגיה ומחקר קוגניטיבי',
    website: 'https://psychology.huji.ac.il'
  },
  
  // טכניון
  {
    id: 'technion-cs',
    nameHebrew: 'הפקולטה למדעי המחשב',
    nameEnglish: 'Faculty of Computer Science',
    institutionId: 'technion',
    description: 'הפקולטה הטכנולוגית המובילה למדעי המחשב',
    website: 'https://www.cs.technion.ac.il'
  },
  
  // בן גוריון
  {
    id: 'bgu-cs',
    nameHebrew: 'המחלקה למדעי המחשב',
    nameEnglish: 'Department of Computer Science',
    institutionId: 'bgu',
    description: 'מחלקה מובילה למדעי המחשב בדרום',
    website: 'https://www.cs.bgu.ac.il'
  },
  {
    id: 'bgu-psychology',
    nameHebrew: 'המחלקה לפסיכולוגיה',
    nameEnglish: 'Department of Psychology',
    institutionId: 'bgu',
    description: 'מחלקה מובילה לפסיכולוגיה קלינית וחינוכית',
    website: 'https://psychology.bgu.ac.il'
  },
  
  // בר אילן
  {
    id: 'biu-cs',
    nameHebrew: 'המחלקה למדעי המחשב',
    nameEnglish: 'Department of Computer Science',
    institutionId: 'biu',
    description: 'מחלקה למדעי המחשב עם דגש על יישומים',
    website: 'https://cs.biu.ac.il'
  },
  {
    id: 'biu-psychology',
    nameHebrew: 'המחלקה לפסיכולוגיה',
    nameEnglish: 'Department of Psychology',
    institutionId: 'biu',
    description: 'מחלקה לפסיכולוגיה עם זהות יהודית',
    website: 'https://psychology.biu.ac.il'
  },
  
  // חיפה
  {
    id: 'haifa-cs',
    nameHebrew: 'המחלקה למדעי המחשב',
    nameEnglish: 'Department of Computer Science',
    institutionId: 'haifa',
    description: 'מחלקה למדעי המחשב בצפון הארץ',
    website: 'https://cs.haifa.ac.il'
  },
  {
    id: 'haifa-psychology',
    nameHebrew: 'המחלקה לפסיכולוגיה',
    nameEnglish: 'Department of Psychology',
    institutionId: 'haifa',
    description: 'מחלקה לפסיכולוגיה רב-תרבותית',
    website: 'https://psychology.haifa.ac.il'
  },
  
  // אריאל
  {
    id: 'ariel-cs',
    nameHebrew: 'המחלקה למדעי המחשב',
    nameEnglish: 'Department of Computer Science',
    institutionId: 'ariel',
    description: 'מחלקה חדשנית למדעי המחשב',
    website: 'https://cs.ariel.ac.il'
  },
  {
    id: 'ariel-psychology',
    nameHebrew: 'המחלקה לפסיכולוגיה',
    nameEnglish: 'Department of Psychology',
    institutionId: 'ariel',
    description: 'מחלקה לפסיכולוגיה עם דגש יישומי',
    website: 'https://psychology.ariel.ac.il'
  }
];

export const programsData = [
  // תל אביב - מדעי המחשב
  {
    id: 'tau-cs-bachelor',
    nameHebrew: 'תואר ראשון במדעי המחשב',
    nameEnglish: 'Bachelor of Computer Science',
    type: 'COMPUTER_SCIENCE',
    degreeLevel: 'BACHELOR',
    institutionId: 'tau',
    facultyId: 'tau-cs',
    duration: 3,
    description: 'תוכנית מקיפה למדעי המחשב עם דגש על תיאוריה ויישומים',
    website: 'https://www.cs.tau.ac.il/undergraduate',
    isActive: true
  },
  {
    id: 'tau-psychology-bachelor',
    nameHebrew: 'תואר ראשון בפסיכולוגיה',
    nameEnglish: 'Bachelor of Psychology',
    type: 'PSYCHOLOGY',
    degreeLevel: 'BACHELOR',
    institutionId: 'tau',
    facultyId: 'tau-psychology',
    duration: 3,
    description: 'תוכנית מקיפה בפסיכולוגיה עם מחקר מתקדם',
    website: 'https://psychology.tau.ac.il/undergraduate',
    isActive: true
  },
  
  // האוניברסיטה העברית - מדעי המחשב
  {
    id: 'huji-cs-bachelor',
    nameHebrew: 'תואר ראשון במדעי המחשב',
    nameEnglish: 'Bachelor of Computer Science',
    type: 'COMPUTER_SCIENCE',
    degreeLevel: 'BACHELOR',
    institutionId: 'huji',
    facultyId: 'huji-cs',
    duration: 3,
    description: 'תוכנית מחקרית מובילה במדעי המחשב',
    website: 'https://www.cs.huji.ac.il/undergraduate',
    isActive: true
  },
  {
    id: 'huji-psychology-bachelor',
    nameHebrew: 'תואר ראשון בפסיכולוגיה',
    nameEnglish: 'Bachelor of Psychology',
    type: 'PSYCHOLOGY',
    degreeLevel: 'BACHELOR',
    institutionId: 'huji',
    facultyId: 'huji-psychology',
    duration: 3,
    description: 'תוכנית מחקרית מובילה בפסיכולוגיה',
    website: 'https://psychology.huji.ac.il/undergraduate',
    isActive: true
  },
  
  // טכניון - מדעי המחשב
  {
    id: 'technion-cs-bachelor',
    nameHebrew: 'תואר ראשון במדעי המחשב',
    nameEnglish: 'Bachelor of Computer Science',
    type: 'COMPUTER_SCIENCE',
    degreeLevel: 'BACHELOR',
    institutionId: 'technion',
    facultyId: 'technion-cs',
    duration: 4,
    description: 'תוכנית הנדסית מתקדמת במדעי המחשב',
    website: 'https://www.cs.technion.ac.il/undergraduate',
    isActive: true
  },
  
  // בן גוריון
  {
    id: 'bgu-cs-bachelor',
    nameHebrew: 'תואר ראשון במדעי המחשב',
    nameEnglish: 'Bachelor of Computer Science',
    type: 'COMPUTER_SCIENCE',
    degreeLevel: 'BACHELOR',
    institutionId: 'bgu',
    facultyId: 'bgu-cs',
    duration: 3,
    description: 'תוכנית חדשנית במדעי המחשב עם דגש על מחקר',
    website: 'https://www.cs.bgu.ac.il/undergraduate',
    isActive: true
  },
  {
    id: 'bgu-psychology-bachelor',
    nameHebrew: 'תואר ראשון בפסיכולוגיה',
    nameEnglish: 'Bachelor of Psychology',
    type: 'PSYCHOLOGY',
    degreeLevel: 'BACHELOR',
    institutionId: 'bgu',
    facultyId: 'bgu-psychology',
    duration: 3,
    description: 'תוכנית פסיכולוגיה עם דגש קלינוי וחינוכי',
    website: 'https://psychology.bgu.ac.il/undergraduate',
    isActive: true
  },
  
  // בר אילן
  {
    id: 'biu-cs-bachelor',
    nameHebrew: 'תואר ראשון במדעי המחשב',
    nameEnglish: 'Bachelor of Computer Science',
    type: 'COMPUTER_SCIENCE',
    degreeLevel: 'BACHELOR',
    institutionId: 'biu',
    facultyId: 'biu-cs',
    duration: 3,
    description: 'תוכנית מדעי המחשב עם ערכי יהדות',
    website: 'https://cs.biu.ac.il/undergraduate',
    isActive: true
  },
  {
    id: 'biu-psychology-bachelor',
    nameHebrew: 'תואר ראשון בפסיכולוגיה',
    nameEnglish: 'Bachelor of Psychology',
    type: 'PSYCHOLOGY',
    degreeLevel: 'BACHELOR',
    institutionId: 'biu',
    facultyId: 'biu-psychology',
    duration: 3,
    description: 'תוכנית פסיכולוגיה עם זהות יהודית',
    website: 'https://psychology.biu.ac.il/undergraduate',
    isActive: true
  },
  
  // חיפה
  {
    id: 'haifa-cs-bachelor',
    nameHebrew: 'תואר ראשון במדעי המחשב',
    nameEnglish: 'Bachelor of Computer Science',
    type: 'COMPUTER_SCIENCE',
    degreeLevel: 'BACHELOR',
    institutionId: 'haifa',
    facultyId: 'haifa-cs',
    duration: 3,
    description: 'תוכנית מדעי המחשב רב-תרבותית',
    website: 'https://cs.haifa.ac.il/undergraduate',
    isActive: true
  },
  {
    id: 'haifa-psychology-bachelor',
    nameHebrew: 'תואר ראשון בפסיכולוגיה',
    nameEnglish: 'Bachelor of Psychology',
    type: 'PSYCHOLOGY',
    degreeLevel: 'BACHELOR',
    institutionId: 'haifa',
    facultyId: 'haifa-psychology',
    duration: 3,
    description: 'תוכנית פסיכולוגיה רב-תרבותית',
    website: 'https://psychology.haifa.ac.il/undergraduate',
    isActive: true
  },
  
  // אריאל
  {
    id: 'ariel-cs-bachelor',
    nameHebrew: 'תואר ראשון במדעי המחשב',
    nameEnglish: 'Bachelor of Computer Science',
    type: 'COMPUTER_SCIENCE',
    degreeLevel: 'BACHELOR',
    institutionId: 'ariel',
    facultyId: 'ariel-cs',
    duration: 3,
    description: 'תוכנית חדשנית ויישומית במדעי המחשב',
    website: 'https://cs.ariel.ac.il/undergraduate',
    isActive: true
  },
  {
    id: 'ariel-psychology-bachelor',
    nameHebrew: 'תואר ראשון בפסיכולוגיה',
    nameEnglish: 'Bachelor of Psychology',
    type: 'PSYCHOLOGY',
    degreeLevel: 'BACHELOR',
    institutionId: 'ariel',
    facultyId: 'ariel-psychology',
    duration: 3,
    description: 'תוכנית פסיכולוגיה עם דגש יישומי',
    website: 'https://psychology.ariel.ac.il/undergraduate',
    isActive: true
  }
]; 