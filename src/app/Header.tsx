'use client';
import React from 'react';
import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Ministries', href: '/ministries' },
  { label: 'Social Media', href: '/social' },
];

const Header: React.FC = () => {
  const handleNavClick = async (href: string) => {
    try {
      const response = await fetch(href);
      if (!response.ok) {
        throw new Error('Failed to fetch content');
      }
      const html = await response.text();
      // Here you would typically update your app's state or routing
      console.log('Received HTML:', html);
    } catch (err) {
      console.error('Error fetching content:', err);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="#4A90E2" />
            <text x="50" y="50" fontFamily="Arial" fontSize="40" fill="white" textAnchor="middle" dominantBaseline="central">
              Logo
            </text>
          </svg>
        </div>
        <nav>
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} onClick={() => handleNavClick(item.href)}>
                  <span className="text-gray-600 hover:text-gray-900">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;