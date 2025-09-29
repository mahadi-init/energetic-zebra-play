"use client";

import React, { useState } from 'react';
import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

interface TourGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const TourGuide: React.FC<TourGuideProps> = ({ isOpen, onClose }) => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const steps: Step[] = [
    {
      target: 'body',
      title: 'Welcome to Todo App!',
      content: 'This interactive tour will show you how to use all the features of our todo application.',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.todo-input',
      title: 'Add Todos & Images',
      content: 'Type your todo here or paste images directly with Ctrl+V. You can also start with "going" or "done" to auto-categorize!',
      placement: 'bottom',
    },
    {
      target: '.add-button',
      title: 'Add Button',
      content: 'Click here to add your todo. If you pasted an image, it will be added automatically.',
      placement: 'bottom',
    },
    {
      target: '.todo-column',
      title: 'To Do Column',
      content: 'This is where new tasks start. Click "Start" to move tasks to ongoing status.',
      placement: 'right',
    },
    {
      target: '.ongoing-column',
      title: 'Ongoing Column',
      content: 'Tasks you\'re working on go here. The timer shows how long you\'ve been working on each task.',
      placement: 'top',
    },
    {
      target: '.done-column',
      title: 'Done Column',
      content: 'Completed tasks go here. You can reopen them if needed.',
      placement: 'left',
    },
    {
      target: '.todo-image',
      title: 'Image Support',
      content: 'Click on any image to view it in full screen! Perfect for screenshots and visual references.',
      placement: 'top',
    },
    {
      target: 'body',
      title: 'You\'re All Set!',
      content: 'Now you know how to use all the features. Your todos are automatically saved locally.',
      placement: 'center',
    }
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index } = data;
    
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      setStepIndex(0);
      onClose();
    } else if (typeof index === 'number') {
      setStepIndex(index);
    }
  };

  const startTour = () => {
    setRun(true);
    setStepIndex(0);
  };

  if (!isOpen) return null;

  return (
    <>
      <Joyride
        steps={steps}
        run={run}
        stepIndex={stepIndex}
        continuous={true}
        scrollToFirstStep={true}
        showProgress={true}
        showSkipButton={true}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: '#7c3aed',
            textColor: '#1f2937',
            backgroundColor: '#ffffff',
            overlayColor: 'rgba(0, 0, 0, 0.5)',
          },
          tooltipContainer: {
            textAlign: 'left',
          },
          buttonNext: {
            backgroundColor: '#7c3aed',
            color: '#ffffff',
          },
          buttonBack: {
            color: '#7c3aed',
          },
          buttonSkip: {
            color: '#ef4444',
          },
        }}
        locale={{
          back: 'Back',
          close: 'Close',
          last: 'Finish',
          next: 'Next',
          skip: 'Skip',
        }}
      />
      
      {!run && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={startTour}
            className="bg-purple-600 hover:bg-purple-700 rounded-full p-4 h-12 w-12 shadow-lg"
            title="Start Tour"
          >
            <HelpCircle className="w-6 h-6" />
          </Button>
        </div>
      )}
    </>
  );
};

export default TourGuide;