import { Coffee } from "lucide-react";

export function KofiSupport({ kofiUsername = "milospeaksspanish" }) {
  return (
    <section className="mt-auto pt-12 pb-8">
      <div className="max-w-sm mx-auto text-center space-y-4">
        <div className="bg-card/50 rounded-xl p-5 border border-border/50">
          <p className="text-foreground font-medium text-sm mb-2 flex items-center justify-center gap-2">
            <span>Buy Milo a treat</span>
            <span>&#x2615;</span>
          </p>
          <p className="text-muted-foreground text-xs mb-4 leading-relaxed">
            Every treat helps keep Milo&apos;s lessons free, ad-free, and growing. Your support adds new paths, words, and features for everyone.
          </p>
          <a
            href={`https://ko-fi.com/${kofiUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF5E5B] hover:bg-[#FF5E5B]/90 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Coffee className="w-4 h-4" />
            <span>Support on Ko-fi</span>
          </a>
        </div>
        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
          <span>No ads &middot; No subscription &middot; Free to learn</span>
          <span>&#x1F43E;</span>
        </p>
      </div>
    </section>
  );
}
