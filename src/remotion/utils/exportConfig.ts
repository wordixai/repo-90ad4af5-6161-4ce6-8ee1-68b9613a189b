export interface ExportConfig {
  resolution: '1080p' | '4K' | 'mobile';
  platform: 'youtube' | 'linkedin' | 'twitter' | 'instagram' | 'web';
  format: 'mp4' | 'webm' | 'gif';
  quality: 'high' | 'medium' | 'low';
}

export const platformConfigs: Record<ExportConfig['platform'], Partial<ExportConfig>> = {
  youtube: {
    resolution: '1080p',
    format: 'mp4',
    quality: 'high',
  },
  linkedin: {
    resolution: '1080p',
    format: 'mp4',
    quality: 'high',
  },
  twitter: {
    resolution: '1080p',
    format: 'mp4',
    quality: 'medium',
  },
  instagram: {
    resolution: 'mobile',
    format: 'mp4',
    quality: 'medium',
  },
  web: {
    resolution: '1080p',
    format: 'webm',
    quality: 'medium',
  },
};

export const resolutionSettings = {
  '1080p': { width: 1920, height: 1080 },
  '4K': { width: 3840, height: 2160 },
  mobile: { width: 1080, height: 1920 },
};

export const getOptimalSettings = (platform: ExportConfig['platform']): ExportConfig => {
  const config = platformConfigs[platform];
  return {
    resolution: config.resolution || '1080p',
    platform,
    format: config.format || 'mp4',
    quality: config.quality || 'medium',
  };
};