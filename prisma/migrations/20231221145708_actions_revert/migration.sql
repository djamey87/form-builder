/*
  Warnings:

  - You are about to drop the `Action` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_questionId_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "responseValueActions" JSONB NOT NULL DEFAULT '{}';

-- DropTable
DROP TABLE "Action";
