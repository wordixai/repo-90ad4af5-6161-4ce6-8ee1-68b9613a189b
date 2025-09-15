import React from 'react';
import { videoTemplates } from '../../remotion/utils/videoTemplates';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (templateId: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Choose Template</h3>
      
      <div className="space-y-3">
        {videoTemplates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all ${
              selectedTemplate === template.id
                ? 'bg-purple-900 border-purple-500'
                : 'bg-gray-800 border-gray-700 hover:border-gray-600'
            }`}
            onClick={() => onTemplateChange(template.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-sm">
                  {template.name}
                </CardTitle>
                <Badge variant={template.category === 'tech' ? 'default' : 'secondary'}>
                  {template.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400 text-xs">
                {template.description}
              </CardDescription>
              <div className="mt-2 text-xs text-gray-500">
                Duration: {Math.round(template.durationInFrames / 60)}s
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Button
        variant="outline"
        className="w-full text-white border-gray-600 hover:bg-gray-700"
      >
        Create Custom Template
      </Button>
    </div>
  );
};