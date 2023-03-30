
// interface Props {
//   options: string[];
// }

type Props = {
  options: string[];
};

const ParamDropDownItem = (props :Props) => {
return(
    <>
    {console.log(props.options)}
{/* <select onChange={(event) => props.setParams(event.target.value)}>
  <>
    <option value="" selected disabled hidden>
      Select
    </option>
    {props.options.map((option) => (
      <option id="order" value={`${option}`}>
        {option}
      </option>
    ))}
  </>
</select>; */}
</>)
}

export default ParamDropDownItem;