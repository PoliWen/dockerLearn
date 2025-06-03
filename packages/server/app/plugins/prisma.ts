import prisma from '../prisma'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.prisma = prisma
})
