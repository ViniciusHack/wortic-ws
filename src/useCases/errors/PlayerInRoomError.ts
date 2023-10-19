export class PlayerInRoomError extends Error {
  constructor() {
    super('Player already joined.')
  }
}
