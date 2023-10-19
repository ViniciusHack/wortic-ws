import { prisma } from '../../lib/prisma'
import { CreateWithWordsParams, RoomsRepository } from '../RoomsRepository'

export class PrismaRoomsRepository implements RoomsRepository {
  async createWithWords({ room, words }: CreateWithWordsParams) {
    const createdRoom = await prisma.room.create({
      data: {
        ...room,
        words: {
          createMany: {
            data: words,
          },
        },
      },
    })
    return createdRoom
  }

  async findById(id: string) {
    const room = await prisma.room.findUnique({
      where: {
        id,
      },
    })

    return room
  }
}
