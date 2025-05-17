-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Maj 17, 2025 at 01:04 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rateit`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` enum('Gry','Filmy','Książki','Elektronika','Inne') NOT NULL,
  `description` text DEFAULT NULL,
  `avg_rating` decimal(3,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `description`, `avg_rating`) VALUES
(22, 'Tomasz', 'Filmy', '3232', 3.50),
(23, '3232', 'Filmy', '3232', 0.00),
(24, '2', 'Gry', '2', 0.00),
(25, 'ds', 'Filmy', 'dsdsds', 0.00),
(27, 'sdds', 'Książki', 'dssdsd', 0.00),
(28, 'dsa', 'Filmy', 'Nowy fajny produkt np gra jakas', 0.00);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` smallint(6) NOT NULL,
  `product_id` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `product_id`, `rating`) VALUES
(22, 8, 22, 2),
(23, 30, 22, 5);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` smallint(6) NOT NULL,
  `username` varchar(50) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_master` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `pass`, `created_at`, `is_master`) VALUES
(1, 'testuser', '$2y$10$Fp/ut61Rx5H7Ln0lJ90xuOki9VvHEbdgMHjMEYcCu1Q43xx8RvIb6', '2025-04-03 15:32:43', 0),
(4, 'testufdsser', '$2y$10$7KfNbEuK0TX6TwDJrkhuKu6P9xjY3M/k/5xQRE/Xzk23tbCYNDaCS', '2025-04-12 12:39:03', 0),
(5, 'testufdfsdsser', '$2y$10$kSAdHgsoQNvWg88LCIkTkeuh8g8kuA9zvvl9lySGXhXv1LfbJy8tW', '2025-04-12 12:39:05', 0),
(7, 'testuasdsadasfdfsdsser', 'yourpasfdsfdssword', '2025-04-12 12:39:22', 0),
(8, 'laitdsgn', '12345678', '2025-04-17 13:25:53', 0),
(10, 'jakistamziomek', 'dupa123!', '2025-04-17 13:26:52', 0),
(14, 'fdsfsdf', 'fsdfsdfsd', '2025-04-24 13:16:41', 0),
(15, 'fdsfsdfggg', 'fsdfsdfsd', '2025-04-24 13:17:39', 0),
(16, 'U07UDATMUSH', '12345678', '2025-04-24 13:17:47', 0),
(17, 'U07UDATMUSH44', '42343423', '2025-04-24 13:18:11', 0),
(18, 'CWELLLLLLUUUU', 'CWELLLLLLUUUU', '2025-04-24 13:19:18', 0),
(19, '4234243242', '4234243242', '2025-04-24 13:19:53', 0),
(23, 'laitdsgn433433', '12345678', '2025-04-24 13:21:00', 0),
(25, 'm43997_laitdsgn', 'm43997_laitdsgn', '2025-04-24 13:23:52', 0),
(26, 'tomek08.konto@gmail.com', 'tomek08.konto@gm', '2025-04-24 13:25:00', 0),
(27, 'laitdsgnnnn', '12345678', '2025-04-25 15:09:57', 0),
(28, 'ziomek', '12345678', '2025-05-09 11:31:37', 1),
(29, 'dsadasdsa', '   dddddd', '2025-05-10 13:10:16', 0),
(30, 'xdddd', '12345678', '2025-05-12 17:49:26', 0),
(38, 'nowyuzytkownik1', '12345678', '2025-05-17 10:56:50', 0);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
