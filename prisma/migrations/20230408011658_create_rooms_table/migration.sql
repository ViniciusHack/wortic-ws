/*
  Warnings:

  - Added the required column `updated_at` to the `players` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WordLevel" AS ENUM ('EASY', 'MEDIUM', 'HARD', 'EXTREME');

-- AlterTable
ALTER TABLE "players" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomWord" (
    "content" TEXT NOT NULL,
    "level" "WordLevel" NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "RoomWord_pkey" PRIMARY KEY ("content","roomId")
);

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomWord" ADD CONSTRAINT "RoomWord_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
