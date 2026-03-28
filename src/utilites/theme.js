// src/utils/theme.js
import { THEME_KEY, DARK, LIGHT } from '../constants/themeconstants.js';

export function getInitialTheme() {
  return localStorage.getItem(THEME_KEY) || LIGHT;
}

export function applyTheme(theme) {
  if (theme === DARK) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem(THEME_KEY, theme);
}

export function toggleTheme() {
  const current = getInitialTheme();
  const next = current === DARK ? LIGHT : DARK;
  applyTheme(next);
  updateToggleButton(next);
}

export function updateToggleButton(theme) {
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.textContent = theme === DARK ? '☀️' : '🌙';
  }
}