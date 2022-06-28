import { FoodListHeadRow, FoodListItem } from "./FoodList";

export const FoodDeck = (props: any) => {
  return (
    <>
      { props.items.length > 0 && (
          <div>
            <FoodListHeadRow />
            { props.items.map((f: any) => (
              <FoodListItem item={f} key={f.id} onSelectionChange={props.onSelectionChange}/>
            ))}
          </div>
      )}
    </>
  );
}
