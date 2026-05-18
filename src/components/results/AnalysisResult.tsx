import type {AnalysisResult as AnalysisResultType} from '../../types'
import ExecutiveSummary from './ExecutiveSummary'
import PerformanceMetrics from './PerformanceMetrics'
import ScoreCard from './ScoreCard'
import StrengthsImprovements from './StrengthsImprovements'
import ResumeInsights from './ResumeInsights'
import AtsOptimization from './AtsOptimization'

interface Props {
    result: AnalysisResultType,
    fileName: string,
    resumeText: string,
    onNewAnalysis: () => void
}

const AnalysisResult = ({result, fileName, resumeText, onNewAnalysis}: Props) => {
    return(
        <div className='max-w-4xl max-auto space-y-6'>
            <ScoreCard result={result} fileName={fileName} onNewAnalysis={onNewAnalysis}/>
            <StrengthsImprovements result={result}/>
            <ExecutiveSummary result={result}/>
            <PerformanceMetrics result={result}/>
            <ResumeInsights result={result} />
            <AtsOptimization result={result} resumeText={resumeText} />
        </div>
    )
}

export default AnalysisResult