-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sid` VARCHAR(191) NOT NULL,
    `data` TEXT NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sid_key`(`sid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserStravaProfile` (
    `id_strava` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `accessToken` TEXT NOT NULL,
    `refreshToken` TEXT NOT NULL,
    `data` JSON NULL,

    UNIQUE INDEX `UserStravaProfile_userId_key`(`userId`),
    PRIMARY KEY (`id_strava`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserGroupsOnUsers` (
    `userGroupId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedBy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userGroupId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Challenge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL,
    `unitId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChallengesOnUsers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `challengeId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `invitedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `invitedById` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Achievement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `imagePath` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `max_users` INTEGER NOT NULL DEFAULT -1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AchievementsOnUsers` (
    `achievementId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`achievementId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PointsOnUserChallenge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` DOUBLE NOT NULL DEFAULT 0,
    `userChallengeId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChallengeUnit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserStravaProfile` ADD CONSTRAINT `UserStravaProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGroupsOnUsers` ADD CONSTRAINT `UserGroupsOnUsers_userGroupId_fkey` FOREIGN KEY (`userGroupId`) REFERENCES `UserGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGroupsOnUsers` ADD CONSTRAINT `UserGroupsOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Challenge` ADD CONSTRAINT `Challenge_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `ChallengeUnit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChallengesOnUsers` ADD CONSTRAINT `ChallengesOnUsers_challengeId_fkey` FOREIGN KEY (`challengeId`) REFERENCES `Challenge`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChallengesOnUsers` ADD CONSTRAINT `ChallengesOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChallengesOnUsers` ADD CONSTRAINT `ChallengesOnUsers_invitedById_fkey` FOREIGN KEY (`invitedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AchievementsOnUsers` ADD CONSTRAINT `AchievementsOnUsers_achievementId_fkey` FOREIGN KEY (`achievementId`) REFERENCES `Achievement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AchievementsOnUsers` ADD CONSTRAINT `AchievementsOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PointsOnUserChallenge` ADD CONSTRAINT `PointsOnUserChallenge_userChallengeId_fkey` FOREIGN KEY (`userChallengeId`) REFERENCES `ChallengesOnUsers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;