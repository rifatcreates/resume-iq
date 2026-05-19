import * as pdfjsLib from 'pdfjs-dist'
import type { TextItem, TextMarkedContent } from 'pdfjs-dist/types/src/display/api'

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`

export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
      useWorkerFetch: false,
      useSystemFonts: true
    }).promise

    let fullText = ''

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items
        .map((item: TextItem | TextMarkedContent) =>
          'str' in item ? item.str : ''
        )
        .join(' ')
      fullText += pageText + '\n'
    }

    return fullText.trim()
  } catch (err) {
    console.error('PDF extraction error:', err)
    throw new Error('Failed to read PDF. Please try a different file.', { cause: err })
  }
}