export interface TelegramUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  allows_write_to_pm?: boolean;
}
export interface TelegramChat {
  id: number;
  type: "group" | "supergroup" | "channel";
  title: string;
  username?: string;
  photo_url?: string;
}
export interface WebAppInitData {
  query_id?: string;
  user?: TelegramUser;
  chat?: TelegramChat;
  receiver?: TelegramUser;
  start_param?: string;
  auth_date?: number;
  hash?: string;
}
export interface ThemeParams {
  bg_color?: string;
  button_color?: string;
  button_text_color?: string;
  hint_color?: string;
  link_color?: string;
  secondary_bg_color?: string;
  text_color?: string;
  header_bg_color?: string;
  accent_text_color?: string;
  section_bg_color?: string;
  section_header_text_color?: string;
  subtitle_text_color?: string;
  destructive_text_color?: string;
}

export interface MainButton {
  show(): void;
  hide(): void;
  isVisible: boolean;
  setText(text: string): void;
  onClick(callback: () => void): void;
  offClick(callback: () => void): void;
  setParams(params: {
    text?: string;
    color?: string;
    text_color?: string;
    is_active?: boolean;
    is_visible?: boolean;
  }): void;
}

export interface BackButton {
  show(): void;
  hide(): void;
  isVisible: boolean;
  onClick(callback: () => void): void;
  offClick(callback: () => void): void;
}

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: WebAppInitData;
  version: string;
  platform: string;
  colorScheme: "light" | "dark";
  themeParams: ThemeParams;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  isClosingConfirmationEnabled: boolean;
  MainButton: MainButton;
  BackButton: BackButton;
  sendData(data: string): void;
  ready(): void;
  expand(): void;
  close(): void;
  enableClosingConfirmation(): void;
  disableClosingConfirmation(): void;
  onEvent(eventType: string, eventHandler: Function): void;
  offEvent(eventType: string, eventHandler: Function): void;
  showAlert(message: string, callback?: () => void): void;
  showConfirm(message: string, callback: (ok: boolean) => void): void;
  showPopup(
    params: {
      title?: string;
      message: string;
      buttons?: Array<{
        id: string;
        type?: "default" | "ok" | "close" | "cancel" | "destructive";
        text: string;
      }>;
    },
    callback?: (buttonId: string) => void
  ): void;
  requestWriteAccess(callback: (granted: boolean) => void): void;
  requestContact(
    callback: (contact: {
      phone_number: string;
      first_name: string;
      last_name?: string;
      user_id?: number;
    }) => void
  ): void;
}
