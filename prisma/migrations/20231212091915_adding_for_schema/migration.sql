-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('SELECT', 'TEXT_AREA', 'TEXT');

-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('SHOW_QUESTION', 'HIGHLIGHT', 'BLOCK');

-- CreateTable
CREATE TABLE "Response" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "questionId" TEXT,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "responseValueActions" JSONB NOT NULL,
    "questionType" "QuestionType" NOT NULL DEFAULT 'SELECT',
    "formId" TEXT,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormMetaData" (
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "version" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "formMetaDataSlug" TEXT NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormMetaData_slug_key" ON "FormMetaData"("slug");

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_formMetaDataSlug_fkey" FOREIGN KEY ("formMetaDataSlug") REFERENCES "FormMetaData"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
