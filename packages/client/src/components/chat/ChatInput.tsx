import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { FaArrowUp } from 'react-icons/fa';

export type ChatFormData = {
  prompt: string;
};

type Props = {
  onSubmit: (data: ChatFormData) => void;
};

function ChatInput({ onSubmit }: Props) {
  const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();

  const submit = handleSubmit((data) => {
    reset({ prompt: '' });
    onSubmit(data);
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <form
      onSubmit={submit}
      onKeyDown={handleKeyDown}
      className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
    >
      <textarea
        {...register('prompt', {
          required: true,
          validate: (data) => data.trim().length > 0,
        })}
        autoFocus
        className="w-full border-0 focus:outline-0 resize-none"
        placeholder="Ask anything"
        maxLength={1000}
      />
      <Button disabled={!formState.isValid} className="rounded-full size-9">
        <FaArrowUp />
      </Button>
    </form>
  );
}

export default ChatInput;
