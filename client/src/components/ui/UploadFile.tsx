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
      className="mx-auto w-2/3 p-6 flex flex-col items-center gap-5 bg-gray-800/50 rounded-xl border border-gray-600/50 mt-8 shadow-xl backdrop-blur-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex flex-col items-center">
        <label
          htmlFor="fileInput"
          className={`group relative flex flex-col items-center justify-center w-full max-w-md h-32 cursor-pointer rounded-lg border-2 border-dashed transition-all p-4 text-center
        ${
          fileSelected
            ? "border-blue-500 bg-blue-500/5"
            : "border-gray-600 bg-gray-700/20 hover:border-blue-400 hover:bg-gray-700/40"
        } active:scale-[0.99]`}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            {fileSelected ? (
              <>
                {/* Styled "PDF" or file status indicator */}
                <div className="bg-blue-500 text-white text-xs font-bold px-2.5 py-1 rounded shadow-sm animate-pulse">
                  PDF
                </div>
                <p className="text-xs text-gray-300 font-medium tracking-wide">
                  Ready to upload
                </p>
              </>
            ) : (
              <>
                <IoMdAdd className="h-6 w-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
                <p className="text-xs text-gray-400">
                  <span className="text-blue-400 font-medium hover:underline">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
              </>
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
        className={`w-full max-w-md text-sm font-medium rounded-lg py-2.5 transition-all shadow-md tracking-wide
      ${
        fileSelected
          ? "bg-blue-600 text-white hover:bg-blue-500 active:scale-[0.98] cursor-pointer"
          : "bg-gray-700 text-gray-400 border border-gray-600/40 cursor-not-allowed opacity-60"
      }`}
        type="submit"
      >
        Upload File
      </button>
    </form>
  );
}

export default UploadFile;
