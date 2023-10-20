import { RoomWS } from '@/types'
import { RoomWordsRepository } from '../repositories/RoomWordsRepository'
import { RoomsRepository } from '../repositories/RoomsRepository'
import { PlayerInRoomError } from './errors/PlayerInRoomError'
import { RoomNotFoundError } from './errors/RoomNotFoundError'

interface JoinRoomUseCaseParams {
  roomId: string
  rooms: Map<string, RoomWS>
  user: {
    name: string
    image: string
    email: string
  }
}

export class JoinRoomUseCase {
  constructor(
    private wordsRepository: RoomWordsRepository,
    private roomsRepository: RoomsRepository,
  ) {}

  async execute({ rooms, roomId, user }: JoinRoomUseCaseParams) {
    let room = rooms.get(roomId)
    const player = {
      name: user.name,
      image: user.image,
      score: 0,
      status: 'doing' as const,
      email: user.email,
    }

    if (!room) {
      const roomWords = await this.wordsRepository.findManyByRoom(roomId)
      const roomDetails = await this.roomsRepository.findById(roomId)

      if (!roomDetails) {
        throw new RoomNotFoundError()
      }

      room = {
        players: [player],
        timeLeft: 0,
        currentHits: 0,
        currentWord: '',
        words: roomWords,
        maxGameTime: roomDetails.gameTime,
        winnerScore: roomDetails.winnerScore,
      }
    } else {
      if (
        room.players.some((roomPlayer) => roomPlayer.email === player.email)
      ) {
        throw new PlayerInRoomError()
      }
      room.players.push(player)
    }

    return { room }
  }
}
