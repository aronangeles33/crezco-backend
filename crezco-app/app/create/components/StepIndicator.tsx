interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  steps: { number: number; title: string; icon: string }[]
}

export function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="relative">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
          <div
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-500"
          ></div>
        </div>
      </div>

      {/* Steps */}
      <div className="flex justify-between">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold mb-2 transition-all ${
                step.number < currentStep
                  ? 'bg-purple-600 text-white'
                  : step.number === currentStep
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white scale-110'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step.number < currentStep ? '✓' : step.icon}
            </div>
            <span
              className={`text-xs text-center hidden md:block ${
                step.number === currentStep ? 'text-purple-600 font-semibold' : 'text-gray-500'
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
