-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 25 mars 2022 à 01:00
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
-- Base de données : `tfe`
--

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `id_clients` int(11) NOT NULL AUTO_INCREMENT,
  `nom_clients` varchar(20) DEFAULT NULL,
  `prenom_clients` varchar(20) DEFAULT NULL,
  `mail_clients` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_clients`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`id_clients`, `nom_clients`, `prenom_clients`, `mail_clients`) VALUES
(1, 'luk', 'brian', 'he201676@students.ephec.be'),
(3, 'luk2', 'brian2', 'he2016726@students.ephec.be'),
(4, 'luk2', 'brian2', 'he2016726@students.ephec.be');

-- --------------------------------------------------------

--
-- Structure de la table `client_motcle`
--

DROP TABLE IF EXISTS `client_motcle`;
CREATE TABLE IF NOT EXISTS `client_motcle` (
  `id_motcle` int(11) NOT NULL,
  `id_clients` int(11) NOT NULL,
  KEY `fk_foreign_client_motcle` (`id_clients`),
  KEY `fk_foreign_motcle_client` (`id_motcle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `client_motcle`
--

INSERT INTO `client_motcle` (`id_motcle`, `id_clients`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

DROP TABLE IF EXISTS `commandes`;
CREATE TABLE IF NOT EXISTS `commandes` (
  `id_commandes` int(255) NOT NULL AUTO_INCREMENT,
  `date_commandes` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `etat_commandes` varchar(20) NOT NULL,
  PRIMARY KEY (`id_commandes`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commandes`
--

INSERT INTO `commandes` (`id_commandes`, `date_commandes`, `etat_commandes`) VALUES
(1, '2021-11-30 12:19:22', 'réservation'),
(2, '2022-03-15 02:18:54', 'payé'),
(3, '2022-03-15 02:27:22', 'payé'),
(4, '2022-03-17 02:33:17', 'réservé'),
(5, '2022-03-16 01:24:28', 'payé'),
(6, '2022-03-17 14:40:57', 'payé'),
(7, '2022-03-17 19:39:41', 'payé'),
(8, '2022-03-17 19:41:16', 'payé'),
(9, '2022-03-17 19:41:40', 'payé'),
(10, '2022-03-17 19:42:18', 'payé'),
(11, '2022-03-17 19:42:31', 'payé'),
(12, '2022-03-17 19:43:46', 'payé'),
(13, '2022-03-17 19:44:51', 'payé'),
(14, '2022-03-17 19:45:47', 'payé'),
(15, '2022-03-17 19:46:33', 'payé'),
(16, '2022-03-17 19:47:46', 'payé'),
(17, '2022-03-18 11:10:14', 'payé'),
(18, '2022-03-18 13:36:01', 'payé'),
(19, '2022-03-18 13:36:17', 'payé'),
(20, '2022-03-18 13:55:04', 'payé'),
(21, '2022-03-18 13:55:12', 'payé'),
(22, '2022-03-18 13:56:49', 'payé'),
(23, '2022-03-18 13:56:56', 'payé'),
(24, '2022-03-18 13:59:18', 'payé'),
(25, '2022-03-18 14:00:43', 'payé'),
(26, '2022-03-18 14:01:05', 'payé'),
(27, '2022-03-18 14:01:20', 'payé'),
(28, '2022-03-24 23:49:51', 'payé'),
(29, '2022-03-25 00:18:25', 'payé');

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
(20, 77, 10),
(21, 7, 1),
(22, 7, 1),
(23, 1, 1),
(24, 7, 1),
(25, 7, 1),
(26, 7, 1),
(27, 77, 10),
(28, 1, 10),
(29, 4, 1),
(1, 76, 54),
(1, 1, 0),
(29, 1, 0);

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
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `fournissements`
--

INSERT INTO `fournissements` (`id_fournissement`, `id_produits`, `stock_produits`, `date_fournissement`, `exp_date`) VALUES
(1, 1, 4, '2022-02-14 14:55:36', NULL),
(2, 1, 0, '2022-02-14 14:54:02', NULL),
(3, 6, 0, '2022-02-14 13:06:48', NULL),
(4, 5, 0, '2022-02-14 13:06:48', NULL),
(5, 7, 0, '2022-01-12 12:05:50', NULL),
(6, 3, 9, '2022-01-12 12:05:50', NULL),
(7, 4, 8, '2022-01-12 12:06:03', NULL),
(8, 2, 9, '2022-01-12 12:09:08', NULL),
(9, 7, 13, '2022-01-28 18:23:57', NULL),
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
(44, 77, 0, '2022-03-18 12:54:44', NULL);

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
  `categorie_produits` varchar(255) NOT NULL,
  `statut` varchar(20) NOT NULL,
  `date_modification` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_historique`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `historique_produits`
--

INSERT INTO `historique_produits` (`id_historique`, `id_produits`, `nom_produits`, `image_produits`, `prix_produits`, `categorie_produits`, `statut`, `date_modification`) VALUES
(17, 7, 'gnome en velour', 'https://scontent-bru2-1.xx.fbcdn.net/v/t39.30808-6/265195628_325092502768191_9222212270407144771_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=730e14&_nc_ohc=8rlEY8G4wpIAX8zU3Eb&_nc_oc=AQmv9XmJw6zEqmBlwE6HJ9cA6dhDKrHGuIOxnwHyau22FIsZqknN1NNodMhCiNPLIvk&_nc_ht=scontent-bru2-1.xx&oh=00_AT9zB9l4QUaRMwMBr03rIpqtdeaGTmbYu4L2vQESDK9_JQ&oe=61F5C140', '11.00', 'décoration', 'disponible', '2022-03-07 18:28:40'),
(18, 7, 'gnome en velour', 'https://scontent-bru2-1.xx.fbcdn.net/v/t39.30808-6/265195628_325092502768191_9222212270407144771_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=730e14&_nc_ohc=8rlEY8G4wpIAX8zU3Eb&_nc_oc=AQmv9XmJw6zEqmBlwE6HJ9cA6dhDKrHGuIOxnwHyau22FIsZqknN1NNodMhCiNPLIvk&_nc_ht=scontent-bru2-1.xx&oh=00_AT9zB9l4QUaRMwMBr03rIpqtdeaGTmbYu4L2vQESDK9_JQ&oe=61F5C140', '11.00', 'décoration', 'disponible', '2022-03-07 18:28:42'),
(19, 3, 'bouquet élégant', 'https://cdn.shopify.com/s/files/1/0381/3556/2371/products/Elegant_3f2ae25e-d74d-408d-825d-691d3baae09f_600x.jpg?v=1601273408', '50.00', 'fleur', 'disponible', '2022-03-11 17:27:43'),
(20, 71, 'produit a supprimé', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '15.00', 'décoration', 'disponible', '2022-03-11 16:28:41'),
(21, 72, 'supprimé', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '15.00', 'décoration', 'disponible', '2022-03-11 16:34:03'),
(49, 7, 'gnome en velour', 'https://cdn.shopify.com/s/files/1/0872/4784/products/velour_gnome_large.jpg?v=1603917873', '11.00', 'décoration', 'disponible', '2022-03-17 17:46:55'),
(51, 76, 'a supprimer 18-03', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 'fleur', 'disponible', '2022-03-18 14:34:49'),
(52, 77, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 'fleur', 'disponible', '2022-03-18 14:54:52'),
(53, 77, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 'fleur', 'indisponible', '2022-03-18 16:01:34');

-- --------------------------------------------------------

--
-- Structure de la table `mail`
--

DROP TABLE IF EXISTS `mail`;
CREATE TABLE IF NOT EXISTS `mail` (
  `id_mails` int(11) NOT NULL AUTO_INCREMENT,
  `id_clients` int(11) NOT NULL,
  `sujet` varchar(255) DEFAULT NULL,
  `message` text,
  PRIMARY KEY (`id_mails`),
  KEY `fk_foreign_mail_id_client` (`id_clients`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `mail`
--

INSERT INTO `mail` (`id_mails`, `id_clients`, `sujet`, `message`) VALUES
(1, 1, 'test', 'bonjour');

-- --------------------------------------------------------

--
-- Structure de la table `mail_motcle`
--

DROP TABLE IF EXISTS `mail_motcle`;
CREATE TABLE IF NOT EXISTS `mail_motcle` (
  `id_motcle` int(11) NOT NULL,
  `id_mails` int(11) NOT NULL,
  KEY `fk_foreign_mail_motcle` (`id_motcle`),
  KEY `fk_foreign_motcle_mail` (`id_mails`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `mail_motcle`
--

INSERT INTO `mail_motcle` (`id_motcle`, `id_mails`) VALUES
(1, 1),
(2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `motcle`
--

DROP TABLE IF EXISTS `motcle`;
CREATE TABLE IF NOT EXISTS `motcle` (
  `id_motcle` int(11) NOT NULL AUTO_INCREMENT,
  `motcle` varchar(255) NOT NULL,
  PRIMARY KEY (`id_motcle`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `motcle`
--

INSERT INTO `motcle` (`id_motcle`, `motcle`) VALUES
(1, 'rose rouge'),
(2, 'blanc pur');

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
  `categorie_produits` varchar(255) NOT NULL,
  `statut` varchar(20) NOT NULL DEFAULT 'disponible',
  `date_modification` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_produits`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`id_produits`, `nom_produits`, `image_produits`, `prix_produits`, `categorie_produits`, `statut`, `date_modification`) VALUES
(1, 'rose rouge ', 'https://stickeramoi.com/7875-thickbox_default/sticker-mural-rose-rouge.jpg', '3.00', 'fleur', 'disponible', '2022-03-18 15:34:06'),
(2, 'bouquet rose rouge 25', 'https://www.max-le-fleuriste.fr/297-large_default/bouquet-de-roses-rouges.jpg', '90.00', 'fleur', 'disponible', '2022-03-17 17:42:51'),
(3, 'bouquet élégant', 'https://cdn.shopify.com/s/files/1/0381/3556/2371/products/Elegant_3f2ae25e-d74d-408d-825d-691d3baae09f_600x.jpg?v=1601273408', '50.00', 'fleur', 'disponible', '2022-03-11 17:27:43'),
(4, 'bouquet luxuriant', 'https://cdn.shopify.com/s/files/1/0381/3556/2371/products/Abondant2_600x.jpg?v=1601273409', '65.00', 'fleur', 'disponible', '2022-02-28 21:24:46'),
(5, 'plante de terrasse 25cm', 'https://cdn.fleurop.be/ddf3bb5d-fabc-42db-98c2-52720a424303/-/resize/600/-/format/webp/', '50.00', 'fleur', 'disponible', '2022-02-28 04:24:46'),
(6, 'plante de terrasse 30cm', 'https://cdn.fleurop.be/ddf3bb5d-fabc-42db-98c2-52720a424303/-/resize/600/-/format/webp/', '75.00', 'fleur', 'disponible', '2022-02-28 14:24:46'),
(7, 'gnome en velour', 'https://cdn.shopify.com/s/files/1/0872/4784/products/velour_gnome_large.jpg?v=1603917873', '11.00', 'décoration', 'disponible', '2022-03-17 17:46:55'),
(34, 'test45', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '1.00', 'fleur', 'disponible', '2022-02-28 15:27:48'),
(61, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 'fleur', 'indisponible', '2022-02-28 15:31:44'),
(62, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 'fleur', 'indisponible', '2022-02-28 15:33:18'),
(65, 'test', NULL, '45.00', 'fleur', 'disponible', '2022-03-03 16:44:10'),
(66, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '50.00', 'fleur', 'indisponible', '2022-03-03 17:40:20'),
(70, 'te', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '50.00', 'fleur', 'indisponible', '2022-03-07 18:16:19'),
(71, 'produit a supprimé', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '15.00', 'décoration', 'disponible', '2022-03-11 16:28:41'),
(72, 'supprimé', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '15.00', 'décoration', 'indisponible', '2022-03-11 17:34:12'),
(73, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 'fleur', 'indisponible', '2022-03-17 17:21:34'),
(74, 'a supprimer', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 'décoration', 'indisponible', '2022-03-17 17:46:00'),
(75, 'a supprimer 2', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 'fleur', 'indisponible', '2022-03-17 17:45:57'),
(76, 'a supprimer 18-03', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 'fleur', 'disponible', '2022-03-18 14:34:49'),
(77, 'test', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png', '0.00', 'fleur', 'indisponible', '2022-03-18 16:01:34');

--
-- Déclencheurs `produits`
--
DROP TRIGGER IF EXISTS `ajout_historique`;
DELIMITER $$
CREATE TRIGGER `ajout_historique` AFTER UPDATE ON `produits` FOR EACH ROW INSERT INTO historique_produits (id_produits, nom_produits, image_produits, prix_produits, categorie_produits,statut,  date_modification) VALUES (NEW.id_produits, NEW.nom_produits,NEW.image_produits, NEW.prix_produits, NEW.categorie_produits,NEW.statut, NEW.date_modification)
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `copie_historique`;
DELIMITER $$
CREATE TRIGGER `copie_historique` AFTER INSERT ON `produits` FOR EACH ROW INSERT INTO historique_produits (id_produits, nom_produits, image_produits, prix_produits, categorie_produits, statut, date_modification) VALUES (NEW.id_produits, NEW.nom_produits,NEW.image_produits, NEW.prix_produits, NEW.categorie_produits,NEW.statut, NEW.date_modification)
$$
DELIMITER ;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commande_produit`
--
ALTER TABLE `commande_produit`
  ADD CONSTRAINT `commande_produit_ibfk_1` FOREIGN KEY (`id_commandes`) REFERENCES `commandes` (`id_commandes`) ON DELETE CASCADE,
  ADD CONSTRAINT `commande_produit_ibfk_2` FOREIGN KEY (`id_produits`) REFERENCES `produits` (`id_produits`) ON DELETE CASCADE;

DELIMITER $$
--
-- Évènements
--
DROP EVENT IF EXISTS `ajout_commande_jour`$$
CREATE DEFINER=`root`@`localhost` EVENT `ajout_commande_jour` ON SCHEDULE EVERY 1 DAY STARTS '2022-03-26 00:01:00' ON COMPLETION NOT PRESERVE ENABLE DO insert into commandes(date_commandes,etat_commandes) VALUES(NOW(),'chart')$$

DROP EVENT IF EXISTS `ajour_commande_produit_jour`$$
CREATE DEFINER=`root`@`localhost` EVENT `ajour_commande_produit_jour` ON SCHEDULE EVERY 1 DAY STARTS '2022-03-26 00:02:00' ON COMPLETION NOT PRESERVE ENABLE DO insert into commande_produit(id_commandes, id_produits, nombre) VALUES((select max(id_commandes) from commandes),1,0)$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
