import {
  TrashIcon,
  PencilAltIcon,
  EyeIcon,
  CalendarIcon,
} from "@heroicons/react/outline";
import formatISO9075 from "date-fns/formatISO9075";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Note = ({ note, getNotes, customAlert }) => {
  const { token } = useContext(UserContext);
  const { _id, title, content, createdAt, author } = note;

  const handleDeleteNote = async () => {
    const localToken = JSON.parse(localStorage.getItem("token"));

    if (!localToken) {
      localStorage.setItem("token", null);
      window.location.reload(false);
    }

    const response = await fetch(`${import.meta.env.VITE_API}/status`, {
      headers: {
        Authorization: `Bearer ${localToken.token}`,
      },
    });

    if (response.status === 401) {
      localStorage.setItem("token", null);
      window.location.reload(false);
    } else {
      deleteNote();
    }
  };
  const deleteNote = async () => {
    const response = await fetch(`${import.meta.env.VITE_API}/delete/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    if (response.status === 204) {
      customAlert("Post was Deleted!");
      getNotes();
    }
  }; 

  return (
    <div className=" w-1/3 border shadow-lg border-t-4 border-t-teal-600 p-3 rounded h-fit">
      <h3 className=" text-xl text-center font-medium capitalize">
        {title.slice(0, 21)}
      </h3>

      <p className=" text-sm indent-5 mt-2 text-justify break-words">
        {content.slice(0, 150)}...
      </p>
      <hr className="mt-1" />
      <div className="flex justify-between">
        <div className="flex justify-center items-center gap-1 p-2">
          <CalendarIcon className="w-4 h-4 text-red-600" />
          <p className="m-auto">
            {formatISO9075(new Date(createdAt), { representation: "date" })}
          </p>
        </div>

        <div className="flex items-center p-2  gap-1 ">
          {token && (
            <>
              {note.author.toString() === token.userId && (
                <>
                  <TrashIcon
                    width={20}
                    className=" text-red-500 cursor-pointer"
                    onClick={handleDeleteNote}
                  />
                  <Link to={"/edit/" + _id}>
                    <PencilAltIcon width={20} className=" text-teal-600" />
                  </Link>
                </>
              )}
            </>
          )}
          <Link to={"/notes/" + _id}>
            <EyeIcon width={20} className=" text-gray-500" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Note;
