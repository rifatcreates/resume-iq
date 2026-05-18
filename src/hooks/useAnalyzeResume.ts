import { useMutation } from '@tanstack/react-query'
import { geminiModel } from '../lib/gemini'
import { extractTextFromPDF } from '../lib/pdfExtractor'
import { supabase } from '../lib/supabase'
import type { AnalysisResult } from '../types'
import constants from '../lib/constants'

export const useAnalyzeResume = () => {
  return useMutation({
    mutationFn: async (file: File) => {

      const text = await extractTextFromPDF(file)

      if (!text || text.length < 50) {
        throw new Error('Could not extract text from PDF. Please try a different file.')
      }

      const prompt = constants.ANALYZE_RESUME_PROMPT.replace('{{DOCUMENT_TEXT}}', text)

      const result = await geminiModel.generateContent(prompt)
      const response = result.response.text()

      const cleanedResponse = response
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim()

      const parsed: AnalysisResult = JSON.parse(cleanedResponse)

      if (parsed.error) {
        throw new Error(parsed.error)
      }

      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const scoreNumber = parseInt(parsed.overallScore.split('/')[0])
        await supabase.from('analyses').insert({
          user_id: user.id,
          file_name: file.name,
          overall_score: scoreNumber,
          result_json: parsed,
        })
      }

      return { result: parsed, fileName: file.name, resumeText: text }
    },
  })
}