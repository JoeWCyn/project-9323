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
import Button from '@mui/material/Button';

// eslint-disable-next-line space-before-function-paren
export default function VerticalTabs() {
  const { number } = useParams();
  const [data, setData] = React.useState({ 0: { title: 'none' }, 1: { title: 'none' } })
  const [activeStep, setActiveStep] = React.useState(0);
  const temp = document.createElement('div');

  const handleStep = (step) => () => {
    setActiveStep(step);
    temp.innerHTML = data[step].content;
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
  <div className="home">
  {localStorage.getItem('token')
    ? (
    <LoggedNarbar></LoggedNarbar>
      )
    : (
    <Navbar></Navbar>
      )}
      <Box>
        <Button sx={{ height: 'max-content', textDecoration: 'underline', fontSize: '1.3rem', color: '#1976d2 !important', ml: 2 }}href="/main">{'<Return'}</Button>
        </Box>
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
                {data[ele].step_title ? data[ele].step_title : 'unknown'}
              </StepButton>
            </Step>
          ))}
          </Stepper>
        </Box>

        <Card sx={{ width: '90%', border: 'none', margin: 'auto', boxShadow: 'none', height: '30rem', overflow: 'scroll', mt: 3 }}>

          <CardMedia
            component="img"
            sx={{ height: 'max-content', width: 'max-content' }}
            image="https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e"
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="h4" color="text.secondary">
            <div dangerouslySetInnerHTML={{ __html: data[activeStep].content }}></div>
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
