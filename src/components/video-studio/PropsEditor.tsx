import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface PropsEditorProps {
  props: any;
  onPropsChange: (newProps: any) => void;
}

export const PropsEditor: React.FC<PropsEditorProps> = ({
  props,
  onPropsChange,
}) => {
  const handleInputChange = (key: string, value: any) => {
    onPropsChange({ [key]: value });
  };

  const handleCodeSnippetChange = (index: number, field: string, value: string) => {
    const newSnippets = [...props.codeSnippets];
    newSnippets[index] = { ...newSnippets[index], [field]: value };
    handleInputChange('codeSnippets', newSnippets);
  };

  const addCodeSnippet = () => {
    const newSnippets = [
      ...props.codeSnippets,
      { language: 'javascript', code: '', title: 'New Snippet' }
    ];
    handleInputChange('codeSnippets', newSnippets);
  };

  const removeCodeSnippet = (index: number) => {
    const newSnippets = props.codeSnippets.filter((_: any, i: number) => i !== index);
    handleInputChange('codeSnippets', newSnippets);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Basic Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-white">Title</Label>
            <Input
              id="title"
              value={props.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="subtitle" className="text-white">Subtitle</Label>
            <Input
              id="subtitle"
              value={props.subtitle}
              onChange={(e) => handleInputChange('subtitle', e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="brandColor" className="text-white">Brand Color</Label>
            <div className="flex gap-2">
              <Input
                id="brandColor"
                type="color"
                value={props.brandColor}
                onChange={(e) => handleInputChange('brandColor', e.target.value)}
                className="w-16 h-10 bg-gray-700 border-gray-600"
              />
              <Input
                value={props.brandColor}
                onChange={(e) => handleInputChange('brandColor', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="#8B5CF6"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Code Snippets</CardTitle>
            <Button
              size="sm"
              onClick={addCodeSnippet}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {props.codeSnippets?.map((snippet: any, index: number) => (
            <div key={index} className="border border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-white">Snippet {index + 1}</Label>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removeCodeSnippet(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label className="text-gray-300">Title</Label>
                  <Input
                    value={snippet.title}
                    onChange={(e) => handleCodeSnippetChange(index, 'title', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-300">Language</Label>
                  <Input
                    value={snippet.language}
                    onChange={(e) => handleCodeSnippetChange(index, 'language', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-300">Code</Label>
                  <Textarea
                    value={snippet.code}
                    onChange={(e) => handleCodeSnippetChange(index, 'code', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white font-mono"
                    rows={6}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};