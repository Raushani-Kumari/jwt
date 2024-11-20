import React, { useContext, useState } from 'react';
import { Layout, Menu, Dropdown, Drawer, Avatar } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Logout from './Logout';

const { Header } = Layout;

const Navbar = () => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const {user} = useContext(UserContext);

  const profileMenu = (
    <Menu style={{width: "300px"}}>
      <Menu.Item key="1" disabled style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px', color: "black" }}>
        {user.username}
      </Menu.Item>
      <Menu.Item key="2" disabled style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px', color: '#666' }}>
        {user.email}
      </Menu.Item>
      <Menu.Item key="3" style={{backgroundColor : "navy", color: "white", textAlign: "center", margin:"15px"}}>
        <Logout />
      </Menu.Item>
    </Menu>
  );

  // Drawer logic
  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onCloseDrawer = () => {
    setVisibleDrawer(false);
  };

  return (
    <Layout>
      <Header
        style={{
          background: '#001f3d', 
          color: 'white', 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px', 
        }}
      >
        <div className="logo" style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>
          ECOMMERCE
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'start' }}>
          <Menu
            theme="dark" 
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ margin: 0 }}
            selectedKeys={['1']}
          >
            <Menu.Item key="1">
              <Link to="/home" style={{ color: 'white' }}>Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/about" style={{ color: 'white' }}>About Us</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/contact" style={{ color: 'white' }}>Contact Us</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/admin" style={{ color: 'white' }}>Admin</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/seller" style={{ color: 'white' }}>Seller</Link>
            </Menu.Item>
          </Menu>
        </div>

        <Dropdown overlay={profileMenu} trigger={['click']}>
          <Avatar
            style={{
              cursor: 'pointer',
              backgroundColor: 'white', 
              color: '#001f3d',
            }}
            icon={<UserOutlined />}
          />
        </Dropdown>
      </Header>

      <Drawer
        title="Navigation"
        placement="left"
        onClose={onCloseDrawer}
        visible={visibleDrawer}
      >
        <Menu mode="inline">
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/about">About Us</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/contact">Contact Us</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/admin">Admin</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/seller">Seller</Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </Layout>
  );
};

export default Navbar;


// import React, { useContext, useState } from 'react';
// import { Layout, Menu, Dropdown, Drawer, Avatar, Button } from 'antd';
// import { UserOutlined, MenuOutlined } from '@ant-design/icons';
// import { Link } from 'react-router-dom';
// import Logout from './Logout';
// import { UserContext } from '../../context/UserContext';

// const { Header } = Layout;

// const Navbar = () => {
//   const [visibleDrawer, setVisibleDrawer] = useState(false);
//   const {user}  = useContext(UserContext);
//   console.log("user from user context", user)

//   const handleLogout = () => {
//     // Handle logout logic here
//     console.log('Logging out...');
//   };

//   const profileMenu = (
//     <Menu>
//       <Menu.Item key="1" disabled style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>
//         {user.username}
//       </Menu.Item>
//       <Menu.Item key="2" disabled style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px', color: '#666' }}>
//         {user.email}
//       </Menu.Item>
//       <Menu.Item key="3">
//         <Button type="primary" style={{backgroundColor: "navy"}}block onClick={handleLogout}>
//           <Logout />
//         </Button>
//       </Menu.Item>
//     </Menu>
//   );

//   // Drawer logic
//   const showDrawer = () => {
//     setVisibleDrawer(true);
//   };

//   const onCloseDrawer = () => {
//     setVisibleDrawer(false);
//   };

//   return (
//     <Layout>
//       <Header
//         style={{
//           background: '#001f3d', // Navy background
//           color: 'white', // White text color
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           padding: '0 20px', // Optional padding
//         }}
//       >
//         {/* Company Name */}
//         <div className="logo" style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>
//           TrendTrove
//         </div>

//         {/* Centered Navigation Links */}
//         <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
//           <Menu
//             theme="dark" // Change menu theme to match navbar background
//             mode="horizontal"
//             defaultSelectedKeys={['1']}
//             style={{ margin: 0 }}
//             selectedKeys={['1']} // Dynamically select a menu item (this could be updated based on route)
//           >
//             <Menu.Item key="1">
//               <Link to="/home" style={{ color: 'white' }}>Home</Link>
//             </Menu.Item>
//             <Menu.Item key="2">
//               <Link to="/about" style={{ color: 'white' }}>About Us</Link>
//             </Menu.Item>
//             <Menu.Item key="3">
//               <Link to="/contact" style={{ color: 'white' }}>Contact Us</Link>
//             </Menu.Item>
//             <Menu.Item key="4">
//               <Link to="/admin" style={{ color: 'white' }}>Admin</Link>
//             </Menu.Item>
//             <Menu.Item key="5">
//               <Link to="/seller" style={{ color: 'white' }}>Seller</Link>
//             </Menu.Item>
//             <Menu.Item key="6">
//               <Logout style={{ color: "white" }} />
//             </Menu.Item>


//           </Menu>
//         </div>

//         {/* Profile Icon */}
//         <Dropdown overlay={profileMenu} trigger={['click']}>
//           <Avatar
//             style={{
//               cursor: 'pointer',
//               backgroundColor: 'white', // White background for the profile icon
//               color: '#001f3d', // Navy color for the profile icon's text (icon color)
//             }}
//             icon={<UserOutlined />}
//           />
//         </Dropdown>

//         {/* Hamburger Menu (Mobile) */}
//         <div className="mobile-menu-icon" onClick={showDrawer}>
//           <MenuOutlined style={{ color: 'white', fontSize: '24px', margin: "5px" }} />
//         </div>
//       </Header>

//       {/* Drawer for Mobile */}
//       <Drawer
//         title="Navigation"
//         placement="left"
//         onClose={onCloseDrawer}
//         visible={visibleDrawer}
//       >
//         <Menu mode="inline">
//           <Menu.Item key="1">
//             <Link to="/home">Home</Link>
//           </Menu.Item>
//           <Menu.Item key="2">
//             <Link to="/about">About Us</Link>
//           </Menu.Item>
//           <Menu.Item key="3">
//             <Link to="/contact">Contact Us</Link>
//           </Menu.Item>
//           <Menu.Item key="4">
//             <Link to="/admin">Admin</Link>
//           </Menu.Item>
//           <Menu.Item key="5">
//             <Link to="/seller" style={{ color: 'white' }}>Seller</Link>
//           </Menu.Item>
//           <Menu.Item key="6">
//             <Logout style={{ backgroundColor: "white" }} />
//           </Menu.Item>
//         </Menu>
//       </Drawer>
//     </Layout>
//   );
// };

// export default Navbar;
