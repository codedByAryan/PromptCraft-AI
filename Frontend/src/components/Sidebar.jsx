const Sidebar = ({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onLogout,
  onDeleteChat,
}) => {
  return (
    <aside className="flex w-[280px] flex-col border-r border-slate-800 bg-[#202123]">
      <div className="space-y-3 border-b border-slate-800 p-4">
        <button
          onClick={onNewChat}
          className="w-full rounded-xl border border-slate-600 bg-transparent px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-slate-800"
        >
          + New Chat
        </button>

        <button
          onClick={onLogout}
          className="w-full rounded-xl bg-slate-800 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {chats.map((chat) => (
          <div
            key={chat._id}
            className={`group flex items-center justify-between rounded-lg px-3 py-3 text-sm transition ${
              activeChatId === chat._id
                ? "bg-slate-800 text-white"
                : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
            }`}
          >
            {/* Chat title */}
            <button
              onClick={() => onSelectChat(chat._id)}
              className="flex-1 truncate text-left"
            >
              {chat.title}
            </button>

            {/* ❌ Delete button (hover pe show hoga) */}
            <button
              onClick={() => onDeleteChat(chat._id)}
              className="ml-2 hidden text-slate-400 hover:text-red-400 group-hover:block"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;