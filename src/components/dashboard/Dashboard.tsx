import { useAuth } from '../../hooks/useAuth'
import { useHistory } from '../../hooks/useHistory'
import { Button } from '../../components/ui/button'
import { useNavigate } from 'react-router-dom'
import HistoryCard from './HistoryCard'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { data: analyses, isLoading } = useHistory()

  const getNameFromEmail = (email: string) => {
    const namePart = email.split('@')[0]
    const parts = namePart.split('.')
    return parts
      .map((part) => {
        const word = part.replace(/[0-9]/g, '')
        return word.charAt(0).toUpperCase() + word.slice(1)
      })
      .filter((part) => part.length > 0)
      .join(' ')
  }

  const name = getNameFromEmail(user?.email || '')

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

      <div className="mb-8 pt-2 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          Welcome Back, {name}! 👋
        </h2>
        <p className="text-slate-400">
          Ready to analyze your resume?
        </p>
      </div>

      <div className="bg-linear-to-br from-teal-500/10 to-sky-500/10 border border-teal-500/20 rounded-2xl p-8 mb-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-teal-500/20 to-sky-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">📄</span>
        </div>
        <h3 className="text-white text-xl font-semibold mb-2">
          Analyze Your Resume
        </h3>
        <p className="text-slate-400 mb-6 text-sm">
          Upload your PDF resume and get instant AI-powered feedback
        </p>
        <Button
          onClick={() => navigate('/analyze')}
          className="bg-linear-to-r from-teal-500 to-sky-500 text-white font-semibold hover:opacity-80 transition cursor-pointer px-8"
        >
          Start New Analysis
        </Button>
      </div>

      <div>
        <h3 className="text-white text-xl font-semibold mb-4">
          📊 Previous Analyses
        </h3>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-teal-500/30 border-t-teal-400 rounded-full animate-spin" />
          </div>
        ) : analyses && analyses.length > 0 ? (
          <div className="space-y-3">
            {analyses.map((analysis) => (
              <HistoryCard key={analysis.id} analysis={analysis} />
            ))}
          </div>
        ) : (
          <div className="bg-linear-to-br from-slate-800/60 to-slate-700/40 border border-slate-600/50 rounded-2xl p-12 text-center">
            <span className="text-5xl mb-4 block">📭</span>
            <p className="text-slate-400 text-lg mb-2">No analyses yet</p>
            <p className="text-slate-500 text-sm">
              Your resume analysis history will appear here
            </p>
          </div>
        )}
      </div>

    </div>
  )
}

export default Dashboard