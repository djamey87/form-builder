-- CreateEnum
CREATE TYPE "ConditionType" AS ENUM ('AND', 'OR');

-- AlterEnum
ALTER TYPE "ActionType" ADD VALUE 'COMPLETE';

-- CreateTable
CREATE TABLE "Rule" (
    "id" TEXT NOT NULL,
    "conditionType" "ConditionType",
    "questionResponses" JSONB NOT NULL DEFAULT '[{}]',
    "formId" TEXT,

    CONSTRAINT "Rule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rule" ADD CONSTRAINT "Rule_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE SET NULL ON UPDATE CASCADE;
