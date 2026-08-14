import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';

import { createAppContainer } from './src/di/createAppContainer';
import { ConverterApp } from './src/presentation/ConverterApp';

export default function App() {
  const container = useMemo(() => createAppContainer(), []);

  return (
    <>
      <StatusBar style="light" />
      <ConverterApp container={container} />
    </>
  );
}
