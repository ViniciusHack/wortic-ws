import cors from '@fastify/cors'
import fastify from 'fastify'
import fastifySocketIO from 'fastify-socket.io'
import { decode } from 'next-auth/jwt'
import { Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { RoomController } from './controllers/RoomController'
import { env } from './env'
import { RoomWS } from './io'

export async function bootstrap() {
  const app = fastify()
  await app.register(cors, {
    origin: '*',
  })
  await app.register(fastifySocketIO, {
    cors: {
      origin: '*',
    },
  })
  const rooms = new Map<string, RoomWS>()

  const io = (app as any).io

  io.use(async (socket: Socket<any>, next: any) => {
    if (socket.handshake.query && socket.handshake.query.token) {
      try {
        const decoded = await decode({
          token: socket.handshake.query.token as string,
          secret: env.NEXTAUTH_SECRET,
        })

        if (!decoded) {
          return next(new Error('Authentication error'))
        }
        socket.data.user = {
          image: decoded.picture,
          email: decoded.email,
          name: decoded.name,
        }
        next()
      } catch (err) {
        console.error(err)
        return next(new Error('Authentication error'))
      }
    } else {
      return next(new Error('Authentication error'))
    }
  })

  io.on(
    'connection',
    async (
      socket: Socket<
        DefaultEventsMap,
        DefaultEventsMap,
        DefaultEventsMap,
        {
          user: {
            email: string
            name: string
            image: string
          }
        }
      >,
    ) => {
      socket.on('join_room', async (roomId: string) => {
        const roomController = new RoomController(
          io,
          socket,
          roomId,
          rooms,
          socket.data.user,
        )
        await roomController.join()

        socket.on('disconnect', async () => {
          await roomController.disconnect()
        })

        socket.on('send_word', async (wordSent: string) => {
          await roomController.wordAnalysis(wordSent)
        })
      })
    },
  )

  return app
}

async function main() {
  const app = await bootstrap()
  await app
    .listen({
      port: env.PORT,
      host: '0.0.0.0',
    })
    .then(() => {
      console.log(`🚀 Server is running on port ${env.PORT}`)
    })
}

main()
