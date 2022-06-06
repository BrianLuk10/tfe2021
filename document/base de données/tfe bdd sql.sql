-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 28 mai 2022 à 18:38
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `test`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie_produits`
--

DROP TABLE IF EXISTS `categorie_produits`;
CREATE TABLE IF NOT EXISTS `categorie_produits` (
  `id_categorie` int(11) NOT NULL AUTO_INCREMENT,
  `nom_categorie` varchar(50) NOT NULL,
  PRIMARY KEY (`id_categorie`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categorie_produits`
--

INSERT INTO `categorie_produits` (`id_categorie`, `nom_categorie`) VALUES
(1, 'fleur'),
(2, 'consommable'),
(3, 'décoration');

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

DROP TABLE IF EXISTS `commandes`;
CREATE TABLE IF NOT EXISTS `commandes` (
  `id_commandes` int(255) NOT NULL AUTO_INCREMENT,
  `date_commandes` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_etat` int(11) NOT NULL,
  PRIMARY KEY (`id_commandes`),
  KEY `id_etat` (`id_etat`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commandes`
--

INSERT INTO `commandes` (`id_commandes`, `date_commandes`, `id_etat`) VALUES
(1, '2022-04-28 15:19:57', 1),
(2, '2022-04-29 13:51:35', 3),
(3, '2022-04-29 13:51:09', 3),
(4, '2022-04-29 13:51:09', 3),
(5, '2022-04-28 15:19:57', 1),
(6, '2022-04-28 15:19:57', 1),
(7, '2022-04-28 15:19:57', 1),
(8, '2022-04-29 13:49:25', 2),
(9, '2022-04-28 15:19:57', 1),
(10, '2022-04-28 15:19:57', 1),
(11, '2022-04-28 15:19:57', 1),
(12, '2022-04-28 15:19:57', 1),
(13, '2022-04-28 15:19:57', 1),
(14, '2022-04-28 15:19:57', 1),
(15, '2022-04-28 15:19:57', 1),
(16, '2022-04-28 15:19:57', 1),
(17, '2022-04-29 13:49:25', 3),
(18, '2022-04-29 15:59:37', 1),
(19, '2022-04-29 13:49:25', 2),
(20, '2022-04-28 15:19:57', 1),
(21, '2022-04-28 15:19:57', 1),
(22, '2022-04-28 15:19:57', 1),
(23, '2022-04-28 15:19:57', 1),
(24, '2022-04-29 13:49:25', 2),
(25, '2022-04-28 15:19:57', 1),
(26, '2022-04-28 15:19:57', 1),
(27, '2022-04-28 15:19:57', 1),
(28, '2022-04-28 15:19:57', 1),
(29, '2022-04-28 15:19:57', 1),
(30, '2022-04-28 15:19:57', 1),
(31, '2022-04-28 15:19:57', 1),
(32, '2022-04-28 15:19:57', 1),
(33, '2022-04-28 15:19:57', 1),
(34, '2022-04-28 15:19:57', 1),
(35, '2022-04-28 15:19:57', 1),
(36, '2022-04-29 15:35:13', 1),
(37, '2022-04-29 15:35:50', 1),
(38, '2022-04-29 15:37:07', 1),
(39, '2022-04-29 15:37:21', 1),
(40, '2022-04-29 15:40:21', 1),
(41, '2022-04-29 15:40:44', 3),
(42, '2022-04-29 15:51:14', 1),
(43, '2022-04-29 15:51:33', 1),
(44, '2022-04-29 15:57:41', 1),
(45, '2022-04-29 16:17:03', 1),
(46, '2022-04-29 16:53:30', 3),
(47, '2022-04-29 17:49:33', 2),
(48, '2022-05-03 18:19:02', 1),
(49, '2022-05-06 16:44:39', 1),
(50, '2022-05-06 17:37:09', 1),
(51, '2022-05-06 17:37:21', 3),
(52, '2022-05-15 16:11:46', 1),
(53, '2022-05-17 15:37:12', 1),
(54, '2022-05-17 15:37:14', 1),
(55, '2022-05-17 15:41:46', 1),
(56, '2022-05-17 15:42:13', 1),
(57, '2022-05-17 16:00:42', 1),
(58, '2022-05-19 21:34:58', 1),
(59, '2022-05-19 21:55:16', 1),
(60, '2022-05-20 14:02:53', 1),
(61, '2022-05-22 18:08:45', 1),
(62, '2022-05-22 18:09:28', 1),
(63, '2022-05-27 23:36:30', 1);

-- --------------------------------------------------------

--
-- Structure de la table `commande_produit`
--

DROP TABLE IF EXISTS `commande_produit`;
CREATE TABLE IF NOT EXISTS `commande_produit` (
  `id_commandes` int(255) NOT NULL,
  `id_produits` int(255) NOT NULL,
  `nombre` int(11) NOT NULL,
  KEY `id_commandes` (`id_commandes`,`id_produits`),
  KEY `id_produits` (`id_produits`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commande_produit`
--

INSERT INTO `commande_produit` (`id_commandes`, `id_produits`, `nombre`) VALUES
(2, 4, 9),
(2, 4, 5),
(5, 2, 4),
(6, 3, 3),
(16, 1, 1),
(16, 2, 1),
(16, 3, 1),
(17, 7, 1),
(18, 1, 1),
(19, 1, 1),
(19, 2, 1),
(19, 3, 1),
(21, 7, 1),
(22, 7, 1),
(23, 1, 1),
(24, 7, 1),
(25, 7, 1),
(26, 7, 1),
(28, 1, 10),
(29, 4, 1),
(1, 1, 0),
(29, 1, 0),
(30, 4, 1),
(31, 3, 1),
(32, 1, 2),
(32, 1, 3),
(33, 1, 1),
(35, 3, 3),
(35, 83, 6),
(36, 1, 1),
(36, 2, 1),
(36, 3, 1),
(37, 1, 2),
(37, 2, 1),
(38, 1, 1),
(39, 1, 1),
(40, 1, 1),
(41, 2, 1),
(45, 1, 10),
(46, 1, 10),
(47, 1, 1),
(48, 1, 2),
(48, 2, 1),
(49, 2, 2),
(51, 1, 1),
(51, 2, 1),
(51, 79, 1),
(51, 80, 1),
(52, 7, 10),
(57, 2, 2),
(58, 1, 3),
(58, 2, 4),
(58, 80, 5),
(60, 84, 10),
(60, 85, 4),
(62, 84, 3),
(62, 85, 3),
(63, 1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `etat_commandes`
--

DROP TABLE IF EXISTS `etat_commandes`;
CREATE TABLE IF NOT EXISTS `etat_commandes` (
  `id_etat` int(11) NOT NULL AUTO_INCREMENT,
  `nom_etat` varchar(50) NOT NULL,
  PRIMARY KEY (`id_etat`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `etat_commandes`
--

INSERT INTO `etat_commandes` (`id_etat`, `nom_etat`) VALUES
(1, 'vente'),
(2, 'réservation'),
(3, 'annulé');

-- --------------------------------------------------------

--
-- Structure de la table `fournissements`
--

DROP TABLE IF EXISTS `fournissements`;
CREATE TABLE IF NOT EXISTS `fournissements` (
  `id_fournissement` int(255) NOT NULL AUTO_INCREMENT,
  `id_produits` int(255) NOT NULL,
  `stock_produits` int(20) NOT NULL DEFAULT '0',
  `date_fournissement` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `exp_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_fournissement`),
  KEY `fk_foreign_fournissements_produits` (`id_produits`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `fournissements`
--

INSERT INTO `fournissements` (`id_fournissement`, `id_produits`, `stock_produits`, `date_fournissement`, `exp_date`) VALUES
(2, 1, 24, '2022-02-14 14:54:02', NULL),
(3, 6, 0, '2022-02-14 13:06:48', NULL),
(4, 5, 0, '2022-02-14 13:06:48', NULL),
(5, 7, 0, '2022-01-12 12:05:50', NULL),
(6, 3, 4, '2022-01-12 12:05:50', NULL),
(7, 4, 9, '2022-01-12 12:06:03', NULL),
(8, 2, 30, '2022-01-12 12:09:08', NULL),
(9, 7, 2, '2022-01-28 18:23:57', NULL),
(11, 36, 3, '2022-02-28 12:20:48', NULL),
(27, 52, 0, '2022-02-28 12:20:48', NULL),
(28, 53, 0, '2022-02-28 12:20:48', NULL),
(29, 54, 0, '2022-02-28 12:20:48', NULL),
(30, 55, 0, '2022-02-28 12:20:48', NULL),
(31, 56, 0, '2022-02-28 12:20:48', NULL),
(32, 57, 0, '2022-02-28 12:20:48', NULL),
(33, 58, 0, '2022-02-28 12:20:48', NULL),
(34, 59, 0, '2022-02-28 12:20:48', NULL),
(36, 61, 0, '2022-02-28 13:31:28', NULL),
(37, 62, 0, '2022-02-28 13:33:03', NULL),
(38, 66, 0, '2022-03-03 14:56:59', NULL),
(39, 70, 0, '2022-03-03 15:41:23', NULL),
(40, 72, 21, '2022-03-11 14:25:55', NULL),
(41, 73, 0, '2022-03-17 14:20:38', NULL),
(42, 74, 0, '2022-03-17 14:22:39', NULL),
(43, 75, 0, '2022-03-17 14:43:45', NULL),
(44, 77, 0, '2022-03-18 12:54:44', NULL),
(45, 79, 26, '2022-04-10 18:58:23', NULL),
(46, 80, 24, '2022-04-10 18:58:23', NULL),
(47, 81, 12, '2022-04-10 18:58:23', NULL),
(48, 82, 30, '2022-04-10 18:58:23', NULL),
(49, 83, 6, '2022-04-10 18:58:23', NULL),
(50, 84, 27, '2022-04-10 19:35:46', NULL),
(51, 85, 20, '2022-04-10 19:35:46', NULL),
(52, 86, 30, '2022-04-10 19:35:46', NULL),
(53, 87, 60, '2022-04-10 19:35:46', NULL),
(54, 88, 12, '2022-04-10 19:35:46', NULL),
(55, 89, 20, '2022-04-10 19:35:46', NULL),
(56, 90, 0, '2022-04-11 11:55:43', NULL),
(57, 12347, 0, '2022-04-29 13:21:55', NULL),
(58, 12348, 0, '2022-04-29 14:34:36', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `historique_produits`
--

DROP TABLE IF EXISTS `historique_produits`;
CREATE TABLE IF NOT EXISTS `historique_produits` (
  `id_historique` int(255) NOT NULL AUTO_INCREMENT,
  `id_produits` int(255) NOT NULL,
  `nom_produits` varchar(50) NOT NULL,
  `image_produits` text,
  `prix_produits` decimal(11,2) NOT NULL DEFAULT '0.00',
  `id_categorie` int(11) NOT NULL,
  `id_statut` int(11) NOT NULL,
  `date_modification` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_historique`),
  KEY `id_statut` (`id_statut`),
  KEY `id_categorie` (`id_categorie`)
) ENGINE=InnoDB AUTO_INCREMENT=170 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `historique_produits`
--

INSERT INTO `historique_produits` (`id_historique`, `id_produits`, `nom_produits`, `image_produits`, `prix_produits`, `id_categorie`, `id_statut`, `date_modification`) VALUES
(17, 7, 'gnome en velour', 'https://scontent-bru2-1.xx.fbcdn.net/v/t39.30808-6/265195628_325092502768191_9222212270407144771_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=730e14&_nc_ohc=8rlEY8G4wpIAX8zU3Eb&_nc_oc=AQmv9XmJw6zEqmBlwE6HJ9cA6dhDKrHGuIOxnwHyau22FIsZqknN1NNodMhCiNPLIvk&_nc_ht=scontent-bru2-1.xx&oh=00_AT9zB9l4QUaRMwMBr03rIpqtdeaGTmbYu4L2vQESDK9_JQ&oe=61F5C140', '11.00', 1, 1, '2022-03-07 18:28:40'),
(18, 7, 'gnome en velour', 'https://scontent-bru2-1.xx.fbcdn.net/v/t39.30808-6/265195628_325092502768191_9222212270407144771_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=730e14&_nc_ohc=8rlEY8G4wpIAX8zU3Eb&_nc_oc=AQmv9XmJw6zEqmBlwE6HJ9cA6dhDKrHGuIOxnwHyau22FIsZqknN1NNodMhCiNPLIvk&_nc_ht=scontent-bru2-1.xx&oh=00_AT9zB9l4QUaRMwMBr03rIpqtdeaGTmbYu4L2vQESDK9_JQ&oe=61F5C140', '11.00', 1, 1, '2022-03-07 18:28:42'),
(20, 71, 'produit a supprimé', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '15.00', 1, 1, '2022-03-11 16:28:41'),
(49, 7, 'gnome en velour', 'https://cdn.shopify.com/s/files/1/0872/4784/products/velour_gnome_large.jpg?v=1603917873', '11.00', 3, 1, '2022-03-17 17:46:55'),
(51, 76, 'a supprimer 18-03', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 1, '2022-03-18 14:34:49'),
(55, 78, 'bouquet de Mari', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/273829952_361806995763408_5826825581058271527_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=u9dyD8BZ8IwAX-HEapR&_nc_ht=scontent.fbru5-1.fna&oh=00_AT8tE1TsgJ97Z5v3bFq2kO7Wb-pm0boKLfzR0iQSEhetSg&oe=625773BC', '45.00', 1, 1, '2022-04-10 23:00:12'),
(56, 79, 'bouquet de Mari', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/273829952_361806995763408_5826825581058271527_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=u9dyD8BZ8IwAX-HEapR&_nc_ht=scontent.fbru5-1.fna&oh=00_AT8tE1TsgJ97Z5v3bFq2kO7Wb-pm0boKLfzR0iQSEhetSg&oe=625773BC', '50.00', 1, 1, '2022-04-10 23:00:57'),
(57, 80, 'ferrero rocher 30 pièces', 'https://www.google.com/aclk?sa=l&ai=DChcSEwjg5K_Ksor3AhUap3cKHdxnBf4YABABGgJlZg&sig=AOD64_1QWzD16cgUp1-NRWcRMesILkHCrA&adurl&ctype=5&ved=2ahUKEwjR1J_Ksor3AhWMtKQKHYQCBeIQvhd6BAgBEEs', '11.20', 2, 1, '2022-04-10 23:04:32'),
(58, 80, 'ferrero rocher 30 pièces', 'https://media.s-bol.com/gLnD1PkDPxJZ/550x326.jpg', '11.20', 2, 1, '2022-04-10 23:04:32'),
(59, 1, 'rose rouge ', 'https://cdn.sessile.fr/wp-content/uploads/2022/02/sessile-rose-rouge.jpg', '3.00', 1, 1, '2022-03-31 01:09:34'),
(60, 81, 'bouquet d\'Elise', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/273926604_361807095763398_1995105477705035963_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=uQlfWUXq1EUAX_zNSul&_nc_ht=scontent.fbru5-1.fna&oh=00_AT82uZ_0IGgbQIKHFTrUnR6Igacz-rTfUwRJfitTpYM2Pw&oe=62587646', '40.00', 1, 1, '2022-04-10 23:07:09'),
(61, 82, 'bouquet de Manon', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/273767683_361807029096738_4749098993769117436_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=VynXZY-jaagAX_Rdx7d&_nc_ht=scontent.fbru5-1.fna&oh=00_AT9d-z5HX6DtGrrqxEoOJhaKnE-7K1nieaPt4pl9wWfG1w&oe=62580F3C', '26.00', 1, 1, '2022-04-10 23:07:56'),
(62, 83, 'bouquet d\'Alice', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/273825682_361807072430067_441327396181729827_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=_8yAJBudMAEAX8oqtXk&_nc_ht=scontent.fbru5-1.fna&oh=00_AT9XLUIgLZ8aGGaZo0zD91RKlrb7-bDwYyLxqNuXrvnn8w&oe=62575288', '32.00', 1, 1, '2022-04-10 23:08:32'),
(63, 4, 'bouquet luxuriant', 'https://cdn.shopify.com/s/files/1/0381/3556/2371/products/Abondant2_600x.jpg?v=1601273409', '65.00', 1, 1, '2022-04-11 00:22:13'),
(64, 4, 'bouquet luxuriant', 'https://cdn.shopify.com/s/files/1/0381/3556/2371/products/Abondant2_600x.jpg?v=1601273409', '65.00', 1, 1, '2022-04-10 23:26:26'),
(65, 1, 'rose rouge ', 'https://cdn.sessile.fr/wp-content/uploads/2022/02/sessile-rose-rouge.jpg', '3.00', 1, 1, '2022-04-11 00:30:19'),
(66, 1, 'rose rouge ', 'https://cdn.sessile.fr/wp-content/uploads/2022/02/sessile-rose-rouge.jpg', '3.00', 1, 1, '2022-04-10 23:31:30'),
(67, 74, 'a supprimer', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 1, '2022-04-10 23:33:30'),
(68, 74, 'a supprimer', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 1, '2022-04-11 00:33:39'),
(69, 84, 'renne de noel petit', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/264852525_325013406109434_4977723286730145548_n.jpg?stp=dst-jpg_p526x296&_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_ohc=6S6l6EkT-wMAX9DQwb_&_nc_ht=scontent.fbru5-1.fna&oh=00_AT_lWOUkYk9Gw7TIuKIeMXLPKDt-lG-XyoOdxPpX_tbLvA&oe=6258D075', '10.90', 3, 1, '2022-04-10 23:37:54'),
(70, 85, 'renne de noel grand', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/264852525_325013406109434_4977723286730145548_n.jpg?stp=dst-jpg_p526x296&_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_ohc=6S6l6EkT-wMAX9DQwb_&_nc_ht=scontent.fbru5-1.fna&oh=00_AT_lWOUkYk9Gw7TIuKIeMXLPKDt-lG-XyoOdxPpX_tbLvA&oe=6258D075', '14.90', 3, 1, '2022-04-10 23:38:09'),
(72, 85, 'renne de noel grand', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/264852525_325013406109434_4977723286730145548_n.jpg?stp=dst-jpg_p526x296&_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_ohc=6S6l6EkT-wMAX9DQwb_&_nc_ht=scontent.fbru5-1.fna&oh=00_AT_lWOUkYk9Gw7TIuKIeMXLPKDt-lG-XyoOdxPpX_tbLvA&oe=6258D075', '14.90', 3, 1, '2022-04-11 00:38:28'),
(73, 86, 'grand bouquet de chrysanthème', 'https://www.florazup.com/230-home_default/bouquet-chrysantheme-blanc.jpg', '25.00', 1, 1, '2022-04-10 23:42:29'),
(74, 87, 'petit bouquet de chrysanthème', 'https://www.floristik24.be/media/images/popup/Chrysantheme-28cm-dunkelorange-6St-87551.jpg', '18.00', 1, 1, '2022-04-10 23:43:11'),
(75, 86, 'grand bouquet de chrysanthème', 'https://www.florazup.com/230-home_default/bouquet-chrysantheme-blanc.jpg', '6.90', 1, 1, '2022-04-11 00:44:30'),
(76, 87, 'petit bouquet de chrysanthème', 'https://www.floristik24.be/media/images/popup/Chrysantheme-28cm-dunkelorange-6St-87551.jpg', '2.65', 1, 1, '2022-04-11 00:44:51'),
(77, 88, 'bouquet funéraire', 'https://cdn.fleurop.be/3fa43d3b-ff83-484a-ad24-3004a9793ef0/-/resize/600/', '38.00', 1, 1, '2022-04-10 23:46:18'),
(78, 89, 'chocolat mon cheri', 'https://www.kruidvat.be/medias/prd-front-4942092-1-600x600?context=bWFzdGVyfHByZC1pbWFnZXN8NjA1MjV8aW1hZ2UvanBlZ3xoOTEvaDY3LzEyMjk0NzQ3ODgxNTAyL3ByZC1mcm9udC00OTQyMDkyLTFfNjAweDYwMHwwOWQwOWVmYjc4YTJkNzJjZDJlMGJkZDAzMTVlZTIyMTBkNDk2YjE4MmM2Y2Q5MjdjOGY5ZGJhNWFiOTdlYWU0', '4.65', 1, 1, '2022-04-10 23:47:46'),
(80, 1, 'rose rouge petite', 'https://cdn.sessile.fr/wp-content/uploads/2022/02/sessile-rose-rouge.jpg', '3.00', 1, 1, '2022-04-11 17:00:01'),
(81, 1, 'rose rouge petite', 'https://cdn.sessile.fr/wp-content/uploads/2022/02/sessile-rose-rouge.jpg', '3.00', 1, 1, '2022-04-11 16:00:23'),
(82, 90, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 1, '2022-04-11 16:00:41'),
(83, 90, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 1, '2022-04-11 17:01:06'),
(84, 83, 'bouquet d\'Alice', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/273825682_361807072430067_441327396181729827_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=_8yAJBudMAEAX8oqtXk&_nc_ht=scontent.fbru5-1.fna&oh=00_AT9XLUIgLZ8aGGaZo0zD91RKlrb7-bDwYyLxqNuXrvnn8w&oe=62575288', '32.00', 1, 1, '2022-04-11 17:01:47'),
(85, 80, 'ferrero rocher 30 pièces', 'https://media.s-bol.com/gLnD1PkDPxJZ/550x326.jpg', '9.60', 2, 1, '2022-04-15 18:23:43'),
(86, 1, 'rose rouge petite', 'https://cdn.sessile.fr/wp-content/uploads/2022/02/sessile-rose-rouge.jpg', '3.00', 1, 1, '2022-04-11 16:00:23'),
(87, 2, 'bouquet rose rouge 25', 'https://www.max-le-fleuriste.fr/297-large_default/bouquet-de-roses-rouges.jpg', '90.00', 1, 1, '2022-03-17 17:42:51'),
(88, 3, 'bouquet élégant', 'https://cdn.shopify.com/s/files/1/0381/3556/2371/products/Elegant_3f2ae25e-d74d-408d-825d-691d3baae09f_600x.jpg?v=1601273408', '50.00', 1, 1, '2022-03-11 17:27:43'),
(89, 4, 'bouquet luxuriant', 'https://cdn.shopify.com/s/files/1/0381/3556/2371/products/Abondant2_600x.jpg?v=1601273409', '65.00', 1, 1, '2022-04-10 23:26:26'),
(90, 5, 'plante de terrasse 25cm', 'https://cdn.fleurop.be/ddf3bb5d-fabc-42db-98c2-52720a424303/-/resize/600/-/format/webp/', '50.00', 1, 1, '2022-02-28 04:24:46'),
(91, 6, 'plante de terrasse 30cm', 'https://cdn.fleurop.be/ddf3bb5d-fabc-42db-98c2-52720a424303/-/resize/600/-/format/webp/', '75.00', 1, 1, '2022-02-28 14:24:46'),
(92, 7, 'gnome en velour', 'https://cdn.shopify.com/s/files/1/0872/4784/products/velour_gnome_large.jpg?v=1603917873', '11.00', 1, 1, '2022-03-17 17:46:55'),
(93, 73, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 1, '2022-03-17 17:21:34'),
(94, 74, 'a supprimer', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 1, '2022-04-11 00:33:39'),
(95, 75, 'a supprimer 2', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 1, '2022-03-17 17:45:57'),
(96, 79, 'bouquet de Mari', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/273829952_361806995763408_5826825581058271527_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=u9dyD8BZ8IwAX-HEapR&_nc_ht=scontent.fbru5-1.fna&oh=00_AT8tE1TsgJ97Z5v3bFq2kO7Wb-pm0boKLfzR0iQSEhetSg&oe=625773BC', '50.00', 1, 1, '2022-04-10 23:00:57'),
(97, 80, 'ferrero rocher 30 pièces', 'https://media.s-bol.com/gLnD1PkDPxJZ/550x326.jpg', '9.60', 1, 1, '2022-04-15 18:23:43'),
(98, 81, 'bouquet d\'Elise', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/273926604_361807095763398_1995105477705035963_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=uQlfWUXq1EUAX_zNSul&_nc_ht=scontent.fbru5-1.fna&oh=00_AT82uZ_0IGgbQIKHFTrUnR6Igacz-rTfUwRJfitTpYM2Pw&oe=62587646', '40.00', 1, 1, '2022-04-10 23:07:09'),
(99, 82, 'bouquet de Manon', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/273767683_361807029096738_4749098993769117436_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=VynXZY-jaagAX_Rdx7d&_nc_ht=scontent.fbru5-1.fna&oh=00_AT9d-z5HX6DtGrrqxEoOJhaKnE-7K1nieaPt4pl9wWfG1w&oe=62580F3C', '26.00', 1, 1, '2022-04-10 23:07:56'),
(100, 83, 'bouquet d\'Alice', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/273825682_361807072430067_441327396181729827_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=_8yAJBudMAEAX8oqtXk&_nc_ht=scontent.fbru5-1.fna&oh=00_AT9XLUIgLZ8aGGaZo0zD91RKlrb7-bDwYyLxqNuXrvnn8w&oe=62575288', '32.00', 1, 1, '2022-04-11 17:01:47'),
(101, 84, 'renne de noel petit', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/264852525_325013406109434_4977723286730145548_n.jpg?stp=dst-jpg_p526x296&_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_ohc=6S6l6EkT-wMAX9DQwb_&_nc_ht=scontent.fbru5-1.fna&oh=00_AT_lWOUkYk9Gw7TIuKIeMXLPKDt-lG-XyoOdxPpX_tbLvA&oe=6258D075', '10.90', 1, 1, '2022-04-11 00:38:24'),
(102, 85, 'renne de noel grand', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/264852525_325013406109434_4977723286730145548_n.jpg?stp=dst-jpg_p526x296&_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_ohc=6S6l6EkT-wMAX9DQwb_&_nc_ht=scontent.fbru5-1.fna&oh=00_AT_lWOUkYk9Gw7TIuKIeMXLPKDt-lG-XyoOdxPpX_tbLvA&oe=6258D075', '14.90', 1, 1, '2022-04-11 00:38:28'),
(103, 86, 'grand bouquet de chrysanthème', 'https://www.florazup.com/230-home_default/bouquet-chrysantheme-blanc.jpg', '6.90', 1, 1, '2022-04-11 00:44:30'),
(104, 87, 'petit bouquet de chrysanthème', 'https://www.floristik24.be/media/images/popup/Chrysantheme-28cm-dunkelorange-6St-87551.jpg', '2.65', 1, 1, '2022-04-11 00:44:51'),
(105, 88, 'bouquet funéraire', 'https://cdn.fleurop.be/3fa43d3b-ff83-484a-ad24-3004a9793ef0/-/resize/600/', '38.00', 1, 1, '2022-04-10 23:46:18'),
(106, 89, 'chocolat mon cheri', 'https://www.kruidvat.be/medias/prd-front-4942092-1-600x600?context=bWFzdGVyfHByZC1pbWFnZXN8NjA1MjV8aW1hZ2UvanBlZ3xoOTEvaDY3LzEyMjk0NzQ3ODgxNTAyL3ByZC1mcm9udC00OTQyMDkyLTFfNjAweDYwMHwwOWQwOWVmYjc4YTJkNzJjZDJlMGJkZDAzMTVlZTIyMTBkNDk2YjE4MmM2Y2Q5MjdjOGY5ZGJhNWFiOTdlYWU0', '4.65', 1, 1, '2022-04-10 23:47:46'),
(107, 90, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 1, '2022-04-11 17:01:06'),
(108, 1, 'rose rouge petite', 'https://cdn.sessile.fr/wp-content/uploads/2022/02/sessile-rose-rouge.jpg', '3.00', 1, 1, '2022-04-11 16:00:23'),
(109, 2, 'bouquet rose rouge 25', 'https://www.max-le-fleuriste.fr/297-large_default/bouquet-de-roses-rouges.jpg', '90.00', 1, 1, '2022-03-17 17:42:51'),
(110, 3, 'bouquet élégant', 'https://cdn.shopify.com/s/files/1/0381/3556/2371/products/Elegant_3f2ae25e-d74d-408d-825d-691d3baae09f_600x.jpg?v=1601273408', '50.00', 1, 1, '2022-03-11 17:27:43'),
(111, 4, 'bouquet luxuriant', 'https://cdn.shopify.com/s/files/1/0381/3556/2371/products/Abondant2_600x.jpg?v=1601273409', '65.00', 1, 1, '2022-04-10 23:26:26'),
(112, 5, 'plante de terrasse 25cm', 'https://cdn.fleurop.be/ddf3bb5d-fabc-42db-98c2-52720a424303/-/resize/600/-/format/webp/', '50.00', 1, 1, '2022-02-28 04:24:46'),
(113, 6, 'plante de terrasse 30cm', 'https://cdn.fleurop.be/ddf3bb5d-fabc-42db-98c2-52720a424303/-/resize/600/-/format/webp/', '75.00', 1, 1, '2022-02-28 14:24:46'),
(114, 7, 'gnome en velour', 'https://cdn.shopify.com/s/files/1/0872/4784/products/velour_gnome_large.jpg?v=1603917873', '11.00', 1, 1, '2022-03-17 17:46:55'),
(115, 73, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 1, '2022-03-17 17:21:34'),
(116, 74, 'a supprimer', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 1, '2022-04-11 00:33:39'),
(117, 75, 'a supprimer 2', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 1, '2022-03-17 17:45:57'),
(118, 79, 'bouquet de Mari', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/273829952_361806995763408_5826825581058271527_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=u9dyD8BZ8IwAX-HEapR&_nc_ht=scontent.fbru5-1.fna&oh=00_AT8tE1TsgJ97Z5v3bFq2kO7Wb-pm0boKLfzR0iQSEhetSg&oe=625773BC', '50.00', 1, 1, '2022-04-10 23:00:57'),
(119, 80, 'ferrero rocher 30 pièces', 'https://media.s-bol.com/gLnD1PkDPxJZ/550x326.jpg', '9.60', 2, 1, '2022-04-15 18:23:43'),
(120, 81, 'bouquet d\'Elise', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/273926604_361807095763398_1995105477705035963_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=uQlfWUXq1EUAX_zNSul&_nc_ht=scontent.fbru5-1.fna&oh=00_AT82uZ_0IGgbQIKHFTrUnR6Igacz-rTfUwRJfitTpYM2Pw&oe=62587646', '40.00', 1, 1, '2022-04-10 23:07:09'),
(121, 82, 'bouquet de Manon', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/273767683_361807029096738_4749098993769117436_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=VynXZY-jaagAX_Rdx7d&_nc_ht=scontent.fbru5-1.fna&oh=00_AT9d-z5HX6DtGrrqxEoOJhaKnE-7K1nieaPt4pl9wWfG1w&oe=62580F3C', '26.00', 1, 1, '2022-04-10 23:07:56'),
(122, 83, 'bouquet d\'Alice', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/273825682_361807072430067_441327396181729827_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=_8yAJBudMAEAX8oqtXk&_nc_ht=scontent.fbru5-1.fna&oh=00_AT9XLUIgLZ8aGGaZo0zD91RKlrb7-bDwYyLxqNuXrvnn8w&oe=62575288', '32.00', 1, 1, '2022-04-11 17:01:47'),
(123, 84, 'renne de noel petit', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/264852525_325013406109434_4977723286730145548_n.jpg?stp=dst-jpg_p526x296&_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_ohc=6S6l6EkT-wMAX9DQwb_&_nc_ht=scontent.fbru5-1.fna&oh=00_AT_lWOUkYk9Gw7TIuKIeMXLPKDt-lG-XyoOdxPpX_tbLvA&oe=6258D075', '10.90', 1, 1, '2022-04-11 00:38:24'),
(124, 85, 'renne de noel grand', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/264852525_325013406109434_4977723286730145548_n.jpg?stp=dst-jpg_p526x296&_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_ohc=6S6l6EkT-wMAX9DQwb_&_nc_ht=scontent.fbru5-1.fna&oh=00_AT_lWOUkYk9Gw7TIuKIeMXLPKDt-lG-XyoOdxPpX_tbLvA&oe=6258D075', '14.90', 1, 1, '2022-04-11 00:38:28'),
(125, 86, 'grand bouquet de chrysanthème', 'https://www.florazup.com/230-home_default/bouquet-chrysantheme-blanc.jpg', '6.90', 1, 1, '2022-04-11 00:44:30'),
(126, 87, 'petit bouquet de chrysanthème', 'https://www.floristik24.be/media/images/popup/Chrysantheme-28cm-dunkelorange-6St-87551.jpg', '2.65', 1, 1, '2022-04-11 00:44:51'),
(127, 88, 'bouquet funéraire', 'https://cdn.fleurop.be/3fa43d3b-ff83-484a-ad24-3004a9793ef0/-/resize/600/', '38.00', 1, 1, '2022-04-10 23:46:18'),
(128, 89, 'chocolat mon cheri', 'https://www.kruidvat.be/medias/prd-front-4942092-1-600x600?context=bWFzdGVyfHByZC1pbWFnZXN8NjA1MjV8aW1hZ2UvanBlZ3xoOTEvaDY3LzEyMjk0NzQ3ODgxNTAyL3ByZC1mcm9udC00OTQyMDkyLTFfNjAweDYwMHwwOWQwOWVmYjc4YTJkNzJjZDJlMGJkZDAzMTVlZTIyMTBkNDk2YjE4MmM2Y2Q5MjdjOGY5ZGJhNWFiOTdlYWU0', '4.65', 2, 1, '2022-04-10 23:47:46'),
(129, 90, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 1, '2022-04-11 17:01:06'),
(130, 7, 'gnome en velour', 'https://cdn.shopify.com/s/files/1/0872/4784/products/velour_gnome_large.jpg?v=1603917873', '11.00', 3, 1, '2022-03-17 17:46:55'),
(131, 84, 'renne de noel petit', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/264852525_325013406109434_4977723286730145548_n.jpg?stp=dst-jpg_p526x296&_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_ohc=6S6l6EkT-wMAX9DQwb_&_nc_ht=scontent.fbru5-1.fna&oh=00_AT_lWOUkYk9Gw7TIuKIeMXLPKDt-lG-XyoOdxPpX_tbLvA&oe=6258D075', '10.90', 3, 1, '2022-04-11 00:38:24'),
(132, 85, 'renne de noel grand', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/264852525_325013406109434_4977723286730145548_n.jpg?stp=dst-jpg_p526x296&_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_ohc=6S6l6EkT-wMAX9DQwb_&_nc_ht=scontent.fbru5-1.fna&oh=00_AT_lWOUkYk9Gw7TIuKIeMXLPKDt-lG-XyoOdxPpX_tbLvA&oe=6258D075', '14.90', 3, 1, '2022-04-11 00:38:28'),
(133, 80, 'ferrero rocher 30 pièces', 'https://media.s-bol.com/gLnD1PkDPxJZ/550x326.jpg', '9.60', 2, 1, '2022-04-15 18:23:43'),
(134, 89, 'chocolat mon cheri', 'https://www.kruidvat.be/medias/prd-front-4942092-1-600x600?context=bWFzdGVyfHByZC1pbWFnZXN8NjA1MjV8aW1hZ2UvanBlZ3xoOTEvaDY3LzEyMjk0NzQ3ODgxNTAyL3ByZC1mcm9udC00OTQyMDkyLTFfNjAweDYwMHwwOWQwOWVmYjc4YTJkNzJjZDJlMGJkZDAzMTVlZTIyMTBkNDk2YjE4MmM2Y2Q5MjdjOGY5ZGJhNWFiOTdlYWU0', '4.65', 2, 1, '2022-04-10 23:47:46'),
(135, 73, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 2, '2022-03-17 17:21:34'),
(136, 74, 'a supprimer', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 2, '2022-04-11 00:33:39'),
(137, 75, 'a supprimer 2', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 2, '2022-03-17 17:45:57'),
(138, 90, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 2, '2022-04-11 17:01:06'),
(139, 73, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 3, 2, '2022-03-17 17:21:34'),
(140, 12346, 'test', NULL, '50.00', 1, 1, '2022-04-29 17:20:20'),
(141, 12347, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 1, '2022-04-29 17:29:43'),
(142, 12347, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 2, '2022-04-29 18:30:04'),
(143, 1, 'rose rouge petite', 'https://cdn.sessile.fr/wp-content/uploads/2022/02/sessile-rose-rouge.jpg', '3.00', 2, 1, '2022-04-11 16:00:23'),
(144, 12348, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 2, 1, '2022-04-29 18:36:02'),
(145, 12348, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 2, 2, '2022-04-29 19:36:09'),
(146, 1, 'rose rouge petite', 'https://cdn.sessile.fr/wp-content/uploads/2022/02/sessile-rose-rouge.jpg', '3.00', 2, 1, '2022-04-29 19:41:51'),
(147, 1, 'rose rouge petite', 'https://cdn.sessile.fr/wp-content/uploads/2022/02/sessile-rose-rouge.jpg', '3.00', 1, 1, '2022-04-29 19:46:34'),
(148, 1, 'rose rouge petite', 'https://cdn.sessile.fr/wp-content/uploads/2022/02/sessile-rose-rouge.jpg', '3.00', 2, 1, '2022-04-29 20:08:14'),
(149, 1, 'rose rouge petite', 'https://cdn.sessile.fr/wp-content/uploads/2022/02/sessile-rose-rouge.jpg', '3.00', 3, 1, '2022-04-29 20:08:42'),
(150, 1, 'rose rouge petite', 'https://cdn.sessile.fr/wp-content/uploads/2022/02/sessile-rose-rouge.jpg', '3.00', 1, 1, '2022-04-29 20:08:50'),
(151, 1, 'rose rouge petite', 'https://cdn.sessile.fr/wp-content/uploads/2022/02/sessile-rose-rouge.jpg', '3.00', 2, 1, '2022-04-29 20:28:22'),
(152, 1, 'rose rouge petite', 'https://cdn.sessile.fr/wp-content/uploads/2022/02/sessile-rose-rouge.jpg', '3.00', 1, 1, '2022-04-29 20:34:13'),
(153, 79, 'rose rouge petite', 'https://cdn.sessile.fr/wp-content/uploads/2022/02/sessile-rose-rouge.jpg', '3.00', 1, 1, '2022-05-06 20:57:39'),
(154, 79, 'rose rouge petite', 'https://cdn.sessile.fr/wp-content/uploads/2022/02/sessile-rose-rouge.jpg', '3.00', 1, 2, '2022-05-06 21:11:03'),
(155, 81, 'bouquet d\'Elise', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/273829952_361806995763408_5826825581058271527_n.jpg?_nc_cat=109&ccb=1-6&_nc_sid=8bfeb9&_nc_ohc=3n4W-c3kt_sAX_rCrTm&_nc_ht=scontent.fbru5-1.fna&oh=00_AT-PwiCoZg8QVRnAzvyz5BC1EHmSe9HCyCIMg5AoyCqf5A&oe=627B0C3C', '40.00', 1, 1, '2022-05-06 21:12:54'),
(156, 82, 'bouquet de Manon', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/273926604_361807095763398_1995105477705035963_n.jpg?_nc_cat=104&ccb=1-6&_nc_sid=8bfeb9&_nc_ohc=_ZrgrPbTWewAX9Xl0pu&_nc_ht=scontent.fbru5-1.fna&oh=00_AT-PyXxpC28SCrvBLL6hVAxyuE9urbBj9keTQ1g9x98VjA&oe=627A1486', '26.00', 1, 1, '2022-05-06 21:13:20'),
(157, 83, 'bouquet d\'Alice', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/273959702_363119218965519_5877519465143324048_n.jpg?_nc_cat=101&ccb=1-6&_nc_sid=8bfeb9&_nc_ohc=pkep7hRUcRgAX9KfOzb&_nc_ht=scontent.fbru5-1.fna&oh=00_AT8Z9a8k-4Ea566D8CAULz8UY1n3mMZohaMS3EERaUJnSg&oe=627A9591', '32.00', 1, 1, '2022-05-06 21:13:54'),
(158, 84, 'renne de noel petit', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/265830971_325091492768292_1731041678097140786_n.jpg?_nc_cat=101&ccb=1-6&_nc_sid=730e14&_nc_ohc=t2oMcRT09aQAX-3wWb1&_nc_oc=AQl-rRJRfbLT5MoYwrt_g0Jn5E1yDTvNNqe297t5414l3pCfXWc2GO05tdfRoQzLkqBm7hGtsVQKJb2mMDcqahOi&_nc_ht=scontent.fbru5-1.fna&oh=00_AT88cVExdE7ayNjhyKb7t1go8Lce7JV_6zZKEBYeV6m8Jw&oe=627A0BCC', '6.20', 3, 1, '2022-05-06 21:15:02'),
(159, 85, 'renne de noel grand', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/265830971_325091492768292_1731041678097140786_n.jpg?_nc_cat=101&ccb=1-6&_nc_sid=730e14&_nc_ohc=t2oMcRT09aQAX-3wWb1&_nc_oc=AQl-rRJRfbLT5MoYwrt_g0Jn5E1yDTvNNqe297t5414l3pCfXWc2GO05tdfRoQzLkqBm7hGtsVQKJb2mMDcqahOi&_nc_ht=scontent.fbru5-1.fna&oh=00_AT88cVExdE7ayNjhyKb7t1go8Lce7JV_6zZKEBYeV6m8Jw&oe=627A0BCC', '10.90', 3, 1, '2022-05-06 21:15:24'),
(160, 1, 'rose rouge petite', 'https://cdn.sessile.fr/wp-content/uploads/2022/02/sessile-rose-rouge.jpg', '3.00', 1, 1, '2022-05-11 03:00:37'),
(161, 4, 'bouquet luxuriant', 'https://cdn.shopify.com/s/files/1/0381/3556/2371/products/Abondant2_600x.jpg?v=1601273409', '65.00', 1, 1, '2022-05-17 17:37:03'),
(162, 81, 'bouquet d\'Elise', 'https://scontent.fbru5-1.fna.fbcdn.net/v/t39.30808-6/273829952_361806995763408_5826825581058271527_n.jpg?_nc_cat=109&ccb=1-6&_nc_sid=8bfeb9&_nc_ohc=3n4W-c3kt_sAX_rCrTm&_nc_ht=scontent.fbru5-1.fna&oh=00_AT-PwiCoZg8QVRnAzvyz5BC1EHmSe9HCyCIMg5AoyCqf5A&oe=627B0C3C', '40.00', 1, 1, '2022-05-20 16:59:23'),
(163, 84, 'renne de noel petit', 'https://www.rueducommerce.fr/medias/4a4bf81a76da37fbb26ea1f143c465d0/p_640x640/image.jpg', '6.20', 3, 1, '2022-05-20 17:01:07'),
(164, 85, 'renne de noel grand', 'https://www.rueducommerce.fr/medias/4a4bf81a76da37fbb26ea1f143c465d0/p_640x640/image.jpg', '10.90', 3, 1, '2022-05-20 17:01:15'),
(165, 83, 'bouquet d\'Alice', 'https://cdn.shopify.com/s/files/1/0381/3556/2371/products/Captured_ecran2020-11-18a15.42.59_1445x.png?v=1619693395', '32.00', 1, 1, '2022-05-20 17:01:44'),
(166, 81, 'bouquet d\'Elise', 'https://i.123fleurs.com/18/images/produits/bouquet-orange-petillant-livraison-de-fleurs-550x550-36940.jpg', '40.00', 1, 1, '2022-05-20 17:02:08'),
(167, 82, 'bouquet de Manon', 'https://lesbouquetsdalice.fr/wp-content/uploads/2020/06/Bouquet-N%C2%B02106-new-Principale.jpg', '26.00', 1, 1, '2022-05-20 17:02:35'),
(168, 12349, 'chocolat mon cheri', 'https://www.prixing.fr/images/product_images/767/767890168a7aef0ad325055d2ae92a8e.jpg', '20.00', 2, 1, '2022-05-28 01:23:30'),
(169, 12349, 'chocolat mon cheri', 'https://www.prixing.fr/images/product_images/767/767890168a7aef0ad325055d2ae92a8e.jpg', '9.00', 2, 1, '2022-05-28 02:27:17');

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

DROP TABLE IF EXISTS `produits`;
CREATE TABLE IF NOT EXISTS `produits` (
  `id_produits` int(255) NOT NULL AUTO_INCREMENT,
  `nom_produits` varchar(50) NOT NULL,
  `image_produits` text,
  `prix_produits` decimal(11,2) DEFAULT NULL,
  `id_categorie` int(11) NOT NULL,
  `id_statut` int(11) NOT NULL DEFAULT '1',
  `date_modification` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_produits`),
  KEY `id_statut` (`id_statut`),
  KEY `id_categorie` (`id_categorie`)
) ENGINE=InnoDB AUTO_INCREMENT=12351 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`id_produits`, `nom_produits`, `image_produits`, `prix_produits`, `id_categorie`, `id_statut`, `date_modification`) VALUES
(1, 'rose rouge petite', 'https://cdn.sessile.fr/wp-content/uploads/2022/02/sessile-rose-rouge.jpg', '3.00', 1, 1, '2022-05-11 03:00:37'),
(2, 'bouquet rose rouge 25', 'https://www.max-le-fleuriste.fr/297-large_default/bouquet-de-roses-rouges.jpg', '90.00', 1, 1, '2022-03-17 17:42:51'),
(3, 'bouquet élégant', 'https://cdn.shopify.com/s/files/1/0381/3556/2371/products/Elegant_3f2ae25e-d74d-408d-825d-691d3baae09f_600x.jpg?v=1601273408', '50.00', 1, 1, '2022-03-11 17:27:43'),
(4, 'bouquet luxuriant', 'https://cdn.shopify.com/s/files/1/0381/3556/2371/products/Abondant2_600x.jpg?v=1601273409', '65.00', 1, 1, '2022-05-17 17:37:03'),
(5, 'plante de terrasse 25cm', 'https://cdn.fleurop.be/ddf3bb5d-fabc-42db-98c2-52720a424303/-/resize/600/-/format/webp/', '50.00', 1, 1, '2022-02-28 04:24:46'),
(6, 'plante de terrasse 30cm', 'https://cdn.fleurop.be/ddf3bb5d-fabc-42db-98c2-52720a424303/-/resize/600/-/format/webp/', '75.00', 1, 1, '2022-02-28 14:24:46'),
(7, 'gnome en velour', 'https://cdn.shopify.com/s/files/1/0872/4784/products/velour_gnome_large.jpg?v=1603917873', '11.00', 3, 1, '2022-03-17 17:46:55'),
(73, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 3, 2, '2022-03-17 17:21:34'),
(74, 'a supprimer', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 2, '2022-04-11 00:33:39'),
(75, 'a supprimer 2', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 2, '2022-03-17 17:45:57'),
(79, 'rose rouge petite', 'https://cdn.sessile.fr/wp-content/uploads/2022/02/sessile-rose-rouge.jpg', '3.00', 1, 2, '2022-05-06 21:11:03'),
(80, 'ferrero rocher 30 pièces', 'https://media.s-bol.com/gLnD1PkDPxJZ/550x326.jpg', '9.60', 2, 1, '2022-04-15 18:23:43'),
(81, 'bouquet d\'Elise', 'https://i.123fleurs.com/18/images/produits/bouquet-orange-petillant-livraison-de-fleurs-550x550-36940.jpg', '40.00', 1, 1, '2022-05-20 17:02:08'),
(82, 'bouquet de Manon', 'https://lesbouquetsdalice.fr/wp-content/uploads/2020/06/Bouquet-N%C2%B02106-new-Principale.jpg', '26.00', 1, 1, '2022-05-20 17:02:35'),
(83, 'bouquet d\'Alice', 'https://cdn.shopify.com/s/files/1/0381/3556/2371/products/Captured_ecran2020-11-18a15.42.59_1445x.png?v=1619693395', '32.00', 1, 1, '2022-05-20 17:01:44'),
(84, 'renne de noel petit', 'https://www.rueducommerce.fr/medias/4a4bf81a76da37fbb26ea1f143c465d0/p_640x640/image.jpg', '6.20', 3, 1, '2022-05-20 17:01:07'),
(85, 'renne de noel grand', 'https://www.rueducommerce.fr/medias/4a4bf81a76da37fbb26ea1f143c465d0/p_640x640/image.jpg', '10.90', 3, 1, '2022-05-20 17:01:15'),
(86, 'grand bouquet de chrysanthème', 'https://www.florazup.com/230-home_default/bouquet-chrysantheme-blanc.jpg', '6.90', 1, 1, '2022-04-11 00:44:30'),
(87, 'petit bouquet de chrysanthème', 'https://www.floristik24.be/media/images/popup/Chrysantheme-28cm-dunkelorange-6St-87551.jpg', '2.65', 1, 1, '2022-04-11 00:44:51'),
(88, 'bouquet funéraire', 'https://cdn.fleurop.be/3fa43d3b-ff83-484a-ad24-3004a9793ef0/-/resize/600/', '38.00', 1, 1, '2022-04-10 23:46:18'),
(89, 'chocolat mon cheri', 'https://www.kruidvat.be/medias/prd-front-4942092-1-600x600?context=bWFzdGVyfHByZC1pbWFnZXN8NjA1MjV8aW1hZ2UvanBlZ3xoOTEvaDY3LzEyMjk0NzQ3ODgxNTAyL3ByZC1mcm9udC00OTQyMDkyLTFfNjAweDYwMHwwOWQwOWVmYjc4YTJkNzJjZDJlMGJkZDAzMTVlZTIyMTBkNDk2YjE4MmM2Y2Q5MjdjOGY5ZGJhNWFiOTdlYWU0', '4.65', 2, 1, '2022-04-10 23:47:46'),
(90, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 2, '2022-04-11 17:01:06'),
(12346, 'test', NULL, '50.00', 1, 1, '2022-04-29 17:20:20'),
(12347, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 1, 2, '2022-04-29 18:30:04'),
(12348, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 2, 2, '2022-04-29 19:36:09'),
(12350, 'chocolat mon cheri', 'https://www.prixing.fr/images/product_images/767/767890168a7aef0ad325055d2ae92a8e.jpg', '20.00', 2, 1, '2022-05-28 01:41:50');

--
-- Déclencheurs `produits`
--
DROP TRIGGER IF EXISTS `ajout_historique`;
DELIMITER $$
CREATE TRIGGER `ajout_historique` AFTER UPDATE ON `produits` FOR EACH ROW INSERT INTO historique_produits (id_produits, nom_produits, image_produits, prix_produits, id_categorie, id_statut, date_modification) VALUES (NEW.id_produits, NEW.nom_produits,NEW.image_produits, NEW.prix_produits, NEW.id_categorie, NEW.id_statut, NEW.date_modification)
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `copie_historique`;
DELIMITER $$
CREATE TRIGGER `copie_historique` AFTER INSERT ON `produits` FOR EACH ROW INSERT INTO historique_produits (id_produits, nom_produits, image_produits, prix_produits, id_categorie, id_statut, date_modification) VALUES (NEW.id_produits, NEW.nom_produits,NEW.image_produits, NEW.prix_produits, NEW.id_categorie, NEW.id_statut, NEW.date_modification)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `statut_produits`
--

DROP TABLE IF EXISTS `statut_produits`;
CREATE TABLE IF NOT EXISTS `statut_produits` (
  `id_statut` int(11) NOT NULL AUTO_INCREMENT,
  `etat_statut` varchar(50) NOT NULL,
  PRIMARY KEY (`id_statut`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `statut_produits`
--

INSERT INTO `statut_produits` (`id_statut`, `etat_statut`) VALUES
(1, 'disponible'),
(2, 'indisponible');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD CONSTRAINT `commandes_ibfk_1` FOREIGN KEY (`id_etat`) REFERENCES `etat_commandes` (`id_etat`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
