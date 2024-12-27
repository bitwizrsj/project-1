import React from 'react';
import { Briefcase, Heart, HardHat, Dumbbell, Factory } from 'lucide-react';
import { Category } from '../types/category';

export const categories: Category[] = [
  { name: 'Automotive', icon: <Briefcase className="w-5 h-5" />, count: 5 },
  { name: 'Health and care', icon: <Heart className="w-5 h-5" />, count: 7 },
  { name: 'Construction', icon: <HardHat className="w-5 h-5" />, count: 3 },
  { name: 'Fitness Trainer', icon: <Dumbbell className="w-5 h-5" />, count: 1 },
  { name: 'Industry', icon: <Factory className="w-5 h-5" />, count: 4 },
];