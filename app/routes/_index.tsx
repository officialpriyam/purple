import { json, type MetaFunction } from '@remix-run/cloudflare';
import { ClientOnly } from 'remix-utils/client-only';
import { BaseChat } from '~/components/chat/BaseChat';
import { Chat } from '~/components/chat/Chat.client';
import { Header } from '~/components/header/Header';
import { BackgroundGradient } from '~/components/ui/BackgroundGradient';

export const meta: MetaFunction = () => {
  return [{ title: 'Purple' }, { name: 'description', content: 'Talk with Purple, your AI assistant' }];
};

export const loader = () => json({});

export default function Index() {
  return (
    <div className="flex flex-col h-full w-full bg-purple-elements-background-depth-1">
      <BackgroundGradient />
      <Header />
      <ClientOnly fallback={<BaseChat />}>{() => <Chat />}</ClientOnly>
    </div>
  );
}
