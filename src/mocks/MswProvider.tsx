'use client';

import { useEffect, useState } from 'react';

export const MswProvider = ({ children }: { children: React.ReactNode }) => {
  const [mswReady, setMswReady] = useState(false);
  useEffect(() => {
    const init = async () => {
      const mockEnable = await import('../utils/mockEnable').then(
        res => res.default,
      );
      await mockEnable();
      setMswReady(true);
    };

    if (!mswReady) {
      init();
    }
  }, [mswReady]);

  return <>{children}</>;
};
