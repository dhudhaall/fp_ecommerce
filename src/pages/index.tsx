import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to My Next.js App!</h1>
      <p>This is the homepage.</p>
      <Link href="/products">
        View Products
      </Link>
    </div>
  );
};

export default HomePage;