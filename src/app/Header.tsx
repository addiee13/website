'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
  const [logo, setLogo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch('/api/logo');
        if (!response.ok) {
          throw new Error('Failed to fetch logo');
        }
        const data = await response.json();
        setLogo(data.imageUrl);
      } catch (err) {
        setError('Failed to load logo');
        console.error(err);
      }
    };

    fetchLogo();
  }, []);

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
          {logo ? (
            <Image src={logo} alt="Logo" width={100} height={100} />
          ) : (
            <div className="w-[100px] h-[100px] bg-gray-200 rounded-full" />
          )}
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
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
    </header>
  );
};

export default Header;