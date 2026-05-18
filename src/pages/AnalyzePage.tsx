import { useState } from 'react'
import { toast } from 'sonner'
import Header from '../components/layout/Header'
import ResumeUploader from '../components/upload/ResumeUploader'
import { useAnalyzeResume } from '../hooks/useAnalyzeResume'
import type { AnalysisResult } from '../types'
import AnalysisResultComponent from '../components/results/AnalysisResult'

type AnalyzeView = 'upload' | 'loading' | 'result'

const AnalyzePage = () => {
  const [currentView, setCurrentView] = useState<AnalyzeView>('upload')
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [fileName, setFileName] = useState('')
  const [resumeText, setResumeText] = useState('')

  const { mutate: analyzeResume } = useAnalyzeResume()

  const handleUpload = (file: File) => {
    setCurrentView('loading')

    analyzeResume(file, {
      onSuccess: (data) => {
        setAnalysisResult(data.result)
        setFileName(data.fileName)
        setResumeText(data.resumeText)
        setCurrentView('result')
        toast.success('Analysis complete!')
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Analysis failed. Please try again.')
        setCurrentView('upload')
      },
    })
  }

  const handleNewAnalysis = () => {
    setAnalysisResult(null)
    setFileName('')
    setCurrentView('upload')
  }

  return (
    <div className="min-h-screen bg-main-gradient">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">

        {currentView === 'upload' && (
          <>
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-white mb-3">
                AI Resume Analyzer
              </h2>
              <p className="text-slate-400">
                Upload your PDF resume and get instant AI-powered feedback
              </p>
            </div>
            <ResumeUploader onUpload={handleUpload} />
          </>
        )}

        {currentView === 'loading' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="w-16 h-16 border-4 border-teal-500/30 border-t-teal-400 rounded-full animate-spin" />
            <h3 className="text-white text-2xl font-semibold">
              Analyzing Your Resume
            </h3>
            <p className="text-slate-400">
              Please wait while AI reviews your resume...
            </p>
          </div>
        )}

        {currentView === 'result' && analysisResult && (
          <div className="flex justify-center px-4">
            <div className="w-full max-w-4xl">
              <AnalysisResultComponent
                result={analysisResult}
                fileName={fileName}
                resumeText={resumeText}
                onNewAnalysis={handleNewAnalysis}
              />
            </div>
        </div>
        )}

      </div>
    </div>
  )
}

export default AnalyzePage