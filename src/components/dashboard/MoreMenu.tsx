import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import IconButton from "@mui/material/IconButton/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Menu from '@mui/material/Menu';

const MoreMenu = (props: any) => {
    const {open, anchorEl, handleOnClose} = props;
    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleOnClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        >
            <MenuItem>
                <IconButton
                    size='large'
                    aria-label='show 4 new mails'
                    color='inherit'
                >
                    <Badge badgeContent={4} color='error'>
                        <MailIcon />
                    </Badge>
                </IconButton>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size='large'
                    aria-label='show 17 new notifications'
                    color='inherit'
                >
                    <Badge badgeContent={17} color='error'>
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </MenuItem>
        </Menu>
    );
};

export default MoreMenu;
