import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import prismadb from '@/lib/prismadb'

export const POST = async (request: Request) => {
  // console.log('api called')
  // return new NextResponse('Api called', { status: 200 })
  try {
    const { userId } = auth()
    if (!userId) return new NextResponse('Unauthorized', { status: 401 })

    const body = await request.json()
    const { name } = body
    if (!name)  return new NextResponse('Name is required', { status: 400 })

    const store = await prismadb.store.create({
      data: { name, userId }
    })

    return NextResponse.json(store)
  } 
  catch (err: any) {
    console.log('STORES_POST', err.message, err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
