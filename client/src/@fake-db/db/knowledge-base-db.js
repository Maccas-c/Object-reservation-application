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
				content:
					`<p>1. Wchodzimy w zakładkę kalendarz. </p><p>1. Wchodzimy w zakładkę kalendarz. </p>` +
					`<p>2. Wybieramy dzień w którym chcemy zarezerwować boisko.</p>` +
					`<p>3. Pojawi się okienko w którym wybieramy strefę oraz godzinę i dodajemy do koszyka.</p>` +
					`<p>4. Przechodzimy do koszyka i klikamy w zapłać.</p>` +
					`<p>5. Pojawi się okienko potwierdzające, które po kliknięciu w 'Zapłać' przeniesie nas na serwis PayU gdzie będziemy musieli opłacić rezerwację.</p>` +
					`<p>6. Po zapłaceniu powrócimy na stronę główną, dodatkowo dostaniemy maila potwierdzajacą płatność.</p>`
			},
			{
				id: '2',
				title: 'Kiedy są dostępne strefy?',
				content:
					`<p>Strefa A, B, C:</p>` +
					`<p>Poniedziałek, wtorek, środa, czwartek, piątek</p>` +
					`<p>Strefa D:</p>` +
					`<p>Sobota, niedziela</p>`
			},
			{
				id: '3',
				title: 'Czy możesz połączyć strefy?',
				content: `<p>Aktualnie serwis DevCourt nie umożliwia taka opcję.</p>`
			},
			{
				id: '4',
				title: 'Czy można usunąc rezerwację z koszyka?',
				content: `<p>Tak, po przejściu na zakładkę koszyk, w kolumnie anuluj mamy przycisk do usunięcia rezerwacji.</p>`
			},
			{
				id: '5',
				title: 'Czy dostanę powiadomienie e-mail o zbliżającej się rezerwacji?',
				content:
					'<p>Serwis DevCourt wysyła dzień wcześniej e-mail`a przypominającego o Twojej rezerwacji.   </p>'
			},
			{
				id: '5',
				title: 'Czemu dostaje komunikat, "Wybrana rezerwacja jest chwilowo niedostępna"?',
				content:
					'<p>Wybrany termin rezerwacji na dany sektor aktualnie znajduje się w Twoim koszyku albo koszyku innej osoby.   </p>'
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
