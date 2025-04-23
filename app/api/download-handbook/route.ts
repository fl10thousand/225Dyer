import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'tenant-handbook.pdf')
    
    console.log('Attempting to access file:', filePath)

    try {
      await fs.access(filePath)
      console.log('File found successfully')
    } catch (error) {
      console.error('File not found:', filePath, error)
      return new NextResponse(
        'PDF file not found on the server',
        { status: 404 }
      )
    }

    console.log('Reading file...')
    const fileBuffer = await fs.readFile(filePath)
    
    if (fileBuffer.length === 0) {
      console.error('File is empty:', filePath)
      return new NextResponse(
        'PDF file is empty',
        { status: 500 }
      )
    }

    console.log('File read successfully, size:', fileBuffer.length, 'bytes')

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="225-Dyer-Tenant-Handbook.pdf"'
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
