/*
  Warnings:

  - Added the required column `personId` to the `Follower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personId` to the `Following` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Follower` ADD COLUMN `personId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Following` ADD COLUMN `personId` VARCHAR(191) NOT NULL;
