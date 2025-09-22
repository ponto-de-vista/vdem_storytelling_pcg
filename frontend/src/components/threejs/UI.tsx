import { type JSX } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { storyPoints } from './data';

// Define props for the UI component for better type safety
interface UIProps {
  activeIndex: number;
  isPopupVisible: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onExplore: () => void;
  onClosePopup: () => void;
}

// This component handles all the 2D HTML overlay elements
export function UI({
  activeIndex,
  isPopupVisible,
  onNext,
  onPrevious,
  onExplore,
  onClosePopup,
}: UIProps): JSX.Element {
  const ActiveGraph = storyPoints[activeIndex].GraphComponent;

  return (
    <>
      {/* 2D HTML Overlay UI */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-5 left-1/2 -translate-x-1/2 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            {storyPoints[activeIndex].title}
          </h1>
          <p className="text-gray-600">
            {storyPoints[activeIndex].description}
          </p>
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-4 pointer-events-auto">
          <button
            onClick={onPrevious}
            className="px-6 py-2 bg-white rounded-lg shadow-md hover:bg-gray-200 transition"
          >
            Anterior
          </button>
          <button
            onClick={onExplore}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition font-semibold"
          >
            Explorar Gráfico
          </button>
          <button
            onClick={onNext}
            className="px-6 py-2 bg-white rounded-lg shadow-md hover:bg-gray-200 transition"
          >
            Próximo
          </button>
        </div>
      </div>

      {/* Popup Modal for the Graph */}
      <AnimatePresence>
        {isPopupVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center p-4 z-20"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[80vh] p-6 flex flex-col pointer-events-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  {storyPoints[activeIndex].title}
                </h2>
                <button
                  onClick={onClosePopup}
                  className="text-2xl text-gray-500 hover:text-gray-800"
                >
                  &times;
                </button>
              </div>
              <div className="flex-grow w-full h-full overflow-auto">
                <ActiveGraph />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
