import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

import {
  FaBars,
  FaShoppingBag,
  FaShoppingCart,
  FaDatabase,
  FaListAlt,
  FaPlus,
  FaClipboardList,
  FaTruck,
  FaFileInvoice,
  FaUsers,
  FaUserPlus,
  FaBoxOpen,
  FaBoxes,
  FaWarehouse,
} from "react-icons/fa";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(null);
  const [openSub, setOpenSub] = useState(null);

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
    setOpenSub(null);
  };

  const toggleSub = (name) => {
    setOpenSub(openSub === name ? null : name);
  };

  const menus = [
    {
      title: "Purchases",
      icon: <FaShoppingBag />,
      subMenus: [
        {
          label: "Suppliers",
          icon: <FaUsers />,
          items: [
            { label: "New", icon: <FaUserPlus />, path: "/purchases/suppliers/new" },
            { label: "List", icon: <FaListAlt />, path: "/purchases/suppliers/list" },
          ],
        },
        {
          label: "Purchases Requests",
          icon: <FaClipboardList />,
          items: [
            { label: "New", icon: <FaPlus />, path: "/purchases/requests/new" },
            { label: "List", icon: <FaListAlt />, path: "/purchases/requests/list" },
          ],
        },
        {
          label: "Purchases Orders",
          icon: <FaClipboardList />,
          items: [
            { label: "New", icon: <FaPlus />, path: "/purchases/orders/new" },
            { label: "List", icon: <FaListAlt />, path: "/purchases/orders/list" },
          ],
        },
        {
          label: "Purchases Receipts",
          icon: <FaTruck />,
          items: [
            { label: "New", icon: <FaPlus />, path: "/purchases/receipts/new" },
            { label: "List", icon: <FaListAlt />, path: "/purchases/receipts/list" },
          ],
        },
        {
          label: "Purchases Invoices",
          icon: <FaFileInvoice />,
          items: [
            { label: "New", icon: <FaPlus />, path: "/purchases/invoices/new" },
            { label: "List", icon: <FaListAlt />, path: "/purchases/invoices/list" },
          ],
        },
      ],
    },

    {
      title: "Sales",
      icon: <FaShoppingCart />,
      subMenus: [
        {
          label: "Customers",
          icon: <FaUsers />,
          items: [
            { label: "New", icon: <FaUserPlus />, path: "/sales/customers/new" },
            { label: "List", icon: <FaListAlt />, path: "/sales/customers/list" },
          ],
        },
        {
          label: "Sales Quotes",
          icon: <FaClipboardList />,
          items: [
            { label: "New", icon: <FaPlus />, path: "/sales/quotes/new" },
            { label: "List", icon: <FaListAlt />, path: "/sales/quotes/list" },
          ],
        },
        {
          label: "Sales Orders",
          icon: <FaClipboardList />,
          items: [
            { label: "New", icon: <FaPlus />, path: "/sales/orders/new" },
            { label: "List", icon: <FaListAlt />, path: "/sales/orders/list" },
          ],
        },
        {
          label: "Sales Deliveries",
          icon: <FaTruck />,
          items: [
            { label: "New", icon: <FaPlus />, path: "/sales/deliveries/new" },
            { label: "List", icon: <FaListAlt />, path: "/sales/deliveries/list" },
          ],
        },
        {
          label: "Sales Invoices",
          icon: <FaFileInvoice />,
          items: [
            { label: "New", icon: <FaPlus />, path: "/sales/invoices/new" },
            { label: "List", icon: <FaListAlt />, path: "/sales/invoices/list" },
          ],
        },
        {
          label: "Sales Returns",
          icon: <FaTruck />,
          items: [
            { label: "New", icon: <FaPlus />, path: "/sales/deliveries/new" },
            { label: "List", icon: <FaListAlt />, path: "/sales/deliveries/list" },
          ],
        },
      ],
    },

    {
      title: "Master Data",
      icon: <FaDatabase />,
      subMenus: [
        {
          label: "Products",
          icon: <FaBoxOpen />,
          items: [
            { label: "New", icon: <FaPlus />, path: "/master/products/new" },
            { label: "List", icon: <FaListAlt />, path: "/master/products/list" },
          ],
        },
        {
          label: "Categories",
          icon: <FaBoxes />,
          items: [
            { label: "New", icon: <FaPlus />, path: "/master/categories/new" },
            { label: "List", icon: <FaListAlt />, path: "/master/categories/list" },
          ],
        },
        {
          label: "Units",
          icon: <FaListAlt />,
          items: [
            { label: "New", icon: <FaPlus />, path: "/master/units/new" },
            { label: "List", icon: <FaListAlt />, path: "/master/units/list" },
          ],
        },
        {
          label: "Warehouses",
          icon: <FaWarehouse />,
          items: [
            { label: "New", icon: <FaPlus />, path: "/master/warehouses/new" },
            { label: "List", icon: <FaListAlt />, path: "/master/warehouses/list" },
          ],
        },
        {
          label: "Inventories",
          icon: <FaClipboardList />,
          items: [
            { label: "New", icon: <FaPlus />, path: "/master/inventories/new" },
            { label: "List", icon: <FaListAlt />, path: "/master/inventories/list" },
          ],
        },
      ],
    },
  ];

  return (
    <div
      className="bg-light border-end"
      style={{
        width: collapsed ? "70px" : "250px",
        transition: "0.2s",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
        {!collapsed && <h5 className="m-0">📦 ERP</h5>}
        <FaBars style={{ cursor: "pointer" }} onClick={() => setCollapsed(!collapsed)} />
      </div>

      {/* Navigation */}
      <Nav className="flex-column p-2">
        {menus.map((menu, i) => (
          <div key={i}>
            <Nav.Item
              className="d-flex align-items-center my-2"
              style={{ cursor: "pointer" }}
              onClick={() => toggleMenu(menu.title)}
            >
              <span className="me-2 fs-5">{menu.icon}</span>
              {!collapsed && <span>{menu.title}</span>}
            </Nav.Item>

            {!collapsed &&
              openMenu === menu.title &&
              menu.subMenus.map((sub, j) => (
                <div key={j}>
                  <Nav.Item
                    className="ms-4 d-flex align-items-center my-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleSub(sub.label)}
                  >
                    <span className="me-2">{sub.icon}</span>
                    <span>{sub.label}</span>
                  </Nav.Item>

                  {openSub === sub.label &&
                    sub.items.map((item, k) => (
                      <Nav.Item key={k} className="ms-5 my-1 d-flex align-items-center">
                        <Link
                          to={item.path}
                          className={`nav-link d-flex align-items-center ${
                            location.pathname === item.path ? "active fw-bold" : ""
                          }`}
                        >
                          <span className="me-2">{item.icon}</span>
                          {item.label}
                        </Link>
                      </Nav.Item>
                    ))}
                </div>
              ))}
          </div>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;