import * as React from 'react';
import Navbar from '../NavBar/Navbar';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import { useParams } from 'react-router-dom';
import { guideDetail } from '../../service'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { Box } from '@mui/material';
import styles from './App.module.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
// eslint-disable-next-line space-before-function-paren
export default function VerticalTabs() {
  const { number } = useParams();
  const [data, setData] = React.useState({ 0: { title: 'none' }, 1: { title: 'none' } })
  const [activeStep, setActiveStep] = React.useState(0);
  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  React.useEffect(async () => {
    console.log(number, localStorage.getItem('user_id'), localStorage.getItem('token'))
    try {
      const response = await guideDetail(localStorage.getItem('user_id'), localStorage.getItem('token'), number)
      setData(Object.fromEntries(Object
        .entries(response.data.article)))
      console.log(data)
    } catch (error) {}
  }, [])
  console.log(data)
  return (
  <div className="home" style={{ display: 'flex' }}>
  {localStorage.getItem('token')
    ? (
    <LoggedNarbar></LoggedNarbar>
      )
    : (
    <Navbar></Navbar>
      )}

      <Box className={styles.guideDetail}>
      <CardHeader
            sx={{ width: '90%', margin: 'auto', mt: 3 }}
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
        <Box sx={{ width: '90%', margin: 'auto' }}>
          <Stepper nonLinear activeStep={activeStep}>
          {Object.keys(data).map((ele, index) => (
            <Step key={`label${index}`} >
              <StepButton color="inherit" onClick={handleStep(index)}>
                {data[ele].title ? data[ele].title : 'unknown'}
              </StepButton>
            </Step>
          ))}
          </Stepper>
        </Box>

        <Card sx={{ width: '90%', border: 'none', margin: 'auto', boxShadow: 'none', height: '30rem', overflow: 'scroll', mt: 3 }}>

          <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="h4" color="text.secondary">
              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.
            </Typography>
          </CardContent>

        </Card>
        <CardActions sx={{ width: '90%', margin: 'auto' }}disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
      </Box>

</div>
  )
}
