import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function FloatingButton() {

  return (
    <div className="fixed bottom-8 right-8 flex flex-col-reverse items-center gap-4 z-[9999]">
      <Link
        to="/JsonPlaceholder"
        className={
          `w-14 h-14 rounded-full shadow-lg 
          flex items-center justify-center transition-all duration-300 active:scale-90 
          ${"bg-blue-600 hover:bg-blue-700"} text-white`
        }
      >
        <Plus size={32} />
      </Link>
    </div>
  );
}