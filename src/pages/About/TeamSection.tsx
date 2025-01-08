import React from "react";
import { Twitter, Instagram, Linkedin } from "lucide-react";
import AmitKumar from "../../../assets/AmitKumar.jpg";
import AjayKumar from "../../../assets/AjayKumar.jpg";

// Sample team data
const team = [
  {
    name: "Mr. Amit Kumar",
    role: "CEO & Founder",
    image: AmitKumar,
    thoughts:
      "At Xyphramin Technologies, we believe in the transformative potential of artificial intelligence to shape a better tomorrow. Our vision is rooted in innovation, learning, and creating impactful solutions that address real-world challenges. Through dedication and collaboration, we strive to build a future where technology serves as a catalyst for growth and opportunity. I invite you to explore our initiatives and join us on this exciting journey toward progress and excellence.",
    socials: {
      twitter: "https://twitter.com/example",
      instagram: "https://instagram.com/example",
      linkedin: "https://linkedin.com/in/example",
    },
  },
  {
    name: "Mr. Ajay Kumar",
    role: "CTO",
    image: AjayKumar,
    thoughts:
      "At Xyphramin Technologies, I take immense pride in leading a team dedicated to harnessing the transformative power of artificial intelligence. With a strong foundation in Computer Science Engineering and Artificial Intelligence, I aim to drive innovation that addresses modern challenges and unlocks new possibilities. Through creativity and expertise, we are shaping solutions that bridge the gap between advanced technology and practical application. Together, we are paving the way for a future defined by intelligence, efficiency, and boundless potential.",
    socials: {
      twitter: "https://twitter.com/example",
      instagram: "https://instagram.com/example",
      linkedin: "https://linkedin.com/in/example",
    },
  },
];

const TeamSection = () => {
  return (
    <div className="bg-slate-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-2">Meet the Brains</h2>
        <p className="text-gray-400 text-center mb-12">
          These people work on making our product the best.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {team.map((member, index) => (
            <div key={`${member.name}-${index}`} className="flex items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500 group">
                  <img
                    src={member.image}
                    alt={`Profile picture of ${member.name}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm mb-4">{member.thoughts}</p>

                <div className="flex gap-3">
                  <a
                    href={member.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors transform hover:scale-110"
                  >
                    <Twitter className="w-4 h-4 text-gray-400 group-hover:text-white" />
                  </a>
                  <a
                    href={member.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors transform hover:scale-110"
                  >
                    <Instagram className="w-4 h-4 text-gray-400 group-hover:text-white" />
                  </a>
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors transform hover:scale-110"
                  >
                    <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-white" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
