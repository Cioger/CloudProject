import NoteForm from "@/components/NoteForm";
import { defaultRecordValues } from "@/utils/constants";
import { createNote } from "@/utils/notesFunctions";
import { useRouter } from "next/router";
import React from "react";

const Create = () => {
  const router = useRouter();
  const entry = defaultRecordValues;

  const onSubmit = async (data) => {
    try {
      const response = await createNote(data);

      if (response) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <NoteForm entry={entry} onSubmit={onSubmit} />;
};

export default Create;
