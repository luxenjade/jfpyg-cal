import { Calendar, Printer } from "lucide-react";

export const AppLogo = () => {
  return (
    <div className="flex items-center gap-2.5 font-sans select-none">
      {/* アイコンエリア：カレンダーのなかにプリンターのニュアンスを重ねる */}
      <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Calendar className="w-5 h-5 opacity-40" />
        <Printer className="w-4 h-4 absolute stroke-[2.5]" />
      </div>

      {/* テキストエリア：メリハリをつけたタイポグラフィ */}
      <div className="flex flex-col leading-none">
        <span className="text-lg font-black tracking-tight text-foreground">
          gcal2paper{" "}
          <span className="text-muted-foreground font-medium text-sm">cal</span>
        </span>
        <span className="text-[9px] text-muted-foreground font-medium tracking-wider mt-0.5 uppercase">
          Google Calendar to paper
        </span>
      </div>
    </div>
  );
};
