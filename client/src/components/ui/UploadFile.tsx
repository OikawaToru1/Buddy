import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Loading from "./Loader";

type file = {
  fileName: string;
  uploader?: string | "Anonymous";
};

interface UploadFileProps {
  onFileUpload: (file: { fileName: string; path: string; fileId: string }) => void;
}

function UploadFile({ onFileUpload }: UploadFileProps) {
  const [fileSelected, setFileSelected] = useState(false);  
  const { register, handleSubmit, reset, watch } = useForm<file>();
  const [loading, setLoading] = useState(false);
 

  console.log(watch("fileName"), "Selected file");
    const onSubmit: SubmitHandler<file> = (data) => {
      const formData = new FormData();
      formData.append("file", data.fileName[0]);

      if (formData) {
        setLoading(true);
        axios
          .post(`https://buddy-xe7e.onrender.com/api/files`, formData,{ withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
          .then((res) => {
            const newFile = {
              fileName: res.data.data.fileName,
              path: res.data.data.path,
              fileId: res.data.data.fileId,
            };
            onFileUpload(newFile);
          })
          .catch((err) => {
            console.log(err, "Error uploading file");
          })
          .finally(() => {
            setLoading(false);
          });
      }
      reset();
    };

  useEffect(() => {

  }, []);

  return (
    <>
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
                    </span>
                  </p>
                </>
              )}
            </div>
            {loading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                <Loading />
              </div>
            )}
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

    </>
  );
}

export default UploadFile;
