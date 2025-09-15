import React, { useState } from 'react';
import { Player } from '@remotion/player';
import { TechVideoComposition } from '../../remotion/compositions/TechVideoComposition';
import { VideoControls } from './VideoControls';
import { TemplateSelector } from './TemplateSelector';
import { PropsEditor } from './PropsEditor';
import { ExportPanel } from './ExportPanel';
import { videoTemplates } from '../../remotion/utils/videoTemplates';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export const VideoStudio: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(videoTemplates[0]);
  const [videoProps, setVideoProps] = useState(selectedTemplate.defaultProps);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTemplateChange = (templateId: string) => {
    const template = videoTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setVideoProps(template.defaultProps);
    }
  };

  const handlePropsChange = (newProps: any) => {
    setVideoProps({ ...videoProps, ...newProps });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      <div className="container mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Video Creation Studio
          </h1>
          <p className="text-xl text-gray-300">
            Create stunning tech videos with advanced animations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <Player
                    component={TechVideoComposition}
                    durationInFrames={selectedTemplate.durationInFrames}
                    compositionWidth={1920}
                    compositionHeight={1080}
                    fps={60}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    inputProps={videoProps}
                    controls
                    loop
                  />
                </div>
                
                <VideoControls
                  isPlaying={isPlaying}
                  onPlayPause={() => setIsPlaying(!isPlaying)}
                  duration={selectedTemplate.durationInFrames}
                />
              </CardContent>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            <Tabs defaultValue="template" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="template">Template</TabsTrigger>
                <TabsTrigger value="props">Edit</TabsTrigger>
                <TabsTrigger value="export">Export</TabsTrigger>
              </TabsList>
              
              <TabsContent value="template">
                <TemplateSelector
                  selectedTemplate={selectedTemplate.id}
                  onTemplateChange={handleTemplateChange}
                />
              </TabsContent>
              
              <TabsContent value="props">
                <PropsEditor
                  props={videoProps}
                  onPropsChange={handlePropsChange}
                />
              </TabsContent>
              
              <TabsContent value="export">
                <ExportPanel
                  template={selectedTemplate}
                  props={videoProps}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};