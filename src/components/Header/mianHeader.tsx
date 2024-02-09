import { useState } from "react";
import * as React from "react";
import logo from "../../assets/pegasus-logo2.svg";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

const navList = [
  {
    navLink: "/",
    navItem: "Home",
  },
  {
    navLink: "aboutUs",
    navItem: "About Us",
  },
  {
    navLink: "services",
    navItem: "Services",
  },
  {
    navLink: "Contact",
    navItem: "Contact",
  },
  {
    navLink: "/auth/login",
    navItem: "Login",
    isDropdown: true,
  },
];

export default function MainHeader(props: Props) {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activeLink, setActiveLink] = useState<string>("/")
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (type: string) => {
    setAnchorEl(null);
    navigate(`/auth/login?type=${btoa(type)}`);
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const scrollToElement = (link: string) => {
    if (link === "/auth/login") {
      return;
    }
    if (link !== "/") {
      const element = document.querySelector(`#${link}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    else {
      document.querySelector(`#home`)?.scrollIntoView(({ behavior: 'smooth' }))
    }
    setTimeout(() => {
      setMobileOpen(false)
    }, 1000);
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <List>
        {navList?.slice(0, 4).map((item, i) => (
          <ListItem key={i} disablePadding>
            <ListItemButton onClick={(e: any) => { e.preventDefault(); scrollToElement(item.navLink) }}>
              <ListItemText primary={item.navItem} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar
        component="nav"
        position="static"
        color="inherit"
        sx={{
          py: "6px", boxShadow: "none", background: "#FCF6FF",
          position: "fixed",
          top: "0",
          zIndex: 999,
        }}
      >
        <Container>
          <Toolbar sx={{ p: { xs: 0 }, minHeight: "auto" }}>
            {/* Logo */}
            <Box sx={{ flexGrow: 1 }}>
              <Link to="/" onClick={() => document.querySelector(`#home`)?.scrollIntoView(({ behavior: 'smooth' }))}>
                <img
                  src={logo}
                  className="header_logo"
                  alt="logo"
                  style={{
                    width: "210px",
                    height: "80px",
                    marginBottom: "20px",
                  }}
                />
              </Link>
            </Box>

            {/* Nav List */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
              {navList.map((item) => (
                <Box key={item.navLink}>
                  {item?.isDropdown ? (
                    <>
                      <Menu
                        onClose={() => setAnchorEl(null)}
                        id="simple-menu"
                        keepMounted
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                      >
                        <MenuItem onClick={() => handleSelect('admin')}>
                          Pegasus Admin
                        </MenuItem>
                        <MenuItem onClick={() => handleSelect('school')} >School Admin</MenuItem>
                        <MenuItem
                          onClick={() => handleSelect('student')}
                        >Student</MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <div className="header-nav">
                      <Button
                        onClick={() => { setActiveLink(item.navLink); item.navLink === "/" ? document.querySelector(`#home`)?.scrollIntoView(({ behavior: 'smooth' })) : document.querySelector(`#${item.navLink}`)?.scrollIntoView(({ behavior: 'smooth' })) }}
                        color="info"
                        sx={{
                          mr: "36px",
                          textTransform: "unset",
                          minWidth: "unset",
                          fontWeight: "400"
                        }}
                        className={`${item.navLink === activeLink && 'active_nav'}`}
                      >
                        {item.navItem}
                      </Button>
                    </div>
                  )}
                </Box>
              ))}
            </Box>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              color="info"
              className="btn-hover"
              sx={{
                mr: "32px",
                textTransform: "unset",
                minWidth: "unset",
                background: "#440E66",
                borderRadius: "50px !important",
                padding: "12px 40px !important",
                color: "#fff",
                fontWeight: "500"
              }}
            >
              Login
            </Button>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ p: 0, display: { md: "none", xs: "block" } }}
            >
              <MenuIcon />
            </IconButton>

          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          container={container}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              overflow: "hidden",
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}