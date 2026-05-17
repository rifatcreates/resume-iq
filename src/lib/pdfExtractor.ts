import * as pdfjsLib from 'pdfjs-dist'
import type { TextItem, TextMarkedContent } from 'pdfjs-dist/types/src/display/api'

const workerUrl = new URL(
  '../../node_modules/pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
)

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl.href

export const extractTextFromPDF = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

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
}