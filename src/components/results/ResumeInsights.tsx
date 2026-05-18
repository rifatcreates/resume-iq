import type{ AnalysisResult } from '../../types'

interface Props {
  result: AnalysisResult
}

const ResumeInsights = ({ result }: Props) => {
  return (
    <div className="bg-linear-to-br from-slate-800/60 to-slate-700/40 rounded-2xl p-6 border border-slate-600/50">

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
          <span className="text-lg">🔮</span>
        </div>
        <h3 className="text-white text-lg font-semibold">Resume Insights</h3>
      </div>

      <div className="space-y-4">

        <div className="bg-linear-to-r from-cyan-500/10 to-cyan-600/5 rounded-xl border border-cyan-500/20 p-4">
          <div className="flex items-center gap-2 mb-3">
            <span>🎯</span>
            <h4 className="text-cyan-400 font-semibold text-sm">Action Items</h4>
          </div>
          <div className="space-y-2">
            {result.actionItems.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5 shrink-0">•</span>
                <p className="text-slate-300 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-linear-to-r from-emerald-500/10 to-emerald-600/5 rounded-xl border border-emerald-500/20 p-4">
          <div className="flex items-center gap-2 mb-3">
            <span>💡</span>
            <h4 className="text-emerald-400 font-semibold text-sm">Pro Tips</h4>
          </div>
          <div className="space-y-2">
            {result.proTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5 shrink-0">•</span>
                <p className="text-slate-300 text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default ResumeInsights