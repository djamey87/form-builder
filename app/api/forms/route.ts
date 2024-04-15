export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export enum ActionType {
  COMPLETE = "COMPLETE",
  SHOW_QUESTION = "SHOW_QUESTION",
  HIGHLIGHT = "HIGHLIGHT",
  BLOCK = "BLOCK",
}

export interface Actions {
  [key: string]: { type: ActionType; target: string }; // TODO: type substring here
}

export async function POST(req: Request) {
  const { name, slug, version, questions } = await req.json();

  try {
    const form = await prisma.form.create({
      data: {
        metadata: { create: { name, slug, version } },
        questions: {
          create: questions.map((question) => {
            if (!question.responses) {
              return question;
            }
            return {
              ...question,
              responses: { create: question.responses },
            };
          }),
        },
      },
    });
    return NextResponse.json({
      message: `Created form ${form.formMetaDataSlug}`,
    });
  } catch (err) {
    return NextResponse.json(
      { message: `failed creating the form "${slug}", ${err}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  const forms = await prisma.form.findMany({
    include: { metadata: true },
  });

  return NextResponse.json(forms);
}
