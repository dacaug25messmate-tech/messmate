import { useState } from "react";
import { messowner_url } from "../rest_endpoints";

export default function UploadMessPhoto({ messId, onUploaded }) {
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!photo) return alert("Please select a photo");

    const formData = new FormData();
    formData.append("messid", messId);
    formData.append("photo", photo);

    setUploading(true);

    fetch(messowner_url+"/mess/photo/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Upload failed");
        return res.json();
      })
      .then((data) => {
        alert("Photo uploaded successfully!");
        setPhoto(null);
        onUploaded(data); // pass the saved photo back to parent
      })
      .catch((err) => {
        console.error(err);
        alert("Error uploading photo");
      })
      .finally(() => setUploading(false));
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h4>Upload Mess Photo</h4>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{ marginLeft: "10px" }}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
