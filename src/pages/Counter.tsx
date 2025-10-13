// src/components/Counter.tsx
import { useState } from 'react';

interface CounterProps {
  initialValue?: number;
}

export const Counter = ({ initialValue = 0 }: CounterProps) => {
  const [count, setCount] = useState(initialValue);
  return (
    <div className='counter'>
      // 故意出错：用双引号
    <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
};