import type{ AnalysisResult } from '../../types'

interface Props {
  result: AnalysisResult
}

const StrengthsImprovements = ({ result }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div className="bg-linear-to-br from-green-500/10 to-green-600/5 border border-green-500/30 p-6 rounded-2xl">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
            <span className="text-2xl">✅</span>
          </div>
        </div>
        <h3 className="text-green-400 font-semibold text-center text-sm uppercase tracking-wider mb-4">
          Top Strengths
        </h3>
        <div className="space-y-2">
          {result.strengths.map((strength, index) => (
            <div
              key={index}
              className="flex items-start gap-2 bg-green-500/10 rounded-lg px-3 py-2 border border-green-500/20 hover:bg-green-500/20 transition-all duration-200"
            >
              <span className="text-green-400 mt-0.5 shrink-0">•</span>
              <p className="text-slate-200 text-sm">{strength}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-linear-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/30 p-6 rounded-2xl">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
            <span className="text-2xl">⚡</span>
          </div>
        </div>
        <h3 className="text-orange-400 font-semibold text-center text-sm uppercase tracking-wider mb-4">
          Main Improvements
        </h3>
        <div className="space-y-2">
          {result.improvements.map((improvement, index) => (
            <div
              key={index}
              className="flex items-start gap-2 bg-orange-500/10 rounded-lg px-3 py-2 border border-orange-500/20 hover:bg-orange-500/20 transition-all duration-200"
            >
              <span className="text-orange-400 mt-0.5 shrink-0">•</span>
              <p className="text-slate-200 text-sm">{improvement}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default StrengthsImprovements