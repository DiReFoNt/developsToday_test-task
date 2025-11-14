import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import Input from '@/components/Input/Input.tsx';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const ControlledInput: Story['render'] = (args) => {
  const [localValue, setValue] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    args.onChange?.(e);
  };

  return <Input {...args} value={localValue} onChange={handleOnChange} />;
};

export const Default: Story = {
  args: {
    placeholder: '',
    type: 'text',
    clearable: false,
  },
  render: ControlledInput,
};
