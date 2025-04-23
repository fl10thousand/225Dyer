import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'parking-application.pdf')
    
    try {
      await fs.access(filePath)
    } catch {
      console.error('File not found:', filePath)
      return new NextResponse(
        'PDF file not found on the server',
        { status: 404 }
      )
    }

    const fileBuffer = await fs.readFile(filePath)
    
    if (fileBuffer.length === 0) {
      console.error('File is empty:', filePath)
      return new NextResponse(
        'PDF file is empty',
        { status: 500 }
      )
    }

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Clifford-Street-Garage-Parking-Application.pdf"'
      }
    })
  } catch (error) {
    console.error('Error serving PDF:', error)
    return new NextResponse(
      `Error serving PDF: ${error.message}`,
      { status: 500 }
    )
  }
}
