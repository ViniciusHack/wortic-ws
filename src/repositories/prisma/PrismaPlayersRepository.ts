import { prisma } from '../../lib/prisma'
import { PlayersRepository } from '../PlayersRepository'

export class PrismaPlayersRepository implements PlayersRepository {
  async findByEmail(email: string) {
    const player = await prisma.player.findUnique({
      where: {
        email,
      },
    })

    return player
  }
}
