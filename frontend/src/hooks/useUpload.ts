export const useUpload = () => {
  const upload = async (file: File) => {
    // placeholder upload logic
    return { success: true, fileName: file.name }
  }

  return { upload }
}
