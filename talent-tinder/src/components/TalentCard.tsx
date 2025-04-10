import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Chip,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';

interface Talent {
  id: number;
  name: string;
  age: number;
  profession: string;
  bio: string;
  image: string;
  skills: string[];
}

const sampleTalents: Talent[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    age: 28,
    profession: 'Actor',
    bio: 'Experienced stage actor with a passion for Shakespearean roles. Looking for new opportunities in film and television.',
    image: 'https://source.unsplash.com/random/800x600/?portrait',
    skills: ['Theater', 'Film', 'Voice Acting'],
  },
  {
    id: 2,
    name: 'Michael Chen',
    age: 32,
    profession: 'Musician',
    bio: 'Classically trained pianist and composer. Specializes in film scores and contemporary classical music.',
    image: 'https://source.unsplash.com/random/800x600/?musician',
    skills: ['Piano', 'Composition', 'Film Scoring'],
  },
];

const TalentCard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTalent] = useState<Talent>(sampleTalents[currentIndex]);

  const handleLike = () => {
    // Handle like action
    setCurrentIndex((prev) => (prev + 1) % sampleTalents.length);
  };

  const handleDislike = () => {
    // Handle dislike action
    setCurrentIndex((prev) => (prev + 1) % sampleTalents.length);
  };

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', position: 'relative' }}>
      <CardMedia
        component="img"
        height="400"
        image={currentTalent.image}
        alt={currentTalent.name}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {currentTalent.name}, {currentTalent.age}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {currentTalent.profession}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {currentTalent.bio}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {currentTalent.skills.map((skill) => (
            <Chip key={skill} label={skill} size="small" />
          ))}
        </Box>
      </CardContent>
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          display: 'flex',
          gap: 2,
        }}
      >
        <IconButton
          onClick={handleDislike}
          sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.100' } }}
        >
          <CloseIcon color="error" />
        </IconButton>
        <IconButton
          onClick={handleLike}
          sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.100' } }}
        >
          <FavoriteIcon color="success" />
        </IconButton>
      </Box>
    </Card>
  );
};

export default TalentCard; 