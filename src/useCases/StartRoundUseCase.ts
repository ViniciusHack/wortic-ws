import { RoomWS } from '@/io'

interface StartRoundUseCaseParams {
  rooms: Map<string, RoomWS>
  roomId: string
  emit: (timeLeft: number) => void
  onEndRound: (reason: 'timeout' | 'hits') => void
}

export class StartRoundUseCase {
  async execute({ rooms, roomId, emit, onEndRound }: StartRoundUseCaseParams) {
    let room = rooms.get(roomId)!
    const randomIndex = Math.floor(Math.random() * room.words.length)

    room = {
      ...room,
      currentHits: 0,
      timeLeft: room.maxGameTime * 1000,
      currentWord: room.words[randomIndex].content.toLowerCase(),
    }

    room.interval = setInterval(() => {
      if (room.timeLeft <= 0) {
        onEndRound('timeout')
      } else {
        room.timeLeft -= 1000
        emit(room.timeLeft)
      }
    }, 1000)

    return { room }
  }
}
