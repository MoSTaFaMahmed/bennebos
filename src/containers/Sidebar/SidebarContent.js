import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { useSelector } from "react-redux";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const { navStyle, themeType } = useSelector(({ settings }) => settings);
  const pathname = useSelector(({ common }) => common.pathname);

  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  const getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];

  return (
    <>
      <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
      <div className="gx-sidebar-content">
        <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
          <UserProfile />
          <AppsNavigation />
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">






            <MenuItemGroup key="components" className="gx-menu-group" title={<IntlMessages id="Bennebos" />}>










              <SubMenu key="table" popupClassName={getNavStyleSubMenuClass(navStyle)}
                title={
                  <span>
                    <i className="icon icon-user" />
                    <span>Users</span>

                  </span>}>
                <Menu.Item key="components/table/basic">
                  <Link to="/components/table/basic">
                    <span>Rider</span></Link>
                </Menu.Item>
                <Menu.Item key="components/table/data">
                  <Link to="/components/table/data">
                    <span>
                      {/* <IntlMessages
                      id="sidebar.view.dataTable"/> */}
                      Driver
                    </span></Link>
                </Menu.Item>
                <Menu.Item key="components/table/admin">
                  <Link to="/components/table/admin">
                    <span>
                      Admin
                    </span></Link>
                </Menu.Item>
                <Menu.Item key="components/table/fleetadmin">
                  <Link to="/components/table/fleetadmin">
                    <span>
                      Fleetadmin
                    </span></Link>
                </Menu.Item>
                <Menu.Item key="components/table/deactive">
                  <Link to="/components/table/deactive">
                    <span>
                      Un Users
                    </span></Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="car" popupClassName={getNavStyleSubMenuClass(navStyle)}
                title={
                  <span>
                    <span>Car</span>
                  </span>}>
                <Menu.Item key="components/car/car">
                  <Link to="/components/car/car">
                    <span>Car</span></Link>
                </Menu.Item>

              </SubMenu>
              <SubMenu key="book" popupClassName={getNavStyleSubMenuClass(navStyle)}
                title={
                  <span>

                    <span>Booking</span>

                  </span>}>
                <Menu.Item key="components/book/book">
                  <Link to="/components/book/book">
                    <span>Booking</span></Link>
                </Menu.Item>

              </SubMenu>
              <SubMenu key="cansel" popupClassName={getNavStyleSubMenuClass(navStyle)}
                title={
                  <span>

                    <span>Cansel Reasons</span>

                  </span>}>
                <Menu.Item key="components/cansel/cansel">
                  <Link to="/components/cansel/cansel">
                    <span>Cansel Reasons</span></Link>
                </Menu.Item>

              </SubMenu>
            </MenuItemGroup>





          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);

