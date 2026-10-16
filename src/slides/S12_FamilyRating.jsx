import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { familyData } from '../data/familyData';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { triggerConfetti } from '../components/Confetti';
import { playCelebrateSound } from '../utils/soundEffects';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import { FiAward, FiSmile, FiTrendingUp } from 'react-icons/fi';

export default function S12_FamilyRating() {
  const { familyRatings } = familyData;
  const { chartColors, isDark } = useTheme();
  const { t } = useLanguage();

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [showRadarView, setShowRadarView] = useState(false);

  const currentCategory = familyRatings.categories[activeCategoryIndex];

  const handleCategoryChange = (idx) => {
    setActiveCategoryIndex(idx);
    setShowRadarView(false);
  };

  const handleShowRadar = () => {
    setShowRadarView(true);
  };

  return (
    <div className="flex flex-col justify-start sm:justify-center min-h-full max-w-7xl mx-auto px-1 sm:px-2 py-1 sm:py-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-2.5 sm:mb-3 gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
            <FiSmile className="text-xs sm:text-sm" /> {t('Slide 12 • Interactive Leaderboard', '12-slayd • Interaktiv reyting')}
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 dark:text-white leading-tight">
            {familyRatings.title}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1 sm:mt-0">
          <button
            onClick={() => setShowRadarView(false)}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-heading font-bold border transition ${
              !showRadarView
                ? 'bg-teal-500 text-white border-teal-400 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-teal-500'
            }`}
          >
            {t('Scores (1–10)', 'Ballar (1–10)')}
          </button>
          <button
            onClick={handleShowRadar}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-heading font-bold border transition flex items-center gap-1.5 ${
              showRadarView
                ? 'bg-teal-500 text-white border-teal-400 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-teal-500'
            }`}
          >
            <FiTrendingUp /> {t('Radar & Champion', 'Radar va chempion')}
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3">
        {familyRatings.categories.map((cat, idx) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(idx)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-heading font-bold shrink-0 transition-all border ${
              activeCategoryIndex === idx && !showRadarView
                ? 'bg-teal-500/20 text-teal-600 dark:text-teal-300 border-teal-500/50 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/60 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area: Category Details OR Radar Overview */}
      <div className="my-auto">
        {!showRadarView ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left: 1-10 Scores with Animated Bars & Filled Emoji Icons (7 cols) */}
            <div className="lg:col-span-7 glass-card rounded-3xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200 dark:border-slate-800 text-xs">
                <span className="font-heading font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="text-xl">{currentCategory.icon}</span>
                  <span>{currentCategory.name} — {t('Scores (1 to 10 points)', 'Ballar (1 dan 10 ballgacha)')}</span>
                </span>
                <span className="text-teal-500 font-semibold">{t('Max: 10', 'Maks: 10')} {currentCategory.unit}</span>
              </div>

              {/* Rows */}
              <div className="space-y-3 my-auto">
                {currentCategory.scores.map((row, idx) => (
                  <div key={row.name} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    {/* Member name & rank */}
                    <div className="w-28 shrink-0 flex items-center gap-1.5 text-xs font-heading font-bold text-slate-900 dark:text-white">
                      {row.rank === 1 ? (
                        <span className="text-base text-amber-400">👑</span>
                      ) : (
                        <span className="w-5 text-slate-400 text-center font-mono text-[11px]">{row.rank}.</span>
                      )}
                      <span>{row.avatar}</span>
                      <span className="truncate">{row.name}</span>
                    </div>

                    {/* Bar + Emoji repetition */}
                    <div className="flex-1 flex items-center gap-2">
                      {/* Bar track */}
                      <div className="flex-1 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 relative overflow-hidden border border-slate-200 dark:border-slate-700/60 flex items-center px-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(row.score / 10) * 100}%` }}
                          transition={{ duration: 0.5, delay: idx * 0.08 }}
                          className={`absolute inset-y-0 left-0 rounded-xl ${
                            row.rank === 1
                              ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                              : 'bg-gradient-to-r from-teal-500 to-sky-500'
                          } opacity-30`}
                        />
                        {/* Filled emoji icons appearing from 1 to score */}
                        <div className="relative z-10 flex items-center gap-1 text-xs select-none">
                          {Array.from({ length: row.score }).map((_, i) => (
                            <span
                              key={i}
                              className="text-xs filter drop-shadow-sm transition-transform duration-150"
                            >
                              {currentCategory.emojiChar}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Numerical badge */}
                      <span className="w-10 text-right font-heading font-bold text-xs sm:text-sm text-teal-600 dark:text-teal-400">
                        {row.score}/10
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 text-center">
                {t('✨ Click any category tab above to switch leaderboard topics and see the winner!', '✨ Reyting mavzusini o\'zgartirish va g\'olibni ko\'rish uchun yuqoridagi istalgan toifani bosing!')}
              </div>
            </div>

            {/* Right: Category Winner Banner & Dynamic Grammar Sentence (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              {/* Winner Crown Card */}
              <motion.div
                key={currentCategory.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-3xl p-5 border border-amber-500/40 bg-gradient-to-br from-amber-500/15 via-transparent to-transparent flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">👑</span>
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-heading font-bold text-xs uppercase tracking-wider">
                      {t('Category Winner', 'Toifa g\'olibi')}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white mb-2">
                    {currentCategory.scores[0].name} {t('Wins!', 'G\'olib!')}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                    "{currentCategory.winnerText}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between text-xs text-amber-700 dark:text-amber-400">
                  <span>{t('Score:', 'Ball:')} <strong>{currentCategory.scores[0].score}/10 {t('points', 'ball')}</strong></span>
                  <button
                    onClick={() => {
                      playCelebrateSound();
                      triggerConfetti({ x: 0.7, y: 0.5 });
                    }}
                    className="underline font-bold hover:text-amber-300 transition"
                  >
                    {t('🎉 Celebrate Winner', '🎉 G\'olibni nishonlash')}
                  </button>
                </div>
              </motion.div>

              {/* Grammar Auto-Generated Box */}
              <div className="glass-card rounded-3xl p-4 border border-teal-500/30 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <div className="font-heading font-bold text-teal-600 dark:text-teal-400 text-sm mb-1 flex items-center gap-1.5">
                  <FiAward /> {t('Present Simple Form:', 'Present Simple qoidasi:')}
                </div>
                <p>
                  {t(
                    '"Subject + verb with -s (Brother loves sweets, He eats chocolate). With plural or \'I\', no -s is added (We love family dinners)."',
                    '"Ega + fe\'lga -s qo\'shiladi (Brother loves sweets, He eats chocolate). Ko\'plik yoki \'I\' bilan -s qo\'shilmaydi (We love family dinners)."'
                  )}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Radar Chart & Family Champion Ranking View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Recharts Radar Chart (7 cols) */}
            <div className="lg:col-span-7 glass-card rounded-3xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col justify-between h-[360px]">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <span>{t('Multi-Category Radar Comparison (5 Members)', 'Ko\'p toifali radar taqqoslashi (5 a\'zo)')}</span>
                <span>{t('All 6 Attributes (0 to 10 Scale)', 'Barcha 6 toifa (0 dan 10 ballgacha)')}</span>
              </div>

              <div className="w-full flex-1 min-h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius="75%" data={familyRatings.radarData}>
                    <PolarGrid stroke={chartColors.grid} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: chartColors.text, fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} stroke={chartColors.grid} />
                    <Radar name="Salohiddin" dataKey="Salohiddin" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.25} />
                    <Radar name="Muhammadsodiq" dataKey="Muhammadsodiq" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                    <Radar name="Sora" dataKey="Sora" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.15} />
                    <Radar name="Father" dataKey="Father" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} />
                    <Radar name="Mother" dataKey="Mother" stroke="#ec4899" fill="#ec4899" fillOpacity={0.15} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Total Overall Champion Ranking (5 cols) */}
            <div className="lg:col-span-5 glass-card rounded-3xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div className="pb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-heading font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center justify-between">
                <span>{t('Total Family Champion Ranking:', 'Umumiy oila chempioni reytingi:')}</span>
                <span className="text-amber-400">🏆 {t('Overall', 'Umumiy')}</span>
              </div>

              <div className="space-y-2.5 my-auto py-2">
                {familyRatings.overallRanking.map((item) => (
                  <div
                    key={item.rank}
                    className="p-2.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 font-bold flex items-center justify-center text-xs">
                        #{item.rank}
                      </span>
                      <span>{item.avatar}</span>
                      <span className="font-heading font-bold text-slate-900 dark:text-white">
                        {item.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400 font-medium">{item.badge}</span>
                      <span className="font-heading font-extrabold text-teal-600 dark:text-teal-400">
                        {item.score} {t('pts', 'ball')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-center text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
                {t('Sum of scores across Sweets, Sleep, Sport, Dinner, Reading, and Screen Time.', 'Shirinlik, uyqu, sport, kechki ovqat, kitob mutolaasi va ekran vaqti bo\'yicha jami ballar.')}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
