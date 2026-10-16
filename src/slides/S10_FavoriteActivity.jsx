import React from 'react';
import { motion } from 'framer-motion';
import { familyData } from '../data/familyData';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { FiStar, FiAward, FiCheck } from 'react-icons/fi';

export default function S10_FavoriteActivity() {
  const { q5_favoriteActivity } = familyData;
  const { chartColors } = useTheme();
  const { t } = useLanguage();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-3 rounded-xl shadow-lg border border-slate-700 bg-slate-900 text-white text-xs">
          <div className="font-heading font-bold text-teal-300 text-sm flex items-center gap-1.5">
            <span>{data.icon}</span>
            <span>{data.activity}</span>
          </div>
          <div className="text-amber-400 font-semibold my-0.5">
            {t('Votes:', 'Ovozlar:')} {data.votes} / 5 ({data.percentage}%)
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col justify-start sm:justify-center min-h-full max-w-7xl mx-auto px-1 sm:px-2 py-1 sm:py-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-3 sm:mb-4 gap-1.5 sm:gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
            <FiStar className="text-xs sm:text-sm" /> {t('Slide 10 • Survey Question 5', '10-slayd • So\'rovnoma 5-savoli')}
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 dark:text-white leading-tight">
            {q5_favoriteActivity.question}
          </h2>
        </div>

        {/* Winner Announcement Badge */}
        <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-500/40 text-teal-700 dark:text-teal-300 font-heading font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm self-start sm:self-auto">
          <FiAward className="text-base sm:text-lg text-teal-500 shrink-0" />
          <span>
            {t('Winner:', 'G\'olib:')} <strong>{q5_favoriteActivity.winner}</strong> ({t('3/5 votes', '3/5 ovoz')})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-5 items-stretch my-auto">
        {/* Left: Recharts Bar Chart (6 cols) */}
        <div className="lg:col-span-6 glass-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
            <span>{t('Vote Distribution (Total 5 Respondents)', 'Ovozlar taqsimoti (5 ishtirokchi)')}</span>
            <span className="text-teal-500 font-semibold">{t('60% Voted for Tea & Talk', '60% Kechki choy')}</span>
          </div>

          <div className="w-full h-56 sm:h-64 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={q5_favoriteActivity.chartData}
                margin={{ top: 15, right: 10, left: -25, bottom: 25 }}
              >
                <XAxis
                  dataKey="activity"
                  tick={{ fill: chartColors.text, fontSize: 10, fontFamily: 'Poppins' }}
                  axisLine={{ stroke: chartColors.grid }}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 4]}
                  ticks={[1, 2, 3, 4]}
                  tick={{ fill: chartColors.text, fontSize: 11, fontFamily: 'Poppins' }}
                  axisLine={{ stroke: chartColors.grid }}
                  tickLine={false}
                  unit={` ${t('vote', 'ovoz')}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="votes" radius={[8, 8, 0, 0]}>
                  {q5_favoriteActivity.chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.isWinner ? '#14b8a6' : entry.color}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-800 dark:text-teal-300">
            {t('🏆 Uzbek Tradition: Having green tea from a piala while sharing the day\'s stories is the heart of our household.', '🏆 O\'zbek an\'anasi: Piyolada ko\'k choy ichib, kun taassurotlarini ulashish — oilamiz fayzi.')}
          </div>
        </div>

        {/* Right: Voters Breakdown (6 cols) */}
        <div className="lg:col-span-6 glass-card rounded-3xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="pb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-heading font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            {t('Who Voted for What & Why:', 'Kim nimaga ovoz berdi va nega:')}
          </div>

          <div className="space-y-2.5 my-auto py-2">
            {q5_favoriteActivity.votersBreakdown.map((item, idx) => (
              <motion.div
                key={item.member}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-slate-900 dark:text-white">
                    {item.member}:
                  </span>
                  <span className="text-teal-600 dark:text-teal-400 font-medium">
                    {item.choice}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 italic max-w-xs text-right">
                  "{item.reason}"
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 text-center pt-2 border-t border-slate-200 dark:border-slate-800">
            {t('🗣️ "Father, Sora, and I prefer evening tea, whereas Muhammadsodiq loves football."', '🗣️ "Dadam, Sora va men kechki choyni afzal ko\'ramiz, Muhammadsodiq esa futbolni yaxshi ko\'radi."')}
          </div>
        </div>
      </div>
    </div>
  );
}
