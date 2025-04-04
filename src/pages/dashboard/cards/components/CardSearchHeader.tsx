
import React from 'react';
import { ReactNode } from 'react';

interface CardSearchHeaderProps {
  title: ReactNode;
  subtitle: ReactNode;
}

const CardSearchHeader: React.FC<CardSearchHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <p className="text-gray-400">{subtitle}</p>
    </div>
  );
};

export default CardSearchHeader;
