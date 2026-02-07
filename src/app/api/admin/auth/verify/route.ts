import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('admin_session')?.value

    if (!sessionToken) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }

    const result = verifySessionToken(sessionToken)

    if (!result.valid) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }

    return NextResponse.json({
      authenticated: true,
      username: result.username,
    })
  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    )
  }
}
