'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@heroui/react';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className='flex gap-2'>
      <Button size='sm' onPress={() => setTheme('light')}>
        Light
      </Button>
      <Button size='sm' onPress={() => setTheme('dark')}>
        Dark
      </Button>
      <Button size='sm' onPress={() => setTheme('system')}>
        System
      </Button>
    </div>
  );
}