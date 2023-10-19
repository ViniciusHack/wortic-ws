import { RoomWord } from '@prisma/client'

export interface RoomWordsRepository {
  findManyByRoom(roomId: string): Promise<RoomWord[]>
}
