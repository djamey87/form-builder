import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function EditorPage() {
  const forms = await prisma.form.findMany({
    include: { metadata: true },
  });

  return (
    <div>
      <h1>Editor</h1>

      <p>TODO:</p>
      <ol>
        <li className="task-complete">
          Database setup to store form structure
        </li>
        <li>Form to create the form!</li>
        <li>Versioning of form?</li>
        <li>Authentication to protect and track form changes</li>
      </ol>

      <Link href={`editor/create`}>Create form</Link>

      <ul>
        {forms.map(({ id, metadata }) => {
          return (
            <li key={id}>
              <Link href={`forms/${metadata.slug}`}>{metadata.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
