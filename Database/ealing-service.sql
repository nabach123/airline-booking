-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 06, 2024 at 10:13 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ealing-service`
--

-- --------------------------------------------------------

--
-- Table structure for table `Address`
--

CREATE TABLE `Address` (
  `AddressID` int(10) NOT NULL,
  `City` varchar(100) NOT NULL,
  `Country` varchar(100) NOT NULL,
  `PostCode` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Address`
--

INSERT INTO `Address` (`AddressID`, `City`, `Country`, `PostCode`) VALUES
(1, 'Slough', 'Uk', 'Sk38JJ');

-- --------------------------------------------------------

--
-- Table structure for table `Booking`
--

CREATE TABLE `Booking` (
  `BookingID` int(100) NOT NULL,
  `SelectedSeats` varchar(100) NOT NULL,
  `SelectedDate` date NOT NULL,
  `DestinationID` int(50) NOT NULL,
  `Price` int(100) DEFAULT NULL,
  `UserId` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `CheckOut`
--

CREATE TABLE `CheckOut` (
  `CheckOutID` int(100) NOT NULL,
  `BookingID` int(100) NOT NULL,
  `TotalPrice` varchar(100) NOT NULL,
  `PaymentId` int(100) NOT NULL,
  `DateTime` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Destination`
--

CREATE TABLE `Destination` (
  `DestinationID` int(100) NOT NULL,
  `FromAddress` int(100) NOT NULL,
  `ToAddress` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Payment`
--

CREATE TABLE `Payment` (
  `PaymentID` int(50) NOT NULL,
  `Type` varchar(50) NOT NULL,
  `DateTime` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Payment`
--

INSERT INTO `Payment` (`PaymentID`, `Type`, `DateTime`) VALUES
(1, 'Banking', '2024-05-15 21:12:27.000000');

-- --------------------------------------------------------

--
-- Table structure for table `Planes`
--

CREATE TABLE `Planes` (
  `PlaneID` int(50) NOT NULL,
  `Model` varchar(50) NOT NULL,
  `NumberOFSeats` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Planes`
--

INSERT INTO `Planes` (`PlaneID`, `Model`, `NumberOFSeats`) VALUES
(1, 'XL EMrites', 200);

-- --------------------------------------------------------

--
-- Table structure for table `Seats`
--

CREATE TABLE `Seats` (
  `id` int(11) NOT NULL,
  `seat_label` varchar(10) DEFAULT NULL,
  `seat_class` varchar(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `seat_row` int(11) DEFAULT NULL,
  `seat_col` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Seats`
--

INSERT INTO `Seats` (`id`, `seat_label`, `seat_class`, `status`, `seat_row`, `seat_col`) VALUES
(1, '1A', 'first-class', 'available', 1, 1),
(2, '1B', 'first-class', 'available', 1, 2),
(3, '', 'aisle', '', 1, 3),
(4, '1C', 'first-class', 'available', 1, 4),
(5, '1D', 'first-class', 'available', 1, 5),
(6, '2A', 'first-class', 'available', 2, 1),
(7, '2B', 'first-class', 'available', 2, 2),
(8, '', 'aisle', '', 2, 3),
(9, '2C', 'first-class', 'available', 2, 4),
(10, '2D', 'first-class', 'available', 2, 5),
(11, '3A', 'first-class', 'available', 3, 1),
(12, '3B', 'first-class', 'available', 3, 2),
(13, '', 'aisle', NULL, 3, 3),
(14, '3C', 'first-class', 'available', 3, 4),
(15, '3D', 'first-class', 'available', 3, 5),
(16, '4A', 'business-class', 'available', 4, 1),
(17, '4B', 'business-class', 'available', 4, 2),
(18, '4C', 'business-class', 'available', 4, 3),
(19, '', 'aisle', '', 4, 4),
(20, '4D', 'business-class', 'available', 4, 5),
(21, '4E', 'business-class', 'available', 4, 6),
(22, '4F', 'business-class', 'booked', 4, 7),
(23, '5A', 'business-class', 'available', 5, 1),
(24, '5B', 'business-class', 'available', 5, 2),
(25, '5C', 'business-class', 'available', 5, 3),
(26, '', 'aisle', '', 5, 4),
(27, '5D', 'business-class', 'available', 5, 5),
(28, '5E', 'business-class', 'available', 5, 6),
(29, '5F', 'business-class', 'available', 5, 7),
(30, '6A', 'business-class', 'available', 6, 1),
(31, '6B', 'business-class', 'available', 6, 2),
(32, '6C', 'business-class', 'available', 6, 3),
(33, '', 'aisle', '', 6, 4),
(34, '6D', 'business-class', 'available', 6, 5),
(35, '6E', 'business-class', 'available', 6, 6),
(36, '6F', 'business-class', 'available', 6, 7),
(37, '7A', 'business-class', 'available', 7, 1),
(38, '7B', 'business-class', 'available', 7, 2),
(39, '7C', 'business-class', 'available', 7, 3),
(40, '', 'aisle', '', 7, 4),
(41, '7D', 'business-class', 'available', 7, 5),
(42, '7E', 'business-class', 'available', 7, 6),
(43, '7F', 'business-class', 'available', 7, 7),
(44, '8A', 'economy-class', 'available', 8, 1),
(45, '8B', 'economy-class', 'available', 8, 2),
(46, '8C', 'economy-class', 'available', 8, 3),
(47, '', 'aisle', '', 8, 4),
(48, '8D', 'economy-class', 'available', 8, 5),
(49, '8E', 'economy-class', 'available', 8, 6),
(50, '8F', 'economy-class', 'booked', 8, 7),
(51, '9A', 'economy-class', 'available', 9, 1),
(52, '9B', 'economy-class', 'available', 9, 2),
(53, '9C', 'economy-class', 'available', 9, 3),
(54, '', 'aisle', '', 9, 4),
(55, '9D', 'economy-class', 'available', 9, 5),
(56, '9E', 'economy-class', 'available', 9, 6),
(57, '9F', 'economy-class', 'booked', 9, 7),
(58, '10A', 'economy-class', 'available', 10, 1),
(59, '10B', 'economy-class', 'available', 10, 2),
(60, '10C', 'economy-class', 'available', 10, 3),
(61, '', 'aisle', '', 10, 4),
(62, '10D', 'economy-class', 'available', 10, 5),
(63, '10E', 'economy-class', 'available', 10, 6),
(64, '10F', 'economy-class', 'booked', 10, 7),
(65, '11A', 'economy-class', 'available', 11, 1),
(66, '11B', 'economy-class', 'available', 11, 2),
(67, '11C', 'economy-class', 'available', 11, 3),
(68, '', 'aisle', '', 11, 4),
(69, '11D', 'economy-class', 'available', 11, 5),
(70, '11E', 'economy-class', 'available', 11, 6),
(71, '11F', 'economy-class', 'available', 11, 7),
(72, '12A', 'economy-class', 'available', 12, 1),
(73, '12B', 'economy-class', 'available', 12, 2),
(74, '12C', 'economy-class', 'available', 12, 3),
(75, '', 'aisle', '', 12, 4),
(76, '12D', 'economy-class', 'available', 12, 5),
(77, '12E', 'economy-class', 'available', 12, 6),
(78, '12F', 'economy-class', 'available', 12, 7),
(79, '13A', 'economy-class', 'available', 13, 1),
(80, '13B', 'economy-class', 'available', 13, 2),
(81, '13C', 'economy-class', 'available', 13, 3),
(82, '', 'aisle', '', 13, 4),
(83, '13D', 'economy-class', 'available', 13, 5),
(84, '13E', 'economy-class', 'available', 13, 6),
(85, '13F', 'economy-class', 'available', 13, 7),
(86, '14A', 'economy-class', 'available', 14, 1),
(87, '14B', 'economy-class', 'available', 14, 2),
(88, '14C', 'economy-class', 'available', 14, 3),
(89, '', 'aisle', '', 14, 4),
(90, '14D', 'economy-class', 'available', 14, 5),
(91, '14E', 'economy-class', 'available', 14, 6),
(92, '14F', 'economy-class', 'available', 14, 7),
(93, '15A', 'economy-class', 'available', 15, 1),
(94, '15B', 'economy-class', 'available', 15, 2),
(95, '15C', 'economy-class', 'available', 15, 3),
(96, '', 'aisle', '', 15, 4),
(97, '15D', 'economy-class', 'available', 15, 5),
(98, '15E', 'economy-class', 'available', 15, 6),
(99, '15F', 'economy-class', 'available', 15, 7),
(100, '16A', 'economy-class', 'available', 16, 1),
(101, '16B', 'economy-class', 'available', 16, 2),
(102, '16C', 'economy-class', 'available', 16, 3),
(103, '', 'aisle', '', 16, 4),
(104, '16D', 'economy-class', 'available', 16, 5),
(105, '16E', 'economy-class', 'available', 16, 6),
(106, '16F', 'economy-class', 'available', 16, 7),
(107, '17A', 'economy-class', 'available', 17, 1),
(108, '17B', 'economy-class', 'available', 17, 2),
(109, '17C', 'economy-class', 'available', 17, 3),
(110, '', 'aisle', '', 17, 4),
(111, '17D', 'economy-class', 'available', 17, 5),
(112, '17E', 'economy-class', 'available', 17, 6),
(113, '17F', 'economy-class', 'available', 17, 7),
(114, '18A', 'economy-class', 'available', 18, 1),
(115, '18B', 'economy-class', 'available', 18, 2),
(116, '18C', 'economy-class', 'available', 18, 3),
(117, '', 'aisle', '', 18, 4),
(118, '18D', 'economy-class', 'available', 18, 5),
(119, '18E', 'economy-class', 'available', 18, 6),
(120, '18F', 'economy-class', 'available', 18, 7),
(121, '19A', 'economy-class', 'available', 19, 1),
(122, '19B', 'economy-class', 'available', 19, 2),
(123, '19C', 'economy-class', 'available', 19, 3),
(124, '', 'aisle', '', 19, 4),
(125, '19D', 'economy-class', 'available', 19, 5),
(126, '19E', 'economy-class', 'available', 19, 6),
(127, '19F', 'economy-class', 'available', 19, 7),
(128, '20B', 'economy-class', 'available', 20, 2),
(129, '20C', 'economy-class', 'available', 20, 3),
(130, '', 'aisle', '', 20, 4),
(131, '20D', 'economy-class', 'available', 20, 5),
(132, '20E', 'economy-class', 'available', 20, 6);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `passport` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `full_name`, `email`, `phone_number`, `address`, `passport`) VALUES
(1, 'nabaraj', 'acharya', 'Nabaraj Acharya', 'nabarajacharya343@gmail.com', '073939402', '1 New Road Slough', '1041524');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Address`
--
ALTER TABLE `Address`
  ADD PRIMARY KEY (`AddressID`);

--
-- Indexes for table `Booking`
--
ALTER TABLE `Booking`
  ADD PRIMARY KEY (`BookingID`);

--
-- Indexes for table `CheckOut`
--
ALTER TABLE `CheckOut`
  ADD PRIMARY KEY (`CheckOutID`);

--
-- Indexes for table `Destination`
--
ALTER TABLE `Destination`
  ADD PRIMARY KEY (`DestinationID`);

--
-- Indexes for table `Payment`
--
ALTER TABLE `Payment`
  ADD PRIMARY KEY (`PaymentID`);

--
-- Indexes for table `Planes`
--
ALTER TABLE `Planes`
  ADD PRIMARY KEY (`PlaneID`);

--
-- Indexes for table `Seats`
--
ALTER TABLE `Seats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Address`
--
ALTER TABLE `Address`
  MODIFY `AddressID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Booking`
--
ALTER TABLE `Booking`
  MODIFY `BookingID` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `CheckOut`
--
ALTER TABLE `CheckOut`
  MODIFY `CheckOutID` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Destination`
--
ALTER TABLE `Destination`
  MODIFY `DestinationID` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Payment`
--
ALTER TABLE `Payment`
  MODIFY `PaymentID` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Planes`
--
ALTER TABLE `Planes`
  MODIFY `PlaneID` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
