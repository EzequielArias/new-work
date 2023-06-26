-- CreateTable
CREATE TABLE `Type_rol` (
    `id` VARCHAR(191) NOT NULL,
    `rol` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Type_rol_rol_key`(`rol`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `followers` JSON NOT NULL,
    `Type_rol_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Account_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_Type_rol_id_fkey` FOREIGN KEY (`Type_rol_id`) REFERENCES `Type_rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
