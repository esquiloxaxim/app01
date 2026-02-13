import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './screens/Home';
import Identification from './screens/Identification';
import Registration from './screens/Registration';
import Payment from './screens/Payment';
import Profile from './screens/Profile';
import Documents from './screens/Documents';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <main className="flex-1 flex flex-col w-full mx-auto relative">
        {children}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/identification" element={<Identification />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/documents" element={<Documents />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}