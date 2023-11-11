/** @format */

import CommentInput from "@/components/CommentInput";
import CommentThread from "@/components/CommentThread";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center  overflow-auto bg-gray-100 p-4 py-10">
      <section className="flex flex-col gap-2 items-end">
        <CommentThread />
        <CommentInput className="w-[590px]" />
        <CommentInput  />
      </section>
    </div>
  );
}
