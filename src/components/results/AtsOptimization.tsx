import type{ AnalysisResult } from '../../types'
import { buildPresenceChecklist } from '../../lib/constants'

interface Props {
  result: AnalysisResult
  resumeText?: string
}

const AtsOptimization = ({ result, resumeText = '' }: Props) => {
  const checklist = buildPresenceChecklist(resumeText)

  return (
    <div className="bg-linear-to-br from-slate-800/60 to-slate-700/40 rounded-2xl p-6 border border-slate-600/50">

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
          <span className="text-lg">🤖</span>
        </div>
        <h3 className="text-white text-lg font-semibold">ATS Optimization</h3>
      </div>

      <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20 mb-4">
        <p className="text-blue-400 font-semibold text-sm mb-1">What is ATS?</p>
        <p className="text-slate-300 text-sm leading-relaxed">
          <span className="text-blue-300 font-medium">Applicant Tracking Systems (ATS)</span> are software tools used by 75%+ of employers to automatically screen resumes before human review. These systems scan for keywords, proper formatting, and relevant qualifications to rank candidates. If your resume isn't ATS-friendly, it may never reach a human recruiter.
        </p>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span>✅</span>
          <h4 className="text-white font-semibold text-sm">ATS Compatibility Checklist</h4>
        </div>
        <div className="space-y-2">
          {checklist.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-slate-200 text-sm">
              <span className={item.present ? 'text-green-400' : 'text-red-400'}>
                {item.present ? '☑' : '☐'}
              </span>
              <span className={item.present ? 'text-slate-200' : 'text-slate-400'}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-linear-to-r from-violet-500/10 to-violet-600/5 rounded-xl border border-violet-500/20 p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span>📋</span>
          <h4 className="text-violet-400 font-semibold text-sm">ATS Requirements</h4>
        </div>
        <div className="space-y-2">
          {result.atsChecklist.map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-violet-400 mt-0.5 shrink-0">•</span>
              <p className="text-slate-300 text-sm">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <span>🔑</span>
          <h4 className="text-white font-semibold text-sm">Recommended Keywords</h4>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {result.keywords.map((keyword, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-linear-to-r from-blue-500/20 to-blue-600/10 text-blue-300 rounded-xl border border-blue-500/30 font-medium text-sm transition-all duration-300 hover:scale-110 hover:bg-blue-500/30 cursor-default"
            >
              {keyword}
            </span>
          ))}
        </div>
        <div className="bg-linear-to-r from-emerald-500/10 to-emerald-600/5 rounded-xl border border-emerald-500/20 p-3">
          <p className="text-slate-300 text-sm">
            💡 Consider incorporating these keywords naturally into your resume to improve ATS compatibility and increase your chances of getting noticed by recruiters.
          </p>
        </div>
      </div>

    </div>
  )
}

export default AtsOptimization