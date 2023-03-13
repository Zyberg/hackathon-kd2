/*
  Warnings:

  - You are about to drop the column `userId` on the `Role` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Role` DROP FOREIGN KEY `Role_userId_fkey`;

-- AlterTable
ALTER TABLE `Role` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `roleId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_roleId_key` ON `User`(`roleId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
