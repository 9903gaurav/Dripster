-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 22, 2023 at 10:54 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dripsterecom`
--

-- --------------------------------------------------------

--
-- Table structure for table `dripster_cart`
--

CREATE TABLE `dripster_cart` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `coupon_id` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dripster_cart`
--

INSERT INTO `dripster_cart` (`cart_id`, `user_id`, `coupon_id`, `created_at`) VALUES
(4, 2, 0, '2023-09-23 02:20:46');

-- --------------------------------------------------------

--
-- Table structure for table `dripster_cart_item`
--

CREATE TABLE `dripster_cart_item` (
  `cart_item_id` int(255) NOT NULL,
  `cart_id` int(255) NOT NULL,
  `prod_config_id` varchar(255) NOT NULL,
  `prod_qty` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dripster_cart_item`
--

INSERT INTO `dripster_cart_item` (`cart_item_id`, `cart_id`, `prod_config_id`, `prod_qty`) VALUES
(5, 4, 'DRIP_1_3_3', 3),
(9, 4, 'DRIP_1_3_1', 1),
(10, 4, 'DRIP_1_1_5', 1),
(11, 4, 'DRIP_1_1_6', 1);

-- --------------------------------------------------------

--
-- Table structure for table `dripster_coupons`
--

CREATE TABLE `dripster_coupons` (
  `id` int(10) NOT NULL,
  `couponCode` varchar(255) NOT NULL,
  `discountPercentage` double NOT NULL,
  `discountUpto` double NOT NULL,
  `isNewUser` tinyint(1) NOT NULL,
  `limitUpto` int(10) NOT NULL,
  `minimumPurchase` double NOT NULL,
  `validFrom` datetime NOT NULL,
  `validTo` datetime NOT NULL,
  `isActive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dripster_product`
--

CREATE TABLE `dripster_product` (
  `dripster_product_id` varchar(255) NOT NULL,
  `dripster_product_title` varchar(255) NOT NULL,
  `dripster_product_mainImg` varchar(255) NOT NULL,
  `dripster_product_otherImg` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`dripster_product_otherImg`)),
  `dripster_product_status` tinyint(1) NOT NULL DEFAULT 0,
  `dripster_product_created` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dripster_product`
--

INSERT INTO `dripster_product` (`dripster_product_id`, `dripster_product_title`, `dripster_product_mainImg`, `dripster_product_otherImg`, `dripster_product_status`, `dripster_product_created`) VALUES
('DRIP_1_1', 'The Great Outdoors', 'assest/product/TheGreatDoor/prod_img.png', '\"assest/product/TheGreatDoor/1.png,assest/product/TheGreatDoor/2.png,assest/product/TheGreatDoor/temp.png\"', 1, '2023-09-22 00:00:47'),
('DRIP_1_2', 'Authority World', 'assest/product/AuthorityWorld/prod_img.png', '\"assest/product/AuthorityWorld/1.png,assest/product/AuthorityWorld/2.png,assest/product/AuthorityWorld/temp.png\"', 1, '2023-09-22 23:38:18'),
('DRIP_1_3', 'Luck, Chance, World', 'assest/product/LuckChanceWorld/prod_img.png', '\"assest/product/LuckChanceWorld/1.png,assest/product/LuckChanceWorld/2.png,assest/product/LuckChanceWorld/temp.png\"', 1, '2023-09-22 23:39:18'),
('DRIP_1_4', 'David Sculpture', 'assest/product/DavidSculpture/prod_img.png', '\"assest/product/DavidSculpture/1.png,assest/product/DavidSculpture/2.png,assest/product/DavidSculpture/temp.png\"', 1, '2023-09-22 23:40:18');

-- --------------------------------------------------------

--
-- Table structure for table `dripster_product_config`
--

CREATE TABLE `dripster_product_config` (
  `dripster_product_config_id` varchar(255) NOT NULL,
  `dripster_product_config_productId` varchar(255) NOT NULL,
  `dripster_product_config_size` varchar(20) NOT NULL,
  `dripster_product_config_mrp` double NOT NULL,
  `dripster_product_config_currPrice` double NOT NULL,
  `dripster_product_config_qty` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dripster_product_config`
--

INSERT INTO `dripster_product_config` (`dripster_product_config_id`, `dripster_product_config_productId`, `dripster_product_config_size`, `dripster_product_config_mrp`, `dripster_product_config_currPrice`, `dripster_product_config_qty`) VALUES
('DRIP_1_1_1', 'DRIP_1_1', 'X-Small', 1800, 1100, 100),
('DRIP_1_1_2', 'DRIP_1_1', 'Small', 1800, 1800, 100),
('DRIP_1_1_3', 'DRIP_1_1', 'Medium', 1800, 1800, 100),
('DRIP_1_1_4', 'DRIP_1_1', 'Large', 1800, 1800, 100),
('DRIP_1_1_5', 'DRIP_1_1', 'X-Large', 1800, 1800, 100),
('DRIP_1_1_6', 'DRIP_1_1', 'XX-Large', 1800, 1800, 100),
('DRIP_1_2_1', 'DRIP_1_2', 'X-Small', 1800, 1223, 100),
('DRIP_1_2_2', 'DRIP_1_2', 'Small', 1800, 1800, 100),
('DRIP_1_2_3', 'DRIP_1_2', 'Medium', 1800, 1800, 100),
('DRIP_1_2_4', 'DRIP_1_2', 'Large', 1800, 1800, 100),
('DRIP_1_2_5', 'DRIP_1_2', 'X-Large', 1800, 1800, 100),
('DRIP_1_2_6', 'DRIP_1_2', 'XX-Large', 1800, 1800, 100),
('DRIP_1_3_1', 'DRIP_1_3', 'X-Small', 1800, 11001, 100),
('DRIP_1_3_2', 'DRIP_1_3', 'Small', 1800, 1800, 100),
('DRIP_1_3_3', 'DRIP_1_3', 'Medium', 1800, 18, 100),
('DRIP_1_3_4', 'DRIP_1_3', 'Large', 1800, 1800, 100),
('DRIP_1_3_5', 'DRIP_1_3', 'X-Large', 1800, 1800, 100),
('DRIP_1_3_6', 'DRIP_1_3', 'XX-Large', 1800, 1800, 100),
('DRIP_1_4_1', 'DRIP_1_4', 'X-Small', 1800, 110, 100),
('DRIP_1_4_2', 'DRIP_1_4', 'Small', 1800, 1800, 100),
('DRIP_1_4_3', 'DRIP_1_4', 'Medium', 1800, 1800, 100),
('DRIP_1_4_4', 'DRIP_1_4', 'Large', 1800, 1800, 100),
('DRIP_1_4_5', 'DRIP_1_4', 'X-Large', 1800, 1800, 100),
('DRIP_1_4_6', 'DRIP_1_4', 'XX-Large', 1800, 1800, 100);

-- --------------------------------------------------------

--
-- Table structure for table `dripster_user`
--

CREATE TABLE `dripster_user` (
  `dripster_user_id` int(255) NOT NULL,
  `dripster_user_email` varchar(255) NOT NULL,
  `dripster_user_password` varchar(255) NOT NULL,
  `dripster_user_firstName` varchar(255) NOT NULL,
  `dripster_user_lastName` varchar(255) NOT NULL,
  `dripster_user_createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dripster_user`
--

INSERT INTO `dripster_user` (`dripster_user_id`, `dripster_user_email`, `dripster_user_password`, `dripster_user_firstName`, `dripster_user_lastName`, `dripster_user_createdAt`) VALUES
(2, 'gaurav@gmail.co', '$2b$10$uX4mnjAVNEMHBer7xRd2U.Hs.s5piatv9ZCFTiabKS63gQdvp978C', 'Gaurav', 'Jha', '2023-09-04 00:48:04'),
(4, 'gaurav@gmail.com', '$2b$10$sigKGX3fqE/ijRl5d0pso.pokrPN/2BrrG4oZZK6tSn5PYGFzE7o6', 'Gaurav', 'Jha', '2023-09-07 11:39:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dripster_cart`
--
ALTER TABLE `dripster_cart`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `dripster_cart_item`
--
ALTER TABLE `dripster_cart_item`
  ADD PRIMARY KEY (`cart_item_id`),
  ADD UNIQUE KEY `cart_item_id` (`cart_item_id`),
  ADD UNIQUE KEY `unique_cart_prod_config` (`cart_id`,`prod_config_id`),
  ADD KEY `prod_config_id` (`prod_config_id`);

--
-- Indexes for table `dripster_coupons`
--
ALTER TABLE `dripster_coupons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dripster_product`
--
ALTER TABLE `dripster_product`
  ADD UNIQUE KEY `dripster_product_id` (`dripster_product_id`);

--
-- Indexes for table `dripster_product_config`
--
ALTER TABLE `dripster_product_config`
  ADD PRIMARY KEY (`dripster_product_config_id`),
  ADD KEY `dripster_product_config_productId` (`dripster_product_config_productId`);

--
-- Indexes for table `dripster_user`
--
ALTER TABLE `dripster_user`
  ADD PRIMARY KEY (`dripster_user_id`),
  ADD UNIQUE KEY `dripster_user_email` (`dripster_user_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dripster_cart`
--
ALTER TABLE `dripster_cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `dripster_cart_item`
--
ALTER TABLE `dripster_cart_item`
  MODIFY `cart_item_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `dripster_coupons`
--
ALTER TABLE `dripster_coupons`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dripster_user`
--
ALTER TABLE `dripster_user`
  MODIFY `dripster_user_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dripster_cart_item`
--
ALTER TABLE `dripster_cart_item`
  ADD CONSTRAINT `dripster_cart_item_ibfk_2` FOREIGN KEY (`prod_config_id`) REFERENCES `dripster_product_config` (`dripster_product_config_id`);

--
-- Constraints for table `dripster_product_config`
--
ALTER TABLE `dripster_product_config`
  ADD CONSTRAINT `dripster_product_config_ibfk_1` FOREIGN KEY (`dripster_product_config_productId`) REFERENCES `dripster_product` (`dripster_product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
