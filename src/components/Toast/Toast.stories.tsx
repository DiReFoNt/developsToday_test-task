import type { Meta, StoryObj } from '@storybook/react-vite';

import { ToastType } from '@/components/Toast/Toast.types.ts';

import Toast from '@/components/Toast/Toast.tsx';
import { ToastProvider } from '@/hooks/toast/ToastProvider.tsx';
import { useToast } from '@/hooks/toast/useToast.ts';

const meta: Meta<typeof Toast> = {
  title: 'UI/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: { control: 'text' },
    iconType: {
      control: 'select',
      options: Object.values(ToastType),
    },
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
    },
    duration: { control: 'number' },
    showCloseButton: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const LiveDemo: Story = {
  name: 'Live Demo',

  args: {
    text: 'This is a toast message',
    iconType: ToastType.INFO,
    duration: 3000,
    position: 'bottom-right',
    showCloseButton: true,
  },

  render: (args) => {
    const StoryComponent = () => {
      const { showToast } = useToast();

      const handleShow = () => {
        showToast({
          text: args.text,
          variant: args.variant,
          iconType: args.iconType,
          duration: args.duration,
          position: args.position,
          showCloseButton: args.showCloseButton,
        });
      };
      return (
        <div style={{ textAlign: 'center', width: '300px' }}>
          <button
            onClick={handleShow}
            style={{ padding: '8px 12px', borderRadius: '10px' }}
          >
            Show Toast
          </button>
        </div>
      );
    };
    return <StoryComponent />;
  },

  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export const AllStaticVariants: Story = {
  name: 'Static (All variants and positions)',

  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Toast
        text="This is a info message"
        iconType={ToastType.INFO}
        position="top-left"
      />

      <Toast
        text="This is a error message"
        iconType={ToastType.ERROR}
        variant={'error'}
        position="top-center"
      />

      <Toast
        text="This is a warning message"
        iconType={ToastType.WARNING}
        showCloseButton={true}
        variant={'warning'}
        position="top-right"
      />

      <Toast
        text="This is a info message"
        iconType={ToastType.INFO}
        position="bottom-left"
      />

      <Toast
        text="This is a error message"
        iconType={ToastType.ERROR}
        variant={'error'}
        position="bottom-center"
      />

      <Toast
        text="This is a warning message"
        iconType={ToastType.WARNING}
        showCloseButton={true}
        variant={'warning'}
        position="bottom-right"
      />
    </div>
  ),
};
