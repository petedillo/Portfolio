import variables from '../variables.module.scss';

export interface SectionTheme {
  background: string;
  text: string;
  accent: string;
  menuBackground: string;
  menuText: string;
}

export const sectionThemes: Record<string, SectionTheme> = {
  intro: {
    background: variables.introPageBG,
    text: variables.introPageText,
    accent: variables.introAccent,
    menuBackground: variables.introMenuBG,
    menuText: variables.introMenuText
  },
  summary: {
    background: variables.summaryPageBG,
    text: variables.summaryPageText,
    accent: variables.summaryAccent,
    menuBackground: variables.summaryMenuBG,
    menuText: variables.summaryMenuText
  }
};

export const defaultTheme: SectionTheme = {
  background: variables.introPageBG,
  text: variables.introPageText,
  accent: variables.introAccent,
  menuBackground: variables.introMenuBG,
  menuText: variables.introMenuText
}; 