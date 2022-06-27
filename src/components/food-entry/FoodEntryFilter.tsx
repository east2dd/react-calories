export const FoodEntryFilter = (props: any) => {
  const handleNameChange = (e: any) => {
    props.onNameChange(e.target.value);
  }

  const handleTakenOnStartChange = (e: any) => {
    props.onTakenOnStartChange(e.target.value);
  }

  return (
    <>
      <input
        type="text"
        value={props.name}
        onChange={handleNameChange}
        placeholder="Search by name"
        />
      <span>&nbsp;</span>
      <input type="date" id="start" name="start"
        value={props.takenOnStart}
        onChange={handleTakenOnStartChange}
        min="2022-01-01" max="2022-12-31" />
    </>
  ) 
}
