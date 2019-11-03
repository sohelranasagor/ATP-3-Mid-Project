-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2019 at 06:39 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `atp3mid`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(30) NOT NULL,
  `pic` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `pic`) VALUES
(1, 'Admin', 'admin@gmail.com', '12', '/uploads/download.png');

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `doctorid` int(10) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `dob` varchar(10) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `department` varchar(200) NOT NULL,
  `phone` varchar(14) NOT NULL,
  `password` varchar(30) NOT NULL,
  `salary` varchar(10) NOT NULL,
  `pic` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`doctorid`, `firstname`, `lastname`, `dob`, `gender`, `email`, `department`, `phone`, `password`, `salary`, `pic`) VALUES
(3, 'Fuad', 'Hossain', '1996-03-01', 'Male', 'fuad@gmail.com', 'Medicine & Nephrology', '+8801711111111', '12', '30000', '/uploads/doctor.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `logid` int(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `type` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`logid`, `email`, `password`, `type`) VALUES
(2, 'admin@gmail.com', '12', 1),
(8, 'almas@gmail.com', '12', 3),
(9, 'fuad@gmail.com', '12', 2),
(12, 'amait@gmail.com', '12', 4);

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `description` varchar(10000) NOT NULL,
  `pic` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `title`, `description`, `pic`) VALUES
(2, 'Apollo Has Launched Holistic JOINT CARE & WELLNESS CENTER', 'Apollo JOINT CARE & WELLNESS CENTER starts its journey under the supervision of country’s renown knee surgeon Dr. M. Ali. The center is equipped to provide joint care and wellness services of global standard. The newly launched department will treat in regards of mini whole surgery, knee, ligament and hip surgery and day to day pain management. On this occasion of grand launching and to make the event more interactive Chief Operating Officer Dr. Ratnadeep Chaskar, Director Medical Services Dr. Shanthi Bansal, Senior General Manager of Medical Services Dr. Arif Mahmud, Coordinator & Senior Consultant of the center Dr. M. Ali, other consultants and higher management body of Apollo Hospitals Dhaka were present.', '/uploads/index.jpg'),
(3, 'Child Heart Disease awareness event organised by Apollo Hospitals Dhaka', 'Dr. Ratnadeep Chaskar, Chief Executive Officer; Dr. Tahera Nazrin, Consultant–Paediatric Cardiology; Professor Dr. A. Q. M. Reza, Senior Consultant & Coordinator–Clinical & Interventional Cardiology; Professor Dr. Mohammed Ishtiaque Hossain, Seniorn Consultant & Coordinator– Paediatrics & Neonatology; and Santanu Kumar Das, Director– Business Development from Apollo Hospitals Dhaka as well as Professor Dr. Md. Abid Hossain Mollah, Head of the Department of Paediatrics, BIRDEM General Hospital & Ibrahim Medical College were present among other consultants and senior management of Apollo Dhaka. President of BASIS Mr. Syed Almas Kabir, comedian & corporate personality Mr. Naveed Mahbub and singer Mehreen Mahmud also graced the event with their warm presence.', '/uploads/index1.jpg'),
(6, 'Toufiq’s life was saved by the brave hands of Apollo', '5th January, 2018. A student of Comilla Medical College naming Md. Toufiqul Islam (Age 24) was admitted to Apollo Hospitals Dhaka due to a serious physical assault accompanied by a severe head injury and unconsciousness under the supervision of Dr. Md. Aliuzzaman Joardar, a consultant of Neurosurgery Department. Considering the situation of Toufiq the Doctor went for BIFRONTAL DECOMPRESSIVE CRANIECTOMY on the same day of his admission. The brave approach of the Dr. Aliuzzaman and his team and a close motherly care of Apollo managed to save the life of Toufiq. Toufiq’s situation was so critical that the life of such brilliant student was at risk and he might have died but due to the extensive care of Apollo Hospitals Dhaka Toufiq is now fully fit and was released on 1st April, 2018.', '/uploads/Screenshot.png');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staffid` int(10) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `dob` varchar(10) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(14) NOT NULL,
  `password` varchar(30) NOT NULL,
  `salary` int(10) NOT NULL,
  `pic` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`staffid`, `firstname`, `lastname`, `dob`, `gender`, `email`, `phone`, `password`, `salary`, `pic`) VALUES
(3, 'Almas', 'Khan', '1996-01-02', 'Male', 'almas@gmail.com', '+8801521330936', '12', 20000, '/uploads/almas.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(10) NOT NULL,
  `firstname` varchar(20) NOT NULL,
  `lastname` varchar(10) NOT NULL,
  `dob` varchar(20) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(14) NOT NULL,
  `city` varchar(30) NOT NULL,
  `location` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `picture` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `firstname`, `lastname`, `dob`, `gender`, `email`, `phone`, `city`, `location`, `password`, `picture`) VALUES
(29, 'Amait', 'Paul', '2019-11-20', 'Male', 'amait@gmail.com', '+8801746047044', 'Dhaka', 'Nikunju-2', '12', '/uploads/amait.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`doctorid`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`logid`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staffid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `doctorid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `logid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `staffid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
