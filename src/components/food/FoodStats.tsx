export const FoodStats = (props: any) => {

  return (
    <div className="stats">
      <div><strong>Total Calories:</strong>  {props.stats.calories || 0}</div>
      <div><strong>Total Entry Count:</strong>  {props.stats.count || 0}</div>
    </div>
  );
}
