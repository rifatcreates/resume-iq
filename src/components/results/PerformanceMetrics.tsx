import type{ AnalysisResult } from '../../types'
import { METRIC_CONFIG } from '../../lib/constants'

interface Props {
  result: AnalysisResult
}

const PerformanceMetrics = ({ result }: Props) => {
  return (
    <div className="bg-linear-to-br from-slate-800/60 to-slate-700/40 rounded-2xl p-6 border border-slate-600/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
          <span className="text-lg">📊</span>
        </div>
        <h3 className="text-white text-lg font-semibold">Performance Metrics</h3>
      </div>
      <div className="space-y-4">
        {METRIC_CONFIG.map((metric) => {
          const value = result.performanceMetrics[metric.key as keyof typeof result.performanceMetrics]
          return (
            <div key={metric.key} className="group/item">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span>{metric.icon}</span>
                  <span className="text-slate-300 text-sm">{metric.label}</span>
                </div>
                <span className="text-white font-semibold text-sm">{value}/10</span>
              </div>
              <div className="w-full h-4 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/30">
                <div
                  className={`h-full bg-linear-to-r ${metric.colorClass} rounded-full transition-all duration-1000`}
                  style={{ width: `${(value / 10) * 100}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PerformanceMetrics