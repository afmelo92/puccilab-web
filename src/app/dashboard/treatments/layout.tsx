import React from 'react';

// import { Container } from './styles';

type TreatmentsLayout = {
  children: React.ReactNode;
};

const TreatmentsLayout: React.FC<TreatmentsLayout> = ({ children }) => {
  return <section className="w-full h-full">{children}</section>;
};

export default TreatmentsLayout;
