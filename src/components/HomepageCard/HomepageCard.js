import React from 'react';
import {CardContent, CardMedia, Typography} from '@mui/material';
import {Blue} from '../../config/colors';

const HomepageCard = ({title, text, img}) => {
  return (
    <>
      <CardMedia
        component="img"
        height="60"
        title={title}
        image={`./img/${img}`}
      />
      <CardContent>
        <Typography variant="h5" component="div" sx={{color: Blue}}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{color: Blue, textTransform: 'capitalize'}}
        >
          {text}
        </Typography>
      </CardContent>
    </>
  );
};

export default HomepageCard;
