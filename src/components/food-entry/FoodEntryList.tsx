import styled from 'styled-components';

const StyledFoodEntryListItem = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  &:nth-child(even) {background-color: #f2f2f2;}
  & > div {
    padding: 0.5rem;
    text-align: center;
  }
`;

export const FoodEntryListHeadRow = () => {
  return (      
    <StyledFoodEntryListItem>
      <div>
      </div>
      <div>Name</div>
      <div>Calories</div>
      <div>Date</div>
      <div>Price</div>
    </StyledFoodEntryListItem>
  )
}

export const FoodEntryListItem = (props: any) => {
  const it = props.item;

  const handleSelection = (foodEntry: any) => {
    props.onSelectionChange(foodEntry.id, foodEntry.selected);
  }

  return (
    <StyledFoodEntryListItem>
      <div>
        <input type="checkbox"
          checked={it.selected}
          onChange={(e) => {
            handleSelection(it);
          }}
        />
      </div>
      <div>{it.name}</div>
      <div>{it.calorie}</div>
      <div>{it.taken_on_date.toISOString().split('T')[0]}</div>
      <div>${it.price_cents / 100}</div>
    </StyledFoodEntryListItem>
  );
}

export const FoodEntryList = (props: any) => {
  return (
    <div className="list">
      <FoodEntryListHeadRow />

      { props.items.map((f: any) => (
        <FoodEntryListItem item={f} key={f.id} onSelectionChange={props.onSelectionChange} />
      ))}
    </div>
  );
}
