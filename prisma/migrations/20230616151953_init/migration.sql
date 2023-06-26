/*
  Warnings:

  - Added the required column `rt_hash` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Account` ADD COLUMN `rt_hash` VARCHAR(191) NOT NULL;
