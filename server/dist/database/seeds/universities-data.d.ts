export declare const institutionsData: {
    id: string;
    nameHebrew: string;
    nameEnglish: string;
    city: string;
    website: string;
    logoUrl: string;
    description: string;
    establishedYear: number;
}[];
export declare const facultiesData: {
    id: string;
    nameHebrew: string;
    nameEnglish: string;
    institutionId: string;
    description: string;
    website: string;
}[];
export declare const programsData: {
    id: string;
    nameHebrew: string;
    nameEnglish: string;
    type: string;
    degreeLevel: string;
    institutionId: string;
    facultyId: string;
    duration: number;
    description: string;
    website: string;
    isActive: boolean;
}[];
export declare const requirementsData: ({
    programId: string;
    type: string;
    minScore: number;
    maxScore: number;
    description: string;
    isRequired: boolean;
    weight: number;
    subjectName?: undefined;
    requiredLevel?: undefined;
} | {
    programId: string;
    type: string;
    subjectName: string;
    minScore: number;
    maxScore: number;
    requiredLevel: string;
    description: string;
    isRequired: boolean;
    weight: number;
} | {
    programId: string;
    type: string;
    requiredLevel: string;
    minScore: number;
    maxScore: number;
    description: string;
    isRequired: boolean;
    weight: number;
    subjectName?: undefined;
})[];
//# sourceMappingURL=universities-data.d.ts.map