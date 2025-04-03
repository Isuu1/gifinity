import React from "react";

//Styles
import styles from "./ChangeUserAvatar.module.scss";
import { useAuth } from "@/context/AuthProvider";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { generateUploadToken } from "@/actions/generate-upload-token";
import toast from "react-hot-toast";
import { toastStyle } from "@/styles/toast";

const ChangeUserAvatar: React.FC = () => {
  const { user, avatar, fetchUser } = useAuth();

  const supabase = createClient();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!user || !e.target.files?.[0]) return;

      // 1. Get fresh token from server action
      const { token } = await generateUploadToken();

      const file = e.target.files[0];
      const fileName = `${user.id}/${Date.now()}-${file.name.replace(
        /\s+/g,
        "-"
      )}`;

      // 2. Upload with token
      const { error: uploadError } = await supabase.storage
        .from("gifinity-avatars")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
          headers: {
            Authorization: `Bearer ${token}`,
            "x-upsert": "false",
          },
        });

      if (uploadError) throw uploadError;

      // 3. Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("gifinity-avatars").getPublicUrl(fileName);

      // 4. Update profile
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar: publicUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      fetchUser();
      toast.success("Avatar updated", toastStyle);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Profile picture</h1>
      <Image
        src={avatar || "/images/avatar.gif"}
        className={styles.avatar}
        alt="Avatar"
        fill
        priority
        unoptimized
      />
      <div className={styles.fileInput}>
        <label>Select file</label>
        <input type="file" accept="image/*" onChange={handleUpload} />
      </div>
    </div>
  );
};

export default ChangeUserAvatar;
