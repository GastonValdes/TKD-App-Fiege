// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LANGUAGES = {
  en: { name: 'English', nativeName: 'English' },
  es: { name: 'Spanish', nativeName: 'Español' },
};

const resources = {
  en: {
    translation: {
      // Landing page
      appTitle: 'Fiege Taekwon-Do',
      subtitle: 'Your ideal companion outside the Dojang',
      createdBy: 'Created by: Gastón Valdés',
      start: 'Start',
      
      // Tab navigation
      home: 'Home',
      favorites: 'Favorites',
      settings: 'Settings',
      about: 'About',
      
      // Settings page
      settingsTitle: 'Settings',
      language: 'Language',
      
      // About page

      aboutTitle: 'About',
      version: 'Version 3.3.3',
      copyright: 'Copyright 2024',
      danTitle: '2nd Degree Black Belt Taekwon-do ITF',
      aboutText: 'I created this application to share the knowledge I acquired over 15 years of training in Taekwondo-ITF. This Application has no affiliation with the International Taekwon-Do Federation. Its content reflects the teachings of the ITF Taekwon-Do style developed by General Choi Hong Hi and documented in the Taekwon-Do Encyclopedia',
      author: 'Boo Sabum Gastón R. Valdés',
      collaborationTitle: 'Content collaboration and review',
      collaborator: 'Sabum Diego Fiege Vallés',
      collaboratorTitle: '5th Degree Black Belt Taekwon-do ITF',
      // Listings page
      listingNotFound: 'Listing not found.',
      videos: 'Videos',
      
      // Favorites page
      loading: 'Loading...',
      noFavorites: 'No favorites saved',
      exploreContent: 'Explore Content',
      addedToFavorites: 'Added to Favorites',
      removedFromFavorites: 'Removed from Favorites',
      errorSavingFavorite: 'Error saving favorite',
      errorRemovingFavorite: 'Error removing favorite',
      
      // Categories
      all: 'All',
      theory: 'Theory',
      practice: 'Practice',
      patterns: 'Patterns',
      program: 'Program',
      history: 'History',
      philosophy: 'Philosophy',
    

      // Generic
      email: 'gastonvaldes@gmail.com',
      close: 'Close',
      back: 'Back'
    }
  },
  es: {
    translation: {
      // Landing page
      appTitle: 'Fiege Taekwon-Do',
      subtitle: 'Su complemento ideal fuera del Dojang',
      createdBy: 'Creada por: Gastón Valdés',
      start: 'Iniciar',
      
      // Tab navigation
      home: 'Inicio',
      favorites: 'Favoritos',
      settings: 'Config',
      about: 'Acerca de',
      
      // Settings page
      settingsTitle: 'Configuración',
      language: 'Idioma',
      
      // About page
      aboutTitle: 'Acerca De',
      version: 'Versión 3.3.3',
      copyright: 'Copyright 2024',
      danTitle: '2do DAN Internacional Taekwon-do ITF',
      aboutText: 'Cree esta aplicación para compartir el conocimiento que adquirí a lo largo de 15 años entrenando Taekwondo-ITF. Esta Aplicacion no tiene afiliacion con la International Taekwon-Do Federation. Su contenido refleja las enseñanzas del estilo de Taekwon-Do ITF desarrollado por el General Choi Hong Hi y documentado en la Enciclopedia de Taekwon-Do',
      author: 'Boo Sabum Gastón R. Valdés',
      collaborationTitle: 'Colaboración y revisión de contenidos',
      collaborator: 'Sabum Diego Fiege Vallés',
      collaboratorTitle: '5to DAN Internacional Taekwon-do ITF',

      // Listings page
      listingNotFound: 'Listado no encontrado.',
      videos: 'Videos',
      
      // Favorites page
      loading: 'Cargando...',
      noFavorites: 'No tienes favoritos guardados',
      exploreContent: 'Explorar Contenido',
      addedToFavorites: 'Agregado a Favoritos',
      removedFromFavorites: 'Eliminado de Favoritos',
      errorSavingFavorite: 'Error al guardar favorito',
      errorRemovingFavorite: 'Error al eliminar favorito',
      
      // Categories
      all: 'Todos',
      theory: 'Teoría',
      practice: 'Práctica',
      patterns: 'Formas',
      program: 'Programa',
      history: 'Historia',
      philosophy: 'Filosofía',


      // Generic
      email: 'gastonvaldes@gmail.com',
      close: 'Cerrar',
      back: 'Volver'
    }
  }
};

// Constants
const LANGUAGE_KEY = '@app_language';
const getDefaultLanguage = () => {
  const locale = Localization.locale;
  return typeof locale === 'string' ? locale.split('-')[0] : 'en';
};

// Load saved or fallback language
const loadSavedLanguage = async (): Promise<string> => {
  try {
    const storedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
    return storedLang || getDefaultLanguage();
  } catch {
    return getDefaultLanguage();
  }
};

// Init
i18n.use(initReactI18next).init({
  resources,
  lng: getDefaultLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

// Apply saved language override if available
loadSavedLanguage().then((lang) => {
  if (lang !== i18n.language) {
    i18n.changeLanguage(lang);
  }
});

// Exposed function
export const changeLanguage = async (lang: string) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
    await i18n.changeLanguage(lang);
  } catch (error) {
    console.error('Error saving language preference:', error);
  }
};

export default i18n;
