import React from "react";
import { Users, Target, Lightbulb, Code, Database, Globe, Shield, ChartLine, Rocket } from "lucide-react";
import AmitKumar from '../../assets/AmitKumar.jpg'
import AjayKumar from '../../assets/AjayKumar.jpg'

const About = () => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="bg-slate-900 h-16 w-full"></div>
      {/* Hero Section */}
      <div className="bg-cover bg-center relative overflow-hidden" >
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="relative max-w-5xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 mb-6 tracking-tight">
            CyberBrain Technology
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Transforming businesses through innovative technology solutions in web development, mobile applications, and data science.
          </p>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Guiding Principles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Committed to delivering excellence, innovation, and transformative technological solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-200 rounded-xl p-8 text-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="bg-blue-50 text-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <value.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Company Goals Section */}
      <div className=" text-gray-800 py-16">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4">Our Strategic Goals</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Driving technological innovation and creating sustainable value for our clients and partners.
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-8">
      {goals.map((goal, index) => (
        <div 
          key={index} 
          className={`p-8 rounded-xl ${index % 2 === 0 ? 'bg-teal-500' : 'bg-purple-600'}`}
        >
          <div className="flex items-center mb-4">
            <goal.icon className="w-10 h-10 text-white mr-4" />
            <h3 className="text-xl font-bold text-white">{goal.title}</h3>
          </div>
          <p className="text-white">{goal.description}</p>
        </div>
      ))}
    </div>
  </div>
</div>




      {/* Team Section */}
      <div className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Leadership</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our team combines deep technological expertise with visionary leadership.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center relative overflow-hidden"
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-36 h-36 rounded-full mx-auto mb-6 object-cover border-4 border-blue-500/50 shadow-lg"
                />
                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-blue-200 mb-4">{member.role}</p>
                                  <p>"{member.thoughts}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const values = [
  {
    icon: Users,
    title: "Expert Team",
    description: "Our team brings decades of professional experience across various technologies and industries.",
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description: "We focus on delivering measurable results that align with our clients' business objectives.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We stay ahead with cutting-edge technologies and methodologies to deliver the best solutions.",
  },
];



const goals = [
  {
    icon: Rocket,
    title: "Technology Leadership",
    description: "Continuously evolve our technological capabilities to stay at the forefront of innovation and provide cutting-edge solutions to our clients."
  },
  {
    icon: ChartLine,
    title: "Client Success",
    description: "Develop long-term partnerships by delivering exceptional value, driving business growth, and exceeding client expectations."
  },
  {
    icon: Shield,
    title: "Quality and Security",
    description: "Maintain the highest standards of software quality, data protection, and cybersecurity in all our technological solutions."
  },
  {
    icon: Lightbulb,
    title: "Continuous Innovation",
    description: "Foster a culture of creativity and continuous learning, exploring emerging technologies to solve complex business challenges."
  }
];

const team = [
  {
    name: "Mr.Amit Kumar",
    role: "CEO & Founder",
    image: AmitKumar,
    thoughts: "At Cyberbrain AI, we believe in the transformative potential of artificial intelligence to shape a better tomorrow. Our vision is rooted in innovation, learning, and creating impactful solutions that address real-world challenges. Through dedication and collaboration, we strive to build a future where technology serves as a catalyst for growth and opportunity. I invite you to explore our initiatives and join us on this exciting journey toward progress and excellence.",
  },
  {
    name: "Mr. Ajay Kumar",
    role: "CTO",
    image: AjayKumar,
    thoughts: "At Cyberbrain AI, I take immense pride in leading a team dedicated to harnessing the transformative power of artificial intelligence. With a strong foundation in Computer Science Engineering and Artificial Intelligence, I aim to drive innovation that addresses modern challenges and unlocks new possibilities. Through creativity and expertise, we are shaping solutions that bridge the gap between advanced technology and practical application. Together, we are paving the way for a future defined by intelligence, efficiency, and boundless potential.",
  },
];

export default About;