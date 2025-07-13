// components/CategoryButtons.tsx
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';


interface CategoryButtonsProps {
  onCategoryChanged: (category: string) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({ onCategoryChanged }) => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('Programa');

  // Define categories with their translations and icons
  const categories = [
    { id: 'Programa', translation: t('program'), iconName: 'check-all' },
//    { id: 'Teoria', translation: t('theory'), iconName: 'book-open-variant' },
    { id: 'Formas', translation: t('patterns'), iconName: 'karate' },
    { id: 'Combate', translation: t('combat'), iconName: 'alarm-bell' },
    { id: 'Historia', translation: t('history'), iconName: 'history' },
    { id: 'Filosofia', translation: t('philosophy'), iconName: 'draw-pen' },
    { id: 'Mociones', translation: t('motions'), iconName: 'sine-wave' },
    { id: 'Rotura', translation: t('brake'), iconName: 'image-broken-variant' },
    { id: 'Do', translation: t('do'), iconName: 'road-variant' },
    { id: 'Arbitraje', translation: t('arbitraje'), iconName: 'whistle-outline' },
//    { id: 'Todos', translation: t('all'), iconName: 'account-group' },    
  ];

  const handleCategoryPress = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChanged(categoryId);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => handleCategoryPress(category.id)}
            style={[
              styles.categoriesBtn,
              activeCategory === category.id && styles.categoriesBtnActive,
            ]}
          >
            <MaterialCommunityIcons
              name={category.iconName as any}
              size={20}
              color={activeCategory === category.id ? Colors.white : Colors.lightGrey}
            />
            <Text
              style={[
                styles.categoriesBtnText,
                activeCategory === category.id && styles.categoriesBtnTextActive,
              ]}
            >
              {category.translation}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    height: 60,
  },
  scrollView: {
    paddingHorizontal: 15,
    alignItems: 'center',
    gap: 30,
    
  },
  categoriesBtn: {
    padding: 7,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.white,
  },
  categoriesBtnText: {
    color: Colors.grey,
    fontSize: 15,
    fontWeight: '600',
  },
  categoriesBtnActive: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    padding: 7,
    paddingHorizontal: 10,
  },
  categoriesBtnTextActive: {
    color: Colors.white,
  },
});

export default CategoryButtons;





