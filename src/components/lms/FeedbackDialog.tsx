import { useRef, useState } from "react";
import { Bug, Lightbulb, MessageSquare, X } from "lucide-react";
import { toast } from "sonner";

type FeedbackType = "Bug" | "Idea" | "Other";

const types: { label: FeedbackType; icon: typeof Bug }[] = [
  { label: "Bug", icon: Bug },
  { label: "Idea", icon: Lightbulb },
  { label: "Other", icon: MessageSquare },
];

export function FeedbackDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [type, setType] = useState<FeedbackType | null>(null);
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const submit = () => {
    if (!type) {
      toast.error("Please select a feedback type");
      return;
    }
    if (!text.trim()) {
      toast.error("Please write your feedback");
      return;
    }
    toast.success("Feedback sent. Thank you!");
    setType(null);
    setText("");
    setFileName("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Share Your Feedback"
        className="relative w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close feedback"
          className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-4" />
        </button>

        <h2 className="text-center text-lg font-semibold text-foreground">Share Your Feedback</h2>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Let us know if we could do anything to improve your learning experience
        </p>

        <div className="my-5 h-px bg-border" />

        <p className="text-sm font-semibold text-foreground">
          Select Type <span className="text-destructive">*</span>
        </p>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {types.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setType(label)}
              className={`flex flex-col items-center gap-2 rounded-lg border px-3 py-4 text-sm transition-colors ${
                type === label
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="size-5" />
              {label}
            </button>
          ))}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your feedback"
          rows={3}
          className="mt-5 w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
        />

        <p className="mt-4 text-sm font-semibold text-foreground">Reference Images</p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <div className="flex-1 truncate rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground">
            {fileName || "No file chosen"}
          </div>
          <button
            onClick={() => fileRef.current?.click()}
            className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            + Add Image
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={submit}
            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Send feedback
          </button>
        </div>
      </div>
    </div>
  );
}
