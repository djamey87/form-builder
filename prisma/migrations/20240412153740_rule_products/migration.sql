-- AlterTable
ALTER TABLE "Rule" ADD COLUMN     "presentedProducts" JSONB NOT NULL DEFAULT '[{}]';
