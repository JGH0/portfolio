// translations
const translations = {
	de: {
		nav: {
			home: "Start",
			education: "Bildung",
			skills: "Fähigkeiten",
			projects: "Projekte",
			hobbies: "Hobbys"
		},
		home: {
			photoPlaceholder: "Profilbild",
			name: "Jürg Georg Hallenbarter",
			title: "Informatiker Applikationsentwicklung",
			intro: "Applikationsentwickler in Ausbildung mit Leidenschaft für sauberen Code, Automatisierung und kontinuierliches Lernen. Derzeit im 2. Lehrjahr bei EMVs.",
			quickTitle: "Kurzer Überblick",
			quick1: "🎓 BFO Visp (2024–)",
			quick2: "🌎 C2 Englisch (EF, NY & Toronto)",
			quick3: "💻 Java · Python · PHP · Kotlin"
		},
		education: {
			title: "📖 Bildung & Ausbildung",
			vocationalTitle: "🎓 Berufsbildung",
			vocationalDate1: "2024 – heute",
			vocationalDegree: "Informatiker Applikationsentwicklung",
			vocationalSchool: "Berufsschule BFO Visp",
			vocationalDesc: "Berufsschule mit Fokus auf Softwareentwicklung.",
			vocationalDate2: "1. Lehrjahr (2024–2025)",
			vocationalCompany1: "Cortec AG Visp",
			vocationalDesc1: "Lehrbetrieb im ersten Jahr.",
			vocationalDate3: "2. Lehrjahr (2025–heute)",
			vocationalCompany2: "EMVs",
			vocationalDesc2: "Aktueller Lehrbetrieb, Erweiterung praktischer Fähigkeiten.",
			languageTitle: "🌍 Sprachaufenthalte",
			languageDate: "2023 – 2024 · EF International Sprachschule",
			languageName: "Englisch Immersion",
			languageLocation: "New York (3 Monate) · Toronto, Kanada (6 Monate)",
			languageOutcome: "Ergebnis: C2 Englisch (zertifiziert).",
			referenceTitle: "👤 Referenz",
			referenceDesc: "EMVs Ausbilder & Klassenlehrperson · BFO Visp"
		},
		skills: {
			title: "🧰 Technische Fähigkeiten & Sprachen",
			cat1: "Sprachen & Frameworks",
			cat2: "Web & Datenbank",
			cat3: "Scripting / Automatisierung",
			cat4: "Mobile & Sonstiges",
			langTitle: "🗣️ Sprachen",
			langDe: "Deutsch",
			langDeLevel: "Muttersprache",
			langEn: "Englisch",
			langEnLevel: "C1–C2 (fließend, C2 zertifiziert)"
		},
		projects: {
			title: "🚀 Persönliche Projekte",
			subintro: "Dinge, die ich gebaut habe – Fokus auf Einfachheit und Effizienz.",
			jtopDesc: "Leichter Systemmonitor für Linux. Minimale Oberfläche mit CPU-, Speicher- und Prozessinformationen ohne unnötige Funktionen. Schnell und effizient.",
			asciiDesc: "Java-Bibliothek zur ASCII-Kartengenerierung. Entwickelt, um geklont und in andere Projekte integriert zu werden. Bietet einfache Methoden zum Erstellen von Spielkarten in Terminalanwendungen.",
			i3Desc: "Minimale i3-Konfiguration für Arch Linux. Sauberes, funktionales Setup mit wichtigen Tastenkombinationen und Arbeitsbereichsverwaltung. Kein Ballast, nur das Nötigste.",
			smallProjectsCTA: "🔍 Schau dir auch meine kleineren Bildungsprojekte & Experimente an:",
			smallProjectsLink: "Kleinere Projekte durchstöbern →"
		},
		smallProjects: {
			title: "📦 Kleinere Projekte & Experimente",
			subintro: "Bildungsschnipsel, Prototypen und Werkzeuge. Nach Sprache filtern.",
			all: "Alle",
			download: "Herunterladen ⬇️",
			proj1Desc: "Ein einfacher Taschenrechner für die Kommandozeile. Gut zum Lernen von Java-Syntax und Benutzereingaben.",
			proj2Desc: "Einfaches Backup-Skript mit tar und Rotation. Cron-bereit.",
			proj3Desc: "Kommandozeilen-Todo-Listen-Manager. Speichert Aufgaben in einer JSON-Datei.",
			proj4Desc: "Einfache responsive Landingpage-Vorlage.",
			proj5Desc: "Sortiert Dateien in einem Verzeichnis nach Erweiterung. Nützlich zur Organisation."
		},
		hobbies: {
			title: "⚡ Hobbys & Freizeit",
			budo: "Yoseikan Budo",
			budoSmall: "Kampfkunst",
			diving: "Tauchen",
			divingSmall: "Tauchen",
			ski: "Ski / Snowboard",
			skiSmall: "Wintersport",
			quote: "„Gleichgewicht zwischen Code und Abenteuern in der Natur.“"
		}
	},
	en: {
		nav: {
			home: "Home",
			education: "Education",
			skills: "Skills",
			projects: "Projects",
			hobbies: "Hobbies"
		},
		home: {
			photoPlaceholder: "Profile photo",
			name: "Jürg Georg Hallenbarter",
			title: "Informatiker Applikationsentwicklung",
			intro: "Application developer apprentice with a passion for clean code, automation, and continuous learning. Currently in my 2nd year at EMVs.",
			quickTitle: "Quick overview",
			quick1: "🎓 BFO Visp (2024–)",
			quick2: "🌎 C2 English (EF, NY & Toronto)",
			quick3: "💻 Java · Python · PHP · Kotlin"
		},
		education: {
			title: "📖 Education & Training",
			vocationalTitle: "🎓 Vocational education",
			vocationalDate1: "2024 – present",
			vocationalDegree: "Informatiker Applikationsentwicklung",
			vocationalSchool: "Berufsschule BFO Visp",
			vocationalDesc: "Vocational school with focus on software development.",
			vocationalDate2: "1st year (2024–2025)",
			vocationalCompany1: "Cortec AG Visp",
			vocationalDesc1: "First-year training company.",
			vocationalDate3: "2nd year (2025–present)",
			vocationalCompany2: "EMVs",
			vocationalDesc2: "Current training company, expanding practical skills.",
			languageTitle: "🌍 Language stays",
			languageDate: "2023 – 2024 · EF International Sprachschule",
			languageName: "English immersion",
			languageLocation: "New York (3 months) · Toronto, Canada (6 months)",
			languageOutcome: "Outcome: C2 proficiency in English (certified).",
			referenceTitle: "👤 Reference",
			referenceDesc: "EMVs Ausbilder & Klassenlehrperson · BFO Visp"
		},
		skills: {
			title: "🧰 Technical skills & languages",
			cat1: "Languages & frameworks",
			cat2: "Web & database",
			cat3: "Scripting / automation",
			cat4: "Mobile & other",
			langTitle: "🗣️ Languages",
			langDe: "Deutsch",
			langDeLevel: "Muttersprache (native)",
			langEn: "English",
			langEnLevel: "C1–C2 (proficient, certified C2)"
		},
		projects: {
			title: "🚀 Personal projects",
			subintro: "Things I've built – focused on simplicity and efficiency.",
			jtopDesc: "Lightweight system monitor for Linux. Minimal interface showing CPU, memory, and process information without unnecessary features. Fast and efficient.",
			asciiDesc: "Java library for ASCII card generation. Designed to be cloned and integrated into other projects. Provides simple methods for creating playing cards in terminal applications.",
			i3Desc: "Minimal i3 configuration for Arch Linux. Clean, functional setup with essential keybindings and workspace management. No bloat, just what's needed.",
			smallProjectsCTA: "🔍 Also check out my smaller educational projects & experiments:",
			smallProjectsLink: "Browse smaller projects →"
		},
		smallProjects: {
			title: "📦 Smaller projects & experiments",
			subintro: "Educational snippets, prototypes, and tools. Filter by language.",
			all: "All",
			download: "Download ⬇️",
			proj1Desc: "A basic command-line calculator. Good for learning Java syntax and user input handling.",
			proj2Desc: "Simple backup script with tar and rotation. Cron ready.",
			proj3Desc: "Command-line todo list manager. Stores tasks in a JSON file.",
			proj4Desc: "Simple responsive landing page template.",
			proj5Desc: "Sorts files in a directory by extension. Useful for organisation."
		},
		hobbies: {
			title: "⚡ Hobbies & free time",
			budo: "Yoseikan Budo",
			budoSmall: "martial art",
			diving: "Tauchen",
			divingSmall: "diving",
			ski: "Ski / Snowboard",
			skiSmall: "winter sports",
			quote: "“Balance between code and outdoor adventures.”"
		}
	},
	fr: {
		nav: {
			home: "Accueil",
			education: "Formation",
			skills: "Compétences",
			projects: "Projets",
			hobbies: "Loisirs"
		},
		home: {
			photoPlaceholder: "Photo de profil",
			name: "Jürg Georg Hallenbarter",
			title: "Informaticien développement d'applications",
			intro: "Apprenti développeur d'applications passionné par le code propre, l'automatisation et l'apprentissage continu. Actuellement en 2e année chez EMVs.",
			quickTitle: "Aperçu rapide",
			quick1: "🎓 BFO Visp (2024–)",
			quick2: "🌎 C2 anglais (EF, NY & Toronto)",
			quick3: "💻 Java · Python · PHP · Kotlin"
		},
		education: {
			title: "📖 Formation & études",
			vocationalTitle: "🎓 Formation professionnelle",
			vocationalDate1: "2024 – présent",
			vocationalDegree: "Informaticien développement d'applications",
			vocationalSchool: "École professionnelle BFO Visp",
			vocationalDesc: "École professionnelle axée sur le développement logiciel.",
			vocationalDate2: "1re année (2024–2025)",
			vocationalCompany1: "Cortec AG Visp",
			vocationalDesc1: "Entreprise formatrice de première année.",
			vocationalDate3: "2e année (2025–présent)",
			vocationalCompany2: "EMVs",
			vocationalDesc2: "Entreprise formatrice actuelle, élargissement des compétences pratiques.",
			languageTitle: "🌍 Séjours linguistiques",
			languageDate: "2023 – 2024 · EF International Sprachschule",
			languageName: "Immersion anglais",
			languageLocation: "New York (3 mois) · Toronto, Canada (6 mois)",
			languageOutcome: "Résultat : C2 anglais (certifié).",
			referenceTitle: "👤 Référence",
			referenceDesc: "Formateur EMVs & enseignant principal · BFO Visp"
		},
		skills: {
			title: "🧰 Compétences techniques & langues",
			cat1: "Langages & frameworks",
			cat2: "Web & base de données",
			cat3: "Scripting / automatisation",
			cat4: "Mobile & autres",
			langTitle: "🗣️ Langues",
			langDe: "Allemand",
			langDeLevel: "Langue maternelle",
			langEn: "Anglais",
			langEnLevel: "C1–C2 (courant, certifié C2)"
		},
		projects: {
			title: "🚀 Projets personnels",
			subintro: "Des choses que j'ai construites – simplicité et efficacité avant tout.",
			jtopDesc: "Moniteur système léger pour Linux. Interface minimale affichant les informations CPU, mémoire et processus sans fonctions superflues. Rapide et efficace.",
			asciiDesc: "Bibliothèque Java pour la génération de cartes ASCII. Conçue pour être clonée et intégrée dans d'autres projets. Fournit des méthodes simples pour créer des cartes à jouer dans des applications terminal.",
			i3Desc: "Configuration i3 minimale pour Arch Linux. Installation propre et fonctionnelle avec des raccourcis clavier essentiels et une gestion des espaces de travail. Sans fioritures, juste l'essentiel.",
			smallProjectsCTA: "🔍 Découvrez aussi mes petits projets éducatifs et expériences :",
			smallProjectsLink: "Parcourir les petits projets →"
		},
		smallProjects: {
			title: "📦 Petits projets & expériences",
			subintro: "Snippets éducatifs, prototypes et outils. Filtrer par langage.",
			all: "Tous",
			download: "Télécharger ⬇️",
			proj1Desc: "Une calculatrice simple en ligne de commande. Idéale pour apprendre la syntaxe Java et la gestion des entrées utilisateur.",
			proj2Desc: "Script de sauvegarde simple avec tar et rotation. Prêt pour cron.",
			proj3Desc: "Gestionnaire de liste de tâches en ligne de commande. Stocke les tâches dans un fichier JSON.",
			proj4Desc: "Modèle de page d'accueil responsive simple.",
			proj5Desc: "Trie les fichiers dans un répertoire par extension. Utile pour l'organisation."
		},
		hobbies: {
			title: "⚡ Loisirs & temps libre",
			budo: "Yoseikan Budo",
			budoSmall: "art martial",
			diving: "Plongée",
			divingSmall: "plongée",
			ski: "Ski / Snowboard",
			skiSmall: "sports d'hiver",
			quote: "« Équilibre entre le code et les aventures en plein air. »"
		}
	}
};

// set language on page load
document.addEventListener('DOMContentLoaded', () => {
	const savedLang = localStorage.getItem('preferredLang') || 'en';
	const langSelect = document.getElementById('lang-select');
	if (langSelect) {
		langSelect.value = savedLang;
		applyTranslation(savedLang);
	}

	// listen for language change
	if (langSelect) {
		langSelect.addEventListener('change', (e) => {
			const lang = e.target.value;
			localStorage.setItem('preferredLang', lang);
			applyTranslation(lang);
		});
	}

	// Filtering for small projects page
	if (document.getElementById('small-project-grid')) {
		const filterButtons = document.querySelectorAll('.filter-btn');
		const projectCards = document.querySelectorAll('.small-project-card');

		filterButtons.forEach(btn => {
			btn.addEventListener('click', () => {
				// remove active class from all
				filterButtons.forEach(b => b.classList.remove('active'));
				btn.classList.add('active');

				const filterValue = btn.getAttribute('data-filter');

				projectCards.forEach(card => {
					if (filterValue === 'all' || card.getAttribute('data-lang') === filterValue) {
						card.style.display = 'flex';
					} else {
						card.style.display = 'none';
					}
				});
			});
		});
	}
});

function applyTranslation(lang) {
	const elements = document.querySelectorAll('[data-i18n]');
	elements.forEach(el => {
		const key = el.getAttribute('data-i18n');
		const keys = key.split('.');
		let translation = translations[lang];
		keys.forEach(k => {
			translation = translation?.[k];
		});
		if (translation) {
			el.textContent = translation;
		}
	});
}