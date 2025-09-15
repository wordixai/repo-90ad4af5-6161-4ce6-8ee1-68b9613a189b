import { Composition } from 'remotion';
import { TechVideoComposition } from './compositions/TechVideoComposition';
import { CodeRevealScene } from './scenes/CodeRevealScene';
import { LogoAnimationScene } from './scenes/LogoAnimationScene';
import { TerminalScene } from './scenes/TerminalScene';
import { DataVisualizationScene } from './scenes/DataVisualizationScene';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TechVideo"
        component={TechVideoComposition}
        durationInFrames={900}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Next.js Development",
          subtitle: "Building Modern Web Applications",
          logoUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=200&fit=crop",
          brandColor: "#8B5CF6",
          codeSnippets: [
            {
              language: "typescript",
              code: `import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export const UserComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);
  
  return (
    <div className="user-grid">
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};`,
              title: "React TypeScript Component"
            }
          ],
          terminalCommands: [
            "npm create next-app@latest",
            "cd my-app",
            "npm install",
            "npm run dev"
          ],
          dataPoints: [
            { label: "Performance", value: 95, color: "#10B981" },
            { label: "SEO", value: 88, color: "#3B82F6" },
            { label: "Accessibility", value: 92, color: "#8B5CF6" },
            { label: "Best Practices", value: 96, color: "#F59E0B" }
          ]
        }}
      />
      
      <Composition
        id="CodeReveal"
        component={CodeRevealScene}
        durationInFrames={300}
        fps={60}
        width={1920}
        height={1080}
      />
      
      <Composition
        id="LogoAnimation"
        component={LogoAnimationScene}
        durationInFrames={180}
        fps={60}
        width={1920}
        height={1080}
      />
      
      <Composition
        id="Terminal"
        component={TerminalScene}
        durationInFrames={240}
        fps={60}
        width={1920}
        height={1080}
      />
      
      <Composition
        id="DataVisualization"
        component={DataVisualizationScene}
        durationInFrames={300}
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};