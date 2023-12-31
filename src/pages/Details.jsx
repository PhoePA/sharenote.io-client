import {
  ArrowSmLeftIcon,
  CalendarIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { Hourglass } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();

  const [note, setNote] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNote = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API}/notes/${id}`);
    const note = await response.json();
    setNote(note);
    setLoading(false);
  };

  useEffect(() => {
    getNote();
  }, []);

  const detailedDate = new Date(note.createdAt).toDateString();

  return (
    <section className="p-10 mx-3">
      {!loading ? (
        <>
          <div>
            <Link
              to={"/"}
              className="flex justify-end items-center text-teal-600 font-medium"
            >
              <ArrowSmLeftIcon width={30} height={40} /> Back
            </Link>

            <div className=" border shadow-lg border-t-4 border-t-teal-600 p-3 mt-5 rounded">
              {note.cover_image && (
                <div className="mb-5">
                  <img
                    src={`${import.meta.env.VITE_API}/${note.cover_image}`}
                    alt={note.title}
                    className="h-full w-4/6 m-auto"
                  />
                </div>
              )}
              <p className="text-center text-4xl font-medium capitalize">
                {note.title}
              </p>
              <div className="flex justify-between mt-3">
                {note.author && (
                  <div className="flex  items-center gap-1">
                    <UserCircleIcon className="w-4 h-4 text-teal-600" />
                    <h5>{note.author.username} | { note.author.email}</h5> 
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4 text-red-600" />
                  {detailedDate}
                </div>
              </div>
              <p className=" text-base indent-10 text-justify mt-2">
                {note.content}
              </p>
              <hr className="mt-2" />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center m-auto">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#222a33"]}
          />
          <p className=" text-5xl m-2">Loading.... Please Wait! </p>
        </div>
      )}
    </section>
  );
};

export default Details;
