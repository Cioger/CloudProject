import { deleteNote, getNotes } from "@/utils/notesFunctions";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useRouter } from "next/router";

const MainPage = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const response = await getNotes();

      setData(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const response = await deleteNote(id);

      if (response?.acknowledged) {
        const newData = data.filter((el) => el._id !== id);

        setData(newData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNote = () => {
    router.push("/create");
  }

  const handleCompanion = () => {
    router.push("/chat");
  }

  const handleEditNote = (id) => {
    router.push(`/edit?id=${id}`);
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <section className="bg-white dark:bg-blue-100">
			<div className="container px-6 py-10 mx-auto">
				<h1 className="w-[500px] mx-auto text-center text-blue-800 text-6xl">NoteBuddy</h1>
        <div className="p-4 flex flex-wrap gap-4">
          {data?.map((note) => (
            <div
              key={note._id}
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-blue-500 dark:border-blue-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {note.Title}
              </h5>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Category: {note.Category}
              </h5>
              <p className="mb-3 font-normal text-white dark:text-text-white">
                {note.Description}
              </p>
              <button
                type="button"
                onClick={() => handleEditNote(note._id)}
                className="text-white bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => handleDeleteNote(note._id)}
                className="text-white bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
          <button
            type="button"
            onClick={handleAddNote}
            className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Add Note
          </button>
          <button
            type="button"
            onClick={handleCompanion}
            className="text-white bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            To Companion
          </button>
		</section>
    
  );
};

export default MainPage;
