import { FoodEntryListHeadRow, FoodEntryListItem } from "./FoodEntryList";

export const FoodEntryDeck = (props: any) => {
  return (
    <>
      { props.items.length > 0 && (
          <div>
            <FoodEntryListHeadRow />
            { props.items.map((f: any) => (
              <FoodEntryListItem item={f} key={f.id} onSelectionChange={props.onSelectionChange}/>
            ))}
          </div>
      )}
    </>
  );
}
