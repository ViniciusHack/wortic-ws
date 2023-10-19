import { Prisma, Room, RoomWord } from '@prisma/client'

export interface CreateWithWordsParams {
  room: Prisma.RoomUncheckedCreateInput
  words: Omit<RoomWord, 'roomId'>[]
}

export interface RoomsRepository {
  createWithWords({ room, words }: CreateWithWordsParams): Promise<Room>
  findById(id: string): Promise<Room | null>
}
