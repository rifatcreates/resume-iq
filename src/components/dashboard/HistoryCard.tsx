import type{ Analysis } from '../../types'
import { supabase } from '../../lib/supabase'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface Props {
  analysis: Analysis
}

const HistoryCard = ({ analysis }: Props) => {
  const queryClient = useQueryClient()

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400'
    if (score >= 6) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBg = (score: number) => {
    if (score >= 8) return 'bg-green-500/20 border-green-500/30'
    if (score >= 6) return 'bg-yellow-500/20 border-yellow-500/30'
    return 'bg-red-500/20 border-red-500/30'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const handleDelete = async () => {
    const { error } = await supabase
      .from('analyses')
      .delete()
      .eq('id', analysis.id)

    if (error) {
      toast.error('Failed to delete analysis')
      return
    }

    queryClient.invalidateQueries({ queryKey: ['analyses'] })
    toast.success('Analysis deleted')
  }

  return (
    <div className="bg-linear-to-br from-slate-800/60 to-slate-700/40 rounded-2xl p-5 border border-slate-600/50 hover:border-slate-500/70 transition-all duration-300">
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-teal-500/20 to-sky-500/20 border border-teal-500/30 flex items-center justify-center shrink-0">
            <span className="text-lg">📄</span>
          </div>
          <div className="min-w-0">
            <p className="text-white font-medium truncate">{analysis.file_name}</p>
            <p className="text-slate-400 text-sm">{formatDate(analysis.created_at)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className={`px-3 py-1 rounded-lg border text-sm font-semibold ${getScoreBg(analysis.overall_score)}`}>
            <span className={getScoreColor(analysis.overall_score)}>
              {analysis.overall_score}/10
            </span>
          </div>
          <button
            onClick={handleDelete}
            className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition flex items-center justify-center cursor-pointer text-sm"
          >
            🗑
          </button>
        </div>

      </div>
    </div>
  )
}

export default HistoryCard