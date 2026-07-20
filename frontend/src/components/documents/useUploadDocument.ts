import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { uploadDocument } from "../../api/documentApi";


export function useUploadDocument() {
  
  return useMutation({
    mutationFn: uploadDocument,

    onSuccess: () => {
      
      toast.success("Document uploaded successfully.");
    },

    onError: () => {
      toast.error("Upload failed.");
    },
  });
}