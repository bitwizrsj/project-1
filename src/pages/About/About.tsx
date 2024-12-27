import React from "react";

import MissionSection from "./MissionSection";
import CoreValues from "./CoreValues";
import TeamSection from "./TeamSection";



const About = () => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="bg-slate-900 h-16 w-full"></div>
      {/* Hero Section */}
      <div className="bg-cover bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="relative max-w-5xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-6 tracking-tight">
            Xyphramin
          </h1>
          <p className="text-xl text-purple-700 max-w-3xl mx-auto leading-relaxed">
            Transforming businesses through innovative technology solutions in web development, mobile applications, and data science.
          </p>
        </div>
      </div>

      {/* Core Values Section */}
      <CoreValues />

      {/* Company Goals Section */}
      <MissionSection />
        
      
    

      <TeamSection />
    </div>
  );
};

export default About;
