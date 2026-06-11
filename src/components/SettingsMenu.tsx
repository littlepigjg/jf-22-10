import { X } from 'lucide-react';
import { useGameStore } from '../stores/useGameStore';
import type { PredictionLength } from '../game/types';

interface SettingsMenuProps {
  onClose: () => void;
}

export default function SettingsMenu({ onClose }: SettingsMenuProps) {
  const showAimLine = useGameStore((s) => s.showAimLine);
  const aimLineOpacity = useGameStore((s) => s.aimLineOpacity);
  const predictionLength = useGameStore((s) => s.predictionLength);

  const setShowAimLine = useGameStore((s) => s.setShowAimLine);
  const setAimLineOpacity = useGameStore((s) => s.setAimLineOpacity);
  const setPredictionLength = useGameStore((s) => s.setPredictionLength);

  const lengthOptions: { value: PredictionLength; label: string; desc: string }[] = [
    { value: 'short', label: '短', desc: '只显示第一次碰撞前的路径' },
    { value: 'medium', label: '中', desc: '显示到第二次碰撞' },
    { value: 'long', label: '长', desc: '显示完整预测路径直到静止' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif font-bold text-amber-300">游戏设置</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-zinc-200">显示瞄准线</label>
              <button
                onClick={() => setShowAimLine(!showAimLine)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  showAimLine ? 'bg-amber-500' : 'bg-zinc-700'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    showAimLine ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-zinc-200">预测线透明度</label>
              <span className="text-sm font-mono text-amber-400">{aimLineOpacity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={aimLineOpacity}
              onChange={(e) => setAimLineOpacity(Number(e.target.value))}
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              disabled={!showAimLine}
            />
            <div className="flex justify-between text-xs text-zinc-500">
              <span>完全隐藏</span>
              <span>完全不透明</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-zinc-200">预测线长度</label>
            <div className="grid grid-cols-3 gap-2">
              {lengthOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPredictionLength(opt.value)}
                  disabled={!showAimLine || aimLineOpacity === 0}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    predictionLength === opt.value
                      ? 'bg-gradient-to-br from-amber-900/40 to-amber-950/60 border-amber-500/70 text-amber-200 shadow-[0_0_20px_rgba(212,168,75,0.2)]'
                      : 'bg-zinc-800/30 border-zinc-700/40 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800/50'
                  } ${(!showAimLine || aimLineOpacity === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="font-bold text-sm">{opt.label}</div>
                  <div className="text-[10px] opacity-70 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-700/50">
          <p className="text-xs text-zinc-500 text-center">
            设置实时生效，无需重启游戏
          </p>
        </div>
      </div>
    </div>
  );
}
