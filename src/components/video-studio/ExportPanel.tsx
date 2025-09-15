import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Download, Settings, Cloud } from 'lucide-react';
import { getOptimalSettings, platformConfigs } from '../../remotion/utils/exportConfig';

interface ExportPanelProps {
  template: any;
  props: any;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({
  template,
  props,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('youtube');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      // In a real implementation, this would trigger the Remotion render
      console.log('Export completed for platform:', selectedPlatform);
    }, 3000);
  };

  const exportConfig = getOptimalSettings(selectedPlatform as any);

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Export Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="platform" className="text-white">Platform</Label>
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="web">Web</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Resolution</Label>
              <div className="text-sm text-white bg-gray-700 p-2 rounded">
                {exportConfig.resolution}
              </div>
            </div>
            <div>
              <Label className="text-gray-300">Format</Label>
              <div className="text-sm text-white bg-gray-700 p-2 rounded">
                {exportConfig.format.toUpperCase()}
              </div>
            </div>
          </div>

          <div>
            <Label className="text-gray-300">Quality</Label>
            <div className="text-sm text-white bg-gray-700 p-2 rounded">
              {exportConfig.quality.charAt(0).toUpperCase() + exportConfig.quality.slice(1)}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Export Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? 'Exporting...' : 'Export Video'}
          </Button>

          <Button
            variant="outline"
            className="w-full text-white border-gray-600 hover:bg-gray-700"
          >
            <Settings className="w-4 h-4 mr-2" />
            Advanced Settings
          </Button>

          <Button
            variant="outline"
            className="w-full text-white border-gray-600 hover:bg-gray-700"
          >
            <Cloud className="w-4 h-4 mr-2" />
            Cloud Render
          </Button>
        </CardContent>
      </Card>

      <div className="text-xs text-gray-400 space-y-1">
        <p>• Videos render at 60fps for smooth animations</p>
        <p>• Export time depends on video length and complexity</p>
        <p>• Cloud rendering available for faster processing</p>
      </div>
    </div>
  );
};