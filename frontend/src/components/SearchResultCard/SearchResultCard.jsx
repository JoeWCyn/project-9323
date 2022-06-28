/* eslint-disable multiline-ternary */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import { useNavigate } from 'react-router-dom';

/* import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import SearchDetail from './SearchDetail/SearchDetail'; */
ActionAreaCard.propTypes = {
  data: PropTypes.object,
};

// eslint-disable-next-line space-before-function-paren
export default function ActionAreaCard({ data }) {
  const navigate = useNavigate();

  const [isShowMore, setIsShowMore] = React.useState(true);
  const toggleReadMore = () => {
    setIsShowMore(!isShowMore);
  };
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut viverra tellus, sit amet sagittis libero. Integer nibh tortor, facilisis vel mollis dapibus, mattis ut nisl. Praesent convallis consequat eros, at interdum lorem lacinia eget. Praesent posuere leo nec tempor pretium. Quisque imperdiet semper ex, in maximus urna porttitor laoreet. Curabitur hendrerit est eget ante pulvinar tristique. Nullam vulputate, nulla vel posuere ullamcorper, mauris leo molestie tellus, a volutpat orci velit eu justo. Curabitur erat lectus, luctus non mauris ut, ultricies ornare diam. Praesent iaculis sapien nec blandit tempus. Praesent vitae gravida nisi. Donec consequat interdum elementum. Donec nec lacus mi. Fusce posuere cursus augue, sit amet vulputate eros dapibus ac. Nulla consequat massa massa, vel hendrerit nunc mattis ut. Morbi lobortis tristique tincidunt. Nulla facilisi';

  /*   const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    console.log(event, open);
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };
  const list = () => {
    return (
      <Box
        sx={{ width: '100vw' }}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
      >
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            console.log('wwwwww');
            setState(false);
          }}
        >
          {'<Back to result'}
        </Link>
        <SearchDetail></SearchDetail>
      </Box>
    );
  }; */

  return (
    <Card
      sx={{
        borderRadius: '1rem',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: '#fff',
        borderTopColor: '#e6e5e6',
        mb: 1,

      }}
    >
      <CardContent>
        <Box>
          <CardHeader
            onClick={(e) => {
              e.preventDefault();
              navigate('/question');
            }}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
            title={'This is a title'}
          ></CardHeader>
          <CardContent
            sx={{ borderBottom: '1px solid #e6e5e6' }}
            // eslint-disable-next-line react/no-children-prop
            children={
              <Box>
                {isShowMore ? text.slice(0, 300) : text}
                {text && text.length > 300 && (
                  <Box
                    onClick={toggleReadMore}
                    sx={{
                      cursor: 'pointer',
                      fontSize: '14px',
                      marginTop: '20px',
                      marginBottom: '30px',
                      textDecoration: 'underline',
                    }}
                  >
                    {isShowMore ? 'Show more...' : 'Show less'}
                  </Box>
                )}
              </Box>
            }
          ></CardContent>
        </Box>
      </CardContent>
      <CardActions sx={{ ml: 3, display: 'auto' }}>
        <Button size="small">Follow</Button>
        <Box sx={{ margin: 'auto' }}>2022/02/31 19:49:03</Box>
        <Box
          onClick={(e) => {
            e.preventDefault(
            )
            navigate('/question');
          }}
          sx={{
            margin: 'auto',
            color: '#1976d2',
            '&:hover': {
              textDecoration: 'underline',
            },
            cursor: 'pointer',
          }}
        >
          <span>3 answers</span>
        </Box>
        <Box sx={{ margin: 'auto' }}>
          <Button size="small">Answer</Button>
        </Box>
      </CardActions>
    </Card>
  );
}
