"use client";

import { useState } from "react";

export default function ImageUploader({ onUpload }) {

  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {

    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("file", file);

    setLoading(true);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    onUpload(data.path);

    setLoading(false);
  }

  return (
    <div>

      <input
        type="file"
        onChange={handleUpload}
      />

      {loading && <p>uploading...</p>}

    </div>
  );
}