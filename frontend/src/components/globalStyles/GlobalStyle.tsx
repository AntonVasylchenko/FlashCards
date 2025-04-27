import React from "react";
import { createGlobalStyle } from 'styled-components'
import type { ThemeParams } from "../../../types/index.ts"

const GlobalStyles: React.FC<{ styles: ThemeParams | null }> = ({ styles }) => {
  if (!styles) return null;

  const Style = createGlobalStyle<{ theme: ThemeParams }>`
    :root {
      --bg-color: ${props => props.theme.bg_color};
      --button-color: ${props => props.theme.button_color};
      --button-text-color: ${props => props.theme.button_text_color};
      --hint-color: ${props => props.theme.hint_color};
      --link-color: ${props => props.theme.link_color};
      --secondary-bg-color: ${props => props.theme.secondary_bg_color};
      --text-color: ${props => props.theme.text_color};
      --header-bg-color: ${props => props.theme.header_bg_color};
      --accent-text-color: ${props => props.theme.accent_text_color};
      --section-bg-color: ${props => props.theme.section_bg_color};
      --section-header-text-color: ${props => props.theme.section_header_text_color};
      --subtitle-text-color: ${props => props.theme.subtitle_text_color};
      --destructive-text-color: ${props => props.theme.destructive_text_color};
    }
  `;

  return <Style theme={styles} />;
};

export default GlobalStyles;