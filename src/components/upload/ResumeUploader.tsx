import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '../../components/ui/button'

interface ResumeUploaderProps {
  onUpload: (file: File) => void
}

const ResumeUploader = ({ onUpload }: ResumeUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setSelectedFile(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
  })

  const handleRemove = () => {
    setSelectedFile(null)
  }

  const handleAnalyze = () => {
    if (selectedFile) {
      onUpload(selectedFile)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">

      {!selectedFile ? (
        /* Drop Zone */
        <div
          {...getRootProps()}
          className={`bg-slate-800/50 rounded-xl p-8 border-2 border-dashed transition-all duration-300 cursor-pointer text-center
            ${isDragActive
              ? 'border-teal-400 bg-teal-500/10 shadow-lg shadow-teal-500/20'
              : 'border-slate-600/50 hover:border-teal-500/50 hover:bg-slate-700/50'
            }`}
        >
          <input {...getInputProps()} />

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-teal-500/20 to-sky-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📄</span>
          </div>

          {isDragActive ? (
            <>
              <p className="text-teal-400 text-lg font-semibold mb-1">
                Drop your resume here!
              </p>
              <p className="text-slate-400 text-sm">Release to upload</p>
            </>
          ) : (
            <>
              <p className="text-white text-lg font-semibold mb-1">
                Upload Your Resume
              </p>
              <p className="text-slate-400 text-sm mb-6">
                Drag & drop your PDF here, or click to browse
              </p>
              <Button className="bg-linear-to-r from-teal-500 to-sky-500 text-white font-semibold hover:opacity-80 transition cursor-pointer">
                Choose PDF File
              </Button>
              <p className="text-slate-500 text-xs mt-4">
                PDF files only • Maximum 10MB
              </p>
            </>
          )}
        </div>

      ) : (
        /* File Selected State */
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-600/50">

          {/* File Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-teal-500/20 to-sky-500/20 border border-teal-500/30 flex items-center justify-center shrink-0">
              <span className="text-2xl">📄</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">
                {selectedFile.name}
              </p>
              <p className="text-slate-400 text-sm">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • PDF
              </p>
            </div>
            <button
              onClick={handleRemove}
              className="text-slate-400 hover:text-red-400 transition cursor-pointer text-xl shrink-0"
            >
              ✕
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleRemove}
              className="flex-1 bg-slate-700/50 text-slate-300 border border-slate-600/50 hover:bg-slate-600/50 transition cursor-pointer"
            >
              Choose Different File
            </Button>
            <Button
              onClick={handleAnalyze}
              className="flex-1 bg-linear-to-r from-teal-500 to-sky-500 text-white font-semibold hover:opacity-80 transition cursor-pointer"
            >
              Analyze Resume ✨
            </Button>
          </div>

        </div>
      )}

    </div>
  )
}

export default ResumeUploader