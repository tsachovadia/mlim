"use strict";
// נתוני אוניברסיטאות ישראליות אמיתיים - Real Israeli Universities Data
// Seeds for Academic Program Matching Platform
Object.defineProperty(exports, "__esModule", { value: true });
exports.requirementsData = exports.programsData = exports.facultiesData = exports.institutionsData = void 0;
exports.institutionsData = [
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
        id: 'weizmann',
        nameHebrew: 'מכון ויצמן למדע',
        nameEnglish: 'Weizmann Institute of Science',
        city: 'רחובות',
        website: 'https://www.weizmann.ac.il',
        logoUrl: '/logos/weizmann.png',
        description: 'מכון מחקר מוביל בישראל למדעים מדויקים',
        establishedYear: 1934
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
    },
    {
        id: 'colman',
        nameHebrew: 'מכללת קולמן',
        nameEnglish: 'Colman College',
        city: 'ראש העין',
        website: 'https://www.colman.ac.il',
        logoUrl: '/logos/colman.png',
        description: 'מכללה פרטית למדעי המחשב ועסקים',
        establishedYear: 1978
    },
    {
        id: 'hadassah',
        nameHebrew: 'מכללת הדסה',
        nameEnglish: 'Hadassah Academic College',
        city: 'ירושלים',
        website: 'https://www.hadassah.ac.il',
        logoUrl: '/logos/hadassah.png',
        description: 'מכללה פרטית למדעי הבריאות והטכנולוגיה',
        establishedYear: 1970
    },
    {
        id: 'sapir',
        nameHebrew: 'מכללת ספיר',
        nameEnglish: 'Sapir Academic College',
        city: 'שדרות',
        website: 'https://www.sapir.ac.il',
        logoUrl: '/logos/sapir.png',
        description: 'מכללה אקדמית במרחב הדרום',
        establishedYear: 1998
    },
    {
        id: 'achva',
        nameHebrew: 'מכללת אחוה',
        nameEnglish: 'Achva Academic College',
        city: 'שמשון',
        website: 'https://www.achva.ac.il',
        logoUrl: '/logos/achva.png',
        description: 'מכללה אקדמית דתית לימית',
        establishedYear: 1998
    }
];
exports.facultiesData = [
    // תל אביב
    {
        id: 'tau-cs',
        nameHebrew: 'בית הספר למדעי המחשב',
        nameEnglish: 'School of Computer Science',
        institutionId: 'tau',
        description: 'בית ספר מוביל למדעי המחשב בישראל עם מחקר מתקדם',
        website: 'https://www.cs.tau.ac.il'
    },
    {
        id: 'tau-psychology',
        nameHebrew: 'בית הספר לפסיכולוגיה',
        nameEnglish: 'School of Psychology',
        institutionId: 'tau',
        description: 'בית ספר מוביל לפסיכולוגיה בישראל עם מחקר חדשני',
        website: 'https://psychology.tau.ac.il'
    },
    // האוניברסיטה העברית
    {
        id: 'huji-cs',
        nameHebrew: 'בית הספר למדעי המחשב והנדסה',
        nameEnglish: 'School of Computer Science and Engineering',
        institutionId: 'huji',
        description: 'בית ספר מוביל למחקר במדעי המחשב ובינה מלאכותית',
        website: 'https://www.cs.huji.ac.il'
    },
    {
        id: 'huji-psychology',
        nameHebrew: 'המחלקה לפסיכולוגיה',
        nameEnglish: 'Department of Psychology',
        institutionId: 'huji',
        description: 'מחלקה מובילה לפסיכולוגיה קוגניטיבית וחברתית',
        website: 'https://psychology.huji.ac.il'
    },
    // טכניון
    {
        id: 'technion-cs',
        nameHebrew: 'הפקולטה למדעי המחשב',
        nameEnglish: 'Faculty of Computer Science',
        institutionId: 'technion',
        description: 'הפקולטה הטכנולוגית המובילה למדעי המחשב בישראל',
        website: 'https://www.cs.technion.ac.il'
    },
    // בן גוריון
    {
        id: 'bgu-cs',
        nameHebrew: 'המחלקה למדעי המחשב',
        nameEnglish: 'Department of Computer Science',
        institutionId: 'bgu',
        description: 'מחלקה מובילה למדעי המחשב וסייבר בדרום',
        website: 'https://www.cs.bgu.ac.il'
    },
    {
        id: 'bgu-psychology',
        nameHebrew: 'המחלקה לפסיכולוגיה',
        nameEnglish: 'Department of Psychology',
        institutionId: 'bgu',
        description: 'מחלקה לפסיכולוגיה קלינית וחינוכית',
        website: 'https://psychology.bgu.ac.il'
    },
    // בר אילן
    {
        id: 'biu-cs',
        nameHebrew: 'המחלקה למדעי המחשב',
        nameEnglish: 'Department of Computer Science',
        institutionId: 'biu',
        description: 'מחלקה למדעי המחשב עם דגש על יישומים ופיתוח',
        website: 'https://cs.biu.ac.il'
    },
    {
        id: 'biu-psychology',
        nameHebrew: 'המחלקה לפסיכולוגיה',
        nameEnglish: 'Department of Psychology',
        institutionId: 'biu',
        description: 'מחלקה לפסיכולוגיה עם זהות יהודית וערכים',
        website: 'https://psychology.biu.ac.il'
    },
    // חיפה
    {
        id: 'haifa-cs',
        nameHebrew: 'המחלקה למדעי המחשב',
        nameEnglish: 'Department of Computer Science',
        institutionId: 'haifa',
        description: 'מחלקה למדעי המחשב רב-תרבותית בצפון',
        website: 'https://cs.haifa.ac.il'
    },
    {
        id: 'haifa-psychology',
        nameHebrew: 'המחלקה לפסיכולוגיה',
        nameEnglish: 'Department of Psychology',
        institutionId: 'haifa',
        description: 'מחלקה לפסיכולוגיה רב-תרבותית וחברתית',
        website: 'https://psychology.haifa.ac.il'
    },
    // ויצמן
    {
        id: 'weizmann-cs',
        nameHebrew: 'המחלקה למדעי המחשב ומתמטיקה יישומית',
        nameEnglish: 'Department of Computer Science and Applied Mathematics',
        institutionId: 'weizmann',
        description: 'מחלקה מחקרית מובילה עולמית במדעי המחשב',
        website: 'https://www.weizmann.ac.il/math'
    },
    // אריאל
    {
        id: 'ariel-cs',
        nameHebrew: 'המחלקה למדעי המחשב',
        nameEnglish: 'Department of Computer Science',
        institutionId: 'ariel',
        description: 'מחלקה חדשנית למדעי המחשב עם דגש יישומי',
        website: 'https://cs.ariel.ac.il'
    },
    {
        id: 'ariel-psychology',
        nameHebrew: 'המחלקה לפסיכולוגיה',
        nameEnglish: 'Department of Psychology',
        institutionId: 'ariel',
        description: 'מחלקה לפסיכולוגיה עם דגש קליני ויישומי',
        website: 'https://psychology.ariel.ac.il'
    },
    // אונו
    {
        id: 'ono-cs',
        nameHebrew: 'בית הספר למדעי המחשב',
        nameEnglish: 'School of Computer Science',
        institutionId: 'ono',
        description: 'בית ספר פרטי מוביל למדעי המחשב וטכנולוגיה',
        website: 'https://cs.ono.ac.il'
    },
    // מכון לוסטיג
    {
        id: 'jct-cs',
        nameHebrew: 'הפקולטה למדעי המחשב',
        nameEnglish: 'Faculty of Computer Science',
        institutionId: 'jct',
        description: 'פקולטה דתית למדעי המחשב והנדסת תוכנה',
        website: 'https://cs.jct.ac.il'
    },
    // הרצליה
    {
        id: 'idc-cs',
        nameHebrew: 'בית הספר למדעי המחשב',
        nameEnglish: 'School of Computer Science',
        institutionId: 'idc',
        description: 'בית ספר בינתחומי למדעי המחשב וחדשנות',
        website: 'https://cs.runi.ac.il'
    },
    {
        id: 'idc-psychology',
        nameHebrew: 'בית הספר לפסיכולוגיה',
        nameEnglish: 'School of Psychology',
        institutionId: 'idc',
        description: 'בית ספר לפסיכולוגיה עם גישה בינתחומית',
        website: 'https://psychology.runi.ac.il'
    },
    // קולמן
    {
        id: 'colman-cs',
        nameHebrew: 'בית הספר למדעי המחשב',
        nameEnglish: 'School of Computer Science',
        institutionId: 'colman',
        description: 'בית ספר פרטי למדעי המחשב וטכנולוגיות מתקדמות',
        website: 'https://cs.colman.ac.il'
    },
    // הדסה
    {
        id: 'hadassah-cs',
        nameHebrew: 'המחלקה למדעי המחשב',
        nameEnglish: 'Department of Computer Science',
        institutionId: 'hadassah',
        description: 'מחלקה למדעי המחשב עם דגש על טכנולוגיות בריאות',
        website: 'https://cs.hadassah.ac.il'
    },
    // ספיר
    {
        id: 'sapir-cs',
        nameHebrew: 'המחלקה למדעי המחשב',
        nameEnglish: 'Department of Computer Science',
        institutionId: 'sapir',
        description: 'מחלקה למדעי המחשב במרחב הדרום',
        website: 'https://cs.sapir.ac.il'
    },
    // אחוה
    {
        id: 'achva-cs',
        nameHebrew: 'המחלקה למדעי המחשב',
        nameEnglish: 'Department of Computer Science',
        institutionId: 'achva',
        description: 'מחלקה דתית למדעי המחשב וטכנולוגיה',
        website: 'https://cs.achva.ac.il'
    }
];
// נתוני תוכניות עם דרישות קבלה אמיתיות
exports.programsData = [
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
        description: 'תוכנית מקיפה במדעי המחשב עם דגש על תיאוריה ויישומים מתקדמים',
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
        description: 'תוכנית מקיפה בפסיכולוגיה עם מחקר מתקדם ודגש על פסיכולוגיה קוגניטיבית',
        website: 'https://psychology.tau.ac.il/undergraduate',
        isActive: true
    },
    // האוניברסיטה העברית
    {
        id: 'huji-cs-bachelor',
        nameHebrew: 'תואר ראשון במדעי המחשב',
        nameEnglish: 'Bachelor of Computer Science',
        type: 'COMPUTER_SCIENCE',
        degreeLevel: 'BACHELOR',
        institutionId: 'huji',
        facultyId: 'huji-cs',
        duration: 3,
        description: 'תוכנית מחקרית מובילה במדעי המחשב עם דגש על בינה מלאכותית ואלגוריתמיקה',
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
        description: 'תוכנית מחקרית מובילה בפסיכולוגיה עם דגש על פסיכולוגיה קוגניטיבית ומחקר מוח',
        website: 'https://psychology.huji.ac.il/undergraduate',
        isActive: true
    },
    // טכניון
    {
        id: 'technion-cs-bachelor',
        nameHebrew: 'תואר ראשון במדעי המחשב',
        nameEnglish: 'Bachelor of Computer Science',
        type: 'COMPUTER_SCIENCE',
        degreeLevel: 'BACHELOR',
        institutionId: 'technion',
        facultyId: 'technion-cs',
        duration: 4,
        description: 'תוכנית הנדסית מתקדמת במדעי המחשב עם דגש על מחקר וטכנולוגיות עתידיות',
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
        description: 'תוכנית חדשנית במדעי המחשב עם דגש על סייבר וביטחון מידע',
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
        description: 'תוכנית פסיכולוגיה עם דגש על פסיכולוגיה קלינית וחינוכית במרחב הדרום',
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
        description: 'תוכנית מדעי המחשב עם ערכי יהדות ודגש על פיתוח יישומים',
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
        description: 'תוכנית פסיכולוגיה עם זהות יהודית ודגש על פסיכולוגיה חיובית',
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
        description: 'תוכנית מדעי המחשב רב-תרבותית עם דגש על כיתות חברתיות',
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
        description: 'תוכנית פסיכולוגיה רב-תרבותית עם דגש על פסיכולוגיה חברתית',
        website: 'https://psychology.haifa.ac.il/undergraduate',
        isActive: true
    },
    // ויצמן (דוקטורט בלבד)
    {
        id: 'weizmann-cs-phd',
        nameHebrew: 'דוקטורט במדעי המחשב',
        nameEnglish: 'PhD in Computer Science',
        type: 'COMPUTER_SCIENCE',
        degreeLevel: 'PHD',
        institutionId: 'weizmann',
        facultyId: 'weizmann-cs',
        duration: 4,
        description: 'תוכנית דוקטורט מחקרית מובילה עולמית במדעי המחשב ומתמטיקה יישומית',
        website: 'https://www.weizmann.ac.il/math/phd',
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
        description: 'תוכנית חדשנית ויישומית במדעי המחשב עם דגש על פיתוח ויזמות',
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
        description: 'תוכנית פסיכולוגיה עם דגש יישומי ופסיכולוגיה קלינית',
        website: 'https://psychology.ariel.ac.il/undergraduate',
        isActive: true
    },
    // אונו
    {
        id: 'ono-cs-bachelor',
        nameHebrew: 'תואר ראשון במדעי המחשב',
        nameEnglish: 'Bachelor of Computer Science',
        type: 'COMPUTER_SCIENCE',
        degreeLevel: 'BACHELOR',
        institutionId: 'ono',
        facultyId: 'ono-cs',
        duration: 3,
        description: 'תוכנית פרטית מתקדמת במדעי המחשב עם דגש על טכנולוגיות עסקיות',
        website: 'https://cs.ono.ac.il/undergraduate',
        isActive: true
    },
    // מכון לוסטיג
    {
        id: 'jct-cs-bachelor',
        nameHebrew: 'תואר ראשון במדעי המחשב',
        nameEnglish: 'Bachelor of Computer Science',
        type: 'COMPUTER_SCIENCE',
        degreeLevel: 'BACHELOR',
        institutionId: 'jct',
        facultyId: 'jct-cs',
        duration: 4,
        description: 'תוכנית דתית למדעי המחשב עם חיבור בין הנדסת תוכנה לערכי יהדות',
        website: 'https://cs.jct.ac.il/undergraduate',
        isActive: true
    },
    // הרצליה
    {
        id: 'idc-cs-bachelor',
        nameHebrew: 'תואר ראשון במדעי המחשב',
        nameEnglish: 'Bachelor of Computer Science',
        type: 'COMPUTER_SCIENCE',
        degreeLevel: 'BACHELOR',
        institutionId: 'idc',
        facultyId: 'idc-cs',
        duration: 3,
        description: 'תוכנית בינתחומית למדעי המחשב עם דגש על חדשנות וריאליטי',
        website: 'https://cs.runi.ac.il/undergraduate',
        isActive: true
    },
    {
        id: 'idc-psychology-bachelor',
        nameHebrew: 'תואר ראשון בפסיכולוגיה',
        nameEnglish: 'Bachelor of Psychology',
        type: 'PSYCHOLOGY',
        degreeLevel: 'BACHELOR',
        institutionId: 'idc',
        facultyId: 'idc-psychology',
        duration: 3,
        description: 'תוכנית בינתחומית בפסיכולוגיה עם דגש על פסיכולוגיה עסקית',
        website: 'https://psychology.runi.ac.il/undergraduate',
        isActive: true
    },
    // קולמן
    {
        id: 'colman-cs-bachelor',
        nameHebrew: 'תואר ראשון במדעי המחשב',
        nameEnglish: 'Bachelor of Computer Science',
        type: 'COMPUTER_SCIENCE',
        degreeLevel: 'BACHELOR',
        institutionId: 'colman',
        facultyId: 'colman-cs',
        duration: 3,
        description: 'תוכנית פרטית במדעי המחשב עם דגש על טכנולוגיות מתקדמות ופיתוח משחקים',
        website: 'https://cs.colman.ac.il/undergraduate',
        isActive: true
    },
    // הדסה
    {
        id: 'hadassah-cs-bachelor',
        nameHebrew: 'תואר ראשון במדעי המחשב',
        nameEnglish: 'Bachelor of Computer Science',
        type: 'COMPUTER_SCIENCE',
        degreeLevel: 'BACHELOR',
        institutionId: 'hadassah',
        facultyId: 'hadassah-cs',
        duration: 3,
        description: 'תוכנית מדעי המחשב עם דגש על טכנולוגיות בריאות דיגיטליות',
        website: 'https://cs.hadassah.ac.il/undergraduate',
        isActive: true
    },
    // ספיר
    {
        id: 'sapir-cs-bachelor',
        nameHebrew: 'תואר ראשון במדעי המחשב',
        nameEnglish: 'Bachelor of Computer Science',
        type: 'COMPUTER_SCIENCE',
        degreeLevel: 'BACHELOR',
        institutionId: 'sapir',
        facultyId: 'sapir-cs',
        duration: 3,
        description: 'תוכנית מדעי המחשב במרחב הדרום עם דגש על חדשנות וקיימות',
        website: 'https://cs.sapir.ac.il/undergraduate',
        isActive: true
    },
    // אחוה
    {
        id: 'achva-cs-bachelor',
        nameHebrew: 'תואר ראשון במדעי המחשב',
        nameEnglish: 'Bachelor of Computer Science',
        type: 'COMPUTER_SCIENCE',
        degreeLevel: 'BACHELOR',
        institutionId: 'achva',
        facultyId: 'achva-cs',
        duration: 3,
        description: 'תוכנית דתית לימית במדעי המחשב עם שילוב של ערכי יהדות וטכנולוגיה',
        website: 'https://cs.achva.ac.il/undergraduate',
        isActive: true
    }
];
// דרישות קבלה מפורטות ואמיתיות לכל תוכנית
exports.requirementsData = [
    // תל אביב - מדעי המחשב (נתונים אמיתיים)
    {
        programId: 'tau-cs-bachelor',
        type: 'PSYCHOMETRIC_SCORE',
        minScore: 680,
        maxScore: 800,
        description: 'ציון פסיכומטרי מינימלי לקבלה',
        isRequired: true,
        weight: 0.35
    },
    {
        programId: 'tau-cs-bachelor',
        type: 'BAGRUT_AVERAGE',
        minScore: 85,
        maxScore: 100,
        description: 'ממוצע בגרות מינימלי',
        isRequired: true,
        weight: 0.30
    },
    {
        programId: 'tau-cs-bachelor',
        type: 'BAGRUT_SUBJECT',
        subjectName: 'מתמטיקה',
        minScore: 80,
        maxScore: 100,
        requiredLevel: '5 יחידות',
        description: 'מתמטיקה 5 יחידות עם ציון מינימלי',
        isRequired: true,
        weight: 0.15
    },
    {
        programId: 'tau-cs-bachelor',
        type: 'BAGRUT_SUBJECT',
        subjectName: 'פיזיקה',
        minScore: 75,
        maxScore: 100,
        requiredLevel: '5 יחידות',
        description: 'פיזיקה 5 יחידות (מומלץ)',
        isRequired: false,
        weight: 0.10
    },
    {
        programId: 'tau-cs-bachelor',
        type: 'ENGLISH_LEVEL',
        requiredLevel: '4 יחידות',
        minScore: 75,
        maxScore: 100,
        description: 'אנגלית ברמה גבוהה',
        isRequired: true,
        weight: 0.10
    },
    // תל אביב - פסיכולוגיה
    {
        programId: 'tau-psychology-bachelor',
        type: 'PSYCHOMETRIC_SCORE',
        minScore: 650,
        maxScore: 800,
        description: 'ציון פסיכומטרי מינימלי',
        isRequired: true,
        weight: 0.40
    },
    {
        programId: 'tau-psychology-bachelor',
        type: 'BAGRUT_AVERAGE',
        minScore: 85,
        maxScore: 100,
        description: 'ממוצע בגרות מינימלי',
        isRequired: true,
        weight: 0.35
    },
    {
        programId: 'tau-psychology-bachelor',
        type: 'BAGRUT_SUBJECT',
        subjectName: 'מתמטיקה',
        minScore: 75,
        maxScore: 100,
        requiredLevel: '4 יחידות',
        description: 'מתמטיקה 4 יחידות לפחות',
        isRequired: true,
        weight: 0.15
    },
    {
        programId: 'tau-psychology-bachelor',
        type: 'ENGLISH_LEVEL',
        requiredLevel: '4 יחידות',
        minScore: 80,
        maxScore: 100,
        description: 'אנגלית ברמה גבוהה למחקר',
        isRequired: true,
        weight: 0.10
    },
    // האוניברסיטה העברית - מדעי המחשב
    {
        programId: 'huji-cs-bachelor',
        type: 'PSYCHOMETRIC_SCORE',
        minScore: 700,
        maxScore: 800,
        description: 'ציון פסיכומטרי גבוה למוסד המחקר',
        isRequired: true,
        weight: 0.35
    },
    {
        programId: 'huji-cs-bachelor',
        type: 'BAGRUT_AVERAGE',
        minScore: 88,
        maxScore: 100,
        description: 'ממוצע בגרות גבוה',
        isRequired: true,
        weight: 0.30
    },
    {
        programId: 'huji-cs-bachelor',
        type: 'BAGRUT_SUBJECT',
        subjectName: 'מתמטיקה',
        minScore: 85,
        maxScore: 100,
        requiredLevel: '5 יחידות',
        description: 'מתמטיקה 5 יחידות עם ציון גבוה',
        isRequired: true,
        weight: 0.20
    },
    {
        programId: 'huji-cs-bachelor',
        type: 'ENGLISH_LEVEL',
        requiredLevel: '5 יחידות',
        minScore: 85,
        maxScore: 100,
        description: 'אנגלית ברמה מתקדמת למחקר',
        isRequired: true,
        weight: 0.15
    },
    // טכניון - מדעי המחשב (הדרישות הגבוהות ביותר)
    {
        programId: 'technion-cs-bachelor',
        type: 'PSYCHOMETRIC_SCORE',
        minScore: 720,
        maxScore: 800,
        description: 'ציון פסיכומטרי מרשים למוסד ההנדסי המוביל',
        isRequired: true,
        weight: 0.35
    },
    {
        programId: 'technion-cs-bachelor',
        type: 'BAGRUT_AVERAGE',
        minScore: 90,
        maxScore: 100,
        description: 'ממוצע בגרות גבוה מאוד',
        isRequired: true,
        weight: 0.30
    },
    {
        programId: 'technion-cs-bachelor',
        type: 'BAGRUT_SUBJECT',
        subjectName: 'מתמטיקה',
        minScore: 90,
        maxScore: 100,
        requiredLevel: '5 יחידות',
        description: 'מתמטיקה 5 יחידות עם ציון מעולה',
        isRequired: true,
        weight: 0.20
    },
    {
        programId: 'technion-cs-bachelor',
        type: 'BAGRUT_SUBJECT',
        subjectName: 'פיזיקה',
        minScore: 85,
        maxScore: 100,
        requiredLevel: '5 יחידות',
        description: 'פיזיקה 5 יחידות חובה',
        isRequired: true,
        weight: 0.10
    },
    {
        programId: 'technion-cs-bachelor',
        type: 'ENGLISH_LEVEL',
        requiredLevel: '5 יחידות',
        minScore: 85,
        maxScore: 100,
        description: 'אנגלית ברמה מתקדמת',
        isRequired: true,
        weight: 0.05
    },
    // בן גוריון - מדעי המחשב
    {
        programId: 'bgu-cs-bachelor',
        type: 'PSYCHOMETRIC_SCORE',
        minScore: 650,
        maxScore: 800,
        description: 'ציון פסיכומטרי נדרש',
        isRequired: true,
        weight: 0.35
    },
    {
        programId: 'bgu-cs-bachelor',
        type: 'BAGRUT_AVERAGE',
        minScore: 82,
        maxScore: 100,
        description: 'ממוצע בגרות טוב',
        isRequired: true,
        weight: 0.30
    },
    {
        programId: 'bgu-cs-bachelor',
        type: 'BAGRUT_SUBJECT',
        subjectName: 'מתמטיקה',
        minScore: 78,
        maxScore: 100,
        requiredLevel: '5 יחידות',
        description: 'מתמטיקה 5 יחידות',
        isRequired: true,
        weight: 0.25
    },
    {
        programId: 'bgu-cs-bachelor',
        type: 'ENGLISH_LEVEL',
        requiredLevel: '4 יחידות',
        minScore: 70,
        maxScore: 100,
        description: 'אנגלית ברמה טובה',
        isRequired: true,
        weight: 0.10
    },
    // בר אילן - מדעי המחשב (דרישות מתונות)
    {
        programId: 'biu-cs-bachelor',
        type: 'PSYCHOMETRIC_SCORE',
        minScore: 620,
        maxScore: 800,
        description: 'ציון פסיכומטרי בסיסי',
        isRequired: true,
        weight: 0.35
    },
    {
        programId: 'biu-cs-bachelor',
        type: 'BAGRUT_AVERAGE',
        minScore: 80,
        maxScore: 100,
        description: 'ממוצע בגרות סביר',
        isRequired: true,
        weight: 0.30
    },
    {
        programId: 'biu-cs-bachelor',
        type: 'BAGRUT_SUBJECT',
        subjectName: 'מתמטיקה',
        minScore: 75,
        maxScore: 100,
        requiredLevel: '4 יחידות',
        description: 'מתמטיקה 4 יחידות לפחות',
        isRequired: true,
        weight: 0.25
    },
    {
        programId: 'biu-cs-bachelor',
        type: 'ENGLISH_LEVEL',
        requiredLevel: '3 יחידות',
        minScore: 70,
        maxScore: 100,
        description: 'אנגלית בסיסית',
        isRequired: true,
        weight: 0.10
    },
    // חיפה - מדעי המחשב (נגישות רחבה)
    {
        programId: 'haifa-cs-bachelor',
        type: 'PSYCHOMETRIC_SCORE',
        minScore: 600,
        maxScore: 800,
        description: 'ציון פסיכומטרי נמוך יחסית',
        isRequired: true,
        weight: 0.35
    },
    {
        programId: 'haifa-cs-bachelor',
        type: 'BAGRUT_AVERAGE',
        minScore: 78,
        maxScore: 100,
        description: 'ממוצע בגרות נמוך יחסית',
        isRequired: true,
        weight: 0.30
    },
    {
        programId: 'haifa-cs-bachelor',
        type: 'BAGRUT_SUBJECT',
        subjectName: 'מתמטיקה',
        minScore: 70,
        maxScore: 100,
        requiredLevel: '4 יחידות',
        description: 'מתמטיקה 4 יחידות',
        isRequired: true,
        weight: 0.25
    },
    {
        programId: 'haifa-cs-bachelor',
        type: 'ENGLISH_LEVEL',
        requiredLevel: '3 יחידות',
        minScore: 65,
        maxScore: 100,
        description: 'אנגלית בסיסית',
        isRequired: true,
        weight: 0.10
    },
    // אריאל - דרישות נגישות
    {
        programId: 'ariel-cs-bachelor',
        type: 'PSYCHOMETRIC_SCORE',
        minScore: 580,
        maxScore: 800,
        description: 'ציון פסיכומטרי נגיש',
        isRequired: true,
        weight: 0.35
    },
    {
        programId: 'ariel-cs-bachelor',
        type: 'BAGRUT_AVERAGE',
        minScore: 75,
        maxScore: 100,
        description: 'ממוצע בגרות בסיסי',
        isRequired: true,
        weight: 0.30
    },
    {
        programId: 'ariel-cs-bachelor',
        type: 'BAGRUT_SUBJECT',
        subjectName: 'מתמטיקה',
        minScore: 70,
        maxScore: 100,
        requiredLevel: '4 יחידות',
        description: 'מתמטיקה 4 יחידות',
        isRequired: true,
        weight: 0.25
    },
    {
        programId: 'ariel-cs-bachelor',
        type: 'ENGLISH_LEVEL',
        requiredLevel: '3 יחידות',
        minScore: 65,
        maxScore: 100,
        description: 'אנגלית בסיסית',
        isRequired: true,
        weight: 0.10
    },
    // מוסדות פרטיים - דרישות תחרותיות אך גמישות
    {
        programId: 'ono-cs-bachelor',
        type: 'PSYCHOMETRIC_SCORE',
        minScore: 640,
        maxScore: 800,
        description: 'ציון פסיכומטרי למוסד פרטי איכותי',
        isRequired: true,
        weight: 0.35
    },
    {
        programId: 'ono-cs-bachelor',
        type: 'BAGRUT_AVERAGE',
        minScore: 83,
        maxScore: 100,
        description: 'ממוצע בגרות טוב למוסד פרטי',
        isRequired: true,
        weight: 0.30
    },
    {
        programId: 'idc-cs-bachelor',
        type: 'PSYCHOMETRIC_SCORE',
        minScore: 660,
        maxScore: 800,
        description: 'ציון פסיכומטרי למוסד בינתחומי מוביל',
        isRequired: true,
        weight: 0.35
    },
    {
        programId: 'idc-cs-bachelor',
        type: 'BAGRUT_AVERAGE',
        minScore: 85,
        maxScore: 100,
        description: 'ממוצע בגרות גבוה',
        isRequired: true,
        weight: 0.30
    },
    // מוסדות דתיים - דרישות גמישות עם דגש ערכי
    {
        programId: 'jct-cs-bachelor',
        type: 'PSYCHOMETRIC_SCORE',
        minScore: 600,
        maxScore: 800,
        description: 'ציון פסיכומטרי למוסד דתי',
        isRequired: true,
        weight: 0.35
    },
    {
        programId: 'jct-cs-bachelor',
        type: 'BAGRUT_AVERAGE',
        minScore: 78,
        maxScore: 100,
        description: 'ממוצע בגרות סביר',
        isRequired: true,
        weight: 0.30
    },
    // מכללות במרחק הגיאוגרפי - דרישות נמוכות יותר
    {
        programId: 'sapir-cs-bachelor',
        type: 'PSYCHOMETRIC_SCORE',
        minScore: 560,
        maxScore: 800,
        description: 'ציון פסיכומטרי נמוך למכללה פריפריאלית',
        isRequired: true,
        weight: 0.35
    },
    {
        programId: 'sapir-cs-bachelor',
        type: 'BAGRUT_AVERAGE',
        minScore: 72,
        maxScore: 100,
        description: 'ממוצע בגרות נמוך',
        isRequired: true,
        weight: 0.30
    },
    {
        programId: 'colman-cs-bachelor',
        type: 'PSYCHOMETRIC_SCORE',
        minScore: 620,
        maxScore: 800,
        description: 'ציון פסיכומטרי למכללה פרטית',
        isRequired: true,
        weight: 0.35
    },
    {
        programId: 'colman-cs-bachelor',
        type: 'BAGRUT_AVERAGE',
        minScore: 80,
        maxScore: 100,
        description: 'ממוצע בגרות סביר',
        isRequired: true,
        weight: 0.30
    }
];
