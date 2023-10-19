import { RoomWord } from '@prisma/client'

type Status = 'done' | 'doing' | 'lost' | 'hosting'

export interface RoomPlayer {
  name: string
  image: string
  email: string
  score: number
  status: Status
}

export interface RoomWS {
  players: RoomPlayer[]
  currentHits: number
  timeLeft: number
  maxGameTime: number
  winnerScore: number
  currentWord: string
  interval?: NodeJS.Timeout
  words: RoomWord[]
}

// io.use((socket, next) => {
//   console.log(socket.handshake.query, env.NEXTAUTH_SECRET)
//   if (socket.handshake.query && socket.handshake.query.token) {
//     try {
//       const decoded = verify(
//         socket.handshake.query.token as string,
//         env.NEXTAUTH_SECRET,
//       )
//       console.log({ decoded })
//       socket.data.user = decoded
//       next()
//     } catch (err) {
//       console.error(err)
//       return next(new Error('Authentication error'))
//     }
//   } else {
//     return next(new Error('Authentication error'))
//   }
// })
