/*
  Warnings:

  - The primary key for the `detail_handicraft` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_category` on the `handicraft` table. All the data in the column will be lost.
  - You are about to alter the column `role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum(EnumId(0))`.
  - You are about to drop the `category_craft` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `detai_recognition` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `detail_handicraft` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `detai_recognition` DROP FOREIGN KEY `detai_recognition_id_recognition_fkey`;

-- DropForeignKey
ALTER TABLE `detail_handicraft` DROP FOREIGN KEY `detail_handicraft_id_handicraft_fkey`;

-- DropForeignKey
ALTER TABLE `handicraft` DROP FOREIGN KEY `handicraft_id_category_fkey`;

-- AlterTable
ALTER TABLE `detail_handicraft` DROP PRIMARY KEY,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    MODIFY `id_handicraft` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `handicraft` DROP COLUMN `id_category`;

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user';

-- DropTable
DROP TABLE `category_craft`;

-- DropTable
DROP TABLE `detai_recognition`;

-- CreateTable
CREATE TABLE `tag` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `tag_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tag_handicraft` (
    `id` VARCHAR(191) NOT NULL,
    `id_handicraft` VARCHAR(255) NOT NULL,
    `id_tag` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `history_handicraft` (
    `id` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(255) NOT NULL,
    `id_handicraft` VARCHAR(255) NOT NULL,
    `done` BOOLEAN NOT NULL DEFAULT false,
    `step_number` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detail_recognition` (
    `id` VARCHAR(191) NOT NULL,
    `id_recognition` VARCHAR(255) NOT NULL,
    `id_waste` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `detail_handicraft` ADD CONSTRAINT `detail_handicraft_id_handicraft_fkey` FOREIGN KEY (`id_handicraft`) REFERENCES `handicraft`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tag_handicraft` ADD CONSTRAINT `tag_handicraft_id_handicraft_fkey` FOREIGN KEY (`id_handicraft`) REFERENCES `handicraft`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tag_handicraft` ADD CONSTRAINT `tag_handicraft_id_tag_fkey` FOREIGN KEY (`id_tag`) REFERENCES `tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `history_handicraft` ADD CONSTRAINT `history_handicraft_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `history_handicraft` ADD CONSTRAINT `history_handicraft_id_handicraft_fkey` FOREIGN KEY (`id_handicraft`) REFERENCES `handicraft`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_recognition` ADD CONSTRAINT `detail_recognition_id_recognition_fkey` FOREIGN KEY (`id_recognition`) REFERENCES `recognition`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
