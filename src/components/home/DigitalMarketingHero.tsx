import React from 'react';

const DigitalMarketingHero = () => {
  return (
    <section className="relative bg-white text-gray-800 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 right-0 h-full" 
          style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C6EE6\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")', backgroundSize: '20px 20px'}}></div>
      </div>

      {/* Purple accent shapes */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600 rounded-full opacity-10"></div>
      <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-purple-600 rounded-full opacity-10"></div>
      <div className="absolute top-1/2 right-0 w-2 h-40 bg-purple-600 rounded-l-lg"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Content Side */}
          <div className="lg:col-span-6">
            <div className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-600 mb-6">
              <span className="text-sm font-medium tracking-wider uppercase">Digital Marketing Solutions</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Elevate Your <span className="text-purple-600">Digital Presence</span>
            </h1>
            
            <p className="text-gray-600 text-lg mb-8 max-w-lg">
              Our data-driven digital marketing strategies help businesses increase visibility, engage audiences, and achieve measurable growth in today's competitive landscape.
            </p>
            
            {/* Service Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {[
                {name: "SEO", icon: "📈"},
                {name: "PPC", icon: "🎯"},
                {name: "Social", icon: "📱"},
                {name: "Content", icon: "✍️"},
                {name: "Email", icon: "📧"},
                {name: "Analytics", icon: "📊"}
              ].map((service, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-2 shadow-sm hover:border-purple-300 hover:shadow-md transition-all duration-300">
                  <span className="text-lg">{service.icon}</span>
                  <span className="font-medium">{service.name}</span>
                </div>
              ))}
            </div>
            
            {/* CTA Button */}
            <div className="mt-8">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-purple-200 transition-all duration-300 flex items-center gap-2">
                Request Strategy
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Visual Side */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Main Analytics Dashboard */}
              <div className="rounded-xl overflow-hidden shadow-xl border border-gray-200">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Digital Marketing Analytics Dashboard" 
                  className="w-full object-cover"
                />
              </div>
              
              {/* Floating Statistics */}
              <div className="absolute -top-6 -left-6 bg-white rounded-lg shadow-lg p-4 border-l-4 border-purple-600">
                <p className="text-xl font-bold text-purple-600">+127%</p>
                <p className="text-sm text-gray-500">Conversion Rate</p>
              </div>
              
              <div className="absolute -bottom-4 right-12 bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 border-t-4 border-purple-600">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <path d="M22 4 12 14.01l-3-3"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-bold">ROI Goals</p>
                  <p className="text-sm text-gray-500">Exceeded by 45%</p>
                </div>
              </div>
              
              {/* Graph Element */}
              <div className="absolute top-1/3 -right-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                <div className="w-24 h-16 flex items-end gap-1">
                  <div className="w-2 h-6 bg-gray-200 rounded-t-sm"></div>
                  <div className="w-2 h-8 bg-gray-200 rounded-t-sm"></div>
                  <div className="w-2 h-5 bg-gray-200 rounded-t-sm"></div>
                  <div className="w-2 h-7 bg-gray-200 rounded-t-sm"></div>
                  <div className="w-2 h-10 bg-purple-500 rounded-t-sm"></div>
                  <div className="w-2 h-12 bg-purple-600 rounded-t-sm"></div>
                  <div className="w-2 h-14 bg-purple-700 rounded-t-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonial/Social Proof Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="mb-6 sm:mb-0">
              <p className="text-sm text-gray-500 uppercase font-medium tracking-wider">Trusted by leading brands</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 w-20">
                  <div className="h-full w-full bg-gray-200 rounded-md"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Success Metrics */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {value: "500+", label: "Campaigns Managed"},
            {value: "95%", label: "Client Retention"},
            {value: "12M+", label: "Leads Generated"},
            {value: "8.5x", label: "Average ROI"}
          ].map((metric, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-100 rounded-lg p-6 text-center hover:border-purple-200 transition-all duration-300">
              <p className="text-3xl font-bold text-purple-600">{metric.value}</p>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalMarketingHero;