import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";

type file = {
  fileName: string;
  uploader?: string | "Anonymous";
};

function UploadFile() {
  const [fileSelected, setFileSelected] = useState(false);  
  const { register, handleSubmit, reset, watch } = useForm<file>();

  console.log(watch("fileName"), "Selected file");
    const onSubmit: SubmitHandler<file> = (data) => {
      const formData = new FormData();
      formData.append("file", data.fileName[0]);

      if (formData) {
        axios
          .post("http://localhost:3000/api/files", formData,{ withCredentials: true })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err, "Error uploading file");
          });
      }
      reset();
    };

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((res) => console.log(res.data, "API is working"))
      .catch((err) => console.log(err, "API is not working"));
  }, []);

  return (
    <form
      className=" mx-auto w-2/3 py-8 flex flex-col items-center gap-4 bg-gray-800/50 rounded-xl border border-gray-600/50 mt-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2 items-center">
        <label
          htmlFor="fileInput"
          className="group  relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 border-gray-600 border-dashed bg-slate-200 transition-all hover:border-blue-400 hover:bg-blue-50 active:scale-95"
        >
          <div className="h-8 w-8 relative ">
            {fileSelected ? (
              <h1 className="text-black font-semibold text-center">PDF</h1>
            ) : (
              <IoMdAdd className="h-8 w-8 text-black hover:text-blue-500" />
            )}
          </div>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            {...register("fileName", {
              required: true,
              onChange: (e) => {
                setFileSelected(
                  e.target.files && e.target.files.length > 0 ? true : false,
                );
              },
            })}
          />
        </label>
      </div>

      <button
        className="text-sm text-slate-500 hover:text-blue-500 cursor-pointer border rounded-lg px-2 py-1 "
        type="submit"
      >
        Upload File
      </button>
    </form>
  );
}

export default UploadFile;
