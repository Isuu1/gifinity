export const generateFileSize = (file: File) => {
  if (!file) return "";
  if (file.size < 1024) {
    return `${file.size} bytes`;
  } else if (file.size < 1048576) {
    return `${(file.size / 1024).toFixed(2)} KB`;
  } else {
    return `${(file.size / 1048576).toFixed(2)} MB`;
  }
};
