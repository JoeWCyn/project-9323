/* eslint-disable multiline-ternary */
/* eslint-disable space-before-function-paren */
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Navbar from '../NavBar/Navbar';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import SearchResultCard from '../SearchResultCard/SearchResultCard';
import SortIcon from '@mui/icons-material/Sort';
import { MenuItem, Button, Menu } from '@mui/material';
import GuideCard from '../GuideDetail/GuideCard'
// eslint-disable-next-line space-before-function-paren
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div>
      <div
        style={{
          width: '85vw',
          backgroundColor: 'rgb(118, 118, 118, 0.1)',
        }}
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const sampleData = [
    {
      id: '123',
      photo: ['', '', ''],
      location: 'George Street, Redfern New South Wales',
      description:
        'Redfern- Security Motorcycle Parking For Lease,Redfern- Security Motorcycle Parking For LeaseRedfern- Security Motorcycle Parking For Lease,Redfern- Security Motorcycle Parking For Lease                                                              Redfern- Security Motorcycle Parking For Lease,Redfern- Security Motorcycle Parking For LeaseRedfern- Security Motorcycle Parking For Lease,Redfern- Security Motorcycle Parking For Lease',
      size: 'Van',
      type: 'Undercover',
      monthly: true,
      hourly: true,
      daily: true,
      priceCurrent: 980,
      electricCharing: true,
    },
    {
      id: '123',
      location:
        'George Street, Redfern New South Wales,Redfern- Security Motorcycle Parking For Lease',
      description: 'Redfern- Security Motorcycle Parking For Lease',
      size: 'samoleedew',
      type: 'Undercover',
      monthly: true,
      hourly: false,
      daily: true,
      priceMonth: 300,
      priceDay: 20,
      pricehour: null,
      priceCurrent: 980,
      electricCharing: true,
    },
    {
      id: '123',
      location: 'George Street, Redfern New South Wales',
      description: 'Redfern- Security Motorcycle Parking For Lease',
      size: 'Van',
      type: 'Undercover',
      monthly: true,
      hourly: true,
      daily: true,
      priceCurrent: 980,
      electricCharing: false,
    },
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {' '}
      <div className="home">
        {' '}
        {localStorage.getItem('sign-status') ? (
          <LoggedNarbar></LoggedNarbar>
        ) : (
          <Navbar></Navbar>
        )}
      </div>
      <Box
        sx={{
          paddingTop: '5.3rem',
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          overflow: 'auto',
          height: '100%',
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            width: '15vw',
            minWidth: 'max-content',
          }}
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              margin: 'auto',
              color: 'grey !important',
              marginLeft: '1.5rem',
            }}
          >
            <SortIcon></SortIcon>Sort
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Distance</MenuItem>
            <MenuItem onClick={handleClose}>Price(high to low)</MenuItem>
            <MenuItem onClick={handleClose}>Price(low to high)</MenuItem>
          </Menu>
          <Box sx={{ margin: 'auto', display: 'flex' }}>
            <Box sx={{ width: '50%', margin: 'auto' }}>
              {sampleData.map((e, i) => {
                return (
                  e.hourly
                    ? <SearchResultCard
                    key={'resultCard' + i}
                    data={e}
                  ></SearchResultCard> : <GuideCard></GuideCard>
                );
              })}
            </Box>
            <Box
              sx={{
                width: '40%',
                border: '1px solid red',
              }}
            ></Box>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </Box>
    </>
  );
}
