import React from "react";
import { useRouter } from "next/navigation";

//Components
import Button from "@/components/UI/Button";

//Supabase
import { createClient } from "@/utils/supabase/client";

//Icons
import { FaSignOutAlt } from "react-icons/fa";

const SignoutButton: React.FC = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    async function signOut() {
      const { error } = await supabase.auth.signOut();
      router.refresh();
      if (error) {
        console.error("Error logging out:", error.message);
        return;
      }
    }
    signOut();
  };

  return (
    <Button
      onClick={handleSignOut}
      icon={<FaSignOutAlt />}
      iconPosition="right"
    >
      Sign out
    </Button>
  );
};

export default SignoutButton;
