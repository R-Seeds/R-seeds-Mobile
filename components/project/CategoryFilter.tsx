import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ProjectCategory, ProjectCategoryOptions } from '@/types';
import { useProjects } from '@/contexts/ProjectContext';

export default function CategoryFilter() {
    const { selectedCategory, setSelectedCategory, clearFilter } = useProjects();

    const handleCategoryPress = (category: ProjectCategory) => {
        if (selectedCategory === category) {
            clearFilter(); 
        } else {
            setSelectedCategory(category);
        }
    };

    return (
        <View className="py-3">
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="px-4 gap-x-3"
            >
                {/* All Categories Button */}
                <TouchableOpacity
                    onPress={clearFilter}
                    className={`px-4 py-2 rounded-full border ${
                        !selectedCategory 
                            ? 'bg-teal-500 border-teal-500' 
                            : 'bg-white border-gray-300'
                    }`}
                >
                    <Text className={`font-medium ${
                        !selectedCategory ? 'text-white' : 'text-gray-700'
                    }`}>
                        All
                    </Text>
                </TouchableOpacity>

                {/* Category Filter Buttons */}
                {ProjectCategoryOptions.map((option) => (
                    <TouchableOpacity
                        key={option.value}
                        onPress={() => handleCategoryPress(option.value)}
                        className={`px-4 py-2 rounded-full border ${
                            selectedCategory === option.value
                                ? 'bg-teal-500 border-teal-500'
                                : 'bg-white border-gray-300'
                        }`}
                    >
                        <Text className={`font-medium ${
                            selectedCategory === option.value ? 'text-white' : 'text-gray-700'
                        }`}>
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
