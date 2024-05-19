import { useEffect, useState } from 'react';

function App() {
  const [observedBlocks, setObservedBlocks] = useState<number[]>([]);

  useEffect(() => {
    const observedBlocks = document.querySelectorAll('.observedBlock');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const blockIndex = Number(entry.target.textContent);
        if (entry.isIntersecting) {
          setObservedBlocks((prev) => [...prev, blockIndex].sort());
        } else {
          setObservedBlocks((prev) =>
            prev.filter((block) => block !== blockIndex)
          );
        }
      });
    });
    observedBlocks.forEach((block) => observer.observe(block));
    return () => {
      observedBlocks.forEach((block) => observer.unobserve(block));
      setObservedBlocks([]);
    };
  }, []);

  return (
    <main>
      <div className='w-screen h-screen flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold'>Intersection Observer</h1>
        <p className='text-red-500 font-bold space-x-2'>
          displayed blocks:
          {observedBlocks.map((block) => (
            <span key={block}>Block {block}</span>
          ))}
        </p>
        <div className='w-[500px] h-[300px] overflow-auto'>
          <div className='observedBlock w-full leading-[200px] text-center text-2xl h-[200px] bg-red-300'>
            1
          </div>
          <div className='observedBlock w-full leading-[200px] text-center text-2xl h-[200px] bg-green-300'>
            2
          </div>
          <div className='observedBlock w-full leading-[200px] text-center text-2xl h-[200px] bg-blue-300'>
            3
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
