import styled from 'styled-components';

const StyledFoodListItem = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  &:nth-child(even) {background-color: #f2f2f2;}
  & > div {
    padding: 0.5rem;
    text-align: center;
  }
`;

export const FoodListHeadRow = () => {
  return (      
    <StyledFoodListItem>
      <div>
      </div>
      <div>Name</div>
      <div>Calories</div>
      <div>Date</div>
      <div>Price</div>
    </StyledFoodListItem>
  )
}

export const FoodListItem = (props: any) => {
  const it = props.item;

  const handleSelection = (Food: any) => {
    props.onSelectionChange(Food.id, Food.selected);
  }

  return (
    <StyledFoodListItem>
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
      <div>${it.price_in_cents / 100}</div>
    </StyledFoodListItem>
  );
}

export const FoodList = (props: any) => {
  return (
    <div className="list">
      <FoodListHeadRow />

      { props.items.map((f: any) => (
        <FoodListItem item={f} key={f.id} onSelectionChange={props.onSelectionChange} />
      ))}
    </div>
  );
}
