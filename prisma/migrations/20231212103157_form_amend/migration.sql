/*
  Warnings:

  - A unique constraint covering the columns `[formMetaDataSlug]` on the table `Form` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `label` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Response" ADD COLUMN     "label" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Form_formMetaDataSlug_key" ON "Form"("formMetaDataSlug");
