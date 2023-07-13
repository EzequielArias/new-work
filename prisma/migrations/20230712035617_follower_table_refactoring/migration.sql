/*
  Warnings:

  - The primary key for the `Follower` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accountId` on the `Follower` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Follower` table. All the data in the column will be lost.
  - You are about to drop the column `personId` on the `Follower` table. All the data in the column will be lost.
  - You are about to drop the `Following` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `follower_id` to the `Follower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `following_id` to the `Follower` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Follower` DROP FOREIGN KEY `Follower_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `Following` DROP FOREIGN KEY `Following_accountId_fkey`;

-- AlterTable
ALTER TABLE `Account` MODIFY `image` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `Follower` DROP PRIMARY KEY,
    DROP COLUMN `accountId`,
    DROP COLUMN `id`,
    DROP COLUMN `personId`,
    ADD COLUMN `follower_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `following_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`follower_id`, `following_id`);

-- DropTable
DROP TABLE `Following`;

-- AddForeignKey
ALTER TABLE `Follower` ADD CONSTRAINT `Follower_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follower` ADD CONSTRAINT `Follower_following_id_fkey` FOREIGN KEY (`following_id`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
