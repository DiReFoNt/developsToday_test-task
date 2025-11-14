import type { Meta, StoryObj } from '@storybook/react';
import Sidebar from '@/components/Sidebar/Sidebar.tsx';
import React, { useState } from 'react';

const meta: Meta<typeof Sidebar> = {
  title: 'UI/Sidebar',
  component: Sidebar,
  parameters: {
    backgroundColor: '#f8f9fa',
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ShowSidebarButton = ({
  onClick,
  children = 'Show Sidebar',
}: {
  onClick: () => void;
  children?: React.ReactNode;
}) => {
  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    borderRadius: '8px',
    backgroundColor: '#b2dfdb',
    color: '#263238',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    minWidth: '150px',
    outline: 'none',
  };

  return (
    <button onClick={onClick} style={buttonStyle}>
      {children}
    </button>
  );
};

export const Default: Story = {
  name: 'Live Demo (Default Content)',
  args: {
    children: (
      <div style={{ padding: '20px', color: '#333' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
        pellentesque condimentum justo. Nunc suscipit tincidunt fermentum. Proin
        ut augue eget nulla consequat blandit ut sed lacus. Fusce sed tempor
        leo, ac fringilla ipsum. Pellentesque venenatis augue ut semper luctus.
      </div>
    ),
    header: 'My Default Sidebar',
    footer: 'Default Footer',
  },

  render: (args) => {
    const StoryComponent = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <div style={{ textAlign: 'center', width: '300px' }}>
          <ShowSidebarButton onClick={() => setIsOpen(true)} />
          <Sidebar
            {...args}
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
          />
        </div>
      );
    };

    return <StoryComponent />;
  },
};

const SubmenuItem = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const itemStyle: React.CSSProperties = {
    padding: '13px 20px',
    cursor: 'pointer',
    borderBottom: '1px solid #f0f0f0',
    color: '#495057',
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '15px',
    fontWeight: '500',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  };

  const submenuContentStyle: React.CSSProperties = {
    paddingLeft: '25px',
    backgroundColor: '#fcfcfc',
    overflow: 'hidden',
    maxHeight: isSubmenuOpen ? '500px' : '0',
    transition: 'max-height 0.4s ease-in-out',
  };

  const arrowStyle: React.CSSProperties = {
    marginLeft: '10px',
    transition: 'transform 0.3s ease',
    transform: isSubmenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  };

  return (
    <div>
      <div style={itemStyle} onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}>
        {title} <span style={arrowStyle}>▼</span>
      </div>
      <div style={submenuContentStyle}>{children}</div>
    </div>
  );
};

const SimpleItem = ({ children }: { children: React.ReactNode }) => {
  const style: React.CSSProperties = {
    padding: '13px 20px',
    borderBottom: '1px solid #f0f0f0',
    color: '#495057',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '15px',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  };

  return <div style={style}>{children}</div>;
};

export const WithSubmenus: Story = {
  name: 'WithSubmenus',
  args: {
    header: (
      <div
        style={{
          padding: '20px 20px',
          backgroundColor: '#ffffff',
          color: '#263238',
          borderBottom: '1px solid #b2dfdb',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      >
        Pastel Menu
      </div>
    ),
  },

  render: (args) => {
    const StoryComponent = () => {
      const [isOpen, setIsOpen] = useState(false);

      const sidebarContent = (
        <div
          style={{
            color: '#343a40',
            backgroundColor: '#ffffff',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            height: '100%',
          }}
        >
          <SimpleItem>🏠 Home</SimpleItem>

          <SubmenuItem title="📦 Products">
            <SimpleItem>Product 1</SimpleItem>
            <SimpleItem>Product 2</SimpleItem>
            <SubmenuItem title="More Products">
              <SimpleItem>Product 2a</SimpleItem>
              <SimpleItem>Product 2b</SimpleItem>
            </SubmenuItem>
          </SubmenuItem>

          <SubmenuItem title="⚙️ Settings">
            <SimpleItem>Profile</SimpleItem>
            <SimpleItem>Account</SimpleItem>
            <SimpleItem>Privacy</SimpleItem>
          </SubmenuItem>

          <SimpleItem>Logout</SimpleItem>
        </div>
      );

      return (
        <div style={{ textAlign: 'center', width: '300px' }}>
          <ShowSidebarButton
            onClick={() => setIsOpen(true)}
            children="Show Sidebar"
          />

          <Sidebar
            {...args}
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
            children={sidebarContent}
          />
        </div>
      );
    };

    return <StoryComponent />;
  },
};
