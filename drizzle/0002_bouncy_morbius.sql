CREATE TABLE `budgets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`clientName` varchar(255) NOT NULL,
	`clientEmail` varchar(320),
	`projectTitle` varchar(255) NOT NULL,
	`description` text,
	`amount` varchar(100) NOT NULL,
	`currency` varchar(10) NOT NULL DEFAULT 'BRL',
	`items` text,
	`status` enum('draft','sent','approved','rejected','finalized') NOT NULL DEFAULT 'draft',
	`validUntil` timestamp,
	`approvedAt` timestamp,
	`finalizedProjectId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `budgets_id` PRIMARY KEY(`id`)
);
