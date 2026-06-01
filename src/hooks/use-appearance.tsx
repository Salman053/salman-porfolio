"use client";

import { useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark' | 'system';
export type AnimationVariant =
    | 'circle'
    | 'fade'
    | 'slide-up'
    | 'slide-down'
    | 'slide-left'
    | 'slide-right'
    | 'rotate'
    | 'scale'
    | 'blur'
    | 'flip'
    | 'bounce'
    | 'wave'
    | 'glow'
    | 'spiral'
    | 'morph-square'
    | 'morph-heart'
    | 'star-burst'
    | 'accordion'
    | 'accordion-vertical'
    | 'perspective'
    | 'shatter'
    | 'shutter'
    | 'shutter-horizontal'
    | 'explode'
    | 'implode'
    | 'color-wave'
    | 'flash'
    | 'zoom-out'
    | 'flip-vertical'
    | 'ripple'
    | 'water'
    | 'fire'
    | 'cloud'
    | 'glitch'
    | 'mosaic'
    | 'none';

const prefersDark = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const applyTheme = (appearance: Appearance) => {
    if (typeof window === 'undefined') return;
    const isDark = appearance === 'dark' || (appearance === 'system' && prefersDark());
    document.documentElement.classList.toggle('dark', isDark);
};

const handleSystemThemeChange = () => {
    if (typeof window === 'undefined') return;
    const currentAppearance = localStorage.getItem('appearance') as Appearance;
    applyTheme(currentAppearance || 'system');
};

export function initializeTheme() {
    if (typeof window === 'undefined') return;

    const savedAppearance = (localStorage.getItem('appearance') as Appearance) || 'system';
    applyTheme(savedAppearance);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);
}

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>('system');
    const [animationVariant, setAnimationVariant] = useState<AnimationVariant>('circle');

    const updateAppearance = (mode: Appearance) => {
        setAppearance(mode);
        if (typeof window !== 'undefined') {
            localStorage.setItem('appearance', mode);
            applyTheme(mode);
        }
    };

    const updateAnimationVariant = (variant: AnimationVariant) => {
        setAnimationVariant(variant);
        if (typeof window !== 'undefined') {
            localStorage.setItem('animationVariant', variant);
        }
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const savedAppearance = localStorage.getItem('appearance') as Appearance | null;
        const savedVariant = localStorage.getItem('animationVariant') as AnimationVariant | null;

        if (savedAppearance) {
            setAppearance(savedAppearance);
            applyTheme(savedAppearance);
        }
        if (savedVariant) setAnimationVariant(savedVariant);

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', handleSystemThemeChange);
        return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }, []);

    return { appearance, updateAppearance, animationVariant, updateAnimationVariant };
}
