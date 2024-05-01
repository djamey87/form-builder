import { GenerateForm } from "@/components/GenerateForm";
import { ProductSelector } from "@/components/ProductSelector";
import { Questionnaire } from "@/components/Questionnaire";
import { prisma } from "@/lib/prisma";

interface Props {
  params: { slug: string };
}

export default async function Page({ params }: Props) {
  const form = await prisma.form.findUnique({
    where: { formMetaDataSlug: params.slug },
    include: { metadata: true },
  });

  if (!form) {
    return <p>Unable to load form, please try again</p>;
  }

  const questions = await prisma.question.findMany({
    where: { formId: form?.id },
    include: { responses: true },
  });

  const formData = {
    ...form,
    questions: Object.fromEntries(
      questions.map((form) => [form.reference, form])
    ),
  };

  return (
    <Questionnaire
      title={`${form.metadata.name} v${form.metadata.version}`}
      formData={formData}
    />
  );
}
