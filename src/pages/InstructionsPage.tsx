
import { useEffect, useState } from 'react';
import ParticleField from '../components/ParticleField';

const InstructionsPage = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ParticleField
        mouseX={mousePos.x}
        mouseY={mousePos.y}
        isHovered={isHovered}
      />
      <div className="min-h-screen pt-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">MCP Installation Instructions</h1>
          <div className="prose lg:prose-xl max-w-none">
            <ol>
              <li>
                <h3>Create a sub-account on rs.ge</h3>
                <p>Watch this video tutorial to learn how to create a sub-account on rs.ge:</p>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src="https://www.youtube.com/embed/WPCbhTuqI9w"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </li>
              <li>
                <h3>Your TIN and password</h3>
                <p>Your TIN and password are filled in here, which will be used in the MCP installation. Here is an image for this section:</p>
                <img src="/images/rs.ge_tin_pas.png" alt="RS.ge TIN and Password" />
              </li>
              <li>
                <h3>Windows Defender Warning</h3>
                <p>While installing MCP, Windows Defender might show a warning that the app may be harmful. Click on "More info" and then "Run anyway" to permit the installation.</p>
              </li>
              <li>
                <h3>Enter TIN and Password Twice</h3>
                <p>You will have to insert your TIN and password two times during the installation process.</p>
              </li>
              <li>
                <h3>Restart Your Computer</h3>
                <p>After the installation is complete, please restart your computer.</p>
              </li>
              <li>
                <h3>Open Claude Desktop</h3>
                <p>After restarting, open Claude Desktop and feel free to use the app.</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;
