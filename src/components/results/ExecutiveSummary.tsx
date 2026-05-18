import type{ AnalysisResult } from '../../types'

interface Props {
  result: AnalysisResult
}

const ExecutiveSummary = ({ result }: Props) => {
  return (
    <div className="bg-linear-to-br from-slate-800/60 to-slate-700/40 rounded-2xl p-6 border border-slate-600/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
          <span className="text-lg">📋</span>
        </div>
        <h3 className="text-white text-lg font-semibold">Executive Summary</h3>
      </div>
      <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
        <p className="text-slate-300 text-sm leading-relaxed">{result.summary}</p>
      </div>
    </div>
  )
}

export default ExecutiveSummary