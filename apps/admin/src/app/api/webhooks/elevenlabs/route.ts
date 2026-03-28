import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  // Handle ElevenLabs session end / transcript
  const { event, session_id, transcript } = body

  switch (event) {
    case 'session_end':
      // Save transcript to database
      // Generate ticket if needed
      break

    case 'transcript_ready':
      // Process transcript and extract actionable items
      break
  }

  return NextResponse.json({ received: true })
}
