-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: P06_Messmate
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `area`
--
CREATE DATABASE P06_Messmate;
USE P06_Messmate;
DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area` (
  `area_id` int NOT NULL AUTO_INCREMENT,
  `area_name` varchar(100) NOT NULL,
  `city_id` int NOT NULL,
  PRIMARY KEY (`area_id`),
  UNIQUE KEY `area_id_UNIQUE` (`area_id`),
  KEY `city_id_idx` (`city_id`),
  CONSTRAINT `city_id` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES (1,'Shivaji Nagar',1),(2,'Kothrud',1),(3,'Gokhalenagar',1),(6,'Deccan',1);
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` enum('Veg','Non Veg','Jain') NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_id_UNIQUE` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Veg'),(2,'Non Veg'),(3,'Jain');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `city_id` int NOT NULL AUTO_INCREMENT,
  `city_name` varchar(45) NOT NULL,
  PRIMARY KEY (`city_id`),
  UNIQUE KEY `city_id_UNIQUE` (`city_id`),
  UNIQUE KEY `city_name_UNIQUE` (`city_name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Pune');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_visit_log`
--

DROP TABLE IF EXISTS `customer_visit_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_visit_log` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `subscription_id` int NOT NULL,
  `visit_date` date NOT NULL,
  `visit_status` enum('Visited','Unvisited') NOT NULL DEFAULT 'Unvisited',
  `meal_type` enum('Lunch','Dinner') NOT NULL,
  PRIMARY KEY (`log_id`),
  UNIQUE KEY `log_id_UNIQUE` (`log_id`),
  KEY `subscription_id_idx` (`subscription_id`),
  CONSTRAINT `log_subscription_id` FOREIGN KEY (`subscription_id`) REFERENCES `subscription` (`subscription_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_visit_log`
--

LOCK TABLES `customer_visit_log` WRITE;
/*!40000 ALTER TABLE `customer_visit_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_visit_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_item`
--

DROP TABLE IF EXISTS `food_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_item` (
  `food_item_id` int NOT NULL AUTO_INCREMENT,
  `sub_category_id` int NOT NULL,
  `food_name` varchar(45) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`food_item_id`),
  UNIQUE KEY `food_item_id_UNIQUE` (`food_item_id`),
  UNIQUE KEY `food_name_UNIQUE` (`food_name`),
  KEY `sub_category_id_idx` (`sub_category_id`),
  CONSTRAINT `fooditem_sub_category_id` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_category` (`sub_category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_item`
--

LOCK TABLES `food_item` WRITE;
/*!40000 ALTER TABLE `food_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `food_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_item_request`
--

DROP TABLE IF EXISTS `food_item_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_item_request` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `mess_id` int NOT NULL,
  `item_name` varchar(45) NOT NULL,
  `item_description` varchar(255) NOT NULL,
  `status` enum('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
  `sub_category_id` int NOT NULL,
  PRIMARY KEY (`request_id`),
  UNIQUE KEY `request_id_UNIQUE` (`request_id`),
  KEY `mess_id_idx` (`mess_id`),
  KEY `sub_category_id_idx` (`sub_category_id`),
  CONSTRAINT `request_mess_id` FOREIGN KEY (`mess_id`) REFERENCES `mess` (`mess_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `request_sub_category_id` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_category` (`sub_category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_item_request`
--

LOCK TABLES `food_item_request` WRITE;
/*!40000 ALTER TABLE `food_item_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `food_item_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meal_menu`
--

DROP TABLE IF EXISTS `meal_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meal_menu` (
  `menu_id` int NOT NULL AUTO_INCREMENT,
  `mess_id` int NOT NULL,
  `menu_date` date NOT NULL,
  `food_item_id` int NOT NULL,
  `menu_type` enum('Lunch','Dinner') NOT NULL,
  PRIMARY KEY (`menu_id`),
  UNIQUE KEY `menu_id_UNIQUE` (`menu_id`),
  KEY `mess_id_idx` (`mess_id`),
  KEY `food_id_idx` (`food_item_id`),
  CONSTRAINT `meal_food_item_id` FOREIGN KEY (`food_item_id`) REFERENCES `food_item` (`food_item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `meal_mess_id` FOREIGN KEY (`mess_id`) REFERENCES `mess` (`mess_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meal_menu`
--

LOCK TABLES `meal_menu` WRITE;
/*!40000 ALTER TABLE `meal_menu` DISABLE KEYS */;
/*!40000 ALTER TABLE `meal_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mealmenu_fooditem`
--

DROP TABLE IF EXISTS `mealmenu_fooditem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mealmenu_fooditem` (
  `mealmenu_fooditem_id` int NOT NULL AUTO_INCREMENT,
  `menu_id` int NOT NULL,
  `food_id` int NOT NULL,
  PRIMARY KEY (`mealmenu_fooditem_id`),
  UNIQUE KEY `mealmenu_fooditem_id_UNIQUE` (`mealmenu_fooditem_id`),
  KEY `menu_id_idx` (`menu_id`),
  KEY `food_id_idx` (`food_id`),
  CONSTRAINT `mealmenu_food_id` FOREIGN KEY (`food_id`) REFERENCES `food_item` (`food_item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mealmenu_menu_id` FOREIGN KEY (`menu_id`) REFERENCES `meal_menu` (`menu_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mealmenu_fooditem`
--

LOCK TABLES `mealmenu_fooditem` WRITE;
/*!40000 ALTER TABLE `mealmenu_fooditem` DISABLE KEYS */;
/*!40000 ALTER TABLE `mealmenu_fooditem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mess`
--

DROP TABLE IF EXISTS `mess`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mess` (
  `mess_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `mess_name` varchar(45) NOT NULL,
  `mess_address` varchar(100) NOT NULL,
  `mess_type` enum('Veg','NonVeg','Mixed','Jain') NOT NULL,
  `lunch_open_time` time NOT NULL,
  `lunch_close_time` time NOT NULL,
  `dinner_open_time` time NOT NULL,
  `dinner_close_time` time NOT NULL,
  `area_id` int NOT NULL,
  PRIMARY KEY (`mess_id`),
  UNIQUE KEY `mess_id_UNIQUE` (`mess_id`),
  KEY `user_id_idx` (`user_id`),
  KEY `area_id_idx` (`area_id`),
  CONSTRAINT `area_id` FOREIGN KEY (`area_id`) REFERENCES `area` (`area_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mess`
--

LOCK TABLES `mess` WRITE;
/*!40000 ALTER TABLE `mess` DISABLE KEYS */;
/*!40000 ALTER TABLE `mess` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mess_photo`
--

DROP TABLE IF EXISTS `mess_photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mess_photo` (
  `photo_id` int NOT NULL AUTO_INCREMENT,
  `mess_id` int NOT NULL,
  `photo_url` varchar(255) NOT NULL,
  PRIMARY KEY (`photo_id`),
  UNIQUE KEY `photo_id_UNIQUE` (`photo_id`),
  KEY `mess_id_idx` (`mess_id`),
  CONSTRAINT `photo_mess_id` FOREIGN KEY (`mess_id`) REFERENCES `mess` (`mess_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mess_photo`
--

LOCK TABLES `mess_photo` WRITE;
/*!40000 ALTER TABLE `mess_photo` DISABLE KEYS */;
/*!40000 ALTER TABLE `mess_photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monthly_plan`
--

DROP TABLE IF EXISTS `monthly_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `monthly_plan` (
  `plan_id` int NOT NULL AUTO_INCREMENT,
  `mess_id` int NOT NULL,
  `plan_name` varchar(45) DEFAULT NULL,
  `monthly_price` decimal(10,2) NOT NULL,
  `meal_inclusion` enum('Lunch','Dinner','Both') NOT NULL,
  `validity_period` int NOT NULL,
  PRIMARY KEY (`plan_id`),
  UNIQUE KEY `plan_id_UNIQUE` (`plan_id`),
  KEY `mess_id_idx` (`mess_id`),
  CONSTRAINT `plan_mess_id` FOREIGN KEY (`mess_id`) REFERENCES `mess` (`mess_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monthly_plan`
--

LOCK TABLES `monthly_plan` WRITE;
/*!40000 ALTER TABLE `monthly_plan` DISABLE KEYS */;
/*!40000 ALTER TABLE `monthly_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `rating_id` int NOT NULL AUTO_INCREMENT,
  `mess_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` int NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`rating_id`),
  UNIQUE KEY `rating_id_UNIQUE` (`rating_id`),
  KEY `user_id_idx` (`user_id`),
  KEY `mess_id_idx` (`mess_id`),
  CONSTRAINT `ratings_mess_id` FOREIGN KEY (`mess_id`) REFERENCES `mess` (`mess_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_rating` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` enum('ADMIN','CUSTOMER','MESSOWNER') NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_id_UNIQUE` (`role_id`),
  UNIQUE KEY `role_name_UNIQUE` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ADMIN'),(3,'CUSTOMER'),(2,'MESSOWNER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `security_question`
--

DROP TABLE IF EXISTS `security_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `security_question` (
  `question_id` int NOT NULL AUTO_INCREMENT,
  `question_text` varchar(255) NOT NULL,
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `security_question`
--

LOCK TABLES `security_question` WRITE;
/*!40000 ALTER TABLE `security_question` DISABLE KEYS */;
INSERT INTO `security_question` VALUES (1,'What is your favorite food?'),(2,'What is your favorite color?'),(3,'What is your favorite movie?');
/*!40000 ALTER TABLE `security_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_category`
--

DROP TABLE IF EXISTS `sub_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_category` (
  `sub_category_id` int NOT NULL AUTO_INCREMENT,
  `sub_category_name` varchar(45) NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`sub_category_id`),
  UNIQUE KEY `sub_category_id_UNIQUE` (`sub_category_id`),
  KEY `category_id_idx` (`category_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_category`
--

LOCK TABLES `sub_category` WRITE;
/*!40000 ALTER TABLE `sub_category` DISABLE KEYS */;
INSERT INTO `sub_category` VALUES (1,'Starters (Veg)',1),(2,'Main Course (Veg)',1),(3,'Desserts (Veg)',1),(4,'Starters (Non-Veg)',2),(5,'Main Course (Non-Veg)',2),(6,'Seafood',2),(7,'Starters (Jain)',3),(8,'Main Course (Jain)',3),(9,'Desserts (Jain)',3);
/*!40000 ALTER TABLE `sub_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription`
--

DROP TABLE IF EXISTS `subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription` (
  `subscription_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `plan_id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('Active','Expired','Cancel') NOT NULL,
  PRIMARY KEY (`subscription_id`),
  UNIQUE KEY `subscription_id_UNIQUE` (`subscription_id`),
  KEY `plan_id_idx` (`plan_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `subscription_plan_id` FOREIGN KEY (`plan_id`) REFERENCES `monthly_plan` (`plan_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `subscription_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription`
--

LOCK TABLES `subscription` WRITE;
/*!40000 ALTER TABLE `subscription` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `full_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `address` varchar(100) NOT NULL,
  `role_id` int NOT NULL,
  `question_id` int NOT NULL,
  `question_answer` varchar(100) NOT NULL,
  `area_id` int NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `userid_UNIQUE` (`userid`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`),
  UNIQUE KEY `password_UNIQUE` (`password`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_UNIQUE` (`phone`),
  KEY `role_id_idx` (`role_id`),
  KEY `question_id_idx` (`question_id`),
  KEY `area_id_idx` (`area_id`),
  CONSTRAINT `question_id` FOREIGN KEY (`question_id`) REFERENCES `security_question` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_area_id` FOREIGN KEY (`area_id`) REFERENCES `area` (`area_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'sanika123','123','Sanika Patil','sanikapatil9657@gmail.com','9209016602','Shree Samarth PG',1,1,'Biryani',3);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-21  8:56:41
