import { Player } from '@prisma/client'

export interface PlayersRepository {
  findByEmail(email: string): Promise<Player | null>
}
