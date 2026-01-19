import { createConsumer, type Cable, type Subscription } from '@rails/actioncable';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

if (!BACKEND_URL) {
  throw new Error("Backend URL not found. Please set the BACKEND_URL environment variable to use Action Cable.");
}

const cableUrl = BACKEND_URL.replace(/^http/, 'ws') + '/cable';

let cable: Cable;
let subscription: Subscription | null = null;

export interface ActionCableCallbacks {
  onConnected?: () => void;
  onDisconnected?: () => void;
  onReceived: (data: any) => void;
}

const getCable = (): Cable => {
  if (!cable) {
    cable = createConsumer(cableUrl);
  }
  return cable;
};

export const createSubscription = (
  assistantSlug: string,
  conversationId: string | null,
  callbacks: ActionCableCallbacks
): Subscription => {
  const consumer = getCable();

  // Ensure any previous subscription is removed before creating a new one
  if (subscription) {
    subscription.unsubscribe();
  }

  subscription = consumer.subscriptions.create(
    {
      channel: 'BroadcastMessageAiChannel',
      assistant_slug: assistantSlug,
      conversation_id: conversationId,
    },
    {
      connected() {
        console.log('Action Cable connected for conversation:', assistantSlug);

        callbacks.onConnected?.();
      },
      disconnected() {
        console.log('Action Cable disconnected.');
        callbacks.onDisconnected?.();
      },
      received(data: any) {
        console.log('Action Cable received:', data);
        callbacks.onReceived(data);
      },
    }
  );

  return subscription;
};

export const sendMessage = (assistantSlug: string, conversationId: string, message: string) => {
  if (!subscription) {
    throw new Error("Action Cable subscription is not active. Cannot send message.");
  }

  subscription.perform('speak', { assistantSlug, conversationId, message });
};

export const unsubscribe = () => {
  if (subscription) {
    subscription.unsubscribe();
    subscription = null;
    console.log('Action Cable subscription removed.');
  }
};
