export interface VideoTemplate {
  id: string;
  name: string;
  description: string;
  durationInFrames: number;
  defaultProps: any;
  category: 'tech' | 'business' | 'education' | 'social';
}

export const videoTemplates: VideoTemplate[] = [
  {
    id: 'tech-product-demo',
    name: 'Tech Product Demo',
    description: 'Showcase your tech product with code snippets and terminal commands',
    durationInFrames: 900,
    category: 'tech',
    defaultProps: {
      title: "Your Product",
      subtitle: "Building the Future",
      logoUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=200&fit=crop",
      brandColor: "#8B5CF6",
      codeSnippets: [
        {
          language: "typescript",
          code: `// Your amazing code here\nconst app = new Application();\napp.start();`,
          title: "Quick Start"
        }
      ],
      terminalCommands: ["npm install", "npm start"],
      dataPoints: [
        { label: "Performance", value: 95, color: "#10B981" }
      ]
    }
  },
  {
    id: 'api-documentation',
    name: 'API Documentation',
    description: 'Present your API with interactive code examples',
    durationInFrames: 720,
    category: 'tech',
    defaultProps: {
      title: "API Documentation",
      subtitle: "RESTful API Guide",
      logoUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&h=200&fit=crop",
      brandColor: "#3B82F6",
      codeSnippets: [
        {
          language: "javascript",
          code: `fetch('/api/users')\n  .then(res => res.json())\n  .then(data => console.log(data));`,
          title: "Fetch Users"
        }
      ],
      terminalCommands: ["curl -X GET /api/users"],
      dataPoints: [
        { label: "Uptime", value: 99, color: "#10B981" },
        { label: "Response Time", value: 85, color: "#3B82F6" }
      ]
    }
  },
  {
    id: 'tutorial-walkthrough',
    name: 'Tutorial Walkthrough',
    description: 'Step-by-step coding tutorial with explanations',
    durationInFrames: 1200,
    category: 'education',
    defaultProps: {
      title: "Learn React",
      subtitle: "From Zero to Hero",
      logoUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=200&fit=crop",
      brandColor: "#61DAFB",
      codeSnippets: [
        {
          language: "jsx",
          code: `function Welcome({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}`,
          title: "React Component"
        }
      ],
      terminalCommands: ["npx create-react-app my-app", "cd my-app", "npm start"],
      dataPoints: [
        { label: "Completion", value: 0, color: "#61DAFB" }
      ]
    }
  }
];

export const getTemplateById = (id: string): VideoTemplate | undefined => {
  return videoTemplates.find(template => template.id === id);
};

export const getTemplatesByCategory = (category: VideoTemplate['category']): VideoTemplate[] => {
  return videoTemplates.filter(template => template.category === category);
};