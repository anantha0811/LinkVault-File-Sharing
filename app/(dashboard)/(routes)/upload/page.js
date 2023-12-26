"use client";

import React, { useEffect, useState } from "react";
import UploadForm from "./_components/UploadForm";
import { app } from "/firebaseConfig";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import GenerateRandomString from "../../../_utils/GenerateRandomString";
import { useRouter } from "next/navigation";
import CompleteCheck from "./_components/CompleteCheck";

const Upload = () => {
  const { user } = useUser();
  const [progress, setProgress] = useState();
  const router = useRouter();
  const storage = getStorage(app);
  const db = getFirestore(app);
  const [savedDocId, setSavedDocId] = useState("");
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const uploadFile = (file) => {
    const metadata = {
      contentType: file.type,
    };
    const storageRef = ref(storage, "upload-files/" + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file, file.type);

    uploadTask.on("state_changed", (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      setProgress(progress);

      progress == 100 &&
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          saveInfo(file, downloadURL);
        });
    });
  };
  const saveInfo = async (file, fileUrl) => {
    const docId = GenerateRandomString().toString();

    await setDoc(doc(db, "uploadedFiles", docId), {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl: fileUrl,
      userEmail: user?.primaryEmailAddress.emailAddress,
      userName: user?.fullName,
      password: "",
      id: docId,
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL + docId,
    });
    console.log(docId);
    setSavedDocId(docId);
  };

  useEffect(() => {
    console.log("Triggered");

    progress == 100 &&
      setTimeout(() => {
        setUploadCompleted(true);
      }, 2000);
  }, [progress == 100]);

  useEffect(() => {
    uploadCompleted &&
      setTimeout(() => {
        setUploadCompleted(false);
        console.log("fileDocId", savedDocId);
        router.push("/file-preview/" + savedDocId);
      }, 2000);
  }, [uploadCompleted, savedDocId]);

  return (
    <div className="p-5 px-8 md:px-28">
      {!uploadCompleted ? (
        <div>
          <h2 className="text-[32px] text-center m-5">
            Upload your <strong className="text-primary">files</strong> and
            start <strong className="text-primary">sharing</strong>!
          </h2>
          <UploadForm
            uploadBtnClick={(file) => uploadFile(file)}
            progress={progress}
          />
        </div>
      ) : (
        <CompleteCheck />
      )}
    </div>
  );
};

export default Upload;
