import { Badge } from '@/components/ui/badge'
import type{ AnalysisResult } from '@/types'

interface ScoreCardProps {
  result: AnalysisResult
  fileName: string
  onNewAnalysis: () => void
}

const ScoreCard = ({ result, fileName, onNewAnalysis }: ScoreCardProps) => {
  const scoreNumber = parseInt(result.overallScore.split('/')[0])

  const getScoreStatus = () => {
    if (scoreNumber >= 8) return { label: '🌟 Excellent', className: 'bg-green-500/20 text-green-300 border border-green-500/30' }
    if (scoreNumber >= 6) return { label: '👍 Good', className: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' }
    return { label: '📈 Needs Improvement', className: 'bg-red-500/20 text-red-300 border border-red-500/30' }
  }

  const getProgressColor = () => {
    if (scoreNumber >= 8) return 'from-green-400 to-emerald-400'
    if (scoreNumber >= 6) return 'from-yellow-400 to-orange-400'
    return 'from-red-400 to-pink-400'
  }

  const status = getScoreStatus()

  return (
    <div className="space-y-4">

      <div className="bg-linear-to-br from-slate-800/60 to-slate-700/40 rounded-2xl p-4 border border-slate-600/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-teal-500/20 to-sky-500/20 border border-teal-500/30 flex items-center justify-center shrink-0">
              <span className="text-lg">📄</span>
            </div>
            <div className="min-w-0">
              <p className="text-green-400 font-semibold text-sm">Analysis Complete</p>
              <p className="text-slate-400 text-xs truncate max-w-50">{fileName}</p>
            </div>
          </div>
          <button
            onClick={onNewAnalysis}
            className="px-4 py-2 bg-red-500/20 text-red-300 rounded-xl border border-red-500/30 hover:bg-red-500/30 transition text-sm cursor-pointer w-full sm:w-auto text-center"
          >
            ✖ New Analysis
          </button>
        </div>
      </div>

      {/* Score Card */}
      <div className="bg-linear-to-br from-cyan-500/30 via-blue-600/20 to-sky-900/40 rounded-2xl p-8 border border-sky-500/20 text-center">
        <h3 className="text-white text-xl font-semibold mb-4">🏆 Overall Score</h3>
        <p className="text-7xl font-bold text-teal-400 mb-4">
          {result.overallScore}
        </p>
        <Badge className={`${status.className} text-sm px-4 py-1 mb-6`}>
          {status.label}
        </Badge>
        <div className="w-full h-5 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/30 mt-4">
          <div
            className={`h-full bg-linear-to-r ${getProgressColor()} rounded-full transition-all duration-1000`}
            style={{ width: `${(scoreNumber / 10) * 100}%` }}
          />
        </div>
        <p className="text-slate-400 text-sm mt-3">
          Score based on content quality, formatting, and keyword usage
        </p>
      </div>

    </div>
  )
}

export default ScoreCard