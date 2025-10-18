import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ProjectStatus, ProjectStatusOptions } from '@/types';
import { useProjects } from '@/contexts/ProjectContext';

export default function StatusFilter() {
    const { selectedStatus, setSelectedStatus, clearStatusFilter } = useProjects();

    const handleStatusPress = (status: ProjectStatus) => {
        if (selectedStatus === status) {
            clearStatusFilter(); // If same status is pressed, clear filter
        } else {
            setSelectedStatus(status);
        }
    };

    return (
        <View className="py-3">
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="px-4 gap-x-3"
            >
                {/* All Status Button */}
                <TouchableOpacity
                    onPress={clearStatusFilter}
                    className={`px-4 py-2 rounded-full border ${
                        !selectedStatus 
                            ? 'bg-teal-500 border-teal-500' 
                            : 'bg-white border-gray-300'
                    }`}
                >
                    <Text className={`font-medium ${
                        !selectedStatus ? 'text-white' : 'text-gray-700'
                    }`}>
                        All Status
                    </Text>
                </TouchableOpacity>

                {/* Status Filter Buttons */}
                {ProjectStatusOptions.map((option) => (
                    <TouchableOpacity
                        key={option.value}
                        onPress={() => handleStatusPress(option.value)}
                        className={`px-4 py-2 rounded-full border ${
                            selectedStatus === option.value
                                ? 'bg-teal-500 border-teal-500'
                                : 'bg-white border-gray-300'
                        }`}
                    >
                        <Text className={`font-medium ${
                            selectedStatus === option.value ? 'text-white' : 'text-gray-700'
                        }`}>
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
