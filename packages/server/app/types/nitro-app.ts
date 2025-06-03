import type { NitroAsyncContext } from 'nitropack/types'
import type prisma from '../prisma'

declare module 'nitropack/types' {
  interface NitroApp {
    prisma: typeof prisma
  }
}

export type H3Event = NitroAsyncContext['event']
