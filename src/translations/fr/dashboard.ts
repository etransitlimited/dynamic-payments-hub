import common from './common';

const dashboard = {
  "dashboard": {
    "title": "Tableau de bord",
    "welcomeMessage": "Bonjour, {username}!",
    "totalBalance": "Solde Total",
    "activeCards": "Cartes Actives",
    "merchantCount": "Nombre de Marchands",
    "invitedUsers": "Utilisateurs Invités",
    "comparedToLastMonth": "par rapport au mois dernier",
    "recentActivities": "Activités Récentes",
    "last30DaysActivities": "Registres d'activité système des 30 derniers jours",
    "noRecentActivities": "Aucune activité récente",
    "quickActions": "Actions Rapides",
    "inviteFriends": "Inviter des Amis",
    "importantNotice": "Avis Important",
    "systemMaintenanceNotice": "Le système sera en maintenance de 22h00 à 02h00 le 25 décembre 2023. Certaines fonctionnalités pourraient être indisponibles pendant cette période.",
    "viewAllTransactions": "Voir Toutes les Transactions",
    "activity": {
      "deposit": "Dépôt",
      "withdrawal": "Retrait",
      "applyCard": "Demander une Carte",
      "inviteUser": "Inviter un Utilisateur",
      "transfer": "Transfert"
    },
    "status": {
      "completed": "Terminé",
      "pending": "En Attente",
      "failed": "Échoué",
      "processing": "En Traitement"
    },
    "points": "points",
    "systemLoad": "Charge du Système",
    "realTimeUpdates": "Mises à jour en temps réel",
    "featureLinks": "Liens Rapides vers les Fonctionnalités",
    
    "quickAccess": {
      "transactions": "Transactions",
      "transactionsDescription": "Voir et gérer tous les enregistrements de transactions",
      "analytics": "Analyses",
      "analyticsDescription": "Voir les analyses et rapports détaillés",
      "cards": "Gestion des Cartes",
      "cardsDescription": "Gérer vos cartes virtuelles et physiques",
      "wallet": "Portefeuille",
      "walletDescription": "Accéder à votre portefeuille et fonds",
      "invitation": "Invitation",
      "invitationDescription": "Inviter des amis et gagner des récompenses"
    },
    
    "systemMetrics": {
      "cpu": "CPU",
      "memory": "Mémoire",
      "storage": "Stockage",
      "network": "Réseau",
      "performance": "Performance"
    }
  },
  "sidebar": {
    "logo": "Logo ZoraCard Virtuel",
    "dashboard": "Tableau de bord",
    "analytics": "Analyses",
    "transactions": "Registre des Transactions",
    "wallet": {
      "title": "Portefeuille",
      "deposit": "Déposer",
      "depositRecords": "Enregistrements de Dépôt",
      "fundDetails": "Détails des Fonds"
    },
    "cards": {
      "title": "Gestion des Cartes",
      "search": "Recherche de Cartes",
      "activationTasks": "Tâches d'Activation",
      "apply": "Demander une Carte"
    },
    "merchant": {
      "title": "Centre des Marchands",
      "accountManagement": "Gestion du Compte",
      "accountInfo": "Informations du Compte",
      "accountRoles": "Rôles du Compte"
    },
    "invitation": {
      "title": "Gestion des Invitations",
      "list": "Liste des Invitations",
      "rebateList": "Liste des Remises"
    }
  },
  "transactions": {
    "title": "Transactions",
    "subtitle": "Voir et gérer toutes les transactions sur la plateforme",
    "totalTransactions": "Total des Transactions",
    "monthlyTransactions": "Transactions Mensuelles",
    "recentTransactions": "Transactions Récentes",
    "last24Hours": "Transactions des dernières 24 heures",
    "transactionList": "Liste des Transactions",
    "allTransactions": "Toutes les transactions de la plateforme",
    "transactionStatistics": "Statistiques des Transactions",
    "transactionAnalytics": "Analyse des données de transaction et tendances",
    "id": "ID de Transaction",
    "user": "Utilisateur",
    "amount": "Montant",
    "type": "Type",
    "status": "Statut",
    "date": "Date",
    "actions": "Actions",
    "details": "Détails",
    "deposit": "Dépôt",
    "withdrawal": "Retrait",
    "statusCompleted": "Terminé",
    "statusPending": "En Traitement",
    "statusFailed": "Échoué",
    "searchTransactions": "Rechercher des transactions..."
  },
  "analytics": {
    "title": "Tableau de Bord d'Analyse",
    "subtitle": "Suivez la performance et les métriques de votre entreprise",
    "userActivity": "Activité des Utilisateurs",
    "cardIssued": "Cartes Émises",
    "revenue": "Revenus",
    "expense": "Dépenses",
    "averageTransaction": "Transaction Moyenne",
    "comparedToLastMonth": "par rapport au mois dernier",
    "revenueOverTime": "Évolution des Revenus",
    "last30Days": "30 derniers jours",
    "revenueChart": "Le graphique de tendance des revenus s'affichera ici",
    "transactionsByType": "Transactions par Type",
    "distributionByType": "Distribution des transactions par type",
    "transactionsChart": "Le graphique de distribution des types de transaction s'affichera ici",
    "userDistribution": "Distribution des Dépenses",
    "expenseDistribution": "Distribution des Dépenses",
    "byRegion": "Par Type",
    "userDistributionChart": "Le graphique de distribution des types de dépenses s'affichera ici",
    "growthMetrics": "Métriques de Croissance",
    "platformGrowth": "Croissance de la plateforme au fil du temps",
    "growthChart": "Le graphique des métriques de croissance s'affichera ici",
    "reportGeneration": "Génération de Rapports",
    "generateReports": "Générer des rapports d'analyse",
    "dailyReport": "Rapport Quotidien",
    "weeklyReport": "Rapport Hebdomadaire",
    "monthlyReport": "Rapport Mensuel",
    "reportsNote": "Les rapports sont générés au format PDF et peuvent être téléchargés instantanément",
    "byExpenseType": "Par Type de Dépense",
    "realTimeUpdates": "Mises à jour en temps réel",
    "totalRevenue": "Revenu Total",
    "totalUsers": "Utilisateurs Totaux",
    "activeCards": "Cartes Actives",
    "conversionRate": "Taux de Conversion",
    "fromLastMonth": "depuis le mois dernier",
    "fromLastWeek": "depuis la semaine dernière",
    "fromLastQuarter": "depuis le dernier trimestre",
    "monthlyData": "Données Mensuelles",
    "transactionTypes": "Types de Transaction",
    "percentage": "Pourcentage",
    "byCategory": "Par Catégorie",
    "yearToDate": "Depuis le Début de l'Année",
    "users": "Utilisateurs",
    "transactions": "Transactions",
    "daily": "Quotidien",
    "weekly": "Hebdomadaire",
    "monthly": "Mensuel",
    "quarterly": "Trimestriel",
    "yearly": "Annuel",
    "dailyReportTitle": "Rapport Quotidien",
    "weeklyReportTitle": "Rapport Hebdomadaire",
    "monthlyReportTitle": "Rapport Mensuel",
    "quarterlyReportTitle": "Rapport Trimestriel",
    "yearlyReportTitle": "Rapport Annuel",
    "dailyReportDescription": "Données complètes pour analyse quotidienne",
    "weeklyReportDescription": "Données complètes pour analyse hebdomadaire",
    "monthlyReportDescription": "Données complètes pour analyse mensuelle",
    "quarterlyReportDescription": "Données complètes pour analyse trimestrielle",
    "yearlyReportDescription": "Données complètes pour analyse annuelle",
    "generate": "Générer",
    "generated": "Généré",
    "reportNote": "Les rapports sont générés au format PDF et peuvent être téléchargés instantanément"
  },
  "common": {
    "users": "Utilisateurs",
    "transactions": "transactions",
    "transfer": "Transfert",
    "payment": "Paiement",
    "exchange": "Échange",
    "expense": "Dépense",
    "regions": {
      "asia": "Asie",
      "europe": "Europe",
      "northAmerica": "Amérique du Nord",
      "southAmerica": "Amérique du Sud",
      "africa": "Afrique"
    },
    "months": {
      "january": "Janvier",
      "february": "Février",
      "march": "Mars",
      "april": "Avril",
      "may": "Mai",
      "june": "Juin",
      "july": "Juillet",
      "august": "Août",
      "september": "Septembre",
      "october": "Octobre",
      "november": "Novembre",
      "december": "Décembre",
      "jan": "Jan",
      "feb": "Fév",
      "mar": "Mar",
      "apr": "Avr",
      "may_short": "Mai",
      "jun": "Juin",
      "jul": "Juil",
      "aug": "Août",
      "sep": "Sept",
      "oct": "Oct",
      "nov": "Nov",
      "dec": "Déc"
    },
    "expenseTypes": {
      "advertising": "Publicité",
      "rent": "Loyer",
      "subscription": "Abonnement",
      "deposit": "Dépôt",
      "travel": "Frais de Voyage"
    }
  }
};

export default dashboard;
