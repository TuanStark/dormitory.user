import React from 'react';
import Image from 'next/image';

interface PageBannerProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
  bgColor?: string;
  textColor?: string;
  align?: 'left' | 'center' | 'right';
  height?: 'small' | 'medium' | 'large';
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
  showPattern?: boolean;
}

const PageBanner: React.FC<PageBannerProps> = ({
  title,
  subtitle,
  bgImage = '/images/banner-bg.jpg',
  bgColor = 'bg-gradient-to-r from-blue-600 to-indigo-800',
  textColor = 'text-white',
  align = 'center',
  height = 'medium',
  breadcrumbs,
  showPattern = true,
}) => {
  // Determine height class
  const heightClass = {
    small: 'py-12',
    medium: 'py-16',
    large: 'py-24',
  }[height];

  // Determine text alignment
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  return (
    <div className={`relative ${heightClass} ${bgImage ? '' : bgColor}`}>
      {/* Background Image */}
      {bgImage && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80 z-10"></div>
          {/* <Image
            src={bgImage}
            alt={title}
            fill
            className="object-cover"
            priority
          /> */}
        </div>
      )}

      {/* Pattern Overlay */}
      {showPattern && (
        <div className="absolute inset-0 bg-pattern opacity-10 z-10"></div>
      )}

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4">
        <div className={`max-w-4xl mx-auto ${alignClass}`}>
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex justify-center mb-4">
              <ol className={`flex space-x-2 ${textColor} text-sm opacity-80`}>
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <li className="flex items-center">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 mx-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5l7 7-7 7" 
                          />
                        </svg>
                      </li>
                    )}
                    <li className="flex items-center">
                      {crumb.href ? (
                        <a 
                          href={crumb.href} 
                          className="hover:underline transition-all"
                        >
                          {crumb.label}
                        </a>
                      ) : (
                        <span>{crumb.label}</span>
                      )}
                    </li>
                  </React.Fragment>
                ))}
              </ol>
            </nav>
          )}

          {/* Title */}
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${textColor}`}>
            {title}
          </h1>
          
          {/* Subtitle */}
          {subtitle && (
            <p className={`text-lg md:text-xl opacity-90 ${textColor} max-w-3xl mx-auto`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageBanner; 