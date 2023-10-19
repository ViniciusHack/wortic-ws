// export interface IRoom {
//   id: string;
//   owner: IUser;
//   name: string;
//   image_url: string;
//   stats: {
//     hits: number;
//     failures: number;
//   }
//   official: boolean;
//   reset_hour: number;
//   current_word: RoomWord;
//   all_words: RoomWord[];
//   created_at: string;
//   updated_at: string;
// }

import { RoomWord } from '@prisma/client'

export interface IUser {
  id: string
  name: string
  email: string
  avatar_url: string
}

export type TagValue = 'new' | 'official' | 'hot' | 'all'

export interface IFilter {
  tag: TagValue
  value: string
}

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
