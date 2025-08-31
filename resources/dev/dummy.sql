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

-- Insert menus sesuai struktur
INSERT INTO menus (id, name, code, parent_id, level) VALUES
-- Menu 1
(1, 'Menu 1', 'M-1', NULL, 0),
(2, 'Menu 1.1', 'M-1.1', 1, 1),
(3, 'Menu 1.2', 'M-1.2', 1, 1),
(4, 'Menu 1.2.1', 'M-1.2.1', 3, 2),
(5, 'Menu 1.2.2', 'M-1.2.2', 3, 2),
(6, 'Menu 1.3', 'M-1.3', 1, 1),
(7, 'Menu 1.3.1', 'M-1.3.1', 6, 2),

-- Menu 2
(8, 'Menu 2', 'M-2', NULL, 0),
(9, 'Menu 2.1', 'M-2.1', 8, 1),
(10, 'Menu 2.2', 'M-2.2', 8, 1),
(11, 'Menu 2.2.1', 'M-2.2.1', 10, 2),
(12, 'Menu 2.2.2', 'M-2.2.2', 10, 2),
(13, 'Menu 2.2.2.1', 'M-2.2.2.1', 12, 3),
(14, 'Menu 2.2.2.2', 'M-2.2.2.2', 12, 3),
(15, 'Menu 2.2.3', 'M-2.2.3', 10, 2),
(16, 'Menu 2.3', 'M-2.3', 8, 1),

-- Menu 3
(17, 'Menu 3', 'M-3', NULL, 0),
(18, 'Menu 3.1', 'M-3.1', 17, 1),
(19, 'Menu 3.2', 'M-3.2', 17, 1)
ON CONFLICT (id) DO NOTHING;

-- Mapping role_id 1 dengan semua menu (default: hanya can_read = true)
INSERT INTO role_menu_access (role_id, menu_id, can_create, can_read, can_update, can_delete)
SELECT 1, id, FALSE, TRUE, FALSE, FALSE
FROM menus
ON CONFLICT DO NOTHING;
