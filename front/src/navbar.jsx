import * as React from 'react';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import {ConnectWallet} from "@thirdweb-dev/react";
import {useNavigate} from "react-router-dom";

const pages = ['Courses', 'Teachers', 'About us'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigation = useNavigate();
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (page) => {
        navigation(`/${page.toLowerCase()}`)
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar>

                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            minWidth:90,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Cygne
                    </Typography>


                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Container sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <MenuItem key={page} onClick={() => {
                                handleCloseNavMenu(page)
                            }}>
                                <Typography textAlign="center">{page}</Typography>
                            </MenuItem>
                        ))}

                    </Container>

                    <Container sx={{ flexGrow: 0, align:'right' }}>
                        <ConnectWallet sx={{maxHeight:40, width:60, float:"right"}} />

                    </Container>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;