const knowledgeBaseDB = [
	{
		id: '1',
		title: 'Kalendarz',
		path: '/knowledge-base',
		articlesCount: 17,
		featuredArticles: [
			{
				id: '1',
				title: 'Jak zarezerwować boisko?',
				content: 'Tak'
			},
			{
				id: '2',
				title: 'Kiedy są dostępne strefy?',
				content: 'Tak'
			},
			{
				id: '3',
				title: 'Czy możesz połączyć strefy?',
				content: 'Tak'
			},
			{
				id: '4',
				title: 'Czy można usunąc rezerwację z koszyka?',
				content: 'Tak'
			},
			{
				id: '5',
				title: 'Gdzie znajdę koszyk z rezerwacjami?',
				content: 'Tak'
			}
		]
	},
	{
		id: '2',
		title: 'Konto użytkownika',
		path: '/knowledge-base',
		articlesCount: 12,
		featuredArticles: [
			{
				id: '1',
				content:
					'<p>1.Po wejściu na stronie z panelem logowania klikamy na przycisk „Przypomnij hasło!”\n</p>' +
					'<p>2.Wpisujemy nasz email i klikamy „przypomnij hasło!”\n</p>' +
					'<p>3.Idziemy do naszej skrzynki pocztowej e-mailu, który podaliśmy wyżej\n</p>' +
					'<p>4.Klikamy w link, który przeniesie nas do strony, gdzie podajemy wymagane pole. \n</p>' +
					'<p>5.Klikamy „Zmień hasło” \n</p>' +
					'<p>6.Logujemy się nowym hasłem\n</p>',
				title: 'Jak zresetować hasło?'
			},
			{
				id: '2',
				title: 'Jak uzupełnić dane użytkownika?',
				content:
					'<p>1.Klikamy w prawym górnym logu \n</p>' +
					'<p>2.Uzupełniamy podstawowe dane\n</p>' +
					'<p>Są one wymagane przed pierwszą rezerwację!\n'
			}
		]
	},
	{
		id: '3',
		title: 'PayU',
		path: '/knowledge-base',
		articlesCount: 19,
		featuredArticles: [
			{
				id: '1',
				title: 'Jak przebiega płatność?',
				content:
					'<p>1. Jeśli posiadamy rezerwacje w koszyku to klikamy w niego\n</p>' +
					'<p>2. Zostanie nam wyświetlona strona z naszymi rezerwacjami oraz ceną za nie naliczoną\n</p>' +
					'<p>3. Jeśli wszystko to zgadza się to klikamy zapłać\n</p>' +
					'<p>4. Przenosi Nas na stronę płatności, gdzie wymieramy interesujący Nas sposób płatności\n</p>'
			},
			{
				id: '2',
				title: 'Czy możliwy jest zwrot pieniędzy ?',
				content:
					'<p>Devcourt nie zapewnia zwrotów pieniędzy \n</p>' +
					'<p>W razie takiej konieczności prosimy o kontakt z administratorem obiektu </p>'
			}
		]
	},
	{
		id: '4',
		title: 'Boisko',
		path: '/knowledge-base',
		articlesCount: 24,
		featuredArticles: [
			{
				id: '1',
				title: 'Jak wygląda podział boiska?',
				content:
					'<p>Boisko jest podzielone na 3 strefy:</p> <p>A – Lewa strona </p> <p>B\n - Środek </p> <p>C – Prawa strona\n</p> <p> D - Całe boisko\n</p>' +
					'<p>W dni powszednie możemy zamawiać „małe” części boiska lub jeśli jest taka możliwość to całe boisko (inne strony muszą być wolne od rezerwacji o podanej godzinie)\n</p>' +
					'W weekendy jest możliwość rezerwacji tylko całego obiektu – strefa D\n'
			},
			{
				id: '2',
				title: 'Gdzie znajduje się boisko?',
				content: 'Boisko znajduje się przy Studium Wychowania Fizycznego i Sportu UAM na ulicy Zagajnikowa 9.'
			}
		]
	}
];

export default knowledgeBaseDB;
