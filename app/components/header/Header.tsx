import { useStore } from '@nanostores/react';
import { ClientOnly } from 'remix-utils/client-only';
import { chatStore } from '~/lib/stores/chat';
import { classNames } from '~/utils/classNames';
import { HeaderActionButtons } from './HeaderActionButtons.client';
import { ChatDescription } from '~/lib/persistence/ChatDescription.client';
import { Auth } from '~/components/auth/Auth.client';

export function Header() {
  const chat = useStore(chatStore);

  return (
    <header
      className={classNames(
        'flex items-center bg-purple-elements-background-depth-1/80 backdrop-blur-md p-5 mb-10 h-[var(--header-height)] z-20 sticky top-0',
        {
          'border-transparent': true,
        },
      )}
    >
      <div className="flex items-center gap-2 z-logo text-purple-elements-textPrimary cursor-pointer">
        <div className="i-ph:sidebar-simple-duotone text-xl" />
        <a href="/" className="text-2xl font-semibold text-accent flex items-center">
          <span className="text-xl font-bold text-accent">{import.meta.env.VITE_SITE_TITLE || 'Purple'}</span>
        </a>
      </div>
      <span className="flex-1 px-4 truncate text-center text-purple-elements-textPrimary">
        <ClientOnly>{() => <ChatDescription />}</ClientOnly>
      </span>
      <div className="flex items-center gap-2 mr-1">
        <ClientOnly>{() => <Auth />}</ClientOnly>
        {chat.started && (
          <ClientOnly>
            {() => <HeaderActionButtons />}
          </ClientOnly>
        )}
      </div>
    </header >
  );
}
