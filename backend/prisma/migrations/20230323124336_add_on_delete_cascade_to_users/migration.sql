-- DropForeignKey
ALTER TABLE `AchievementsOnUsers` DROP FOREIGN KEY `AchievementsOnUsers_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ChallengesOnUsers` DROP FOREIGN KEY `ChallengesOnUsers_invitedById_fkey`;

-- DropForeignKey
ALTER TABLE `ChallengesOnUsers` DROP FOREIGN KEY `ChallengesOnUsers_userId_fkey`;

-- DropForeignKey
ALTER TABLE `TokenBlacklistedOnUsers` DROP FOREIGN KEY `TokenBlacklistedOnUsers_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserGroupsOnUsers` DROP FOREIGN KEY `UserGroupsOnUsers_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserStravaProfile` DROP FOREIGN KEY `UserStravaProfile_userId_fkey`;

-- AddForeignKey
ALTER TABLE `UserStravaProfile` ADD CONSTRAINT `UserStravaProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TokenBlacklistedOnUsers` ADD CONSTRAINT `TokenBlacklistedOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGroupsOnUsers` ADD CONSTRAINT `UserGroupsOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChallengesOnUsers` ADD CONSTRAINT `ChallengesOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChallengesOnUsers` ADD CONSTRAINT `ChallengesOnUsers_invitedById_fkey` FOREIGN KEY (`invitedById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AchievementsOnUsers` ADD CONSTRAINT `AchievementsOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
