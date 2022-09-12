-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20220828.183f193084
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 30, 2022 lúc 08:53 AM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 8.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `tree`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pids`
--

CREATE TABLE `pids` (
  `id` varchar(36) NOT NULL,
  `pid` varchar(255) NOT NULL,
  `userId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `pids`
--

INSERT INTO `pids` (`id`, `pid`, `userId`) VALUES
('02b1f63b-f0b4-4df2-8aa9-580f1fbef088', '3de71c74-8f09-4d49-ba3b-374678e9d617', '4baa5a50-5746-4963-bdca-e3e7ca8a8756'),
('56d892bb-3c51-4c33-ad9b-9d9cdb029682', 'ab09c47a-2e03-4c8d-b913-dec3051ce042', '9798b550-903f-4a80-91b9-f2d29571af5e'),
('a26deb5f-f6fc-4cc3-83f3-59f2e2dc555a', '9798b550-903f-4a80-91b9-f2d29571af5e', 'ab09c47a-2e03-4c8d-b913-dec3051ce042'),
('c2ba32fd-887a-43f5-bf44-2d288ef5c122', '4baa5a50-5746-4963-bdca-e3e7ca8a8756', '3de71c74-8f09-4d49-ba3b-374678e9d617');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `relation`
--

CREATE TABLE `relation` (
  `ancestorId` varchar(255) NOT NULL,
  `descendantId` varchar(255) NOT NULL,
  `depth` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `relation`
--

INSERT INTO `relation` (`ancestorId`, `descendantId`, `depth`) VALUES
('200d9070-80b0-4bd3-8e96-da0cc1f5f170', '200d9070-80b0-4bd3-8e96-da0cc1f5f170', 0),
('218a4884-41db-45cb-8e20-e666a09b1352', '218a4884-41db-45cb-8e20-e666a09b1352', 0),
('2e0b8ef5-223f-4c29-982e-26a721c910a2', '2e0b8ef5-223f-4c29-982e-26a721c910a2', 0),
('3de71c74-8f09-4d49-ba3b-374678e9d617', '3de71c74-8f09-4d49-ba3b-374678e9d617', 0),
('40f9a9df-4fdf-49cc-b8d4-2ec5a9772e13', '40f9a9df-4fdf-49cc-b8d4-2ec5a9772e13', 0),
('4baa5a50-5746-4963-bdca-e3e7ca8a8756', '218a4884-41db-45cb-8e20-e666a09b1352', 1),
('4baa5a50-5746-4963-bdca-e3e7ca8a8756', '40f9a9df-4fdf-49cc-b8d4-2ec5a9772e13', 1),
('4baa5a50-5746-4963-bdca-e3e7ca8a8756', '4baa5a50-5746-4963-bdca-e3e7ca8a8756', 0),
('5270f820-96d9-47b6-9d14-c91455373ef4', '218a4884-41db-45cb-8e20-e666a09b1352', 2),
('5270f820-96d9-47b6-9d14-c91455373ef4', '40f9a9df-4fdf-49cc-b8d4-2ec5a9772e13', 2),
('5270f820-96d9-47b6-9d14-c91455373ef4', '4baa5a50-5746-4963-bdca-e3e7ca8a8756', 1),
('5270f820-96d9-47b6-9d14-c91455373ef4', '5270f820-96d9-47b6-9d14-c91455373ef4', 0),
('5270f820-96d9-47b6-9d14-c91455373ef4', '9798b550-903f-4a80-91b9-f2d29571af5e', 1),
('8efcd055-c1cf-444a-bb20-dfa3957f1960', '8efcd055-c1cf-444a-bb20-dfa3957f1960', 0),
('954a0cc2-b8b1-4bbd-bb15-925c6f6379a0', '954a0cc2-b8b1-4bbd-bb15-925c6f6379a0', 0),
('9798b550-903f-4a80-91b9-f2d29571af5e', '9798b550-903f-4a80-91b9-f2d29571af5e', 0),
('ab09c47a-2e03-4c8d-b913-dec3051ce042', 'ab09c47a-2e03-4c8d-b913-dec3051ce042', 0),
('b2cf90ec-72a5-4b24-88ef-786ba364e6fd', 'b2cf90ec-72a5-4b24-88ef-786ba364e6fd', 0),
('ebad3f70-19df-4623-9d2d-0418bba3f766', 'ebad3f70-19df-4623-9d2d-0418bba3f766', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `gender` enum('male','female','other') NOT NULL,
  `image` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mid` varchar(36) DEFAULT NULL,
  `fid` varchar(36) DEFAULT NULL,
  `status` enum('living','deceased') NOT NULL DEFAULT 'living'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `name`, `gender`, `image`, `phone`, `email`, `password`, `mid`, `fid`, `status`) VALUES
('200d9070-80b0-4bd3-8e96-da0cc1f5f170', 'Le Van B', 'female', '', '0123456782', 'levanb@gmail.com', '123456', NULL, NULL, 'living'),
('218a4884-41db-45cb-8e20-e666a09b1352', 'Le Ton Nang', 'male', '', '0123456789', 'nangbx01@gmail.com', '123456', '3de71c74-8f09-4d49-ba3b-374678e9d617', '4baa5a50-5746-4963-bdca-e3e7ca8a8756', 'living'),
('2e0b8ef5-223f-4c29-982e-26a721c910a2', 'Le Van D', 'male', '', '0123426389', 'levand@gmail.com', '123456', NULL, NULL, 'living'),
('3de71c74-8f09-4d49-ba3b-374678e9d617', 'Le Van F', 'female', '', '0123346789', 'levanf@gmail.com', '123456', NULL, NULL, 'living'),
('40f9a9df-4fdf-49cc-b8d4-2ec5a9772e13', 'Le Van I', 'male', '', '0123246789', 'levani@gmail.com', '123456', '954a0cc2-b8b1-4bbd-bb15-925c6f6379a0', '4baa5a50-5746-4963-bdca-e3e7ca8a8756', 'living'),
('4baa5a50-5746-4963-bdca-e3e7ca8a8756', 'Le Van C', 'male', '', '0123436789', 'levanc@gmail.com', '123456', NULL, '5270f820-96d9-47b6-9d14-c91455373ef4', 'deceased'),
('5270f820-96d9-47b6-9d14-c91455373ef4', 'Le Van A', 'male', '', '0123426789', 'levana@gmail.com', '123456', NULL, NULL, 'deceased'),
('8efcd055-c1cf-444a-bb20-dfa3957f1960', 'Le Viet Toan', 'male', '', '0363584672', 'leviettoan@gmail.com', '123456', NULL, NULL, 'living'),
('954a0cc2-b8b1-4bbd-bb15-925c6f6379a0', 'Le Van G', 'female', '', '0123456429', 'levang@gmail.com', '123456', NULL, NULL, 'living'),
('9798b550-903f-4a80-91b9-f2d29571af5e', 'le viet a', 'male', '', '0125684965', 'levieta@gmail.com', '$2a$10$7h/0SQ4FXRG5eX3602o3/.nvtvJ/nmNN/9sXkfIozm0p3kqOOSTzK', NULL, '5270f820-96d9-47b6-9d14-c91455373ef4', 'living'),
('ab09c47a-2e03-4c8d-b913-dec3051ce042', 'nguyen thi b', 'female', '', '0125634965', 'nguyenthib@gmail.com', '$2a$10$7h/0SQ4FXRG5eX3602o3/.nvtvJ/nmNN/9sXkfIozm0p3kqOOSTzK', NULL, NULL, 'living'),
('b2cf90ec-72a5-4b24-88ef-786ba364e6fd', 'Le Van N', 'male', '', '0862303996', 'levann@gmail.com', '123456', NULL, NULL, 'living'),
('ebad3f70-19df-4623-9d2d-0418bba3f766', 'Le Van E', 'male', '', '0923456789', 'levane@gmail.com', '123456', NULL, NULL, 'living');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `pids`
--
ALTER TABLE `pids`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_c0e77a4afe12281a51ae2d05de5` (`userId`);

--
-- Chỉ mục cho bảng `relation`
--
ALTER TABLE `relation`
  ADD PRIMARY KEY (`ancestorId`,`descendantId`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_8e1f623798118e629b46a9e629` (`phone`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
  ADD UNIQUE KEY `REL_7615c004f24da465cca7f7f40a` (`mid`),
  ADD KEY `FK_ba28319f4a8ab1d6a24c32bd0d5` (`fid`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `pids`
--
ALTER TABLE `pids`
  ADD CONSTRAINT `FK_c0e77a4afe12281a51ae2d05de5` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_7615c004f24da465cca7f7f40a0` FOREIGN KEY (`mid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_ba28319f4a8ab1d6a24c32bd0d5` FOREIGN KEY (`fid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
