export interface PerformanceMetrics {
    formatting: number,
    contentQuality: number,
    atsCompatibility: number,
    keywordUsage: number,
    quantifiableAchievements: number
}

export interface AnalysisResult {
    overallScore: string
    strengths: string[]
    improvements: string[]
    keywords: string[]
    summary: string
    performanceMetrics: PerformanceMetrics
    actionItems: string[]
    proTips: string[]
    atsChecklist: string[]
    error?: string
}

export interface Analysis {
    id: string
    user_id: string
    file_name: string
    overall_score: number
    result_json: AnalysisResult
    created_at: string
}