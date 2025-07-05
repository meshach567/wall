import { Button } from "@/components/ui/button";

export default function WallInput() {
  return (
    <div className="border-2 border-dashed rounded-lg p-4 mb-4 bg-white">
      <textarea
        className="w-full border-none focus:ring-0 resize-none bg-transparent text-lg font-medium placeholder:text-gray-400"
        placeholder="Wall"
        rows={2}
      />
      <div className="flex justify-end mt-2">
        <Button>Share</Button>
      </div>
    </div>
  );
}
