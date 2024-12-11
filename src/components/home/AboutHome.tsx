import React from 'react';
import { Users, Target, Lightbulb } from 'lucide-react';
import img from '../../../assets/AboutHome.png'

const features = [
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Our talented professionals bring years of industry experience'
  },
  {
    icon: Target,
    title: 'Goal-Oriented',
    description: 'We focus on delivering measurable results for our clients'
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'Staying ahead with cutting-edge technologies and methodologies'
  }
];

export default function AboutHome() {
  return (
    <section className="py-20 bg-gray-50" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">About CyberBrain AI Solutions LLP</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're a forward-thinking software development company dedicated to delivering innovative solutions that drive business growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src={img}
              alt="Team collaboration"
              className="rounded-lg shadow-xl"
            />
          </div>

          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}