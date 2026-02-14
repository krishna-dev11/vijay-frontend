import React from 'react';
import { Mic, Users, BookOpen, Presentation } from 'lucide-react';

/* ─── Feature Link Component ─── */
const SocialLink = ({ icon: Icon, label, color, textColor }) => (
  <div className="flex flex-col items-center group cursor-pointer">
    
    {/* Circular Icon */}
    <div className="w-24 h-24 rounded-full bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:-translate-y-2">
      <Icon size={42} color={color} strokeWidth={1.5} />
    </div>
    
    {/* Label */}
    <div className="flex items-center gap-2">
      {/* <ExternalLink size={18} className={textColor} /> */}
      <span className={`text-xl font-bold ${textColor}`}>{label}</span>
    </div>
  </div>
);

export default function CodingFamily() {

  const socialPlatforms = [
    { icon: Mic, label: 'Daily Speaking Practice', color: '#EF4444', textColor: 'text-red-600' },
    { icon: Users, label: 'Group Discussion & Debates', color: '#3B82F6', textColor: 'text-blue-600' },
    { icon: BookOpen, label: 'Language Lab Sessions', color: '#10B981', textColor: 'text-emerald-600' },
    { icon: Presentation, label: 'Interview Preparation', color: '#8B5CF6', textColor: 'text-purple-600' },
  ];

  return (
    <section className="w-full bg-white py-24 px-6 font-sans">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Heading */}
        <h2 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Join Our English Learning Family
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-20">
          Become a part of Vijayvargiya’s Spoken English Institute and build confidence in speaking, 
          personality development, and communication skills through practical learning methods.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 items-center justify-center">
          {socialPlatforms.map((platform, index) => (
            <SocialLink 
              key={index}
              icon={platform.icon}
              label={platform.label}
              color={platform.color}
              textColor={platform.textColor}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
