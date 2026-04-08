import { useState } from "react";
import API from "../services/api";

const PromptBox = ({ onSend, loading }) => {
  const [prompt, setPrompt] = useState("");
  const [enhancing, setEnhancing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim() || loading || enhancing) return;

    onSend(prompt);
    setPrompt("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleEnhancePrompt = async () => {
    if (!prompt.trim() || enhancing || loading) return;

    try {
      setEnhancing(true);

      const { data } = await API.post("/ai/enhance-prompt", {
        prompt,
      });

      setPrompt(data.enhancedPrompt);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to enhance prompt");
    } finally {
      setEnhancing(false);
    }
  };

  return (
    <div className="border-t border-slate-800 bg-[#0f172a] p-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-5xl flex-col gap-3 rounded-2xl border border-slate-700 bg-[#111827] p-3"
      >
        <textarea
          placeholder="Type your message..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          className="max-h-40 min-h-[52px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none"
        />

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleEnhancePrompt}
            disabled={loading || enhancing || !prompt.trim()}
            className="rounded-xl border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {enhancing ? "Enhancing..." : "Enhance Prompt"}
          </button>

          <button
            type="submit"
            disabled={loading || enhancing}
            className="rounded-xl bg-sky-400 px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptBox;