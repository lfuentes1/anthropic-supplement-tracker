
import React, { useState } from 'react';
import { BarChart3, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Textarea } from '@/components/ui/textarea';

const Insights = () => {
  const [isIntelliPromptsOpen, setIsIntelliPromptsOpen] = useState(false);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg">
            <BarChart3 className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Insights</h2>
        </div>
        <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
          View All
        </button>
      </div>

      {/* IntelliPrompts Section */}
      <Collapsible open={isIntelliPromptsOpen} onOpenChange={setIsIntelliPromptsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-purple-600 font-medium">IntelliPrompts</span>
              <span className="text-purple-400">✨</span>
            </div>
            {isIntelliPromptsOpen ? (
              <ChevronUp className="w-4 h-4 text-purple-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-purple-600" />
            )}
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mb-6">
          <div className="border rounded-lg p-4 bg-white">
            <div className="mb-4">
              <Textarea
                placeholder="Ask anything&#10;Example questions:&#10;e.g. Are there any recalls for the supplements that I am taking?&#10;e.g. Can you recommend supplements that have been evaluated by independent 3rd party companies?&#10;&#10;Example commands:&#10;e.g. Anytime my supplement intake changes, provide me with absorption tips.&#10;e.g. Always use IntelliAdd when I add a new supplement.&#10;e.g. Send me a text when I forget to take my daily supplements."
                className="min-h-[120px] resize-none"
                rows={6}
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center py-12">
          <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No insights available yet</h3>
          <p className="text-gray-500 mb-4">Start tracking your supplements to see patterns and recommendations.</p>
          <div className="text-sm text-gray-400">
            Insights will appear after a few days of tracking
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
