import React, { DragEvent, useEffect, useRef, useState } from "react";
import Time from "./Time";
import { randomHexColor } from "@/util/helper";

type Props = {
  Gfiles: Array<FileType>;
  addTrack: (arg: MinimalTrackType) => void;
  GsetFiles: (arg: FileType[]) => void;
};


const Media = ({ Gfiles, GsetFiles, addTrack }: Props) => {
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [files, setFiles] = useState<FileType[]>([]);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the file input

  useEffect(() => {
    if (Gfiles) {
      setFiles([...Gfiles]);
    }
  }, []);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    processFiles(e.dataTransfer.files);
  };

  const handleClick = () => {
    fileInputRef.current?.click(); // Trigger the file input click
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      processFiles(files);
    }
  };

  const processFiles = (cfiles: FileList) => {
    if (cfiles.length > 0) {
      const cfile = cfiles[0];
      if (cfile.size > 10 * 1024 * 1024) {
        // 10MB max size
        setError("File size must not exceed 10MB");
        let timeout = setTimeout(() => {
          setError("");
          clearTimeout(timeout);
        }, 2000);
        return;
      }
      if (cfile.type !== "audio/mpeg") {
        setError("Only MP3 files are allowed");
        let timeout = setTimeout(() => {
          setError("");
          clearTimeout(timeout);
        }, 2000);
        return;
      }
      setError("");
      const audio = document.createElement("audio");
      const reader = new FileReader();
      reader.onload = function (e) {
        audio.src = e.target?.result as string;
        audio.addEventListener(
          "loadedmetadata",
          function () {
            // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
            var duration = audio.duration;
            const track = {
              color: randomHexColor(),
              title: cfile.name,
              startTime: 0,
              endTime: duration * 1000,
              duration: duration * 1000,
              source: URL.createObjectURL(cfile),
            };
            const newFiles = [...files, {file:cfile,track}];
            setFiles(newFiles);
            GsetFiles([...newFiles]);
          },
          false
        );
      };
      reader.readAsDataURL(cfile);
    }
  };

  const handleAddTrack = (index: number): void => {
    addTrack(files[index].track);
  };

  return (
    <div className="p-10 gap-4 min-h-screen bg-systembgDark-200">
      <div
        style={{
          background:
            " linear-gradient(-45deg, #91a100, #0e5987, #61092b, #ce3000) center / 400%",
        }}
        className={`border-2 ${
          dragOver ? "border-systembgDark-100" : "border-transparent"
        } mx-auto overflow-hidden mb-10 h-60 max-w-screen-md rounded-lg flex flex-col group justify-center text-center cursor-pointer bg-[size:400%] dropzone_gradient animate-animate-gradient`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          style={{ display: "none" }}
          accept=".mp3"
        />
        {error && (
          <p className="text-white group-hover:scale-105 transition-all duration-500">
            {error}
          </p>
        )}
        {!error && (
          <p className="text-white text-base md:text-lg group-hover:scale-105 transition-all duration-500">
            DROP AUDIO FILES HERE
          </p>
        )}
        {!error && (
          <p className="text-white text-xs md:text-sm group-hover:scale-105 transition-all duration-500">
            Accepts 0.5 to 10 MB and 1second to 5 minutes
          </p>
        )}
      </div>
      <section className="max-w-screen-md mx-auto flex flex-col gap-4">
        {files.map((file, index) => (
          <div
            key={index}
            onClick={() => handleAddTrack(index)}
            className="hover:scale-105 transition-all duration-500 justify-between cursor-grab rounded-lg bg-systembgDark-100 p-2 text-sm text-white flex"
          >
            <p className="overflow-hidden text-ellipsis w-3/4">{file.file.name}</p>
            <p><Time time={file.track.duration} /></p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Media;
