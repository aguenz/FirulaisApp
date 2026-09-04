import React from 'react';
import { COMMUNITY_STORIES } from '../data/mockData';

export const CommunitySection: React.FC = () => {
  return (
    <section id="manada" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      
      <div className="max-w-xl mb-14 text-center mx-auto">
        <span className="font-hand text-3xl text-[var(--c-mango)] rotate-[-2deg] inline-block font-bold">
          la manada Firulais
        </span>
        <h2 className="font-display text-3xl sm:text-5xl font-bold mt-1 tracking-tight text-[#152018] dark:text-[#FAFAF7]">
          Cada peludo tiene su historia 🐾
        </h2>
        <p className="text-sm text-[#152018]/65 dark:text-[#FAFAF7]/65 mt-3">
          Historias reales de tutores en Caracas que ya confían en Firulais para el cuidado diario de sus perros y gatos.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {COMMUNITY_STORIES.map((story) => (
          <div
            key={story.id}
            className={`card-sticker bg-white dark:bg-[#132A1E] p-3.5 pb-6 rounded-2xl border-2 border-[#152018] shadow-sticker transition-all hover:rotate-0 hover:scale-105 ${story.rotation}`}
          >
            {/* Polaroid photo frame */}
            <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 border border-[#152018]/10 bg-[#FAFAF7] dark:bg-[#0D1F16]">
              <img
                src={story.image}
                alt={story.petName}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded-full">
                📍 {story.zone}
              </span>
            </div>

            <div className="px-1 text-center">
              <p className="font-hand text-2xl text-[#152018] dark:text-[#FAFAF7] font-bold">
                {story.petName}
              </p>
              <p className="text-[11px] font-mono text-[#152018]/60 dark:text-[#FAFAF7]/60 mt-0.5">
                {story.age}
              </p>
              <p className="text-xs text-[#152018]/80 dark:text-[#FAFAF7]/80 mt-2.5 italic leading-relaxed line-clamp-3">
                &ldquo;{story.quote}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
