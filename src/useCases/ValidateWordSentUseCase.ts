import { RoomWS } from '@/io'

interface ValidateWordSentUseCaseParams {
  rooms: Map<string, RoomWS>
  roomId: string
  wordSent: string
  user: {
    email: string
  }
}

export class ValidateWordSentUseCase {
  async execute({
    rooms,
    roomId,
    wordSent,
    user,
  }: ValidateWordSentUseCaseParams) {
    const room = rooms.get(roomId)!
    let answer = room.currentWord

    const letters = wordSent.split('')

    const lettersWithRightPlace = letters.map((letter, index) => {
      if (answer[index] === letter.toLowerCase()) {
        answer = answer.replace(letter.toLowerCase(), '-')
        return {
          letter,
          rightPlace: true,
        }
      }
      return {
        letter,
        rightPlace: null,
      }
    })

    const positionsFormatted = lettersWithRightPlace.map((letter, index) => {
      if (letter.rightPlace) return letter
      if (answer.includes(letter.letter.toLowerCase())) {
        answer = answer.replace(letter.letter.toLowerCase(), '-')
        return {
          letter,
          rightPlace: false,
        }
      } else {
        return {
          letter,
          rightPlace: null,
        }
      }
    })

    let playerIndex = null
    if (positionsFormatted.every((position) => position.rightPlace)) {
      playerIndex = room.players.findIndex(
        (player) => player.email === user.email,
      )
    }

    return { positions: positionsFormatted, playerScoredIndex: playerIndex }
  }
}
