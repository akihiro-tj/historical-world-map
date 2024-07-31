import { useEffect, useState } from 'react';

export const useLocationHash = () => {
  const [hash, setHash] = useState<string>();

  useEffect(() => {
    const handleHashChange = () => {
      const hasHash = window.location.hash.match(/#.+/);
      if (hasHash) {
        setHash(decodeURI(window.location.hash.slice(1)));
      } else {
        setHash(undefined);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return { hash };
};
