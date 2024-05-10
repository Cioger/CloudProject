import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { defaultRecordValues } from "@/utils/constants";
import { getNote as getNote, updateNote as updateNote } from "@/utils/notesFunctions";
import Spinner from "@/components/Spinner";
import NoteForm from "@/components/NoteForm";

const Edit = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [entry, setEntry] = useState(defaultRecordValues);

  const handleGetNote = async (id) => {
    try {
        const response = await getNote(id);

        if (response) {
            setEntry(response);
            setIsLoading(false);
        }
    } catch (error) {
        console.log(error);
        setIsLoading(false);
    }
  }

  const onSubmit = async (data) => {
    try {
        const response = await updateNote(data);

        if (response) {
            router.push("/");
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);
    const id = searchParams.get("id");

    if (!id) {
        router.push("/");
    }

    handleGetNote(id);
  }, []);

  if (isLoading) return <Spinner />;

  return <NoteForm entry={entry} onSubmit={onSubmit} />;
};

export default Edit;
