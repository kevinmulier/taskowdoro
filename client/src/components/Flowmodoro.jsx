import { Pause, Square } from 'lucide-react';

const Flowmodoro = () => {
  return (
    <section className="flex flex-col items-center justify-center max-w-xl gap-3 p-5 mx-auto rounded-lg bg-base-300">
      <h1 className="text-xl font-bold">Flowmodoro</h1>
      <div className="flex gap-2 max-sm:flex-col">
        <button className="btn btn-square btn-outline">
          <Pause />
        </button>
        <button className="btn btn-square btn-outline">
          <Square />
        </button>
      </div>
    </section>
  );
};

export default Flowmodoro;
