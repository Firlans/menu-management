INSERT INTO roles (name, code) VALUES
('Admin', 'ADMIN'),
('Manager', 'MANAGER'),
('User', 'USER');
 
INSERT INTO menus (name, code, parent_id, level) VALUES
('Dashboard', 'DASHBOARD', NULL, 0),
('Settings', 'SETTINGS', NULL, 0),
('User Management', 'USER_MGMT', 2, 1),
('Role Management', 'ROLE_MGMT', 2, 1),
('Menu Management', 'MENU_MGMT', 2, 1);

INSERT INTO role_menu_access (role_id, menu_id, can_create, can_read, can_update, can_delete) VALUES
(1, 1, true, true, true, true),
(1, 2, true, true, true, true),
(1, 3, true, true, true, true),
(1, 4, true, true, true, true),
(1, 5, true, true, true, true),

-- Manager limited access
(2, 1, false, true, false, false),
(2, 2, false, true, false, false),
(2, 3, true, true, true, false),
(2, 4, false, true, false, false),

-- User read-only access
(3, 1, false, true, false, false);
