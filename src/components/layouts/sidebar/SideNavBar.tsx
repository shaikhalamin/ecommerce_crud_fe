import { MdDashboard, MdLogin } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import SingleListItems from "./SingleListItems";
import { Nav, Navbar } from "react-bootstrap";
import {
  getLocalSession,
  removeLocalSession,
} from "../../../api/local-storage";
import { useNavigate } from "react-router-dom";
import CompanyLogo from "../../common/icons/CompanyLogo";

export type SingleItemProps = {
  id: number;
  name: string;
  url: string;
  icon: CallableFunction;
  onClickFn?: CallableFunction;
};

interface SideNavItems {
  [key: string]: SingleItemProps[];
}

export const sideNavItems = (role: string): SideNavItems => {
  const navItems: SideNavItems = {
    main: [
      {
        id: 1,
        name: "Dashboard",
        url: "/dashboard",
        icon: (size: number = 21) => <MdDashboard size={size} />,
      },
    ],
    list: [
      {
        id: 3,
        name: "Products",
        url: "/dashboard/products",
        icon: (size: number = 21) => <FaBuilding size={size} />,
      },
    ],
    user: [
      {
        id: 10,
        name: "Logout",
        url: "#",
        icon: (size: number = 21) => <MdLogin size={size} />,
        onClickFn: () => {},
      },
    ],
  };
  return navItems;
};

const SideNavBar = () => {
  const session = getLocalSession();
  let navigate = useNavigate();

  const handleLogOut = () => {
    removeLocalSession();
    navigate("/");
  };

  const role = session?.user?.role as string;
  const sideNavData = sideNavItems(role);
  return (
    <div>
      <div className="mb-4">
        <Navbar bg="light">
          <Navbar.Brand
            href="/dashboard"
            className="text-white"
            style={{ marginLeft: "20px" }}
          >
            <CompanyLogo />
          </Navbar.Brand>
          <Nav className="me-auto"></Nav>
        </Navbar>
      </div>

      {Object.keys(sideNavData).map((key, index) => {
        const eachItem = sideNavData[key];
        return (
          <SingleListItems
            key={index}
            data={eachItem}
            name={key}
            clickFn={handleLogOut}
          />
        );
      })}
    </div>
  );
};

export default SideNavBar;
