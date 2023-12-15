"use client";
// import { FormEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { prisma } from "@/lib/prisma";
import { Form } from "@prisma/client";

interface Props {
  onSubmit: (data: any) => void;
}

export default function BuilderCreateForm({ onSubmit }: Props) {
  // TODO: default values
  const methods = useForm();
  const { handleSubmit, register } = methods;

  const onFormSubmit = handleSubmit(async (data) => {
    const { name, version, slug } = data;

    console.log("submit", data);

    onSubmit(data);
  });

  return (
    <div>
      <h1>Create a form</h1>

      <FormProvider {...methods}>
        <form onSubmit={onFormSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="name"
              {...methods.register("name", {
                required: true,
                maxLength: 50,
              })}
            />
          </div>

          {/* TODO: this should be auto-incremented if updated */}
          <div>
            <label htmlFor="version">Version</label>
            <input
              type="text"
              placeholder="version"
              defaultValue="1"
              readOnly
              {...methods.register("version", {
                value: "1",
                required: true,
                maxLength: 10,
              })}
            />
          </div>

          <div>
            <label htmlFor="slug">Slug</label>
            <input id="slug" disabled></input>
          </div>

          <button type="submit">Create</button>
        </form>
      </FormProvider>
    </div>
  );
}
