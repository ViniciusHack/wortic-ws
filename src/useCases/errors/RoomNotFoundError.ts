export class RoomNotFoundError extends Error {
  constructor() {
    super('Room not found.')
  }
}
