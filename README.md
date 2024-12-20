# calendar

En gros tout ce passe dans le view/DoubelCalendarView

## Idée

Dans l'idée, je me dis qu'on peut surtout faire : un DoubleCalendarView qui prend en props un renderDay ou un children.

En gros, le composant, il sert juste à afficher 1 mois, sans logique de changement de mois, sans composant particulier pour rendre un enfant.

Ensuite, on fait un exemple de comment faire un calendrier avec un enfant et on met l'exemple que j'ai.

L'idée ce sera surtout de composer son calendrier, vu qu'à chaque fois c'est ce qu'on veut faire. Typiquement

```tsx
const ComposedCalendar = ({daySelected, onChangeSelectedDay}) => { // State qui nous vient de là où on le veut.
    const [month, setVisibleMonth] = useState(new Date());

    return (
        <>
            <MonthSelection displayedMonth={month} onChangeMonth={setVisibleMonth} />
            <CalendarView monthToDisplay={month}>
                // En vrai ici je sais pas la syntaxe, mais sinon un renderDay
                {(day) => <DayInCalendar day={day} onDayPress={onChangeSelectedDay}>}
            </CalendarView>
        </CalendarView>
    )
}
```

Du coup, un double calendrier, on met 2 calendarView. Un calendrier qui scrolle on met ça dans une flashlist, ...
